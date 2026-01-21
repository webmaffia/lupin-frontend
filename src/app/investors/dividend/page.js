import InnerBanner from '@/components/InnerBanner';
import NavigationLinks from '@/components/NavigationLinks';
import TdsDividendSection from '@/components/TdsDividendSection';
import VotingTable from '@/components/VotingTable';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getDividend, mapDividendData, getFallbackDividendHistoryTable } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/dividend.scss';

// Generate metadata for the dividend page
export const metadata = generateSEOMetadata({
  title: "Dividend - Lupin | Investor Relations",
  description: "View Lupin Limited's dividend information, dividend history, and dividend payment details for shareholders.",
  canonicalUrl: "https://www.lupin.com/investors/dividend",
  keywords: "Lupin dividend, dividend information, dividend history, dividend payment, investor relations, Lupin Limited",
});

export default async function DividendPage() {
  let dividendData = null;
  let bannerData = null;
  let error = null;
  
  try {
    const rawData = await getDividend();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Dividend - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasDividendTdsCommunicationSection: !!(rawData?.data?.DividendTdsCommunicationSection || rawData?.DividendTdsCommunicationSection),
        hasDivedendHistorySection: !!(rawData?.data?.DivedendHistorySection || rawData?.DivedendHistorySection)
      });
    }
    
    if (rawData) {
      dividendData = mapDividendData(rawData);
      
      // Map banner data (Single Type, so TopBanner is directly on data object)
      const topBanner = rawData?.data?.TopBanner || rawData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Dividend - Mapped data:', {
          hasTdsSection: !!dividendData?.tdsSection,
          hasHistorySection: !!dividendData?.historySection,
          hasBanner: !!bannerData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Dividend - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch dividend data from Strapi';
    console.error('Error fetching Dividend data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return (
    <div className="dividend-page-wrapper" style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <section className="dividend-page">
        <NavigationLinks />
        <TdsDividendSection data={dividendData?.tdsSection} error={error} />
      </section>

      {/* Dividend History Section */}
      {(() => {
        // Use API data if available, otherwise use fallback
        const historySection = dividendData?.historySection;
        const fallbackTable = getFallbackDividendHistoryTable();
        
        // If API provides rich text history, render it as HTML
        if (historySection?.dividendHistory) {
          return (
            <>
              {/* Intro Text */}
              {historySection.introText && (
                <section className="policies tablePolicies">
                  <div className="policies__container">
                    <div className="policies__content policies__content--no-top-margin">
                      <div 
                        className="policies__table-paragraph"
                        dangerouslySetInnerHTML={{ __html: historySection.introText }}
                      />
                    </div>
                  </div>
                </section>
              )}
              
              {/* Dividend History (Rich Text from API) */}
              {historySection.dividendHistory && (
                <section className="policies tablePolicies">
                  <div className="policies__container">
                    <div className="policies__content policies__content--no-top-margin">
                      <div 
                        className="policies__dividend-history"
                        dangerouslySetInnerHTML={{ __html: historySection.dividendHistory }}
                      />
                    </div>
                  </div>
                </section>
              )}
            </>
          );
        }
        
        // Otherwise, use fallback JSON table with VotingTable component
        return <VotingTable data={fallbackTable} />;
      })()}
     
      <SubscriberUpdated />
    </div>
  );
}

