# MATRIKS - Full Website Implementation Plan

## 1. PROJECT OVERVIEW

**Goal:** Build a pixel-perfect replica of kree8.studio (https://kree8.studio/), adapted for MATRIKS - an AI and full-stack development agency targeting businesses in Albania and Europe.

**Key Differentiators from Kree8:**
- **Business Model:** Custom AI solutions (chatbots, automation, apps) vs. design subscription service
- **Engagement Models:** Discovery Sprint, Build & Launch, Ongoing Support vs. Retainer/Fixed packages
- **Geographic Focus:** Albania + Central Europe (multilingual: EN/AL, IT, DE capabilities)
- **Brand Personalization:** "MATRIKS" with matrix-themed selection box (animated grid corner handles)

**Design Mandate:** NOTHING that looks AI-generated. Playful, designer-y aesthetic matching Kree8's vibe.

---

## COMPLETION STATUS

### Phase 1: Foundation ✅ COMPLETED
- [x] Project initialization (Next.js 16, TypeScript, Tailwind CSS 4)
- [x] i18n setup (next-intl middleware, routing, EN/AL locales)
- [x] Folder structure (components, content, lib, hooks, types)
- [x] Font loading (Phudu, Inter, DM Sans, Space Grotesk, Chelsea Market)
  - Note: Using DM Sans & Space Grotesk as fallbacks until Satoshi & Euclid Circular B fonts are obtained
- [x] Color palette (CSS variables in globals.css with exact Kree8 values)
- [x] Animation system (Framer Motion variants + CSS keyframes)
- [x] Base components (Button, SelectionBox, ScrollReveal)
- [x] Navbar component (with scroll hide/show behavior)
- [x] Footer component (with ticker animation)
- [x] Hero component (with typewriter animation)

### Phase 2: Core Sections ✅ COMPLETED
- [x] Features Strip
- [x] Testimonials Carousel
- [x] Brand Marquee
- [x] Quote Section
- [x] Achievement Bento
- [x] Benefits Grid
- [x] How It Works

### Phase 3: Advanced Sections ✅ COMPLETED
- [x] Services Grid
- [x] Portfolio
- [x] World Clock
- [x] Engagement Models
- [x] Mobile Showcase
- [x] FAQ
- [x] Final CTA

### Phase 4: Remotion Compositions ✅ COMPLETED
- [x] ServiceDemo template
- [x] 9 service-specific compositions (ChatbotsDemo, InvoiceOCRDemo, BookingSystemsDemo, CustomerDashboardsDemo, SentimentAnalysisDemo, ReviewManagementDemo, MobileAppsDemo, SystemConnectorsDemo, GDPRComplianceDemo)
- [x] ChatbotMockup (for How It Works section)
- [x] Remotion Player integration (ServicesGrid, HowItWorks with auto-play on scroll)

### Phase 5: Polish & Optimization ⏳ PENDING
- [ ] Mobile responsive refinements
- [ ] Performance optimization
- [ ] SEO & sitemap
- [ ] Contact form + Resend
- [ ] Final animations

---

## 2. BRAND IDENTITY & DESIGN SYSTEM

### 2.1 Logo & Selection Box
**Logo:** "MATRIKS" wordmark with Figma-style blue selection box around it

**Selection Box Specifications:**
- **Border:** Solid blue strokes `rgb(52, 145, 255)`, stroke-width: ~7.9px
- **Corner Handles:** Matrix-themed grid point indicators
  - Design: Small 8x8px squares at each corner
  - Animation: Subtle pulse/glow effect (scale 1 → 1.15 → 1, 2s ease-in-out infinite)
  - Color: Same blue `rgb(52, 145, 255)` with subtle white glow
  - Effect: Evoke matrix grid nodes, differentiating from Kree8's simple squares
- **Background:** `rgb(245, 245, 245)` (same as page bg for seamless integration)

**Where Used:**
- Navbar logo (static version)
- Hero section (animated version - scales with typewriter progress)

### 2.2 Color Palette
**Primary Colors (exact match to Kree8):**
- Background: `rgb(245, 245, 245)` (warm light gray)
- Accent Blue: `rgb(52, 145, 255)` (selection box, links, interactive elements)
- Dark: `rgb(22, 22, 22)` (near-black for dark sections, text)
- Success Green: `rgb(34, 197, 94)` (checkmarks, status badges)
- White: `rgb(255, 255, 255)` (cards, contrast elements)

**Secondary/Utility:**
- Muted Text: `rgba(0, 0, 0, 0.53)` (navigation links)
- Dark Text Overlay: `rgba(255, 255, 255, 0.7)` (text on dark backgrounds)
- Border/Divider: `rgba(0, 0, 0, 0.17)` (dashed lines)
- Card Shadow: Multi-layer shadows (7 layers from subtle to deep - see button shadows)

### 2.3 Typography
**Font Stack (identical to Kree8):**
1. **Phudu** (Google Font, weight 800) - Hero main heading only
2. **Satoshi** (custom web font, weight 700) - Section headings (h1/h2)
3. **Inter** (Google Font, weights 400/500/600) - Body text, UI elements
4. **Euclid Circular B** (weight 600) - "MATRIKS" brand text
5. **Chelsea Market** (Google Font, weight 400) - Footer "kree8ing..." style text (adapt to "building...")
6. **Nanum Brush Script** (Google Font, weight 400) - Cursive accents (if needed)

**Loading Strategy:**
- Use `next/font/google` for Google Fonts (automatic optimization)
- Use `next/font/local` for Satoshi and Euclid Circular B
- Define CSS variables in root layout: `--font-phudu`, `--font-satoshi`, `--font-inter`

### 2.4 Spacing & Layout
- **Max Content Width:** 1100px (centered with auto margins)
- **Section Padding:** 39px 24px (top/bottom, left/right)
- **Border Radius:**
  - Cards: 28px - 40px
  - Buttons: 118px (full pill)
  - Small elements: 13px - 26px
- **Gap/Grid Spacing:** 8px - 32px (consistent 8px increments)

---

## 3. TECHNICAL STACK

### 3.1 Core Framework
- **Next.js 14+** (App Router) - SSR, SEO, image optimization
- **TypeScript** - Type safety for content schemas
- **Tailwind CSS** - Utility-first styling

### 3.2 Animation Libraries
- **Framer Motion** - Complex JS-driven animations (typewriter, scroll reveals, hover effects)
- **CSS Animations** - Simple loops (marquee, ticker) for 60fps performance
- **Lottie React** - Animated SVG icons

### 3.3 Video/Demo Generation
- **Remotion 4.0** - Programmatic video generation for service demos
- **@remotion/player** - Embedded video player in Next.js
- **@remotion/google-fonts** - Font loading in Remotion compositions

### 3.4 Internationalization
- **next-intl** - i18n for App Router (EN/AL translations)
- Structure: `app/[locale]/page.tsx` routing

### 3.5 Email & Forms
- **Resend** - Email API for contact form submissions

### 3.6 Performance & Analytics
- **next/image** - Automatic image optimization, lazy loading, WebP conversion
- **@next/bundle-analyzer** - Identify large dependencies
- **Google Analytics** - Free tier (via `next/script`)

---

## 4. FOLDER STRUCTURE

```
matriks/
├── app/
│   ├── [locale]/                          # i18n routes (en, al)
│   │   ├── layout.tsx                     # Root layout + font loading
│   │   ├── page.tsx                       # Homepage (section orchestrator)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── api/
│   │   └── contact/route.ts               # Resend email handler
│   ├── favicon.ico
│   ├── globals.css
│   ├── sitemap.ts                         # Generate sitemap.xml
│   └── robots.ts                          # Generate robots.txt
│
├── public/
│   ├── images/
│   │   ├── logos/                         # 14 brand logos for marquee
│   │   ├── projects/                      # 5 portfolio thumbnails
│   │   ├── services/                      # 9 service abstract images
│   │   ├── avatars/                       # Testimonial avatars (4 placeholders)
│   │   └── icons/                         # Lottie JSON files (~10 icons)
│   ├── fonts/                             # Satoshi, Euclid Circular B
│   └── videos/                            # Pre-rendered Remotion MP4s (optional fallback)
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                 # Fixed navbar (Section 1)
│   │   │   ├── BottomNav.tsx              # Floating nav (Section 2)
│   │   │   ├── Footer.tsx                 # Footer (Section 18)
│   │   │   └── LanguageToggle.tsx         # EN/AL switcher
│   │   │
│   │   ├── sections/                      # 18 sections (1:1 with Kree8)
│   │   │   ├── Hero.tsx                   # Section 3
│   │   │   ├── FeaturesStrip.tsx          # Section 4
│   │   │   ├── TestimonialsCarousel.tsx   # Section 5
│   │   │   ├── BrandMarquee.tsx           # Section 6
│   │   │   ├── QuoteSection.tsx           # Section 7
│   │   │   ├── AchievementBento.tsx       # Section 8
│   │   │   ├── BenefitsGrid.tsx           # Section 9
│   │   │   ├── HowItWorks.tsx             # Section 10
│   │   │   ├── ServicesGrid.tsx           # Section 11
│   │   │   ├── Portfolio.tsx              # Section 12
│   │   │   ├── WorldClock.tsx             # Section 13
│   │   │   ├── EngagementModels.tsx       # Section 14 (replaces Pricing)
│   │   │   ├── MobileShowcase.tsx         # Section 15
│   │   │   ├── FAQ.tsx                    # Section 16
│   │   │   └── FinalCTA.tsx               # Section 17
│   │   │
│   │   ├── ui/                            # Reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx                  # Portfolio lightbox
│   │   │   ├── AnimatedText.tsx           # Typewriter effect
│   │   │   ├── ScrollReveal.tsx           # Framer Motion wrapper
│   │   │   ├── Marquee.tsx                # Infinite scroll base
│   │   │   └── LottieIcon.tsx             # Lottie player wrapper
│   │   │
│   │   ├── remotion/                      # Remotion compositions
│   │   │   ├── ServiceDemo.tsx            # Template for 9 service videos
│   │   │   ├── ChatbotMockup.tsx          # "How It Works" demo
│   │   │   └── compositions/              # Individual service demos
│   │   │       ├── ChatbotsDemo.tsx
│   │   │       ├── InvoiceOCRDemo.tsx
│   │   │       ├── BookingSystemsDemo.tsx
│   │   │       └── ... (6 more)
│   │   │
│   │   └── animations/
│   │       ├── variants.ts                # Framer Motion variant presets
│   │       └── useScrollProgress.ts       # Custom scroll hook
│   │
│   ├── content/                           # JSON content (centralized)
│   │   ├── en/
│   │   │   ├── common.json                # Navbar, footer, CTAs
│   │   │   ├── hero.json                  # Rotating words, headlines
│   │   │   ├── testimonials.json          # 4 placeholders
│   │   │   ├── services.json              # 9 services
│   │   │   ├── projects.json              # 5 portfolio items
│   │   │   ├── faq.json                   # 9 Q&A pairs
│   │   │   └── pricing.json               # 3 engagement models
│   │   ├── al/
│   │   │   └── ... (same structure)
│   │   └── shared.json                    # Non-translatable (logos, metrics)
│   │
│   ├── lib/
│   │   ├── utils.ts                       # cn() helper, formatters
│   │   ├── fonts.ts                       # Font loading config
│   │   └── resend.ts                      # Resend client
│   │
│   ├── hooks/
│   │   ├── useInView.ts                   # Intersection Observer
│   │   ├── useScrollDirection.ts          # Navbar hide/show
│   │   └── useMediaQuery.ts               # Responsive breakpoints
│   │
│   ├── types/
│   │   └── content.ts                     # TypeScript schemas for JSON
│   │
│   └── styles/
│       └── animations.css                 # @keyframes for marquee, ticker
│
├── i18n/
│   ├── request.ts                         # next-intl request config
│   └── routing.ts                         # Locale config
│
├── messages/                              # UI translations
│   ├── en.json
│   └── al.json
│
├── remotion/
│   ├── Root.tsx                           # Remotion composition registry
│   └── remotion.config.ts
│
├── middleware.ts                          # next-intl locale detection
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .env.local                             # RESEND_API_KEY, etc.
```

---

## 5. INTERNATIONALIZATION (i18n) ARCHITECTURE

### 5.1 Locale Configuration
**Supported Locales:** `en` (English), `al` (Albanian)
**Default Locale:** `en`

**File: `i18n/routing.ts`**
- Define `locales` array: `['en', 'al']`
- Export `defaultLocale` constant
- Create TypeScript type for Locale

### 5.2 Middleware Setup
**File: `middleware.ts`**
- Use `createMiddleware` from `next-intl/middleware`
- Auto-detect locale from `Accept-Language` header
- Redirect root `/` to `/en` or `/al`
- Handle locale switching (e.g., `/en` ↔ `/al`)

### 5.3 Routing Structure
**URLs:**
- English: `https://matriks.com/en`
- Albanian: `https://matriks.com/al`
- All pages use `[locale]` dynamic segment

**File: `app/[locale]/layout.tsx`**
- Wrap children with `<NextIntlClientProvider>`
- Load messages based on `locale` param
- Set `lang` attribute on `<html>`: `<html lang={locale}>`

### 5.4 Translation Files
**Structure:**
1. **UI Strings (`messages/{locale}.json`):**
   - Buttons, labels, navigation links
   - Used via `useTranslations()` hook in client components
   - Structure: `{ "nav": { "home": "Home", "services": "Services" } }`

2. **Content Copy (`src/content/{locale}/*.json`):**
   - Long-form marketing text, project descriptions
   - Imported directly in Server Components
   - Allows easy editing by non-developers

**Example Content File (`src/content/en/hero.json`):**
```json
{
  "statusBadge": "Available for New Projects",
  "mainHeading": "AI THAT WORKS FOR",
  "rotatingWords": ["YOUR CUSTOMERS", "REAL BUSINESS", "WHILE YOU SLEEP", "GROWING TEAMS"],
  "subtitle": "AI that actually works. No fluff. No hype. Just results.",
  "ctaPrimary": "View Plans and Pricing",
  "ctaSecondary": "Let's Go"
}
```

### 5.5 SEO for Both Languages
**Implementation:**
- Each page exports `generateMetadata()` function
- Dynamic `title`, `description`, `openGraph` per locale
- Add `<link rel="alternate" hreflang="en" />` and `<link rel="alternate" hreflang="sq" />` (Albanian = sq)
- Generate sitemap with both `/en` and `/al` URLs

---

## 6. CONTENT STRUCTURE (JSON SCHEMA)

### 6.1 TypeScript Schemas
**File: `src/types/content.ts`**

Define interfaces for all content types:
- `Service` (id, title, description, icon, hoverImage, remotionId, features)
- `Testimonial` (id, author, role, avatar, quote, rating)
- `Project` (id, title, description, image, tags, modalContent)
- `FAQItem` (id, question, answer, avatarLabel)
- `EngagementModel` (id, name, description, features, pricing, cta)

**Purpose:** Ensure type safety when loading JSON content

### 6.2 Content Files (Centralized for Easy Editing)

**File: `src/content/en/services.json`**
```json
[
  {
    "id": "chatbots",
    "title": "Intelligent Chatbots",
    "description": "AI assistants that handle customer inquiries 24/7 in multiple languages",
    "icon": "/images/icons/chatbot.json",
    "hoverImage": "/images/services/chatbot-abstract.jpg",
    "remotionId": "ChatbotsDemo",
    "features": ["Multi-language", "24/7 Support", "Live Handoff", "Chat History"]
  },
  // ... 8 more services
]
```

**File: `src/content/en/testimonials.json`**
```json
[
  {
    "id": "testimonial-1",
    "author": "Generic Hotel Owner",
    "role": "Owner, Hospitality Group",
    "avatar": "/images/avatars/placeholder-1.jpg",
    "quote": "The chatbot handles 80% of our guest inquiries. Response time went from hours to seconds.",
    "rating": 5
  },
  // ... 3 more testimonials
]
```

**File: `src/content/en/projects.json`**
```json
[
  {
    "id": "hotel-chatbot",
    "title": "Hotel Booking Assistant",
    "description": "Multi-language WhatsApp bot for direct bookings and guest support",
    "image": "/images/projects/hotel-chatbot-thumb.jpg",
    "tags": ["Chatbot", "4 Languages", "Direct Booking"],
    "modalContent": {
      "challenge": "Hotel chain needed to reduce response times...",
      "solution": "Built a WhatsApp bot connected to their booking system...",
      "results": "90% faster response time, 40% increase in direct bookings"
    }
  },
  // ... 4 more projects
]
```

**File: `src/content/shared.json`** (Non-translatable data)
```json
{
  "brandLogos": [
    "/images/logos/logo-1.svg",
    "/images/logos/logo-2.svg"
    // ... 14 logos total
  ],
  "metrics": {
    "projectsDelivered": "20+",
    "messagesProcessed": "50K+",
    "languagesSupported": "5+",
    "avgHoursSaved": "15/week"
  },
  "techCloud": [
    "Chat Integration",
    "Voice Support",
    "PDF Reading",
    "Albanian Support",
    "Multi-language",
    "Booking Systems",
    "Invoice Processing",
    "Customer Support",
    "Admin Dashboards",
    "Mobile Apps",
    "GDPR Compliance",
    "EU Standards",
    "Real-time Updates",
    "Workflow Automation",
    "System Connectors"
  ]
}
```

### 6.3 Loading Strategy
**Server Components (Preferred):**
```typescript
import servicesEN from '@/content/en/services.json';
import servicesAL from '@/content/al/services.json';

const services = locale === 'en' ? servicesEN : servicesAL;
```

**Type Safety:**
```typescript
import { Service } from '@/types/content';
const services: Service[] = locale === 'en' ? servicesEN : servicesAL;
```

---

## 7. ANIMATION SYSTEM

### 7.1 Framer Motion Strategy
**File: `src/components/animations/variants.ts`**

Define reusable animation variants:
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};
```

**Performance Guidelines:**
- **GPU-Accelerated Only:** Animate `transform` (translate, scale, rotate) and `opacity` exclusively
- **Avoid:** Animating `width`, `height`, `top`, `left`, `margin` (causes reflows)
- **will-change:** Use Framer Motion's automatic optimization (avoid manual `will-change` CSS)

### 7.2 Scroll-Triggered Animations
**Component: `src/components/ui/ScrollReveal.tsx`**
- Wrapper component using `motion.div` with `whileInView` prop
- Props: `variant` (fadeInUp, fadeInLeft, etc.), `threshold` (0.3 default), `once` (true)
- Usage: `<ScrollReveal variant="fadeInUp">{children}</ScrollReveal>`

**Implementation:**
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={variants[variant]}
>
  {children}
</motion.div>
```

