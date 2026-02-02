# MATRIKS Website Transformation Plan

## Mission
Transform the MATRIKS website from a Kree8.studio replica into an **original, distinctive site** that reflects the founder's personality while keeping the sophisticated technical foundation.

---

## Design Decisions Summary

| Aspect | Decision |
|--------|----------|
| **Visual Direction** | Warm & Crafted |
| **Colors** | Warm Earth Tones (terracotta, warm grays, cream, muted olive) |
| **Hero Animation** | Text Morphing (words transform smoothly into each other) |
| **Matrix Theme** | Subtle nods — Data Streams + Terminal Touches |
| **Personal Presence** | Minimal — brand-focused with name attribution |
| **Structure** | Keep all 14+ sections |
| **Keep from Kree8** | Motion system, card aesthetic, playful tone, Remotion videos |

---

## What Changes vs What Stays

### REMOVE (Too Kree8)
- `SelectionBox` component with blue corner handles
- `AnimatedText` typewriter effect
- Blue accent color `rgb(52, 145, 255)`
- Grid-paper background pattern
- Exact Kree8 typography (Phudu 69px/800)

### KEEP (Strong Foundation)
- Motion philosophy (Framer Motion variants, scroll-triggered reveals)
- Card aesthetic (rounded corners, subtle shadows — adjusted for warmth)
- All 14 sections structure
- Remotion video compositions (update colors)
- i18n setup (EN/AL)
- CSS animation patterns (marquee, tickers)

### TRANSFORM (Reimagine)
- Hero section → Text morphing + terminal touches
- Color palette → Warm earth tones
- Typography → Warmer, more "crafted" feel
- Background patterns → Data stream decorative elements
- Copy/content → Authentically MATRIKS

---

## Phase 1: Design System Foundation

### 1.1 Color Palette Update
**File:** `src/app/globals.css`

Replace current Kree8 colors with warm earth tones:

```css
:root {
  /* PRIMARY PALETTE - Warm Earth Tones */
  --color-background: rgb(252, 250, 247);     /* Warm cream (was: rgb(245, 245, 245)) */
  --color-accent: rgb(196, 108, 78);          /* Terracotta (was: rgb(52, 145, 255)) */
  --color-accent-secondary: rgb(138, 154, 124); /* Muted olive (NEW) */
  --color-dark: rgb(38, 35, 33);              /* Warm charcoal (was: rgb(22, 22, 22)) */
  --color-success: rgb(138, 154, 124);        /* Sage green (was: rgb(34, 197, 94)) */

  /* UTILITY COLORS */
  --color-muted: rgba(38, 35, 33, 0.53);
  --color-border: rgba(38, 35, 33, 0.12);
  --color-card: rgb(255, 255, 255);
  --color-accent-subtle: rgba(196, 108, 78, 0.08);
  --color-navbar-bg: rgba(252, 250, 247, 0.91);

  /* MATRIX THEME COLORS (subtle) */
  --color-terminal: rgb(138, 154, 124);       /* For monospace accents */
  --color-data-stream: rgba(196, 108, 78, 0.06); /* For flowing decorations */
}
```

### 1.2 Typography Updates
**File:** `src/lib/fonts.ts`

Add monospace font for terminal touches:
```typescript
import { JetBrains_Mono } from 'next/font/google';

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});
```

Consider replacing Phudu with a warmer display font (Bricolage Grotesque or Cabinet Grotesk) — or soften Phudu by reducing weight from 800 to 700.

### 1.3 Shadow System Update
**File:** `src/app/globals.css`

Warmer shadows with subtle terracotta tint:
```css
--shadow-card:
  0 2px 8px rgba(38, 35, 33, 0.04),
  0 8px 24px rgba(38, 35, 33, 0.06);

--shadow-button:
  0 1px 2px rgba(196, 108, 78, 0.08),
  0 4px 12px rgba(38, 35, 33, 0.08);
```

### 1.4 Border Radius Softening
Slightly less mechanical values:
- `--radius-card: 24px;` (was 28px)
- `--radius-card-lg: 32px;` (was 40px)
- `--radius-button: 100px;` (was 118px)

---

## Phase 2: Hero Section Redesign

### 2.1 Remove SelectionBox
**Files to modify:**
- Delete or archive: `src/components/ui/SelectionBox.tsx`
- Update: `src/components/layout/Navbar.tsx` (remove SelectionBox from logo)
- Update: `src/components/layout/Footer.tsx` (remove SelectionBox usage)

