# Quranic App - Architecture Document

**Created by:** Tiko Abousteit  
**Date:** 22 February 2026  
**Version:** 2.0 (Revised with ADR Framework)

---

## Executive Summary

An interactive web application transforming traditional Quranic study materials into engaging visual content. Presents Surah analysis through charts, diagrams, and interactive components instead of flat text.

**Key Architectural Decisions:**
- React 18 + Vite (VPS-friendly static deployment)
- Tailwind CSS v4 (custom Islamic design system)
- Static JSON with prerendering (SEO without server complexity)
- Feature-based folder structure

---

## Requirements

### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Display Surah overview with metadata | Must |
| FR-02 | Show section breakdown with timeline/flowchart | Must |
| FR-03 | Present themes with interactive cards | Must |
| FR-04 | Display lessons and key messages | Must |
| FR-05 | Bilingual support (Arabic + English) | Must |
| FR-06 | Dark/Light theme toggle | Should |
| FR-07 | Search Surahs by name | Should |
| FR-08 | Filter by type (Meccan/Medinan) | Could |

### Non-Functional Requirements
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Page load time | < 2 seconds |
| NFR-02 | Lighthouse Performance | > 90 |
| NFR-03 | SEO (prerendered pages) | Indexable by Google |
| NFR-04 | Accessibility | WCAG 2.1 AA |
| NFR-05 | RTL support | Full Arabic RTL |
| NFR-06 | Mobile responsive | Mobile-first |

### Constraints
| Constraint | Impact |
|------------|--------|
| VPS hosting | No Node.js server, static files only |
| Static content | Rebuild on content updates |
| Future user features | Architecture must allow API addition |

---

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | React | 18.x | See ADR-0001 |
| Build Tool | Vite | 5.x | Fast builds, static output |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 4.x | See ADR-0002 |
| Routing | React Router | 6.x | Mature, sufficient scope |
| State | Zustand | 4.x | See ADR-0003 |
| i18n | react-i18next | 14.x | RTL support, mature |
| SEO | vite-plugin-prerender | - | See ADR-0004 |
| Icons | Lucide React | - | Lightweight, tree-shakeable |
| Animations | Framer Motion | 11.x | Declarative animations |

---

## Project Structure

```
quranic-app/
├── src/
│   ├── features/
│   │   ├── home/
│   │   │   ├── HomePage.tsx
│   │   │   ├── SurahGrid.tsx
│   │   │   └── SurahCard.tsx
│   │   ├── surah/
│   │   │   ├── SurahPage.tsx
│   │   │   ├── SurahHero.tsx
│   │   │   ├── SectionTimeline.tsx
│   │   │   ├── ThemeCards.tsx
│   │   │   └── LessonCards.tsx
│   │   └── shared/
│   │       ├── Layout.tsx
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── LanguageToggle.tsx
│   │       └── ThemeToggle.tsx
│   ├── data/
│   │   ├── surahs/
│   │   │   ├── al-baqarah.json
│   │   │   ├── aal-imran.json
│   │   │   └── an-nisa.json
│   │   └── index.ts
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── store.ts
│   ├── types/
│   │   └── surah.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── architecture.md
│   ├── adr/
│   └── content/
├── public/
│   └── fonts/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Data Model

```typescript
interface Surah {
  id: number;
  slug: string;
  name: {
    arabic: string;
    english: string;
    transliteration: string;
  };
  metadata: {
    verses: number;
    words: number;
    type: 'meccan' | 'medinan';
    juz: string;
    order: number;
  };
  goal: {
    arabic: string;
    english: string;
  };
  names: SurahName[];
  virtues: Virtue[];
  sections: Section[];
  themes: Theme[];
  lessons: Lesson[];
  connections: Connection[];
  gems: Gem[];
}

interface Section {
  id: string;
  title: { arabic: string; english: string };
  verses: string;
  description: { arabic: string; english: string };
}

interface Theme {
  id: string;
  title: { arabic: string; english: string };
  icon: string;
  description: { arabic: string; english: string };
}

