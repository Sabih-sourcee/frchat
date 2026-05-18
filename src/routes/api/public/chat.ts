import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

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
            (typeof body.systemPrompt === "string" && body.systemPrompt.length <= 4000
              ? body.systemPrompt
              : "You are a helpful assistant.") +
            "\n\nIMPORTANT FORMATTING: Reply in plain conversational text only. Do NOT use markdown — no asterisks (*, **), no bullet points, no hash headings, no backticks. Write naturally as if speaking. If you need a list, use short sentences or comma-separated items.";

          if (messages.length === 0) {
            return new Response(JSON.stringify({ error: "No messages provided." }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          const contents = messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: String(m.content ?? "").slice(0, 8000) }],
          }));

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
          const reply =
            data?.candidates?.[0]?.content?.parts
              ?.map((p: { text?: string }) => p.text)
              .filter(Boolean)
              .join("") ?? null;

          if (!reply) {
            return new Response(
              JSON.stringify({ error: data?.error?.message ?? "No response from model." }),
              { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS },
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
