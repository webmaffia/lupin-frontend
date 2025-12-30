import InnerBanner from '@/components/InnerBanner';
import InvestorIntro from '@/components/InvestorIntro';
import WhatsNew from '@/components/WhatsNew';
import ReportsAndFilings from '@/components/ReportsAndFilings';
import NewsInsights from '@/components/NewsInsights';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getHomepage, mapHomepageNewsInsightsData } from '@/lib/strapi';

// Generate metadata for the investors page
export const metadata = generateSEOMetadata({
  title: "Investor Relations - Lupin | Stock Information & Corporate Governance",
  description: "Access Lupin Limited's investor relations information, including stock details, financial reports, corporate governance, and investor resources.",
  canonicalUrl: "https://www.lupin.com/investors",
  keywords: "Lupin investor relations, stock information, financial reports, corporate governance, investor resources, Lupin Limited",
});

export default async function InvestorsPage() {
  // Fetch news insights data from Strapi
  let newsInsightsData = null;
  
  try {
    // Fetch from homepage using the same function as the homepage
    // This ensures we get the same news data structure with proper population
    const homepageData = await getHomepage();
    
    // Log raw API response for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Investors page - Raw Strapi API response:', JSON.stringify(homepageData, null, 2));
    }
    
    // Map using the same function as homepage
    try {
      newsInsightsData = mapHomepageNewsInsightsData(homepageData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Investors page - Mapped news insights data:', JSON.stringify(newsInsightsData, null, 2));
      }
    } catch (mapError) {
      console.error('Error mapping news insights data:', mapError);
      // Will fall back to default data
    }
  } catch (error) {
    console.error('Error fetching homepage data from Strapi for investors page:', error);
    // Will use default data below
  }

  // Default news insights data if Strapi data is not available
  if (!newsInsightsData) {
    newsInsightsData = {
      title: "News & Insights",
      items: [
        {
          id: 1,
          date: "12 September, 2025",
          headline: "Lupin Announces Q2 Financial Results",
          image: {
            url: "/assets/placeholder.jpg",
            width: 627,
            height: 627,
            alt: "Q2 Financial Results"
          },
          href: "#"
        },
        {
          id: 2,
          date: "15 August, 2025",
          headline: "New Product Launch in Key Markets",
          image: {
            url: "/assets/placeholder.jpg",
            width: 627,
            height: 627,
            alt: "Product Launch"
          },
          href: "#"
        }
      ]
    };
  }

  const bannerData = {
    title: {
      line1: "Investor",
      line2: "Relations"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Investor Relations"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };
  
  // Fetch intro section data from Strapi
  let introData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract intro data if available in Strapi
    // Supports multiple data structures:
    // 1. paragraphs array (preferred)
    // 2. content array
    // 3. text string (will be split by newlines)
    if (investorsPageData?.data?.attributes?.intro || investorsPageData?.intro) {
      const intro = investorsPageData?.data?.attributes?.intro || investorsPageData?.intro;
      introData = {
        paragraphs: intro.paragraphs || intro.content || (intro.text ? intro.text.split('\n').filter(p => p.trim()) : []),
        content: intro.content || (intro.text ? [intro.text] : []),
        text: intro.text || intro.content
      };
    }
  } catch (error) {
    console.error('Error fetching intro data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch What's New data from Strapi
  let whatsNewData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract What's New data if available in Strapi
    if (investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew) {
      const whatsNew = investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew;
      whatsNewData = {
        title: whatsNew.title || "What's New",
        items: whatsNew.items || whatsNew.news || []
      };
    }
  } catch (error) {
    console.error('Error fetching What\'s New data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Reports and Filings data from Strapi
  let reportsData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract Reports and Filings data if available in Strapi
    if (investorsPageData?.data?.attributes?.reportsAndFilings || investorsPageData?.reportsAndFilings) {
      const reports = investorsPageData?.data?.attributes?.reportsAndFilings || investorsPageData?.reportsAndFilings;
      reportsData = {
        title: reports.title || "Reports and Filings",
        cards: reports.cards || reports.items || []
      };
    }
  } catch (error) {
    console.error('Error fetching Reports and Filings data from Strapi:', error);
    // Will use default data from component
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <InvestorIntro data={introData} />
      <WhatsNew data={whatsNewData} />
      <ReportsAndFilings data={reportsData} />
      <NewsInsights data={newsInsightsData} />
      <SubscriberUpdated />
    </div>
  );
}

