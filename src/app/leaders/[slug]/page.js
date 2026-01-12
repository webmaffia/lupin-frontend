import InnerBanner from '@/components/InnerBanner';
import LeaderDetails from '@/components/LeaderDetails';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the leader details page
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams || {};
  
  // In a real app, you would fetch leader data here
  const leaderName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Leader';
  
  return generateSEOMetadata({
    title: `${leaderName} - Leader Details | Lupin`,
    description: `Learn about ${leaderName}, their background, education, and role at Lupin Limited.`,
    canonicalUrl: `https://www.lupin.com/leaders/${slug || ''}`,
    keywords: `Lupin leadership, ${leaderName}, executive team, board of directors, Lupin Limited`,
  });
}

export default async function LeaderDetailsPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams || {};

  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Leader",
      line2: "Details"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Leader Details"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // In a real app, you would fetch leader data based on slug
  // For now, using default data
  const leaderData = {
    name: "Vinita Gupta",
    title: "Chief Executive Officer",
    image: {
      url: "/assets/committees-board/vinita-gupta.png",
      alt: "Vinita Gupta"
    },
    biography: "Ms. Gupta joined Lupin in 1992 and has been instrumental in shaping and executing the company's growth strategy that resulted in Lupin becoming a global pharmaceutical powerhouse. Ms. Gupta has led the company's global expansion through a combination of organic growth and strategic acquisitions. She also serves on the Global Advisory Board at Northwestern University's Kellogg School of Management. In recognition of her contribution to the pharmaceutical industry, Ms. Vinita has received several coveted global awards.",
    education: [
      "Pharmacy Graduate, University of Mumbai",
      "MBA, Kellogg School of Management at Northwestern University, Illinois"
    ],
    personalDetails: {
      age: "56 years",
      nationality: "Indian",
      appointed: "August 17, 2001",
      tenure: "23 years"
    },
    committeeMembership: "Member of the Sustainability and Corporate Social Responsibility Committee, Risk Management Committee and Strategy Committee.",
    appointmentResolutionUrl: "#",
    otherDirectorshipsUrl: "#"
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <LeaderDetails data={leaderData} />
    </div>
  );
}