### 7.3 CSS-Based Animations (High Performance)
**File: `src/styles/animations.css`**

**Infinite Marquee:**
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.marquee-animation {
  animation: marquee 40s linear infinite;
}
```

**Ticker (Task List):**
```css
@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.ticker-animation {
  animation: ticker 30s linear infinite;
}
```

**When to Use CSS vs Framer Motion:**
- **CSS:** Simple loops (marquee, ticker), continuous animations, background effects
- **Framer Motion:** User interactions, scroll-triggered, state-based, complex choreography

### 7.4 Lottie Animations
**Component: `src/components/ui/LottieIcon.tsx`**
- Wrapper for `lottie-react` library
- Props: `src` (path to .json), `autoplay` (false default), `playOnView` (true default)
- Use Intersection Observer to trigger play when entering viewport

**Lottie Sources:**
- Recommend LottieFiles.com (free tier)
- Categories: Business, Technology, Interface
- Required icons: Clock/timer, Screen/portal, Infinity/hand, Trophy, Chart/growth, Lightning bolt, Dollar/coin, Magnifying glass, Handshake

---

## 8. REMOTION INTEGRATION

### 8.1 Architecture Overview
**Strategy:** Pre-render videos during development, use `@remotion/player` for interactive playback in production

**Two Modes:**
1. **Development:** `npx remotion preview` for live editing compositions
2. **Production:** Embedded `<Player>` component in Next.js

### 8.2 Remotion Root Setup
**File: `remotion/Root.tsx`**
- Register all compositions (9 service demos + 1 chatbot mockup)
- Each composition: unique ID, component reference, duration (frames), fps, dimensions

**Example Registration:**
```typescript
import { Composition } from 'remotion';
import { ChatbotsDemo } from '@/components/remotion/compositions/ChatbotsDemo';

<Composition
  id="ChatbotsDemo"
  component={ChatbotsDemo}
  durationInFrames={180}
  fps={30}
  width={1280}
  height={720}
  defaultProps={{ service: 'chatbots' }}
