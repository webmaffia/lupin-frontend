import InnerBanner from '@/components/InnerBanner';
import SpecialtyIntro from '@/components/specialty/SpecialtyIntro';
import SpecialtyHeading from '@/components/specialty/SpecialtyHeading';
import SpecialtyContent from '@/components/specialty/SpecialtyContent';
import SpecialtyUnitedStates from '@/components/specialty/SpecialtyUnitedStates';
import SpecialtyEurope from '@/components/specialty/SpecialtyEurope';
import SpecialtyCanada from '@/components/specialty/SpecialtyCanada';
import SpecialtyBrazil from '@/components/specialty/SpecialtyBrazil';
import SpecialtyCTA from '@/components/specialty/SpecialtyCTA';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/specialty.scss';

// Generate metadata for the Specialty page
export const metadata = generateSEOMetadata({
  title: "Specialty - Lupin | Specialty Pharmaceuticals & Advanced Therapeutics",
  description: "Discover Lupin's specialty pharmaceutical portfolio, including advanced therapeutics, complex generics, and innovative treatment solutions across multiple therapeutic areas.",
  canonicalUrl: "https://www.lupin.com/our-business/specialty",
  keywords: "Lupin specialty, specialty pharmaceuticals, advanced therapeutics, complex generics, specialty medicines, innovative treatments, therapeutic solutions",
});

export default function SpecialtyPage() {
  // Banner data for InnerBanner
  const bannerData = {
    title: {
      line1: "Specialty",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Specialty"
      },
      bannerMobile: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Specialty"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Specialty intro data
  const specialtyIntroData = {
    text: "Lupin's specialty business is backed by in-depth research and robust manufacturing capabilities. Driven by a steady supply and smart marketing, we have expanded our commercial standing globally with a diverse portfolio across therapy areas such as respiratory, ophthalmology and CNS."
  };

  // Specialty heading data
  const specialtyHeadingData = {
    text: "Here is a snapshot of our footprint in the specialty segment"
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      
      <SpecialtyIntro data={specialtyIntroData} />
      
      <SpecialtyHeading data={specialtyHeadingData} />
      
      <SpecialtyContent>
        <SpecialtyUnitedStates />
      </SpecialtyContent>
      
      <SpecialtyEurope />
      
      <SpecialtyContent>
        <SpecialtyCanada />
      </SpecialtyContent>
      
      <SpecialtyBrazil />
      
      <SpecialtyCTA />
    </div>
  );
}

