// Strapi API helper functions for Page-level endpoints
// This file contains API functions for individual pages (about-us, etc.)

import { fetchAPI, getStrapiMedia, mapTopBannerData } from './strapi';

/**
 * Fetch about-us data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - TopBanner (Component - InnerBanner)
 *   - DesktopImage, MobileImage, Heading, SubHeading, SubHeadingText
 * - PageIntroSection (Component - IntroSection)
 *   - Heading (Rich text), Image, Description (Rich text)
 * - AboutOverviewSection (Repeatable Component - AboutOverviewCard)
 *   - Title, Image, Icon, Description (Rich text), cta, Image_Position, isActive
 * - RedirectSection (Component - RedirectCard)
 *   - cta (Component - CTA with text, href)
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getAboutUs() {
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[PageIntroSection][populate][Image][populate]=*',
    'populate[AboutOverviewSection][populate][Image][populate]=*',
    'populate[AboutOverviewSection][populate][Icon][populate]=*',
    'populate[AboutOverviewSection][populate][cta][populate]=*',
    'populate[RedirectSection][populate][cta][populate]=*'
  ].join('&');
  
  return fetchAPI(`about-us?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map about-us data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped about-us data for component
 */
export function mapAboutUsData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return {
      banner: null,
      pageIntro: null,
      overviewSections: [],
      redirectSection: null
    };
  }

  // Map TopBanner
  const topBanner = data?.TopBanner || data?.topBanner;
  const banner = topBanner ? mapTopBannerData(topBanner) : null;

  // Map PageIntroSection
  const pageIntroSection = data?.PageIntroSection || data?.pageIntroSection;
  let pageIntro = null;
  if (pageIntroSection) {
    const introImage = pageIntroSection?.Image?.data?.attributes || pageIntroSection?.Image || pageIntroSection?.image?.data?.attributes || pageIntroSection?.image;
    const imageUrl = introImage ? getStrapiMedia(introImage) : null;

    pageIntro = {
      heading: pageIntroSection?.Heading || pageIntroSection?.heading || '',
      description: pageIntroSection?.Description || pageIntroSection?.description || '',
      image: imageUrl ? {
        url: imageUrl,
        alt: introImage?.alternativeText || introImage?.caption || 'About Us'
      } : null
    };
  }

  // Map AboutOverviewSection (Repeatable Component)
  const overviewSectionsArray = data?.AboutOverviewSection || data?.aboutOverviewSection || [];
  const overviewSections = overviewSectionsArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => {
      const sectionImage = section?.Image?.data?.attributes || section?.Image || section?.image?.data?.attributes || section?.image;
      const imageUrl = sectionImage ? getStrapiMedia(sectionImage) : null;

      const sectionIcon = section?.Icon?.data?.attributes || section?.Icon || section?.icon?.data?.attributes || section?.icon;
      const iconUrl = sectionIcon ? getStrapiMedia(sectionIcon) : null;

      const cta = section?.cta || section?.CTA;
      const ctaData = cta ? {
        text: cta?.text || '',
        href: cta?.href || '#'
      } : null;

      const imagePosition = section?.Image_Position || section?.image_Position || section?.imagePosition || 'right';

      return {
        id: section?.id || index + 1,
        title: section?.Title || section?.title || '',
        description: section?.Description || section?.description || '',
        image: imageUrl ? {
          url: imageUrl,
          alt: sectionImage?.alternativeText || sectionImage?.caption || section?.Title || section?.title || 'About Us'
        } : null,
        icon: iconUrl ? {
          url: iconUrl,
          alt: sectionIcon?.alternativeText || sectionIcon?.caption || 'Icon'
        } : null,
        cta: ctaData,
        imagePosition: imagePosition.toLowerCase(), // 'left' or 'right'
        displayOrder: section?.DisplayOrder || section?.displayOrder || String(index + 1)
      };
    })
    .sort((a, b) => {
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderA.localeCompare(orderB);
    });

  // Map RedirectSection
  const redirectSection = data?.RedirectSection || data?.redirectSection;
  let redirectData = null;
  if (redirectSection) {
    const redirectCta = redirectSection?.cta || redirectSection?.CTA;
    if (redirectCta) {
      redirectData = {
        text: redirectCta?.text || 'View All',
        href: redirectCta?.href || '#'
      };
    }
  }

  return {
    banner: banner,
    pageIntro: pageIntro,
    overviewSections: overviewSections,
    redirectSection: redirectData
  };
}

/**
 * Fetch ethics-and-compliance data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - TopBanner (Component - InnerBanner)
 *   - DesktopImage, MobileImage, Heading, SubHeading, SubHeadingText
 * - PageIntroSection (Component - IntroSection)
 *   - SectionTitle, IntroDetail (Rich text Markdown), DetailDescription (Rich text Markdown)
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getEthicsAndCompliance() {
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[PageIntroSection][populate]=*'
  ].join('&');
  
  return fetchAPI(`ethics-and-compliance?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map ethics-and-compliance data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped ethics and compliance data for component
 */
