# Refactor Log - Malindi Next.js

## Current State (Before)

```
components/
├── home/
│   ├── HeroSection.tsx
│   ├── VillaSlider.tsx
│   ├── ImageSplit.tsx
│   ├── IntroSection.tsx
│   ├── IntroAfterSection.tsx
│   ├── PackagesIntro.tsx
│   └── PackagesCards.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LoadingScreen.tsx
├── ui/
│   └── CustomCursor.tsx
└── providers/
    └── LenisProvider.tsx

app/
└── globals.css (5625 lines - ALL styles here)
```

**Problems:**
- ❌ Monolithic globals.css (5625 lines)
- ❌ No CSS Modules (global namespace pollution)
- ❌ Hard to maintain/scale
- ❌ No code splitting for CSS
- ❌ Tight coupling between components and global styles

---

## Target State (After)

```
components/
├── home/                  # Homepage sections (app/page.tsx)
│   ├── hero.tsx
│   ├── hero.module.css
│   ├── villa-slider.tsx
│   ├── villa-slider.module.css
│   ├── image-split.tsx
│   ├── image-split.module.css
│   ├── intro.tsx
│   ├── intro.module.css
│   ├── intro-after.tsx
│   ├── intro-after.module.css
│   ├── packages-intro.tsx
│   ├── packages-intro.module.css
│   ├── packages-cards.tsx
│   └── packages-cards.module.css
│
├── about/                 # About page sections (future)
│   ├── hero.tsx
│   ├── story.tsx
│   └── team.tsx
│
├── contact/               # Contact page sections (future)
│   ├── form.tsx
│   └── map.tsx
│
├── villas/                # Villas page sections (future)
│   ├── gallery.tsx
│   └── amenities.tsx
│
├── layout/                # App-wide layout
│   ├── header.tsx
│   ├── header.module.css
│   ├── footer.tsx
│   ├── footer.module.css
│   ├── loading-screen.tsx
│   └── loading-screen.module.css
│
├── ui/                    # Shared/reusable components (FLAT)
│   ├── cursor.tsx
│   ├── cursor.module.css
│   ├── button.tsx         # Extract from globals
│   ├── button.module.css
│   ├── link.tsx           # Extract from globals
│   └── link.module.css
│
└── providers/
    └── lenis-provider.tsx

app/
└── globals.css (~300 lines - CSS vars + normalize only)
```

**Benefits:**
- ✅ Scoped CSS (no conflicts)
- ✅ Code splitting per route
- ✅ Easy to maintain/delete components
- ✅ Type-safe styles
- ✅ Better performance

---

## Migration Steps

### Phase 1: Setup Foundation
- [x] Split globals.css into:
  - `app/globals.css` (CSS vars + normalize)
  - `styles/fonts.css` ✅
  - `styles/theme.css` (future)

### Phase 2: Convert Home Page Components
- [x] home/hero (HeroSection → hero) ✅
- [x] home/villa-slider ✅
- [x] home/image-split ✅
- [x] home/intro ✅
- [x] home/intro-after ✅
- [x] home/packages-intro ✅
- [x] home/packages-cards ✅

### Phase 3: Layout Components
- [x] layout/header ✅
- [x] layout/footer ✅
- [x] layout/loading-screen ✅

### Phase 4: UI Components
- [x] ui/cursor (CustomCursor → cursor) ✅
- [x] ui/button (extract from globals) ✅
- [x] ui/link (extract from globals) ✅

### Phase 5: Update Imports
- [x] Update app/page.tsx imports ✅
- [x] Update app/layout.tsx imports ✅
- [x] Verify no broken imports ✅

### Phase 6: Cleanup & CSS Strategy
- [x] Remove old PascalCase component files ✅
- [x] Define CSS strategy (hybrid approach) ✅
- [x] Extract hero CSS to module ✅
- [x] Document Swiper/utility class approach ✅
- [x] Test build ✅ SUCCESS
- [x] Verify dev server ✅ Running

---

## Design Decisions

### Why page-grouped folders (home/, about/, etc)?
- **Scales with multiple pages** - Each page gets own folder
- **Clear ownership** - components/home = homepage sections
- **Mirrors app/ structure** - Easy mental model
- **Prevents name conflicts** - Each page can have own hero.tsx
- **FLAT within page folders** - Each folder has <15 files (manageable)

### Why NOT flat sections/?
- Doesn't scale beyond 2-3 pages
- Name conflicts (hero-home, hero-about, hero-contact?)
- Hard to find which section belongs to which page
- Messy with 4+ pages

### Why CSS Modules?
- Required for vanilla CSS (not using Tailwind)
- Scoped styles prevent conflicts
- Type-safe with TypeScript
- Automatic code splitting

