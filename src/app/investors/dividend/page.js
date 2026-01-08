import InnerBanner from '@/components/InnerBanner';
import NavigationLinks from '@/components/NavigationLinks';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the dividend page
export const metadata = generateSEOMetadata({
  title: "Dividend - Lupin | Investor Relations",
  description: "View Lupin Limited's dividend information, dividend history, and dividend payment details for shareholders.",
  canonicalUrl: "https://www.lupin.com/investors/dividend",
  keywords: "Lupin dividend, dividend information, dividend history, dividend payment, investor relations, Lupin Limited",
});

export default function DividendPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Dividend",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Dividend"
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
      <NavigationLinks />
      <SubscriberUpdated />
    </div>
  );
}

