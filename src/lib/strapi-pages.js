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

/**
 * Fetch global-presence data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - PageIntroSection (Component - IntroSection)
 *   - Heading, IntroDescription (Rich text Markdown)
 * - GlobalPresenceSection (Repeatable Component - PresenceCard)
 *   - CountryName, Description (Rich text Markdown), Image, ImagePosition, cta, isActive, DisplayOrder
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getGlobalPresence() {
  const populateQuery = [
    'populate[PageIntroSection][populate]=*',
    'populate[GlobalPresenceSection][populate][Image][populate]=*',
    'populate[GlobalPresenceSection][populate][cta][populate]=*'
  ].join('&');
  
  return fetchAPI(`global-presence?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map global-presence data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped global-presence data for component
 */
export function mapGlobalPresenceData(strapiData) {
  // Handle Strapi v4 response structure (Single Type)
  const data = strapiData?.data || strapiData;

  if (!data) {
    return {
      pageIntro: null,
      globalPresenceSections: []
    };
  }

  // Map PageIntroSection
  const pageIntroSection = data?.PageIntroSection || data?.pageIntroSection;
  let pageIntro = null;
  if (pageIntroSection) {
    pageIntro = {
      heading: pageIntroSection?.Heading || pageIntroSection?.heading || '',
      introDescription: pageIntroSection?.IntroDescription || pageIntroSection?.introDescription || ''
    };
  }

  // Map GlobalPresenceSection (Repeatable Component)
  const globalPresenceArray = data?.GlobalPresenceSection || data?.globalPresenceSection || [];
  const globalPresenceSections = globalPresenceArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => {
      const sectionImage = section?.Image?.data?.attributes || section?.Image || section?.image?.data?.attributes || section?.image;
      const imageUrl = sectionImage ? getStrapiMedia(sectionImage) : null;

      const cta = section?.cta || section?.CTA;
      const ctaData = cta ? {
        text: cta?.text || '',
        href: cta?.href || '#'
      } : null;

      const imagePosition = section?.ImagePosition || section?.imagePosition || 'left';

      return {
        id: section?.id || index + 1,
        countryName: section?.CountryName || section?.countryName || '',
        description: section?.Description || section?.description || '', // Markdown
        image: imageUrl ? {
          url: imageUrl,
          alt: sectionImage?.alternativeText || sectionImage?.caption || section?.CountryName || section?.countryName || 'Country'
        } : null,
        imagePosition: imagePosition.toLowerCase(), // 'left' or 'right'
        cta: ctaData,
        isActive: section?.isActive !== false,
        displayOrder: section?.DisplayOrder || section?.displayOrder || String(index + 1)
      };
    })
    .sort((a, b) => {
      const orderA = a.displayOrder || '999';
      const orderB = b.displayOrder || '999';
      return orderA.localeCompare(orderB);
    });

  return {
    pageIntro: pageIntro,
    globalPresenceSections: globalPresenceSections
  };
}

/**
 * Fetch our-purpose data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - TopBanner (Component - InnerBanner)
 *   - DesktopImage, MobileImage, Heading, SubHeading, SubHeadingText
 * - PageIntroSection (Component - IntroCard)
 *   - SectionTitle, Heading (Rich text Markdown), ParagraphDescription (Rich text Markdown), image, YoutubeLink
 * - TreatmentSection (Component - TreatmentCard)
 *   - Heading (Rich text Markdown), ParaGraphDescription (Rich text Markdown), image (GlobalImage with DesktopImage, MobileImage)
 * - CommitmentSection (Component - Commitments)
 *   - SectionTitle (Rich text Markdown), CommitmentCard (repeatable ImageTextCards)
 *     - TitleLine1, TitleLine2, Description (Rich text Markdown), Image, isActive, DisplayOrder
 * - GuidedFrameWorkSection (Component - GuidedFrameWork)
 *   - SectionTitle (Rich text Markdown), FrameWorkCard (repeatable ImageTextCards)
 *     - TitleLine1, TitleLine2, Description (Rich text Markdown), Image, isActive, DisplayOrder
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getOurPurpose() {
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[PageIntroSection][populate][image][populate]=*',
    'populate[TreatmentSection][populate][image][populate][DesktopImage][populate]=*',
    'populate[TreatmentSection][populate][image][populate][MobileImage][populate]=*',
    'populate[CommitmentSection][populate][CommitmentCard][populate][Image][populate]=*',
    'populate[GuidedFrameWorkSection][populate][FrameWorkCard][populate][Image][populate]=*'
  ].join('&');
  
  return fetchAPI(`our-purpose?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map our-purpose data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped our-purpose data for component
 */
