# MATRIKS - Claude Code Behavioral Guidelines

## 🎯 Project Mission

Build a pixel-perfect replica of kree8.studio adapted for MATRIKS (AI & full-stack development agency). The site must feel handcrafted, designer-y, and playful — **NOTHING that looks AI-generated or clichéd**.

---

## 🚫 CRITICAL: What NOT to Do

### Anti-Patterns to Absolutely Avoid

**1. AI-Generated Code Smell**
- ❌ Generic variable names: `item`, `data`, `info`, `temp`, `result`
- ❌ Overly verbose comments: "This function does X because Y"
- ❌ Defensive programming everywhere: try-catch on every operation, null checks for impossible states
- ❌ Over-abstraction: Creating interfaces/types for one-off use cases
- ✅ **Instead:** Use domain-specific names (`testimonial`, `serviceCard`, `rotatingWord`), trust TypeScript, write code that's self-documenting

**2. Clichéd Copy & Content**
- ❌ "Cutting-edge", "innovative", "industry-leading", "game-changing", "revolutionary"
- ❌ "We pride ourselves on...", "Our team of experts...", "Committed to excellence..."
- ❌ Buzzword soup: "leveraging synergies", "paradigm shift", "holistic approach"
- ✅ **Instead:** Use Kree8's playful, direct tone. Be specific. Use concrete examples. Say "We build chatbots that work" not "We deliver innovative AI solutions"

**3. Generic Design Decisions**
- ❌ Using default Tailwind colors (`blue-500`, `gray-700`)
- ❌ Default border-radius values (`rounded-lg`, `rounded-xl`)
- ❌ Safe, corporate spacing and layouts
- ✅ **Instead:** Use the exact color palette from the plan (`rgb(52, 145, 255)`, `rgb(22, 22, 22)`), exact border-radius values (28px, 40px, 118px), match Kree8's bold spacing

**4. Performance Antipatterns**
- ❌ Animating `width`, `height`, `margin`, `padding`, `top`, `left`
- ❌ Using Framer Motion for simple loops (marquees, tickers)
- ❌ Not lazy-loading heavy components (Remotion Player, Lottie)
- ✅ **Instead:** Only animate `transform` and `opacity`, use CSS animations for loops, use `next/dynamic` with `ssr: false`

---

## ✅ Implementation Philosophy

### 1. Pixel-Perfect Precision

**Spacing is Sacred**
- The plan specifies exact values: 39px padding, 1100px max-width, 83px navbar height
- Do NOT round these to "nice" numbers like 40px, 1200px, 80px
- Use the exact values from kree8.studio spec

**Typography Must Match**
- Phudu 69px, weight 800, line-height 67.62px, letter-spacing -2.07px
- Do NOT use "close enough" values
- Load all fonts exactly as specified (Phudu, Satoshi, Inter, Euclid Circular B, Chelsea Market)

**Colors Are Non-Negotiable**
- `rgb(245, 245, 245)` for background, NOT `#f5f5f5` or `gray-100`
- `rgb(52, 145, 255)` for accent, NOT `blue-500`
- `rgba(0, 0, 0, 0.53)` for muted text, NOT `opacity-50`

### 2. Animation Excellence

**Framer Motion for Complex Interactions**
- Hero typewriter + selection box (use `useMotionValue`, `useTransform`, `AnimatePresence`)
- Scroll-triggered reveals (use `whileInView` with `viewport={{ once: true, amount: 0.3 }}`)
- Hover effects on cards (use `whileHover` variants)

**CSS for Simple Loops**
- Brand marquee (use `@keyframes marquee`)
- Task ticker in footer (use CSS animation, not JS)
- Reason: 60fps performance, less JavaScript overhead

**Remotion Video Strategy**
- Auto-play when entering viewport (use Intersection Observer)
- Pause when leaving viewport (performance optimization)
- Use `next/dynamic(() => import('@remotion/player'), { ssr: false })`

### 3. Content Structure: JSON-First

**All Copy Goes in JSON Files**
- `src/content/en/*.json` for English
- `src/content/al/*.json` for Albanian
- Components NEVER contain hardcoded strings (except UI labels via `next-intl`)

**Why:** Non-developers can edit copy without touching code, centralized for easy updates

**TypeScript Schemas Required**
- Define interfaces in `src/types/content.ts`
- Example: `interface Service { id: string; title: string; description: string; ... }`
- Import JSON and type it: `const services: Service[] = servicesEN`

