/**
 * SEO Strategy & Implementation Guide
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Comprehensive SEO strategy for the Quranic App, covering technical SEO,
 *     content optimisation, and search engine visibility.
 */

# SEO Strategy & Implementation

## Overview

The Quranic App implements a comprehensive SEO strategy to ensure maximum discoverability on search engines. This document outlines the technical implementation, best practices, and maintenance procedures.

---

## 1. Technical SEO Implementation

### 1.1 Meta Tags & Open Graph

**Location:** `index.html`

All pages include:
- **Title Tags**: Unique, descriptive titles (50-60 characters)
- **Meta Descriptions**: Compelling descriptions (150-160 characters)
- **Keywords**: Relevant search terms
- **Open Graph Tags**: Social media sharing (Facebook, LinkedIn)
- **Twitter Cards**: Twitter-specific sharing format
- **Canonical URLs**: Prevent duplicate content issues

**Example (Home Page):**
```html
<title>Quranic App - Explore Surahs Interactively</title>
<meta name="description" content="Discover the Quran through interactive visualisations, themes, lessons, and insights." />
<meta property="og:title" content="Quranic App - Explore Surahs Interactively" />
<meta property="og:description" content="Discover the Quran through interactive visualisations, themes, lessons, and insights." />
<meta property="og:image" content="https://quranic-app.com/og-image.png" />
```

**Example (Surah Page):**
```html
<title>Al-Baqarah (The Cow) - Quranic App</title>
<meta name="description" content="Explore Al-Baqarah with interactive visualisations, themes, lessons, and insights. 286 verses, Medinan Surah." />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2026-02-22T00:00:00Z" />
```

### 1.2 Structured Data (JSON-LD)

**Location:** `src/lib/seo.ts`

Implements three types of structured data:

#### WebSite Schema (Home Page)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Quranic App",
  "description": "Interactive Quranic study application",
  "url": "https://quranic-app.com"
}
```

#### Article Schema (Surah Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Al-Baqarah (The Cow)",
  "description": "Explore Al-Baqarah with interactive visualisations...",
  "image": "https://quranic-app.com/og-al-baqarah.png",
  "datePublished": "2026-02-22T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "Quranic App"
  }
}
```

#### BreadcrumbList Schema (Navigation)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://quranic-app.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Al-Baqarah",
      "item": "https://quranic-app.com/surah/al-baqarah"
    }
  ]
}
```

**Benefits:**
- Rich snippets in search results
- Better SERP appearance
- Improved click-through rates
- Enhanced knowledge graph integration

### 1.3 Sitemap & Robots.txt

**Sitemap Location:** `dist/sitemap.xml` (generated at build time)

**Robots.txt Location:** `dist/robots.txt` (generated at build time)

**Generation Script:** `scripts/generate-sitemap.ts`

**Sitemap Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://quranic-app.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://quranic-app.com/surah/al-baqarah</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

**Robots.txt Content:**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /.git
Disallow: /node_modules

Crawl-delay: 1

Sitemap: https://quranic-app.com/sitemap.xml
```

---

## 2. Content Optimisation

### 2.1 Page Titles

**Formula:** `[Surah Name] - [Descriptor] | Quranic App`

**Examples:**
- Home: `Quranic App - Explore Surahs Interactively`
- Surah: `Al-Baqarah (The Cow) - Quranic App`

**Best Practices:**
- Include primary keyword
- Keep under 60 characters
- Make it compelling and clickable
- Avoid keyword stuffing

### 2.2 Meta Descriptions

**Formula:** `[Content summary]. [Key feature]. [Call to action]`

**Examples:**
- Home: `Discover the Quran through interactive visualisations, themes, lessons, and insights.`
- Surah: `Explore Al-Baqarah with interactive visualisations, themes, lessons, and insights. 286 verses, Medinan Surah.`

**Best Practices:**
- Include primary keyword naturally
- Keep 150-160 characters
- Make it action-oriented
- Avoid duplication across pages

### 2.3 Keywords

**Primary Keywords:**
- Quran
- Surahs
- Islamic study
- Quranic app
- Interactive Quran

**Secondary Keywords (per Surah):**
- Surah name (Arabic + English)
- Surah type (Meccan/Medinan)
- Verse count
- Key themes

**Keyword Research Tools:**
- Google Search Console
- Ahrefs
- SEMrush
- Moz Keyword Explorer

---

## 3. Performance & Core Web Vitals

### 3.1 Core Web Vitals Targets

| Metric | Target | Current |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | TBD |
| FID (First Input Delay) | < 100ms | TBD |
| CLS (Cumulative Layout Shift) | < 0.1 | TBD |

### 3.2 Performance Optimisations

