# ServicesGrid + Portfolio Merge Implementation Plan

## Overview
Merge the ServicesGrid ("What We Build") and Portfolio ("What We've Built") sections into a unified, hierarchical navigation experience with 4 service categories, each opening a modal with industry-specific projects.

---

## User Decisions Summary
| Decision | Choice |
|----------|--------|
| Remotion Demos | Create 4 NEW category-level compositions |
| Modal Layout | 70/30 split (projects left, overview + CTA right) |
| Project Interaction | Expand inline (no nested modals) |
| Portfolio Section | Remove completely |
| Design Category | Service-type cards (Web Apps, Mobile, SaaS, E-commerce) |
| Industries | Core 3 (Retail, Hospitality, Wholesale) + 1 flexible |
| Right Column | Category overview + "Book a Call" CTA |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    "What We Build"                          │
│  Chatbots, custom apps, automation tools — whatever your    │
│  business actually needs. Select each card to view real     │
│  projects.                                                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ AI &         │  │ Custom App   │                        │
│  │ Automation   │  │ Development  │                        │
│  │ [Demo Video] │  │ [Demo Video] │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Data &       │  │ Product      │                        │
│  │ Analytics    │  │ Design       │                        │
│  │ [Demo Video] │  │ [Demo Video] │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼ (on card click)
┌─────────────────────────────────────────────────────────────┐
│                    MODAL (70/30 Layout)                     │
├────────────────────────────────┬────────────────────────────┤
│         70% - Projects         │   30% - Overview + CTA     │
│  ┌────────┐  ┌────────┐       │                            │
│  │ Retail │  │ Hosp.  │       │  AI & Automation           │
│  │ Project│  │ Project│       │  ─────────────────         │
│  └────────┘  └────────┘       │  Intelligent systems       │
│  ┌────────┐  ┌────────┐       │  that work 24/7...         │
│  │ Whole- │  │ Constr │       │                            │
│  │ sale   │  │ uction │       │  [Book a Call]             │
│  └────────┘  └────────┘       │                            │
│                               │                            │
│  ▼ Expanded Project Card      │                            │
│  ┌────────────────────────┐   │                            │
│  │ Hotel AI Customer Bot  │   │                            │
│  │ Challenge: ...         │   │                            │
│  │ Solution: ...          │   │                            │
│  │ Results: ...           │   │                            │
│  └────────────────────────┘   │                            │
└────────────────────────────────┴────────────────────────────┘
```

---

## Phase 1: Data Structure & Content

### 1.1 New TypeScript Interfaces
**File:** `src/types/content.ts`

```typescript
interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  remotionId: string;  // New composition ID
  description: string; // For modal right column
  ctaText: string;
  projects: IndustryProject[];
}

