import InnerBanner from '@/components/InnerBanner';
import GlobalGenericsIntro from '@/components/GlobalGenericsIntro';
import GlobalGenericsSection from '@/components/GlobalGenericsSection';
import GlobalGenericsPortfolio from '@/components/GlobalGenericsPortfolio';
import GlobalGenericsComplex from '@/components/GlobalGenericsComplex';
import GlobalGenericsInhalation from '@/components/GlobalGenericsInhalation';
import GlobalGenericsRegionalPresence from '@/components/GlobalGenericsRegionalPresence';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapTopBannerData, mapGlobalGenericsIntroData, mapGlobalGenericsSectionData, mapGlobalGenericsPortfolioData, mapGlobalGenericsComplexData, mapGlobalGenericsInhalationData, mapGlobalGenericsRegionalPresenceData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/global-generics.scss';

// Generate metadata for the Global Generics page
export const metadata = generateSEOMetadata({
  title: "Global Generics - Lupin | Pharmaceutical Solutions",
  description: "Discover Lupin's global generics portfolio, delivering affordable and accessible pharmaceutical solutions worldwide.",
  canonicalUrl: "https://www.lupin.com/our-business/global-generics",
  keywords: "Lupin generics, global generics, pharmaceutical generics, generic medicines, Lupin pharmaceuticals",
});

