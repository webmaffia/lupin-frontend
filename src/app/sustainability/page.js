import InnerBanner from '@/components/InnerBanner';
import SustainabilityIntro from '@/components/sustainability/SustainabilityIntro';
import OurPlanet from '@/components/sustainability/OurPlanet';
import OurPeople from '@/components/sustainability/OurPeople';
import OurPatients from '@/components/sustainability/OurPatients';
import ESGRatingsSection from '@/components/sustainability/ESGRatingsSection';
import ESGGovernanceSection from '@/components/sustainability/ESGGovernanceSection';
import ESGInfographicSection from '@/components/sustainability/ESGInfographicSection';
import SustainabilityCTASection from '@/components/sustainability/SustainabilityCTASection';
import GlobalFrameworksSection from '@/components/sustainability/GlobalFrameworksSection';
import LookingAheadSection from '@/components/sustainability/LookingAheadSection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/sustainability.scss';

// Generate metadata for the Sustainability page
export const metadata = generateSEOMetadata({
  title: "Sustainability - Lupin | ESG Commitment & Environmental Responsibility",
  description: "Discover Lupin's commitment to sustainability through our ESG framework. Learn about our environmental initiatives, social impact programs, and sustainable healthcare solutions for our planet, people, and patients.",
  canonicalUrl: "https://www.lupin.com/sustainability",
  keywords: "Lupin sustainability, ESG, environmental responsibility, carbon reduction, water management, waste management, biodiversity, social impact, sustainable healthcare",
});

export default function SustainabilityPage() {
  // Banner data for InnerBanner
  const bannerData = {
    title: {
      line1: "Sustainability",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Sustainability"
      },
      bannerMobile: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Sustainability"
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
      
      <SustainabilityIntro />
      <OurPlanet />
      <OurPeople />
      <OurPatients />
      <ESGRatingsSection />
      <ESGGovernanceSection />
      <ESGInfographicSection />
      <SustainabilityCTASection />
      <GlobalFrameworksSection />
      <LookingAheadSection />
    </div>
  );
}

