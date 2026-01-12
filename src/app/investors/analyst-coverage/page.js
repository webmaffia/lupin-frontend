import InnerBanner from '@/components/InnerBanner';
import AnalystCoverage from '@/components/AnalystCoverage';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
// TODO: Uncomment when ready to connect to Strapi API
// import { getAnalystCoverage, mapAnalystCoverageData, mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the analyst coverage page
export const metadata = generateSEOMetadata({
  title: "Analyst Coverage - Lupin | Investor Relations",
  description: "View analyst coverage and contact information for Lupin's investor relations team. Connect with financial analysts covering Lupin.",
  canonicalUrl: "https://www.lupin.com/investors/analyst-coverage",
  keywords: "Lupin analyst coverage, investor relations, financial analysts, stock analysis",
});

export default function AnalystCoveragePage() {
  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch analyst coverage data from Strapi
  // let analystsData = [];
  // 
  // try {
  //   const rawData = await getAnalystCoverage();
  //   analystsData = mapAnalystCoverageData(rawData);
  //   
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('Analyst Coverage - Mapped data:', analystsData);
  //   }
  // } catch (error) {
  //   console.error('Error fetching Analyst Coverage data from Strapi:', error);
  //   // Will use default data from component if fetch fails
  // }

  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch banner data from Strapi
  // let bannerData = null;
  // 
  // try {
  //   const rawData = await getAnalystCoverage();
  //   const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
  //   bannerData = mapTopBannerData(topBanner);
  // } catch (error) {
  //   console.error('Error fetching Analyst Coverage banner data from Strapi:', error);
  // }

  // Using fallback data (component will use default data when empty array is passed)
  const analystsData = [];

  // Using fallback banner data (will be replaced by Strapi API later)
  const bannerData = {
    title: {
      line1: "Analyst",
      line2: "Coverage"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/Analys-coverage.png",
        alt: "Financial documents and charts"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <AnalystCoverage analysts={analystsData} />
    </div>
  );
}

