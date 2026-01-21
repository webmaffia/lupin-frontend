// Strapi API helper functions
// Update STRAPI_URL when you set up Strapi

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1380';

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

  // Add authorization token if available
  if (process.env.STRAPI_API_TOKEN) {
    defaultOptions.headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  // Merge headers properly
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  const requestUrl = `${STRAPI_URL}/api/${endpoint}`;

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching from Strapi:', requestUrl);
    console.log('Token present:', !!process.env.STRAPI_API_TOKEN);
  }

  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      // Get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error.message || JSON.stringify(errorData.error)}`;
        }
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage += ` - ${response.statusText}`;
      }
      
      // Provide helpful error messages
      if (response.status === 403) {
        errorMessage += '\n\n403 Forbidden: Check that STRAPI_API_TOKEN is set in your .env.local file and has proper permissions.';
      } else if (response.status === 401) {
        errorMessage += '\n\n401 Unauthorized: Check that your STRAPI_API_TOKEN is valid.';
      }
      
      throw new Error(errorMessage);
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
 * 
 * Populates the hero component and all its nested fields recursively
 */
export async function getHomepage() {
  // Populate hero component and all nested components/fields recursively
  return fetchAPI('homepage?populate[hero][populate]=*&populate[ourStory][populate][sectionData][populate]=*&populate[ourPurpose][populate][sectionData][populate]=*&populate[ourPurpose][populate][cards][populate]=*&populate[overView][populate][sectionData][populate]=*&populate[overView][populate][stats][populate]=*&populate[ourBusiness][populate][sectionData][populate]=*&populate[sustainability][populate][sectionData][populate]=*&populate[csr][populate][sectionData][populate]=*&populate[life][populate][sectionData][populate]=*&populate[news][populate][items][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map Strapi homepage hero data to Hero component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. heading as array: { heading: ["Line 1", "Line 2"] }
 * 2. heading as object: { heading: { line1: "Text", line2: "Text" } } (will be converted to array)
 * 3. heading as string: { heading: "Line 1, Line 2" } (will be split into array)
 * 4. Nested in hero: { hero: { heading: [...] } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted hero data with structure:
 *   { heading: [string, string], subheading: [...], cta: {...}, stickyNotes: [...] }
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageHeroData(strapiData) {
  // Handle Strapi v4 response structure
  // For single types: data.hero.heading (no attributes wrapper)
  // For collection types: data.attributes.hero.heading
  const data = strapiData?.data || strapiData;
  
  // Log the structure we're working with
  console.log('Mapping Strapi data. Full response:', JSON.stringify(strapiData, null, 2));
  console.log('Data object:', JSON.stringify(data, null, 2));

  // If no data, throw error instead of using fallback
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  // Helper function to extract heading - NO FALLBACK, only from API
  // Returns array format: ["Line 1", "Line 2"]
  const extractHeading = (data) => {
    console.log('Extracting heading from:', {
      'data.heading': data.heading,
      'data.hero?.heading': data.hero?.heading,
      'heading type': typeof (data.hero?.heading || data.heading),
      'is array': Array.isArray(data.hero?.heading || data.heading)
    });

    const heading = data.hero?.heading || data.heading;
    
    // If heading is already an array, return it
    if (Array.isArray(heading)) {
      console.log('Found heading as array:', heading);
      if (heading.length === 0) {
        throw new Error('Heading array is empty. Please provide at least one line in Strapi.');
      }
      return heading.filter(line => line && line.trim());
    }
    
    // If heading is an object with line1/line2, convert to array
    if (heading && typeof heading === 'object') {
      if (heading.line1 && heading.line2) {
        console.log('Found heading as object with line1/line2, converting to array');
        return [heading.line1, heading.line2];
      }
      if (heading.line1) {
        throw new Error('Heading has line1 but missing line2. Please provide both line1 and line2 in Strapi, or use an array format.');
      }
    }
    
    // If heading is a string, split it (try common separators)
    if (typeof heading === 'string' && heading.trim()) {
      console.log('Found heading as string:', heading);
      // Try splitting by newline, comma, or common patterns
      const parts = heading.split(/\n|, | - | — | \| /).filter(p => p.trim());
      if (parts.length >= 1) {
        console.log('Split heading into:', parts);
        return parts.map(p => p.trim());
      }
      throw new Error(`Heading is a single string "${heading}" but could not be split. Expected array, object with line1/line2, or string with separator (newline, comma, dash).`);
    }
    
    throw new Error(`Heading data not found in Strapi response. Available keys: ${Object.keys(data).join(', ')}. Please add heading field to your homepage content.`);
  };

  // Helper function to extract subheading - flexible, can be optional
  const extractSubheading = (data) => {
    const subheading = data.hero?.subheading || data.subheading;
    if (Array.isArray(subheading)) {
      return subheading;
    }
    if (typeof subheading === 'string' && subheading.trim()) {
      // Split by newlines or return as single-item array
      return subheading.split('\n').filter(s => s.trim());
    }
    // Return empty array if not found (optional field)
    console.warn('Subheading not found in Strapi, using empty array');
    return [];
  };

  // Extract CTA - flexible, can have defaults
  const extractCTA = (data) => {
    const cta = data.hero?.cta || data.cta;
    if (!cta) {
      console.warn('CTA not found in Strapi, using default');
      return { text: 'know more', href: '#' };
    }
    return {
      text: cta.text || 'know more',
      href: cta.href || '#'
    };
  };

  // Extract sticky notes - make optional since they might not be in CMS yet
  const extractStickyNotes = (data) => {
    const stickyNotes = data.hero?.stickyNotes || data.stickyNotes;
    // Make stickyNotes optional - return default if not present (Hero component needs at least 2 items)
    if (!stickyNotes || !Array.isArray(stickyNotes) || stickyNotes.length === 0) {
      console.warn('StickyNotes not found, using default values');
      return [
        { text: 'Product Finder', href: '#product-finder' },
        { text: 'Chat', href: '#chat' }
      ];
    }
    return stickyNotes;
  };

  // Extract image from Strapi - NO FALLBACK, must come from API
  const extractImage = (data) => {
    const image = data.hero?.image || data.image;
    if (!image) {
      throw new Error('Image not found in Strapi response. Please add image field to your hero component in Strapi.');
    }
    
    if (!image.url) {
      throw new Error('Image URL is missing in Strapi response. Please ensure the image is properly uploaded in Strapi.');
    }
    
    // Get full image URL using getStrapiMedia
    const imageUrl = getStrapiMedia(image);
    
    if (!imageUrl) {
      throw new Error('Failed to generate image URL from Strapi data.');
    }
    
    return {
      url: imageUrl,
      alt: image.alternativeText || image.caption || '',
      width: image.width,
      height: image.height
    };
  };

  // Map Strapi data to Hero component format
  return {
    heading: extractHeading(data),
    subheading: extractSubheading(data),
    cta: extractCTA(data),
    stickyNotes: extractStickyNotes(data),
    image: extractImage(data),
  };
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
 * Map Strapi homepage ourStory data to OurStory component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted ourStory data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageOurStoryData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping OurStory data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const sectionData = data.ourStory?.sectionData;
  if (!sectionData) {
    throw new Error('OurStory sectionData not found in Strapi response. Please add ourStory component to your homepage content.');
  }

  // Extract eyebrow
  if (!sectionData.eyebrow) {
    throw new Error('Eyebrow not found in ourStory sectionData. Please add eyebrow field in Strapi.');
  }

  // Extract and split heading by newlines
  if (!sectionData.heading) {
    throw new Error('Heading not found in ourStory sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract and split paragraphs by newlines
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in ourStory sectionData. Please add paragraphs field in Strapi.');
  }
  const paragraphs = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract image - NO FALLBACK
  const image = sectionData.image;
  if (!image) {
    throw new Error('Image not found in ourStory sectionData. Please add image field in Strapi.');
  }
  if (!image.url) {
    throw new Error('Image URL is missing in ourStory sectionData. Please ensure the image is properly uploaded in Strapi.');
  }
  const imageUrl = getStrapiMedia(image);
  if (!imageUrl) {
    throw new Error('Failed to generate image URL from Strapi data.');
  }

  // Extract CTA - required, throw error if missing
  if (!sectionData.cta) {
    throw new Error('CTA not found in ourStory sectionData. Please add cta field in Strapi.');
  }
  if (!sectionData.cta.text || !sectionData.cta.href) {
    throw new Error('CTA data incomplete in ourStory sectionData. Please provide both text and href in Strapi.');
  }

  return {
    eyebrow: sectionData.eyebrow,
    heading,
    paragraphs,
    image: {
      url: imageUrl,
      alt: image.alternativeText || image.caption || '',
      width: image.width,
      height: image.height
    },
    cta: {
      text: sectionData.cta.text,
      href: sectionData.cta.href
    }
  };
}

/**
 * Map Strapi homepage ourPurpose data to OurPurpose component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted ourPurpose data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageOurPurposeData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping OurPurpose data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const ourPurpose = data.ourPurpose;
  if (!ourPurpose) {
    throw new Error('OurPurpose data not found in Strapi response. Please add ourPurpose component to your homepage content.');
  }

  const sectionData = ourPurpose.sectionData;
  if (!sectionData) {
    throw new Error('OurPurpose sectionData not found in Strapi response. Please add sectionData to your ourPurpose component.');
  }

  // Extract eyebrow
  if (!sectionData.eyebrow) {
    throw new Error('Eyebrow not found in ourPurpose sectionData. Please add eyebrow field in Strapi.');
  }

  // Extract and split heading by newlines
  if (!sectionData.heading) {
    throw new Error('Heading not found in ourPurpose sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract and split paragraphs/description by newlines
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in ourPurpose sectionData. Please add paragraphs field in Strapi.');
  }
  const description = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract cards - required, throw error if missing
  const cards = ourPurpose.cards;
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    throw new Error('Cards not found in ourPurpose data. Please add cards array in Strapi.');
  }

  // Map cards array
  const mappedCards = cards.map((card, index) => {
    if (!card.title) {
      throw new Error(`Card ${index + 1} is missing title. Please add title field in Strapi.`);
    }
    if (!card.description) {
      throw new Error(`Card ${index + 1} is missing description. Please add description field in Strapi.`);
    }
    if (!card.cta) {
      throw new Error(`Card ${index + 1} is missing CTA. Please add cta field in Strapi.`);
    }
    if (!card.cta.text || !card.cta.href) {
      throw new Error(`Card ${index + 1} CTA is incomplete. Please provide both text and href in Strapi.`);
    }

    // Split description by newlines
    const cardDescription = typeof card.description === 'string'
      ? card.description.split('\n').filter(line => line.trim())
      : card.description;

    return {
      id: card.id || index + 1,
      title: card.title,
      description: cardDescription,
      ctaText: card.cta.text,
      ctaHref: card.cta.href
    };
  });

  return {
    eyebrow: sectionData.eyebrow,
    heading,
    description,
    cards: mappedCards,
    // Image and CTA are optional - only include if not null
    ...(sectionData.image && {
      image: {
        url: getStrapiMedia(sectionData.image),
        alt: sectionData.image.alternativeText || sectionData.image.caption || '',
        width: sectionData.image.width,
        height: sectionData.image.height
      }
    }),
    ...(sectionData.cta && sectionData.cta.text && sectionData.cta.href && {
      cta: {
        text: sectionData.cta.text,
        href: sectionData.cta.href
      }
    })
  };
}

/**
 * Map Strapi homepage overview data to Overview component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted overview data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageOverviewData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping Overview data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const overView = data.overView;
  if (!overView) {
    throw new Error('Overview data not found in Strapi response. Please add overView component to your homepage content.');
  }

  const sectionData = overView.sectionData;
  if (!sectionData) {
    throw new Error('Overview sectionData not found in Strapi response. Please add sectionData to your overView component.');
  }

  // Extract eyebrow
  if (!sectionData.eyebrow) {
    throw new Error('Eyebrow not found in overview sectionData. Please add eyebrow field in Strapi.');
  }

  // Extract and split heading by newlines
  if (!sectionData.heading) {
    throw new Error('Heading not found in overview sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract stats - required, throw error if missing
  const stats = overView.stats;
  if (!stats || !Array.isArray(stats) || stats.length === 0) {
    throw new Error('Stats not found in overview data. Please add stats array in Strapi.');
  }

  // Map stats array - extract suffix from number if present, otherwise default to "+"
  const mappedStats = stats.map((stat, index) => {
    if (!stat.label) {
      throw new Error(`Stat ${index + 1} is missing label. Please add label field in Strapi.`);
    }
    if (!stat.number) {
      throw new Error(`Stat ${index + 1} is missing number. Please add number field in Strapi.`);
    }

    // Extract suffix from number if it exists (e.g., "15+", "100+")
    // Otherwise default to "+"
    let number = stat.number.toString().trim();
    let suffix = '+';
    
    // Check if number ends with a non-digit character (like +, %, etc.)
    const suffixMatch = number.match(/[^\d]+$/);
    if (suffixMatch) {
      suffix = suffixMatch[0];
      number = number.replace(/[^\d]+$/, '').trim();
    }

    return {
      number,
      suffix,
      label: stat.label,
      // Include CTA with fallback
      cta: {
        text: stat.cta?.text || 'Know More',
        href: stat.cta?.href || '#'
      }
    };
  });

  return {
    eyebrow: sectionData.eyebrow,
    heading,
    stats: mappedStats,
    // paragraphs, image, and cta are optional - only include if not null
    ...(sectionData.paragraphs && {
      paragraphs: typeof sectionData.paragraphs === 'string'
        ? sectionData.paragraphs.split('\n').filter(para => para.trim())
        : sectionData.paragraphs
    }),
    ...(sectionData.image && {
      image: {
        url: getStrapiMedia(sectionData.image),
        alt: sectionData.image.alternativeText || sectionData.image.caption || '',
        width: sectionData.image.width,
        height: sectionData.image.height
      }
    }),
    ...(sectionData.cta && sectionData.cta.text && sectionData.cta.href && {
      cta: {
        text: sectionData.cta.text,
        href: sectionData.cta.href
      }
    })
  };
}

/**
 * Map Strapi homepage ourBusiness data to OurBusiness component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted ourBusiness data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageOurBusinessData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping OurBusiness data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const ourBusiness = data.ourBusiness;
  if (!ourBusiness) {
    throw new Error('OurBusiness data not found in Strapi response. Please add ourBusiness component to your homepage content.');
  }

  const sectionData = ourBusiness.sectionData;
  if (!sectionData) {
    throw new Error('OurBusiness sectionData not found in Strapi response. Please add sectionData to your ourBusiness component.');
  }

  // Extract heading - required
  if (!sectionData.heading) {
    throw new Error('Heading not found in ourBusiness sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract paragraphs/description - required
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in ourBusiness sectionData. Please add paragraphs field in Strapi.');
  }
  const description = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract image - required
  if (!sectionData.image) {
    throw new Error('Image not found in ourBusiness sectionData. Please add image field in Strapi.');
  }
  if (!sectionData.image.url) {
    throw new Error('Image URL is missing in ourBusiness sectionData. Please ensure the image is properly uploaded in Strapi.');
  }
  const imageUrl = getStrapiMedia(sectionData.image);
  if (!imageUrl) {
    throw new Error('Failed to generate image URL from Strapi data.');
  }

  // Extract CTA - required
  if (!sectionData.cta) {
    throw new Error('CTA not found in ourBusiness sectionData. Please add cta field in Strapi.');
  }
  if (!sectionData.cta.text || !sectionData.cta.href) {
    throw new Error('CTA data incomplete in ourBusiness sectionData. Please provide both text and href in Strapi.');
  }

  return {
    heading,
    description,
    image: imageUrl,
    imageAlt: sectionData.image.alternativeText || sectionData.image.caption || 'Healthcare Professional with Patient',
    cta: {
      text: sectionData.cta.text,
      href: sectionData.cta.href
    },
    // Eyebrow is optional - only include if not null
    ...(sectionData.eyebrow && { eyebrow: sectionData.eyebrow })
  };
}

/**
 * Map Strapi homepage sustainability data to Sustainability component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted sustainability data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageSustainabilityData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping Sustainability data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const sustainability = data.sustainability;
  if (!sustainability) {
    throw new Error('Sustainability data not found in Strapi response. Please add sustainability component to your homepage content.');
  }

  const sectionData = sustainability.sectionData;
  if (!sectionData) {
    throw new Error('Sustainability sectionData not found in Strapi response. Please add sectionData to your sustainability component.');
  }

  // Extract eyebrow - required
  if (!sectionData.eyebrow) {
    throw new Error('Eyebrow not found in sustainability sectionData. Please add eyebrow field in Strapi.');
  }

  // Extract and split heading by newlines
  if (!sectionData.heading) {
    throw new Error('Heading not found in sustainability sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract paragraphs/description - required
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in sustainability sectionData. Please add paragraphs field in Strapi.');
  }
  const description = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract image/backgroundImage - required
  if (!sectionData.image) {
    throw new Error('Image not found in sustainability sectionData. Please add image field in Strapi.');
  }
  if (!sectionData.image.url) {
    throw new Error('Image URL is missing in sustainability sectionData. Please ensure the image is properly uploaded in Strapi.');
  }
  const imageUrl = getStrapiMedia(sectionData.image);
  if (!imageUrl) {
    throw new Error('Failed to generate image URL from Strapi data.');
  }

  // Extract CTA - required
  if (!sectionData.cta) {
    throw new Error('CTA not found in sustainability sectionData. Please add cta field in Strapi.');
  }
  if (!sectionData.cta.text || !sectionData.cta.href) {
    throw new Error('CTA data incomplete in sustainability sectionData. Please provide both text and href in Strapi.');
  }

  return {
    eyebrow: sectionData.eyebrow,
    heading,
    description,
    backgroundImage: imageUrl,
    imageAlt: sectionData.image.alternativeText || sectionData.image.caption || 'Sustainability',
    cta: {
      text: sectionData.cta.text,
      href: sectionData.cta.href
    }
  };
}

/**
 * Map Strapi homepage CSR data to CSR component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted CSR data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageCSRData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping CSR data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const csr = data.csr;
  if (!csr) {
    throw new Error('CSR data not found in Strapi response. Please add csr component to your homepage content.');
  }

  const sectionData = csr.sectionData;
  if (!sectionData) {
    throw new Error('CSR sectionData not found in Strapi response. Please add sectionData to your csr component.');
  }

  // Extract eyebrow - required
  if (!sectionData.eyebrow) {
    throw new Error('Eyebrow not found in CSR sectionData. Please add eyebrow field in Strapi.');
  }

  // Extract heading - required
  if (!sectionData.heading) {
    throw new Error('Heading not found in CSR sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract subheading - at csr level, not sectionData
  if (!csr.subheading) {
    throw new Error('Subheading not found in CSR data. Please add subheading field in Strapi.');
  }

  // Extract paragraphs/description - required
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in CSR sectionData. Please add paragraphs field in Strapi.');
  }
  const description = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract image - required
  if (!sectionData.image) {
    throw new Error('Image not found in CSR sectionData. Please add image field in Strapi.');
  }
  if (!sectionData.image.url) {
    throw new Error('Image URL is missing in CSR sectionData. Please ensure the image is properly uploaded in Strapi.');
  }
  const imageUrl = getStrapiMedia(sectionData.image);
  if (!imageUrl) {
    throw new Error('Failed to generate image URL from Strapi data.');
  }

  // Extract CTA - required
  if (!sectionData.cta) {
    throw new Error('CTA not found in CSR sectionData. Please add cta field in Strapi.');
  }
  if (!sectionData.cta.text || !sectionData.cta.href) {
    throw new Error('CTA data incomplete in CSR sectionData. Please provide both text and href in Strapi.');
  }

  return {
    eyebrow: sectionData.eyebrow,
    heading,
    subheading: csr.subheading,
    description,
    image: imageUrl,
    imageAlt: sectionData.image.alternativeText || sectionData.image.caption || 'CSR Activities',
    cta: {
      text: sectionData.cta.text,
      href: sectionData.cta.href
    }
  };
}

/**
 * Map Strapi homepage life data to Life component format
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted life data
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageLifeData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  // Log for debugging
  console.log('Mapping Life data. Full response:', JSON.stringify(strapiData, null, 2));
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  const life = data.life;
  if (!life) {
    throw new Error('Life data not found in Strapi response. Please add life component to your homepage content.');
  }

  const sectionData = life.sectionData;
  if (!sectionData) {
    throw new Error('Life sectionData not found in Strapi response. Please add sectionData to your life component.');
  }

  // Extract heading - required
  if (!sectionData.heading) {
    throw new Error('Heading not found in life sectionData. Please add heading field in Strapi.');
  }
  const heading = typeof sectionData.heading === 'string' 
    ? sectionData.heading.split('\n').filter(line => line.trim())
    : sectionData.heading;

  // Extract paragraphs/description - required
  if (!sectionData.paragraphs) {
    throw new Error('Paragraphs not found in life sectionData. Please add paragraphs field in Strapi.');
  }
  const description = typeof sectionData.paragraphs === 'string'
    ? sectionData.paragraphs.split('\n').filter(para => para.trim())
    : sectionData.paragraphs;

  // Extract image/backgroundImage - required
  if (!sectionData.image) {
    throw new Error('Image not found in life sectionData. Please add image field in Strapi.');
  }
  if (!sectionData.image.url) {
    throw new Error('Image URL is missing in life sectionData. Please ensure the image is properly uploaded in Strapi.');
  }
  const imageUrl = getStrapiMedia(sectionData.image);
  if (!imageUrl) {
    throw new Error('Failed to generate image URL from Strapi data.');
  }

  // Extract CTA - required
  if (!sectionData.cta) {
    throw new Error('CTA not found in life sectionData. Please add cta field in Strapi.');
  }
  if (!sectionData.cta.text || !sectionData.cta.href) {
    throw new Error('CTA data incomplete in life sectionData. Please provide both text and href in Strapi.');
  }

  return {
    heading,
    description,
    backgroundImage: imageUrl,
    imageAlt: sectionData.image.alternativeText || sectionData.image.caption || 'Life at Lupin',
    cta: {
      text: sectionData.cta.text,
      href: sectionData.cta.href
    },
    // Eyebrow is optional - only include if not null
    ...(sectionData.eyebrow && { eyebrow: sectionData.eyebrow })
  };
}

/**
 * Map Strapi homepage newsInsights data to NewsInsights component format
 * 
 * Expected Strapi structure:
 * {
 *   news: {
 *     titile: "News & Insights",  // Section title (note: typo in Strapi)
 *     items: [
 *       {
 *         id: number,
 *         date: "12 September, 2025",
 *         headline: "Headline text",
 *         circleInner: { image object },
 *         cta: { text: "Know More", href: "/" }
 *       }
 *     ]
 *   }
 * }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object} Formatted newsInsights data with structure:
 *   { title: string, items: [{ id, date, headline, image: { url, width, height, alt }, href }] }
 * @throws {Error} If required data is missing from Strapi
 */
export function mapHomepageNewsInsightsData(strapiData) {
  // Handle Strapi v4 response structure
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    throw new Error('No data received from Strapi API. Check that the homepage endpoint returns data.');
  }

  // Extract news object - required
  if (!data.news) {
    throw new Error('news not found in Strapi response. Please add news field in Strapi homepage.');
  }

  // Extract title from news.titile (note: typo in Strapi field name)
  const title = data.news.titile || data.news.title;
  if (!title) {
    throw new Error('News title not found in Strapi response. Please add titile or title field in news component.');
  }

  // Extract items array - required
  if (!data.news.items) {
    throw new Error('news.items not found in Strapi response. Please add items field in news component.');
  }
  if (!Array.isArray(data.news.items) || data.news.items.length === 0) {
    throw new Error('news.items is empty or not an array. Please add at least one item in Strapi.');
  }

  // Map each news item
  const items = data.news.items.map((item, index) => {
    if (!item.id) {
      throw new Error(`News item at index ${index} is missing id field. Please provide id in Strapi.`);
    }

    // Extract date - required
    if (!item.date) {
      throw new Error(`News item with id ${item.id} is missing date field. Please add date in Strapi.`);
    }

    // Extract headline - required
    if (!item.headline) {
      throw new Error(`News item with id ${item.id} is missing headline field. Please add headline in Strapi.`);
    }

    // Extract circleInner image - required
    if (!item.circleInner) {
      throw new Error(`News item with id ${item.id} is missing circleInner field. Please add circleInner image in Strapi.`);
    }
    if (!item.circleInner.url) {
      throw new Error(`News item with id ${item.id} has circleInner but image URL is missing. Please ensure the image is properly uploaded in Strapi.`);
    }
    const imageUrl = getStrapiMedia(item.circleInner);
    if (!imageUrl) {
      throw new Error(`Failed to generate image URL for news item with id ${item.id}.`);
    }

    // Extract CTA href - required
    if (!item.cta) {
      throw new Error(`News item with id ${item.id} is missing cta field. Please add cta in Strapi.`);
    }
    if (!item.cta.href) {
      throw new Error(`News item with id ${item.id} has cta but href is missing. Please provide href in Strapi.`);
    }

    return {
      id: item.id,
      date: item.date,
      headline: item.headline,
      image: {
        url: imageUrl,
        width: item.circleInner.width || 627,
        height: item.circleInner.height || 627,
        alt: item.circleInner.alternativeText || item.circleInner.caption || ''
      },
      href: item.cta.href
    };
  });

  return {
    title: title,
    items: items
  };
}

/**
 * Fetch global settings from Strapi (header, footer, etc.)
 */
export async function getGlobalSettings() {
  return fetchAPI('global?populate=deep', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
}

/**
 * Fetch analyst coverage data from Strapi
 * This is a Single Type, so it returns one entry with AnalystCard array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getAnalystCoverage() {
  // Populate TopBanner and AnalystCard
  return fetchAPI('analyst-coverage?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[AnalystCard][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map analyst coverage data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array} Mapped analyst data array
 */
export function mapAnalystCoverageData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    throw new Error('No data received from Strapi API. Check that the analyst-coverage endpoint returns data.');
  }

  // Map AnalystCard array to component format
  const analystCards = Array.isArray(data.AnalystCard)
    ? data.AnalystCard.map((card, index) => ({
        id: card.id || index + 1,
        institution: card.company_name || '',
        analyst: card.name || '',
        email: card.email || '',
        isActive: false // Default to false, can be set in Strapi if needed
      }))
    : [];

  return analystCards;
}

/**
 * Fetch policy data from Strapi
 * This is a Single Type, so it returns one entry with PdfCard array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
/* export async function getPolicy() {
  // Populate TopBanner, PdfCard and pdf media
  return fetchAPI('policy?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[PdfCard][populate][pdf][populate]=*', {
    next: { revalidate: 60 },
  });
} */

/**
 * Map policy data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped policy data for component
 */
export function mapPolicyData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    throw new Error('No data received from Strapi API. Check that the policy endpoint returns data.');
  }

  // Map PdfCard array to component format
  const policies = Array.isArray(data.PdfCard)
    ? data.PdfCard.map((card) => {
        const pdf = card.pdf?.data?.attributes || card.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

        return {
          id: card.id,
          title: card.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card.isActive !== undefined ? card.isActive : false,
          publishedDate: card.publishedDate || null
        };
      })
    : [];

  // Return in component-expected format
  return {
    policies: policies,
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };
}

