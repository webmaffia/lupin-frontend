import InnerBanner from '@/components/InnerBanner';
import FinancialBarSection from '@/components/FinancialBarSection';
import SmallCard from '@/components/global/SmallCard';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getFinancial, mapFinancialData } from '@/lib/strapi';
import '@/scss/pages/financials.scss';

// Generate metadata for the financials page
export const metadata = generateSEOMetadata({
  title: "Financials - Lupin | Investor Relations",
  description: "View Lupin Limited's financial reports, quarterly results, annual reports, and financial statements for investors.",
  canonicalUrl: "https://www.lupin.com/investors/financials",
  keywords: "Lupin financials, financial reports, quarterly results, annual reports, financial statements, investor relations, Lupin Limited",
});

export default async function FinancialsPage() {
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
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 3,
      title: "Cash Flow",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 4,
      title: "Ten Years Financial Summary",
      pdfUrl: "#",
      isActive: false
    }
  ];

  // Fetch Related Party Transactions data from Strapi
  let relatedPartyTransactions = [];
  
  try {
    const rawData = await getFinancial();
    relatedPartyTransactions = mapFinancialData(rawData);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Financial - Related Party Transactions mapped data:', relatedPartyTransactions);
    }
  } catch (error) {
    console.error('Error fetching Financial data from Strapi:', error);
    // Fallback to default data if fetch fails
    relatedPartyTransactions = [
      {
        id: 1,
        title: "Half year ended September 30, 2025",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "Half year ended March 31, 2025",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Half year ended September 30, 2024",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Half year ended March 31, 2024",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Half year ended September 30, 2023",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Half year ended March 31, 2023",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Half year ended September 30, 2022",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 8,
        title: "Half year ended March 31, 2022",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 9,
        title: "Half year ended September 30, 2021",
        pdfUrl: "#",
        isActive: false
      }
    ];
  }

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

