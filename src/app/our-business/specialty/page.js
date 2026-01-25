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
import { mapTopBannerData, mapSpecialtyIntroData, mapSpecialtyHeadingData, mapSpecialtySnapshotData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/specialty.scss';

// Generate metadata for the Specialty page
export const metadata = generateSEOMetadata({
  title: "Specialty - Lupin | Specialty Pharmaceuticals & Advanced Therapeutics",
  description: "Discover Lupin's specialty pharmaceutical portfolio, including advanced therapeutics, complex generics, and innovative treatment solutions across multiple therapeutic areas.",
  canonicalUrl: "https://www.lupin.com/our-business/specialty",
  keywords: "Lupin specialty, specialty pharmaceuticals, advanced therapeutics, complex generics, specialty medicines, innovative treatments, therapeutic solutions",
});

/**
 * Get the appropriate component for a region based on its title
 * @param {string} title - Region title
 * @param {object} data - Region data
 * @returns {JSX.Element|null} Component or null
 */
function getRegionComponent(title, data) {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes('united states') || normalizedTitle === 'united states') {
    return <SpecialtyUnitedStates data={data} />;
  } else if (normalizedTitle.includes('europe') || normalizedTitle === 'europe') {
    return <SpecialtyEurope data={data} />;
  } else if (normalizedTitle.includes('canada') || normalizedTitle === 'canada') {
    return <SpecialtyCanada data={data} />;
  } else if (normalizedTitle.includes('brazil') || normalizedTitle === 'brazil') {
    return <SpecialtyBrazil data={data} />;
  }

  return null;
}

/**
 * Determine if a region should be wrapped in SpecialtyContent
 * @param {string} title - Region title
 * @returns {boolean}
 */
function shouldWrapInContent(title) {
  const normalizedTitle = title.trim().toLowerCase();
  // United States and Canada are wrapped in SpecialtyContent
  return normalizedTitle.includes('united states') || normalizedTitle === 'united states' ||
    normalizedTitle.includes('canada') || normalizedTitle === 'canada';
}

export default async function SpecialtyPage() {
  // Fetch data from Strapi with specific populate query (single API call)
  const populateQuery = 'populate[hero][populate]=*&populate[intro][populate]=*&populate[snapshotSection][populate]=*';

  let strapiData = null;
  let bannerData = null;
  let specialtyIntroData = null;
  let specialtyHeadingData = null;
  let snapshotData = null;

  try {
    strapiData = await fetchAPI(`specialty?${populateQuery}`, {
      next: { revalidate: 60 },
    });

    // Extract data from response
    const data = strapiData?.data || strapiData;

    // Map hero data for InnerBanner
    if (data?.hero) {
      bannerData = mapTopBannerData(data.hero);
    } else if (data?.TopBanner) {
      // Fallback to old structure
      bannerData = mapTopBannerData(data.TopBanner);
    }

    // Map intro data
    specialtyIntroData = mapSpecialtyIntroData(strapiData);

    // Map heading data
    specialtyHeadingData = mapSpecialtyHeadingData(strapiData);

    // Map snapshot data
    snapshotData = mapSpecialtySnapshotData(strapiData);
  } catch (error) {
    console.error('Error fetching specialty data from Strapi:', error);
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Specialty",
        line2: ""
      },
      subHeading: {
        enabled: false,
        text: ""
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
  }

  // Default intro data if Strapi data is not available
  if (!specialtyIntroData) {
    specialtyIntroData = {
      text: "Lupin's specialty business is backed by in-depth research and robust manufacturing capabilities. Driven by a steady supply and smart marketing, we have expanded our commercial standing globally with a diverse portfolio across therapy areas such as respiratory, ophthalmology and CNS."
    };
  }

  // Default heading data if Strapi data is not available
  if (!specialtyHeadingData) {
    specialtyHeadingData = {
      text: "Here is a snapshot of our footprint in the specialty segment"
    };
  }

  // Default snapshot data if Strapi data is not available
  if (!snapshotData || !snapshotData.regions || snapshotData.regions.length === 0) {
    snapshotData = {
      regions: [
        {
          heading: "United States",
          paragraphs: [
            "With an extensive supply-chain network and deep roots in science, our U.S. specialty business has established a strong presence in the respiratory segment with the addition of asthma and COPD brands, including Xopenex HFA® and Brovana®.",
            "Brovana is our specialty respiratory medication for long-term maintenance treatment of chronic obstructive pulmonary disease (COPD). It contains arformoterol, a long-acting beta-2 agonist that works by relaxing airway muscles to improve airflow and breathing. Administered via nebulization, Brovana is designed to improve pulmonary function in patients."
          ],
          buttons: []
        },
        {
          heading: "Europe",
          paragraphs: [
            "Lupin continues to expand in specialty medication across Europe. With NaMuscla, Lupin's flagship specialty neurology therapy, we are addressing the unmet needs of patients who have rare and debilitating neuromuscular disorders."
          ],
          buttons: []
        },
        {
          heading: "Canada",
          paragraphs: [
            "Lupin's Canadian subsidiary is expanding its portfolio and broadening its footprint by specializing in gastroenterology and women's health segments."
          ],
          buttons: []
        },
        {
          heading: "Brazil",
          paragraphs: [
            "Lupin's Brazil subsidiary, MedQuímica, has entered the specialty segment through our rare-disease therapy, Cuprimine."
          ],
          buttons: []
        }
      ]
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />

      <SpecialtyIntro data={specialtyIntroData} />

      <SpecialtyHeading data={specialtyHeadingData} />

      {/* Dynamically render regions from API */}
      {snapshotData.regions.map((region, index) => {
        const regionComponent = getRegionComponent(region.heading, region);

        if (!regionComponent) return null;

        // Wrap United States and Canada in SpecialtyContent
        if (shouldWrapInContent(region.heading)) {
          return (
            <SpecialtyContent key={index}>
              {regionComponent}
            </SpecialtyContent>
          );
        }

        // Europe and Brazil are not wrapped
        return <div key={index}>{regionComponent}</div>;
      })}

      <SpecialtyCTA />
    </div>
  );
}

