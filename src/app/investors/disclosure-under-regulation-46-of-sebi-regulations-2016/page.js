import InnerBanner from '@/components/InnerBanner';
import SEBIRegulations from '@/components/SEBIRegulations';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Disclosure under Regulation 46 of SEBI Regulations, 2016 page
export const metadata = generateSEOMetadata({
  title: "Disclosure under Regulation 46 of SEBI Regulations, 2016 - Lupin | Investor Relations",
  description: "View disclosures under Regulation 46 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2016 for Lupin Limited.",
  canonicalUrl: "https://www.lupin.com/investors/disclosure-under-regulation-46-of-sebi-regulations-2016",
  keywords: "SEBI regulations, Regulation 46, investor relations, disclosures, Lupin Limited, SEBI compliance, 2016",
});

export default function DisclosureRegulation46Page() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Disclosure under",
      line2: "Regulation 46"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Disclosure under Regulation 46 of SEBI Regulations, 2016"
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