### 4. i18n: Not an Afterthought

**Every String Must Be Translatable**
- Use `useTranslations('namespace')` for UI strings (buttons, labels)
- Use locale-based JSON imports for content (hero copy, testimonials)
- Test BOTH languages before marking any section complete

**Routing Must Work**
- `/en` and `/al` routes should work identically
- Language toggle updates URL and re-renders with new locale
- No missing translation keys (check console for warnings)

### 5. Accessibility is Non-Negotiable

**Keyboard Navigation**
- All interactive elements accessible via Tab key
- Visible focus outlines (don't use `outline-none` without replacement)

**Semantic HTML**
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Single `<h1>` per page (hero heading), then `<h2>`, `<h3>` in hierarchy

**ARIA & Alt Text**
- Icon-only buttons get `aria-label="Descriptive action"`
- All images get descriptive `alt` attributes (not "image" or "icon")

**Color Contrast**
- Minimum 4.5:1 ratio for text (WCAG AA)
- Check all text/background combinations

---

## 🧠 Token Optimization Strategies

### Be Concise, Not Verbose

**When Reading Files**
- Use `Read` tool with `offset` and `limit` for large files
- Only read what you need, not entire codebases

**When Writing Code**
- Don't repeat yourself: Extract reusable components early
- Don't over-comment: Code should be self-documenting

**When Asking Questions**
- Be specific, not open-ended
- Provide options when possible (use AskUserQuestion with choices)

### Leverage Existing Patterns

**Once you build one section, reuse the pattern**
- Example: After building first service card, use same structure for remaining 8
- Don't re-read implementation plan for every section — reference it once, then execute

**Use Skills Proactively**
- `/feature-dev` for new sections
- `/code-reviewer` before marking sections complete
- `/react-best-practices` when unsure about component structure
- `/remotion-best-practices` when building video compositions

---

## 📋 Skills to Leverage

### When to Use Each Skill

**`/feature-dev`** (Most Common)
- Building new sections (Hero, Services Grid, Portfolio, etc.)
- Implementing complex features (typewriter animation, carousel, FAQ accordion)

**`/code-reviewer`**
- Before marking a section as complete
- After major refactors
- When debugging subtle bugs

**`/react-best-practices`**
- Component architecture decisions
- State management patterns
- Performance optimization questions

**`/remotion-best-practices`**
- Building the 10 Remotion compositions
- Optimizing video rendering
- Debugging Remotion Player issues

**`/code-architect`**
- Initial folder structure setup
- i18n architecture decisions
- Major refactoring decisions

---

## 🎨 Design & Content Guidelines

### Tone & Voice (Match Kree8's Energy)

**Playful, Not Corporate**
- ✅ "Oh heck no!" (Kree8 uses this)
- ✅ "Trust me we are good at this :)"
- ✅ "Just click"
- ❌ "We are committed to delivering excellence"
- ❌ "Our team of industry-leading experts"

**Direct, Not Fluffy**
- ✅ "AI that actually works. No fluff. No hype. Just results."
- ✅ "We build chatbots that speak Albanian, English, Italian & German."
- ❌ "We leverage cutting-edge AI technologies to deliver innovative solutions"

**Specific, Not Generic**
- ✅ "The bot handles 80% of our guest inquiries" (specific metric)
- ✅ "Saved 15+ hours per week for one client" (concrete result)
- ❌ "Improved efficiency significantly"

### Visual Consistency

**Follow the Reference**
- When in doubt, check kree8.studio
- Match their spacing, sizing, shadow depths, border-radius values
- Don't "improve" or "modernize" — replicate first, adapt second

**Adapt Content, Not Design**
- Kree8 has design subscription → MATRIKS has AI/dev solutions
- Kree8 has "Retainer" pricing → MATRIKS has "Discovery Sprint" / "Build & Launch"
- Design stays the same, content fills the template

---

## 🔧 Technical Execution Standards

### TypeScript Strictness

**No `any` Types**
- Define proper interfaces for all props
- Use generics where appropriate (`Array<T>`, `Record<K, V>`)

**Content Schemas Are Required**
- Before loading JSON, define the interface
- Example:
  ```typescript
  interface Testimonial {
    id: string;
    author: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
  }

  const testimonials: Testimonial[] = testimonialsEN;
  ```

### Component Patterns

**Server Components by Default**
- Use Server Components for static content (Hero, Services Grid, Portfolio)
- Use Client Components only when needed (forms, carousels, modals, animations)

**Mark Client Components with `'use client'`**
- Add directive at top of file: `'use client';`
- Don't add it to Server Components (Next.js default)

**Props Interfaces**
- Always define explicit prop types
- Example:
  ```typescript
  interface HeroProps {
    locale: 'en' | 'al';
    rotatingWords: string[];
  }

  export const Hero = ({ locale, rotatingWords }: HeroProps) => { ... }
  ```

### File Naming Conventions

**Components: PascalCase**
- `Hero.tsx`, `ServicesGrid.tsx`, `TestimonialsCarousel.tsx`

**Utilities: camelCase**
- `utils.ts`, `fonts.ts`, `resend.ts`

**Types: PascalCase**
- `content.ts` (exports interfaces like `Service`, `Testimonial`)

### Import Organization

**Order:**
1. External libraries (`react`, `next`, `framer-motion`)
2. Internal utilities (`@/lib/*`, `@/hooks/*`)
3. Components (`@/components/*`)
4. Types (`@/types/*`)
5. Styles (if any)

**Use Path Aliases**
- `@/components/ui/Button` instead of `../../../components/ui/Button`

---

## 🧪 Testing & Quality Assurance

### Before Marking a Section Complete

**Visual Checklist**
- [ ] Spacing matches reference (use DevTools to measure)
- [ ] Typography sizes/weights correct
- [ ] Colors exact (not "close enough")
- [ ] Hover states work
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1440px)

