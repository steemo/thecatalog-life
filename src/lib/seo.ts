/**
 * SEO Utilities & Meta Tag Management
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Centralised SEO utilities for managing meta tags, structured data,
 *     and Open Graph tags across the application. Ensures proper indexing
 *     and social media sharing.
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * Update document meta tags for SEO
 */
export function updateMetaTags(config: SEOConfig): void {
  // Title
  document.title = config.title;
  updateMetaTag('og:title', config.title);
  updateMetaTag('twitter:title', config.title);

  // Description
  updateMetaTag('description', config.description);
  updateMetaTag('og:description', config.description);
  updateMetaTag('twitter:description', config.description);

  // Keywords
  if (config.keywords?.length) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Image
  if (config.image) {
    updateMetaTag('og:image', config.image);
    updateMetaTag('twitter:image', config.image);
  }

  // URL
  if (config.url) {
    updateMetaTag('og:url', config.url);
    updateMetaTag('canonical', config.url, 'link');
  }

  // Type
  if (config.type) {
    updateMetaTag('og:type', config.type);
  }

  // Article metadata
  if (config.publishedDate) {
    updateMetaTag('article:published_time', config.publishedDate);
  }
  if (config.modifiedDate) {
    updateMetaTag('article:modified_time', config.modifiedDate);
  }
  if (config.author) {
    updateMetaTag('article:author', config.author);
  }

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
}

/**
 * Helper to update or create meta tag
 */
function updateMetaTag(
  name: string,
  content: string,
  type: 'meta' | 'link' = 'meta'
): void {
  if (type === 'meta') {
    let element = document.querySelector(
      `meta[name="${name}"], meta[property="${name}"]`
    ) as HTMLMetaElement | null;

    if (!element) {
      element = document.createElement('meta');
      // Use property for Open Graph tags
      if (name.startsWith('og:') || name.startsWith('article:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }

    element.content = content;
  } else if (type === 'link') {
    let element = document.querySelector(
      `link[rel="${name}"]`
    ) as HTMLLinkElement | null;

    if (!element) {
      element = document.createElement('link');
      element.rel = name;
      document.head.appendChild(element);
    }

    element.href = content;
  }
}

/**
 * Generate JSON-LD structured data for search engines
 */
export function generateStructuredData(
  type: 'WebSite' | 'Article' | 'BreadcrumbList',
  data: Record<string, unknown>
): void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });

  // Remove existing structured data of same type
  const existing = document.querySelector(
    `script[type="application/ld+json"][data-type="${type}"]`
  );
  if (existing) {
    existing.remove();
  }

  script.setAttribute('data-type', type);
  document.head.appendChild(script);
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbs(
  items: Array<{ name: string; url: string }>
): void {
  generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.url}`,
    })),
  });
}

/**
 * Generate article structured data for Surah pages
 */
export function generateArticleStructuredData(config: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): void {
  generateStructuredData('Article', {
    headline: config.headline,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    author: {
      '@type': 'Organization',
      name: config.author || 'Quranic App',
    },
  });
}

/**
 * Get current page URL
 */
export function getCurrentUrl(): string {
  return window.location.href;
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}${path}`;
}