export default async function GlobalGenericsPage() {
  // Fetch data from Strapi
  let bannerData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }
  } catch (error) {
    console.error('Error fetching global-generics data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Global",
        line2: "Generics"
      },
      subheading: {
        enabled: false,
        text: ""
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Global Generics - Lupin"
        },
        bannerMobile: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Global Generics - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Fetch intro data from Strapi
  let introData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    introData = mapGlobalGenericsIntroData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics intro data from Strapi:', error);
  }

  // Default intro data if Strapi data is not available
  if (!introData) {
    introData = {
      content: [
        "The global generics market is a critical pillar of modern healthcare, enabling greater access to high-quality, affordable medication to patients across major markets globally.",
        "A study by IQVIA projects that by 2029, about $220 billion in branded drug sales will lose exclusivity, creating substantial opportunities for the generic segment. This wave of patent expiries is driving increased demand for affordable, high-quality generics across key markets. Lupin has leveraged this opportunity and is positioned as a leading player in global generics."
      ]
    };
  }

  // Fetch section data from Strapi
  let sectionData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    sectionData = mapGlobalGenericsSectionData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics section data from Strapi:', error);
  }

  // Default section data if Strapi data is not available
  if (!sectionData) {
    sectionData = {
      heading: "Generics and Complex Generics",
      content: [
        "Lupin's generics business is built on scale, regulatory strength, and a diversified portfolio across high-burden therapeutic areas. In developed markets, generics continue to be the primary driver of affordability, access, and healthcare sustainability, particularly as populations age and chronic disease prevalence rises.",
        "In the U.S., we continue to be the 3rd largest generics company by filled prescriptions, with a 4.9% market share. Lupin markets a broad portfolio, with 50 products ranking number one and 105 products ranking among the top three in their respective categories."
      ]
    };
  }

  // Fetch portfolio data from Strapi
  let portfolioData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    portfolioData = mapGlobalGenericsPortfolioData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics portfolio data from Strapi:', error);
  }

  // Default portfolio data if Strapi data is not available
  if (!portfolioData) {
    portfolioData = {
      description: "By leveraging a robust portfolio spanning therapy areas such as anti-diabetes, cardiovascular, respiratory, anti-infectives, anti-TB, and more, Lupin has become a partner of choice and reaches over 60 million lives annually, a considerable portion of the American population. Across other developed markets, including Europe, Canada, and Australia, Lupin's generics business continues to scale through differentiated portfolios and strong local execution. Together, these markets account for approximately 11% of Lupin's global revenues.",
      link: {
        text: "View our Generics Portfolio",
        url: "#"
      },
      image: {
        url: "/assets/images/global-generic/Firefly_Gemini Flash_Premium healthcare scene showing a doctor consulting a patient in a calm clinical env 288275 1.png",
        alt: "Doctor consulting a patient"
      }
    };
  }

  // Fetch complex data from Strapi
  let complexData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    complexData = mapGlobalGenericsComplexData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics complex data from Strapi:', error);
  }

  // Default complex data if Strapi data is not available
  if (!complexData) {
    complexData = {
      content: [
        "Within the generics business, Lupin has centered its strategic growth on Complex Generics, that are generics with multi-faceted dynamic constituents, formulations or path of administration, particularly in the inhalation and injectable space. In the U.S. alone, complex generics now account for 35% of our revenues and are projected to reach 49% by FY30, supported by a robust pipeline.",
        "As per a study the global inhalation market is projected to reach about USD 49.09 billion by 2030, and another study claims that the injectables market is projected to reach around US $401.8 billion by 2035. Lupin has established a strong foothold in both inhalation and injectable segments, leveraging its differentiated capabilities and robust pipeline to drive growth."
      ],
      image: {
        url: "/assets/images/global-generic/Firefly_Gemini Flash_Premium pharmaceutical visual showing advanced inhalation devices and injectable vial 159471 1.png",
        alt: "Pharmaceutical visual showing advanced inhalation devices and injectable vial"
      }
    };
  }

  // Fetch inhalation data from Strapi
  let inhalationData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    inhalationData = mapGlobalGenericsInhalationData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics inhalation data from Strapi:', error);
  }

  // Default inhalation data if Strapi data is not available
  if (!inhalationData) {
    inhalationData = {
      heading: "Our Inhalation Business",
      description: "Research shows that in 2024, the inhalation and nasal spray generic drugs market in North America was valued at around USD 4.8 billion, capturing about 38% of global market share led by the U.S., while Europe accounted for around USD 8.4 billion in revenue in the same year. Lupin's inhalation portfolio spans across metered-dose inhalers (MDIs), dry-powder inhalers (DPIs), and nasal sprays. Lupin is also committed to advancing its green propellant inhalers, which have near-zero global warming potential (GWP) to reduce environmental impact while preserving clinical efficacy and safety. This initiative aligns with evolving regulatory expectations in Europe and Lupin's commitment to sustainable pharmaceutical innovation. This focus strengthens Lupin's position as a responsible leader in complex inhalation generics across regulated markets.",
      link: {
        text: "Click here to know more about how Lupin is advancing its respiratory care.",
        url: "#"
      }
    };
  }

  // Fetch regional presence data from Strapi
  let regionalPresenceData = null;

  try {
    const strapiData = await fetchAPI('global-generics?populate=deep', {
      next: { revalidate: 60 },
    });
    
    regionalPresenceData = mapGlobalGenericsRegionalPresenceData(strapiData);
  } catch (error) {
    console.error('Error fetching global-generics regional presence data from Strapi:', error);
  }

  // Default regional presence data if Strapi data is not available
  if (!regionalPresenceData) {
    regionalPresenceData = {
      heading: "Regional Presence",
      background: {
        desktop: "/assets/images/global-generic/bigbg.png",
        mobile: "/assets/images/global-generic/bigbg.png"
      },
      regions: [
        {
          title: "United States",
          position: "top-left",
          backgroundColor: "#08a03f",
          highlights: [
            "#3 largest generics company by prescriptions filled",
            "#3 in U.S. generics respiratory sales"
          ],
          description: "Since entering the pharmaceutical generics market in 2003, Lupin has received over 300 FDA approvals and currently markets more than 150 generic products in the U.S. With deep science-led backing, a robust portfolio, strong customer relationships, and utmost attention to quality, the U.S. remains a critical driver of Lupin's growth."
        },
        {
          title: "Canada",
          position: "top-right",
          backgroundColor: "#034a1d",
          highlights: [
            "~18% CAGR growth (FY20–FY25)",
            "First generic Tolvaptan – affordable access to critical kidney therapy"
          ],
          description: "The Canadian pharmaceutical market continues to grow extensively and specializes in gastroenterology, women's health, and niche and complex generics, delivering an 18% CAGR between FY20 and FY25."
        },
        {
          title: "United Kingdom",
          position: "middle-left",
          backgroundColor: "#05461d",
          highlights: [
            "Luforbec: #1 primary care respiratory brand",
            "Leadership in sustainable inhalers",
            "230,000+ patients treated monthly for respiratory disorders"
          ],
          description: "Lupin Healthcare UK has strengthened its leadership in respiratory care. Luforbec, Lupin's flagship inhaler, is the top primary care respiratory brand by value and volume, with a large user base highlighting its widespread adoption and trust among prescribers. Lupin also leads in sustainability through the provision of carbon-neutral inhalers and the development of next-generation, eco-friendly propellants."
        },
        {
          title: "Europe",
          position: "middle-right",
          backgroundColor: "#0a933c",
          highlights: [
            "Contributes ~11% of global revenues",
            "Growth led by respiratory, neurology and injectables"
          ],
          description: "Lupin's European operations have consistently delivered strong growth, supported by expansion in respiratory, neurology, and injectable portfolios. Together with the U.K. and Australia, Europe contributes to approximately 11% of Lupin's global revenues, underscoring its importance as a strategic market."
        },
        {
          title: "Australia",
          position: "bottom",
          backgroundColor: "#0a933c",
          highlights: [
            "#4 generics player (Generic Health)",
            "Strategic Expansion into Complex Generics"
          ],
          description: "Australia is a mature, highly regulated pharmaceutical market with a strong generics base. Lupin's wholly owned subsidiary, Generic Health, is the one of the largest generics player in Australia and has delivered consistent growth over the past five years. Portfolio expansion, operational agility, and entry into new therapy areas continue to strengthen Lupin's presence in this important developed market."
        }
      ]
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <GlobalGenericsIntro data={introData} />
      <GlobalGenericsSection data={sectionData} />
      <GlobalGenericsPortfolio data={portfolioData} />
      <GlobalGenericsComplex data={complexData} />
      <GlobalGenericsInhalation data={inhalationData} />
      <GlobalGenericsRegionalPresence data={regionalPresenceData} />
    </div>
  );
}

