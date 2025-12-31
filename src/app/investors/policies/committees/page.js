import InnerBanner from '@/components/InnerBanner';
import CommitteesBoard from '@/components/CommitteesBoard';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the committees page
export const metadata = generateSEOMetadata({
  title: "Committees of the Board - Lupin | Corporate Governance",
  description: "View Lupin's board committees including Strategy Committee and Audit Committee members and their roles.",
  canonicalUrl: "https://www.lupin.com/investors/policies/committees",
  keywords: "Lupin committees, board committees, strategy committee, audit committee, corporate governance, board members",
});

export default async function CommitteesPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Committees of",
      line2: "the Board"
    }
  };

  // Fetch committees data from Strapi
  let committeesData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
    // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/committees-board`);
    // committeesData = await response.json();
  } catch (error) {
    console.error('Error fetching committees data from Strapi:', error);
    // Will use default data from component
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <CommitteesBoard data={committeesData} />
    </div>
  );
}

