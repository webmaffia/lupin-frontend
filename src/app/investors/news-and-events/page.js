import InnerBanner from '@/components/InnerBanner';
import WhatsNew from '@/components/WhatsNew';
import MeetingVideo from '@/components/MeetingVideo';
import Events from '@/components/Events';
import Presentations from '@/components/Presentations';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getHomepage } from '@/lib/strapi';
import { getNewsAndEvent, mapNewsAndEventData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the News and Events page
export const metadata = generateSEOMetadata({
  title: "News and Events - Lupin | Investor Relations",
  description: "Stay updated with the latest news, events, and investor updates from Lupin Limited. Subscribe to receive investor relations updates.",
  canonicalUrl: "https://www.lupin.com/investors/news-and-events",
  keywords: "Lupin news, investor events, corporate announcements, financial updates, investor relations, Lupin Limited",
});

export default async function NewsAndEventsPage() {
  let newsAndEventData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getNewsAndEvent();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('News and Event - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasAnnualGeneralMeetingSection: !!(rawData?.data?.AnnualGeneralMeetingSection || rawData?.AnnualGeneralMeetingSection),
        hasEventSection: !!(rawData?.data?.EventSection || rawData?.EventSection),
        hasPresentationSection: !!(rawData?.data?.PresentationSection || rawData?.PresentationSection)
      });
    }
    
    if (rawData) {
      newsAndEventData = mapNewsAndEventData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('News and Event - Mapped data:', {
          hasMeetingVideoSection: !!newsAndEventData?.meetingVideoSection,
          hasEventsSection: !!newsAndEventData?.eventsSection,
          hasPresentationsSection: !!newsAndEventData?.presentationsSection,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('News and Event - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch news and event data from Strapi';
    console.error('Error fetching News and Event data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Fetch What's New data from Strapi and set title to "Press Releases"
  // Default fallback card data (same structure as WhatsNew component default)
  const defaultWhatsNewItems = [
    {
      id: 1,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 2,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 3,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 4,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    }
  ];

  let whatsNewData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract What's New data if available in Strapi
    if (investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew) {
      const whatsNew = investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew;
      whatsNewData = {
        title: "Press Releases", // Custom title for this page
        items: whatsNew.items && whatsNew.items.length > 0 ? whatsNew.items : (whatsNew.news && whatsNew.news.length > 0 ? whatsNew.news : defaultWhatsNewItems)
      };
    } else {
      // Provide default data with custom title if Strapi data not available
      whatsNewData = {
        title: "Press Releases",
        items: defaultWhatsNewItems
      };
    }
  } catch (error) {
    console.error('Error fetching What\'s New data from Strapi:', error);
    // Provide default data with custom title
    whatsNewData = {
      title: "Press Releases",
      items: defaultWhatsNewItems
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <WhatsNew data={whatsNewData} className="whats-new--light-bg" />
      {newsAndEventData?.meetingVideoSection && <MeetingVideo data={newsAndEventData.meetingVideoSection} />}
      {newsAndEventData?.eventsSection && <Events data={newsAndEventData.eventsSection} />}
      {newsAndEventData?.presentationsSection && <Presentations data={newsAndEventData.presentationsSection} />}
      <SubscriberUpdated />
    </div>
  );
}