/**
 * Fetch financial data from Strapi
 * This is a Single Type, so it returns one entry with PdfCard array and TopBanner
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getFinancial() {
  // Populate TopBanner, PdfCard and pdf media
  return fetchAPI('financial?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[PdfCard][populate][pdf][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map financial data from Strapi for Related Party Transactions
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array} Mapped related party transactions cards
 */
export function mapFinancialData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    throw new Error('No data received from Strapi API. Check that the financial endpoint returns data.');
  }

  // Map PdfCard array to component format
  const relatedPartyTransactions = Array.isArray(data.PdfCard)
    ? data.PdfCard.map((card) => {
        const pdf = card.pdf?.data?.attributes || card.pdf;
        const pdfUrl = pdf ? getStrapiMedia(pdf) : null;

        return {
          id: card.id,
          title: card.title || '',
          pdfUrl: pdfUrl || '#',
          isActive: card.isActive !== undefined ? card.isActive : false,
          publishedDate: card.publishedDate || null
        };
      })
    : [];

  return relatedPartyTransactions;
}

/**
 * Map TopBanner component from Strapi to InnerBanner format
 * 
 * @param {Object} topBanner - TopBanner component from Strapi
 * @returns {Object|null} Mapped banner data for InnerBanner component or null
 */
export function mapTopBannerData(topBanner) {
  // Use chaining method with fallbacks - return null if no banner data
  if (!topBanner) return null;

  // Get desktop and mobile images using optional chaining with fallbacks
  // Support both direct structure (DesktopImage) and nested structure (DesktopImage.data.attributes)
  // Also support snake_case (desktop_image) for backward compatibility
  const desktopImage = topBanner?.DesktopImage?.data?.attributes 
    || topBanner?.DesktopImage 
    || topBanner?.desktop_image?.data?.attributes 
    || topBanner?.desktop_image;
    
  const mobileImage = topBanner?.MobileImage?.data?.attributes 
    || topBanner?.MobileImage 
    || topBanner?.mobile_image?.data?.attributes 
    || topBanner?.mobile_image;
  
  // Get URLs for both desktop and mobile images
  const desktopImageUrl = desktopImage ? getStrapiMedia(desktopImage) : null;
  const mobileImageUrl = mobileImage ? getStrapiMedia(mobileImage) : null;
  
  // Use desktop image as primary banner, fallback to mobile if desktop not available
  const bannerImage = desktopImage || mobileImage;
  const bannerImageUrl = desktopImageUrl || mobileImageUrl;

  // Get heading and subheading using optional chaining with fallbacks
  // Support both camelCase (Heading, SubHeading) and legacy fields (BannerTitle, subHeading)
  const heading = topBanner?.Heading || topBanner?.heading || topBanner?.BannerTitle || '';
  const subHeading = topBanner?.SubHeading || topBanner?.subHeading || '';
  
  // Parse heading - could be single line or two lines separated by newline/space
  const titleParts = heading ? heading.split(/\n|\\n/).filter(part => part.trim()) : [];
  
  // Use Heading as line1, SubHeading as line2, or split Heading if SubHeading not available
  const line1 = titleParts[0]?.trim() || subHeading || '';
  const line2 = subHeading || titleParts[1]?.trim() || '';

  // Build banner data object
  const bannerData = {
    title: {
      line1: line1,
      line2: line2
    },
    images: {}
  };

  // Add desktop banner image if available
  if (desktopImageUrl && desktopImage) {
    bannerData.images.banner = {
      url: desktopImageUrl,
      alt: desktopImage?.alternativeText || desktopImage?.caption || 'Banner image'
    };
  }
  
  // Add mobile banner image if available (for responsive display)
  if (mobileImageUrl && mobileImage) {
    bannerData.images.bannerMobile = {
      url: mobileImageUrl,
      alt: mobileImage?.alternativeText || mobileImage?.caption || 'Banner image mobile'
    };
  }
  
  // Fallback: if no desktop but mobile exists, use mobile as banner
  if (!bannerData.images.banner && mobileImageUrl && mobileImage) {
    bannerData.images.banner = {
      url: mobileImageUrl,
      alt: mobileImage?.alternativeText || mobileImage?.caption || 'Banner image'
    };
  }

  // Add petal image (default - can be overridden if needed)
  bannerData.images.petal = {
    url: "/assets/inner-banner/petal-2.svg",
    alt: "Decorative petal"
  };

  return bannerData;
}

