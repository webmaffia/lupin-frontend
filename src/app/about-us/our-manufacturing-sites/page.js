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
  canonicalUrl: "https://www.lupin.com/about-us/our-manufacturing-sites",
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
      <ManufacturingCountrySection 
        data={{ 
          heading: "INDIA",
          sites: [
            {
              title: "Aurangabad",
              description: "Flagship facility manufacturing tablets, capsules, and suspensions.",
              address: {
                label: "Address",
                text: "A/28/1, MIDC Industrial Area, Chikalthana, Aurangabad – 431 210."
              }
            },
            {
              title: "Tarapur",
              description: "Produces fermentation-based and synthetic APIs.",
              address: {
                label: "Address",
                text: "T-142, MIDC, Tarapur, Boisar (West), Thane, Maharashtra – 401 506."
              }
            },
            {
              title: "Ankleshwar",
              description: "Produces intermediates and APIs; certified with global sustainability standards.",
              address: {
                label: "Address",
                text: "Plot No. 09, 123, 123/1, 124, 125, GIDC Estate, Ankleshwar, Gujarat – 393 002."
              }
            },
            {
              title: "Pune",
              description: "Biotech facility for biosimilars development and commercialization.",
              address: {
                label: "Address",
                text: "Gat No. 1156-1160, Village Ghotawade, Taluka-Mulshi, Pune-412115."
              }
            },
            {
              title: "Mandideep",
              description: "API and cephalosporin formulations manufacturing.",
              address: {
                label: "Address",
                text: "198-202, New Industrial Area No.2, Mandideep, Raisen, Madhya Pradesh – 462 046."
              }
            },
            {
              title: "Jammu",
              description: "Oral solid dosage and inhalation formulations.",
              address: {
                label: "Address",
                text: "EPIP Kartholi, SIDCO Industrial Complex, Bari Brahmana, Samba, Jammu & Kashmir – 181 133."
              }
            },
            {
              title: "Vadodara",
              description: "Potent & oral contraceptive APIs, oral solid dosage, ophthalmic, derma, and inhalation products.",
              address: {
                label: "Address",
                text: "Block 21, Village Dabhasa Ta-Padra, Vadodara – 391 440"
              }
            },
            {
              title: "Goa",
              description: "Complex formulations manufacturing.",
              address: {
                label: "Address",
                text: "B-15, Phase 1A, Verna Industrial Area, Verna, Salcette, Goa – 403 722."
              }
            },
            {
              title: "Visakhapatnam",
              description: "API manufacturing.",
              address: {
                label: "Address",
                text: "Plot No.130, Road No.11 J.N. Pharma City, Parawada (M) Visakhapatnam, Andhra Pradesh – 531 019"
              }
            },
            {
              title: "Sikkim",
              description: "Oral solid dosage and inhalation formulations.",
              address: {
                label: "Address",
                text: "4th Mile, Bhasmey, Duga Iilaka, East Sikkim – 737 132."
              }
            },
            {
              title: "Nagpur",
              description: "High-volume oral solid dosage and injectable facility.",
              address: {
                label: "Address",
                text: "Plot 6A, Sector 17, SEZ MIHAN Notified Area, Nagpur, Maharashtra – 441 108."
              }
            },
            {
              title: "Indore (Unit 1 & Unit 2)",
              description: "Flagship facility manufacturing tablets, capsules, and suspensions.",
              address: {
                label: "Address",
                text: "Unit 1 & Unit 2 Plot No. 2, Special Economic Zone Phase – II Miscellaneous Zone, Apparel Park Pithampur, Dhar, MP- 454 775"
              }
            },
            {
              title: "Indore (Unit 3)",
              description: "Flagship facility manufacturing tablets, capsules, and suspensions.",
              address: {
                label: "Address",
                text: "Unit 3 Plot No. M1, Special Economic Zone Phase – II, Miscellaneous Zone, Apparel Park Pithampur, Dhar, MP- 454 775"
              }
            }
          ]
        }} 
      />
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
