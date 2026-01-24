import Image from 'next/image';
import InnerBanner from '@/components/InnerBanner';
import GlobalPresenceContent from '@/components/GlobalPresenceContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getGlobalPresence, mapGlobalPresenceData } from '@/lib/strapi-pages';
import '@/scss/pages/global-presence.scss';

// Generate metadata for the Global Presence page
export const metadata = generateSEOMetadata({
  title: "Global Presence - Lupin | Worldwide Pharmaceutical Operations",
  description: "Discover Lupin's global presence and operations across multiple continents. Learn about our international markets, manufacturing facilities, and commitment to delivering quality healthcare worldwide.",
  canonicalUrl: "https://www.lupin.com/about-us/global-presence",
  keywords: "Lupin global presence, international operations, worldwide pharmaceutical, global markets, Lupin Limited, international healthcare",
});

export default async function GlobalPresencePage() {
  // Static banner data (keeping as static as requested)
  const bannerData = {
    title: {
      line1: "Global Presence",
    },
    subheading: {
      enabled: true,
      text: ""
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

  let globalPresenceData = null;
  let error = null;
  
  try {
    const rawData = await getGlobalPresence();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Global Presence - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasPageIntroSection: !!(rawData?.data?.PageIntroSection || rawData?.PageIntroSection),
        hasGlobalPresenceSection: !!(rawData?.data?.GlobalPresenceSection || rawData?.GlobalPresenceSection)
      });
    }
    
    if (rawData) {
      globalPresenceData = mapGlobalPresenceData(rawData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Global Presence - Mapped data:', {
          hasPageIntro: !!globalPresenceData?.pageIntro,
          sectionsCount: globalPresenceData?.globalPresenceSections?.length || 0
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Global Presence - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch global presence data from Strapi';
    console.error('Error fetching Global Presence data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>

      <div style={{ width: '100%', position: 'relative' }}>
        <Image
          src="/assets/global-presence/Map ok bro.svg"
          alt="Global Presence Map"
          width={1920}
          height={1080}
          style={{ width: '100%', height: 'auto' }}
          quality={100}
          priority
        />
      </div>
      <GlobalPresenceContent data={globalPresenceData} error={error} />
    </div>
  );
}
