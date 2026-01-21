import InnerBanner from '@/components/InnerBanner';
import CommitteesBoard from '@/components/CommitteesBoard';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getCommittee, getLeaders, mapCommitteesData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the committees page
export const metadata = generateSEOMetadata({
  title: "Committees of the Board - Lupin | Corporate Governance",
  description: "View Lupin's board committees including Strategy Committee and Audit Committee members and their roles.",
  canonicalUrl: "https://www.lupin.com/investors/committees",
  keywords: "Lupin committees, board committees, strategy committee, audit committee, corporate governance, board members",
});

export default async function CommitteesPage() {
  let committeesData = null;
  let bannerData = null;
  let error = null;
  
  try {
    // Fetch banner from /api/committee
    const committeeRawData = await getCommittee();
    
    // Fetch leaders from /api/leaders
    const leadersRawData = await getLeaders();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Committees - Raw API data received:', {
        hasCommitteeData: !!committeeRawData,
        hasLeadersData: !!leadersRawData,
        isLeadersArray: Array.isArray(leadersRawData?.data),
        leadersCount: Array.isArray(leadersRawData?.data) ? leadersRawData.data.length : 0,
        hasTopBanner: !!(committeeRawData?.data?.TopBanner || committeeRawData?.TopBanner)
      });
    }
    
    if (leadersRawData) {
      // Map leaders data and group by LeadershipType
      committeesData = mapCommitteesData(leadersRawData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Committees - Mapped data:', {
          committeesCount: committeesData?.committees?.length || 0,
          committees: committeesData?.committees?.map(c => ({
            title: c.title,
            membersCount: c.members.length
          }))
        });
      }
    } else {
      error = 'No leaders data received from Strapi API';
      console.error('Committees - Leaders API returned empty response');
    }
    
    // Map banner data from committee API
    if (committeeRawData) {
      const topBanner = committeeRawData?.data?.TopBanner || committeeRawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
    }
  } catch (err) {
    error = err.message || 'Failed to fetch committees data from Strapi';
    console.error('Error fetching Committees data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <CommitteesBoard data={committeesData} error={error} />
    </div>
  );
}

