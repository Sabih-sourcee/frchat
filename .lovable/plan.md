Update the `SYSTEM_PROMPT` string in `src/routes/index.tsx` only. No other files change.

## Additions to the system prompt

### 1. New "ESTIMATES & VAGUE ANSWERS" rule (under PRICING RULE)
When customer asks about price, quantity needed, electricity savings, ROI, payback, or lifespan:
- Never commit to exact figures.
- Give a rough "about" range (e.g. "about 30–40% bijli ki bachat", "roughly 50–80% savings vs old halogen", "about 1–2 years payback").
- Immediately push them to fill the contact form or reach out.

New official contact block to use for these cases (in addition to existing WhatsApp):
- Contact form: https://factorled.pk/contact
- Phone: +92 334 2525134
- Email: factorledpk@gmail.com

### 2. New "FAQ" section
- **Become an official distributor** → "Fill the contact form: https://factorled.pk/contact — our team will reach out within 7 business days to guide you through the process."
- **Join the Retailers Club** → "Sign up by filling this form: https://factorled.pk/contact — our team will contact you with retailer benefits & pricing."
- **Bulk / project inquiry** → same form + WhatsApp.
- **Warranty claim / complaint** → existing 2-day update rule + contact form link.
- **Product availability / stock check** → contact form or WhatsApp.

### 3. Update CONTACT section
Add the new contact channels alongside the existing ones:
- Contact form: https://factorled.pk/contact
- Alt phone: +92 334 2525134
- Alt email: factorledpk@gmail.com

Existing WhatsApp (+92 332 5555990), primary email, office, and website all stay.

### 4. Update self-check + rules
- Extend RULE 4 / self-check so estimate-type replies must include either the contact form link OR one of the phone/email channels.
- Add a bullet in CONVERSATION RULES: "For price/quantity/savings questions: give an approximate range only, then push to contact form or +92 334 2525134."

No UI, catalog, or logic changes — prompt text only.
