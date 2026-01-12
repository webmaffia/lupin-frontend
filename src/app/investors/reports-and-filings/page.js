import InnerBanner from '@/components/InnerBanner';
import QuarterlyResultsWithTabs from '@/components/QuarterlyResultsWithTabs';
import IntegratedReportAnnualReport from '@/components/IntegratedReportAnnualReport';
import AnnualReturns from '@/components/AnnualReturns';
import ExchangeFilings from '@/components/ExchangeFilings';
import ReportsAndFilings from '@/components/ReportsAndFilings';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
// TODO: Uncomment when ready to connect to Strapi API
// import { 
//   getReportFiling, 
//   mapReportFilingData,
//   transformQuarterlyResultsForComponent,
//   transformAnnualReportsForComponent,
//   transformAnnualReturnsForComponent,
//   transformBoardMeetingFilingsForComponent,
//   transformOthersFilingsForComponent
// } from '@/lib/strapi-reports';
import '@/scss/components/ReportsAndFilings.scss';

// Generate metadata for the Reports and Filings page
export const metadata = generateSEOMetadata({
  title: "Reports and Filings - Lupin | Investor Relations",
  description: "Access Lupin Limited's quarterly reports, annual reports, integrated reports, and exchange filings. Stay updated with investor information and regulatory disclosures.",
  canonicalUrl: "https://www.lupin.com/investors/reports-and-filings",
  keywords: "Lupin reports, quarterly reports, annual reports, integrated reports, exchange filings, BSE filings, NSE filings, investor relations, financial reports, Lupin Limited",
});

