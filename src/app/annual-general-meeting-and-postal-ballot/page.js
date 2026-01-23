import InnerBanner from '@/components/InnerBanner';
import AGMAndPostalBallot from '@/components/AGMAndPostalBallot';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Annual General Meeting and Postal Ballot page
export const metadata = generateSEOMetadata({
  title: "Annual General Meeting and Postal Ballot - Lupin | Investor Relations",
  description: "Access information about Lupin's Annual General Meeting (AGM) and Postal Ballot. Find meeting notices, voting information, and related documents for shareholders.",
  canonicalUrl: "https://www.lupin.com/annual-general-meeting-and-postal-ballot",
  keywords: "annual general meeting, AGM, postal ballot, Lupin AGM, shareholder meeting, voting, investor relations, Lupin Limited",
});

export default function AnnualGeneralMeetingAndPostalBallotPage() {
  const bannerData = {
    title: {
      line1: "Annual General Meeting",
      line2: "and Postal Ballot",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Annual General Meeting and Postal Ballot - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // AGM Section Data
  const agmTabs = ['FY 2025-26', 'FY 2024-25', 'FY 2023-24', 'FY 2022-23', 'FY 2021-22', 'FY 2020-21'];
  
  const agmTabsData = {
    'FY 2025-26': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    },
    'FY 2024-25': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    },
    'FY 2023-24': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    },
    'FY 2022-23': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    },
    'FY 2021-22': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    },
    'FY 2020-21': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    }
  };

  // Postal Ballot Section Data
  const postalBallotTabs = ['FY 2025-26'];
  
  const postalBallotTabsData = {
    'FY 2025-26': {
      cards: [
        {
          id: 1,
          title: 'Code of Conduct for Independent Directors',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: '#'
        }
      ]
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      
      {/* AGM Section */}
      <AGMAndPostalBallot 
        title="AGM"
        tabs={agmTabs}
        tabsData={agmTabsData}
      />
      
      {/* Postal Ballot Section */}
      <AGMAndPostalBallot 
        title="Postal Ballot"
        tabs={postalBallotTabs}
        tabsData={postalBallotTabsData}
        noticeText="Postal Ballot Notice dated January 06, 2026"
        className="agm-postal-ballot--postal-ballot"
      />
      
      {/* Additional Postal Ballot Notice */}
      <AGMAndPostalBallot 
        title=""
        tabs={[]}
        tabsData={{
          '': {
            cards: [
              {
                id: 1,
                title: 'Code of Conduct for Independent Directors',
                pdfUrl: '#'
              },
              {
                id: 2,
                title: 'Code of Conduct for Independent Directors',
                pdfUrl: '#'
              },
              {
                id: 3,
                title: 'Outcome of AGM and E-voting results',
                pdfUrl: '#'
              }
            ]
          }
        }}
        noticeText="Postal Ballot Notice dated August 20, 2025"
        className="agm-postal-ballot--postal-ballot"
      />
    </div>
  );
}

