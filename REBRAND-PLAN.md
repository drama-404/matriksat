# REBRAND PLAN — MATRIKS → denada.dev

Last updated: April 7, 2026
Goal: Ship by end of day April 8, 2026

## Context

Rebranding from fake agency ("MATRIKS AI", "we build", fake testimonials, fake stats) to honest solo developer portfolio ("Denada", "I build", real projects framed as demos). Design system stays. Copy and framing change.

---

## Phase 1: Global rebrand (do first, affects everything)

### 1A. Brand identity swap
- Replace "MATRIKS" with "denada" or "Denada" everywhere (navbar, footer, meta tags, favicon text)
- Change all "we"/"our"/"us" to "I"/"my"/"me" in every JSON content file and component
- Update site metadata: title "Denada — Full-Stack Developer & AI Engineer", description accordingly
- Update OG image if one exists

### 1B. Navbar update
- Logo: "denada" instead of "MATRIKS"  
- Remove "Plans and Pricing" CTA button from nav
- Keep: Services, Portfolio, Contact, EN/AL toggle
- Consider renaming "AI Lab" to something that makes sense for a solo dev (or remove)

### 1C. Footer update
- Replace MATRIKS branding with "denada.dev"
- Update any "company" language to individual

---

## Phase 2: Section-by-section changes

### 2A. Hero section
- Current: "WE BUILD [AI CHATBOTS / MVPS / ...]"
- New: "I BUILD [AI CHATBOTS / MVPS / WEB APPS / ...]"
- Update subtext: "Full-stack development & AI solutions that actually work. From idea to production in weeks, not months. No fluff, just results."
- Keep the terminal animation (it's good), update if it says "MATRIKS" anywhere
- CTA: "See What I Build" or "See My Work" instead of "See How We Work"

### 2B. Features strip (48 Hours / Private Portal / Unlimited Revisions)
- Reframe for solo dev honesty
- Suggestions: "Fast Delivery" / "Direct Communication" / "You Own the Code"
- Or: "No Middlemen" / "Weeks, Not Months" / "Full Source Code"

### 2C. Testimonials carousel
- HIDE ENTIRELY (do not delete, just conditionally render = false or comment out)
- Will reactivate when real client testimonials exist

### 2D. "What We've Built" / Achievement bento section
- Current: "20+ Projects Shipped" — Change to: "20+ Projects Built" (honest: built, not all shipped)
- Current: "5 Years Building" — Keep as is (true)
- Current: "50K+ Messages Handled" — Replace with something real. Something like:
  - "Full-Stack + AI" (showing range)
- Tech cloud tags: keep them, they're real skills

### 2E. "Why MATRIKS?" section → "Why Work With Me?"
- Rewrite all 6 cards in first person
- "Built for Results" → keep
- "Weeks, Not Months" → keep
- "Clear Pricing" → remove or change to "Transparent Process"
- "Disciplined Execution" → rewrite: "You're not getting random contractors. You get me — direct communication, clear milestones, zero handoffs."
- "Product Thinking First" → keep
- "Consistent Progress" → keep

### 2F. "How We Get Your Projects Done" → "How I Work"
- Rewrite 4 steps in first person
- Step 1: "I dig into your business, challenges, and what success looks like."
- Step 2: "I map out structure, timeline, milestones, and costs."
- Step 3: "I build in focused sprints. You see progress every week."
- Step 4: "I stick around as your technical partner, not a one-time vendor."
- Sprint backlog mockup on the left: keep it, it's good visual proof, just update the words to make sure there's no matriks/agency wording

### 2G. "What We Build" → "What I Build"
- Keep the 4 categories: AI & Automation, Custom App Development, Data & Analytics, Product Design
- Update all subtitles and descriptions to first person
- CRITICAL: Reframe projects as DEMOS/CAPABILITIES, not completed client work
- Each project card changes from:
  - "Challenge → Solution → Results" (implies real client)
  - TO: "The Problem → How I'd Solve It → Expected Impact" or "Concept → Approach → Demo"
- Remove all specific fake metrics ("80% of inquiries", "35% increase", "€96,000 saved")
- Replace with honest framing: "This type of solution typically handles X" or just describe the capability
- CTA per category: "Let's automate" → "Let's talk" or "See the demo" (when demos exist)
- Add a note somewhere: "These are solution demos showcasing my approach. Real case studies coming soon."

### 2H. Pricing section → Remove entirely
- Hide the "How We Work Together" / Discovery Sprint / Build & Ship / Ongoing Support section (do not delete, just comment out)
- Replace with a simple "Let's Talk" CTA or nothing (the contact section handles this)
- OR keep it, but remove the prices.

### 2I. FAQ section → "Questions You Might Have"
- "Who's behind MATRIKS?" → "Who are you?" — Answer: honest bio. "I'm Denada, a full-stack developer and AI engineer based in Tirana. Computer engineering degree from Epoka University, data science masters from University of Greenwich, both with distinction. I've spent 5 years building production systems and I specialize in full-stack development, and AI integration."
- "How does your process work?" → rewrite in first person
- "Is there a limit to revisions?" → keep but rewrite as "I"
- "How fast can you deliver?" → rewrite as "I"
- "What if I don't like what you build?" → rewrite as "I"
- "Do you work with Shopify/WordPress/etc?" → keep, rewrite
- "Can I pause or cancel?" → remove (no subscription model anymore)

### 2J. Contact / Final CTA section
- "Still here? Let's build something." → keep, it's good
- "Start a Conversation" → keep
- Remove the task ticker at bottom if it references agency services, or update it
- Update "Build booking system / Train chatbot / Automate reports / WhatsApp integration" — keep these, they're honest capabilities

---

## Phase 3: Technical cleanup

### 3A. Domain prep
- Update any hardcoded URLs from matriks domain to denada.dev
- Update sitemap generation
- Update robots.txt
- Update manifest.json (PWA name, short_name)

### 3B. SEO
- Page title: "Denada | Full-Stack Developer & AI Engineer — Tirana"
- Meta description: "I build AI-powered web applications, chatbots, and custom tools. Based in Tirana, Albania. From idea to production in weeks."
- Update all alt texts that mention MATRIKS

### 3C. Contact form
- Keep Resend integration
- Update "from" name if it says MATRIKS
- Make sure WhatsApp link points to correct number

---

## Phase 4: Final check before deploy

- [ ] Build succeeds with no errors
- [ ] Both EN and AL work
- [ ] No instance of "MATRIKS" remains (grep the codebase)
- [ ] No "we"/"our" in any content (grep content JSON files)
- [ ] No fake testimonials visible
- [ ] No fake metrics/stats visible
- [ ] Pricing section removed
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Deploy to Vercel
- [ ] Purchase denada.dev domain and configure

---