**Implemented:**
- ✅ Code splitting (vendor, UI chunks)
- ✅ Lazy loading of routes
- ✅ Image optimisation (preload critical fonts)
- ✅ Minification & compression
- ✅ CSS-in-JS optimisation

**To Implement:**
- [ ] Image optimisation (WebP, AVIF formats)
- [ ] Service worker for caching
- [ ] CDN deployment
- [ ] Gzip compression on server

### 3.3 Monitoring

**Tools:**
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest
- Google Search Console

**Frequency:** Weekly during development, monthly in production

---

## 4. Link Building & Authority

### 4.1 Internal Linking

**Strategy:**
- Link home page to all Surah pages
- Link Surahs to related Surahs (via connections)
- Use descriptive anchor text
- Maintain logical hierarchy

**Example:**
```html
<a href="/surah/al-baqarah">Explore Al-Baqarah</a>
<a href="/surah/aal-imran">Related: Aal-Imran</a>
```

### 4.2 External Linking

**Opportunities:**
- Islamic education websites
- Quran study communities
- Religious organisations
- Educational platforms

**Outreach Strategy:**
- Guest posts on Islamic blogs
- Directory submissions
- Community participation
- Social media sharing

---

## 5. Social Media & Sharing

### 5.1 Open Graph Optimisation

**Implemented:**
- ✅ og:title, og:description
- ✅ og:image (1200x630px recommended)
- ✅ og:url, og:type
- ✅ og:locale (en_US, ar_SA)

**Image Requirements:**
- Format: PNG or JPG
- Size: 1200x630px (1.91:1 ratio)
- File size: < 300KB
- Include branding

### 5.2 Twitter Card Optimisation

**Implemented:**
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title, twitter:description
- ✅ twitter:image

---

## 6. Search Console & Analytics

### 6.1 Google Search Console Setup

**Steps:**
1. Verify domain ownership
2. Submit sitemap.xml
3. Monitor search performance
4. Fix crawl errors
5. Monitor Core Web Vitals

**Key Metrics:**
- Impressions (how often shown in search)
- Clicks (how often clicked)
- CTR (click-through rate)
- Average position

### 6.2 Google Analytics Setup

**Tracking:**
- Page views
- User engagement
- Bounce rate
- Conversion goals

**Events to Track:**
- Surah page views
- Search queries
- Filter usage
- Language/theme toggles

---

## 7. Build & Deployment

### 7.1 Build Process

```bash
npm run build
```

**Steps:**
1. TypeScript compilation
2. Vite build (bundling & minification)
3. Sitemap generation
4. Robots.txt generation

**Output:**
- `dist/index.html` (prerendered)
- `dist/surah/*/index.html` (prerendered Surah pages)
- `dist/sitemap.xml` (generated)
- `dist/robots.txt` (generated)
- `dist/assets/` (JS, CSS, fonts)

### 7.2 VPS Deployment

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name quranic-app.com www.quranic-app.com;
    root /var/www/quranic-app/dist;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name quranic-app.com www.quranic-app.com;
    root /var/www/quranic-app/dist;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/quranic-app.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quranic-app.com/privkey.pem;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Cache busting for index.html
    location = /index.html {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }
    
    # Sitemap & robots.txt
    location ~ ^/(sitemap\.xml|robots\.txt)$ {
        expires 1d;
        add_header Cache-Control "public";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
}
```

---

## 8. Maintenance & Monitoring

### 8.1 Monthly Tasks

- [ ] Check Google Search Console for errors
- [ ] Review Core Web Vitals
- [ ] Monitor search rankings
- [ ] Check for broken links
- [ ] Review analytics

### 8.2 Quarterly Tasks

- [ ] Audit meta tags
- [ ] Review keyword strategy
- [ ] Check competitor rankings
- [ ] Update content if needed
- [ ] Analyse backlink profile

### 8.3 When Adding New Surahs

1. Update JSON data file
2. Ensure all meta tags are present
3. Run `npm run build` (generates new sitemap)
4. Deploy to VPS
5. Submit updated sitemap to Google Search Console
6. Monitor indexing in Search Console

---

## 9. SEO Checklist

### Pre-Launch
- [ ] All meta tags present
- [ ] Structured data implemented
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Open Graph tags complete
- [ ] Twitter cards configured
- [ ] Core Web Vitals optimised
- [ ] Mobile responsive
- [ ] SSL certificate installed

### Post-Launch
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Google Analytics configured
- [ ] Bing Webmaster Tools verified
- [ ] Backlinks monitored
- [ ] Rankings tracked

---

## 10. Resources

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org Validator](https://validator.schema.org/)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/og/object)

### Learning
- [Google Search Central](https://developers.google.com/search)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Blog](https://ahrefs.com/blog/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Last Updated:** 22 February 2026  
**Next Review:** 22 May 2026