### 2.2 Create TextMorph Component
**New file:** `src/components/ui/TextMorph.tsx`

Smooth word morphing animation concept:
```typescript
interface TextMorphProps {
  words: string[];       // ["problems", "solutions", "results"]
  interval?: number;     // 3000ms between transitions
  className?: string;
}

// Animation approach:
// 1. Crossfade with subtle blur during transition
// 2. Optional: character-by-character interpolation for premium feel
// 3. Use terracotta color for morphing words
// 4. Spring physics for organic motion
```

Implementation options:
- **Simple (recommended first):** Opacity crossfade with scale (0.95 → 1)
- **Advanced:** Letter-by-letter morphing using layout animations

### 2.3 Redesign Hero.tsx
**File:** `src/components/sections/Hero.tsx`

New hero structure:
```
┌─────────────────────────────────────────────────┐
│  [Subtle data stream background - 3% opacity]   │
│                                                 │
│     Transform your                              │
│     [problems → solutions → results]  ← Morph   │
│     with AI that works                          │
│                                                 │
│     [Book a Call] [See Our Work]                │
│                                                 │
│  > ready_  ← Terminal touch (monospace, olive)  │
└─────────────────────────────────────────────────┘
```

Remove:
- AnimatedText with typewriter effect
- Blue selection box corners
- Grid-paper background

Add:
- TextMorph component with smooth transitions
- Subtle data stream background (CSS-based)
- Terminal prompt element at bottom

### 2.4 Data Stream Background
**File:** `src/app/globals.css`

Replace `.grid-pattern` with subtle flowing data decoration:
```css
.data-flow-pattern {
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 60px,
      rgba(196, 108, 78, 0.02) 60px,
      rgba(196, 108, 78, 0.02) 61px
    );
}
```

Or use animated SVG with flowing characters (0/1 streams) at very low opacity.

---

## Phase 3: Component Updates

### 3.1 Button Component
**File:** `src/components/ui/Button.tsx`
- Replace `rgb(52,145,255)` → `var(--color-accent)` (terracotta)
- Update focus ring color
- Adjust shadows to warm palette

### 3.2 Navbar
**File:** `src/components/layout/Navbar.tsx`
- Remove SelectionBox from logo
- Simple text logo with monospace accent OR subtle underline
- Update all color references

### 3.3 Footer
**File:** `src/components/layout/Footer.tsx`
- Remove SelectionBox usage
- Update accent colors

### 3.4 All Section Components
Update these files to use CSS variables instead of hardcoded colors:

| Component | File | Changes |
|-----------|------|---------|
| ServicesGrid | `src/components/sections/ServicesGrid.tsx` | Icon stroke colors, card shadows |
| TestimonialsCarousel | `src/components/sections/TestimonialsCarousel.tsx` | Avatar colors, pagination |
| AchievementBento | `src/components/sections/AchievementBento.tsx` | Bar chart, floating tags |
| BenefitsGrid | `src/components/sections/BenefitsGrid.tsx` | Icon colors |
| HowItWorks | `src/components/sections/HowItWorks.tsx` | Active step colors |
| FinalCTA | `src/components/sections/FinalCTA.tsx` | Dark section styling |
| FAQ | `src/components/sections/FAQ.tsx` | Accordion styling |
| EngagementModels | `src/components/sections/EngagementModels.tsx` | Highlighted card |
| Portfolio | `src/components/sections/Portfolio.tsx` | Modal accents |
| FeaturesStrip | `src/components/sections/FeaturesStrip.tsx` | Text colors |
| QuoteSection | `src/components/sections/QuoteSection.tsx` | Avatar styling |
| WorldClock | `src/components/sections/WorldClock.tsx` | Accent colors |
| MobileShowcase | `src/components/sections/MobileShowcase.tsx` | Device frame |
| BrandMarquee | `src/components/sections/BrandMarquee.tsx` | Minimal changes |

---

## Phase 4: Terminal Touches (Matrix Theme)

### 4.1 Terminal Label Component
**New file:** `src/components/ui/TerminalLabel.tsx`

Small monospace labels for section accents:
```tsx
export function TerminalLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs text-[var(--color-terminal)] tracking-wide">
      {'>'} {children}<span className="animate-pulse">_</span>
    </span>
  );
}
```

Use sparingly:
- Section headers: `> services`
- Footer: `> building...`
- Loading states

### 4.2 Subtle Data Stream Animation
**File:** `src/app/globals.css`

