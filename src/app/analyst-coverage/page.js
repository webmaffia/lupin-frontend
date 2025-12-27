import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AnalystCoverage from '@/components/AnalystCoverage';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the analyst coverage page
export const metadata = generateSEOMetadata({
  title: "Analyst Coverage - Lupin | Investor Relations",
  description: "View analyst coverage and contact information for Lupin's investor relations team. Connect with financial analysts covering Lupin.",
  canonicalUrl: "https://www.lupin.com/analyst-coverage",
  keywords: "Lupin analyst coverage, investor relations, financial analysts, stock analysis",
});

export default function AnalystCoveragePage() {
  return (
    <div style={{ position: 'relative' }}>
      <Header />
      <Hero />
      <AnalystCoverage />
      <Footer />
    </div>
  );
}

