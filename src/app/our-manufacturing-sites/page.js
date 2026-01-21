import Image from 'next/image';
import InnerBanner from '@/components/InnerBanner';
import ManufacturingIntro from '@/components/ManufacturingIntro';
import ManufacturingCountrySection from '@/components/ManufacturingCountrySection';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapTopBannerData, mapManufacturingIntroData, fetchAPI } from '@/lib/strapi';
import '@/scss/pages/our-manufacturing-sites.scss';

// Generate metadata for the Our Manufacturing Sites page
export const metadata = generateSEOMetadata({
  title: "Our Manufacturing Sites - Lupin | State-of-the-Art Pharmaceutical Manufacturing Facilities",
  description: "Discover Lupin's state-of-the-art manufacturing facilities across the globe. Learn about our world-class production capabilities, quality standards, and commitment to pharmaceutical excellence.",
  canonicalUrl: "https://www.lupin.com/our-manufacturing-sites",
  keywords: "Lupin manufacturing sites, pharmaceutical manufacturing facilities, Lupin production plants, global manufacturing, pharmaceutical facilities, Lupin Limited",
});

export default async function OurManufacturingSitesPage() {
  // Fetch data from Strapi
  let bannerData = null;
  let introData = null;

  try {
    const strapiData = await fetchAPI('our-manufacturing-sites?populate=deep', {
      next: { revalidate: 60 },
    });
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
      
      // Add subheading if available
      if (data.TopBanner.subHeading && !bannerData.subheading) {
        bannerData.subheading = {
          enabled: true,
          text: data.TopBanner.subHeading
        };
      }
    }

    // Map IntroSection data
    introData = mapManufacturingIntroData(strapiData);
  } catch (error) {
    console.error('Error fetching our-manufacturing-sites data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Our Manufacturing",
        line2: "Sites"
      },
      subheading: {
        enabled: true,
        text: ""
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Our Manufacturing Sites - Lupin"
        },
        bannerMobile: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Our Manufacturing Sites - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <ManufacturingIntro data={introData} />
      <ManufacturingCountrySection data={{ heading: "INDIA" }} />
      <div className="manufacturing-regions-wrapper">
        <div className="manufacturing-regions-wrapper__map">
          <Image
            src="/assets/images/map2.svg"
            alt="World Map"
            width={881}
            height={1296}
            quality={100}
          />
        </div>
        <ManufacturingCountrySection 
          data={{ 
            heading: "NORTH AMERICA",
            showBackground: false,
            sites: [
              {
                title: "USA (Somerset)",
                description: "Tablet, capsule, powder, and liquid oral dosage forms.",
                address: {
                  label: "Address",
                  text: "400 Campus Drive, Somerset, NJ 08873."
                }
              }
            ]
          }} 
        />
        <ManufacturingCountrySection 
          data={{ 
            heading: "LATAM",
            fullWidth: true,
            showBackground: false,
            sites: [
              {
                title: "Mexico (Laboratorios Grin)",
                description: "Specialized ophthalmic and nasal dosage forms.",
                address: {
                  label: "Address",
                  text: "Rodriguez Saro 630, Col. Del Valle, Mexico City (CDMX), Mexico."
                }
              },
              {
                title: "Brazil (MedQuimica)",
                description: "Oral solid dosage and inhalation formulations.",
                address: {
                  label: "Address",
                  text: "255, Fernando Lamarca street District Industrial, Juiz de Fora city Minas Gerais State 36092-030"
                }
              }
            ]
          }} 
        />
      </div>
      {/* Additional content will be added here based on Figma design */}
    </div>
  );
}
