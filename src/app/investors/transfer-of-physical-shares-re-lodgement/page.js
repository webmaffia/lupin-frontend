import InnerBanner from '@/components/InnerBanner';
import TransferPhysicalShares from '@/components/TransferPhysicalShares';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getTransferPhysicalShare, mapTransferPhysicalShareData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the transfer of physical shares page
export const metadata = generateSEOMetadata({
  title: "Transfer of Physical Shares (Re-lodgement) - Lupin | Investor Relations",
  description: "Information about re-lodging transfer requests for physical shares that were rejected and returned to the lodger on or before March 31, 2019.",
  canonicalUrl: "https://www.lupin.com/investors/transfer-of-physical-shares-re-lodgement",
  keywords: "Lupin physical shares, share transfer, re-lodgement, RTA, MUFG Intime, investor relations",
});

export default async function TransferPhysicalSharesPage() {
  let transferData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getTransferPhysicalShare();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Transfer Physical Share - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasDescription: !!(rawData?.data?.Description || rawData?.Description)
      });
    }
    
    if (rawData) {
      transferData = mapTransferPhysicalShareData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Transfer Physical Share - Mapped data:', {
          hasDescription: !!transferData?.description,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Transfer Physical Share - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch transfer physical share data from Strapi';
    console.error('Error fetching Transfer Physical Share data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <TransferPhysicalShares data={transferData} error={error} />
    </div>
  );
}













