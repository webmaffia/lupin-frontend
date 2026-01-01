import InnerBanner from '@/components/InnerBanner';
import Subsidiaries from '@/components/Subsidiaries';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the subsidiaries page
export const metadata = generateSEOMetadata({
  title: "Subsidiaries - Lupin | Investor Relations",
  description: "View Lupin Limited's subsidiaries and associate companies. Learn about our global operations and business structure.",
  canonicalUrl: "https://www.lupin.com/investors/subsidiaries",
  keywords: "Lupin subsidiaries, associate companies, investor relations, business structure, global operations, Lupin Limited",
});

export default function SubsidiariesPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Subsidiaries",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Subsidiaries"
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
      <Subsidiaries />
      <SubscriberUpdated />
    </div>
  );
}