/**
 * Fetch about-us data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner and Topfold content
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getAboutUs() {
  // Populate TopBanner, Topfold, and Fold sections content
  return fetchAPI('about-us?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[Topfold][populate]=*&populate[folds][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map about-us topfold data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped topfold data
 */
export function mapAboutUsTopfoldData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const topfold = data.Topfold || data.topfold;
  if (!topfold) {
    return null;
  }

  // Extract heading - can be string or array
  let heading = topfold.heading || topfold.title || '';
  if (typeof heading === 'string') {
    // Split by newlines or common separators
    heading = heading.split(/\n|, | - /).filter(line => line.trim());
  }
  if (!Array.isArray(heading) || heading.length === 0) {
    return null;
  }

  // Extract description/paragraph
  const description = topfold.description || topfold.paragraph || topfold.text || '';

  return {
    heading: heading,
    description: description
  };
}

/**
 * Map about-us folds data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped folds data with text content for each fold
 */
export function mapAboutUsFoldsData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  // Check if folds is an array or object
  const folds = data.folds || data.Folds;
  
  if (!folds) {
    return null;
  }

  // If folds is an array, map each fold
  if (Array.isArray(folds)) {
    return folds.map(fold => ({
      heading: fold.heading || fold.title || 'Our Purpose',
      text: fold.text || fold.content || fold.description || '',
    }));
  }

  // If folds is an object with teal and green properties
  if (folds.teal || folds.green) {
    return {
      teal: {
        heading: folds.teal?.heading || folds.teal?.title || 'Our Purpose',
        text: folds.teal?.text || folds.teal?.content || folds.teal?.description || ''
      },
      green: {
        heading: folds.green?.heading || folds.green?.title || 'Our Purpose',
        text: folds.green?.text || folds.green?.content || folds.green?.description || ''
      }
    };
  }
  
  // If folds is an array of fold objects
  if (Array.isArray(folds) && folds.length > 0) {
    return folds.map((fold, index) => ({
      heading: fold.heading || fold.title || 'Our Purpose',
      text: fold.text || fold.content || fold.description || '',
      index: index
    }));
  }

  // Single fold object
  return {
    heading: folds.heading || folds.title || 'Our Purpose',
    text: folds.text || folds.content || folds.description || ''
  };
}