/>
```

### 8.3 Service Demo Template
**File: `src/components/remotion/ServiceDemo.tsx`**

**Structure (6-second videos @ 30fps = 180 frames):**
- Frames 0-30: Title fade in ("Intelligent Chatbots")
- Frames 30-90: Mockup animation (e.g., chat messages appearing)
- Frames 90-150: Key benefit callouts (icons + text)
- Frames 150-180: Logo outro

**Animation Techniques:**
- Use `spring()` from Remotion for smooth, physics-based animations
- `interpolate()` for frame-based value mapping (opacity, position, scale)
- `useCurrentFrame()` to drive animations based on playback progress

**Example Pattern:**
```typescript
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
const scale = spring({ frame, fps: 30, from: 0.8, to: 1 });
```

### 8.4 Compositions to Build

**1. ChatbotsDemo** (Service Grid #1)
- Show mobile chat interface
- Messages appearing one by one (Albanian, English, German)
- Typing indicators, checkmarks for sent messages

**2. InvoiceOCRDemo** (Service Grid #2)
- PDF invoice thumbnail
- Highlight extracted fields (vendor, amount, date)
- Data populating into spreadsheet/dashboard

**3. BookingSystemsDemo** (Service Grid #3)
- Calendar interface
- Booking slots filling up
- Confirmation notification

**4. CustomerDashboardsDemo** (Service Grid #4)
- Dashboard UI with charts
- Real-time data updating (animated bars, pie charts)

**5. SentimentAnalysisDemo** (Service Grid #5)
- Review text appearing
- Sentiment score animating (😊 positive, 😐 neutral, 😞 negative)
- Color-coded visualization

**6. ReviewManagementDemo** (Service Grid #6)
- Multiple review sources (Google, Booking.com, TripAdvisor)
- Reviews aggregating into single dashboard

**7. MobileAppsDemo** (Service Grid #7)
- Phone mockup
- App UI screens transitioning
- Gesture interactions (swipe, tap effects)

**8. SystemConnectorsDemo** (Service Grid #8)
- Visual of data flowing between systems (CRM → Email → Calendar)
- Animated connection lines

**9. GDPRComplianceDemo** (Service Grid #9)
- Checklist items being ticked
- Data encryption/lock icons
- EU flag or compliance badge

**10. ChatbotMockup** (How It Works section)
- Full chatbot conversation flow
- User message → AI typing indicator → Response
- Live handoff to human agent
- Duration: 8 seconds (240 frames)

### 8.5 Integration in Next.js
**Component: `src/components/sections/ServicesGrid.tsx`**

**Playback Strategy:** Play on scroll into view, one at a time
- Use Intersection Observer to detect when each service card enters viewport
- Trigger `<Player>` autoPlay when card is 50% visible
- Pause when card leaves viewport (performance optimization)

**Implementation:**
```typescript
'use client';
import dynamic from 'next/dynamic';
import { useInView } from '@/hooks/useInView';

const Player = dynamic(() => import('@remotion/player').then(m => m.Player), { ssr: false });

export const ServiceCard = ({ service }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <div ref={ref}>
      <Player
        component={service.composition}
        durationInFrames={180}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        controls={false}
        autoPlay={inView}
        loop
        style={{ width: '100%', borderRadius: '16px' }}
      />
    </div>
  );
};
```

**Performance Notes:**
- Lazy load `<Player>` with `next/dynamic` and `ssr: false`
- Only 1-2 videos playing simultaneously (viewport-based control)
- Preload poster frames for instant visual feedback

---

## 9. SECTION-BY-SECTION IMPLEMENTATION

### SECTION 1: FIXED NAVBAR

**Position:** Fixed at top, z-index 3
**Dimensions:** Full width, height 83px
**Background:** `rgba(245, 245, 245, 0.91)` with `backdrop-filter: blur(5px)`
**Shadow:** `rgba(0, 0, 0, 0.02) 0px 22px 43px 0px`

**Layout:**
- Max width container: 1094px, centered
- Flexbox: justify-content space-between, align-items center
- Padding: 12px 32px

**Elements:**

1. **Logo (Left):**
   - MATRIKS wordmark with blue selection box SVG
   - Dimensions: ~116x59px
   - Selection box: Blue strokes with animated matrix corner handles
   - Link to `/${locale}` (home)

2. **Navigation Links (Center):**
   - 4 links: "Services", "AI Lab" (Projects), "Portfolio", "Contact"
   - Font: Inter 16px, weight 500, color: `rgba(0, 0, 0, 0.53)`
   - Letter-spacing: -0.48px
   - Smooth scroll to section IDs (#services, #projects, #portfolio, #contact)
   - Hover: Color transitions to full black `rgb(0, 0, 0)`

3. **CTA Button (Right):**
   - Text: "Plans and Pricing"
   - Sub-text (on hover): "Get Started Today"
   - Background: `rgb(22, 22, 22)`, border-radius: 118px, padding: 20px, height: 61px
   - Font: Inter 16px, weight 400, color: white
   - Multi-layer box shadow (7 layers from subtle to deep)
   - Links to #pricing section
   - Hover: Scale 1.02, shadow intensifies

**Behavior:**
- On scroll down: Hide navbar (translateY -100%)
- On scroll up: Show navbar (translateY 0)
- Use `useScrollDirection` hook to detect scroll direction
- Smooth transition: `transition: transform 0.3s ease`

**Responsive:**
- Mobile (< 640px): Hide center navigation links, show hamburger menu icon
- Tablet (640px - 1024px): Reduce padding, smaller CTA button

---

### SECTION 2: FLOATING BOTTOM NAVIGATION

**Position:** Fixed at bottom, 40px from bottom, centered horizontally, z-index 4
**Dimensions:** ~609px width, 69px height
**Shape:** Pill (border-radius: 56px)
**Background:** White with multi-layer shadow
**Shadow:** Similar to navbar shadow (creates floating effect)

**Layout:**
- Flexbox horizontal, gap 8px
- 5 nav icons + 1 CTA button

**Nav Items (5 items):**
Each item: 80px wide, 61px tall, border-radius: 42px, padding: 13px 19px

1. **Home** - House Lottie icon, links to `/${locale}`
2. **Achievements** - Trophy icon, links to #our-achievement
3. **Our Work** - Location pin icon, links to #our-work
4. **Compare** - Book icon, links to #comparision (skip this - no comparison table)
5. **FAQs** - Question mark circle icon, links to #faqs

**Active State:**
- Active item gets filled background: `rgb(245, 245, 245)`
- Icon highlighted (blue accent color)
- Label text appears below icon (Inter 12px, weight 500)

**CTA Button (Rightmost):**
- Text: "View Plans and Pricing"
- Background: `rgb(22, 22, 22)`, white text
- Border-radius: 118px, padding: 16px 20px
- Links to #pricing

**Responsive:**
- Desktop: Hide bottom nav entirely (only show on mobile/tablet)
- Mobile (< 1024px): Display bottom nav
- Adjust width to fit screen on small devices

---

### SECTION 3: HERO SECTION

**Dimensions:** Max width 1100px, centered, height ~735px
**Padding:** 39px 24px 0px
**Layout:** Flexbox column, align-items center, justify-content center

**Background Elements:**

1. **Grid Overlay (Absolute positioned):**
   - Position: Absolute, top 0, left 0, covers ~550px height
   - Background: Repeating SVG tile (graph paper pattern)
   - Background-size: 75.5px, opacity: 0.04
   - Creates subtle design canvas effect

2. **Dashed Line Dividers (Below hero):**
   - Horizontal line: 100% width, 2px height, dashed stroke, opacity: 0.17

**Elements (Top to Bottom):**

1. **Status Badge:**
   - Flexbox row, gap 8px, align-items center
   - Green dot indicator (2 concentric circles):
     - Outer: 8px diameter, `rgb(65, 193, 107)`
     - Inner: 4px diameter, `rgb(75, 191, 113)`
   - Text: "Available for New Projects"
   - Font: Inter 14px, weight 500, color: black, letter-spacing: -0.42px

2. **Main Heading:**
   - Text: "AI THAT WORKS FOR [ROTATING WORD]"
   - Font: Phudu 69px, weight 800, line-height: 67.62px, letter-spacing: -2.07px
   - Color: `rgb(0, 0, 0)`, text-align: center
   - Max width: 900px

3. **Rotating Word Animation:**
   - Words: ["YOUR CUSTOMERS", "REAL BUSINESS", "WHILE YOU SLEEP", "GROWING TEAMS"]
   - Typewriter effect: Characters appear one by one (50ms delay per character)
   - Blue selection box around word:
     - Box scales with word width (animate scaleX from 0 to 1 as word types)
     - Blue border: `rgb(52, 145, 255)`, stroke-width: 7.9px
     - Matrix corner handles: 8x8px squares at corners, subtle pulse animation
   - Cycle through words: Each word displays for 3 seconds, then deletes and next word types
   - Use Framer Motion's `AnimatePresence` for exit/enter transitions

4. **Subtitle:**
   - Text: "AI that actually works. No fluff. No hype. Just results."
   - Font: Inter 20px, weight 400, color: black, line-height: 26px, letter-spacing: -0.6px
   - Text-align: center
   - Margin-top: 16px

5. **CTA Buttons (Row):**
   - Flexbox row, gap 16px, justify-content center

   **Primary Button:**
   - Text: "View Plans and Pricing" (main), "Let's Go" (sub-text)
   - Background: `rgb(22, 22, 22)`, border-radius: 118px
   - Padding: 20px, height: 61px
   - Font: Inter 16px, color: white
   - Multi-layer box shadow (7 layers)
   - Links to #pricing
   - Hover: Scale 1.02, shadow glow effect

   **Secondary Button (Optional):**
   - Text: "See Our Work"
   - Background: transparent, border: 2px solid `rgb(22, 22, 22)`
   - Same size/shape as primary
   - Links to #our-work
   - Hover: Background fills with black, text turns white

**Animation Sequence (On page load):**
1. Status badge fades in (0.3s delay)
2. Main heading fades in from bottom (0.5s delay)
3. Typewriter starts for first rotating word (0.8s delay)
4. Subtitle fades in (1.2s delay)
5. CTA buttons fade in and scale up (1.5s delay)

**Responsive:**
- Desktop (> 1024px): Hero 69px font, full layout
- Tablet (640px - 1024px): Hero 48px font, reduce spacing
- Mobile (< 640px): Hero 36px font, stack elements tighter, buttons go full width

---

### SECTION 4: FEATURES STRIP

**Dimensions:** Width ~1052px, centered, height ~126px
**Layout:** Flexbox row, justify-content space-between, align-items center
**Background:** Transparent (sits on page bg)

**3 Feature Items:**
Each item: Flexbox column, align-items center, gap 12px

1. **48 Hours Delivery:**
   - Lottie icon: Clock/timer animation (~34-39px)
   - Text: "48 Hours" (bold), "Delivery" (regular)
   - Font: Inter 16px, weight 500 (bold lines) / 400 (regular lines)
   - Color: black
   - Text-align: center

2. **Private Design Portal:**
   - Lottie icon: Screen/portal animation
   - Text: "Access to Private", "Design Portal"
   - Adapt for MATRIKS: "Access to Private", "Project Portal"

3. **Unlimited Design Requests:**
   - Lottie icon: Hand/infinity animation
   - Text: "Unlimited Design", "Requests"
   - Adapt for MATRIKS: "Unlimited", "Revisions" (or "Requests")

**Dividers:**
- Vertical dashed lines between items
- Height: 100% of feature item (~60px)
- Width: 2px, dashed stroke, color: `rgba(0, 0, 0, 0.17)`

**Animation:**
- On scroll into view: Each feature item fades in from bottom (stagger 0.15s between items)

**Responsive:**
- Desktop: Horizontal row
- Mobile (< 640px): Vertical stack, remove dividers

---

### SECTION 5: TESTIMONIALS CAROUSEL

**Dimensions:** Width 100%, height ~801px
**Layout:** Horizontal scrolling carousel
**Background:** Transparent

**Carousel Configuration:**
- 4 testimonial cards
- Auto-sliding: 5 seconds per card
- Infinite loop (duplicate cards 4x for seamless scrolling)
- Pagination dots below carousel (4 dots, active dot highlighted)
- Previous/Next arrow buttons (absolute positioned, left/right edges)

**Testimonial Card Structure:**
Each card: Width 419px, flexbox column, gap 16px, padding 24px, border-radius 26px, background: white, box-shadow

Elements (top to bottom):
1. **Project Screenshot:**
   - Image: 419x293px, border-radius: 26px
   - Use placeholder images (e.g., Unsplash tech screenshots)

2. **Quote Text:**
   - Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.7)`
   - Line-height: 24px
   - Italic style

