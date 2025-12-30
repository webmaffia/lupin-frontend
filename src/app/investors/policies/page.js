import InnerBanner from '@/components/InnerBanner';
import Policies from '@/components/Policies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the policies page
export const metadata = generateSEOMetadata({
  title: "Policies - Lupin | Investor Relations",
  description: "View Lupin's corporate policies, committees of the board, and code of conduct documents for investors.",
  canonicalUrl: "https://www.lupin.com/investors/policies",
  keywords: "Lupin policies, corporate governance, code of conduct, board committees, investor relations",
});

export default function PoliciesPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Policies",
      line2: ""
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <Policies />
    </div>
  );
}

