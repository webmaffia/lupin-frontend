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
import { mapTopBannerData, mapSpecialtyIntroData, mapSpecialtyHeadingData, mapSpecialtyUnitedStatesData, mapSpecialtyEuropeData, mapSpecialtyCanadaData, mapSpecialtyBrazilData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/specialty.scss';

// Generate metadata for the Specialty page
export const metadata = generateSEOMetadata({
  title: "Specialty - Lupin | Specialty Pharmaceuticals & Advanced Therapeutics",
  description: "Discover Lupin's specialty pharmaceutical portfolio, including advanced therapeutics, complex generics, and innovative treatment solutions across multiple therapeutic areas.",
  canonicalUrl: "https://www.lupin.com/our-business/specialty",
  keywords: "Lupin specialty, specialty pharmaceuticals, advanced therapeutics, complex generics, specialty medicines, innovative treatments, therapeutic solutions",
});

export default async function SpecialtyPage() {
  // Fetch data from Strapi with specific populate query (single API call)
  const populateQuery = 'populate[hero][populate]=*&populate[intro][populate]=*&populate[snapshotSection][populate][snapshot][populate][cta][populate]=*&populate[snapshotSection][populate][snapshot][populate][moreInfo][populate]=*';

  let strapiData = null;
  let bannerData = null;
  let specialtyIntroData = null;
  let specialtyHeadingData = null;
  let unitedStatesData = null;
  let europeData = null;
  let canadaData = null;
  let brazilData = null;

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

    // Map each region's data separately
    unitedStatesData = mapSpecialtyUnitedStatesData(strapiData);
    europeData = mapSpecialtyEuropeData(strapiData);
    canadaData = mapSpecialtyCanadaData(strapiData);
    brazilData = mapSpecialtyBrazilData(strapiData);
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

  // Default United States data if Strapi data is not available
  if (!unitedStatesData) {
    unitedStatesData = {
      heading: "United States",
      paragraphs: [
        "With an extensive supply-chain network and deep roots in science, our U.S. specialty business has established a strong presence in the respiratory segment with the addition of asthma and COPD brands, including Xopenex HFA® and Brovana®.",
        "Brovana is our specialty respiratory medication for long-term maintenance treatment of chronic obstructive pulmonary disease (COPD). It contains arformoterol, a long-acting beta-2 agonist that works by relaxing airway muscles to improve airflow and breathing. Administered via nebulization, Brovana is designed to improve pulmonary function in patients.",
        "Xopenex HFA is our specialty prescription respiratory drug that acts as a bronchodilator and delivers levalbuterol via an inhaler. This medication supports acute symptom management while helping in long-term respiratory care.",
        "Going forward, Lupin's U.S. business aims to grow with an intent to care and to act with purpose. We are poised to lead with patient-centricity and a well-balanced portfolio in the specialty segment, targeting high-burden areas with very few players."
      ],
      buttons: [
        {
          text: "Know more about Brovana here",
          href: "#",
          variant: "outline"
        },
        {
          text: "Know more about Xopenex HFA here",
          href: "#",
          variant: "outline"
        },
        {
          text: "Visit our Lupin U.S. website",
          href: "#",
          variant: "filled"
        }
      ]
    };
  }

  // Default Europe data if Strapi data is not available
  if (!europeData) {
    europeData = {
      heading: "Europe",
      paragraphs: [
        "Lupin continues to expand in specialty medication across Europe. With NaMuscla, Lupin's flagship specialty neurology therapy, we are addressing the unmet needs of patients who have rare and debilitating neuromuscular disorders. Approved by the European Medicines Agency to treat symptomatic myotonia in adults with non-dystrophic myotonic disorders, the product reflects Lupin's innovation prowess in areas with limited treatment options.",
        "We are accelerating access to NaMuscla across key European markets, with the help of Lupin Neurosciences, our European subsidiary, headquartered in Zug, Switzerland.",
        "The business is advancing pediatric development through clinical trials to broaden NaMuscula's therapeutic potential. We are also conducting new studies to assess NaMuscula's broader capabilities in treating myotonic dystrophy, helping patients regain their mobility.",
        "This sustained investment showcases our focus on improving mobility, functional outcomes, and quality of life for patients in the CNS segment.",
        "Lupin is expanding its specialty ophthalmology business with the acquisition of VISUfarma from GHO Capital, a pan-European ophthalmic firm with an established portfolio of 60+ branded eye health products.",
        "This strategic expansion increases our presence in key markets, including Italy, the UK, Spain, Germany, and France. It also widens our offerings in areas such as dry eye, glaucoma, eyelid hygiene, blepharitis, retinal health, and nutraceuticals tailored for ophthalmologists.",
        "The acquisition supports Lupin's long-term specialty growth strategy by tapping into the growing global demand for advanced eye care, driven by the aging population and rising diabetes-related complications."
      ],
      buttons: [
        {
          text: "You can find out more about Lupin Lifesciences and NaMuscula here",
          href: "#",
          variant: "filled"
        }
      ]
    };
  }

  // Default Canada data if Strapi data is not available
  if (!canadaData) {
    canadaData = {
      heading: "Canada",
      paragraphs: [
        "Lupin's Canadian subsidiary is expanding its portfolio and broadening its footprint by specializing in gastroenterology and women's health segments. 60% of this business is driven by our specialty focus, with key products including Zaxine®, Relistor®, and Intrarosa®.",
        "To expand our specialty niche, we recently acquired Nalcrom® from Sanofi and in-licensed three branded products for Attention-Deficit/Hyperactivity Disorder (ADHD)."
      ],
      buttons: [
        {
          text: "Read more on Lupin's Canada subsidiary",
          href: "#",
          variant: "filled"
        }
      ]
    };
  }

  // Default Brazil data if Strapi data is not available
  if (!brazilData) {
    brazilData = {
      heading: "Brazil",
      paragraphs: [
        "Lupin's Brazil subsidiary, MedQuímica, has entered the specialty segment through our rare-disease therapy, Cuprimine. The medication is used to treat the rare genetic disorder, Wilson's disease, which is characterized by excess copper in the body that can cause liver damage and CNS dysfunction.",
        "Our smart research methodologies, along with a resilient supply chain, position us well to drive continued growth and improve access in the rare diseases segment through our specialty treatments."
      ],
      buttons: [
        {
          text: "Know more about Cuprimine",
          href: "#",
          variant: "outline"
        }
      ]
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />

      <SpecialtyIntro data={specialtyIntroData} />

      <SpecialtyHeading data={specialtyHeadingData} />

      <SpecialtyContent>
        <SpecialtyUnitedStates data={unitedStatesData} />
      </SpecialtyContent>

      <SpecialtyEurope data={europeData} />

      <SpecialtyContent>
        <SpecialtyCanada data={canadaData} />
      </SpecialtyContent>

      <SpecialtyBrazil data={brazilData} />

      <SpecialtyCTA />
    </div>
  );
}

