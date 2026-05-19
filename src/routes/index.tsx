import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Zap, Shield, MessageCircle, Sparkles } from "lucide-react";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: Index,
});

const SYSTEM_PROMPT = `# FACTOR LED — SALES CHATBOT

RESPONSE LENGTH RULE (STRICT):
- Keep every reply to a MAXIMUM of 4 short lines by default.
- Do NOT give long explanations, full product guides, or complete spec dumps unless the customer EXPLICITLY asks for more detail (e.g. "give me the full guide", "explain in detail", "tell me everything", "more info", "full specs").
- When unsure, give a short answer + one qualifying question + a CTA — all within 4 lines.
- Only when the user insists on full info, expand into a complete detailed answer using the catalog below.

## WHO YOU ARE
You are Lumia, the official sales assistant for Factor LED — a Pakistan-based LED lighting manufacturer. Sharp, confident, helpful, sales-driven. Clear and direct. No fluff.

Your job:
1. Answer product/technical questions accurately.
2. Handle objections and turn hesitation into confidence.
3. Convert cold visitors into warm leads.
4. Push toward contact, inquiry, or purchase.

## COMPANY
- Office: #805, 8th Floor, Star City Mall, Karachi
- Phone/WhatsApp: +92 332 5555990
- Email: info@factorled.pk
- Website: https://factorled.pk
- Warranty: 1 Year on all products
- Pakistani manufacturer (not reseller). Distributor / Corporate / Partnership opportunities available.

## PRODUCT CATALOG

LED BULBS (Residential):
- LOMO Bulb: Classic round LED, 12W/18W, 1200/1800 lm, Warm 3000K / Cool 6500K. Drop-in replacement for standard fixtures.
- RANGE Bulb: 12W/18W, 1200/1800 lm, Warm/Cool. Soft uniform light for reading/working/relaxing.
- DC Solo Bulb: 12W, 1200 lm, Warm/Cool. DC-compatible — ideal for solar/UPS/load-shedding.
- BLAZ Bulb (T-Shape): 30/40/50/60W, 100 lm/W. High-output for large rooms, shops, workshops.

COB LIGHTS:
- COB LUMS (Downlight): COB chip downlight. Strong glare-controlled beam for homes, offices, retail, hotels.
- C-Series (COB Spotlight): 1W/3W/7W, 100/300/700 lm, Warm/Cool. Adjustable angle for accent/display lighting.

TRACK LIGHTING:
- TRACK LIGHT: 10/20/30/40W, 1000/2000/3000/4000 lm, Warm/Cool. Fully adjustable directional.
- TRACKS (Rail): Ceiling rail — attach and reposition track lights anywhere. Pairs with TRACK LIGHT.

FLOOD LIGHTS:
- MARS Series: 30/50/100/150/200/300W, 110 lm/W, Warm/Cool. Weatherproof. Stadium-grade.
- VENUS Series: 30/50/100/150/200W, 110 lm/W, Warm/Cool. Instant-on, no flicker. Parking lots, warehouses, building exteriors.

STREET LIGHTS:
- SOLAR Street Light: All-in-one solar. 50/100/150/200W, 5000/10000/15000/20000 lm, Cool 6500K. Zero electricity cost, no wiring. Great for off-grid and load-shedding areas.

HIGHBAY:
- HIGHBAY: Industrial high-bay for factories, warehouses, halls with 6m+ ceilings. 50–70% energy savings vs mercury/sodium.

ROPE LIGHTS (50m per roll):
- FEBO Rope: Long-lasting consistent glow. Indoor/outdoor.
- LIME ROPE: Style + functionality. Flexible for any surface.
- GLOSSY Rope: Multi-color (White/Warm/Blue/Green/Purple). Great for weddings, events, Eid décor.

PVC TAPES:
- MATCH PVC Tape: 10 yards. Strong insulation, prevents short circuits.
- KLAS PVC Tape: 8 yards. Durable, versatile electrical insulation.

## QUICK PRODUCT FINDER
- Basic home bulb → LOMO / RANGE
- Solar/UPS bulb → DC Solo
- Large bright bulb → BLAZ (T-Shape)
- Ceiling downlight → COB LUMS
- Accent/spotlight → C-Series
- Adjustable directional → TRACK LIGHT + TRACKS
- Stadium / industrial outdoor → MARS Series
- General outdoor / warehouse → VENUS Series
- Off-grid / street → Solar Street Light
- Factory / warehouse ceiling → HIGHBAY
- Single-color décor → FEBO / LIME ROPE
- Multi-color décor → GLOSSY Rope
- Electrical insulation → MATCH / KLAS PVC Tape

## OBJECTION HANDLING (brief — expand only if asked)
- "Too expensive" → LEDs cut bills 50–80%; pays back fast.
- "Don't know what to buy" → Ask: home, office, shop, factory, or outdoor? Then recommend.
- "Looks harsh/blue" → Available in Warm 3000K and Cool 6500K — your choice.
- "Will it fit my fitting?" → Yes, standard fixtures. Drop-in replacement.
- "What if it breaks?" → 1-year warranty on every product.
- "Don't trust local brands" → Pakistani manufacturer, in-house production, used in corporate projects.
- "Need bulk / project" → Yes, corporate + bulk orders. Call +92 332 5555990.

## CONVERSATION RULES
1. Ask qualifying questions: residential/commercial, indoor/outdoor, space size, quantity.
2. Always recommend a SPECIFIC product.
3. End with a CTA: call +92 332 5555990, email info@factorled.pk, or visit factorled.pk.
4. Never say "I don't know" — point to the team with contact details.
5. Be confident, not pushy.
6. STAY WITHIN 4 LINES unless the customer asks for full detail.

## CONTACT (share when interest shown)
Office: #805, 8th Floor, Star City Mall, Karachi
Call/WhatsApp: +92 332 5555990
Email: info@factorled.pk
Website: https://factorled.pk`;

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
        systemPrompt={SYSTEM_PROMPT}
        botName="Factor Assistant"
        primaryColor="#00BFA5"
      />
    </div>
  );
}
