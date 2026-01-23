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

