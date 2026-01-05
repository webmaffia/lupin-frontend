import InnerBanner from '@/components/InnerBanner';
import EGM from '@/components/EGM';
import DeclarationOfResultsEvoting from '@/components/DeclarationOfResultsEvoting';
import VotingResults from '@/components/VotingResults';
import VotingTable from '@/components/VotingTable';
import IEPFTable from '@/components/IEPFTable';
import NoticeSection from '@/components/NoticeSection';
import Grid5x3 from '@/components/Grid5x3';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

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

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <EGM data={egmData} />
      <DeclarationOfResultsEvoting data={declarationData} />
      <VotingResults data={votingData} />
      <VotingTable data={votingTableData} />
      <IEPFTable data={iepfTableData} />
      <NoticeSection data={noticeTableData} />
      <Grid5x3 data={gridData} />
      
      <SubscriberUpdated data={subscriberData} />
    </div>
  );
}

