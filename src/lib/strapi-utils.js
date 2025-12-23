/**
 * Strapi SEO Utilities
 * Helper functions to easily integrate Strapi CMS with SEO
 */

/**
 * Get full image URL from Strapi
 * @param {Object} image - Strapi image object
 * @returns {string|null} Full image URL
 */
export function getStrapiImageUrl(image) {
  if (!image?.data?.attributes?.url) return null;
  
  const url = image.data.attributes.url;
  
  // If it's already a full URL (e.g., from external storage), return it
  if (url.startsWith('http')) return url;
  
  // Otherwise, prepend Strapi URL
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

/**
 * Get image alt text from Strapi
 * @param {Object} image - Strapi image object
 * @returns {string|null} Image alt text
 */
export function getStrapiImageAlt(image) {
  return image?.data?.attributes?.alternativeText || image?.data?.attributes?.name || null;
}

/**
 * Map Strapi SEO component to our SEO format
 * @param {Object} strapiSEO - Strapi SEO component data
 * @param {string} fallbackUrl - Fallback canonical URL
 * @param {Object} fallback - Fallback values if Strapi data is missing
 * @returns {Object} SEO data object
 */
export function mapStrapiSEO(strapiSEO, fallbackUrl, fallback = {}) {
  // If no Strapi SEO data, return fallback
  if (!strapiSEO) {
    return {
      title: fallback.title || null,
      description: fallback.description || null,
      canonicalUrl: fallbackUrl,
      keywords: fallback.keywords || null,
      ogImage: fallback.ogImage || null,
      noIndex: false,
    };
  }

  return {
    title: strapiSEO.metaTitle || fallback.title,
    description: strapiSEO.metaDescription || fallback.description,
    canonicalUrl: strapiSEO.canonicalURL || fallbackUrl,
    keywords: strapiSEO.keywords || fallback.keywords,
    ogImage: getStrapiImageUrl(strapiSEO.metaImage) || fallback.ogImage,
    ogImageAlt: getStrapiImageAlt(strapiSEO.metaImage),
    noIndex: strapiSEO.preventIndexing || false,
    noFollow: strapiSEO.preventFollowing || false,
  };
}

/**
 * Fetch page data from Strapi by slug
 * @param {string} slug - Page slug
 * @param {string} contentType - Strapi content type (default: 'pages')
 * @returns {Promise<Object>} Page data
 */
export async function fetchStrapiPage(slug, contentType = 'pages') {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${contentType}?filters[slug][$eq]=${slug}&populate=deep`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { 
      revalidate: parseInt(process.env.STRAPI_REVALIDATE || '60'),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${contentType} from Strapi: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0] || null;
}

/**
 * Fetch single type data from Strapi (e.g., home page, settings)
 * @param {string} singleType - Strapi single type name
 * @returns {Promise<Object>} Single type data
 */
export async function fetchStrapiSingleType(singleType) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${singleType}?populate=deep`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { 
      revalidate: parseInt(process.env.STRAPI_REVALIDATE || '60'),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${singleType} from Strapi: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || null;
}

/**
 * Extract SEO data from Strapi page and generate metadata
 * This is a complete helper that does everything in one function
 * 
 * @param {string} slug - Page slug
 * @param {string} baseUrl - Base URL (e.g., 'https://www.lupin.com')
 * @param {Object} fallback - Fallback SEO values
 * @returns {Promise<Object>} Metadata object ready for Next.js
 */
export async function generateStrapiPageMetadata(slug, baseUrl, fallback = {}) {
  const { generateMetadata: generateSEOMetadata } = await import('./seo');
  
  try {
    const pageData = await fetchStrapiPage(slug);
    
    if (!pageData) {
      throw new Error('Page not found');
    }

    const seoData = mapStrapiSEO(
      pageData.attributes?.seo,
      `${baseUrl}/${slug}`,
      fallback
    );

    return generateSEOMetadata(seoData);
  } catch (error) {
    console.error('Error generating Strapi metadata:', error);

    // Return fallback metadata
    return generateSEOMetadata({
      title: fallback.title || 'Lupin',
      description: fallback.description || 'Lupin Pharmaceuticals',
      canonicalUrl: `${baseUrl}/${slug}`,
    });
  }
}

/**
 * Get Strapi media URL with transformations
 * @param {Object} image - Strapi image object
 * @param {Object} options - Transformation options (width, height, format)
 * @returns {string|null} Transformed image URL
 */
export function getStrapiImageWithTransform(image, options = {}) {
  const baseUrl = getStrapiImageUrl(image);
  if (!baseUrl) return null;

  // If using Strapi's built-in image optimization
  const params = new URLSearchParams();
  
  if (options.width) params.append('width', options.width);
  if (options.height) params.append('height', options.height);
  if (options.format) params.append('format', options.format);
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Check if running in development mode
 * @returns {boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get Strapi URL with fallback
 * @returns {string}
 */
export function getStrapiUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
}

/**
 * Validate Strapi configuration
 * @throws {Error} If configuration is invalid
 */
export function validateStrapiConfig() {
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is not set');
  }

  if (!process.env.STRAPI_API_TOKEN && !isDevelopment()) {
    console.warn('STRAPI_API_TOKEN is not set. API requests may fail.');
  }
}

/**
 * Format Strapi date to locale string
 * @param {string} dateString - ISO date string from Strapi
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date
 */
export function formatStrapiDate(dateString, locale = 'en-US') {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Extract plain text from Strapi rich text (Markdown or Blocks)
 * @param {Array|string} richText - Strapi rich text content
 * @param {number} maxLength - Maximum length (default: 160 for meta description)
 * @returns {string} Plain text excerpt
 */
export function extractTextFromRichText(richText, maxLength = 160) {
  if (!richText) return '';

  let text = '';

  // If it's an array (Strapi Blocks)
  if (Array.isArray(richText)) {
    text = richText
      .filter(block => block.type === 'paragraph')
      .map(block => block.children?.map(child => child.text).join(''))
      .join(' ');
  } else if (typeof richText === 'string') {
    // If it's markdown or plain text
    text = richText.replace(/[#*_~`\[\]]/g, ''); // Remove markdown syntax
  }

  // Truncate and add ellipsis
  if (text.length > maxLength) {
    return text.substring(0, maxLength).trim() + '...';
  }

  return text.trim();
}