CSS keyframes for very subtle flowing characters (optional enhancement):
```css
@keyframes data-stream {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.03; }
  90% { opacity: 0.03; }
  100% { transform: translateY(100%); opacity: 0; }
}
```

---

## Phase 5: Remotion Compositions Update

### 5.1 Update Color Variables
All Remotion compositions should use the new palette:
- Replace blue `#3491ff` with terracotta `#c46c4e`
- Replace green `#22c55e` with olive `#8a9a7c`

**Files:**
- `src/components/remotion/compositions/ServiceDemo.tsx`
- `src/components/remotion/compositions/ChatbotsDemo.tsx`
- (All 10 composition files)
- `src/components/remotion/HowItWorksShowcase.tsx`

---

## Phase 6: Content Refresh

### 6.1 Rewrite Copy
**Files:** All JSON in `src/content/en/` and `src/content/al/`

Guidelines:
- Keep playful tone but make it authentically MATRIKS
- Be specific about Albanian market, multilingual support
- Avoid buzzwords ("innovative", "cutting-edge", "revolutionary")
- Use concrete examples and results

Example transformation:
```
BEFORE: "AI that actually works. No fluff. No hype. Just results."
AFTER:  "We build AI that handles the work you'd rather not do.
         Chatbots that speak your customers' language.
         Automations that run while you sleep."
```

### 6.2 Update Hero Content
**File:** `src/content/en/hero.json`

New morphing words suggestion:
```json
{
  "rotatingWords": ["problems", "solutions", "results", "growth"]
}
```

Or more specific to services:
```json
{
  "rotatingWords": ["conversations", "invoices", "bookings", "insights"]
}
```

---

## Implementation Order

### Week 1: Foundation
1. [ ] Update `globals.css` with new color palette
2. [ ] Add JetBrains Mono font
3. [ ] Create `TextMorph.tsx` component
4. [ ] Redesign `Hero.tsx` (remove SelectionBox, add TextMorph)
5. [ ] Update `Button.tsx` colors

### Week 2: Components
6. [ ] Update `Navbar.tsx` (remove SelectionBox)
7. [ ] Update `Footer.tsx`
8. [ ] Update all section components (ServicesGrid, Testimonials, etc.)
9. [ ] Create `TerminalLabel.tsx` component
10. [ ] Add terminal touches where appropriate

### Week 3: Polish
11. [ ] Update Remotion compositions with new colors
12. [ ] Rewrite content (hero.json, services.json, etc.)
13. [ ] Test both locales (EN/AL)
14. [ ] Performance audit
15. [ ] Accessibility check

---

## Verification Checklist

### Visual
- [ ] All `rgb(52, 145, 255)` blue replaced with terracotta
- [ ] Background is warm cream, not cool gray
- [ ] No SelectionBox corner handles visible anywhere
- [ ] Hero uses text morphing, not typewriter
- [ ] Terminal touches are subtle, not overwhelming

### Functional
- [ ] Text morph animation smooth at 60fps
- [ ] All scroll animations still work
- [ ] i18n switching works (EN ↔ AL)
- [ ] Remotion videos play correctly
- [ ] All links work

### Performance
- [ ] Lighthouse Performance > 90
- [ ] No layout shift from animations
- [ ] Fonts load correctly

### Accessibility
- [ ] Color contrast passes WCAG AA (4.5:1)
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible

---

## Files Summary

### Delete/Archive
- `src/components/ui/SelectionBox.tsx`

### New Files
- `src/components/ui/TextMorph.tsx`
- `src/components/ui/TerminalLabel.tsx` (optional)

### Major Updates
- `src/app/globals.css` (color palette, animations)
- `src/lib/fonts.ts` (add monospace)
- `src/components/sections/Hero.tsx` (complete redesign)
- `src/components/ui/AnimatedText.tsx` (replace with TextMorph)
- `src/components/ui/Button.tsx` (colors)
- `src/components/layout/Navbar.tsx` (remove SelectionBox)
- `src/components/layout/Footer.tsx` (remove SelectionBox)

### Minor Updates (color swaps)
- All 14 section components
- All 10 Remotion compositions
- All 24 content JSON files

---

## Success Criteria

The redesign is complete when:
1. **No blue accent color** (`rgb(52,145,255)`) appears anywhere
2. **No SelectionBox** with corner handles visible
3. **No typewriter effect** — text morphing instead
4. **Warm, crafted feel** — not cold and corporate
5. **Subtle matrix nods** — terminal touches feel intentional, not gimmicky
6. **Site feels distinctly MATRIKS** — not a copy of anyone else