interface Lesson {
  id: string;
  title: { arabic: string; english: string };
  content: { arabic: string; english: string };
}
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Grid of all Surahs |
| `/surah/:slug` | SurahPage | Detailed Surah view |
| `/surah/:slug#sections` | SurahPage | Jump to sections |
| `/surah/:slug#themes` | SurahPage | Jump to themes |

---

## Design System

### Colour Palette (Islamic Theme)
```css
:root {
  /* Primary - Deep Blue (Trust, Wisdom) */
  --color-primary-500: #1F4788;
  --color-primary-600: #163560;
  
  /* Secondary - Gold (Nobility, Divine) */
  --color-secondary-500: #D4AF37;
  --color-secondary-600: #B8960F;
  
  /* Accent - Green (Islam, Growth) */
  --color-accent-500: #2D5016;
  --color-accent-600: #1E3A0F;
  
  /* Neutrals */
  --color-neutral-50: #FAFAFA;
  --color-neutral-900: #1A1A1A;
}
```

### Typography
| Element | Arabic Font | English Font | Size |
|---------|-------------|--------------|------|
| H1 | Amiri | Inter | 2rem |
| H2 | Amiri | Inter | 1.5rem |
| Body | Noto Naskh Arabic | Inter | 1rem |
| Caption | Noto Naskh Arabic | Inter | 0.875rem |

---

## Deployment

### Build Process
```bash
npm run build    # Vite build + prerender
```

### Output
Static files in `dist/` folder:
- `index.html` (prerendered)
- `surah/al-baqarah/index.html` (prerendered)
- `surah/aal-imran/index.html` (prerendered)
- `assets/` (JS, CSS, fonts)

### VPS Deployment
```nginx
server {
    listen 80;
    server_name quran.yourdomain.com;
    root /var/www/quranic-app/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Monetisation Strategy

### Hybrid Model: Donations + Google AdSense

The app uses a **dual monetisation approach** combining donations and non-intrusive advertising:

**Primary: Donations** (Community Support)
- Donation button in footer (Buy Me a Coffee, Ko-fi, Stripe)
- Optional donation prompt after completing a Surah
- Transparent about how donations are used
- Aligns with Islamic principles of voluntary giving

**Secondary: Google AdSense** (Passive Revenue)
- Non-intrusive banner ads between content
- Respects reading flow and user experience
- Generates passive income as traffic grows
- Scales automatically with audience

**Why Hybrid?**
- Donations provide sustainable, predictable revenue
- AdSense provides passive income as traffic grows
- Combined approach maximises sustainability
- Users can choose to support via donations or accept ads
- No paywalls or premium features

**Ad Placement Strategy:**
- Between Surah cards (grid view) - native ad format
- Below Surah content (after gems section)
- Sidebar/right rail (desktop only, 300x250)
- Sticky footer (mobile only, 320x50, dismissible)

**Donation Platforms:**
- Buy Me a Coffee (easiest, lowest fees)
- Ko-fi (community-focused)
- Stripe (custom integration)

---

## Future Considerations

### Phase 2: User Features
When bookmarks/progress tracking needed:
1. Add simple REST API (Node.js/Python)
2. Add authentication (JWT)
3. Store user data in PostgreSQL
4. React app calls API for user-specific data

### Phase 3: Content Expansion
- Add remaining 111 Surahs
- Automated build pipeline (GitHub Actions)
- Content management workflow

### Phase 4: Monetisation Enhancement
- Donation integration (Buy Me a Coffee / Ko-fi)
- Optional email newsletter
- Community features (sharing, discussions)

---

## Architecture Decision Records

See `/docs/adr/` for detailed decision records:
- ADR-0001: React over Next.js
- ADR-0002: Tailwind CSS for Styling
- ADR-0003: Zustand for State Management
- ADR-0004: Prerendering for SEO
- ADR-0005: SEO Strategy & Implementation
- ADR-0006: Donation-Based Monetisation

---

**End of Architecture Document**