3. **Reply Bubble (Chat-style):**
   - Background: `rgb(22, 22, 22)`, border-radius: 18px, padding: 12px 16px
   - Text: "Thank you for the feedback" (or similar)
   - Font: Inter 14px, weight 400, color: white
   - Max-width: 70% (aligned right, like a sent message)

4. **Profile Section:**
   - Flexbox row, gap 12px, align-items center
   - Avatar: Circular image, 42x42px, border-radius 100%
   - Name: Inter 14px, weight 600, color: black
   - Role: Inter 12px, weight 400, color: `rgba(0, 0, 0, 0.53)`

**4 Testimonials (Placeholders):**
1. **Generic Hotel Owner** - "The chatbot handles 80% of our guest inquiries. Response time went from hours to seconds." - Reply: "We're glad we could help!"
2. **Tech Startup Founder** - "The AI automation saved us 15 hours per week on invoice processing. Game-changer for our ops team." - Reply: "Thank you!"
3. **Retail Business Manager** - "Multi-language support was crucial for our European customers. Seamless integration with our existing systems." - Reply: "We appreciate the feedback!"
4. **Agency Owner** - "Fast turnaround, excellent communication, and the final product exceeded our expectations." - Reply: "Looking forward to working with you again!"

**Pagination:**
- 4 dots below carousel
- Active dot: `rgb(52, 145, 255)`, 8px diameter
- Inactive dots: `rgba(0, 0, 0, 0.2)`, 6px diameter
- Clicking dot jumps to that testimonial

**Arrows:**
- Previous/Next buttons (absolute positioned)
- Icon: Arrow SVG or Unicode arrow
- Background: White circle, 40px diameter, box-shadow
- Hover: Scale 1.1, shadow intensifies

**Animation:**
- Cards slide left on auto-advance (smooth transform transition)
- On manual click: Snap to clicked card

**Responsive:**
- Desktop: Show 1.5 cards (center card full, adjacent cards partially visible)
- Tablet: Show 1 card fully
- Mobile: Show 1 card, smaller padding

---

### SECTION 6: BRAND LOGOS MARQUEE

**Dimensions:** Width 100%, height 126px
**Layout:** Horizontal infinite scroll marquee
**Background:** Transparent

**Logo Configuration:**
- 14 unique brand logos (grayscale, varying widths 80-92px)
- Duplicate array 2x for seamless loop (28 total logos in DOM)
- Gap between logos: 48px

**Logos (Placeholders - Use Generic Tech/Business Brands):**
Use SVG or PNG logos (convert to grayscale via CSS filter):
- TechCorp, BuildCo, DataFlow, CloudSys, etc.
- Find on Brandfetch.com or create abstract geometric logos

**Animation:**
- CSS-based `@keyframes marquee` animation (not Framer Motion for 60fps)
- Duration: 40s (adjust based on total width to maintain consistent speed)
- Direction: Right to left
- Continuous loop (no pauses)

**Implementation:**
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.marquee-container {
  display: flex;
  animation: marquee 40s linear infinite;
}
```

**Responsive:**
- Same behavior across all devices
- On mobile: Adjust animation speed slightly faster for smaller viewport

---

### SECTION 7: QUOTE SECTION

**Dimensions:** Width 100%, height ~183px, centered
**Layout:** Flexbox column, align-items center
**Background:** Transparent

**Elements (Top to Bottom):**

1. **Avatar:**
   - Circular image: 56x56px, border-radius 100%
   - Use placeholder (e.g., generic professional headshot or abstract icon)
   - Margin-bottom: 16px

2. **Quote Text:**
   - Text: "Brand is not what you say, It is what they say."
   - Font: Inter 18px, weight 400, color: `rgba(0, 0, 0, 0.7)`, letter-spacing: -0.54px
   - Text-align: center
   - Line-height: 26px
   - Max-width: 600px

3. **Attribution:**
   - Text: "- Marty Neumeier" (or generic "- Industry Expert")
   - Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.5)`
   - Text-align: center
   - Margin-top: 8px

4. **CTA Badge (Below quote):**
   - Text: "and they say what they see!"
   - Background: `rgb(0, 0, 0)`, border-radius: 25px, padding: 10px 12px
   - Font: Inter 12px, weight 400, color: white
   - Links to #pricing
   - Margin-top: 24px
   - Hover: Scale 1.05

**Animation:**
- Quote text fades in word by word (stagger 0.1s per word) on scroll into view

**Responsive:**
- Desktop: Full layout
- Mobile: Reduce font sizes slightly, adjust max-width

---

### SECTION 8: ACHIEVEMENT BENTO GRID

**ID:** "our-achievement"
**Dimensions:** Width 100%, max-width 1100px, centered, height ~1883px
**Layout:** Flexbox column

**Header:**
- Heading: "Our Achievement"
- Font: Satoshi 33px, weight 700, color: black, letter-spacing: -1.32px, line-height: 39.6px, text-align: center
- Subheading: "Curious about what we've accomplished? Let our track record speak for itself."
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Margin-bottom: 48px

**Bento Grid (3 Cards):**

**Card 1: Projects Delivered (Top Left)**
- Dimensions: 330x380px
- Background: White, border-radius: 28px, padding: 24px
- Box-shadow: Subtle shadow

Layout:
1. **Inner Container:**
   - Background: `rgb(245, 245, 245)`, border-radius: 22px, 318x262px
   - Contains collage of project screenshots (overlapping, rotated at slight angles)
   - Use 3-4 abstract project thumbnails (dashboards, mobile apps, chat interfaces)

2. **Metric Text (Below images):**
   - Text: "20+ Projects Delivered"
   - Font: Satoshi 24px, weight 700, color: black
   - Margin-top: 16px

3. **Subtitle:**
   - Text: "Helping businesses across various industries achieve their goals"
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`

**Card 2: Tech Cloud + Years of Experience (Top Right)**
- Dimensions: 330x380px
- Background: White, border-radius: 28px, padding: 24px
- Box-shadow: Subtle shadow

Layout:
1. **Background "Number":**
   - Giant "5" (representing years of experience, adjust based on reality)
   - Font: Euclid Circular B Bold, ~389px, color: `rgba(0, 0, 0, 0.18)` (very faint)
   - Position: Absolute, centered

2. **Trophy Icon (Center):**
   - Lottie animated trophy icon (~80px)
   - Position: Center of card

3. **Floating Tech Tags (Around Trophy):**
   - 15 tags from techCloud array (content/shared.json)
   - Each tag: Small pill badge, border-radius: 16px, padding: 6px 12px
   - Background: `rgb(245, 245, 245)`, border: 1px solid `rgba(0, 0, 0, 0.1)`
   - Font: Inter 11px, weight 500, color: black
   - Positioned randomly around trophy (use absolute positioning with random x/y offsets)
   - Animation: Subtle float effect (translateY -5px → 0px, 3s ease-in-out infinite)

4. **Metric Text (Bottom):**
   - Text: "5 Years of Experience" (adjust number)
   - Font: Satoshi 24px, weight 700, color: black
   - Subtitle: "Bringing expertise to every project"
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`

**Card 3: Savings/Impact (Bottom, Full Width)**
- Dimensions: 330x380px (or wider to balance grid)
- Background: White, border-radius: 28px, padding: 24px
- Box-shadow: Subtle shadow

Layout:
1. **Header:**
   - Text: "Impact"
   - Font: Satoshi 18px, weight 700, color: black

2. **Main Metric:**
   - Text: "50K+ Messages Processed"
   - Font: Satoshi 32px, weight 700, color: black
   - Margin-top: 16px

3. **Subtitle:**
   - Text: "so businesses can focus on what matters most"
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`

4. **Graph Visualization (Optional):**
   - Simple bar chart or line graph showing growth
   - Use SVG or CSS-based chart
   - Colors: Blue accent for bars/lines

**Animation:**
- On scroll into view: Cards fade in from bottom (stagger 0.2s)
- Tech tags animate in one by one (stagger 0.05s)

**Responsive:**
- Desktop: 2 columns (Card 1 + Card 2 side by side, Card 3 below, full width)
- Tablet/Mobile: 1 column, stack all cards vertically

---

### SECTION 9: BENEFITS GRID

**Dimensions:** Width 100%, max-width 1100px, centered
**Layout:** Flexbox column

**Header:**
- Heading: "Benefit of MATRIKS"
- Font: Satoshi 33px, weight 700, color: black
- Subheading: "Why Settle for Less? Before you dive in, let's show you why our solutions are the game-changer your business needs."
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Margin-bottom: 48px

**6 Benefit Cards (3 Columns x 2 Rows):**

Layout per card:
- Dimensions: ~320px width (flex-based, responsive)
- Background: White, border-radius: 28px, padding: 32px
- Box-shadow: Subtle shadow
- Flexbox column, gap 16px

Elements:
1. **Icon:**
   - Lottie animated icon (~40-50px)
   - Use icons from LottieFiles: Chart/growth, Lightning, Dollar, Magnifying glass, Screen, Handshake

2. **Title:**
   - Font: Satoshi 20px (or Inter 18px), weight 600-700, color: black
   - Margin-top: 12px

3. **Description:**
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`
   - Line-height: 21px

**6 Benefits (Adapted from Kree8):**

1. **Results-Focused Solutions**
   - Icon: Chart/growth icon
   - Title: "Results-Focused Solutions"
   - Description: "We help businesses grow by building AI tools that turn visitors into customers and streamline operations."

2. **Lightning-Fast Delivery**
   - Icon: Lightning bolt icon
   - Title: "Lightning-Fast Delivery"
   - Description: "Your projects are delivered within days, not weeks or months. We move fast without compromising quality."

3. **Transparent Pricing**
   - Icon: Dollar/coin icon
   - Title: "Transparent Pricing"
   - Description: "No surprises. Clear pricing from the start. Pay for what you need, when you need it."