export function mapOurPurposeData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) {
    return {
      banner: null,
      pageIntro: null,
      treatmentSection: null,
      commitmentSection: null,
      guidedFrameworkSection: null
    };
  }

  // Map TopBanner
  const topBanner = data?.TopBanner;
  const banner = topBanner ? mapTopBannerData(topBanner) : null;

  // Map PageIntroSection
  const pageIntroSection = data?.PageIntroSection;
  let pageIntro = null;
  if (pageIntroSection) {
    const introImage = pageIntroSection?.image;
    const imageUrl = introImage ? getStrapiMedia(introImage) : null;

    pageIntro = {
      sectionTitle: pageIntroSection?.SectionTitle || pageIntroSection?.Heading || '',
      heading: pageIntroSection?.Heading || '',
      paragraphDescription: pageIntroSection?.ParagraphDescription || '',
      image: imageUrl ? {
        url: imageUrl,
        alt: introImage?.alternativeText || introImage?.caption || 'Purpose intro'
      } : null,
      youtubeLink: pageIntroSection?.YoutubeLink || ''
    };
  }

  // Map TreatmentSection
  const treatmentSection = data?.TreatmentSection;
  let treatmentData = null;
  if (treatmentSection) {
    const treatmentImage = treatmentSection?.image;
    let desktopImage = null;
    let mobileImage = null;
    
    if (treatmentImage) {
      const desktopImg = treatmentImage?.DesktopImage;
      const mobileImg = treatmentImage?.MobileImage;
      
      desktopImage = desktopImg ? {
        url: getStrapiMedia(desktopImg),
        alt: desktopImg?.alternativeText || desktopImg?.caption || 'Treatment desktop'
      } : null;
      
      mobileImage = mobileImg ? {
        url: getStrapiMedia(mobileImg),
        alt: mobileImg?.alternativeText || mobileImg?.caption || 'Treatment mobile'
      } : null;
    }

    treatmentData = {
      heading: treatmentSection?.Heading || '',
      paragraphDescription: treatmentSection?.ParaGraphDescription || '',
      desktopImage: desktopImage,
      mobileImage: mobileImage
    };
  }

  // Map CommitmentSection
  const commitmentSection = data?.CommitmentSection;
  let commitmentData = null;
  if (commitmentSection) {
    const commitmentCardsArray = commitmentSection?.CommitmentCard || [];
    const commitmentCards = commitmentCardsArray
      .filter(card => card?.isActive !== false)
      .map((card, index) => {
        const cardImage = card?.Image;
        const imageUrl = cardImage ? getStrapiMedia(cardImage) : null;

        return {
          id: card?.id || index + 1,
          titleLine1: card?.TitleLine1 || '',
          titleLine2: card?.TitleLine2 || '',
          description: card?.Description || '',
          image: imageUrl ? {
            url: imageUrl,
            alt: cardImage?.alternativeText || cardImage?.caption || `${card?.TitleLine1} ${card?.TitleLine2}` || 'Commitment'
          } : null,
          isActive: card?.isActive !== false,
          displayOrder: card?.DisplayOrder || String(index + 1)
        };
      })
      .sort((a, b) => {
        const orderA = a.displayOrder || '999';
        const orderB = b.displayOrder || '999';
        return orderA.localeCompare(orderB);
      });

    commitmentData = {
      sectionTitle: commitmentSection?.SectionTitle || '',
      cards: commitmentCards
    };
  }

  // Map GuidedFrameWorkSection
  const guidedFrameworkSection = data?.GuidedFrameWorkSection;
  let frameworkData = null;
  if (guidedFrameworkSection) {
    const frameworkCardsArray = guidedFrameworkSection?.FrameWorkCard || [];
    const frameworkCards = frameworkCardsArray
      .filter(card => card?.isActive !== false)
      .map((card, index) => {
        const cardImage = card?.Image;
        const imageUrl = cardImage ? getStrapiMedia(cardImage) : null;

        return {
          id: card?.id || index + 1,
          titleLine1: card?.TitleLine1 || '',
          titleLine2: card?.TitleLine2 || '',
          description: card?.Description || '',
          image: imageUrl ? {
            url: imageUrl,
            alt: cardImage?.alternativeText || cardImage?.caption || `${card?.TitleLine1} ${card?.TitleLine2}` || 'Framework'
          } : null,
          isActive: card?.isActive !== false,
          displayOrder: card?.DisplayOrder || String(index + 1)
        };
      })
      .sort((a, b) => {
        const orderA = a.displayOrder || '999';
        const orderB = b.displayOrder || '999';
        return orderA.localeCompare(orderB);
      });

    frameworkData = {
      sectionTitle: (guidedFrameworkSection?.SectionTitle || '').trim(),
      cards: frameworkCards
    };
  }

  return {
    banner: banner,
    pageIntro: pageIntro,
    treatmentSection: treatmentData,
    commitmentSection: commitmentData,
    guidedFrameworkSection: frameworkData
  };
}