export function mapEthicsAndComplianceData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return {
      banner: null,
      pageIntro: null
    };
  }

  // Map TopBanner
  const topBanner = data?.TopBanner || data?.topBanner;
  const banner = topBanner ? mapTopBannerData(topBanner) : null;

  // Map PageIntroSection
  const pageIntroSection = data?.PageIntroSection || data?.pageIntroSection;
  let pageIntro = null;
  if (pageIntroSection) {
    pageIntro = {
      sectionTitle: pageIntroSection?.SectionTitle || pageIntroSection?.sectionTitle || '',
      introDetail: pageIntroSection?.IntroDetail || pageIntroSection?.introDetail || '',
      detailDescription: pageIntroSection?.DetailDescription || pageIntroSection?.detailDescription || ''
    };
  }

  return {
    banner: banner,
    pageIntro: pageIntro
  };
}

/**
 * Fetch our-value data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - TopBanner (Component - InnerBanner)
 *   - DesktopImage, MobileImage, Heading, SubHeading, SubHeadingText
 * - OurValueIntroSection (Component - IntroOurValue)
 *   - Heading, DetailDescription (Rich text Markdown)
 * - ValuesOverviewSection (Repeatable Component - CoreValueCard)
 *   - Heading, Description (Rich text Markdown), Image, isActive
 * - CulturePrinciplesVideoSection (Component - CulturePrinciples)
 *   - SectionTitle, DesktopPosterImage, MobilePosterImage, YoutubeLink
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getOurValue() {
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[OurValueIntroSection][populate]=*',
    'populate[ValuesOverviewSection][populate][Image][populate]=*',
    'populate[CulturePrinciplesVideoSection][populate][DesktopPosterImage][populate]=*',
    'populate[CulturePrinciplesVideoSection][populate][MobilePosterImage][populate]=*'
  ].join('&');
  
  return fetchAPI(`our-value?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map our-value data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped our-value data for component
 */
export function mapOurValueData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return {
      banner: null,
      introSection: null,
      valuesOverview: [],
      videoSection: null
    };
  }

  // Map TopBanner
  const topBanner = data?.TopBanner || data?.topBanner;
  const banner = topBanner ? mapTopBannerData(topBanner) : null;

  // Map OurValueIntroSection
  const introSection = data?.OurValueIntroSection || data?.ourValueIntroSection;
  let introData = null;
  if (introSection) {
    introData = {
      heading: introSection?.Heading || introSection?.heading || '',
      detailDescription: introSection?.DetailDescription || introSection?.detailDescription || ''
    };
  }

  // Map ValuesOverviewSection (Repeatable Component)
  const valuesOverviewArray = data?.ValuesOverviewSection || data?.valuesOverviewSection || [];
  const valuesOverview = valuesOverviewArray
    .filter(value => value?.isActive !== false)
    .map((value, index) => {
      const valueImage = value?.Image?.data?.attributes || value?.Image || value?.image?.data?.attributes || value?.image;
      const imageUrl = valueImage ? getStrapiMedia(valueImage) : null;

      return {
        id: value?.id || index + 1,
        heading: value?.Heading || value?.heading || '',
        description: value?.Description || value?.description || '', // Markdown
        image: imageUrl ? {
          url: imageUrl,
          alt: valueImage?.alternativeText || valueImage?.caption || value?.Heading || value?.heading || 'Value'
        } : null,
        isActive: value?.isActive !== false
      };
    });

  // Map CulturePrinciplesVideoSection
  const videoSection = data?.CulturePrinciplesVideoSection || data?.culturePrinciplesVideoSection;
  let videoData = null;
  if (videoSection) {
    const desktopPoster = videoSection?.DesktopPosterImage?.data?.attributes || videoSection?.DesktopPosterImage || videoSection?.desktopPosterImage?.data?.attributes || videoSection?.desktopPosterImage;
    const desktopPosterUrl = desktopPoster ? getStrapiMedia(desktopPoster) : null;

    const mobilePoster = videoSection?.MobilePosterImage?.data?.attributes || videoSection?.MobilePosterImage || videoSection?.mobilePosterImage?.data?.attributes || videoSection?.mobilePosterImage;
    const mobilePosterUrl = mobilePoster ? getStrapiMedia(mobilePoster) : null;

    videoData = {
      sectionTitle: videoSection?.SectionTitle || videoSection?.sectionTitle || '',
      desktopPosterImage: desktopPosterUrl ? {
        url: desktopPosterUrl,
        alt: desktopPoster?.alternativeText || desktopPoster?.caption || 'Video poster'
      } : null,
      mobilePosterImage: mobilePosterUrl ? {
        url: mobilePosterUrl,
        alt: mobilePoster?.alternativeText || mobilePoster?.caption || 'Video poster'
      } : null,
      youtubeLink: videoSection?.YoutubeLink || videoSection?.youtubeLink || ''
    };
  }

  return {
    banner: banner,
    introSection: introData,
    valuesOverview: valuesOverview,
    videoSection: videoData
  };
}

