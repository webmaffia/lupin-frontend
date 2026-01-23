import InnerBanner from '@/components/InnerBanner';
import TipsForShareholders from '@/components/TipsForShareholders';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getTipsForShareholder, mapTipsForShareholderData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the tips for shareholders page
export const metadata = generateSEOMetadata({
  title: "Tips for Shareholders - Lupin | Investor Relations",
  description: "Helpful tips and information for Lupin shareholders including nomination, electronic clearing service, and dematerialized shares.",
  canonicalUrl: "https://www.lupin.com/investors/tips-for-shareholders",
  keywords: "Lupin shareholders, shareholder tips, nomination, ECS, dematerialized shares, investor relations",
});

export default async function TipsForShareholdersPage() {
  let tipsData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getTipsForShareholder();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Tips for Shareholders - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasTipsShareHolderSectionContent: !!(rawData?.data?.TipsShareHolderSectionContent || rawData?.TipsShareHolderSectionContent)
      });
    }
    
    if (rawData) {
      tipsData = mapTipsForShareholderData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Tips for Shareholders - Mapped data:', {
          sectionsCount: tipsData?.sections?.length || 0,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Tips for Shareholders - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch tips for shareholder data from Strapi';
    console.error('Error fetching Tips for Shareholders data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <TipsForShareholders data={tipsData} error={error} />
    </div>
  );
}

