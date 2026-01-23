import InnerBanner from '@/components/InnerBanner';
import LeaderProfile from '@/components/global/LeaderProfile';
import SquareLeaderProfile from '@/components/global/SquareLeaderProfile';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getLeaders, mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/leaders.scss';

// Generate metadata for the Leaders page
export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Leaders - Lupin | Our Leadership Team",
    description: "Meet the leadership team at Lupin, driving innovation and excellence in the pharmaceutical industry.",
    canonicalUrl: "https://www.lupin.com/leaders",
    keywords: "Lupin leaders, leadership team, executives, management, Lupin Limited, pharmaceutical leadership",
  });
}

export default async function LeadersPage() {
  // Fetch data from Strapi
  let bannerData = null;
  let leadersData = null;
  let managementTeamData = null;

  try {
    const strapiData = await getLeaders();

    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }

    // Extract leaders data
    leadersData = data?.leaders || data?.Leaders || null;

    // Extract management team data
    managementTeamData = data?.managementTeam || data?.ManagementTeam || null;
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

  // Default leaders data if Strapi data is not available
  const defaultLeaders = leadersData || [
    {
      id: 1,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 2,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 3,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 4,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 5,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 6,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 7,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    },
    {
      id: 8,
      name: "Manju D Gupta",
      title: "Chairperson (Non-Executive)",
      image: {
        url: "/assets/leaders/manju-gupta 1.png",
        alt: "Manju D Gupta"
      },
      link: "/leaders/manju-d-gupta"
    }
  ];

  // Default management team data if Strapi data is not available
  const defaultManagementTeam = managementTeamData || [
    {
      id: 1,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 2,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 3,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 4,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 5,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 6,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 7,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    },
    {
      id: 8,
      name: "Dr. Abdelaziz Toumi",
      title: "CEO - Lupin Manufacturing\nSolutions",
      image: {
        url: "/assets/leaders/a7b770ae42eb8e5fe8892577ae654536fc4d12b1.png",
        alt: "Dr. Abdelaziz Toumi"
      },
      link: "/leaders/abdelaziz-toumi"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="board-of-directors">
        <div className="board-of-directors__container">
          <h2 className="board-of-directors__heading">Board of Directors</h2>
          <div className="board-of-directors__grid">
            {defaultLeaders.map((leader) => (
              <LeaderProfile
                key={leader.id || leader.name}
                id={leader.id}
                name={leader.name}
                title={leader.title || leader.position}
                image={leader.image || { url: '/assets/placeholder.png', alt: leader.name }}
                link={leader.link || `/leaders/${leader.slug || leader.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="board-of-directors management-team">
        <div className="board-of-directors__container">
          <h2 className="board-of-directors__heading">The Management Team</h2>
          <div className="board-of-directors__grid">
            {defaultManagementTeam.map((leader) => (
              <SquareLeaderProfile
                key={leader.id || leader.name}
                id={leader.id}
                name={leader.name}
                title={leader.title || leader.position}
                image={leader.image || { url: '/assets/placeholder.png', alt: leader.name }}
                link={leader.link || `/leaders/${leader.slug || leader.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

