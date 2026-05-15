import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: Index,
});

const DEFAULT_SYSTEM_PROMPT = `You are a helpful product assistant for Factor LED (factorled.pk), a Pakistani LED lighting company. Help customers choose the right LED product based on their space, use case, and requirements. Products include: LED Bulbs, Downlights, Flood Lights, Tube Lights, Street Lights, Track Lights, COB Lights, Panel Lights, Rope Lights. Always be friendly, ask clarifying questions, and recommend the most suitable product series.`;

function Index() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Factor AI Chat Widget — Live Demo
        </h1>
        <p className="mt-3 text-gray-600">
          Paste your Anthropic API key below and click the turquoise chat button in
          the bottom-right corner to start chatting.
        </p>

        <div className="mt-8 space-y-2">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            Anthropic API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
          />
          <p className="text-xs text-gray-500">
            Your key stays in the browser and is sent directly to Anthropic.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 p-5 bg-[#F5F5F5]">
          <h2 className="font-semibold text-gray-800">System Prompt</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {DEFAULT_SYSTEM_PROMPT}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800">Embed on any site</h2>
          <pre className="mt-3 text-xs bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto">
{`<script src="${typeof window !== "undefined" ? window.location.origin : ""}/embed.js"></script>`}
          </pre>
          <p className="mt-2 text-xs text-gray-500">
            Edit <code>/public/embed.js</code> to set your API key, system prompt, and branding.
          </p>
        </div>
      </div>

      <AIChatWidget
        apiKey={apiKey}
        systemPrompt={DEFAULT_SYSTEM_PROMPT}
        botName="Factor Assistant"
        primaryColor="#00BFA5"
      />
    </div>
  );
}
