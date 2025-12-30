import InnerBanner from '@/components/InnerBanner';
import ShareholdingPattern from '@/components/ShareholdingPattern';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the shareholding pattern page
export const metadata = generateSEOMetadata({
  title: "Shareholding Pattern - Lupin | Investor Relations",
  description: "View Lupin Limited's shareholding pattern, including details about share distribution among different categories of shareholders.",
  canonicalUrl: "https://www.lupin.com/investors/shareholding-pattern",
  keywords: "Lupin shareholding pattern, investor relations, share distribution, shareholders, stock ownership",
});

export default async function ShareholdingPatternPage() {
  // Fetch data from Strapi
  let shareholdingData = null;
  try {
    const data = await fetchAPI('shareholding-pattern?populate=deep', {
      next: { revalidate: 60 },
    });
    
    if (data.data && data.data.attributes) {
      const attributes = data.data.attributes;
      shareholdingData = {
        iframeUrl: attributes.iframeUrl || attributes.iframe?.url || "",
        iframeTitle: attributes.iframeTitle || attributes.iframe?.title || "Shareholding Pattern"
      };
    }
  } catch (error) {
    console.error('Error fetching shareholding pattern data from Strapi:', error);
    // Will use default data from component
  }

  const bannerData = {
    title: {
      line1: "Shareholding",
      line2: "Pattern"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Shareholding Pattern"
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
      <ShareholdingPattern data={shareholdingData} />
      <SubscriberUpdated />
    </div>
  );
}

