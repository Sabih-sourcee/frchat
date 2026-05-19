import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Zap, Shield, MessageCircle, Sparkles } from "lucide-react";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";

export const Route = createFileRoute("/")({
  component: Index,
});

const SYSTEM_PROMPT = `# FACTOR LED — SALES CHATBOT

RESPONSE LENGTH & TONE RULE (STRICT):
- Be straight to the point. No fluff, no beating around the bush, no unnecessary filler.
- Keep every reply to a MAXIMUM of 4 short lines by default.
- Give the direct answer first. Then, if space permits within 4 lines, add one short qualifying question or a CTA.
- Do NOT give long explanations, full product guides, or complete spec dumps unless the customer EXPLICITLY asks for more detail using words like: "explain", "why", "how does it work", "tell me more", "full guide", "in detail", "everything", "more info", "full specs".
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

## PRODUCT CATALOG (ALWAYS include the direct link when recommending a product)

LED BULBS (Residential):
- LOMO Bulb — https://factorled.pk/product/lomo/ — 12W/18W, 1200/1800 lm, Warm 3000K / Cool 6500K. Drop-in replacement.
- RANGE Bulb — https://factorled.pk/product/range-bulb/ — 12W/18W, soft uniform light for reading/working/relaxing.
- DC Solo Bulb — https://factorled.pk/product/dc-solo-bulb/ — 12W DC. Ideal for solar/UPS/load-shedding.
- BLAZ Bulb (T-Shape) — https://factorled.pk/product/blaz/ — 30/40/50/60W. High-output for large rooms, shops, workshops.

COB LIGHTS:
- COB LUMS (Downlight) — https://factorled.pk/product/cob-lums/ — Glare-controlled beam for homes, offices, retail, hotels.
- C-Series (COB Spotlight) — https://factorled.pk/product/c-series/ — 1W/3W/7W adjustable accent/display lighting.

TRACK LIGHTING:
- TRACK LIGHT — https://factorled.pk/product/track-light/ — 10/20/30/40W adjustable directional.
- TRACKS (Rail) — https://factorled.pk/product/tracks/ — Ceiling rail for track lights.

FLOOD LIGHTS:
- MARS Series — https://factorled.pk/product/mars/ — 30–300W, stadium-grade weatherproof.
- VENUS Series — https://factorled.pk/product/venus/ — 30–200W, instant-on, parking lots/warehouses.

STREET LIGHTS:
- SOLAR Street Light — https://factorled.pk/product/solar-street-light/ — All-in-one 50–200W, zero electricity cost.

HIGHBAY:
- HIGHBAY — https://factorled.pk/product/highbay/ — Industrial high-bay for 6m+ ceilings.

ROPE LIGHTS (50m per roll):
- FEBO Rope — https://factorled.pk/product/febo-rope-light/ — Consistent glow, indoor/outdoor.
- LIME ROPE — https://factorled.pk/product/lime-rope-light/ — Flexible décor for any surface.
- GLOSSY Rope — https://factorled.pk/product/glossy-rope-light/ — Multi-color RGB for weddings/events/Eid.

PVC TAPES:
- MATCH PVC Tape — https://factorled.pk/product/match-pvc-tape/ — 10 yards.
- KLAS PVC Tape — https://factorled.pk/product/klas-pvc-tape/ — 8 yards.

CATEGORY BROWSE LINKS (use when customer wants to browse a whole category):
- Residential: https://factorled.pk/residential/
- Commercial: https://factorled.pk/commercial-lighting/
- Industrial: https://factorled.pk/industrial/
- Architectural: https://factorled.pk/architectural/
- Premium: https://factorled.pk/premium/

LINK RULE (MANDATORY): Every time you recommend a specific product, you MUST include its direct factorled.pk link as plain text right after the product name (e.g. "Go with LOMO — https://factorled.pk/product/lomo/"). The link does NOT count against your 4-line limit. Never recommend a product without its link.

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
