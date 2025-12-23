import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import OurPurpose from '@/components/OurPurpose';
import Overview from '@/components/Overview';
import OurBusiness from '@/components/OurBusiness';
import Investors from '@/components/Investors';
import Sustainability from '@/components/Sustainability';
import CSR from '@/components/CSR';
import Life from '@/components/Life';
import NewsInsights from '@/components/NewsInsights';
import Footer from '@/components/Footer';
import GoldenLine from '@/components/GoldenLine';
import { generateMetadata as generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo';

// Generate metadata for the home page
export const metadata = generateSEOMetadata({
  title: "Lupin - Global Pharmaceutical Leader | Innovations in Healthcare",
  description: "Lupin is a leading pharmaceutical company committed to improving lives through innovative medicines, global reach, and sustainable healthcare solutions across 100+ countries.",
  canonicalUrl: "https://www.lupin.com", // Update with your actual domain
  keywords: "Lupin, pharmaceutical, healthcare, medicines, global pharma, innovation, sustainability",
});

export default async function Home() {
  // Generate structured data for SEO
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <div style={{ position: 'relative' }}>
        <GoldenLine />
        <Header />
        <Hero />
        <main>
          <OurStory />
          <OurPurpose />
          <Overview />
          <OurBusiness />
          <Investors />
          <Sustainability />
          <CSR />
          <Life />
          <NewsInsights />
        </main>
        <Footer />
      </div>
    </>
  );
}
