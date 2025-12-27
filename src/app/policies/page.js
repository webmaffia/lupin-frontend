import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import Policies from '@/components/Policies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the policies page
export const metadata = generateSEOMetadata({
  title: "Policies - Lupin | Corporate Governance",
  description: "View Lupin's corporate policies, committees of the board, and code of conduct documents.",
  canonicalUrl: "https://www.lupin.com/policies",
  keywords: "Lupin policies, corporate governance, code of conduct, board committees",
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
      <Header />
      <InnerBanner data={bannerData} />
      <Policies />
      <Footer />
    </div>
  );
}