/**
 * Fetch our-values data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner and ContentSection
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getOurValues() {
  // Populate TopBanner and ContentSection with decoration image
  return fetchAPI('our-values?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[ContentSection][populate][decoration][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map our-values content section data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped content section data
 */
export function mapOurValuesContentData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const contentSection = data.ContentSection || data.contentSection;
  if (!contentSection) {
    return null;
  }

  // Extract heading
  const heading = contentSection.heading || contentSection.title || '';

  // Extract description
  const description = contentSection.description || contentSection.text || contentSection.paragraph || '';

  // Extract decoration image
  const decoration = contentSection.decoration?.data?.attributes || contentSection.decoration;
  const decorationUrl = decoration ? getStrapiMedia(decoration) : null;

  return {
    heading: heading,
    description: description,
    decoration: decorationUrl ? {
      url: decorationUrl,
      alt: decoration.alternativeText || decoration.caption || 'Decorative element',
      width: decoration.width || 1228,
      height: decoration.height || 576
    } : null
  };
}

/**
 * Fetch community data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner and InfoSection
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getCommunity() {
  // Populate TopBanner, InfoSection, LivelihoodSection, LivelihoodTabs, and KeyHighlights with nested data
  return fetchAPI('community?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[InfoSection][populate][image][populate]=*&populate[LivelihoodSection][populate][background_image][populate]=*&populate[LivelihoodTabs][populate][tabs][populate][content][populate][image][populate]=*&populate[KeyHighlights][populate][highlights][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map community info section data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped info section data with paragraphs and image
 */