4. **Problem Solving**
   - Icon: Magnifying glass icon
   - Title: "Problem Solving"
   - Description: "We solve your business challenges with innovative AI and automation solutions that drive real results."

5. **Private Project Portal**
   - Icon: Screen/portal icon
   - Title: "Private Project Portal"
   - Description: "Easily manage your projects, track progress, and communicate with our team from your own dashboard."

6. **Expert Team Access**
   - Icon: Handshake/person icon
   - Title: "Expert Team Access"
   - Description: "Work directly with experienced developers and AI specialists. No middlemen, no long-term contracts required."

**CTA Button (Below Grid):**
- Text: "View Plans and Pricing" / "Let's Go"
- Same styling as hero CTA (black pill button)
- Links to #pricing

**Animation:**
- On scroll into view: Cards fade in from bottom (stagger 0.1s per card, row by row)
- Icons play Lottie animation when card enters viewport

**Responsive:**
- Desktop (> 1024px): 3 columns
- Tablet (640px - 1024px): 2 columns
- Mobile (< 640px): 1 column

---

### SECTION 10: HOW IT WORKS

**Dimensions:** Width 100%, max-width 1100px, centered
**Layout:** Flexbox row (2 columns)

**Header (Full Width):**
- Heading: "How simple it can be to get your Projects Done"
- Font: Satoshi 33px, weight 700, color: black
- Subheading: "Just step away from those traditional old methods of hiring plus managing and see for yourself"
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Margin-bottom: 48px

**Left Column: Device Mockup (40% width):**
- Mockup: Dark tablet/phone showing chatbot interface
- Dimensions: ~400px width (responsive)
- Content: Remotion ChatbotMockup composition

**Remotion ChatbotMockup Specs:**
- Duration: 8 seconds (240 frames @ 30fps)
- Composition: Dark chat interface (like WhatsApp/Telegram)
- Animation sequence:
  1. User message appears: "Keni dhoma të lira?" (Do you have rooms available?)
  2. AI typing indicator (3 dots animating)
  3. AI response: "Po! 2 dhoma standard disponueshme." (Yes! 2 standard rooms available.)
  4. Follow-up exchange showing booking confirmation
  5. Loop back to start

- Design: Dark background `rgb(30, 30, 30)`, white text, blue accent for user messages, gray for AI responses
- Use `@remotion/player` with autoPlay, loop, no controls

**Right Column: 3 Step Cards (60% width):**
Flexbox column, gap 24px

**Step Card Structure:**
- Background: White, border-radius: 28px, padding: 32px
- Box-shadow: Subtle shadow
- Flexbox row, gap 16px

Elements:
1. **Step Number Badge:**
   - Circle: 48px diameter, background: `rgb(245, 245, 245)`, border: 2px solid `rgba(0, 0, 0, 0.1)`
   - Text: "1", "2", "3" - Font: Satoshi 24px, weight 700, color: black, text-align: center

2. **Content:**
   - Title: Font: Satoshi 20px, weight 700, color: black
   - Description: Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`, line-height: 21px

**3 Steps:**

1. **Discovery Call**
   - Title: "Discovery Call"
   - Description: "We start with a conversation to understand your needs, challenges, and goals. No commitment required."

2. **Prototype & Build**
   - Title: "Prototype & Build"
   - Description: "We create a working prototype in days, gather your feedback, and iterate until it's perfect."

3. **Launch & Automate**
   - Title: "Launch & Automate"
   - Description: "We deploy your solution, ensure everything runs smoothly, and provide ongoing support as needed."

**Animation:**
- Device mockup fades in from left
- Step cards fade in from right (stagger 0.2s)
- Chatbot video auto-plays when section enters viewport

**Responsive:**
- Desktop: 2 columns (mockup left, steps right)
- Mobile: 1 column (mockup top, steps below)

---

### SECTION 11: SERVICES GRID

**ID:** "services"
**Dimensions:** Width 100%, max-width 1100px, centered
**Layout:** Flexbox column

**Header:**
- Heading: "We are here to Serve..."
- Font: Satoshi 33px, weight 700, color: black
- Subheading: "Stop stressing yourself finding the perfect solution for your specific needs"
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Tip Text: "Tip: Scroll to see demos"
- Font: Inter 12px, weight 400, color: `rgba(0, 0, 0, 0.4)`, text-align: center
- Margin-bottom: 48px

**9 Service Cards (3 Columns x 3 Rows):**

**Card Structure:**
- Dimensions: ~320px width (flex-based), 280px height
- Background: White, border-radius: 28px, padding: 24px
- Box-shadow: Subtle shadow
- Overflow: hidden
- Flexbox column, align-items center, justify-content center

**Hover Behavior:**
- Default state: Shows title + icon collage (3-4 small abstract images rotated at angles)
- On scroll into view: Remotion video auto-plays, replaces static images
- Background image fades in behind video (subtle)

**Elements:**

1. **Title (Always Visible):**
   - Position: Absolute, top 24px, left 24px
   - Font: Satoshi 20px, weight 700, color: black
   - z-index above video

2. **Remotion Video (Plays on scroll):**
   - `@remotion/player` component
   - Dimensions: 100% width, auto height
   - Auto-play when card enters viewport (50% threshold)
   - Loop, no controls
   - Composition: Corresponding ServiceDemo (e.g., ChatbotsDemo)

3. **Static Image Collage (Fallback/Initial State):**
   - 3-4 small images (~79x66px each)
   - Rotated at slight angles (-5deg, 3deg, -2deg)
   - Positioned overlapping in center
   - Opacity: 0.8
   - Hidden when video plays (fade out transition)

**9 Services (Priority Order):**

1. **Intelligent Chatbots**
   - Remotion: ChatbotsDemo
   - Static images: Chat bubble icons, message screens

2. **Invoice OCR**
   - Remotion: InvoiceOCRDemo
   - Static images: PDF thumbnails, data extraction graphics

3. **Booking Systems**
   - Remotion: BookingSystemsDemo
   - Static images: Calendar grids, reservation confirmations

4. **Customer Dashboards**
   - Remotion: CustomerDashboardsDemo
   - Static images: Chart/graph graphics, analytics screens

5. **Sentiment Analysis**
   - Remotion: SentimentAnalysisDemo
   - Static images: Emoji faces, review stars, sentiment gauges

6. **Review Management**
   - Remotion: ReviewManagementDemo
   - Static images: Platform logos (Google, Booking.com), review cards

7. **Mobile Apps**
   - Remotion: MobileAppsDemo
   - Static images: Phone mockups, app screenshots

8. **System Connectors**
   - Remotion: SystemConnectorsDemo
   - Static images: Connection arrows, API icons, integration diagrams

9. **GDPR Compliance**
   - Remotion: GDPRComplianceDemo
   - Static images: Lock icons, EU flag, checkmarks

**Footer Text (Below Grid):**
- Text: "That's not it we do even More…"
- "More…" styled larger: Font: Inter 22px, weight 600
- Color: `rgba(0, 0, 0, 0.7)`

**Animation:**
- Cards fade in row by row (stagger 0.15s)
- Videos auto-play sequentially as user scrolls (one at a time to optimize performance)

**Responsive:**
- Desktop (> 1024px): 3 columns
- Tablet (640px - 1024px): 2 columns
- Mobile (< 640px): 1 column

---

### SECTION 12: PORTFOLIO

**ID:** "our-work"
**Dimensions:** Width 100%, max-width 1100px, centered
**Layout:** Flexbox column

**Header:**
- Text above: "Still confused about us"
- Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.5)`
- Heading: "See our work"
- Font: Satoshi 33px, weight 700, color: black
- Margin-bottom: 48px

**5 Portfolio Project Cards:**

**Card Structure:**
- Dimensions: ~990px width (full container width), height auto (image aspect ratio)
- Border-radius: 38px, overflow: hidden
- Box-shadow: Medium shadow
- Margin-bottom: 32px

**Elements:**

1. **Project Image:**
   - Dimensions: 900x558px (16:10 aspect ratio)
   - Use placeholder images (abstract tech/business scenes from Unsplash)
   - Full-bleed (covers card completely)

2. **Overlay Bar (Bottom):**
   - Position: Absolute, bottom 0, left/right 0
   - Background: `rgba(0, 0, 0, 0.08)` (frosted glass effect)
   - Backdrop-filter: `blur(10px)`
   - Border-radius: 34px, padding: 20px 32px
   - Dimensions: ~860x68px
   - Flexbox row, justify-content space-between, align-items center

3. **Project Logo (Left):**
   - Small logo/icon (~87x27px)
   - Use generic project name text if no logo available
   - Font: Satoshi 18px, weight 700, color: black

4. **View Project Button (Right):**
   - Background: White, border-radius: 58px
   - Padding: 16px 24px, height: 60px
   - Font: Inter 14px, weight 500, color: black
   - Icon: Arrow right (→) icon
   - Hover: Background turns black, text white, arrow icon animates right

**5 Projects (Based on JSON):**

1. **Hotel Booking Assistant**
   - Image: Hotel/hospitality scene or chatbot interface mockup
   - Logo: "Hotel Bot" text
   - Modal content: Challenge, solution, results

2. **Visual Product Search**
   - Image: E-commerce product grid or search interface
   - Logo: "Product Search" text

3. **Farm-to-Export Tracker**
   - Image: QR code scanner, agricultural products, or supply chain diagram
   - Logo: "Farm Tracker" text

4. **Invoice Processor**
   - Image: PDF documents, invoice layouts, or data extraction visuals
   - Logo: "Invoice AI" text

5. **Review Dashboard**
   - Image: Dashboard with charts, review cards, multi-platform logos
   - Logo: "Review Hub" text

**Modal/Lightbox (Triggered by "View Project" Button):**

**Modal Structure:**
- Full-screen overlay: Background `rgba(0, 0, 0, 0.9)`
- Modal container: Max-width 900px, centered, padding 48px
- Background: White, border-radius: 24px
- Close button (X icon, top-right corner)

**Modal Content:**
1. **Project Title:** Font: Satoshi 32px, weight 700
2. **Tags:** Row of tag badges (same style as project cards in JSON)
3. **Challenge Section:** Heading + paragraph
4. **Solution Section:** Heading + paragraph
5. **Results Section:** Heading + bullet points or metrics

**Animation:**
- Cards fade in on scroll (stagger 0.2s)
- Hover on card: Image scales 1.05, overlay bar slides up slightly
- Modal: Fade in overlay, scale up modal container (0.9 → 1)

**Responsive:**
- Desktop: Full layout
- Tablet: Reduce card width, maintain aspect ratio
- Mobile: Cards go full width, overlay bar text smaller

---

### SECTION 13: WORLD CLOCK

**Dimensions:** Width 100%, max-width 1100px, centered, height ~80px
**Layout:** Flexbox row, justify-content space-between
**Background:** Transparent