/**
 * Fetch contact-us data from Strapi
 * This is a Single Type, so it returns one entry
 * 
 * Structure:
 * - TopBanner (Component - InnerBanner)
 *   - DesktopImage, MobileImage, Heading, SubHeading, SubHeadingText
 * - ContactInfoSection (Component - ContactDetailCard)
 *   - Heading, SubHeading, ContactCard (repeatable ContactInfoCard)
 *     - Title, Email, isActive
 * - GlobalPresenceSection (Repeatable Component - CountrySelectorCard)
 *   - CountryName, Image, AddressDetail (Rich text Markdown), isActive
 * 
 * @returns {Promise<Object>} Raw Strapi API response
 */
export async function getContactUs() {
  const populateQuery = [
    'populate[TopBanner][populate][DesktopImage][populate]=*',
    'populate[TopBanner][populate][MobileImage][populate]=*',
    'populate[ContactInfoSection][populate][ContactCard][populate]=*',
    'populate[GlobalPresenceSection][populate][Image][populate]=*'
  ].join('&');
  
  return fetchAPI(`contact-us?${populateQuery}`, {
    next: { revalidate: 60 },
  });
}

/**
 * Map contact-us data from Strapi
 * 
 * @param {Object} strapiData - Raw Strapi API response
 * @returns {Object} Mapped contact-us data for component
 */
export function mapContactUsData(strapiData) {
  const data = strapiData?.data || strapiData;
  if (!data) {
    return {
      banner: null,
      contactInfoSection: null,
      globalPresenceSection: []
    };
  }

  // Map TopBanner
  const topBanner = data?.TopBanner;
  const banner = topBanner ? mapTopBannerData(topBanner) : null;

  // Map ContactInfoSection
  const contactInfoSection = data?.ContactInfoSection;
  let contactInfoData = null;
  if (contactInfoSection) {
    const contactCardsArray = contactInfoSection?.ContactCard || [];
    const contacts = contactCardsArray
      .filter(card => card?.isActive !== false)
      .map((card) => ({
        title: card?.Title || '',
        email: card?.Email || ''
      }));

    contactInfoData = {
      heading: contactInfoSection?.Heading || '',
      subheading: contactInfoSection?.SubHeading || '',
      contacts: contacts
    };
  }

  // Map GlobalPresenceSection
  const globalPresenceSectionsArray = data?.GlobalPresenceSection || [];
  const locations = globalPresenceSectionsArray
    .filter(section => section?.isActive !== false)
    .map((section, index) => {
      const sectionImage = section?.Image;
      const imageUrl = sectionImage ? getStrapiMedia(sectionImage) : null;
      const countryName = section?.CountryName || '';
      
      // Convert markdown AddressDetail to addresses array
      // For now, we'll pass the markdown and let the component handle it
      const addressDetail = section?.AddressDetail || '';

      return {
        id: section?.id || `location-${index}`,
        name: countryName.toUpperCase(),
        label: countryName,
        image: imageUrl || '/assets/images/contact/india.png',
        addressDetail: addressDetail // Markdown content
      };
    });

  return {
    banner: banner,
    contactInfoSection: contactInfoData,
    globalPresenceSection: locations
  };
}

