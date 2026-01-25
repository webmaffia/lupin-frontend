import InnerBanner from '@/components/InnerBanner';
import OurStoryAlternatingSection from '@/components/OurStoryAlternatingSection';
import OurStoryDidYouKnow from '@/components/OurStoryDidYouKnow';
import OurStorySection from '@/components/OurStorySection';
import AwardsAndRecognitionSection from '@/components/AwardsAndRecognitionSection';
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

  // Sections data array
  const sections = [
    {
      image: "/assets/images/our-story/1.png",
      text: <>After completing his post-graduate studies in science, <strong>Dr. Gupta</strong> chose a path that went beyond academia. While teaching at the Birla Institute of Technology and Science in Pilani, Rajasthan, he recognized the urgent need to translate scientific knowledge into practical solutions for public health.</>,
      imageAlt: "Dr. Gupta and team at early Lupin facility"
    },
    {
      image: "/assets/images/our-story/2.png",
      text: "From its very inception, Lupin was envisioned as a company that would place community health at its core. Lupin started operations as a manufacturer of vitamins and soon started producing drugs to combat tuberculosis.",
      imageAlt: "Lupin early operations and community health focus"
    },
    {
      image: "/assets/images/our-story/3.png",
      text: "Lupin's first manufacturing facility focused on producing iron and folic acid tablets for the Indian Government's flagship maternal and child health program. These early efforts laid the foundation for what Lupin continues to stand for today: Science-led innovation guided by compassion, purpose, and commitment to improving lives.",
      imageAlt: "Lupin's first manufacturing facility"
    },
    {
      image: "/assets/images/our-story/4.png",
      text: "Guided by this belief, Lupin's commitment to social responsibility took an institutional form with the establishment of the Lupin Foundation. Lupin Human Welfare and Research Foundation is dedicated to rural development and community well-being, translating our founder's philosophy of selfless service into a sustained movement.",
      imageAlt: "Lupin Foundation and community development"
    }
  ];

  return (
    <>
      <InnerBanner data={bannerData} />
      {sections.map((section, index) => (
        <OurStoryAlternatingSection
          key={index}
          {...section}
          isEven={index % 2 === 1}
        />
      ))}
      <OurStoryDidYouKnow />
      <OurStorySection />
      <AwardsAndRecognitionSection />

    </>
  );
}

