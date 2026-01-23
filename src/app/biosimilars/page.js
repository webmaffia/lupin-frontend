import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Biosimilars page
export const metadata = generateSEOMetadata({
  title: "Biosimilars - Lupin | Biologics & Biosimilar Products",
  description: "Discover Lupin's biosimilar products and biologics portfolio. Learn about our commitment to providing affordable, high-quality biosimilar treatments for patients worldwide.",
  canonicalUrl: "https://www.lupin.com/biosimilars",
  keywords: "biosimilars, biologics, Lupin biosimilars, biosimilar products, biologic medicines, Lupin Limited biosimilars",
});

export default function BiosimilarsPage() {
  const bannerData = {
    title: {
      line1: "Biosimilars",
      line2: "",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Biosimilars - Lupin"
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
    </div>
  );
}

