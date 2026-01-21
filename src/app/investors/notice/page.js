import InnerBanner from '@/components/InnerBanner';
import Notice from '@/components/Notice';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getNotice, mapNoticeData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the notice page
export const metadata = generateSEOMetadata({
  title: "Notice - Lupin | Investor Relations",
  description: "View Lupin's corporate notices and important announcements for investors.",
  canonicalUrl: "https://www.lupin.com/investors/notice",
  keywords: "Lupin notices, corporate announcements, investor notices, Lupin investor relations",
});

export default async function NoticePage() {
  let noticeData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getNotice();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Notice - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasNoticeSection: !!(rawData?.data?.NoticeSection || rawData?.NoticeSection),
        sectionsCount: (rawData?.data?.NoticeSection || rawData?.NoticeSection || []).length
      });
    }
    
    if (rawData) {
      noticeData = mapNoticeData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Notice - Mapped data:', {
          noticesCount: noticeData?.notices?.length || 0,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Notice - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch notice data from Strapi';
    console.error('Error fetching Notice data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  
  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <Notice data={noticeData} error={error} />
      <SubscriberUpdated />
    </div>
  );
}

