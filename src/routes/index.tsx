import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Zap, Shield, MessageCircle, Sparkles } from "lucide-react";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: Index,
});

const API_KEY = "AIzaSyDWS1F-h7DeGTqmOVJOOhfN5kDGyK3FqSc";

const SYSTEM_PROMPT = `You are a helpful product assistant for Factor LED (factorled.pk), a Pakistani LED lighting company. Help customers choose the right LED product based on their space, use case, and requirements. Products include: LED Bulbs, Downlights, Flood Lights, Tube Lights, Street Lights, Track Lights, COB Lights, Panel Lights, Rope Lights. Always be friendly, ask clarifying questions, and recommend the most suitable product series.`;

const products = [
  { name: "LED Bulbs", desc: "Energy-efficient bulbs for every room", icon: Lightbulb },
  { name: "Downlights", desc: "Sleek recessed ceiling lights", icon: Sparkles },
  { name: "Flood Lights", desc: "High-power outdoor illumination", icon: Zap },
  { name: "Panel Lights", desc: "Slim panels for modern interiors", icon: Shield },
];

function Index() {
  const scrollToChat = () => {
    // Programmatically open the widget by dispatching a custom event
    window.dispatchEvent(new CustomEvent("factor-chat:open"));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#00BFA5] flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="font-bold text-lg">Factor LED</span>
          </div>
          <button
            onClick={scrollToChat}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg bg-[#00BFA5] hover:bg-[#00a892] transition-colors"
          >
            <MessageCircle size={16} />
            Chat with AI
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00BFA5] bg-[#00BFA5]/10 px-3 py-1 rounded-full">
            <Sparkles size={12} /> Live AI Demo
          </span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
            Find the perfect LED light <span className="text-[#00BFA5]">in seconds</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Ask our AI assistant anything about LED lighting — bulbs, downlights, flood lights,
            panels, and more. Get instant, expert recommendations tailored to your space.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToChat}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl bg-[#00BFA5] hover:bg-[#00a892] transition-colors font-medium shadow-lg shadow-[#00BFA5]/30"
            >
              <MessageCircle size={18} />
              Start chatting
            </button>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
            >
              Browse products
            </a>
          </div>
        </div>
      </section>

      {/* Suggested prompts */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <p className="text-center text-sm text-gray-500 mb-4">Try asking:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "What lights work best for a 12x14 bedroom?",
            "Recommend flood lights for my warehouse",
            "Difference between COB and panel lights?",
            "Best LED for a study desk?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("factor-chat:ask", { detail: { text: q } }),
                );
              }}
              className="text-sm px-4 py-2 rounded-full border border-gray-200 hover:border-[#00BFA5] hover:text-[#00BFA5] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-[#F5F5F5] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Product Range</h2>
            <p className="mt-3 text-gray-600">Premium LED lighting for every space and need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#00BFA5] transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#00BFA5]/10 flex items-center justify-center text-[#00BFA5] mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToChat}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl bg-[#00BFA5] hover:bg-[#00a892] transition-colors font-medium"
            >
              <MessageCircle size={18} />
              Ask the assistant which one fits you
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Factor LED · Powered by Gemini 2.5 Flash Lite
        </div>
      </footer>

      <AIChatWidget
        apiKey={API_KEY}
        systemPrompt={SYSTEM_PROMPT}
        botName="Factor Assistant"
        primaryColor="#00BFA5"
      />
    </div>
  );
}