export function mapCommunityInfoData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const infoSection = data.InfoSection || data.infoSection;
  if (!infoSection) {
    return null;
  }

  // Extract paragraphs - can be array or string
  let paragraphs = infoSection.paragraphs || infoSection.paragraph || [];
  if (typeof paragraphs === 'string') {
    // Split by double newlines or keep as single paragraph
    paragraphs = paragraphs.split(/\n\n+/).filter(p => p.trim());
  }
  if (!Array.isArray(paragraphs)) {
    paragraphs = paragraphs ? [paragraphs] : [];
  }

  // Extract image
  const image = infoSection.image?.data?.attributes || infoSection.image;
  const imageUrl = image ? getStrapiMedia(image) : null;

  return {
    paragraphs: paragraphs,
    image: imageUrl ? {
      url: imageUrl,
      alt: image.alternativeText || image.caption || 'Community Impact',
      width: image.width || 600,
      height: image.height || 600
    } : null
  };
}

/**
 * Map community livelihood section data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped livelihood section data
 */
export function mapLivelihoodSectionData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const livelihoodSection = data.LivelihoodSection || data.livelihoodSection;
  if (!livelihoodSection) {
    return null;
  }

  // Extract heading
  const heading = livelihoodSection.heading || livelihoodSection.title || 'Livelihood Program';

  // Extract subheading
  const subheading = livelihoodSection.subheading || livelihoodSection.subtitle || 'Desh Bandhu Jan Utkarsh Pariyojana';

  // Extract paragraphs - can be array or string
  let paragraphs = livelihoodSection.paragraphs || livelihoodSection.paragraph || [];
  if (typeof paragraphs === 'string') {
    // Split by double newlines or keep as single paragraph
    paragraphs = paragraphs.split(/\n\n+/).filter(p => p.trim());
  }
  if (!Array.isArray(paragraphs)) {
    paragraphs = paragraphs ? [paragraphs] : [];
  }

  // Extract background image
  const bgImage = livelihoodSection.background_image?.data?.attributes || livelihoodSection.background_image;
  const bgImageUrl = bgImage ? getStrapiMedia(bgImage) : null;

  return {
    heading,
    subheading,
    paragraphs,
    backgroundImage: bgImageUrl || '/assets/community/livelihood.png'
  };
}

/**
 * Map community livelihood tabs data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array} Mapped tabs data
 */
export function mapLivelihoodTabsData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const livelihoodTabs = data.LivelihoodTabs || data.livelihoodTabs;
  if (!livelihoodTabs || !livelihoodTabs.tabs || !Array.isArray(livelihoodTabs.tabs)) {
    return null;
  }

  // Map each tab
  const mappedTabs = livelihoodTabs.tabs.map((tab, index) => {
    const tabId = tab.id || index + 1;
    
    // Extract title - handle newlines
    let title = tab.title || tab.name || '';
    if (typeof title === 'string' && title.includes('\n')) {
      // Keep newlines for display
      title = title;
    }

    // Extract content if available
    let content = null;
    if (tab.content) {
      const contentData = tab.content;
      
      // Extract heading
      const heading = contentData.heading || contentData.title || '';
      
      // Extract paragraphs
      let paragraphs = contentData.paragraphs || contentData.paragraph || [];
      if (typeof paragraphs === 'string') {
        paragraphs = paragraphs.split(/\n\n+/).filter(p => p.trim());
      }
      if (!Array.isArray(paragraphs)) {
        paragraphs = paragraphs ? [paragraphs] : [];
      }

      // Extract image
      const image = contentData.image?.data?.attributes || contentData.image;
      const imageUrl = image ? getStrapiMedia(image) : null;

      content = {
        heading: heading,
        paragraphs: paragraphs,
        image: imageUrl ? {
          url: imageUrl,
          alt: image.alternativeText || image.caption || 'Tab Image',
          width: image.width || 600,
          height: image.height || 600
        } : null
      };
    }

    return {
      id: tabId,
      title: title,
      content: content
    };
  });

  return mappedTabs.length > 0 ? mappedTabs : null;
}

/**
 * Map community key highlights data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array} Mapped highlights data
 */
export function mapKeyHighlightsData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return null;
  }

  const keyHighlights = data.KeyHighlights || data.keyHighlights;
  if (!keyHighlights || !keyHighlights.highlights || !Array.isArray(keyHighlights.highlights)) {
    return null;
  }

  // Map each highlight
  const mappedHighlights = keyHighlights.highlights.map((highlight, index) => {
    const highlightId = highlight.id || index + 1;
    
    return {
      id: highlightId,
      number: highlight.number || highlight.metric || '',
      description: highlight.description || highlight.text || ''
    };
  });

  return mappedHighlights.length > 0 ? mappedHighlights : null;
}

/**
 * Fetch leaders page data from Strapi
 * Populates TopBanner with nested data
 */
export async function getLeaders() {
  return fetchAPI('leaders?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Fetch ethics-compliance-governance page data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner, Pledge, and TextContent
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getEthicsComplianceGovernance() {
  return fetchAPI('ethics-compliance-governance?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[Pledge][populate]=*&populate[TextContent][populate]=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map ethics-compliance-governance pledge data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object|null} Mapped pledge data
 */
export function mapEthicsPledgeData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const pledge = data.Pledge || data.pledge;
  if (!pledge) {
    return null;
  }

  return {
    text: pledge.text || pledge.content || ''
  };
}

/**
 * Map ethics-compliance-governance text content data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array|null} Mapped paragraphs array
 */
export function mapEthicsTextContentData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const textContent = data.TextContent || data.textContent;
  if (!textContent) {
    return null;
  }

  // Handle paragraphs - can be array, string with newlines, or single text field
  let paragraphs = [];
  
  if (Array.isArray(textContent.paragraphs)) {
    paragraphs = textContent.paragraphs;
  } else if (textContent.content) {
    // If content is a string, split by double newlines or use as single paragraph
    if (typeof textContent.content === 'string') {
      paragraphs = textContent.content.split(/\n\n+/).filter(p => p.trim());
    } else if (Array.isArray(textContent.content)) {
      paragraphs = textContent.content;
    }
  } else if (textContent.text) {
    paragraphs = textContent.text.split(/\n\n+/).filter(p => p.trim());
  }

  return paragraphs.length > 0 ? paragraphs : null;
}

/**
 * Fetch global-presence page data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner and content sections
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getGlobalPresence() {
  return fetchAPI('global-presence?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[ContentBox][populate][icon][populate]=*&populate[CountrySections][populate][image][populate]=*&populate=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Fetch global-technical-operations page data from Strapi
 * This is a Single Type, so it returns one entry with TopBanner and content sections
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getGlobalTechnicalOperations() {
  return fetchAPI('global-technical-operations?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[GTOTabs][populate][tabs][populate][sections][populate][image][populate]=*&populate[GTOTabs][populate][tabs][populate][sections][populate][link][populate]=*&populate=*', {
    next: { revalidate: 60 },
  });
}

/**
 * Map global-technical-operations tabs data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object|null} Mapped tabs data
 */
export function mapGTOTabsData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const gtoTabs = data.GTOTabs || data.gtoTabs;
  if (!gtoTabs || !gtoTabs.tabs || !Array.isArray(gtoTabs.tabs)) {
    return null;
  }

  // Map each tab
  const mappedTabs = gtoTabs.tabs.map((tab, index) => {
    const tabId = tab.id || tab.slug || `tab-${index + 1}`;
    const tabLabel = tab.label || tab.title || tab.name || '';
    
    // Map sections for this tab
    const sections = Array.isArray(tab.sections) 
      ? tab.sections.map((section, sectionIndex) => {
          // Extract heading
          const heading = section.heading || section.title || '';
          
          // Extract paragraphs - can be array or string
          let paragraphs = section.paragraphs || section.paragraph || section.text || section.description || [];
          if (typeof paragraphs === 'string') {
            // Split by double newlines or single newlines
            paragraphs = paragraphs.split(/\n\n+/).filter(p => p.trim());
            if (paragraphs.length === 0 && section.text) {
              paragraphs = [section.text];
            }
          }
          if (!Array.isArray(paragraphs)) {
            paragraphs = paragraphs ? [paragraphs] : [];
          }
          
          // Extract image
          const image = section.image?.data?.attributes || section.image;
          const imageUrl = image ? getStrapiMedia(image) : null;
          
          // Extract link/CTA
          const link = section.link || section.cta;
          const linkData = link ? {
            text: link.text || link.label || '',
            href: link.href || link.url || '#'
          } : null;
          
          // Extract imageFirst flag (controls layout - image first or text first)
          const imageFirst = section.imageFirst !== undefined ? section.imageFirst : undefined;
          
          return {
            heading,
            paragraphs,
            image: imageUrl ? {
              url: imageUrl,
              alt: image.alternativeText || image.caption || section.imageAlt || '',
              width: image.width,
              height: image.height
            } : null,
            link: linkData,
            imageFirst: imageFirst
          };
        })
      : [];
    
    return {
      id: tabId,
      label: tabLabel,
      dataNodeId: tab.dataNodeId || null,
      sections: sections
    };
  });

  return mappedTabs.length > 0 ? mappedTabs : null;
}

/**
 * Map global-presence content box data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object|null} Mapped content box data
 */
export function mapGlobalPresenceContentBoxData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const contentBox = data.ContentBox || data.contentBox;
  if (!contentBox) {
    return null;
  }

  // Get icon - can be media object or URL string
  let iconUrl = '/assets/images/icon-global-presence.svg'; // default
  if (contentBox.icon) {
    if (typeof contentBox.icon === 'string') {
      iconUrl = contentBox.icon;
    } else if (contentBox.icon.url) {
      iconUrl = getStrapiMedia(contentBox.icon);
    } else if (contentBox.icon.data?.attributes?.url) {
      iconUrl = getStrapiMedia(contentBox.icon.data.attributes);
    }
  }

  return {
    heading: contentBox.heading || contentBox.title || '',
    paragraph: contentBox.paragraph || contentBox.text || contentBox.description || '',
    icon: iconUrl
  };
}

