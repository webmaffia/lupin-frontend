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
          title: 'AGM Transcript',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/agm-transcript.pdf'
        },
        {
          id: 2,
          title: 'Outcome of AGM and e-voting Results',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/se-intimation-for-outcome-of-agm.pdf'
        },
        {
          id: 3,
          title: 'Newspaper Advertisement (post-dispatch)',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/letter-for-newspaper-publication.pdf'
        },
        {
          id: 4,
          title: 'Integrated Report',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/integrated-report-consolidated.pdf'
        },
        {
          id: 5,
          title: 'AGM Notice',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/notice-forty-third-agm.pdf'
        },
        {
          id: 6,
          title: 'Draft Articles of Association',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/draft-articles-of-association.pdf'
        },
        {
          id: 7,
          title: 'Annual Returns',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/10/form-mgt-7-ll-final.pdf'
        },
        {
          id: 8,
          title: 'Newspaper Advertisement (Pre-dispatch)',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/nse-letter-for-newspaper-publication.pdf'
        }
      ]
    },
    'FY 2024-25': {
      cards: [
        {
          id: 1,
          title: 'Integrated Report',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2024/07/integrated-report-consolidated.pdf'
        },
        {
          id: 2,
          title: 'AGM Notice',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/lupin-2024-agm-notice.pdf'
        },
        {
          id: 3,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/outcome-of-agm-and-e-voting-results.pdf'
        },
        {
          id: 4,
          title: 'AGM Transcript',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/agm-transcript.pdf'
        },
        {
          id: 5,
          title: 'Annual Return',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/annual-return.pdf'
        }
      ]
    },
    'FY 2023-24': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/agm-notice-2023-final.pdf'
        },
        {
          id: 2,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/outcome-of-agm-and-e-voting-results-2.pdf'
        },
        {
          id: 3,
          title: 'Annual Return',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/annual-return-2023.pdf'
        }
      ]
    },
    'FY 2022-23': {
      cards: [
        {
          id: 1,
          title: 'AGM Notice',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/AGM-Notice-Consolidated-Final-21-22.pdf'
        },
        {
          id: 2,
          title: 'Outcome of AGM and E-voting results',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/Outcome-of-AGM-and-E-voting-results-1.pdf'
        },
        {
          id: 3,
          title: 'Annual Return',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/Annual-Return-1.pdf'
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
          title: 'Newspaper Advertisement',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2026/01/seintimation-newspaper-advt.pdf'
        },
        {
          id: 2,
          title: 'Notice of Postal Ballot',
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2026/01/notice-of-postal-ballot.pdf'
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
                title: 'Voting Results and Scrutinzer\'s Report',
                pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/09/seintimation-scrutinizer-report.pdf'
              },
              {
                id: 2,
                title: 'Newspaper Advertisement',
                pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/seintimation-newspaperadvt.pdf'
              },
              {
                id: 3,
                title: 'Notice of Postal Ballot',
                pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/postal-ballot-notice.pdf'
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

