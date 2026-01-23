import InnerBanner from '@/components/InnerBanner';
import EthicsComplianceIntro from '@/components/EthicsComplianceIntro';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getEthicsAndCompliance, mapEthicsAndComplianceData } from '@/lib/strapi-pages';
import { mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/ethics-compliance-governance.scss';

// Generate metadata for the Ethics, Compliance and Governance page
export const metadata = generateSEOMetadata({
  title: "Ethics, Compliance and Governance - Lupin | Committed to Ethical Business Practices",
  description: "Learn about Lupin's commitment to ethics, compliance, and governance. Discover our policies, frameworks, and dedication to maintaining the highest standards of corporate governance and ethical conduct.",
  canonicalUrl: "https://www.lupin.com/ethics-compliance-governance",
  keywords: "Lupin ethics, compliance, corporate governance, ethical business practices, governance framework, Lupin Limited, corporate responsibility",
});

export default async function EthicsComplianceGovernancePage() {
  let ethicsData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getEthicsAndCompliance();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Ethics and Compliance - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasPageIntroSection: !!(rawData?.data?.PageIntroSection || rawData?.PageIntroSection)
      });
    }
    
    if (rawData) {
      ethicsData = mapEthicsAndComplianceData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Ethics and Compliance - Mapped data:', {
          hasPageIntro: !!ethicsData?.pageIntro,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Ethics and Compliance - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch ethics and compliance data from Strapi';
    console.error('Error fetching Ethics and Compliance data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      {ethicsData?.pageIntro && <EthicsComplianceIntro data={ethicsData.pageIntro} />}
    </div>
  );
}