/**
 * Map global-presence country sections data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Array|null} Mapped country sections array
 */
export function mapGlobalPresenceCountrySectionsData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const countrySections = data.CountrySections || data.countrySections || data.countries;
  if (!countrySections || !Array.isArray(countrySections)) {
    return null;
  }

  // Map each country section
  return countrySections.map((country, index) => {
    // Get image - can be media object or URL string
    let imageUrl = '/assets/global-presence/image-usa.png'; // default
    if (country.image) {
      if (typeof country.image === 'string') {
        imageUrl = country.image;
      } else if (country.image.url) {
        imageUrl = getStrapiMedia(country.image);
      } else if (country.image.data?.attributes?.url) {
        imageUrl = getStrapiMedia(country.image.data.attributes);
      }
    }

    return {
      id: country.id || index + 1,
      name: country.name || country.title || country.country || '',
      description: country.description || country.text || country.paragraph || '',
      image: imageUrl,
      imageAlt: country.imageAlt || country.image?.alternativeText || `${country.name || 'Country'} Office`,
      websiteUrl: country.websiteUrl || country.website || country.url || '#',
      ctaText: country.ctaText || country.buttonText || 'Visit Website',
      order: country.order !== undefined ? country.order : index
    };
  }).sort((a, b) => a.order - b.order); // Sort by order field
}

/**
 * Map our-manufacturing-sites intro section data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object|null} Mapped intro section data
 */
export function mapManufacturingIntroData(strapiData) {
  const data = strapiData?.data || strapiData;
  
  if (!data) {
    return null;
  }

  const introSection = data.IntroSection || data.introSection || data.Introduction || data.introduction;
  if (!introSection) {
    return null;
  }

  return {
    text: introSection.text || introSection.description || introSection.content || ''
  };
}

/**
 * Map Strapi Science Intro data to ScienceIntro component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { IntroSection: { headingLine1: "...", headingLine2: "...", description: "..." } }
 * 2. { introSection: { heading: { line1: "...", line2: "..." }, description: "..." } }
 * 3. { Introduction: { headingLine1: "...", headingLine2: "...", text: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted intro data with structure:
 *   { heading: { line1: string, line2: string }, description: string }
 */
export function mapScienceIntroData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const introSection = data.IntroSection || data.introSection || data.Introduction || data.introduction;
  if (!introSection) return null;

  // Handle different heading structures
  let headingLine1 = '';
  let headingLine2 = '';
  
  if (introSection.heading) {
    if (typeof introSection.heading === 'object') {
      headingLine1 = introSection.heading.line1 || introSection.heading.lineOne || '';
      headingLine2 = introSection.heading.line2 || introSection.heading.lineTwo || '';
    } else if (Array.isArray(introSection.heading)) {
      headingLine1 = introSection.heading[0] || '';
      headingLine2 = introSection.heading[1] || '';
    }
  } else {
    headingLine1 = introSection.headingLine1 || introSection.heading_line1 || '';
    headingLine2 = introSection.headingLine2 || introSection.heading_line2 || '';
  }

  const description = introSection.description || introSection.text || introSection.paragraph || '';

  return {
    heading: {
      line1: headingLine1,
      line2: headingLine2
    },
    description: description
  };
}

/**
 * Map Strapi Science Research data to ScienceResearch component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { ResearchSection: { heading: "...", content: ["...", "..."], image: { url: "...", alt: "..." } } }
 * 2. { researchSection: { title: "...", paragraphs: ["...", "..."], image: "..." } }
 * 3. { Research: { heading: "...", text: "...", imageUrl: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted research data with structure:
 *   { heading: string, content: string[], image: { url: string, alt: string } }
 */
export function mapScienceResearchData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const researchSection = data.ResearchSection || data.researchSection || data.Research || data.research;
  if (!researchSection) return null;

  const heading = researchSection.heading || researchSection.title || researchSection.headingLine || '';
  
  let content = [];
  if (researchSection.content && Array.isArray(researchSection.content)) {
    content = researchSection.content;
  } else if (researchSection.paragraphs && Array.isArray(researchSection.paragraphs)) {
    content = researchSection.paragraphs;
  } else if (researchSection.text) {
    // If it's a single string, split by sentences or paragraphs
    content = typeof researchSection.text === 'string' 
      ? researchSection.text.split(/\n\n+/).filter(p => p.trim())
      : [researchSection.text];
  } else if (Array.isArray(researchSection)) {
    content = researchSection;
  }

  const image = researchSection.image || researchSection.imageData;
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || image?.src || researchSection.imageUrl || '';
  const imageAlt = typeof image === 'object' 
    ? (image?.alt || image?.altText || '')
    : '';

  return {
    heading: heading,
    content: content.length > 0 ? content : [],
    image: {
      url: imageUrl,
      alt: imageAlt
    }
  };
}

/**
 * Map Strapi Science Digital data to ScienceDigital component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { DigitalSection: { mainHeading: "...", introParagraph: "...", sectionHeading: { line1: "...", line2: "..." }, description: "...", image: { url: "...", alt: "..." } } }
 * 2. { digitalSection: { heading: "...", intro: "...", title: { line1: "...", line2: "..." }, text: "...", image: "..." } }
 * 3. { Digital: { mainHeading: "...", intro: "...", sectionTitle: "...", description: "...", imageUrl: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted digital data with structure:
 *   { mainHeading: string, introParagraph: string, sectionHeading: { line1: string, line2: string }, description: string, image: { url: string, alt: string } }
 */
export function mapScienceDigitalData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const digitalSection = data.DigitalSection || data.digitalSection || data.Digital || data.digital;
  if (!digitalSection) return null;

  const mainHeading = digitalSection.mainHeading || digitalSection.heading || digitalSection.title || '';
  const introParagraph = digitalSection.introParagraph || digitalSection.intro || digitalSection.introText || '';
  
  let sectionHeading = { line1: '', line2: '' };
  if (digitalSection.sectionHeading) {
    if (typeof digitalSection.sectionHeading === 'object') {
      sectionHeading = {
        line1: digitalSection.sectionHeading.line1 || digitalSection.sectionHeading.lineOne || '',
        line2: digitalSection.sectionHeading.line2 || digitalSection.sectionHeading.lineTwo || ''
      };
    } else if (typeof digitalSection.sectionHeading === 'string') {
      // Try to split by newline or "Our Digital" pattern
      const parts = digitalSection.sectionHeading.split(/\n+/);
      sectionHeading = {
        line1: parts[0] || '',
        line2: parts[1] || ''
      };
    }
  } else if (digitalSection.sectionTitle) {
    const parts = digitalSection.sectionTitle.split(/\n+/);
    sectionHeading = {
      line1: parts[0] || '',
      line2: parts[1] || ''
    };
  }
  
  const description = digitalSection.description || digitalSection.text || digitalSection.content || '';
  
  const image = digitalSection.image || digitalSection.imageData;
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || image?.src || digitalSection.imageUrl || '';
  const imageAlt = typeof image === 'object' 
    ? (image?.alt || image?.altText || '')
    : '';

  return {
    mainHeading: mainHeading,
    introParagraph: introParagraph,
    sectionHeading: sectionHeading,
    description: description,
    image: {
      url: imageUrl,
      alt: imageAlt
    }
  };
}

/**
 * Map Strapi Science Capability data to ScienceCapability component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { CapabilitySection: { text: "..." } }
 * 2. { capabilitySection: { content: "..." } }
 * 3. { Capability: { description: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted capability data with structure:
 *   { text: string }
 */
export function mapScienceCapabilityData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const capabilitySection = data.CapabilitySection || data.capabilitySection || data.Capability || data.capability;
  if (!capabilitySection) return null;

  const text = capabilitySection.text || capabilitySection.content || capabilitySection.description || capabilitySection.paragraph || '';

  return {
    text: text
  };
}

