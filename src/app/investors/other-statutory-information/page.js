import InnerBanner from '@/components/InnerBanner';
import EGM from '@/components/EGM';
import DeclarationOfResultsEvoting from '@/components/DeclarationOfResultsEvoting';
import VotingResults from '@/components/VotingResults';
import VotingTable from '@/components/VotingTable';
import IEPFTable from '@/components/IEPFTable';
import NoticeSection from '@/components/NoticeSection';
import SmallCard from '@/components/global/SmallCard';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/financials.scss';

// Generate metadata for the Other Statutory Information page
export const metadata = generateSEOMetadata({
  title: "Other Statutory Information - Lupin | Investor Relations",
  description: "Access other statutory information and disclosures for Lupin Limited. Stay informed with investor relations updates.",
  canonicalUrl: "https://www.lupin.com/investors/other-statutory-information",
  keywords: "statutory information, investor disclosures, regulatory information, investor relations, Lupin Limited",
});

export default async function OtherStatutoryInformationPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Other Statutory",
      line2: "Information"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Other Statutory Information"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Fetch EGM data from Strapi (optional - component has default data)
  let egmData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching EGM data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Declaration of Results E-voting data from Strapi (optional - component has default data)
  let declarationData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Declaration of Results E-voting data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Voting Results data from Strapi (optional - component has default data)
  let votingData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Voting Results data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Voting Table data from Strapi (optional - component has default data)
  let votingTableData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Voting Table data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch IEPF Table data from Strapi (optional - component has default data)
  let iepfTableData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching IEPF Table data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Notice Table data from Strapi (optional - component has default data)
  let noticeTableData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Notice Table data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Grid 5x3 data from Strapi (optional - component has default data)
  let gridData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
  } catch (error) {
    console.error('Error fetching Grid 5x3 data from Strapi:', error);
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

  // Statutory documents cards data
  const statutoryDocuments = [
    {
      id: 1,
      title: "Secretarial Compliance Report 2025",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 2,
      title: "Notice of Postal Ballot 2025",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 3,
      title: "Secretarial Compliance Report 2024",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 4,
      title: "Model Tripartite Agreement",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 5,
      title: "Secretarial Compliance Report 2023",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 6,
      title: "Important Notice for Shareholders holding shares in physical form",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 7,
      title: "Published Voting Results",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 8,
      title: "Notice of Postal Ballot",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 9,
      title: "Postal Ballot Form",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 10,
      title: "Evoting Instruction",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 11,
      title: "Secretarial Compliance Report 2022",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 12,
      title: "Secretarial Compliance Report 2021",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 13,
      title: "Lupin Shareholders Notice Ad",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 14,
      title: "Remote e-voting at the AGM",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 15,
      title: "TDS on dividend",
      pdfUrl: "#",
      isActive: false
    }
  ];

  // KYC documents cards data
  const kycDocuments = [
    {
      id: 1,
      title: "KYC Form and Instructions",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 2,
      title: "ISR-1, Request form for Registering Pan, Bank, Kyc",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 3,
      title: "ISR-2, Bank Verification For Sign",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 4,
      title: "ISR-3, Opting-out of Nomination by Holders of Physical Securities in Listed Companies",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 5,
      title: "SH -13, Registration of Nomination Form",
      pdfUrl: "#",
      isActive: false
    },
    {
      id: 6,
      title: "SH-14, Cancellation or Variation of Nomination",
      pdfUrl: "#",
      isActive: false
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <EGM data={egmData} />
      <DeclarationOfResultsEvoting data={declarationData} />
      <VotingResults data={votingData} />
      <VotingTable data={votingTableData} />
      <IEPFTable data={iepfTableData} />
      <NoticeSection data={noticeTableData} />

      {/* Statutory Documents Section */}
      <section className="statutory-documents">
        <div className="statutory-documents__container">
          <div className="statutory-documents__grid">
            {statutoryDocuments.map((card) => (
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

      {/* KYC Section */}
      <section className="kyc-section">
        <div className="kyc-section__container">
          <h2 className="kyc-section__title">KYC updation as per SEBI Circular<br />dated March 16, 2023</h2>
          <div className="kyc-section__grid">
            {kycDocuments.map((card) => (
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
      
      <SubscriberUpdated data={subscriberData} />
    </div>
  );
}

