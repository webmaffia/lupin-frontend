import InnerBanner from '@/components/InnerBanner';
import BrandedEmergingMarketsIntro from '@/components/BrandedEmergingMarketsIntro';
import BrandedEmergingMarketsMarkets from '@/components/BrandedEmergingMarketsMarkets';
import BrandedEmergingMarketsItems from '@/components/BrandedEmergingMarketsItems';
import BrandedEmergingMarketsFooter from '@/components/BrandedEmergingMarketsFooter';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapTopBannerData, mapBrandedEmergingMarketsIntroData, mapBrandedEmergingMarketsMarketsData, mapBrandedEmergingMarketsItemsData, mapBrandedEmergingMarketsFooterData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/branded-emerging-markets.scss';

// Generate metadata for the Branded Emerging Markets page
export const metadata = generateSEOMetadata({
  title: "Branded Emerging Markets - Lupin | Pharmaceutical Solutions",
  description: "Discover Lupin's branded pharmaceutical solutions in emerging markets, delivering quality healthcare to patients worldwide.",
  canonicalUrl: "https://www.lupin.com/our-business/branded-emerging-markets",
  keywords: "Lupin branded markets, emerging markets, pharmaceutical brands, Lupin pharmaceuticals, healthcare solutions",
});

export default async function BrandedEmergingMarketsPage() {
  // Fetch data from Strapi
  let bannerData = null;

  try {
    const strapiData = await fetchAPI('branded-emerging-markets?populate=deep', {
      next: { revalidate: 60 },
    });
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }
  } catch (error) {
    console.error('Error fetching branded-emerging-markets data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Branded",
        line2: "Emerging Markets"
      },
      subheading: {
        enabled: false,
        text: ""
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Branded Emerging Markets - Lupin"
        },
        bannerMobile: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Branded Emerging Markets - Lupin"
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
    const strapiData = await fetchAPI('branded-emerging-markets?populate=deep', {
      next: { revalidate: 60 },
    });
    
    introData = mapBrandedEmergingMarketsIntroData(strapiData);
  } catch (error) {
    console.error('Error fetching branded-emerging-markets intro data from Strapi:', error);
  }

  // Default intro data if Strapi data is not available
  if (!introData) {
    introData = {
      content: [
        "Lupin's purpose to catalyze treatments that transform hope into healing, finds strong expression in the work it does across emerging markets in Africa, Asia and Latin America.",
        {
          text: "As per a recent study, emerging pharma markets are growing at an immense pace due to rising healthcare needs, supportive policies, and an expanding middle-class population. However, widespread access to high- quality, effective medicines remain a challenge in these markets.",
          link: {
            text: "As per a recent study",
            url: "https://link.springer.com/article/10.1007/s11095-025-03856-w"
          }
        },
        "Lupin's strategy of expanding access, enhancing impact and fostering resilience with a foundation in excellence and patient-centric care has led these markets to contribute to 11% of Lupin's global sales, reflecting an on-growing stronghold Lupin has through localized offerings and public health partnerships."
      ]
    };
  }

  // Fetch markets data from Strapi
  let marketsData = null;

  try {
    const strapiData = await fetchAPI('branded-emerging-markets?populate=deep', {
      next: { revalidate: 60 },
    });
    
    marketsData = mapBrandedEmergingMarketsMarketsData(strapiData);
  } catch (error) {
    console.error('Error fetching branded-emerging-markets markets data from Strapi:', error);
  }

  // Default markets data if Strapi data is not available
  if (!marketsData) {
    marketsData = {
      heading: "MARKETS",
      content: "Lupin's business across emerging markets, including South Africa, Brazil, Mexico, and the Philippines is integral to Lupin's global expansion and influencing patient care. These dynamic markets demand affordable, effective and high-quality treatments. The focus on generic drug manufacturing to create high accessibility at lower costs reflects volume growth, market-specific strategies and efficient cost structures."
    };
  }

  // Fetch items data from Strapi
  let itemsData = null;

  try {
    const strapiData = await fetchAPI('branded-emerging-markets?populate=deep', {
      next: { revalidate: 60 },
    });
    
    itemsData = mapBrandedEmergingMarketsItemsData(strapiData);
  } catch (error) {
    console.error('Error fetching branded-emerging-markets items data from Strapi:', error);
  }

  // Default items data if Strapi data is not available
  if (!itemsData) {
    itemsData = {
      items: [
        {
          title: "South Africa",
          content: [
            "South Africa is one of Lupin's most promising emerging markets, a nation where access to affordable, accessible and quality healthcare remains imperative.",
            "The region hosts a diverse portfolio with a plethora of therapy areas, including cardiac care, anti-diabetes, CNS, and women's health, to name a few.",
            "Lupin's subsidiary, Pharma Dynamics, is a leading provider of generic medication and the largest supplier of heart medication in South Africa, with 25 market-leading brands. Today, we host a broad portfolio of products that consistently rank among the top in key therapy areas, while our OTC franchise also demonstrates strong market leadership.",
            "Through plans of active expansion in the coming years, South Africa market is one of the canvases where Lupin's purpose comes alive."
          ],
          link: {
            text: "Know more about South Africa market",
            url: "https://medquimica.ind.br/en/"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "South Africa market"
          }
        },
        {
          title: "Brazil",
          content: [
            "MedQuímica, our subsidiary in Brazil, develops various solid and liquid medications that include OTC, branded generics, hospital medications, and food supplements. Certified by the Brazilian Health Regulatory Agency, MedQuímica has penetrated the Brazilian pharma market and impacted millions of lives through affordable and highly accessible medicines."
          ],
          link: {
            text: "Know more about Brazil market",
            url: "#"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "Brazil market"
          }
        },
        {
          title: "Mexico",
          content: [
            "Lupin's subsidiary Laboratories Grin continues to play a vital role in Mexico, showcasing steady growth, making it one of the top pharma players in Latin America.",
            "Laboratories Grin has a particularly strong presence in the Ophthalmology segment, where it is recognized as one of the leading players.",
            "As we move forward, Laboratories Grin will reinforce its position in the Ophthalmology segment by expanding into adjacent therapies to reach a broader audience. We aim to deepen our innovative capabilities and local insights to offer accessible care to our patients."
          ],
          link: {
            text: "Know more about Mexico market",
            url: "#"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "Mexico market"
          }
        },
        {
          title: "Philippines",
          content: [
            "Lupin's subsidiary in the Philippines, Multicare Pharmaceuticals, aims to diversify our portfolio, scale operations, and elevate healthcare standards. We are the leading Indian pharmaceutical company in the Philippines and rank in the top five in the branded generics segment, covering various therapeutic areas such as rheumatology, women's health, oncology, neuroscience, diabetes, gastroenterology, respiratory conditions, and tuberculosis.",
            "Multicare Pharmaceuticals not only believes in developing high-quality medication but also demonstrates holistic patient care through its patient access programs, offering free consultation to over 15,000 patients."
          ],
          link: {
            text: "Know more about Philippines market",
            url: "#"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "Philippines market"
          }
        },
        {
          title: "India",
          content: [
            "India's pharmaceutical landscape is undergoing rapid transformation, fuelled by demographic shifts, an increase in chronic and lifestyle-related diseases, and growing expectations for better healthcare solutions. This momentum has intensified the focus on patient-centric approaches, localized innovation, and integrated care, making India one of the most dynamic and promising pharma markets globally.",
            "Within this environment, Lupin's India Region Formulations (IRF) business has emerged as a strong growth engine, consistently outperforming the market. Ranked 8th in the Indian Pharmaceutical Market, India region accounts for 34% of Lupin's global turnover, with 74.5% of domestic sales driven by its core therapies—cardiac, respiratory, anti-diabetic, and gastrointestinal."
          ],
          link: {
            text: "Know more about India market",
            url: "#"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "India market"
          }
        },
        {
          title: "MENA",
          content: [
            "MENA pharmaceutical market is experiencing significant growth, driven by factors such as the increasing prevalence of chronic diseases, rising healthcare expenditures, government initiatives aimed at localizing manufacturing and improving healthcare access. MENA generic pharmaceutical market is dominated by local companies while Indian companies have a low share. Key opportunities for pharmaceutical companies in the MENA region include Government Investment, Market Expansion, Digital Transformation and Innovation and Research. These factors position MENA as promising market for growth from future perspective.",
            "Lupin is entering into strategic collaborations and partnerships with leading local companies in the MENA region. Lupin, with its wide product portfolio and R&D capabilities, is committed to providing affordable access to high quality medicines to the patients across the MENA region."
          ],
          link: {
            text: "Know more about MENA market",
            url: "#"
          },
          image: {
            url: "/assets/images/branded/image1.png",
            alt: "MENA market"
          }
        }
      ]
    };
  }

  // Fetch footer data from Strapi
  let footerData = null;

  try {
    const strapiData = await fetchAPI('branded-emerging-markets?populate=deep', {
      next: { revalidate: 60 },
    });
    
    footerData = mapBrandedEmergingMarketsFooterData(strapiData);
  } catch (error) {
    console.error('Error fetching branded-emerging-markets footer data from Strapi:', error);
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <BrandedEmergingMarketsIntro data={introData} />
      <BrandedEmergingMarketsMarkets data={marketsData} />
      <BrandedEmergingMarketsItems data={itemsData} />
      <BrandedEmergingMarketsFooter data={footerData} />
    </div>
  );
}

