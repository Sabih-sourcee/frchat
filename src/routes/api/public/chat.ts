import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

const FORMAT_SUFFIX =
  "\n\nIMPORTANT FORMATTING: Reply in plain conversational text only. Do NOT use markdown — no asterisks (*, **), no bullet points, no hash headings, no backticks. Write naturally as if speaking. If you need a list, use short sentences or comma-separated items.";

// ---------- In-memory response cache (per Worker instance) ----------
// Avoids re-hitting the model for identical conversations (e.g. repeat FAQs,
// user re-opens widget, retries). TTL keeps replies reasonably fresh.
const RESPONSE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESPONSE_CACHE_MAX = 200;
const responseCache = new Map<string, { reply: string; expires: number }>();

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function cacheGet(key: string): string | null {
  const hit = responseCache.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    responseCache.delete(key);
    return null;
  }
  // refresh LRU position
  responseCache.delete(key);
  responseCache.set(key, hit);
  return hit.reply;
}

function cacheSet(key: string, reply: string) {
  if (responseCache.size >= RESPONSE_CACHE_MAX) {
    const oldest = responseCache.keys().next().value;
    if (oldest) responseCache.delete(oldest);
  }
  responseCache.set(key, { reply, expires: Date.now() + RESPONSE_TTL_MS });
}

function stripMarkdown(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^\s*[*\-+]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "Server is not configured (missing GEMINI_API_KEY)." }),
              { status: 500, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          const body = (await request.json()) as {
            messages?: ChatMessage[];
            systemPrompt?: string;
          };

          const messages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];
          const systemPrompt =
            (typeof body.systemPrompt === "string" && body.systemPrompt.length <= 8000
              ? body.systemPrompt
              : "You are a helpful assistant.") + FORMAT_SUFFIX;

          if (messages.length === 0) {
            return new Response(JSON.stringify({ error: "No messages provided." }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          // ----- Response cache lookup -----
          const cacheKey = await sha256(
            systemPrompt + "\u0001" + JSON.stringify(messages),
          );
          const cached = cacheGet(cacheKey);
          if (cached) {
            return new Response(JSON.stringify({ reply: cached, cached: true }), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "X-Cache": "HIT",
                ...CORS,
              },
            });
          }

          const contents = messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: String(m.content ?? "").slice(0, 8000) }],
          }));

          // NOTE on Gemini implicit prompt caching:
          // gemini-2.5-flash-lite automatically caches repeated prefixes
          // (system_instruction + leading contents) when they exceed the
          // model's minimum cache token threshold. Keeping the large system
          // prompt FIRST and stable maximizes implicit-cache hits and gives
          // up to ~75% discount on cached input tokens — no extra config
          // needed beyond consistent ordering.
          const upstream = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents,
                generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
              }),
            },
          );

          const data = await upstream.json();
          const rawReply =
            data?.candidates?.[0]?.content?.parts
              ?.map((p: { text?: string }) => p.text)
              .filter(Boolean)
              .join("") ?? null;

          if (!rawReply) {
            return new Response(
              JSON.stringify({ error: data?.error?.message ?? "No response from model." }),
              { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          const reply = stripMarkdown(rawReply);
          cacheSet(cacheKey, reply);

          // Observability: log cached vs billed token counts so we can
          // verify implicit prompt caching is working.
          const usage = data?.usageMetadata;
          if (usage) {
            console.log(
              `[chat] tokens prompt=${usage.promptTokenCount ?? "?"} cached=${usage.cachedContentTokenCount ?? 0} output=${usage.candidatesTokenCount ?? "?"}`,
            );
          }

          return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "X-Cache": "MISS",
              ...CORS,
            },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({ error: (err as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }
      },
    },
  },
});
