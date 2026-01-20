import InnerBanner from '@/components/InnerBanner';
import QuarterlyResultsWithTabs from '@/components/QuarterlyResultsWithTabs';
import IntegratedReportAnnualReport from '@/components/IntegratedReportAnnualReport';
import AnnualReturns from '@/components/AnnualReturns';
import ExchangeFilings from '@/components/ExchangeFilings';
import ReportsAndFilings from '@/components/ReportsAndFilings';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { 
  getReportFiling, 
  mapReportFilingData,
  transformQuarterlyResultsForComponent,
  transformAnnualReportsForComponent,
  transformAnnualReturnsForComponent,
  transformBoardMeetingFilingsForComponent,
  transformOthersFilingsForComponent
} from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';
import '@/scss/components/ReportsAndFilings.scss';

// Generate metadata for the Reports and Filings page
export const metadata = generateSEOMetadata({
  title: "Reports and Filings - Lupin | Investor Relations",
  description: "Access Lupin Limited's quarterly reports, annual reports, integrated reports, and exchange filings. Stay updated with investor information and regulatory disclosures.",
  canonicalUrl: "https://www.lupin.com/investors/reports-and-filings",
  keywords: "Lupin reports, quarterly reports, annual reports, integrated reports, exchange filings, BSE filings, NSE filings, investor relations, financial reports, Lupin Limited",
});

export default async function ReportsAndFilingsPage() {
  // Fetch Reports and Filings data from Strapi (single API call for all sections and banner)
  let reportFilingData = null;
  let bannerData = null;
  let quarterlyData = null;
  let annualReportData = null;
  let annualReturnsData = [];
  let boardMeetingData = null;
  let othersFilingsData = null;
  let error = null;
  
  try {
    const rawData = await getReportFiling();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Reports & Filings - Raw API data received:', {
        hasData: !!rawData,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasQuarterlyResultsSection: !!(rawData?.data?.QuarterlyResultsSection || rawData?.QuarterlyResultsSection),
        hasAnnualReportSection: !!(rawData?.data?.AnnualReportSection || rawData?.AnnualReportSection),
        hasAnnualReturnsSection: !!(rawData?.data?.AnnualReturnsSection || rawData?.AnnualReturnsSection),
        hasBoardMeetingFilingsSection: !!(rawData?.data?.BoardMeetingFilingsSection || rawData?.BoardMeetingFilingsSection),
        hasOtherExchangeFilingsSection: !!(rawData?.data?.OtherExchangeFilingsSection || rawData?.OtherExchangeFilingsSection)
      });
    }
    
    if (rawData) {
      reportFilingData = mapReportFilingData(rawData);
      
      // Map banner data
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      // Transform data for each component
      quarterlyData = transformQuarterlyResultsForComponent(reportFilingData);
      annualReportData = transformAnnualReportsForComponent(reportFilingData);
      annualReturnsData = transformAnnualReturnsForComponent(reportFilingData);
      boardMeetingData = transformBoardMeetingFilingsForComponent(reportFilingData);
      othersFilingsData = transformOthersFilingsForComponent(reportFilingData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Reports & Filings - Mapped data:', {
          quarterlyData,
          annualReportData,
          annualReturnsData,
          boardMeetingData,
          othersFilingsData,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Reports & Filings - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch reports and filings data from Strapi';
    console.error('Error fetching Reports and Filings data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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

  // Use transformed data from API or empty defaults
  const quarterlyTabs = quarterlyData?.tabs || [];
  const quarterlyTabsData = quarterlyData?.tabsData || {};
  // Legacy props for backward compatibility (used if tabsData is empty)
  const quarterlyItems = quarterlyData?.quarterlyItems || [];
  const quarterlyCardsQ1 = quarterlyData?.cards || [];
  const quarterlyItemsAfterCards = quarterlyData?.quarterlyItemsAfterCards || [];
  const quarterlyCardsQ2 = quarterlyData?.cardsAfterQ2 || [];

  const integratedReportTabs = annualReportData?.tabs || [];
  const integratedReportTabsData = annualReportData?.tabsData || {};

  // Remove all fallback data - using only API data
  const annualReturnsCards = annualReturnsData || [];

  const exchangeFilingsTabs = boardMeetingData?.tabs || [];
  const exchangeFilingsTabsData = boardMeetingData?.tabsData || {};

  const exchangeFilingsOthersTabs = othersFilingsData?.tabs || [];
  const exchangeFilingsOthersTabsData = othersFilingsData?.tabsData || {};


  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      
      {/* Tabs and Quarterly Results Section */}
      <QuarterlyResultsWithTabs 
        tabs={quarterlyTabs}
        tabsData={quarterlyTabsData}
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

