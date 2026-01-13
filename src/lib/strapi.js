// strapi.js

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1380";

/**
 * Fetch data from Strapi API
 */
export async function fetchAPI(endpoint, options = {}) {
  // IMPORTANT: Pipeline skip should happen BEFORE any network call
  if (process.env.SKIP_STRAPI_FETCH === "true") {
    console.warn("SKIP_STRAPI_FETCH enabled. Returning null immediately.");
    return null;
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (process.env.STRAPI_API_TOKEN) {
    defaultOptions.headers["Authorization"] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  const requestUrl = `${STRAPI_URL}/api/${endpoint}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.error) {
          errorMessage += ` - ${
            errorData.error.message || JSON.stringify(errorData.error)
          }`;
        }
      } catch (e) {
        errorMessage += ` - ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Just in case SKIP flag was set mid-way
    if (process.env.SKIP_STRAPI_FETCH === "true") {
      return null;
    }

    console.error("Error fetching from Strapi:", error);
    throw error;
  }
}

/**
 * Get full Strapi media URL
 */
export function getStrapiMedia(media) {
  if (!media) return null;

  const imageUrl =
    typeof media === "string"
      ? media
      : media.url || media?.data?.attributes?.url;

  if (!imageUrl) return null;

  if (imageUrl.startsWith("http")) return imageUrl;

  return `${STRAPI_URL}${imageUrl}`;
}

/**
 * Fetch homepage data
 */
export async function getHomepage() {
  return fetchAPI(
    "homepage?populate[hero][populate]=*&populate[ourStory][populate][sectionData][populate]=*&populate[ourPurpose][populate][sectionData][populate]=*&populate[ourPurpose][populate][cards][populate]=*&populate[overView][populate][sectionData][populate]=*&populate[overView][populate][stats][populate]=*&populate[ourBusiness][populate][sectionData][populate]=*&populate[sustainability][populate][sectionData][populate]=*&populate[csr][populate][sectionData][populate]=*&populate[life][populate][sectionData][populate]=*&populate[news][populate][items][populate]=*",
    { next: { revalidate: 60 } }
  );
}

/**
 * SAFE DEFAULTS (so components never crash)
 */
function defaultHero() {
  return {
    heading: [],
    subheading: [],
    cta: { text: "", href: "#" },

    // MUST have at least 2 items because Hero.js uses [0] and [1]
    stickyNotes: [
      { text: "Product Finder", href: "#" },
      { text: "Chat", href: "#" },
    ],

    image: { url: "", alt: "", width: 0, height: 0 },
  };
}


function defaultOurStory() {
  return {
    eyebrow: "",
    heading: [],
    paragraphs: [],
    image: { url: "", alt: "", width: 0, height: 0 },
    cta: { text: "", href: "#" },
  };
}

function defaultOurPurpose() {
  return {
    eyebrow: "",
    heading: [],
    description: [],
    cards: [],
  };
}

function defaultOverview() {
  return {
    eyebrow: "",
    heading: [],
    stats: [],
  };
}

function defaultSectionWithBg() {
  return {
    eyebrow: "",
    heading: [],
    description: [],
    backgroundImage: "",
    imageAlt: "",
    cta: { text: "", href: "#" },
  };
}

function defaultCSR() {
  return {
    eyebrow: "",
    heading: [],
    subheading: "",
    description: [],
    image: "",
    imageAlt: "",
    cta: { text: "", href: "#" },
  };
}

function defaultOurBusiness() {
  return {
    heading: [],
    description: [],
    image: "",
    imageAlt: "",
    cta: { text: "", href: "#" },
  };
}

function defaultNewsInsights() {
  return {
    title: "News & Insights",
    items: [],
  };
}

/**
 * Map Homepage Hero
 */
export function mapHomepageHeroData(strapiData) {
  // If Strapi is skipped/unavailable, return safe structure
  if (!strapiData?.data) return defaultHero();

  const data = strapiData.data;
  const hero = data.hero || {};

  const heading = Array.isArray(hero.heading)
    ? hero.heading.filter(Boolean)
    : typeof hero.heading === "string"
    ? hero.heading.split("\n").filter(Boolean)
    : [];

  const subheading = Array.isArray(hero.subheading)
    ? hero.subheading
    : typeof hero.subheading === "string"
    ? hero.subheading.split("\n").filter(Boolean)
    : [];

  const stickyNotes = Array.isArray(hero.stickyNotes) ? hero.stickyNotes : [];

  const imageObj = hero.image || null;
  const imageUrl = getStrapiMedia(imageObj) || "";

  return {
    heading,
    subheading,
    cta: {
      text: hero.cta?.text || "",
      href: hero.cta?.href || "#",
    },
    stickyNotes,
    image: {
      url: imageUrl,
      alt: imageObj?.alternativeText || imageObj?.caption || "",
      width: imageObj?.width || 0,
      height: imageObj?.height || 0,
    },
  };
}

/**
 * Map OurStory
 */
export function mapHomepageOurStoryData(strapiData) {
  if (!strapiData?.data) return defaultOurStory();

  const data = strapiData.data;
  const sectionData = data.ourStory?.sectionData || {};

  const heading =
    typeof sectionData.heading === "string"
      ? sectionData.heading.split("\n").filter(Boolean)
      : Array.isArray(sectionData.heading)
      ? sectionData.heading
      : [];

  const paragraphs =
    typeof sectionData.paragraphs === "string"
      ? sectionData.paragraphs.split("\n").filter(Boolean)
      : Array.isArray(sectionData.paragraphs)
      ? sectionData.paragraphs
      : [];

  const imageObj = sectionData.image || null;

  return {
    eyebrow: sectionData.eyebrow || "",
    heading,
    paragraphs,
    image: {
      url: getStrapiMedia(imageObj) || "",
      alt: imageObj?.alternativeText || imageObj?.caption || "",
      width: imageObj?.width || 0,
      height: imageObj?.height || 0,
    },
    cta: {
      text: sectionData.cta?.text || "",
      href: sectionData.cta?.href || "#",
    },
  };
}

/**
 * Map OurPurpose
 */
export function mapHomepageOurPurposeData(strapiData) {
  if (!strapiData?.data) return defaultOurPurpose();

  const data = strapiData.data;
  const ourPurpose = data.ourPurpose || {};
  const sectionData = ourPurpose.sectionData || {};

  const heading =
    typeof sectionData.heading === "string"
      ? sectionData.heading.split("\n").filter(Boolean)
      : Array.isArray(sectionData.heading)
      ? sectionData.heading
      : [];

  const description =
    typeof sectionData.paragraphs === "string"
      ? sectionData.paragraphs.split("\n").filter(Boolean)
      : Array.isArray(sectionData.paragraphs)
      ? sectionData.paragraphs
      : [];

  const cards = Array.isArray(ourPurpose.cards) ? ourPurpose.cards : [];

  return {
    eyebrow: sectionData.eyebrow || "",
    heading,
    description,
    cards: cards.map((card, index) => ({
      id: card?.id || index + 1,
      title: card?.title || "",
      description:
        typeof card?.description === "string"
          ? card.description.split("\n").filter(Boolean)
          : Array.isArray(card?.description)
          ? card.description
          : [],
      ctaText: card?.cta?.text || "",
      ctaHref: card?.cta?.href || "#",
    })),
  };
}

/**
 * Map Overview
 */
export function mapHomepageOverviewData(strapiData) {
  if (!strapiData?.data) return defaultOverview();

  const data = strapiData.data;
  const overView = data.overView || {};
  const sectionData = overView.sectionData || {};

  const heading =
    typeof sectionData.heading === "string"
      ? sectionData.heading.split("\n").filter(Boolean)
      : Array.isArray(sectionData.heading)
      ? sectionData.heading
      : [];

  const stats = Array.isArray(overView.stats) ? overView.stats : [];

  return {
    eyebrow: sectionData.eyebrow || "",
    heading,
    stats: stats.map((stat) => ({
      number: (stat?.number || "").toString(),
      suffix: "+",
      label: stat?.label || "",
      cta: {
        text: stat?.cta?.text || "Know More",
        href: stat?.cta?.href || "#",
      },
    })),
  };
}

/**
 * Map OurBusiness
 */
export function mapHomepageOurBusinessData(strapiData) {
  if (!strapiData?.data) return defaultOurBusiness();

  const data = strapiData.data;
  const ourBusiness = data.ourBusiness || {};
  const sectionData = ourBusiness.sectionData || {};
  const imageObj = sectionData.image || null;

  return {
    heading:
      typeof sectionData.heading === "string"
        ? sectionData.heading.split("\n").filter(Boolean)
        : Array.isArray(sectionData.heading)
        ? sectionData.heading
        : [],
    description:
      typeof sectionData.paragraphs === "string"
        ? sectionData.paragraphs.split("\n").filter(Boolean)
        : Array.isArray(sectionData.paragraphs)
        ? sectionData.paragraphs
        : [],
    image: getStrapiMedia(imageObj) || "",
    imageAlt: imageObj?.alternativeText || imageObj?.caption || "",
    cta: {
      text: sectionData.cta?.text || "",
      href: sectionData.cta?.href || "#",
    },
  };
}

/**
 * Map Sustainability
 */
export function mapHomepageSustainabilityData(strapiData) {
  if (!strapiData?.data) return defaultSectionWithBg();

  const data = strapiData.data;
  const sectionData = data.sustainability?.sectionData || {};
  const imageObj = sectionData.image || null;

  return {
    eyebrow: sectionData.eyebrow || "",
    heading:
      typeof sectionData.heading === "string"
        ? sectionData.heading.split("\n").filter(Boolean)
        : Array.isArray(sectionData.heading)
        ? sectionData.heading
        : [],
    description:
      typeof sectionData.paragraphs === "string"
        ? sectionData.paragraphs.split("\n").filter(Boolean)
        : Array.isArray(sectionData.paragraphs)
        ? sectionData.paragraphs
        : [],
    backgroundImage: getStrapiMedia(imageObj) || "",
    imageAlt: imageObj?.alternativeText || imageObj?.caption || "",
    cta: {
      text: sectionData.cta?.text || "",
      href: sectionData.cta?.href || "#",
    },
  };
}

/**
 * Map CSR
 */
export function mapHomepageCSRData(strapiData) {
  if (!strapiData?.data) return defaultCSR();

  const data = strapiData.data;
  const csr = data.csr || {};
  const sectionData = csr.sectionData || {};
  const imageObj = sectionData.image || null;

  return {
    eyebrow: sectionData.eyebrow || "",
    heading:
      typeof sectionData.heading === "string"
        ? sectionData.heading.split("\n").filter(Boolean)
        : Array.isArray(sectionData.heading)
        ? sectionData.heading
        : [],
    subheading: csr.subheading || "",
    description:
      typeof sectionData.paragraphs === "string"
        ? sectionData.paragraphs.split("\n").filter(Boolean)
        : Array.isArray(sectionData.paragraphs)
        ? sectionData.paragraphs
        : [],
    image: getStrapiMedia(imageObj) || "",
    imageAlt: imageObj?.alternativeText || imageObj?.caption || "",
    cta: {
      text: sectionData.cta?.text || "",
      href: sectionData.cta?.href || "#",
    },
  };
}

/**
 * Map Life
 */
export function mapHomepageLifeData(strapiData) {
  if (!strapiData?.data) return defaultSectionWithBg();

  const data = strapiData.data;
  const sectionData = data.life?.sectionData || {};
  const imageObj = sectionData.image || null;

  return {
    eyebrow: sectionData.eyebrow || "",
    heading:
      typeof sectionData.heading === "string"
        ? sectionData.heading.split("\n").filter(Boolean)
        : Array.isArray(sectionData.heading)
        ? sectionData.heading
        : [],
    description:
      typeof sectionData.paragraphs === "string"
        ? sectionData.paragraphs.split("\n").filter(Boolean)
        : Array.isArray(sectionData.paragraphs)
        ? sectionData.paragraphs
        : [],
    backgroundImage: getStrapiMedia(imageObj) || "",
    imageAlt: imageObj?.alternativeText || imageObj?.caption || "",
    cta: {
      text: sectionData.cta?.text || "",
      href: sectionData.cta?.href || "#",
    },
  };
}

/**
 * Map News & Insights
 */
export function mapHomepageNewsInsightsData(strapiData) {
  if (!strapiData?.data) return defaultNewsInsights();

  const data = strapiData.data;
  const news = data.news || {};

  const title = news.title || news.titile || "News & Insights";
  const items = Array.isArray(news.items) ? news.items : [];

  return {
    title,
    items: items.map((item, index) => ({
      id: item?.id || index,
      date: item?.date || "",
      headline: item?.headline || "",
      image: {
        url: getStrapiMedia(item?.circleInner) || "",
        width: item?.circleInner?.width || 0,
        height: item?.circleInner?.height || 0,
        alt: item?.circleInner?.alternativeText || "",
      },
      href: item?.cta?.href || "#",
    })),
  };
}

/**
 * Articles
 */
export async function getArticles() {
  return fetchAPI("articles?populate=*", { next: { revalidate: 60 } });
}

export async function getArticle(slug) {
  const articles = await fetchAPI(
    `articles?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 60 } }
  );

  return articles?.data?.[0] || null;
}

/**
 * Global settings
 */
export async function getGlobalSettings() {
  return fetchAPI("global?populate=deep", { next: { revalidate: 3600 } });
}
