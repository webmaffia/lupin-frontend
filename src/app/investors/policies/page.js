import InnerBanner from '@/components/InnerBanner';
import Policies from '@/components/Policies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getPolicy, mapPolicyData } from '@/lib/strapi';

// Generate metadata for the policies page
export const metadata = generateSEOMetadata({
  title: "Policies - Lupin | Investor Relations",
  description: "View Lupin's corporate policies, committees of the board, and code of conduct documents for investors.",
  canonicalUrl: "https://www.lupin.com/investors/policies",
  keywords: "Lupin policies, corporate governance, code of conduct, board committees, investor relations",
});

export default async function PoliciesPage() {
  // Fetch policy data from Strapi
  let policiesData = null;
  
  try {
    const rawData = await getPolicy();
    policiesData = mapPolicyData(rawData);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Policies - Mapped data:', policiesData);
    }
  } catch (error) {
    console.error('Error fetching Policy data from Strapi:', error);
    // Will use default data from component if fetch fails
  }

  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Policies",
      line2: ""
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <Policies data={policiesData} />
    </div>
  );
}

