import InnerBanner from '@/components/InnerBanner';
import SharePrice from '@/components/SharePrice';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getSharePrice, mapSharePriceData } from '@/lib/strapi-reports';
import { mapTopBannerData, fetchAPI } from '@/lib/strapi';

// Generate metadata for the share price page
export const metadata = generateSEOMetadata({
  title: "Share Price - Lupin | Investor Relations",
  description: "View Lupin Limited's current share price, stock performance, and real-time market data.",
  canonicalUrl: "https://www.lupin.com/investors/share-price",
  keywords: "Lupin share price, stock price, investor relations, stock performance, market data, Lupin Limited stock",
});

export default async function SharePricePage() {
  let sharePriceData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getSharePrice();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Share Price - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasSharePriceSection: !!(rawData?.data?.SharePriceSection || rawData?.SharePriceSection)
      });
    }
    
    if (rawData) {
      sharePriceData = mapSharePriceData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Share Price - Mapped data:', {
          hasShareCapital: !!sharePriceData?.shareCapital,
          hasListingOfSecurities: !!sharePriceData?.listingOfSecurities,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Share Price - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch share price data from Strapi';
    console.error('Error fetching Share Price data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Fetch iframe data (keep existing iframe logic)
  let iframeData = null;
  try {
    const data = await fetchAPI('share-price?populate=deep', {
      next: { revalidate: 60 },
    });
    
    if (data.data && data.data.attributes) {
      const attributes = data.data.attributes;
      iframeData = {
        iframeUrl: attributes.iframeUrl || attributes.iframe?.url || "",
        iframeTitle: attributes.iframeTitle || attributes.iframe?.title || "Share Price"
      };
    }
  } catch (error) {
    console.error('Error fetching iframe data from Strapi:', error);
  }

  // Merge share price sections with iframe data
  const finalSharePriceData = {
    ...sharePriceData,
    iframeUrl: iframeData?.iframeUrl || "",
    iframeTitle: iframeData?.iframeTitle || "Share Price"
  };
  
  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <SharePrice data={finalSharePriceData} error={error} />
      <SubscriberUpdated />
    </div>
  );
}