### CSS Strategy (Pragmatic Approach)?
- **Utility Classes** (section, container, row, col, etc.) → Keep in globals.css
- **Library Styles** (Swiper, Lenis) → Keep in globals.css
- **Component-Specific Styles** (hero, unique sections) → Extract to CSS Modules
- **Shared Components** (buttons, links, cards) → Create CSS Modules when extracted

**Why Hybrid?**
- Utility classes are reusable across all pages
- Library styles expect global class names
- Only extract component-specific styles to modules
- Gradual migration - can extract more over time

### Co-located types?
- Keep types in same file as component
- Only extract to types/ if shared 3+ times
- Avoid over-engineering

---

## Naming Conventions

```
Component: PascalCase
File: kebab-case
Folder: kebab-case (matches app/ routes)
CSS Module: component-name.module.css

Examples:
- home/hero.tsx → export default function Hero()
- home/villa-slider.tsx → export default function VillaSlider()
- about/hero.tsx → export default function Hero() (no conflict!)
- image-split.module.css → import styles from './image-split.module.css'
```

## Import Pattern

```tsx
// app/page.tsx (Homepage)
import Hero from '@/components/home/hero'
import VillaSlider from '@/components/home/villa-slider'

// app/about/page.tsx (Future)
import Hero from '@/components/about/hero'
import Story from '@/components/about/story'
```

---

## Estimated Effort

- Phase 1: ~2-3K tokens
- Phase 2: ~10-12K tokens
- Phase 3: ~3-4K tokens
- Phase 4: ~3-4K tokens
- Phase 5: ~2-3K tokens
- Phase 6: ~1-2K tokens

**Total: ~22-30K tokens**

---

## Rollback Plan

If issues occur:
1. Git stash changes
2. Revert to commit before refactor
3. Review errors
4. Re-attempt with fixes

---

## Success Criteria

- ✅ All pages render correctly
- ✅ No console errors
- ✅ Build completes successfully
- ✅ No broken styles
- ✅ Improved bundle size
- ✅ All imports working

---

## Notes

- Keep original globals.css as reference during migration
- Test each phase before moving to next
- Update this log as we progress
- Document any blockers/issues encountered

---

**Started:** 2025-11-17
**Status:** ✅ **Phase 2: CSS Extraction COMPLETE**

## Phase 2 Progress

### Structure Refactor: ✅ DONE
- [x] Folder structure
- [x] File naming
- [x] Imports updated
- [x] Build successful

### CSS Extraction: ✅ COMPLETE
- [x] Button component (220 lines) → components/ui/button/
- [x] Link component (190 lines) → components/ui/link/
- [x] Header/Nav CSS (753 lines) → components/layout/header.module.css
- [x] Footer CSS (284 lines) → components/layout/footer.module.css
- [x] Loading Screen CSS (51 lines) → components/layout/loading-screen.module.css
- [x] Cursor CSS (72 lines) → components/ui/cursor.module.css
- [x] Home Intro CSS (97 lines) → components/home/intro.module.css
- [x] Home Intro After CSS (12 lines) → components/home/intro-after.module.css

**Result:** Reduced globals.css from 5625 → 3945 lines (1680 lines extracted, 29.9% reduction)

### Build & Testing: ✅ VERIFIED
- [x] Production build successful
- [x] Dev server running (localhost:3002)
- [x] No TypeScript errors
- [x] All imports working
- [x] CSS properly scoped to modules

---

## What's in globals.css Now? (3945 lines)

**Kept in globals.css:**
- CSS Custom Properties / Variables (~200 lines)
- CSS Reset / Normalize (~100 lines)
- Font Definitions (extracted to styles/fonts.css, imported in layout)
- Utility Classes (section, container, row, col, grid, etc.) (~500 lines)
- Library Styles (Swiper, Lenis global styles) (~300 lines)
- Page-specific sections not yet extracted:
  - Stay sections (~80 lines)
  - Packages sections (~140 lines)
  - Discover sections (~120 lines)
  - Image split / Text split (~80 lines)
  - Big image / Small image (~150 lines)
  - Three images section (~80 lines)
  - Menu section (~200 lines)
  - Other shared sections (~2000+ lines)

**Future extraction opportunities:**
- Common layout sections (image-split, text-split, big-image) → could be extracted to shared components
- Page-specific sections (stay, packages, discover) → extract when those pages are created
- More shared components (cards, forms, etc.) → extract as needed

**Current state is healthy:**
- Components have scoped CSS modules
- Utilities remain global (as intended)
- Can extract more over time as needed
- No urgency to extract remaining ~3945 lines
