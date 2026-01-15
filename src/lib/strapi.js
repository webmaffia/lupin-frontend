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
export async function getPolicy() {
  // Populate TopBanner, PdfCard and pdf media
  return fetchAPI('policy?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[PdfCard][populate][pdf][populate]=*', {
    next: { revalidate: 60 },
  });
}

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
  if (!topBanner) return null;

  // Get desktop and mobile images
  const desktopImage = topBanner.desktop_image?.data?.attributes || topBanner.desktop_image;
  const mobileImage = topBanner.mobile_image?.data?.attributes || topBanner.mobile_image;
  
  // Use desktop image as banner, fallback to mobile if desktop not available
  const bannerImage = desktopImage || mobileImage;
  const bannerImageUrl = bannerImage ? getStrapiMedia(bannerImage) : null;

  // Parse BannerTitle - could be single line or two lines separated by newline/space
  const bannerTitle = topBanner.BannerTitle || '';
  const titleParts = bannerTitle.split(/\n|\\n/).filter(part => part.trim());
  
  // If subHeading exists, use it as line2, otherwise split BannerTitle
  const line1 = titleParts[0]?.trim() || topBanner.subHeading || '';
  const line2 = topBanner.subheadingtext || titleParts[1]?.trim() || '';

  // Build banner data object
  const bannerData = {
    title: {
      line1: line1,
      line2: line2
    },
    images: {}
  };

  // Add banner image if available
  if (bannerImageUrl) {
    bannerData.images.banner = {
      url: bannerImageUrl,
      alt: bannerImage.alternativeText || bannerImage.caption || 'Banner image'
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
  // Populate TopBanner and InfoSection with image
  return fetchAPI('community?populate[TopBanner][populate][desktop_image][populate]=*&populate[TopBanner][populate][mobile_image][populate]=*&populate[InfoSection][populate][image][populate]=*', {
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

