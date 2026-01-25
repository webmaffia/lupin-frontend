/**
 * Utility to proxy HTTP image URLs through Next.js API route
 * This bypasses mixed-content restrictions (HTTPS page loading HTTP resources)
 */

/**
 * Check if a URL is HTTP (not HTTPS)
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export function isHttpUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http://');
}

/**
 * Check if a URL is an SVG file
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export function isSvgUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return url.toLowerCase().endsWith('.svg') || url.toLowerCase().includes('.svg?');
}

/**
 * Check if a URL is an image file
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export function isImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?|$)/i) !== null;
}

/**
 * Proxy an HTTP image URL through the Next.js API route
 * @param {string} url - Original HTTP URL
 * @returns {string} - Proxied URL or original if no proxy needed
 */
export function getProxiedImageUrl(url) {
  if (!url) return url;

  // Only proxy HTTP URLs (HTTPS URLs don't need proxying)
  if (!isHttpUrl(url)) {
    return url;
  }

  // Proxy all image types (SVG, JPG, PNG, WebP, etc.)
  if (!isImageUrl(url)) {
    return url;
  }

  // Use general image proxy for all image types
  const encodedUrl = encodeURIComponent(url);
  return `/api/image?url=${encodedUrl}`;
}

/**
 * Get proxied image URL for Next.js Image component
 * Automatically handles HTTP image URLs by proxying them
 * @param {string|object} image - Image URL string or object with url property
 * @returns {string|null} - Proxied URL or original URL
 */
export function getImageUrl(image) {
  if (!image) return null;

  let imageUrl = null;
  if (typeof image === 'string') {
    imageUrl = image;
  } else if (image.url) {
    imageUrl = image.url;
  } else if (image.data?.attributes?.url) {
    imageUrl = image.data.attributes.url;
  } else if (image.data?.url) {
    imageUrl = image.data.url;
  }

  if (!imageUrl) return null;

  return getProxiedImageUrl(imageUrl);
}

/**
 * Check if an image URL needs to be proxied (and thus should use unoptimized)
 * @param {string|object} image - Image URL string or object with url property
 * @returns {boolean} - True if image is proxied
 */
export function isProxiedImage(image) {
  if (!image) return false;

  let imageUrl = null;
  if (typeof image === 'string') {
    imageUrl = image;
  } else if (image.url) {
    imageUrl = image.url;
  } else if (image.data?.attributes?.url) {
    imageUrl = image.data.attributes.url;
  } else if (image.data?.url) {
    imageUrl = image.data.url;
  }

  if (!imageUrl) return false;

  return isHttpUrl(imageUrl) && isImageUrl(imageUrl);
}

