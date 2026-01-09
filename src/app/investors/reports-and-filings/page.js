import InnerBanner from '@/components/InnerBanner';
import QuarterlyResultsWithTabs from '@/components/QuarterlyResultsWithTabs';
import IntegratedReportAnnualReport from '@/components/IntegratedReportAnnualReport';
import ReportsAndFilings from '@/components/ReportsAndFilings';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/components/ReportsAndFilings.scss';

// Generate metadata for the Reports and Filings page
export const metadata = generateSEOMetadata({
  title: "Reports and Filings - Lupin | Investor Relations",
  description: "Access Lupin Limited's quarterly reports, annual reports, integrated reports, and exchange filings. Stay updated with investor information and regulatory disclosures.",
  canonicalUrl: "https://www.lupin.com/investors/reports-and-filings",
  keywords: "Lupin reports, quarterly reports, annual reports, integrated reports, exchange filings, BSE filings, NSE filings, investor relations, financial reports, Lupin Limited",
});

export default async function ReportsAndFilingsPage() {
  // Custom banner data for this page
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

  // Fetch Reports and Filings data from Strapi (optional - component has default data)
  let reportsFilingsData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Reports and Filings data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch subscriber data from Strapi (optional - component has default data)
  let subscriberData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching subscriber data from Strapi:', error);
    // Will use default data from component
  }

  // Tabs data for Quarterly Results
  const quarterlyTabs = [
    'FY 2025-26',
    'FY 2024-25',
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22',
    'FY 2020-21'
  ];

  // Quarterly results items for FY 2025-26 - Q1 (before cards)
  const quarterlyItems = [
    { period: 'Q1(July-Sep)', status: 'Unaudited' },
  ];

  // Cards data for Q1 quarterly results
  const quarterlyCardsQ1 = [
    { id: 1, title: 'Consolidated', pdfUrl: '#', isActive: false },
    { id: 2, title: 'Standalone', pdfUrl: '#', isActive: false },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: '#', isActive: false },
    { id: 4, title: 'Presentation', pdfUrl: '#', isActive: false },
    { id: 5, title: 'Earnings Call audio', pdfUrl: '#', isActive: false }
  ];

  // Quarterly results items for FY 2025-26 - Q2 (after cards)
  const quarterlyItemsAfterCards = [
    { period: 'Q2(July-Sep)', status: 'Unaudited' },
  ];

  // Cards data for Q2 quarterly results
  const quarterlyCardsQ2 = [
    { id: 1, title: 'Consolidated', pdfUrl: '#', isActive: false },
    { id: 2, title: 'Standalone', pdfUrl: '#', isActive: false },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: '#', isActive: false },
    { id: 4, title: 'Presentation', pdfUrl: '#', isActive: false },
    { id: 5, title: 'Earnings Call audio', pdfUrl: '#', isActive: false }
  ];

  // Tabs for Integrated Report/Annual Report section - Years from 2025 to 2021
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
      
      <SubscriberUpdated data={subscriberData} />
    </div>
  );
}