**4 Time Zone Displays:**

Each item: Flexbox column, align-items center, gap 4px

1. **Tirana, Albania**
2. **Berlin, Germany** (Central Europe)
3. **London, UK**
4. **New York, USA** (Optional - for global appeal)

**Elements per timezone:**

1. **City Name:**
   - Font: Inter 12px, weight 500, color: `rgba(0, 0, 0, 0.5)`
   - Text: "Tirana, Albania"

2. **Current Time:**
   - Font: Inter 18px, weight 600, color: black
   - Text: "14:32:15" (HH:MM:SS format)
   - Updates every second via JavaScript

**Implementation:**
- Use `Intl.DateTimeFormat` API for timezone conversion
- Use `useEffect` with `setInterval` to update time every 1 second
- Format: 24-hour clock

**Animation:**
- Subtle fade-in on scroll
- Time digits flip/fade on update (optional micro-animation)

**Responsive:**
- Desktop: Horizontal row
- Mobile: 2x2 grid or vertical stack

---

### SECTION 14: ENGAGEMENT MODELS (Replaces Pricing)

**ID:** "pricing"
**Dimensions:** Width 100%, max-width 1100px, centered
**Layout:** Flexbox column

**Header:**
- Heading: "Flexible Engagement Models"
- Font: Satoshi 33px, weight 700, color: black
- Subheading: "Choose the approach that fits your needs. No lock-in contracts, no surprises."
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Margin-bottom: 48px

**3 Engagement Model Cards (Horizontal Row):**

**Card Structure:**
- Dimensions: ~320px width (flex-based), auto height
- Border-radius: 40px, padding: 8px (outer), inner padding: 24px
- Box-shadow: Medium shadow
- Flexbox column

**Card 1: Discovery Sprint (Light Background)**

**Outer Container:**
- Background: White, border-radius: 40px, padding: 8px

**Inner Content:**
- Background: White, border-radius: 32px, padding: 24px

**Elements:**

1. **Icon:**
   - Small outline icon: Compass or lightbulb (~24px)
   - Color: Black

2. **Title:**
   - Text: "Discovery Sprint"
   - Font: Satoshi 28px, weight 700, color: black

3. **Description Bar:**
   - Background: `rgb(245, 245, 245)`, border-radius: 12px, padding: 12px
   - Text: "Perfect for exploring feasibility and scoping your AI project"
   - Font: Inter 13px, weight 400, color: `rgba(0, 0, 0, 0.7)`

4. **Feature List:**
   - Checkmark icons (green `rgb(34, 197, 94)`)
   - Font: Inter 14px, weight 400, color: black
   - Line-height: 28px

   Features:
   - 2-week sprint
   - Requirements analysis
   - Technical feasibility study
   - Working prototype
   - Architecture recommendations
   - Full documentation

5. **Pricing:**
   - Text: "From €50"
   - Font: Inter 29px, weight 600, color: black
   - Period: "one-time" - Font: Inter 18px, weight 400, color: `rgba(0, 0, 0, 0.54)`

6. **CTA Buttons (2 buttons, stacked or side-by-side):**

   **Primary:**
   - Text: "Book a Call" / "We'll be There"
   - Background: `rgb(22, 22, 22)`, white text
   - Border-radius: 118px, padding: 16px 20px
   - Links to Calendly URL (from .env)

   **Secondary:**
   - Text: "Connect on WhatsApp" / "Quick Chat"
   - Background: Transparent, border: 2px solid black
   - Border-radius: 118px
   - Links to WhatsApp URL (from .env)

**Card 2: Build & Launch (Dark Background - Featured)**

**Outer Container:**
- Background: `rgb(22, 22, 22)`, border-radius: 40px, padding: 8px

**Inner Content:**
- Background: `rgb(22, 22, 22)`, border-radius: 32px, padding: 24px
- All text: White

**Elements:**

1. **Icon:**
   - Small outline icon: Rocket or tools (~24px)
   - Color: White

2. **Title:**
   - Text: "Build & Launch"
   - Font: Satoshi 28px, weight 700, color: white

3. **Badge (Optional):**
   - Text: "Most Popular"
   - Background: `rgb(52, 145, 255)`, border-radius: 12px, padding: 6px 12px
   - Font: Inter 11px, weight 600, color: white
   - Position: Top-right corner or above title

4. **Description Bar:**
   - Background: `rgba(255, 255, 255, 0.1)`, border-radius: 12px, padding: 12px
   - Text: "Full implementation from prototype to production deployment"
   - Font: Inter 13px, weight 400, color: `rgba(255, 255, 255, 0.7)`

5. **Feature List:**
   - Checkmark icons (white or blue)
   - Font: Inter 14px, weight 400, color: white

   Features:
   - Complete build & deployment
   - Custom AI model integration
   - Multi-language support
   - Admin dashboard
   - 3 months support
   - Training & documentation
   - Source code ownership

6. **Pricing:**
   - Text: "From €200/month" or "From €500 one-time"
   - Font: Inter 29px, weight 600, color: white
   - Period: "flexible payment" - Font: Inter 18px, weight 400, color: `rgba(255, 255, 255, 0.54)`

7. **CTA Buttons:**
   - Primary: White bg, black text
   - Secondary: Transparent with white border

**Card 3: Ongoing Support (Light Background)**

**Similar to Card 1 structure, white background**

**Elements:**

1. **Icon:**
   - Headset or refresh icon (~24px)

2. **Title:**
   - Text: "Ongoing Support"

3. **Description:**
   - "Retainer for continuous updates, maintenance, and feature additions"

4. **Feature List:**
   - Monthly retainer
   - Priority support
   - Feature updates
   - Performance monitoring
   - Scaling assistance
   - Custom integrations
   - Depends on scope

5. **Pricing:**
   - Text: "Custom Pricing"
   - Subtext: "Based on your needs"

6. **CTA Buttons:**
   - Same as Card 1

**Animation:**
- Cards fade in from bottom (stagger 0.15s)
- Center card (Build & Launch) scales slightly larger (1.05) on hover

**Responsive:**
- Desktop (> 1024px): 3 columns
- Tablet/Mobile: Stack vertically

---

### SECTION 15: MOBILE APP SHOWCASE

**Dimensions:** Width 100%, height ~400px
**Layout:** Flexbox row, justify-content center, align-items center
**Background:** `rgb(245, 245, 245)` or subtle gradient

**Elements:**

**4 Mobile Phone Mockups (Side by Side):**
- Each mockup: iPhone/Android frame (~240px height)
- Gap between mockups: 24px
- Displayed at slight angles (rotate -3deg, 1deg, -1deg, 2deg)

**Mockup Content:**
- Screenshots of mobile app UIs (placeholder designs)
- Categories: Service booking app, dashboard app, chat app, e-commerce app
- Use abstract/minimal designs (not specific client work)

**Optional Text Above:**
- Text: "Mobile Apps Built for Impact"
- Font: Satoshi 24px, weight 700, color: black
- Text-align: center

**Animation:**
- Mockups fade in and float up (stagger 0.1s)
- Subtle parallax effect on scroll (phones move at different speeds)

**Responsive:**
- Desktop: 4 mockups side by side
- Tablet: 2x2 grid
- Mobile: Horizontal scrollable carousel

---

### SECTION 16: FAQ (Chat-Style Design)

**ID:** "faqs"
**Dimensions:** Width 100%, max-width 1100px, centered, height ~1283px
**Layout:** Flexbox column

**Header:**
- Heading: "Frequently Asked Questions"
- Font: Satoshi 33px, weight 700, color: black
- Subheading: "We Get It—Curiosity Leads to Success! Got questions? That's a great sign. Here are some"
- Font: Inter 16px, weight 400, color: `rgba(0, 0, 0, 0.6)`, text-align: center
- Margin-bottom: 48px

**FAQ Items (Chat Bubble Design):**

**Layout Pattern:**
- Questions: Right-aligned, gray pill bubbles
- Answers: Left-aligned, white text, with avatar on left
- Each Q&A pair has vertical spacing (32px margin-bottom)

**Question Bubble (Right Side):**
- Background: `rgb(245, 245, 245)`, border-radius: 24px, padding: 16px 20px
- Max-width: 70%, align-self: flex-end
- Font: Inter 15px, weight 500, color: black
- Expand/collapse icon: "+" icon on left of text
- Staggered positioning: Each question slightly offset left from previous

**Answer Section (Left Side):**
- Flexbox row, gap 12px, align-items flex-start

1. **Avatar:**
   - Circular image: 40x40px, border-radius 100%
   - Use generic profile photo or MATRIKS logo
   - Label below: "Hi! MATRIKS here" - Font: Inter 10px, weight 500, color: `rgba(0, 0, 0, 0.5)`

