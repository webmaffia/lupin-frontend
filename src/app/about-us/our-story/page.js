import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/our-story.scss';

// Generate metadata for the our-story page
export const metadata = generateSEOMetadata({
  title: "Our Story - Lupin | Five Decades of Transforming Healthcare",
  description: "Discover Lupin's journey from a small pharmaceutical company in 1968 to a global leader in healthcare. Learn about our milestones, innovations, and commitment to making quality medicines accessible worldwide.",
  canonicalUrl: "https://www.lupin.com/about-us/our-story",
  keywords: "Lupin history, pharmaceutical company story, Lupin journey, healthcare transformation, pharmaceutical milestones, Lupin Limited history",
});

export default function OurStoryPage() {
  // Default banner data
  const bannerData = {
    title: {
      line1: "Our Story",
    },
    subheading: {
      enabled: true,
      text: "Five Decades of Transforming Healthcare"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Our Story - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  return <InnerBanner data={bannerData} />;
}

