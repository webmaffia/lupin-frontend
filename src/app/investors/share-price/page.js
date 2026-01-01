import InnerBanner from '@/components/InnerBanner';
import SharePrice from '@/components/SharePrice';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the share price page
export const metadata = generateSEOMetadata({
  title: "Share Price - Lupin | Investor Relations",
  description: "View Lupin Limited's current share price, stock performance, and real-time market data.",
  canonicalUrl: "https://www.lupin.com/investors/share-price",
  keywords: "Lupin share price, stock price, investor relations, stock performance, market data, Lupin Limited stock",
});

export default async function SharePricePage() {
  // Fetch data from Strapi
  let sharePriceData = null;
  try {
    const data = await fetchAPI('share-price?populate=deep', {
      next: { revalidate: 60 },
    });
    
    if (data.data && data.data.attributes) {
      const attributes = data.data.attributes;
      sharePriceData = {
        iframeUrl: attributes.iframeUrl || attributes.iframe?.url || "",
        iframeTitle: attributes.iframeTitle || attributes.iframe?.title || "Share Price"
      };
    }
  } catch (error) {
    console.error('Error fetching share price data from Strapi:', error);
    // Will use default data from component
  }

  const bannerData = {
    title: {
      line1: "Share",
      line2: "Price"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Share Price"
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
      <SharePrice data={sharePriceData} />
      <SubscriberUpdated />
    </div>
  );
}

