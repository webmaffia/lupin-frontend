// Strapi API helper functions
// Update STRAPI_URL when you set up Strapi

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - API endpoint (e.g., 'homepage', 'articles')
 * @param {object} options - Fetch options
 * @returns {Promise} - API response data
 */
export async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api/${endpoint}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get full Strapi media URL
 * @param {string|object} media - Media path or object
 * @returns {string} - Full URL
 */
export function getStrapiMedia(media) {
  if (!media) return null;
  
  const imageUrl = typeof media === 'string' ? media : media.url;
  
  // Return full URL if it's already a complete URL
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Otherwise prepend Strapi URL
  return `${STRAPI_URL}${imageUrl}`;
}

/**
 * Fetch homepage data from Strapi
 * Example usage in page.js:
 * const homepage = await getHomepage();
 */
export async function getHomepage() {
  return fetchAPI('homepage?populate=deep', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
}

/**
 * Fetch all articles from Strapi
 * Example usage:
 * const articles = await getArticles();
 */
export async function getArticles() {
  return fetchAPI('articles?populate=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Fetch single article by slug
 * Example usage:
 * const article = await getArticle('my-article-slug');
 */
export async function getArticle(slug) {
  const articles = await fetchAPI(
    `articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 60 },
    }
  );
  return articles.data?.[0];
}

/**
 * Fetch global settings from Strapi (header, footer, etc.)
 */
export async function getGlobalSettings() {
  return fetchAPI('global?populate=deep', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
}

