import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: Index,
});

const DEFAULT_API_KEY = "AIzaSyDWS1F-h7DeGTqmOVJOOhfN5kDGyK3FqSc";

const DEFAULT_SYSTEM_PROMPT = `You are a helpful product assistant for Factor LED (factorled.pk), a Pakistani LED lighting company. Help customers choose the right LED product based on their space, use case, and requirements. Products include: LED Bulbs, Downlights, Flood Lights, Tube Lights, Street Lights, Track Lights, COB Lights, Panel Lights, Rope Lights. Always be friendly, ask clarifying questions, and recommend the most suitable product series.`;

function Index() {
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [botName, setBotName] = useState("Factor Assistant");
  const [primaryColor, setPrimaryColor] = useState("#00BFA5");
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const embedSnippet = `<script src="${origin || "YOUR_DEPLOYED_URL"}/embed.js"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const handleReset = () => {
    setApiKey(DEFAULT_API_KEY);
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setBotName("Factor Assistant");
    setPrimaryColor("#00BFA5");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Factor AI Chat Widget — Live Demo
        </h1>
        <p className="mt-3 text-gray-600">
          Powered by Google Gemini 2.5 Flash Lite. Click the turquoise button in the
          bottom-right to start chatting.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
            />
            <p className="text-xs text-gray-500">
              Stored only in your browser session. Sent directly to Google's Gemini API.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="botName" className="block text-sm font-medium text-gray-700">
                Bot Name
              </label>
              <input
                id="botName"
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-11 w-14 rounded-xl border border-gray-200 bg-white cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
              System Prompt
            </label>
            <textarea
              id="prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5] resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset to defaults
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Embed on any site</h2>
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-white px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 text-xs bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto">
            {embedSnippet}
          </pre>
          <p className="mt-2 text-xs text-gray-500">
            Edit <code>/public/embed.js</code> to set your API key, system prompt, and branding.
          </p>
        </div>
      </div>

      <AIChatWidget
        apiKey={apiKey}
        systemPrompt={systemPrompt}
        botName={botName}
        primaryColor={primaryColor}
      />
    </div>
  );
}
