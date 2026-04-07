# Denada.dev — Personal Developer Portfolio

## What this is
Personal portfolio site for Denada, a full-stack developer and AI engineer based in Tirana, Albania. Rebranded from "MATRIKS AI" (agency framing) to an honest solo developer site.

## Tech stack
Next.js 14+ / TypeScript / Tailwind CSS / Framer Motion / Remotion (for project demo videos) / next-intl (EN + AL)

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (run before marking anything done)
- `npm run lint` — linting

## Architecture
- Content lives in JSON files: `src/content/en/*.json` and `src/content/al/*.json`
- Components never hardcode strings (use JSON imports or `useTranslations`)
- Server Components by default. Client Components only for interactivity.
- All animations use `transform` and `opacity` only. CSS for loops, Framer Motion for interactions.
- Remotion videos lazy-loaded with `next/dynamic({ ssr: false })`

## Design system
- Keep the existing Kree8-inspired design: bold spacing, specific values (69px fonts, 118px border-radius, 7-layer shadows)
- Color palette: warm beige background, dark text, terracotta/copper accent (the existing palette)
- Fonts: keep all 5 currently loaded fonts

## Brand voice (for all copy)
- First person singular: "I build" not "We build"
- Direct, specific, zero fluff
- Playful but professional: "AI that actually works" not "innovative AI solutions"
- BANNED words: leverage, delve, tapestry, innovative, cutting-edge, game-changing, revolutionary, passionate, navigate, landscape
- No em dashes anywhere. Use commas, periods, or restructure.

## Critical rules
- No `any` types in TypeScript
- Test both EN and AL before marking a section done
- Semantic HTML: single h1 per page, proper heading hierarchy
- All interactive elements keyboard-accessible
- Minimum 4.5:1 color contrast ratio
- Commit after each completed section, not at end of day

## When compacting
Preserve: list of modified files, current task progress, which sections are done vs remaining.