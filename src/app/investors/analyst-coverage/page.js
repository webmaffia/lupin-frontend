import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import AnalystCoverage from '@/components/AnalystCoverage';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the analyst coverage page
export const metadata = generateSEOMetadata({
  title: "Analyst Coverage - Lupin | Investor Relations",
  description: "View analyst coverage and contact information for Lupin's investor relations team. Connect with financial analysts covering Lupin.",
  canonicalUrl: "https://www.lupin.com/investors/analyst-coverage",
  keywords: "Lupin analyst coverage, investor relations, financial analysts, stock analysis",
});

export default function AnalystCoveragePage() {
  const bannerData = {
    title: {
      line1: "Transfer of Physical",
      line2: "Shares (Re-lodgement)"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Financial documents and charts"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <InnerBanner data={bannerData} />
      <AnalystCoverage />
      <Footer />
    </div>
  );
}

