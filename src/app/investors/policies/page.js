import InnerBanner from '@/components/InnerBanner';
import Policies from '@/components/Policies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
// TODO: Uncomment when ready to connect to Strapi API
// import { getPolicy, mapPolicyData, mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the policies page
export const metadata = generateSEOMetadata({
  title: "Policies - Lupin | Investor Relations",
  description: "View Lupin's corporate policies, committees of the board, and code of conduct documents for investors.",
  canonicalUrl: "https://www.lupin.com/investors/policies",
  keywords: "Lupin policies, corporate governance, code of conduct, board committees, investor relations",
});

export default function PoliciesPage() {
  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch policy data from Strapi
  // let policiesData = null;
  // 
  // try {
  //   const rawData = await getPolicy();
  //   policiesData = mapPolicyData(rawData);
  //   
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('Policies - Mapped data:', policiesData);
  //   }
  // } catch (error) {
  //   console.error('Error fetching Policy data from Strapi:', error);
  //   // Will use default data from component if fetch fails
  // }

  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch banner data from Strapi
  // let bannerData = null;
  // 
  // try {
  //   const rawData = await getPolicy();
  //   const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
  //   bannerData = mapTopBannerData(topBanner);
  // } catch (error) {
  //   console.error('Error fetching Policy banner data from Strapi:', error);
  // }

  // Using fallback data (component will use default data when null is passed)
  const policiesData = null;

  // Using fallback banner data (will be replaced by Strapi API later)
  const bannerData = {
    title: {
      line1: "Policies",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/Policies.png",
        alt: "Policies"
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
      <Policies data={policiesData} />
    </div>
  );
}

