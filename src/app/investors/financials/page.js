import InnerBanner from '@/components/InnerBanner';
import FinancialBarSection from '@/components/FinancialBarSection';
import SmallCard from '@/components/global/SmallCard';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
// TODO: Uncomment when ready to connect to Strapi API
// import { getFinancial, mapFinancialData } from '@/lib/strapi';
import '@/scss/pages/financials.scss';

// Generate metadata for the financials page
export const metadata = generateSEOMetadata({
  title: "Financials - Lupin | Investor Relations",
  description: "View Lupin Limited's financial reports, quarterly results, annual reports, and financial statements for investors.",
  canonicalUrl: "https://www.lupin.com/investors/financials",
  keywords: "Lupin financials, financial reports, quarterly results, annual reports, financial statements, investor relations, Lupin Limited",
});

export default function FinancialsPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Financials",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Financials"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Financial document cards data
  const financialCards = [
    {
      id: 1,
      title: "Balance Sheet",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/07/balance-sheet-ir-2024-25.pdf",
      isActive: false
    },
    {
      id: 2,
      title: "Profit and Loss Account",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/07/profit-and-loss-ir-2024-25.pdf",
      isActive: false
    },
    {
      id: 3,
      title: "Cash Flow",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/07/cash-flows-ir-2024-25.pdf",
      isActive: false
    },
    {
      id: 4,
      title: "Ten Years Financial Summary",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/07/ten-years-financial-summary-ir-2024-2025.pdf",
      isActive: false
    }
  ];

  // TODO: Uncomment when ready to connect to Strapi API
  // Fetch Related Party Transactions data from Strapi
  // let relatedPartyTransactions = [];
  // 
  // try {
  //   const rawData = await getFinancial();
  //   relatedPartyTransactions = mapFinancialData(rawData);
  //   
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('Financial - Related Party Transactions mapped data:', relatedPartyTransactions);
  //   }
  // } catch (error) {
  //   console.error('Error fetching Financial data from Strapi:', error);
  //   // Fallback to default data if fetch fails
  //   relatedPartyTransactions = [
  //     {
  //       id: 1,
  //       title: "Half year ended September 30, 2025",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 2,
  //       title: "Half year ended March 31, 2025",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 3,
  //       title: "Half year ended September 30, 2024",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 4,
  //       title: "Half year ended March 31, 2024",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 5,
  //       title: "Half year ended September 30, 2023",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 6,
  //       title: "Half year ended March 31, 2023",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 7,
  //       title: "Half year ended September 30, 2022",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 8,
  //       title: "Half year ended March 31, 2022",
  //       pdfUrl: "#",
  //       isActive: false
  //     },
  //     {
  //       id: 9,
  //       title: "Half year ended September 30, 2021",
  //       pdfUrl: "#",
  //       isActive: false
  //     }
  //   ];
  // }

  // Using fallback data (will be replaced by Strapi API later)
  const relatedPartyTransactions = [
    {
      id: 1,
      title: "Half year ended September 30, 2025",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/12/half-yearly-disclosure-on-related-party-transactions-september-30-2025.pdf",
      isActive: false
    },
    {
      id: 2,
      title: "Half year ended March 31, 2025",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2025/05/related-party-transactions-31032025.pdf",
      isActive: false
    },
    {
      id: 3,
      title: "Half year ended September 30, 2024",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2024/12/related-party-transaction-report-30092024-website.pdf",
      isActive: false
    },
    {
      id: 4,
      title: "Half year ended March 31, 2024",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2024/06/rpt-mar-24-xbrl-revised.pdf",
      isActive: false
    },
    {
      id: 5,
      title: "Half year ended September 30, 2023",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2023/11/rpt-half-year-q2-30-09-2023.pdf",
      isActive: false
    },
    {
      id: 6,
      title: "Half year ended March 31, 2023",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2023/05/rpt-mar-23-xbrl-validated.pdf",
      isActive: false
    },
    {
      id: 7,
      title: "Half year ended September 30, 2022",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2022/11/rpt-xrbl-sep22.pdf",
      isActive: false
    },
    {
      id: 8,
      title: "Half year ended March 31, 2022",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2022/06/disclosure-of-related-party-transactio-31032022-3.pdf",
      isActive: false
    },
    {
      id: 9,
      title: "Half year ended September 30, 2021",
      pdfUrl: "https://www.lupin.com/wp-content/uploads/2021/11/consolidated-rpt-september-30-2021.pdf",
      isActive: false
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <FinancialBarSection />
      
      {/* Financial Documents Section */}
      <section className="financial-documents">
        <div className="financial-documents__container">
          <div className="financial-documents__grid">
            {financialCards.map((card) => (
              <SmallCard
                key={card.id}
                title={card.title}
                pdfUrl={card.pdfUrl}
                isActive={card.isActive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Related Party Transactions Section */}
      <section className="related-party-transactions">
        <div className="related-party-transactions__container">
          <h2 className="related-party-transactions__title">Related Party Transactions</h2>
          <div className="related-party-transactions__grid">
            {relatedPartyTransactions.map((card) => (
              <SmallCard
                key={card.id}
                title={card.title}
                pdfUrl={card.pdfUrl}
                isActive={card.isActive}
              />
            ))}
          </div>
        </div>
      </section>

      <SubscriberUpdated />
    </div>
  );
}

