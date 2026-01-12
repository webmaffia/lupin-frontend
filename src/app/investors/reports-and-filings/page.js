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
        url: "/assets/inner-banner/Reports-and-filings.png",
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
    { period: 'Q2(July-Sep)', status: 'Unaudited' },
  ];

  const quarterlyCardsQ2 = [
    { id: 1, title: 'Consolidated', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/consolidated-q1fy26.pdf', isActive: true },
    { id: 2, title: 'Standalone', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/standalone-q1fy26.pdf', isActive: true },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/earnings-call-q1fy26-transcript.pdf', isActive: true },
    { id: 4, title: 'Presentation', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/investor-presentation-q1fy26.pdf', isActive: true },
    { id: 5, title: 'Earnings Call audio', pdfUrl: 'https://www.lupin.com/audio/q1-fy26-earnings-call.mp3', isActive: true }
  ];

  const quarterlyItemsAfterCards = [
    { period: 'Q1(April-June)', status: 'Unaudited' },
  ];

  const quarterlyCardsQ1 = [
    { id: 1, title: 'Consolidated', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/11/consolidated-q2fy26.pdf', isActive: true },
    { id: 2, title: 'Standalone', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/11/standalone-q2fy26.pdf', isActive: true },
    { id: 3, title: 'Earnings call Transcript', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/11/earnings-call-transcript-q2fy26.pdf', isActive: true },
    { id: 4, title: 'Presentation', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/11/lupin-investor-presentation-q2-fy26.pdf', isActive: true },
    { id: 5, title: 'Earnings Call audio', pdfUrl: 'https://www.lupin.com/audio/q2-fy26-earnings-call.mp3', isActive: true }
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
          url: "https://www.lupin.com/wp-content/uploads/2025/07/lupin-report-cover.png",
          alt: "Integrated Report 2025"
        },
        buttons: [
          {
            label: "Download Now",
            href: "https://www.lupin.com/wp-content/uploads/2025/07/integrated-report-consolidated.pdf",
            variant: "outline"
          },
          {
            label: "Visit ESG Microsite",
            href: "https://www.lupin.com/esg-report/",
            variant: "filled"
          }
        ]
      },
      extraSmallCards: [
        { 
          id: 1, 
          title: 'Tax Transparency Report', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/lupin-limited-ttr-fY-25.pdf', 
          isActive: true 
        },
        { 
          id: 2, 
          title: 'Independent Assurance Statement (IR)', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/dnv-assurance-certificate-on-ir.pdf', 
          isActive: true 
        },
        { 
          id: 3, 
          title: 'Independent Assurance Statement (BRSR)', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/dnv-assurance-certificate-on-brsr.pdf', 
          isActive: true 
        },
        { 
          id: 4, 
          title: 'Human Rights Assessment Declaration', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/08/human-rights-assessments-declaration.pdf', 
          isActive: true 
        },
        { 
          id: 5, 
          title: 'Disclosure pursuant to SEBI (Share Based Employee Benefits and Sweat Equity Regulations), 2021', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/compliance-certificate-under-sebi-share-based-employee-benefits-and-sweat-equity-regulations-2021.pdf', 
          isActive: true 
        },
        { 
          id: 6, 
          title: 'Impact Assessment Report of CSR', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/impact-assessment-report-of-csr.pdf', 
          isActive: true 
        },
        { 
          id: 7, 
          title: 'Lupin ESG Supplementary Report FY 2024-25', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/09/lupin-esg-supplementary-report-fy-2024-25.pdf', 
          isActive: true 
        },
        { 
          id: 8, 
          title: 'Lupin LCA Report', 
          pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/09/lupin-lca-report.pdf', 
          isActive: true 
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
    { id: 1, title: 'March 31, 2025', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2025/07/form-mgt-7-ll-website-2025.pdf', isActive: true },
    { id: 2, title: 'March 31, 2024', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2024/09/form-mgt-7-ll-2024-signed-website.pdf', isActive: true },
    { id: 3, title: 'March 31, 2023', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2023/09/form-mgt-7-2023-ll-signed-website.pdf', isActive: true },
    { id: 4, title: 'March 31, 2022', pdfUrl: 'https://www.lupin.com/wp-content/uploads/2022/09/form-mgt-7-ll-2022-signed-website.pdf', isActive: true },
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
            { text: 'Board meeting – Q2 FY2026', href: 'https://www.lupin.com/wp-content/uploads/2025/11/board-meeting-q2-fy2026.pdf' },
            { text: 'Earnings Call Q1 FY26', href: 'https://www.lupin.com/wp-content/uploads/2025/07/se-intimation-earnings-call-q1-fy26.pdf' },
            { text: 'Board meeting – Q1 FY2026', href: 'https://www.lupin.com/wp-content/uploads/2025/07/board-meeting-q1-fy2026.pdf' },
            { text: 'Board meeting resolutions, May 14, 2025', href: 'https://www.lupin.com/wp-content/uploads/2025/05/board-meeting-resolutions-may-14-2025.pdf' },
            { text: 'SE Intimation Other Matters', href: 'https://www.lupin.com/wp-content/uploads/2025/02/se-intimation-other-matters.pdf' }
          ]
        },
        {
          links: [
            { text: 'Board meeting intimation – Q3 FY2025', href: 'https://www.lupin.com/wp-content/uploads/2025/01/seintimation-m-intimation-q3fy25.pdf' },
            { text: 'Board meeting intimation – Q2 FY2025', href: 'https://www.lupin.com/wp-content/uploads/2024/10/bsense-lertter-board-meeting-intimation-22-10-2024.pdf' },
            { text: 'Proceedings of the 42nd Annual General Meeting', href: 'https://www.lupin.com/wp-content/uploads/2024/08/se-intimation-agm-proceedings.pdf' },
            { text: 'Board meeting intimation – Q1 FY2025', href: 'https://www.lupin.com/wp-content/uploads/2024/07/se-intimation.pdf' }
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
            { text: 'Board meeting – Appointment of Mr. Anand Kripalu', href: 'https://www.lupin.com/wp-content/uploads/2026/01/board-meeting-appointment-of-mr-anand-kripalu.pdf' }
          ]
        }
      ]
    },
    '2025': {
      cards: [
        {
          links: [
            { text: 'Update on acquisition of VISUfarma B.V., the Netherlands', href: 'https://www.lupin.com/wp-content/uploads/2025/12/update-on-acquisition-of-visufarma-b-v-the-netherlands.pdf' },
            { text: 'Closure of Trading Window', href: 'https://www.lupin.com/wp-content/uploads/2025/12/closure-of-trading-window.pdf' },
            { text: 'Allotment of shares under ESOP', href: 'https://www.lupin.com/wp-content/uploads/2025/12/se-letter-allotment-of-esop.pdf' },
            { text: 'Re-lodgement of transfer request of physical shares', href: 'https://www.lupin.com/wp-content/uploads/2025/12/re-lodgement-of-transfer-request-of-physical-shares.pdf' },
            { text: 'ESG ratings', href: 'https://www.lupin.com/wp-content/uploads/2025/12/esg-ratings.pdf' },
            { text: 'US FDA inspection at Goa', href: 'https://www.lupin.com/wp-content/uploads/2025/11/us-fda-inspection-at-goa.pdf' },
            { text: 'Newspaper Ad – Q2 FY26 financial results', href: 'https://www.lupin.com/wp-content/uploads/2025/11/newspaper-ad-q2-fy26-financial-results.pdf' },
            { text: 'Related Party Transactions – September 30, 2025', href: 'https://www.lupin.com/wp-content/uploads/2025/11/related-party-transactions-september-30-2025.pdf' },
            { text: 'Newspaper ad – Re-lodgement of transfer requests for physical shares', href: 'https://www.lupin.com/wp-content/uploads/2025/11/se-letter-for-newspaper-publication.pdf' },
            { text: 'Allotment of shares under ESOP', href: 'https://www.lupin.com/wp-content/uploads/2025/10/allotment-of-shares-under-esop.pdf' },
            { text: 'Earnings call Q2 FY26', href: 'https://www.lupin.com/wp-content/uploads/2025/10/se-intimation-earnings-call-q2-fy26.pdf' },
            { text: 'ESOP', href: 'https://www.lupin.com/wp-content/uploads/2025/10/esop.pdf' },
            { text: 'U.S. FDA Pre-Approval Inspection of Somerset Facility in the U.S.', href: 'https://www.lupin.com/wp-content/uploads/2025/10/u.s-fda-pre-approval-inspection-of-somerset-facility-in-the-u.s.pdf' },
            { text: 'Plans to build a new state-of-the-art manufacturing facility at coral springs.', href: 'https://www.lupin.com/wp-content/uploads/2025/10/se-letter-with-press-release-08102025.pdf' }
          ]
        },
        {
          links: [
            { text: 'USFDA inspection of Pithampur facility', href: 'https://www.lupin.com/wp-content/uploads/2025/10/usfda-inspction-of-pithampur-facility.pdf' },
            { text: 'Retirement – member of senior management', href: 'https://www.lupin.com/wp-content/uploads/2025/09/se-letter-retirement-of-smp.pdf' },
            { text: 'Acquisition of VISUfarma', href: 'https://www.lupin.com/wp-content/uploads/2025/09/lupin-se-intimation-visufarma.pdf' },
            { text: 'Stocks options', href: 'https://www.lupin.com/wp-content/uploads/2025/09/stock-option.pdf' },
            { text: 'USFDA inspection of Biotech faciliy', href: 'https://www.lupin.com/wp-content/uploads/2025/09/se-intimationfinal.pdf' },
            { text: 'ESG ratings', href: 'https://www.lupin.com/wp-content/uploads/2025/09/stock-exchange-intimation-esg-ratingsigned.pdf' },
            { text: 'Schedule of analyst – investor meet', href: 'https://www.lupin.com/wp-content/uploads/2025/09/se-intimation-schedule-of-analyst-investors-meet.pdf' },
            { text: 'USFDA inspection at Aurangabad', href: 'https://www.lupin.com/wp-content/uploads/2025/09/se-letter-usdfa-inspection.pdf' },
            { text: 'Re-lodgement of transfer request of physical shares', href: 'https://www.lupin.com/wp-content/uploads/2025/09/bse-nse-letter-for-newspaper-publication.pdf' },
            { text: 'Crisil ESG Ratings & Analytics Ltd', href: 'https://www.lupin.com/wp-content/uploads/2025/08/stockexchangeIntimation-esgrating.pdf' },
            { text: 'Analyst/Investors Meet', href: 'https://www.lupin.com/wp-content/uploads/2025/08/seintimation-analystinvestorsmeet.pdf' },
            { text: 'Reappointment of Mr. Mark D. McDade', href: 'https://www.lupin.com/wp-content/uploads/2025/08/seintimation-reappointment-of-mdm.pdf' },
            { text: 'ESOP allocation – Aug 21, 2025', href: 'https://www.lupin.com/wp-content/uploads/2025/08/esop-allocation.pdf' },
            { text: 'SE intimation of ESOP', href: 'https://www.lupin.com/wp-content/uploads/2025/08/se-intimation-of-esop.pdf' },
            { text: 'SE intimation of term', href: 'https://www.lupin.com/wp-content/uploads/2025/08/se-intimation-comletion-of-term.pdf' }
          ]
        },
        {
          links: [
            { text: 'Outcome of AGM and e-voting Results', href: 'https://www.lupin.com/wp-content/uploads/2025/08/se-intimation-for-outcome-of-agm.pdf' },
            { text: 'BSE/NES Letter Schedule of Analyst Investors Meet', href: 'https://www.lupin.com/wp-content/uploads/2025/08/se-intimation-schedule-of-analyst-investors-meet.pdf' },
            { text: '1st August 2025', href: 'https://www.lupin.com/wp-content/uploads/2025/08/se-reply-letter.pdf' },
            { text: 'USFDA inspection Pithampur Unit 3', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-letter-Inspection-pithampur-unit-3-17072025.pdf' },
            { text: 'USFDA inspection Pithampur Unit 2', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-nse-letter-Inspection-pithampur-unit-2-17072025.pdf' },
            { text: 'Allotment of shares under ESOP', href: 'https://www.lupin.com/wp-content/uploads/2025/07/allotment-of-shares-under-esop.pdf' },
            { text: '43rd AGM intimation', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-nse-record-date-intimation.pdf' },
            { text: 'ESG rating from NSE Sustainability Ratings & Analytics Limited', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-nse-letter-esg-rating.pdf' },
            { text: 'Newspaper Ad – relodgement of physical share transfer requests', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-nse-letter-for-newspaper-publication.pdf' },
            { text: 'NSE BSE Letter Closure of Trading Window', href: 'https://www.lupin.com/wp-content/uploads/2025/07/nse-bse-letter-closure-of-trading-window.pdf' },
            { text: 'BSE Letter Zentiva Signed', href: 'https://www.lupin.com/wp-content/uploads/2025/07/bse-letter-zentiva-signed.pdf' },
            { text: 'SE intimation Updates API R&D-Final', href: 'https://www.lupin.com/wp-content/uploads/2025/06/se-intimation-updates-api-rd-final.pdf' },
            { text: 'NSE intimation Execution of BTAOTC Business', href: 'https://www.lupin.com/wp-content/uploads/2025/06/nseintimationexecutionofbtaotcbusiness.pdf' },
            { text: 'Employees Stock Option Plan', href: 'https://www.lupin.com/wp-content/uploads/2025/06/disclosure-dated-20th-june-2025.pdf' }
          ]
        },
        {
          links: [
            { text: 'BSE / NSE Letter Schedule of Analyst Investors Meet', href: 'https://www.lupin.com/wp-content/uploads/2025/06/bse-nse-letter-schedule-of-analyst-investors-meet-19-06-2025.pdf' },
            { text: 'Change in Directors', href: 'https://www.lupin.com/wp-content/uploads/2025/05/bse-nse-letter-change-in-director.pdf' },
            { text: 'SE Intimation Updates API R&D and OTC Business', href: 'https://www.lupin.com/wp-content/uploads/2025/04/se-intimation-updates-api-rd-and-otc-business.pdf' },
            { text: 'BSE / NSE Letter Acquisition of Renascience Pharma Limited', href: 'https://www.lupin.com/wp-content/uploads/2025/04/bse-nse-letter-acquisition-of-renascience-pharma-limited.pdf' },
            { text: 'BSE / NSE Letter Retirement of SMP', href: 'https://www.lupin.com/wp-content/uploads/2025/04/bse-nse-letter-retirement-of-smp.pdf' },
            { text: 'SE Intimation Outcome of Board Meeting', href: 'https://www.lupin.com/wp-content/uploads/2025/04/se-intimation-outcome-of-board-meeting.pdf' },
            { text: 'Voting Results March 2025', href: 'https://www.lupin.com/wp-content/uploads/2025/03/voting-results-march-2025.pdf' },
            { text: 'BSE/NSE Letter Incoporation LHCL', href: 'https://www.lupin.com/wp-content/uploads/2025/03/bse-nse-letter-incoporation-lhcl.pdf' },
            { text: 'SE Intimation Newspaper Advt', href: 'https://www.lupin.com/wp-content/uploads/2025/02/se-intimation-newspaper-advt.pdf' },
            { text: 'BSE/NSE Letter Schedule of Analyst Investors Meet', href: 'https://www.lupin.com/wp-content/uploads/2025/02/bse-nse-letter-schedule-of-analyst-investors-meet-19-02-2025.pdf' },
            { text: 'BSE/NSE Letter Action taken by Authority', href: 'https://www.lupin.com/wp-content/uploads/2025/02/bsense-letters-actiontaken-by-authority-06022025.pdf' },
            { text: 'BSE/NSE Letter Verification of News Article', href: 'https://www.lupin.com/wp-content/uploads/2025/02/bse-nse-letter-verification-of-news-article-04-02-2025.pdf' },
            { text: 'Stock Exchange Intimation', href: 'https://www.lupin.com/wp-content/uploads/2025/02/bsenseletters-actiontakenbyauthority-03022025.pdf' },
            { text: 'BSE/NSE Letter Sunsure Acquisition', href: 'https://www.lupin.com/wp-content/uploads/2025/01/seintimation-acquisition-sunsure-update-09012025.pdf' }
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