/**
 * Map Strapi Science Architecture data to ScienceArchitecture component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { ArchitectureSection: { content: [...] } }
 * 2. { architectureSection: { paragraphs: [...] } }
 * 3. { Architecture: { text: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted architecture data with structure:
 *   { content: array of strings or objects with text/bold/after }
 */
export function mapScienceArchitectureData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const architectureSection = data.ArchitectureSection || data.architectureSection || data.Architecture || data.architecture;
  if (!architectureSection) return null;

  let content = [];
  if (architectureSection.content && Array.isArray(architectureSection.content)) {
    content = architectureSection.content;
  } else if (architectureSection.paragraphs && Array.isArray(architectureSection.paragraphs)) {
    content = architectureSection.paragraphs;
  } else if (architectureSection.text) {
    // If it's a single string, split by paragraphs
    content = typeof architectureSection.text === 'string' 
      ? architectureSection.text.split(/\n\n+/).filter(p => p.trim())
      : [architectureSection.text];
  } else if (Array.isArray(architectureSection)) {
    content = architectureSection;
  }

  return {
    content: content.length > 0 ? content : []
  };
}

/**
 * Map Strapi Global Generics Intro data to GlobalGenericsIntro component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { IntroSection: { content: [...] } }
 * 2. { introSection: { paragraphs: [...] } }
 * 3. { Intro: { text: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted intro data with structure:
 *   { content: array of strings }
 */
export function mapGlobalGenericsIntroData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const introSection = data.IntroSection || data.introSection || data.Intro || data.intro;
  if (!introSection) return null;

  let content = [];
  if (introSection.content && Array.isArray(introSection.content)) {
    content = introSection.content;
  } else if (introSection.paragraphs && Array.isArray(introSection.paragraphs)) {
    content = introSection.paragraphs;
  } else if (introSection.text) {
    // If it's a single string, split by paragraphs
    content = typeof introSection.text === 'string' 
      ? introSection.text.split(/\n\n+/).filter(p => p.trim())
      : [introSection.text];
  } else if (Array.isArray(introSection)) {
    content = introSection;
  }

  return {
    content: content.length > 0 ? content : []
  };
}

/**
 * Map Strapi Global Generics Section data to GlobalGenericsSection component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { GenericsSection: { heading: "...", content: [...] } }
 * 2. { genericsSection: { title: "...", paragraphs: [...] } }
 * 3. { Section: { heading: "...", text: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted section data with structure:
 *   { heading: string, content: array of strings }
 */
export function mapGlobalGenericsSectionData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const section = data.GenericsSection || data.genericsSection || data.Section || data.section;
  if (!section) return null;

  const heading = section.heading || section.title || section.Heading || '';
  
  let content = [];
  if (section.content && Array.isArray(section.content)) {
    content = section.content;
  } else if (section.paragraphs && Array.isArray(section.paragraphs)) {
    content = section.paragraphs;
  } else if (section.text) {
    // If it's a single string, split by paragraphs
    content = typeof section.text === 'string' 
      ? section.text.split(/\n\n+/).filter(p => p.trim())
      : [section.text];
  } else if (Array.isArray(section)) {
    content = section;
  }

  return {
    heading: heading,
    content: content.length > 0 ? content : []
  };
}

/**
 * Map Strapi Global Generics Portfolio data to GlobalGenericsPortfolio component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { PortfolioSection: { description: "...", link: { text: "...", url: "..." }, image: {...} } }
 * 2. { portfolioSection: { text: "...", linkText: "...", linkUrl: "...", imageUrl: "..." } }
 * 3. { Portfolio: { description: "...", link: "...", image: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted portfolio data with structure:
 *   { description: string, link: { text: string, url: string }, image: { url: string, alt: string } }
 */
export function mapGlobalGenericsPortfolioData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const portfolioSection = data.PortfolioSection || data.portfolioSection || data.Portfolio || data.portfolio;
  if (!portfolioSection) return null;

  const description = portfolioSection.description || portfolioSection.text || portfolioSection.content || '';
  
  const linkText = portfolioSection.link?.text || portfolioSection.linkText || portfolioSection.ctaText || '';
  const linkUrl = portfolioSection.link?.url || portfolioSection.linkUrl || portfolioSection.ctaUrl || '#';

  const image = portfolioSection.image || portfolioSection.imageData;
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || image?.src || portfolioSection.imageUrl || '';
  const imageAlt = typeof image === 'object' 
    ? (image?.alt || image?.altText || '')
    : '';

  return {
    description: description,
    link: {
      text: linkText,
      url: linkUrl
    },
    image: {
      url: imageUrl,
      alt: imageAlt
    }
  };
}

/**
 * Map Strapi Global Generics Complex data to GlobalGenericsComplex component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { ComplexSection: { content: [...], image: {...} } }
 * 2. { complexSection: { paragraphs: [...], imageUrl: "..." } }
 * 3. { Complex: { text: "...", image: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted complex data with structure:
 *   { content: array of strings, image: { url: string, alt: string } }
 */
export function mapGlobalGenericsComplexData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const complexSection = data.ComplexSection || data.complexSection || data.Complex || data.complex;
  if (!complexSection) return null;

  let content = [];
  if (complexSection.content && Array.isArray(complexSection.content)) {
    content = complexSection.content;
  } else if (complexSection.paragraphs && Array.isArray(complexSection.paragraphs)) {
    content = complexSection.paragraphs;
  } else if (complexSection.text) {
    // If it's a single string, split by paragraphs
    content = typeof complexSection.text === 'string' 
      ? complexSection.text.split(/\n\n+/).filter(p => p.trim())
      : [complexSection.text];
  } else if (Array.isArray(complexSection)) {
    content = complexSection;
  }

  const image = complexSection.image || complexSection.imageData;
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || image?.src || complexSection.imageUrl || '';
  const imageAlt = typeof image === 'object' 
    ? (image?.alt || image?.altText || '')
    : '';

  return {
    content: content.length > 0 ? content : [],
    image: {
      url: imageUrl,
      alt: imageAlt
    }
  };
}

/**
 * Map Strapi Global Generics Inhalation data to GlobalGenericsInhalation component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { InhalationSection: { heading: "...", description: "...", link: {...} } }
 * 2. { inhalationSection: { title: "...", text: "...", linkText: "...", linkUrl: "..." } }
 * 3. { Inhalation: { heading: "...", description: "...", link: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted inhalation data with structure:
 *   { heading: string, description: string, link: { text: string, url: string } }
 */
export function mapGlobalGenericsInhalationData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const inhalationSection = data.InhalationSection || data.inhalationSection || data.Inhalation || data.inhalation;
  if (!inhalationSection) return null;

  const heading = inhalationSection.heading || inhalationSection.title || inhalationSection.Heading || '';
  const description = inhalationSection.description || inhalationSection.text || inhalationSection.content || '';
  
  const linkText = inhalationSection.link?.text || inhalationSection.linkText || inhalationSection.ctaText || '';
  const linkUrl = inhalationSection.link?.url || inhalationSection.linkUrl || inhalationSection.ctaUrl || '#';

  return {
    heading: heading,
    description: description,
    link: {
      text: linkText,
      url: linkUrl
    }
  };
}

/**
 * Map Strapi Science Capabilities data to ScienceCapabilities component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { CapabilitiesSection: { capabilities: [{ title: "...", description: "...", icon: "..." }] } }
 * 2. { capabilitiesSection: { items: [{ title: "...", description: "...", icon: "..." }] } }
 * 3. { Capabilities: [{ title: "...", description: "...", icon: "..." }] }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted capabilities data with structure:
 *   { capabilities: [{ title: string, description: string, icon: string }] }
 */
export function mapScienceCapabilitiesData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const capabilitiesSection = data.CapabilitiesSection || data.capabilitiesSection || data.Capabilities || data.capabilities;
  if (!capabilitiesSection) return null;

  let capabilities = [];
  if (capabilitiesSection.capabilities && Array.isArray(capabilitiesSection.capabilities)) {
    capabilities = capabilitiesSection.capabilities;
  } else if (capabilitiesSection.items && Array.isArray(capabilitiesSection.items)) {
    capabilities = capabilitiesSection.items;
  } else if (Array.isArray(capabilitiesSection)) {
    capabilities = capabilitiesSection;
  }

  // Map each capability to ensure proper structure
  const mappedCapabilities = capabilities.map(cap => ({
    title: cap.title || cap.name || cap.heading || '',
    description: cap.description || cap.text || cap.content || '',
    icon: typeof cap.icon === 'string' 
      ? cap.icon 
      : cap.icon?.url || cap.iconUrl || cap.image?.url || cap.image || "/assets/images/our-sci/icon22.svg"
  }));

  return {
    capabilities: mappedCapabilities.length > 0 ? mappedCapabilities : []
  };
}

