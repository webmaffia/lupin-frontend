import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getGlobalPresence, mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/global-presence.scss';

// Generate metadata for the Global Presence page
export const metadata = generateSEOMetadata({
  title: "Global Presence - Lupin | Worldwide Pharmaceutical Operations",
  description: "Discover Lupin's global presence and operations across multiple continents. Learn about our international markets, manufacturing facilities, and commitment to delivering quality healthcare worldwide.",
  canonicalUrl: "https://www.lupin.com/global-presence",
  keywords: "Lupin global presence, international operations, worldwide pharmaceutical, global markets, Lupin Limited, international healthcare",
});

export default async function GlobalPresencePage() {
  // Fetch data from Strapi
  let bannerData = null;

  try {
    const strapiData = await getGlobalPresence();
    
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
  } catch (error) {
    console.error('Error fetching global-presence data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Global Presence",
      },
      subheading: {
        enabled: true,
        text: "Delivering Quality Healthcare Across the World"
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Global Presence - Lupin"
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
      <section className="global-presence-content">
        <div className="global-presence-content__container">
          <div className="global-presence-content__wrapper">
            {/* Content will be added based on design */}
            <div className="global-presence-content__placeholder">
              <p>Content will be added based on design</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

