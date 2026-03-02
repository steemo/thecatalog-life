# ADR-0001: React over Next.js

**Status:** Accepted  
**Date:** 22 February 2026  
**Deciders:** Tiko Abousteit

---

## Context

We need to select a frontend framework for the Quranic study application. The app will:
- Display static educational content (Surah analysis)
- Support bilingual content (Arabic + English)
- Be hosted on an existing VPS
- Eventually scale to 114 Surahs
- Potentially add user features (bookmarks) in future

## Decision Drivers

* **Must deploy to VPS** as static files (no Node.js server)
* **Must support SEO** for Islamic content discoverability
* **Should be simple** to maintain and deploy
* **Should allow future API integration** for user features

## Considered Options

### Option 1: React 18 + Vite
- **Pros:**
  - Simple static build output
  - Fast development with Vite HMR
  - VPS deployment = just nginx serving files
  - Large ecosystem, mature tooling
  - Easy to add API later
- **Cons:**
  - No built-in SSR/SSG
  - SEO requires additional prerendering setup

### Option 2: Next.js 14 App Router
- **Pros:**
  - Built-in SSG/SSR
  - Excellent SEO out of the box
  - Image optimisation
  - Modern React Server Components
- **Cons:**
  - Requires Node.js server on VPS (complexity)
  - Overkill for static content
  - More complex deployment
  - Heavier runtime

### Option 3: Astro
- **Pros:**
  - Built for static content
  - Zero JS by default
  - Excellent performance
- **Cons:**
  - Less familiar to team
  - Smaller ecosystem
  - React integration adds complexity

## Decision

We will use **React 18 + Vite** with prerendering for SEO.

## Rationale

1. **VPS constraint is decisive** - Next.js requires Node.js server, React builds to static files
2. **Prerendering solves SEO** - `vite-plugin-prerender` generates static HTML at build time
3. **Simplicity** - Static files + nginx is the simplest deployment model
4. **Future-proof** - Easy to add REST API when user features needed

## Consequences

### Positive
- Simple deployment (copy files to VPS)
- No server maintenance
- Fast builds with Vite
- Familiar React patterns

### Negative
- Must configure prerendering manually
- No automatic image optimisation (use external tools)
- Must rebuild entire site when adding Surahs

### Mitigations
- Prerendering config is one-time setup
- Use `vite-imagetools` for image optimisation
- Automate builds with GitHub Actions

---

**End of ADR**
