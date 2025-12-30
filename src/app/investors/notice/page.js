import InnerBanner from '@/components/InnerBanner';
import Notice from '@/components/Notice';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the notice page
export const metadata = generateSEOMetadata({
  title: "Notice - Lupin | Investor Relations",
  description: "View Lupin's corporate notices and important announcements for investors.",
  canonicalUrl: "https://www.lupin.com/investors/notice",
  keywords: "Lupin notices, corporate announcements, investor notices, Lupin investor relations",
});

export default function NoticePage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Notice",
      line2: ""
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <Notice />
      <SubscriberUpdated />
    </div>
  );
}

