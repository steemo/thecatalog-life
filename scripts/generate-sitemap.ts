/**
 * Sitemap Generation Script
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Build-time script to generate sitemap.xml and robots.txt files.
 *     Run during build process to ensure search engines can crawl all pages.
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import data helpers - hardcode Surah data for sitemap generation
const SURAHS = [
  { slug: 'al-baqarah' },
  { slug: 'aal-imran' },
  { slug: 'an-nisa' },
];

const BASE_URL = process.env.VITE_BASE_URL || 'https://quranic-app.com';
const DIST_DIR = resolve(__dirname, '../dist');

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
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
 * Generate sitemap entries
 */
function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Home page
  entries.push({
    loc: BASE_URL,
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Surah pages
  try {
    SURAHS.forEach((surah) => {
      entries.push({
        loc: `${BASE_URL}/surah/${surah.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.warn('Warning: Could not load Surah data for sitemap generation');
  }

  return entries;
}

/**
 * Generate XML sitemap
 */
function generateSitemapXml(): string {
  const entries = generateSitemapEntries();

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
 * Generate robots.txt
 */
function generateRobotsTxt(): string {
  return `# Quranic App - Robots.txt
# Generated automatically during build

User-agent: *
Allow: /
Disallow: /admin
Disallow: /.git
Disallow: /node_modules

# Crawl delay (1 second between requests)
Crawl-delay: 1

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;
}

/**
 * Main execution
 */
function main(): void {
  try {
    console.log('🔍 Generating sitemap.xml...');
    const sitemapXml = generateSitemapXml();
    writeFileSync(resolve(DIST_DIR, 'sitemap.xml'), sitemapXml);
    console.log('✅ sitemap.xml generated successfully');

    console.log('🤖 Generating robots.txt...');
    const robotsTxt = generateRobotsTxt();
    writeFileSync(resolve(DIST_DIR, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated successfully');

    console.log('\n📊 Sitemap Summary:');
    const entries = generateSitemapEntries();
    console.log(`   Total URLs: ${entries.length}`);
    console.log(`   Home page: 1`);
    console.log(`   Surah pages: ${entries.length - 1}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
