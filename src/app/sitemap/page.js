import InnerBanner from '@/components/InnerBanner';
import SitemapContent from '@/components/SitemapContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Sitemap page
export const metadata = generateSEOMetadata({
  title: "Sitemap - Lupin | Website Navigation",
  description: "Browse the complete sitemap of Lupin's website. Find all pages, sections, and resources available on our site.",
  canonicalUrl: "https://www.lupin.com/site-map",
  keywords: "sitemap, website navigation, Lupin sitemap, site structure, website map",
});

export default function SitemapPage() {
  const bannerData = {
    title: {
      line1: "Site",
      line2: "map",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Sitemap - Lupin"
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
      <SitemapContent />
    </div>
  );
}