**Functional Checklist**
- [ ] Animations trigger correctly (scroll into view, hover, click)
- [ ] Links work (smooth scroll to sections)
- [ ] i18n works (test both EN and AL)
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

**Performance Checklist**
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth 60fps animations
- [ ] Images lazy-load
- [ ] Heavy components use `next/dynamic`

### Use `/code-reviewer` Skill

After building each major section, run `/code-reviewer` to catch:
- Performance issues
- Accessibility violations
- TypeScript errors
- Code smells

---

## 📝 Commit & Documentation Standards

### Git Commit Messages

**Format:** `<type>: <description>`

**Types:**
- `feat:` New feature (e.g., `feat: add Hero section with typewriter animation`)
- `fix:` Bug fix (e.g., `fix: correct navbar z-index overlap`)
- `style:` Visual changes (e.g., `style: adjust spacing in Services Grid`)
- `refactor:` Code restructuring (e.g., `refactor: extract Button component`)
- `perf:` Performance improvement (e.g., `perf: lazy load Remotion Player`)
- `docs:` Documentation (e.g., `docs: update README with deployment steps`)

**Good Commit Messages:**
- ✅ `feat: implement Hero section with matrix-themed selection box`
- ✅ `fix: resolve TypeScript error in Testimonials carousel`
- ✅ `perf: use CSS animation for brand marquee instead of Framer Motion`

**Bad Commit Messages:**
- ❌ `update`
- ❌ `fix stuff`
- ❌ `WIP`

### Code Comments

**When to Comment:**
- Complex algorithms (e.g., typewriter animation logic)
- Non-obvious workarounds (e.g., "Safari requires playsinline for autoplay")
- Configuration values (e.g., "// 180 frames = 6 seconds @ 30fps")

**When NOT to Comment:**
- Self-explanatory code (e.g., `const hero = content.hero; // Get hero content` ← unnecessary)
- What the code does (e.g., `// Loop through services` ← redundant)

---

## 🚀 Development Workflow

### Phase-Based Approach

**Phase 1: Foundation (Complete First)**
1. Project initialization (Next.js, TypeScript, Tailwind)
2. i18n setup (next-intl, middleware, routing)
3. Folder structure (components, content, lib, hooks)
4. Font loading (all 5 fonts)
5. Color palette (Tailwind config)
6. Base layout (Navbar, Footer, BottomNav)

**Phase 2: Core Sections (Build in Order)**
1. Hero (most complex — typewriter, selection box)
2. Features Strip (simple — good for momentum)
3. Testimonials Carousel (medium complexity)
4. Brand Marquee (simple CSS animation)
5. Quote Section (simple)
6. Achievement Bento (medium — tech cloud)
7. Benefits Grid (simple)
8. How It Works (medium — Remotion integration)

**Phase 3: Advanced Sections**
1. Services Grid (complex — 9 Remotion videos)
2. Portfolio (medium — modal lightbox)
3. World Clock (simple JS logic)
4. Engagement Models (adapt from Kree8 pricing)
5. Mobile Showcase (simple)
6. FAQ (medium — accordion logic)
7. Final CTA (dark section with ticker)

