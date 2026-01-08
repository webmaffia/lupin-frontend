import InnerBanner from '@/components/InnerBanner';
import FinancialBarSection from '@/components/FinancialBarSection';
import SmallCard from '@/components/global/SmallCard';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
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

      <SubscriberUpdated />
    </div>
  );
}

