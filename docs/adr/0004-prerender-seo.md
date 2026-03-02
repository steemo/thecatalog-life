# ADR-0004: Prerendering for SEO

**Status:** Accepted  
**Date:** 22 February 2026  
**Deciders:** Tiko Abousteit

---

## Context

The Quranic app contains educational Islamic content that should be discoverable via search engines. Users searching for "Surah Al-Baqarah lessons" or "meaning of Surah Aal-Imran" should find this content.

However, we've chosen React SPA (ADR-0001) which renders content client-side. Search engines can index JavaScript-rendered content, but:
- Crawling is slower and less reliable
- Some crawlers don't execute JavaScript
- Initial page load shows empty content

## Decision Drivers

* **Must be SEO-friendly** for Islamic content discoverability
* **Must work with static VPS deployment** (no Node.js server)
* **Should not add runtime complexity**
* **Should generate static HTML** at build time

## Considered Options

### Option 1: vite-plugin-prerender
- **Pros:**
  - Generates static HTML at build time
  - Zero runtime overhead
  - Works with existing Vite setup
  - Each route becomes an HTML file
- **Cons:**
  - Must specify routes manually
  - Rebuild required for new pages

### Option 2: react-snap
- **Pros:**
  - Automatic route discovery
  - Mature, widely used
- **Cons:**
  - Uses Puppeteer (heavy dependency)
  - Slower builds
  - More complex setup

### Option 3: No prerendering (rely on Google's JS rendering)
- **Pros:**
  - No additional setup
  - Simpler build
- **Cons:**
  - Slower indexing
  - Less reliable SEO
  - Poor social media previews (Open Graph)

## Decision

We will use **vite-plugin-prerender** for static HTML generation.

## Rationale

1. **Lightweight** - No Puppeteer, faster builds
2. **Explicit routes** - We know all Surah routes upfront
3. **Static output** - Perfect for VPS/nginx deployment
4. **Social previews** - Open Graph meta tags work correctly

## Consequences

### Positive
- Each Surah page is a static HTML file with content
- Search engines index content immediately
- Social media previews show correct content
- No runtime overhead

### Negative
- Must update route list when adding Surahs
- Full rebuild required for content changes

### Mitigations
- Script to generate route list from data files
- GitHub Actions for automated builds

## Implementation Notes

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from 'vite-plugin-prerender';

const surahSlugs = [
  'al-baqarah',
  'aal-imran', 
  'an-nisa',
  // Add more as content grows
];

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        ...surahSlugs.map(slug => `/surah/${slug}`),
      ],
    }),
  ],
});
```

### Build Output
```
dist/
├── index.html                    # Prerendered home page
├── surah/
│   ├── al-baqarah/
│   │   └── index.html           # Prerendered Surah page
│   ├── aal-imran/
│   │   └── index.html
│   └── an-nisa/
│       └── index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

---

**End of ADR**
