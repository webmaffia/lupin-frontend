import InnerBanner from '@/components/InnerBanner';
import Policies from '@/components/Policies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getPolicy, mapPolicyData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the policies page
export const metadata = generateSEOMetadata({
  title: "Policies - Lupin | Investor Relations",
  description: "View Lupin's corporate policies, committees of the board, and code of conduct documents for investors.",
  canonicalUrl: "https://www.lupin.com/investors/policies",
  keywords: "Lupin policies, corporate governance, code of conduct, board committees, investor relations",
});

export default async function PoliciesPage() {
  // Fetch policy data from Strapi (single API call for both policies and banner)
  let policiesData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getPolicy();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Policies - Raw API data received:', {
        hasData: !!rawData,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasPolicyDocumentsSection: !!(rawData?.data?.PolicyDocumentsSection || rawData?.PolicyDocumentsSection)
      });
    }
    
    // Map policies data
    if (rawData) {
      policiesData = mapPolicyData(rawData);
      
      // Map banner data
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      console.log("Policy banner Data Image" ,topBanner);
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Policies - Mapped data:', {
          policiesCount: policiesData?.policies?.length || 0,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Policies - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch policy data from Strapi';
    console.error('Error fetching Policy data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <Policies data={policiesData} error={error} />
    </div>
  );
}