**Phase 4: Remotion Compositions**
1. Build ServiceDemo template
2. Create 9 service-specific compositions
3. Build ChatbotMockup for "How It Works"
4. Test auto-play logic

**Phase 5: Polish & Optimization**
1. Mobile responsive refinements
2. Performance optimization (Lighthouse > 90)
3. SEO metadata, sitemap
4. Contact form + Resend
5. Final animations tuning

### Incremental Commits

**Commit after each section is complete, not at the end of the day**
- Easier to track progress
- Easier to revert if needed
- Better for collaboration (if working with others later)

---

## 🎯 Success Criteria

### When is the Project "Done"?

**Visual Fidelity**
- [ ] Pixel-perfect match to kree8.studio reference
- [ ] All 18 sections implemented
- [ ] Animations smooth and performant

**Functionality**
- [ ] All links work (smooth scroll, external links)
- [ ] Language toggle works (EN ↔ AL)
- [ ] Contact form sends emails via Resend
- [ ] Portfolio modals open/close correctly
- [ ] Remotion videos auto-play on scroll

**Performance**
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse SEO = 100
- [ ] No console errors or warnings

**Content & i18n**
- [ ] All copy in JSON files (easily editable)
- [ ] Full Albanian translations
- [ ] No hardcoded strings in components

**Deployment**
- [ ] Deployed to Vercel
- [ ] Custom domain configured (when available)
- [ ] Environment variables set (Resend API key)
- [ ] Analytics configured (Google Analytics)

---

## 🛠️ Troubleshooting Mindset

### When Something Doesn't Work

**1. Check the Reference First**
- Go back to kree8.studio, inspect the element
- Compare your implementation to theirs
- Look for subtle differences (z-index, positioning, overflow)

**2. Simplify to Debug**
- Remove animations temporarily
- Use solid colors instead of gradients/shadows
- Test on a minimal example

**3. Check Common Pitfalls**
- i18n not working → Check middleware.ts, routing.ts
- Animations janky → Confirm using `transform`/`opacity` only
- Fonts not loading → Verify CSS variables, check Network tab
- Remotion not rendering → Ensure `ssr: false` in dynamic import

**4. Use Tools**
- React DevTools (inspect component tree, props, state)
- Next.js DevTools (check Server vs Client Components)
- Browser DevTools (inspect styles, animations, network requests)

---

## 🎓 Learning from Kree8.studio

### What Makes Kree8 Great (and Worth Replicating)

**1. Confident Design Decisions**
- Specific values (69px font, 118px border-radius) create unique identity
- Not afraid of bold spacing, large elements
- Breaks "rules" (e.g., 69px instead of 64px or 72px)

**2. Playful Tone**
- Uses conversational language ("Oh heck no!", "Trust me")
- Not taking itself too seriously while still being professional
- Creates personality that differentiates from competitors

**3. Attention to Detail**
- Multi-layer shadows (7 layers!) for depth
- Animated corner handles on selection box
- Lottie animations for micro-interactions
- Every element feels crafted, not templated

**4. Performance Despite Richness**
- Uses CSS animations for simple loops
- Lazy loads heavy components
- Optimizes images aggressively
- Proves you can have beauty AND speed

### Adapt These Principles to MATRIKS

- **Confident Design:** Keep exact values, don't compromise
- **Playful Tone:** Match energy but adapt copy to AI/dev context
- **Attention to Detail:** Matrix-themed corner handles show you care
- **Performance:** Optimize like Kree8, not like a heavy agency site

---

## 💡 Final Reminders

### Before Writing Any Code

1. **Read the implementation plan section you're working on**
2. **Check kree8.studio reference for that section**
3. **Understand the animation/interaction logic**
4. **Then code with confidence**

### While Coding

1. **Test in browser frequently** (don't code blindly for hours)
2. **Check both EN and AL languages**
3. **Test mobile view early** (don't leave responsive for last)
4. **Commit after each section** (not at end of day)

### Before Marking Complete

1. **Run `/code-reviewer` skill**
2. **Test all interactions** (hover, click, scroll)
3. **Check console for errors**
4. **Verify TypeScript compiles**
5. **Test on mobile device** (not just DevTools)

---

**Remember: The goal is a website so polished, so detailed, so thoughtfully crafted that no one would ever guess it was built by AI. Make it feel human. Make it feel like Kree8.**
