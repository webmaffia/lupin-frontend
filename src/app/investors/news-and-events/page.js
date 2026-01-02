import InnerBanner from '@/components/InnerBanner';
import WhatsNew from '@/components/WhatsNew';
import MeetingVideo from '@/components/MeetingVideo';
import Events from '@/components/Events';
import Presentations from '@/components/Presentations';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getHomepage } from '@/lib/strapi';

// Generate metadata for the News and Events page
export const metadata = generateSEOMetadata({
  title: "News and Events - Lupin | Investor Relations",
  description: "Stay updated with the latest news, events, and investor updates from Lupin Limited. Subscribe to receive investor relations updates.",
  canonicalUrl: "https://www.lupin.com/investors/news-and-events",
  keywords: "Lupin news, investor events, corporate announcements, financial updates, investor relations, Lupin Limited",
});

export default async function NewsAndEventsPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "News and",
      line2: "Events"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "News and Events"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

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

  // Fetch subscriber data from Strapi (optional - component has default data)
  let subscriberData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
    // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscriber-updated`);
    // subscriberData = await response.json();
  } catch (error) {
    console.error('Error fetching subscriber data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch meeting video data from Strapi (optional - component has default data)
  let meetingVideoData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching meeting video data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch events data from Strapi (optional - component has default data)
  let eventsData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching events data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch presentations data from Strapi (optional - component has default data)
  let presentationsData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching presentations data from Strapi:', error);
    // Will use default data from component
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <WhatsNew data={whatsNewData} className="whats-new--light-bg" />
      <MeetingVideo data={meetingVideoData} />
      <Events data={eventsData} />
      <Presentations data={presentationsData} />
      <SubscriberUpdated data={subscriberData} />
    </div>
  );
}


