/**
 * Sitemap Generator
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Generates XML sitemap for search engine crawling. Includes all Surah pages
 *     with proper priority and change frequency metadata.
 */

import { getAllSurahSlugs, getSurahBySlug } from '../data';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap entries for all pages
 */
export function generateSitemapEntries(baseUrl: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Home page
  entries.push({
    loc: baseUrl,
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Surah pages
  const surahSlugs = getAllSurahSlugs();
  surahSlugs.forEach((slug) => {
    const surah = getSurahBySlug(slug);
    if (surah) {
      entries.push({
        loc: `${baseUrl}/surah/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
  });

  return entries;
}

/**
 * Generate XML sitemap string
 */
export function generateSitemapXml(baseUrl: string): string {
  const entries = generateSitemapEntries(baseUrl);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(sitemapUrl: string): string {
  return `# Quranic App - Robots.txt
# Generated automatically for search engine crawling

User-agent: *
Allow: /
Disallow: /admin
Disallow: /.git
Disallow: /node_modules

# Crawl delay (optional - adjust based on server capacity)
Crawl-delay: 1

# Sitemap location
Sitemap: ${sitemapUrl}
`;
}
