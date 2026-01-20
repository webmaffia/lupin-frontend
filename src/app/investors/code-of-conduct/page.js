import InnerBanner from '@/components/InnerBanner';
import CodeOfConduct from '@/components/CodeOfConduct';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getCodeOfConduct, mapCodeOfConductData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the code of conduct page
export const metadata = generateSEOMetadata({
  title: "Code of Conduct - Lupin | Corporate Governance Policies",
  description: "Access Lupin Limited's code of conduct policies, including codes for directors, senior management, and independent directors.",
  canonicalUrl: "https://www.lupin.com/investors/code-of-conduct",
  keywords: "Lupin code of conduct, corporate governance, director policies, senior management code, independent directors",
});

export default async function CodeOfConductPage() {
  // Fetch code of conduct data from Strapi (single API call for both codes and banner)
  let codeOfConductData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getCodeOfConduct();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Code of Conduct - Raw API data received:', {
        hasData: !!rawData,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasCodeOfConductDocumentsSection: !!(rawData?.data?.CodeOfConductDocumentsSection || rawData?.CodeOfConductDocumentsSection)
      });
    }
    
    // Map code of conduct data
    if (rawData) {
      codeOfConductData = mapCodeOfConductData(rawData);
      
      // Map banner data
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Code of Conduct - Mapped data:', {
          codesCount: codeOfConductData?.codes?.length || 0,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Code of Conduct - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch code of conduct data from Strapi';
    console.error('Error fetching Code of Conduct data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <CodeOfConduct data={codeOfConductData} error={error} />
    </div>
  );
}