export default function ReportsAndFilingsPage() {
  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch banner data from Strapi
  // let bannerData = null;
  // 
  // try {
  //   const rawData = await getReportFiling();
  //   const mappedData = mapReportFilingData(rawData);
  //   bannerData = mappedData.topBanner;
  // } catch (error) {
  //   console.error('Error fetching Reports and Filings banner data from Strapi:', error);
  // }

  // Using fallback banner data (will be replaced by Strapi API later)
  const bannerData = {
    title: {
      line1: "Reports and",
      line2: "Filings"
    },
    images: {
      banner: {
        url: "/assets/test.png",
        alt: "Reports and Filings"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch Reports and Filings data from Strapi
  // let reportFilingData = null;
  // let quarterlyData = null;
  // let annualReportData = null;
  // let annualReturnsData = [];
  // let boardMeetingData = null;
  // let othersFilingsData = null;
  // 
  // try {
  //   const rawData = await getReportFiling();
  //   reportFilingData = mapReportFilingData(rawData);
  //   
  //   // Transform data for each component
  //   quarterlyData = transformQuarterlyResultsForComponent(reportFilingData);
  //   annualReportData = transformAnnualReportsForComponent(reportFilingData);
  //   annualReturnsData = transformAnnualReturnsForComponent(reportFilingData);
  //   boardMeetingData = transformBoardMeetingFilingsForComponent(reportFilingData);
  //   othersFilingsData = transformOthersFilingsForComponent(reportFilingData);
  //   
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('Reports & Filings - Mapped data:', {
  //       quarterlyData,
  //       annualReportData,
  //       annualReturnsData,
  //       boardMeetingData,
  //       othersFilingsData
  //     });
  //   }
  // } catch (error) {
  //   console.error('Error fetching Reports and Filings data from Strapi:', error);
  //   // Will use default/fallback data below
  // }

  // Using fallback data (will be replaced by Strapi API later)
  const quarterlyData = null;
  const annualReportData = null;
  const annualReturnsData = [];
  const boardMeetingData = null;
  const othersFilingsData = null;

  // Fetch subscriber data from Strapi (optional - component has default data)
  let subscriberData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching subscriber data from Strapi:', error);
    // Will use default data from component
  }

  // Using fallback defaults (will be replaced by Strapi API later)
  const quarterlyTabs = [
    'FY 2025-26',
    'FY 2024-25',
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22',
    'FY 2020-21'
  ];

  const quarterlyItems = [
    { period: 'Q1(July-Sep)', status: 'Unaudited' },
  ];

  const quarterlyCardsQ1 = [
    { id: 1, title: 'Consolidated', pdfUrl: '#', isActive: false },
    { id: 2, title: 'Standalone', pdfUrl: '#', isActive: false },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: '#', isActive: false },
    { id: 4, title: 'Presentation', pdfUrl: '#', isActive: false },
    { id: 5, title: 'Earnings Call audio', pdfUrl: '#', isActive: false }
  ];

  const quarterlyItemsAfterCards = [
    { period: 'Q2(July-Sep)', status: 'Unaudited' },
  ];

  const quarterlyCardsQ2 = [
    { id: 1, title: 'Consolidated', pdfUrl: '#', isActive: false },
    { id: 2, title: 'Standalone', pdfUrl: '#', isActive: false },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: '#', isActive: false },
    { id: 4, title: 'Presentation', pdfUrl: '#', isActive: false },
    { id: 5, title: 'Earnings Call audio', pdfUrl: '#', isActive: false }
  ];

  // Using fallback defaults
  const integratedReportTabs = [
    '2025',
    '2024',
    '2023',
    '2022',
    '2021'
  ];

  // Data for all tabs - mapping year to its content
  const integratedReportTabsData = {
    '2025': {
      cardData: {
        title: ["Financial Year", "2025"],
        image: {
          url: "/assets/reports-filings/circle.png",
          alt: "Integrated Report 2025"
        },
        buttons: [
          {
            label: "Download Now",
            href: "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "#",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 2, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 3, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 4, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 6, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        }
      ]
    },
    '2024': {
      cardData: {
        title: ["Financial Year", "2024"],
        image: {
          url: "/assets/reports-filings/circle.png",
          alt: "Integrated Report 2024"
        },
        buttons: [
          {
            label: "Download Now",
            href: "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "#",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 2, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 3, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 4, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 6, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        }
      ]
    },
    '2023': {
      cardData: {
        title: ["Financial Year", "2023"],
        image: {
          url: "/assets/reports-filings/circle.png",
          alt: "Integrated Report 2023"
        },
        buttons: [
          {
            label: "Download Now",
            href: "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "#",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 2, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 3, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 4, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 6, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        }
      ]
    },
    '2022': {
      cardData: {
        title: ["Financial Year", "2022"],
        image: {
          url: "/assets/reports-filings/circle.png",
          alt: "Integrated Report 2022"
        },
        buttons: [
          {
            label: "Download Now",
            href: "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "#",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 2, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 3, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 4, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 6, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        }
      ]
    },
    '2021': {
      cardData: {
        title: ["Financial Year", "2021"],
        image: {
          url: "/assets/reports-filings/circle.png",
          alt: "Integrated Report 2021"
        },
        buttons: [
          {
            label: "Download Now",
            href: "#",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "#",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 2, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 3, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 4, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        },
        { 
          id: 6, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: '#', 
          isActive: false 
        }
      ]
    }
  };

  // Annual Returns cards data
  const annualReturnsCards = [
    { id: 1, title: 'March 31, 2025', pdfUrl: '#', isActive: false },
    { id: 2, title: 'March 31, 2024', pdfUrl: '#', isActive: false },
    { id: 3, title: 'March 31, 2023', pdfUrl: '#', isActive: false },
    { id: 4, title: 'March 31, 2022', pdfUrl: '#', isActive: false },
    { id: 5, title: 'March 31, 2021', pdfUrl: '#', isActive: false }
  ];

  // Using fallback defaults
  const exchangeFilingsTabs = [
    '2025',
    '2024',
    '2023',
    '2022',
    '2021'
  ];

  // Data for all Exchange Filings tabs
  const exchangeFilingsTabsData = {
    '2025': {
      cards: [
        {
          links: [
            { text: 'Board meeting – Q2 FY2026', href: '#' },
            { text: 'Earnings Call Q1 FY26', href: '#' },
            { text: 'Board meeting – Q1 FY2026', href: '#' },
            { text: 'Board meeting resolutions, May 14, 2025', href: '#' },
            { text: 'SE Intimation Other Matters', href: '#' }
          ]
        }
      ]
    },
    '2024': {
      content: null
    },
    '2023': {
      content: null
    },
    '2022': {
      content: null
    },
    '2021': {
      content: null
    }
  };

  // Using fallback defaults
  const exchangeFilingsOthersTabs = [
    '2026',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019'
  ];

  // Data for all Exchange Filings (Others) tabs
  const exchangeFilingsOthersTabsData = {
    '2026': {
      cards: [
        {
          links: [
            { text: 'Board meeting – Appointment of Mr. Anand Kripalu', href: '#' },
            { text: 'Update on acquisition of VISUfarma B.V.', href: '#' },
            { text: 'Closure of Trading Window', href: '#' }
          ]
        }
      ]
    },
    '2025': {
      cards: [
        {
          links: [
            { text: 'Board meeting – Appointment of Mr. Anand Kripalu', href: '#' },
            { text: 'Update on acquisition of VISUfarma B.V.', href: '#' },
            { text: 'Closure of Trading Window', href: '#' }
          ]
        }
      ]
    },
    '2024': {
      cards: null
    },
    '2023': {
      cards: null
    },
    '2022': {
      cards: null
    },
    '2021': {
      cards: null
    },
    '2020': {
      cards: null
    },
    '2019': {
      cards: null
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      
      {/* Tabs and Quarterly Results Section */}
      <QuarterlyResultsWithTabs 
        tabs={quarterlyTabs}
        quarterlyItems={quarterlyItems}
        cards={quarterlyCardsQ1}
        quarterlyItemsAfterCards={quarterlyItemsAfterCards}
        cardsAfterQ2={quarterlyCardsQ2}
      />
      
      {/* Integrated Report/Annual Report Section */}
      <IntegratedReportAnnualReport 
        title="Integrated Report/Annual Report"
        tabs={integratedReportTabs}
        tabsData={integratedReportTabsData}
      />
      
      {/* Annual Returns Section */}
      <AnnualReturns 
        title="Annual Returns"
        cards={annualReturnsCards}
      />
      
      {/* Exchange Filings (Board meeting) Section */}
      <ExchangeFilings 
        title="Exchange Filings (Board meeting)"
        tabs={exchangeFilingsTabs}
        tabsData={exchangeFilingsTabsData}
      />
      
      {/* Exchange Filings (Others) Section */}
      <ExchangeFilings 
        title="Exchange Filings (Others)"
        tabs={exchangeFilingsOthersTabs}
        tabsData={exchangeFilingsOthersTabsData}
      />
      
      <SubscriberUpdated data={subscriberData} />
    </div>
  );
}

