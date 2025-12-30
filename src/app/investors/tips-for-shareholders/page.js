import InnerBanner from '@/components/InnerBanner';
import TipsForShareholders from '@/components/TipsForShareholders';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the tips for shareholders page
export const metadata = generateSEOMetadata({
  title: "Tips for Shareholders - Lupin | Investor Relations",
  description: "Helpful tips and information for Lupin shareholders including nomination, electronic clearing service, and dematerialized shares.",
  canonicalUrl: "https://www.lupin.com/investors/tips-for-shareholders",
  keywords: "Lupin shareholders, shareholder tips, nomination, ECS, dematerialized shares, investor relations",
});

export default function TipsForShareholdersPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Tips for",
      line2: "Shareholders"
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <TipsForShareholders />
    </div>
  );
}