interface IndustryProject {
  id: string;
  industry: string;      // "Retail & E-commerce", etc.
  industryIcon: string;  // Icon identifier
  title: string;         // "Hotel AI Customer Bot"
  subtitle: string;      // Brief one-liner
  challenge: string;
  solution: string;
  results: string;
  tags: string[];
}
```

### 1.2 New JSON Content Structure
**File:** `src/content/en/service-categories.json`

```json
{
  "heading": "What We Build",
  "subheading": "Chatbots, custom apps, automation tools — whatever your business actually needs. Select each card to view real projects.",
  "categories": [
    {
      "id": "ai-automation",
      "title": "AI & Automation",
      "subtitle": "Smart systems that work while you sleep",
      "remotionId": "AIAutomationDemo",
      "description": "From chatbots that speak your customers' language to workflows that eliminate repetitive tasks — we build AI that delivers measurable ROI.",
      "ctaText": "Let's automate",
      "projects": [
        {
          "id": "hotel-ai-bot",
          "industry": "Restaurant & Hospitality",
          "industryIcon": "hotel",
          "title": "Hotel AI Customer Bot",
          "subtitle": "Multilingual booking assistant handling 80% of inquiries",
          "challenge": "...",
          "solution": "...",
          "results": "...",
          "tags": ["WhatsApp", "Multi-language", "24/7"]
        }
        // ... 3 more projects
      ]
    }
    // ... 3 more categories
  ]
}
```

### 1.3 Content for All 4 Categories

**Category 1: AI & Automation**
- Retail: AI Product Recommendations
- Hospitality: Hotel AI Customer Bot
- Wholesale: Demand Prediction Engine
- Flexible: Automated Invoice Processing (Finance)

**Category 2: Custom Application Development**
- Retail: E-commerce Platform
- Hospitality: Commission-Free Reservation Engine
- Wholesale: Inventory Management System
- Flexible: Supplier Management System (Restaurant supply chain)

**Category 3: Data & Analytics**
- Retail: E-Commerce Analytics Platform
- Hospitality: Restaurant Analytics Dashboard
- Wholesale: Customer Purchase Analysis
- Flexible: Construction Customer Portal

**Category 4: Product Design** (Service-type, not industry)
- Web Applications
- Mobile Apps
- SaaS Platforms
- E-commerce Design

---

## Phase 2: New Remotion Compositions

### 2.1 Composition Design Specs

**AIAutomationDemo.tsx** (180 frames @ 30fps = 6s)
- Frames 0-60: Chatbot interface with typing messages
- Frames 60-120: Invoice being scanned, data extracting
- Frames 120-180: Workflow automation (connecting nodes)

**CustomAppsDemo.tsx** (180 frames @ 30fps = 6s)
- Shows laptop + phone mockup side by side
- E-commerce app on laptop, mobile app on phone
- UI elements animate in, demonstrating responsive design

**DataAnalyticsDemo.tsx** (180 frames @ 30fps = 6s)
- Dashboard with charts growing
- KPI cards counting up
- Data flowing into visualizations

**ProductDesignDemo.tsx** (180 frames @ 30fps = 6s)
- Wireframe → High-fidelity mockup transition
- Design system components appearing
- Color palette + typography showcase

### 2.2 Files to Create
- `src/components/remotion/compositions/AIAutomationDemo.tsx`
- `src/components/remotion/compositions/CustomAppsDemo.tsx`
- `src/components/remotion/compositions/DataAnalyticsDemo.tsx`
- `src/components/remotion/compositions/ProductDesignDemo.tsx`

### 2.3 Update Composition Map
**File:** `src/components/remotion/compositions/index.ts`

Add new compositions to the export map.

---

## Phase 3: Component Architecture

### 3.1 Refactor ServicesGrid.tsx
**File:** `src/components/sections/ServicesGrid.tsx`

Changes:
- Load from new `service-categories.json` instead of `services.json`
- Change from 3x3 grid to 2x2 grid (4 categories)
- Add click handler to open modal
- Card size: larger to accommodate category-level content

### 3.2 Create ServiceCategoryModal.tsx
**New File:** `src/components/ui/ServiceCategoryModal.tsx`

Structure:
```tsx
<Modal>
  <div className="flex gap-8">
    {/* 70% - Projects Grid */}
    <div className="w-[70%]">
      <div className="grid grid-cols-2 gap-4">
        {projects.map(project => (
          <ExpandableProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => toggleExpand(project.id)}
          />
        ))}
      </div>
    </div>

    {/* 30% - Category Overview */}
    <div className="w-[30%]">
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <Button href="#contact">{category.ctaText}</Button>
    </div>
  </div>
