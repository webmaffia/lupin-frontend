import InnerBanner from '@/components/InnerBanner';
import LeaderProfile from '@/components/global/LeaderProfile';
import SquareLeaderProfile from '@/components/global/SquareLeaderProfile';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapTopBannerData } from '@/lib/strapi';
import { getLeaders, getLeadership, mapLeadersData } from '@/lib/strapi-reports';
import '@/scss/pages/leaders.scss';

// Generate metadata for the Leaders page
export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Leaders - Lupin | Our Leadership Team",
    description: "Meet the leadership team at Lupin, driving innovation and excellence in the pharmaceutical industry.",
    canonicalUrl: "https://www.lupin.com/about-us/leadership",
    keywords: "Lupin leaders, leadership team, executives, management, Lupin Limited, pharmaceutical leadership",
  });
}

export default async function LeadersPage() {
  // Fetch data from Strapi
  let bannerData = null;
  let mappedLeadersData = null;

  try {
    // Fetch banner from leadership endpoint
    const leadershipData = await getLeadership();
    const leadershipDataObj = leadershipData?.data || leadershipData;
    if (leadershipDataObj?.TopBanner) {
      bannerData = mapTopBannerData(leadershipDataObj.TopBanner);
    }

    // Fetch leaders data
    const leadersStrapiData = await getLeaders();
    
    // Map leaders data (separates into boardOfDirectors and managementTeam)
    mappedLeadersData = mapLeadersData(leadersStrapiData);
  } catch (error) {
    console.error('Error fetching leaders data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Leaders",
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Leaders"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Use mapped leaders data or fallback to defaults
  const boardOfDirectors = mappedLeadersData?.boardOfDirectors && mappedLeadersData.boardOfDirectors.length > 0
    ? mappedLeadersData.boardOfDirectors
    : [
    {
      id: 1,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 2,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 3,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 4,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 5,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 6,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 7,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    },
    {
      id: 8,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/about-us/leadership/manju-d-gupta"
    }
  ];

  const managementTeam = mappedLeadersData?.managementTeam && mappedLeadersData.managementTeam.length > 0
    ? mappedLeadersData.managementTeam
    : [
    {
      id: 1,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 2,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 3,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 4,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 5,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 6,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 7,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    },
    {
      id: 8,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/about-us/leadership/abdelaziz-toumi"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      {boardOfDirectors.length > 0 && (
        <section className="board-of-directors">
          <div className="board-of-directors__container">
            <h2 className="board-of-directors__heading">Board of Directors</h2>
            <div className="board-of-directors__grid">
              {boardOfDirectors.map((leader) => (
                <LeaderProfile
                  key={leader.id || leader.name}
                  id={leader.id}
                  name={leader.name}
                  title={leader.title || leader.position}
                  image={leader.image || { url: '/assets/placeholder.png', alt: leader.name }}
                  link={leader.link || `/about-us/leadership/${leader.slug || leader.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {managementTeam.length > 0 && (
        <section className="board-of-directors management-team">
          <div className="board-of-directors__container">
            <h2 className="board-of-directors__heading">The Management Team</h2>
            <div className="board-of-directors__grid">
              {managementTeam.map((leader) => (
                <SquareLeaderProfile
                  key={leader.id || leader.name}
                  id={leader.id}
                  name={leader.name}
                  title={leader.title || leader.position}
                  image={leader.image || { url: '/assets/placeholder.png', alt: leader.name }}
                  link={leader.link || `/about-us/leadership/${leader.slug || leader.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