/**
 * Map Strapi Global Generics Regional Presence data to GlobalGenericsRegionalPresence component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { RegionalPresenceSection: { heading: "...", background: {...}, regions: [...] } }
 * 2. { regionalPresenceSection: { title: "...", backgroundImage: {...}, items: [...] } }
 * 3. { RegionalPresence: { heading: "...", background: {...}, regions: [...] } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted regional presence data with structure:
 *   { heading: string, background: { desktop: string, mobile: string }, regions: [...] }
 */
export function mapGlobalGenericsRegionalPresenceData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const regionalSection = data.RegionalPresenceSection || data.regionalPresenceSection || data.RegionalPresence || data.regionalPresence;
  if (!regionalSection) return null;

  const heading = regionalSection.heading || regionalSection.title || regionalSection.Heading || '';

  // Handle background images
  let backgroundDesktop = '';
  let backgroundMobile = '';
  
  if (regionalSection.background) {
    if (typeof regionalSection.background === 'object') {
      backgroundDesktop = regionalSection.background.desktop || regionalSection.background.url || '';
      backgroundMobile = regionalSection.background.mobile || regionalSection.background.urlMobile || backgroundDesktop;
    } else {
      backgroundDesktop = regionalSection.background;
      backgroundMobile = backgroundDesktop;
    }
  } else if (regionalSection.backgroundImage) {
    if (typeof regionalSection.backgroundImage === 'object') {
      backgroundDesktop = regionalSection.backgroundImage.desktop || regionalSection.backgroundImage.url || '';
      backgroundMobile = regionalSection.backgroundImage.mobile || regionalSection.backgroundImage.urlMobile || backgroundDesktop;
    } else {
      backgroundDesktop = regionalSection.backgroundImage;
      backgroundMobile = backgroundDesktop;
    }
  }

  // Handle regions/items
  let regions = [];
  if (regionalSection.regions && Array.isArray(regionalSection.regions)) {
    regions = regionalSection.regions;
  } else if (regionalSection.items && Array.isArray(regionalSection.items)) {
    regions = regionalSection.items;
  } else if (Array.isArray(regionalSection)) {
    regions = regionalSection;
  }

  // Map each region to ensure proper structure
  const mappedRegions = regions.map(region => ({
    title: region.title || region.name || region.heading || '',
    position: region.position || region.positionType || 'top-left',
    backgroundColor: region.backgroundColor || region.bgColor || region.color || '#08a03f',
    highlights: Array.isArray(region.highlights) 
      ? region.highlights 
      : (region.highlight ? [region.highlight] : []),
    description: region.description || region.text || region.content || ''
  }));

  return {
    heading: heading,
    background: {
      desktop: backgroundDesktop,
      mobile: backgroundMobile
    },
    regions: mappedRegions.length > 0 ? mappedRegions : []
  };
}

/**
 * Map Strapi Branded Emerging Markets Intro data to BrandedEmergingMarketsIntro component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { IntroSection: { content: [...] } }
 * 2. { introSection: { paragraphs: [...] } }
 * 3. { Intro: { content: [...] } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted intro data with structure:
 *   { content: [{ text: string, link?: { text: string, url: string } }] }
 */
export function mapBrandedEmergingMarketsIntroData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const introSection = data.IntroSection || data.introSection || data.Intro || data.intro;
  if (!introSection) return null;

  let content = [];
  if (introSection.content && Array.isArray(introSection.content)) {
    content = introSection.content;
  } else if (introSection.paragraphs && Array.isArray(introSection.paragraphs)) {
    content = introSection.paragraphs;
  } else if (introSection.text) {
    // If it's a single string, split by paragraphs
    content = typeof introSection.text === 'string' 
      ? introSection.text.split(/\n\n+/).filter(p => p.trim())
      : [introSection.text];
  } else if (Array.isArray(introSection)) {
    content = introSection;
  }

  // Map content to ensure proper structure
  const mappedContent = content.map(item => {
    if (typeof item === 'string') {
      return item;
    } else if (typeof item === 'object') {
      return {
        text: item.text || item.content || item.paragraph || '',
        link: item.link || (item.linkText && item.linkUrl ? {
          text: item.linkText,
          url: item.linkUrl
        } : null)
      };
    }
    return item;
  });

  return {
    content: mappedContent.length > 0 ? mappedContent : []
  };
}

/**
 * Map Strapi Branded Emerging Markets Markets data to BrandedEmergingMarketsMarkets component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { MarketsSection: { heading: "...", content: "..." } }
 * 2. { marketsSection: { title: "...", text: "..." } }
 * 3. { Markets: { heading: "...", content: "..." } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted markets data with structure:
 *   { heading: string, content: string }
 */
export function mapBrandedEmergingMarketsMarketsData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const marketsSection = data.MarketsSection || data.marketsSection || data.Markets || data.markets;
  if (!marketsSection) return null;

  const heading = marketsSection.heading || marketsSection.title || marketsSection.Heading || '';
  const content = marketsSection.content || marketsSection.text || marketsSection.paragraph || marketsSection.description || '';

  return {
    heading: heading,
    content: content
  };
}

/**
 * Map Strapi Branded Emerging Markets Items data to BrandedEmergingMarketsItems component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { ItemsSection: { items: [...] } }
 * 2. { itemsSection: { markets: [...] } }
 * 3. { Items: [...] }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted items data with structure:
 *   { items: [{ title: string, content: string[], link: { text: string, url: string }, image: { url: string, alt: string } }] }
 */
export function mapBrandedEmergingMarketsItemsData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const itemsSection = data.ItemsSection || data.itemsSection || data.Items || data.items || data.MarketsItems || data.marketsItems;
  if (!itemsSection) return null;

  let items = [];
  if (itemsSection.items && Array.isArray(itemsSection.items)) {
    items = itemsSection.items;
  } else if (itemsSection.markets && Array.isArray(itemsSection.markets)) {
    items = itemsSection.markets;
  } else if (Array.isArray(itemsSection)) {
    items = itemsSection;
  }

  // Map each item to ensure proper structure
  const mappedItems = items.map(item => ({
    title: item.title || item.name || item.heading || '',
    content: Array.isArray(item.content) 
      ? item.content 
      : (item.text ? [item.text] : (item.description ? [item.description] : [])),
    link: item.link || (item.linkText && item.linkUrl ? {
      text: item.linkText,
      url: item.linkUrl
    } : null),
    image: {
      url: typeof item.image === 'string' 
        ? item.image 
        : item.image?.url || item.imageUrl || "/assets/images/branded/image1.png",
      alt: typeof item.image === 'object' 
        ? (item.image?.alt || item.imageAlt || '')
        : ''
    }
  }));

  return {
    items: mappedItems.length > 0 ? mappedItems : []
  };
}

/**
 * Map Strapi Branded Emerging Markets Footer data to BrandedEmergingMarketsFooter component format
 * 
 * Expected Strapi data structures (any of these will work):
 * 1. { FooterSection: { heading: {...}, content: [...], image: {...} } }
 * 2. { footerSection: { title: {...}, paragraphs: [...], imageUrl: "..." } }
 * 3. { Footer: { heading: {...}, content: [...], image: {...} } }
 * 
 * @param {object} strapiData - Raw Strapi API response
 * @returns {object|null} Formatted footer data with structure:
 *   { heading: { line1: string, line2: string }, content: string[], image: { url: string, alt: string } }
 */
export function mapBrandedEmergingMarketsFooterData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) return null;

  const footerSection = data.FooterSection || data.footerSection || data.Footer || data.footer;
  if (!footerSection) return null;

  // Handle heading
  let heading = { line1: '', line2: '' };
  if (footerSection.heading) {
    if (typeof footerSection.heading === 'object') {
      heading = {
        line1: footerSection.heading.line1 || footerSection.heading.lineOne || '',
        line2: footerSection.heading.line2 || footerSection.heading.lineTwo || ''
      };
    } else if (typeof footerSection.heading === 'string') {
      // Try to split by newline or pattern
      const parts = footerSection.heading.split(/\n+/);
      heading = {
        line1: parts[0] || '',
        line2: parts[1] || ''
      };
    }
  } else if (footerSection.title) {
    const parts = footerSection.title.split(/\n+/);
    heading = {
      line1: parts[0] || '',
      line2: parts[1] || ''
    };
  }

  // Handle content
  let content = [];
  if (footerSection.content && Array.isArray(footerSection.content)) {
    content = footerSection.content;
  } else if (footerSection.paragraphs && Array.isArray(footerSection.paragraphs)) {
    content = footerSection.paragraphs;
  } else if (footerSection.text) {
    content = typeof footerSection.text === 'string' 
      ? footerSection.text.split(/\n\n+/).filter(p => p.trim())
      : [footerSection.text];
  }

  // Handle image
  const image = footerSection.image || footerSection.imageData;
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url || image?.src || footerSection.imageUrl || '';
  const imageAlt = typeof image === 'object' 
    ? (image?.alt || image?.altText || '')
    : '';

  return {
    heading: heading,
    content: content.length > 0 ? content : [],
    image: {
      url: imageUrl,
      alt: imageAlt
    }
  };
}

