import InnerBanner from '@/components/InnerBanner';
import SEBIRegulations from '@/components/SEBIRegulations';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getInvestorRegulationDisclosure, mapInvestorRegulationDisclosureData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the Disclosure under Regulation 46 of SEBI Regulations, 2016 page
export const metadata = generateSEOMetadata({
  title: "Disclosure under Regulation 46 of SEBI Regulations, 2016 - Lupin | Investor Relations",
  description: "View disclosures under Regulation 46 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2016 for Lupin Limited.",
  canonicalUrl: "https://www.lupin.com/investors/disclosure-under-regulation-46-of-sebi-regulations-2016",
  keywords: "SEBI regulations, Regulation 46, investor relations, disclosures, Lupin Limited, SEBI compliance, 2016",
});

export default async function DisclosureRegulation46Page() {
  let regulationsData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getInvestorRegulationDisclosure();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Investor Regulation Disclosure - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasRegulationDisclosureSection: !!(rawData?.data?.RegulationDisclosureSection || rawData?.RegulationDisclosureSection),
        sectionsCount: (rawData?.data?.RegulationDisclosureSection || rawData?.RegulationDisclosureSection || []).length
      });
    }
    
    if (rawData) {
      regulationsData = mapInvestorRegulationDisclosureData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Investor Regulation Disclosure - Mapped data:', {
          itemsCount: regulationsData?.items?.length || 0,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Investor Regulation Disclosure - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch investor regulation disclosure data from Strapi';
    console.error('Error fetching Investor Regulation Disclosure data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  
  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <SEBIRegulations data={regulationsData} error={error} />
    </div>
  );
}


