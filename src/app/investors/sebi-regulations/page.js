import InnerBanner from '@/components/InnerBanner';
import SEBIRegulations from '@/components/SEBIRegulations';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the SEBI Regulations page
export const metadata = generateSEOMetadata({
  title: "SEBI Regulations - Lupin | Investor Relations",
  description: "View disclosures under Regulation 46 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 for Lupin Limited.",
  canonicalUrl: "https://www.lupin.com/investors/sebi-regulations",
  keywords: "SEBI regulations, Regulation 46, investor relations, disclosures, Lupin Limited, SEBI compliance",
});

export default function SEBIRegulationsPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "SEBI",
      line2: "Regulations"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "SEBI Regulations"
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
      <SEBIRegulations />
    </div>
  );
}


