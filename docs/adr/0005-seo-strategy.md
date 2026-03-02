# ADR-0005: SEO Strategy & Implementation

**Date:** 22 February 2026  
**Status:** Accepted  
**Context:** Quranic App needs to be discoverable on search engines for maximum reach

---

## Problem Statement

The Quranic App is a static SPA deployed on a VPS. Without proper SEO implementation, it won't be discoverable on Google, Bing, or other search engines. This limits organic traffic and user acquisition.

**Key Challenges:**
- React SPAs require special SEO handling (no server-side rendering)
- Static content needs proper meta tags and structured data
- Search engines need clear crawling instructions
- Social media sharing requires Open Graph tags

---

## Decision

Implement a comprehensive SEO strategy using:

1. **Meta Tags & Open Graph** - Dynamic meta tag management via React component
2. **Structured Data (JSON-LD)** - Schema.org markup for rich snippets
3. **Sitemap & Robots.txt** - Build-time generation for search engine crawling
4. **Performance Optimisation** - Core Web Vitals optimisation
5. **Content Optimisation** - Keyword-rich titles and descriptions

---

## Rationale

### Why This Approach?

**Meta Tags & Open Graph**
- ✅ Works with static SPAs
- ✅ Improves social media sharing
- ✅ Helps search engines understand content
- ✅ Minimal performance impact

**Structured Data (JSON-LD)**
- ✅ Enables rich snippets in search results
- ✅ Improves knowledge graph integration
- ✅ Increases click-through rates
- ✅ No impact on page rendering

**Sitemap & Robots.txt**
- ✅ Tells search engines what to crawl
- ✅ Prioritises important pages
- ✅ Generated at build time (no runtime cost)
- ✅ Standard practice for all websites

**Performance Optimisation**
- ✅ Core Web Vitals are Google ranking factors
- ✅ Improves user experience
- ✅ Reduces bounce rate
- ✅ Increases conversion rates

**Content Optimisation**
- ✅ Keyword-rich titles improve rankings
- ✅ Compelling descriptions increase CTR
- ✅ Breadcrumbs improve navigation
- ✅ Consistent formatting aids crawling

### Why Not Alternatives?

**Next.js with SSR**
- ❌ Requires Node.js server (VPS constraint)
- ❌ More complex deployment
- ❌ Higher server costs
- ✅ Better for dynamic content

**Prerendering Plugin**
- ⚠️ Could work but adds complexity
- ⚠️ Requires additional build step
- ✅ Good for future expansion

**Manual Meta Tags**
- ❌ Doesn't scale with new Surahs
- ❌ Error-prone
- ❌ Hard to maintain

---

## Implementation

### Components Created

1. **`src/lib/seo.ts`** - SEO utilities
   - `updateMetaTags()` - Update document meta tags
   - `generateStructuredData()` - Generate JSON-LD
   - `generateBreadcrumbs()` - Breadcrumb schema
   - `generateArticleStructuredData()` - Article schema

2. **`src/features/shared/Head.tsx`** - Head component
   - Manages meta tags for each page
   - Generates structured data
   - Handles breadcrumbs
   - Integrates with React Router

3. **`scripts/generate-sitemap.ts`** - Build-time script
   - Generates `sitemap.xml`
   - Generates `robots.txt`
   - Runs during build process

4. **`index.html`** - Enhanced with meta tags
   - Open Graph tags
   - Twitter Card tags
   - Canonical URLs
   - Theme color

5. **`docs/seo-strategy.md`** - SEO documentation
   - Complete implementation guide
   - Best practices
   - Maintenance procedures

### Integration Points

**Home Page (`HomePage.tsx`)**
```tsx
<Head
  config={{
    title: 'Quranic App - Explore Surahs Interactively',
    description: 'Discover the Quran through interactive visualisations...',
    keywords: ['Quran', 'Surahs', 'Islamic', ...],
    type: 'website',
  }}
/>
```

**Surah Pages (`SurahPage.tsx`)**
```tsx
<Head
  config={{
    title: `${surah.name.english} - Quranic App`,
    description: `Explore ${surah.name.english}...`,
    type: 'article',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: surah.name.english, url: `/surah/${surah.slug}` },
  ]}
  isArticle
/>
```

---

## Consequences

### Positive

✅ **Improved Discoverability**
- Pages appear in Google search results
- Better rankings for relevant keywords
- Organic traffic growth

✅ **Better Social Sharing**
- Rich previews on Facebook, Twitter, LinkedIn
- Increased click-through rates
- Better brand presentation

✅ **Search Engine Crawling**
- Clear crawling instructions via robots.txt
- Complete URL list via sitemap.xml
- Faster indexing

✅ **Rich Snippets**
- Structured data enables rich results
- Better SERP appearance
- Increased CTR

✅ **Performance Benefits**
- Core Web Vitals optimisation
- Faster page loads
- Better user experience

### Negative

⚠️ **Build Complexity**
- Additional build step for sitemap generation
- Requires Node.js for script execution
- Minimal impact (< 1 second)

⚠️ **Maintenance Overhead**
- Need to monitor search rankings
- Regular SEO audits required
- Content updates needed

---

## Monitoring & Metrics

### Key Metrics

1. **Search Visibility**
   - Impressions in Google Search
   - Click-through rate (CTR)
   - Average ranking position

2. **Traffic**
   - Organic traffic volume
   - Traffic by Surah
   - User engagement

3. **Performance**
   - Core Web Vitals scores
   - Page load time
   - Bounce rate

4. **Indexing**
   - Pages indexed by Google
   - Crawl errors
   - Sitemap coverage

### Tools

- Google Search Console (search performance)
- Google Analytics (traffic & engagement)
- Lighthouse (performance)
- PageSpeed Insights (Core Web Vitals)

---

## Future Considerations

### Phase 2: Advanced SEO

- [ ] Implement prerendering for all Surah pages
- [ ] Add image optimisation (WebP, AVIF)
- [ ] Implement service worker for caching
- [ ] Add breadcrumb navigation UI
- [ ] Create FAQ schema for common questions

### Phase 3: Content Expansion

- [ ] Add blog posts about Surahs
- [ ] Create comparison pages
- [ ] Add user-generated content
- [ ] Implement user reviews/ratings

### Phase 4: International SEO

- [ ] Implement hreflang tags for language variants
- [ ] Create Arabic-specific content
- [ ] Optimise for Arabic search engines
- [ ] Add language-specific sitemaps

---

## Related ADRs

- ADR-0001: React over Next.js (VPS deployment constraint)
- ADR-0004: Prerendering for SEO (static HTML generation)

---

## References

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Web.dev SEO Guide](https://web.dev/lighthouse-seo/)

---

**Decision Made By:** Tiko Abousteit  
**Approved By:** Architecture Review  
**Implementation Date:** 22 February 2026