2. **Answer Bubble:**
   - Background: White, border-radius: 24px, padding: 16px 20px
   - Max-width: 70%
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.8)`
   - Line-height: 21px
   - Box-shadow: Subtle shadow

**9 FAQ Questions (Adapted from Kree8):**

1. **"Who's behind MATRIKS?"**
   - Answer: "A team of experienced AI engineers and full-stack developers passionate about building practical AI solutions for businesses."

2. **"How does the delivery process work?"**
   - Answer: "We start with a discovery call, build a working prototype within days, gather your feedback, and iterate until you're 100% satisfied. Most projects launch within 2-4 weeks."

3. **"Is there a limit to revisions?"**
   - Answer: "No limits! We iterate until the solution meets your exact requirements. Your satisfaction is our priority."

4. **"How fast will I receive my solution?"**
   - Answer: "Initial prototypes typically within 48-72 hours. Full builds depend on complexity, but most projects complete within 2-4 weeks."

5. **"What if I don't like the solution?"**
   - Answer: "We work with you through unlimited revisions until it's right. If we can't deliver what you need, we'll be transparent about it upfront."

6. **"Do you work with platforms like Shopify/WordPress?"**
   - Answer: "Yes! We integrate with most platforms. If you have specific requirements, let's discuss them during discovery."

7. **"Can I pause or cancel my project?"**
   - Answer: "For ongoing support, yes. For one-time projects, we agree on scope upfront and deliver on that commitment."

8. **"Why not just hire a full-time developer?"**
   - Answer: "Full-time costs €40k-80k/year plus benefits. With us, you pay only for what you need, with flexibility to scale up or down."

9. **"Can I get a refund?"**
   - Answer: "We don't offer refunds, but we stand by our work. If you're not satisfied, we'll revise until you are. We can pause projects if needed."

**Behavior:**
- Click question to expand/collapse answer
- Initially all collapsed except first question (default open)
- Smooth height transition animation (0.3s ease)

**Footer CTA (Below FAQs):**
- Text: "Can't find your answer?"
- Font: Satoshi 19.1px, weight 600, color: black
- Button: "Send us a Mail"
  - Background: `rgb(22, 22, 22)`, border-radius: 58px, padding: 16px 24px
  - Icon: Paper airplane icon
  - Links to `mailto:matriks.dev@gmail.com`

**Animation:**
- FAQ items fade in on scroll (stagger 0.1s)
- Answer bubbles expand with smooth height animation

**Responsive:**
- Desktop: Full layout
- Mobile: Reduce max-width of bubbles to 85%, smaller padding

---

### SECTION 17: FINAL CTA (Dark Section)

**ID:** "footer" (note: this is before actual footer)
**Dimensions:** Width 100%, max-width 1082px, centered, height ~680px
**Layout:** Flexbox column, align-items center, justify-content center
**Background:** `rgb(22, 22, 22)`, border-radius: 40px
**Padding:** 32px

**Background Effects:**

1. **Grid Pattern Overlay:**
   - Similar to hero grid, but white lines on dark background
   - Opacity: 0.02-0.03
   - Repeating pattern

2. **Radial Gradient Glow:**
   - CSS: `radial-gradient(25% 46% at 39% 88%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)`
   - Creates soft white glow near bottom-left corner

**Elements (Top to Bottom):**

1. **Heading:**
   - Text: "If you scrolled this far, It's time to LEVEL UP"
   - Font: Satoshi 44px, weight 700, color: white, line-height: 44px
   - Text-align: center
   - Max-width: 700px

2. **CTA Button (Center):**
   - Text: "Join the Elite Club"
   - Background: White, color: black, border-radius: 72px
   - Padding: 20px 32px, height: 69px
   - Font: Inter 16px, weight 600
   - Icon: Sparkle/star icon (✨) beside text
   - Links to #pricing

   **Glow Effect Behind Button:**
   - Absolute positioned div behind button
   - Radial gradient: `radial-gradient(25% 36% at 5.6% 44.4%, white 0%, transparent 100%)`
   - Width: ~237px, height: 69px, opacity: 0.3

   **Hover:**
   - Button scales to 1.05
   - Glow intensifies (opacity 0.5)

3. **Sub-Text Badge:**
   - Text: "Just click"
   - Background: `rgba(255, 255, 255, 0.1)`, border-radius: 16px, padding: 8px 12px
   - Font: Inter 11px, weight 400, color: `rgba(255, 255, 255, 0.7)`
   - Position: Below button (margin-top: 16px)

4. **"Trust me we are good at this" Section (Bottom):**

**Dark Gray Card:**
- Background: `rgba(255, 255, 255, 0.05)`, border-radius: 13px, padding: 24px
- Max-width: 800px
- Margin-top: 64px

**Text Above Ticker:**
- Text: "Trust me we are good at this :)"
- Font: Inter 14px, weight 500, color: white
- Text-align: center
- Margin-bottom: 16px

**Two Horizontal Scrolling Tickers:**

**Top Ticker (Scrolls Left):**
- Task chips: "Fix chatbot flow", "Process 100 invoices", "Build booking system", "Dashboard redesign"
- Each chip: Background `rgba(255, 255, 255, 0.1)`, border-radius: 20px, padding: 8px 16px
- Font: Inter 13px, weight 500, color: white
- Gap between chips: 12px
- CSS animation: `ticker-left 30s linear infinite`

**Bottom Ticker (Scrolls Right):**
- Task chips: "WhatsApp integration", "Multi-language support", "GDPR compliance", "API connectors"
- Same styling as top ticker
- CSS animation: `ticker-right 35s linear infinite` (opposite direction, different speed)

**Center Text (Between Tickers):**
- Text: "building..." (styled like Kree8's "kree8ing...")
- Font: Chelsea Market 16px, weight 400, color: white
- Position: Absolute, centered between the two tickers
- Typing animation: Cursor blink effect

**Animation:**
- Section fades in on scroll
- Tickers start scrolling on viewport entry
- CTA button pulses subtly (scale 1 → 1.02 → 1, 3s ease-in-out infinite)

**Responsive:**
- Desktop: Full layout
- Tablet: Reduce heading font size to 32px
- Mobile: Heading 24px, button full width, tickers scroll faster

---

### SECTION 18: FOOTER

**Dimensions:** Width 100%, max-width 1100px, centered, height ~200px
**Layout:** Flexbox column, align-items center
**Background:** Transparent (sits on page bg)
**Padding:** 48px 24px 24px

**Elements (Top to Bottom):**

1. **Location Text:**
   - Text: "Based in Albania, serving clients across Europe."
   - Font: Inter 14px, weight 400, color: `rgba(0, 0, 0, 0.6)`
   - Text-align: center

   **Secondary Text:**
   - Text: "We speak Albanian, English, Italian & German."
   - Font: Inter 13px, weight 400, color: `rgba(0, 0, 0, 0.5)`
   - Margin-top: 8px

2. **Social Links (Optional):**
   - Flexbox row, gap 24px, justify-content center
   - Links: GitHub, LinkedIn, Instagram (if applicable)
   - Icons: 20x20px SVG icons, color: `rgba(0, 0, 0, 0.5)`
   - Hover: Color changes to black

3. **Copyright:**
   - Text: "© 2026 MATRIKS. All rights reserved."
   - Font: Inter 12px, weight 400, color: `rgba(0, 0, 0, 0.4)`
   - Text-align: center
   - Margin-top: 24px

4. **"Made With" Text:**
   - Text: "Built with React, Remotion & lots of coffee"
   - Font: Inter 11px, weight 400, color: `rgba(0, 0, 0, 0.35)`
   - "React" and "Remotion" highlighted in blue accent color
   - Text-align: center
   - Margin-top: 8px

**Responsive:**
- Same layout across all devices
- Adjust padding on mobile

---

## 10. RESPONSIVE DESIGN STRATEGY

### 10.1 Breakpoints (Tailwind Config)
```
'sm': '640px'   (Tablet portrait)
'md': '768px'   (Tablet landscape)
'lg': '1024px'  (Desktop)
'xl': '1280px'  (Large desktop)
'2xl': '1536px' (Extra large desktop)
```

### 10.2 Mobile-First Approach
- Default styles target mobile (< 640px)
- Use responsive prefixes for larger screens: `md:`, `lg:`, `xl:`

### 10.3 Key Responsive Changes

**Navigation:**
- Desktop: Show full navbar with center links
- Mobile: Hide center links, show hamburger menu, display bottom nav

**Hero:**
- Desktop: Font size 69px, full spacing
- Tablet: Font size 48px
- Mobile: Font size 36px, tighter spacing

**Grids:**
- 3-column grids → 2 columns on tablet → 1 column on mobile
- Adjust gap sizes (32px → 24px → 16px)

**Carousels:**
- Desktop: Show 1.5 cards (center + partial adjacent)
- Tablet: Show 1 full card
- Mobile: Show 1 card, swipe gestures

**Sections:**
- Desktop: Max-width 1100px
- Mobile: Full width with 24px horizontal padding

**Typography:**
- Scale down heading sizes by 25-40% on mobile
- Maintain readability: Body text minimum 14px

### 10.4 Touch Interactions
- Increase tap target sizes to 44x44px minimum (mobile buttons)
- Enable swipe gestures for carousels
- Disable hover effects on touch devices (use `@media (hover: hover)`)

---

## 11. PERFORMANCE OPTIMIZATION

### 11.1 Image Optimization
- **Use `next/image`:** Auto-generates responsive srcsets, lazy loads, WebP conversion
- **Priority prop:** Add to hero images and above-the-fold assets
- **Placeholder:** Use `blurDataURL` for LQIP (Low-Quality Image Placeholder)

### 11.2 Code Splitting
- **Dynamic Imports:** Use `next/dynamic` for heavy components
  - Remotion Player: `const Player = dynamic(() => import('@remotion/player'), { ssr: false })`
  - Lottie animations: Load only when in viewport
  - Modal components: Load on demand

### 11.3 Animation Performance
- **GPU-Accelerated Properties:** Only animate `transform` and `opacity`
- **CSS Animations for Loops:** Use CSS `@keyframes` for marquees, tickers (not Framer Motion)
- **Lazy Load Animations:** Use `whileInView` with `once: true` to prevent re-triggering
- **Remotion Videos:** Auto-play only when in viewport, pause when out

### 11.4 Font Loading
- **next/font optimization:** Automatic font subsetting, preloading, self-hosting
- **Font Display Swap:** Use `display: 'swap'` to prevent FOIT (Flash of Invisible Text)

### 11.5 Bundle Size
- **Tree-Shaking:** Import only needed functions (e.g., `import { motion } from 'framer-motion'`)
- **Bundle Analyzer:** Use `@next/bundle-analyzer` to identify large dependencies
- **External CDNs:** Consider loading large libraries (if any) from CDN

### 11.6 Lighthouse Targets
- **Performance:** > 90 (optimize animations, images, lazy load)
- **Accessibility:** 100 (semantic HTML, ARIA labels, keyboard navigation, color contrast)
- **Best Practices:** 100 (HTTPS, no console errors, valid HTML)
- **SEO:** 100 (metadata, alt tags, structured data, sitemap)

---

## 12. SEO & METADATA

### 12.1 Page Metadata
**File: `app/[locale]/page.tsx`**

```typescript
export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    metadataBase: new URL('https://matriks.com'),
    title: t('title'), // "MATRIKS - AI & Full-Stack Development Agency"
    description: t('description'), // "We build intelligent chatbots, automation tools, and custom apps for businesses in Albania and Europe."
    keywords: t('keywords'), // "AI development, chatbots, automation, Albania, full-stack"
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'sq_AL',
      siteName: 'MATRIKS',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://matriks.com/${locale}`,
      languages: {
        'en': 'https://matriks.com/en',
        'sq': 'https://matriks.com/al',
      },
    },
  };
}
```

### 12.2 Structured Data (JSON-LD)
**File: `app/[locale]/layout.tsx`**

Add to `<head>`:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MATRIKS',
      description: 'AI & Full-Stack Development Agency',
      url: 'https://matriks.com',
      logo: 'https://matriks.com/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'matriks.dev@gmail.com',
        contactType: 'Customer Service',
      },
      sameAs: [
        'https://linkedin.com/company/matriks', // Update with real URLs
        'https://github.com/matriks',
      ],
    }),
  }}
/>
```

### 12.3 Sitemap
**File: `app/sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://matriks.com';
  const locales = ['en', 'al'];

  return locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));
}
```

### 12.4 Robots.txt
**File: `app/robots.ts`**

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://matriks.com/sitemap.xml',
  };
}
```

### 12.5 Alt Tags & Semantic HTML
- All images must have descriptive `alt` attributes
- Use semantic HTML5 tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy: Single `<h1>` per page, then `<h2>`, `<h3>` in order

---

## 13. EMAIL INTEGRATION (RESEND)

### 13.1 Resend Configuration
**File: `src/lib/resend.ts`**

```typescript
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
```

**.env.local:**
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=matriks.dev@gmail.com
```

