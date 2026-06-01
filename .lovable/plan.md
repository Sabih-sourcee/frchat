Replace the current SYSTEM_PROMPT constant in src/routes/index.tsx with the new FACTY v2 prompt.

Key changes in the new prompt:
- Bot identity: renamed from "Lumia" to "Facty"
- Language rule: auto-detect Urdu / Roman Urdu and reply in the same script
- Wholesale buyer focus: treat every buyer as a potential repeat wholesale account
- Smart qualifying flow: ask one question at a time (space → current setup → priority → quantity)
- Pricing rule: never give exact prices, always give range + push to WhatsApp
- Delivery info: 3–7 working days all over Pakistan
- Complaints & after-sales: acknowledge, reassure 2-day update, share WhatsApp
- Expanded product catalog: adds LUX, SASA COB, Glow/Star/Alkor/Range Downlights, Mercury Circle/Square/Surface, Orion DC, OPTIMA, New Downlight, ELITE Spotlight, M3 Mini, M/TU Series, Zeno, TUBIX, PL-5, PL-14, RGB Reflector, Hile Flood, ST/Serene/Hila Street Lights, Premium Solar / Solar Garden, Aura/Flowy/Gleam Rope, Profile / Lazer Blade / Linear LED, MCB / SPD / VAKWH, Heat Aerosol Fire Extinguisher
- Updated quick product finder and objection handling to match new catalog
- Updated conversation rules reflecting the new tone and flow

This is a single file edit (src/routes/index.tsx) replacing the SYSTEM_PROMPT string. No other files or logic change.