/**
 * Head Component - SEO Meta Tag Management
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Manages document head meta tags, Open Graph tags, and structured data
 *     for SEO optimisation. Automatically updates when route or content changes.
 */

import { useEffect } from 'react';
import {
  updateMetaTags,
  generateStructuredData,
  generateBreadcrumbs,
  generateArticleStructuredData,
  getCanonicalUrl,
  type SEOConfig,
} from '../../lib/seo';

interface HeadProps {
  config: SEOConfig;
  breadcrumbs?: Array<{ name: string; url: string }>;
  isArticle?: boolean;
}

export const Head: React.FC<HeadProps> = ({
  config,
  breadcrumbs,
  isArticle = false,
}) => {
  useEffect(() => {
    // Update meta tags
    updateMetaTags({
      ...config,
      url: config.url || getCanonicalUrl(window.location.pathname),
    });

    // Generate breadcrumbs if provided
    if (breadcrumbs?.length) {
      generateBreadcrumbs(breadcrumbs);
    }

    // Generate article structured data if this is an article page
    if (isArticle) {
      generateArticleStructuredData({
        headline: config.title,
        description: config.description,
        image: config.image,
        datePublished: config.publishedDate,
        dateModified: config.modifiedDate,
        author: 'Quranic App',
      });
    }

    // Generate website structured data on home page
    if (!isArticle && !breadcrumbs) {
      generateStructuredData('WebSite', {
        name: 'Quranic App',
        description: config.description,
        url: window.location.origin,
      });
    }
  }, [config, breadcrumbs, isArticle]);

  return null; // This component only manages head, doesn't render anything
};

export default Head;