### 13.2 Contact Form API Route
**File: `app/api/contact/route.ts`**

```typescript
import { resend } from '@/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'MATRIKS Contact <contact@matriks.com>', // Update with verified domain
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Contact from ${name} - MATRIKS`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 13.3 Contact Form Component
**File: `src/components/sections/Contact.tsx`**

**Form Fields:**
1. Name (required)
2. Email (required)
3. Company (optional)
4. Message (required)

**Validation:**
- Name: Min 2 characters
- Email: Valid email regex
- Message: Min 10 characters

**Form State:**
- Loading state during submission
- Success state after send
- Error state if submission fails

**Implementation:**
- Use `useState` for form data and submission state
- Use `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`
- Show success message on successful send
- Reset form after success
- Display error message if failed

---

## 14. TESTING & VERIFICATION

### 14.1 Visual Testing
**Before Launch:**
1. Compare pixel-perfect to Kree8.studio reference screenshots
2. Test all breakpoints (mobile, tablet, desktop)
3. Verify all animations trigger correctly
4. Test hover states on all interactive elements

**Tools:**
- Browser DevTools responsive mode
- BrowserStack for cross-browser testing
- Percy or Chromatic for visual regression testing (optional)

### 14.2 Functional Testing
**Manual Tests:**
1. **Navigation:**
   - Click all navbar links, verify smooth scroll to sections
   - Test language toggle (EN ↔ AL), verify content updates
   - Test mobile hamburger menu

2. **Forms:**
   - Submit contact form with valid data, verify email received
   - Test form validation (empty fields, invalid email)
   - Verify success/error states display correctly

3. **Carousels:**
   - Test auto-sliding testimonials
   - Click pagination dots, verify jump to correct slide
   - Test prev/next arrows

4. **Modals:**
   - Click portfolio "View Project" buttons, verify modal opens
   - Test close button, verify modal closes
   - Test clicking outside modal to close

5. **Remotion Videos:**
   - Verify videos auto-play when scrolled into view
   - Verify videos pause when out of viewport (performance check)
   - Test on mobile (videos should work on iOS Safari)

6. **FAQ:**
   - Click questions to expand/collapse
   - Verify smooth height transitions

### 14.3 Performance Testing
**Run Lighthouse Audits:**
- Target scores: Performance > 90, Accessibility 100, Best Practices 100, SEO 100
- Test on both desktop and mobile
- Identify and fix any performance bottlenecks

**Check:**
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### 14.4 SEO Testing
**Verify:**
1. Meta tags present on all pages (title, description, OG tags)
2. Sitemap accessible at `/sitemap.xml`
3. Robots.txt accessible at `/robots.txt`
4. Alt tags on all images
5. Proper heading hierarchy (single H1, then H2, H3)
6. Structured data validates (test with Google Rich Results Test)

### 14.5 Cross-Browser Testing
**Test on:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest, including iOS Safari)
- Edge (latest)

**Known Issues to Watch:**
- Safari: Backdrop-filter may have performance issues
- iOS Safari: Autoplay videos may require user interaction (use muted + playsinline attributes)

### 14.6 i18n Testing
**Verify:**
1. Language toggle switches content correctly
2. All sections display Albanian translations
3. No missing translation keys (check console for warnings)
4. Date/time formats match locale (World Clock section)
5. URLs update on language switch (`/en` ↔ `/al`)

### 14.7 Analytics Verification
**After deploying Google Analytics:**
1. Verify tracking code loads on all pages
2. Test event tracking (button clicks, form submissions)
3. Check real-time reports in GA dashboard

---

## 15. DEPLOYMENT STRATEGY

### 15.1 Pre-Deployment Checklist
1. **Environment Variables:**
   - Set `RESEND_API_KEY` in Vercel environment variables
   - Set `NEXT_PUBLIC_SITE_URL` to production domain
   - Add any other required env vars (Calendly URL, WhatsApp number)

2. **Domain Setup:**
   - Purchase domain (e.g., matriks.dev, matriks.io)
   - Configure DNS to point to Vercel
   - Enable HTTPS (automatic with Vercel)

3. **Asset Optimization:**
   - Compress all images (use ImageOptim or TinyPNG)
   - Ensure all fonts are in `/public/fonts/`
   - Verify Lottie JSON files are optimized (< 100KB each)

4. **Final Build Test:**
   - Run `npm run build` locally
   - Check for build errors or warnings
   - Run `npm run start` to test production build

### 15.2 Vercel Deployment
**Steps:**
1. Connect GitHub repo to Vercel
2. Configure build settings:
   - Framework: Next.js
   - Build command: `next build`
   - Output directory: `.next`
3. Add environment variables in Vercel dashboard
4. Deploy to production

**Post-Deployment:**
1. Verify site loads at production URL
2. Test all functionality (forms, navigation, videos)
3. Run Lighthouse audit on production URL
4. Monitor Vercel analytics for errors

### 15.3 Remotion Video Rendering
**Option 1: Pre-Render During Build (Recommended):**
- Add build script to package.json:
  ```
  "build": "remotion render && next build"
  ```
- Render all 10 Remotion compositions to `/public/videos/` directory
- Reference pre-rendered MP4s in production

**Option 2: Render On-Demand:**
- Use `@remotion/lambda` or `@remotion/renderer` in API routes
- Cache rendered videos in cloud storage (AWS S3, Cloudflare R2)
- Higher cost, slower initial load, but allows dynamic content

### 15.4 Continuous Integration (Optional)
**GitHub Actions Workflow:**
1. Run `npm run lint` on every PR
2. Run `npm run build` to catch build errors
3. Run Lighthouse CI to enforce performance budgets
4. Auto-deploy to Vercel preview on PR, production on merge to main

### 15.5 Monitoring & Maintenance
**Post-Launch:**
1. Set up Vercel Analytics (free tier)
2. Enable Google Analytics (GA4)
3. Monitor error logs in Vercel dashboard
4. Set up uptime monitoring (e.g., UptimeRobot, Pingdom)

**Regular Tasks:**
1. Update dependencies monthly (`npm outdated`, `npm update`)
2. Check Lighthouse scores quarterly, optimize if scores drop
3. Review analytics for user behavior insights
4. Update content in JSON files as needed

---

## 16. IMPLEMENTATION NOTES

### 16.1 Critical Dependencies
**Must-Have Packages:**
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-intl": "^3.20.0",
    "framer-motion": "^11.0.0",
    "@remotion/player": "^4.0.0",
    "remotion": "^4.0.0",
    "resend": "^4.0.0",
    "lottie-react": "^2.4.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "@next/bundle-analyzer": "^14.2.0"
  }
}
```

### 16.2 File Organization Principles
1. **Colocate related files:** Components, styles, types in same directory
2. **Centralize content:** All copy in `src/content/{locale}/` for easy editing
3. **Separate concerns:** Layout components, section components, UI primitives in distinct folders
4. **TypeScript everywhere:** Define interfaces for all props and content schemas

### 16.3 Code Quality Standards
1. **No `any` types:** Use proper TypeScript typing
2. **Component props interfaces:** Define explicit prop types for all components
3. **Consistent naming:** PascalCase for components, camelCase for functions/variables
4. **Comments:** Add JSDoc comments for complex functions
5. **ESLint:** Run `npm run lint` before every commit

### 16.4 Accessibility (a11y) Requirements
1. **Keyboard Navigation:** All interactive elements accessible via Tab key
2. **Focus Indicators:** Visible focus outlines on all focusable elements
3. **ARIA Labels:** Add `aria-label` to icon-only buttons
4. **Alt Text:** Descriptive alt text for all images
5. **Color Contrast:** Minimum 4.5:1 ratio for text (WCAG AA)
6. **Skip Links:** Add "Skip to main content" link at top of page
7. **Screen Reader Testing:** Test with NVDA (Windows) or VoiceOver (Mac)

### 16.5 Performance Best Practices
1. **Lazy Load Off-Screen Content:** Use `next/dynamic` for below-the-fold components
2. **Optimize Images:** Use `next/image` with proper sizing and formats
3. **Minimize JavaScript:** Only load what's needed per page
4. **CSS-in-JS vs CSS Modules:** Use Tailwind for utility classes, avoid runtime CSS-in-JS for static styles
5. **Debounce/Throttle:** For scroll listeners, resize handlers

---

## 17. TROUBLESHOOTING GUIDE

### 17.1 Common Issues

**Issue: i18n routes not working**
- **Solution:** Verify `middleware.ts` is at root level, check `i18n/routing.ts` config

**Issue: Remotion Player not rendering**
- **Solution:** Ensure `ssr: false` in `next/dynamic` import, check console for errors

**Issue: Fonts not loading**
- **Solution:** Verify font files in `/public/fonts/`, check `next/font` config, ensure CSS variables applied to `<html>`

**Issue: Animations janky/slow**
- **Solution:** Use `transform` and `opacity` only, avoid animating layout properties, check for too many simultaneous animations

**Issue: Contact form not sending**
- **Solution:** Check Resend API key in `.env.local`, verify domain is verified in Resend dashboard, check API route logs

**Issue: Build errors on Vercel**
- **Solution:** Run `npm run build` locally to reproduce, check for missing dependencies, verify env vars are set in Vercel

### 17.2 Debugging Tips
1. **Next.js DevTools:** Use React DevTools and Next.js built-in debugging
2. **Console Logs:** Add strategic `console.log()` for state/prop debugging (remove before production)
3. **Lighthouse:** Use Lighthouse CI to catch performance regressions
4. **Network Tab:** Check for failed requests, large assets

---

## 18. FINAL VERIFICATION CHECKLIST

**Before marking plan as complete, verify:**

- [ ] All 18 sections specified in detail
- [ ] i18n architecture fully documented (EN/AL routing, translation files)
- [ ] Remotion integration strategy clear (10 compositions, auto-play logic)
- [ ] Animation system defined (Framer Motion variants, CSS animations)
- [ ] Content JSON schemas documented with examples
- [ ] Responsive breakpoints and mobile-first approach specified
- [ ] Performance optimization strategies listed
- [ ] SEO metadata, sitemap, structured data covered
- [ ] Email integration (Resend) fully documented
- [ ] Testing strategy comprehensive (visual, functional, performance)
- [ ] Deployment workflow clear (Vercel, env vars, domain setup)
- [ ] Accessibility requirements specified
- [ ] Matrix-themed selection box personalization detailed
- [ ] Engagement models (pricing) adapted from Kree8's subscription model
- [ ] All user requirements addressed (playful tone, Albanian focus, no AI-generated feel)

---

**This implementation plan provides a complete roadmap for building the MATRIKS website. The plan prioritizes pixel-perfect design matching Kree8.studio while adapting content for the AI/full-stack development business model. All technical details, from folder structure to animation timings, are specified to enable efficient implementation without requiring additional design decisions during development.**