</Modal>
```

### 3.3 Create ExpandableProjectCard.tsx
**New File:** `src/components/ui/ExpandableProjectCard.tsx`

Features:
- Collapsed: Industry icon, title, subtitle, tags
- Expanded: Full Challenge → Solution → Results content
- Smooth height animation with Framer Motion
- Only one card expanded at a time

### 3.4 Update Existing Modal.tsx
**File:** `src/components/ui/Modal.tsx`

Current: `max-w-[900px]` → Need: `max-w-[1000px]` for 70/30 layout.
Add optional `size` prop to support different modal widths.

---

## Phase 4: Remove Portfolio Section

### 4.1 Files to Modify
- `src/app/[locale]/page.tsx` - Remove Portfolio component import and usage
- `src/components/sections/Portfolio.tsx` - Delete or archive

### 4.2 Files to Delete
- `src/content/en/projects.json` - Content moves to service-categories.json
- `src/content/al/projects.json` - Content moves to service-categories.json

---

## Phase 5: i18n & Albanian Content

### 5.1 Albanian Content File
**New File:** `src/content/al/service-categories.json`

Translate all content:
- Category titles and descriptions
- Project titles, challenges, solutions, results
- CTA button text

### 5.2 Update Type Imports
Ensure ServicesGrid imports correct locale file based on prop.

---

## Implementation Order

### Step 1: Content Foundation (Est. 1 hour)
1. [ ] Add new interfaces to `src/types/content.ts`
2. [ ] Create `src/content/en/service-categories.json` with full content
3. [ ] Create `src/content/al/service-categories.json` (Albanian)

### Step 2: New Remotion Compositions (Est. 3-4 hours)
4. [ ] Create `AIAutomationDemo.tsx`
5. [ ] Create `CustomAppsDemo.tsx`
6. [ ] Create `DataAnalyticsDemo.tsx`
7. [ ] Create `ProductDesignDemo.tsx`
8. [ ] Update composition index.ts

### Step 3: Component Architecture (Est. 2-3 hours)
9. [ ] Create `ExpandableProjectCard.tsx`
10. [ ] Create `ServiceCategoryModal.tsx`
11. [ ] Refactor `ServicesGrid.tsx` (2x2 grid, click handlers)
12. [ ] Update `Modal.tsx` if needed for wider layout

### Step 4: Integration & Cleanup (Est. 1 hour)
13. [ ] Remove Portfolio from page.tsx
14. [ ] Delete/archive Portfolio.tsx and old projects.json
15. [ ] Test both locales (EN/AL)
16. [ ] Verify animations are 60fps

---

## Files Summary

### New Files (7)
- `src/content/en/service-categories.json`
- `src/content/al/service-categories.json`
- `src/components/remotion/compositions/AIAutomationDemo.tsx`
- `src/components/remotion/compositions/CustomAppsDemo.tsx`
- `src/components/remotion/compositions/DataAnalyticsDemo.tsx`
- `src/components/remotion/compositions/ProductDesignDemo.tsx`
- `src/components/ui/ExpandableProjectCard.tsx`
- `src/components/ui/ServiceCategoryModal.tsx`

### Modified Files (4)
- `src/types/content.ts` (add interfaces)
- `src/components/remotion/compositions/index.ts` (add to map)
- `src/components/sections/ServicesGrid.tsx` (refactor)
- `src/app/[locale]/page.tsx` (remove Portfolio)

### Deleted Files (3)
- `src/components/sections/Portfolio.tsx`
- `src/content/en/projects.json`
- `src/content/al/projects.json`

---

## Verification Plan

### Visual Testing
- [ ] 4 category cards display correctly in 2x2 grid
- [ ] Remotion demos auto-play on hover/viewport entry
- [ ] Modal opens with 70/30 layout
- [ ] Project cards expand/collapse smoothly
- [ ] CTA button visible and styled correctly

### Functional Testing
- [ ] Click category card → modal opens
- [ ] Click project card → expands inline
- [ ] Only one project expanded at a time
- [ ] Modal close (X button, outside click, Escape key)
- [ ] CTA button scrolls to contact section

### i18n Testing
- [ ] EN locale displays English content
- [ ] AL locale displays Albanian content
- [ ] Language toggle works correctly

### Performance Testing
- [ ] Remotion demos maintain 60fps
- [ ] Modal animations smooth
- [ ] No layout shift on expand/collapse
- [ ] Lighthouse Performance > 90

---

## Design Specifications

### Category Card (ServicesGrid)
- Size: ~540px width (2 per row at 1100px container)
- Height: 320px
- Border radius: var(--radius-card-lg) = 32px
- Shadow: var(--shadow-card)
- Hover: scale(1.02)

### Modal
- Max width: 1000px
- Padding: 32px
- Border radius: 24px
- Background: white

### Project Card (Collapsed)
- Height: ~120px
- Background: var(--color-background)
- Border radius: 16px

### Project Card (Expanded)
- Auto height (animated)
- Shows Challenge, Solution, Results sections
- Subtle background highlight
