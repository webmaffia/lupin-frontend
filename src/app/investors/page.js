import InnerBanner from '@/components/InnerBanner';
import InvestorIntro from '@/components/InvestorIntro';
import WhatsNew from '@/components/WhatsNew';
import CorporateGovernance from '@/components/CorporateGovernance';
import ShareholderInformation from '@/components/ShareholderInformation';
import ReportsAndFilings from '@/components/ReportsAndFilings';
import NewsInsights from '@/components/NewsInsights';
import SubscriberUpdated from '@/components/SubscriberUpdated';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getHomepage, mapHomepageNewsInsightsData } from '@/lib/strapi';
import { getInvestor, mapInvestorData } from '@/lib/strapi-reports';
import { mapTopBannerData } from '@/lib/strapi';

// Generate metadata for the investors page
export const metadata = generateSEOMetadata({
  title: "Investor Relations - Lupin | Stock Information & Corporate Governance",
  description: "Access Lupin Limited's investor relations information, including stock details, financial reports, corporate governance, and investor resources.",
  canonicalUrl: "https://www.lupin.com/investors",
  keywords: "Lupin investor relations, stock information, financial reports, corporate governance, investor resources, Lupin Limited",
});

export default async function InvestorsPage() {
  // Fetch investor page data from /api/investor
  let investorData = null;
  let bannerData = null;
  let introData = null;
  let governanceData = null;
  let shareholderData = null;
  let reportsFilingsData = null;
  let error = null;

  try {
    const rawInvestorData = await getInvestor();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Investors page - Raw API data received:', {
        hasData: !!rawInvestorData,
        isDataObject: !Array.isArray(rawInvestorData?.data) && !!rawInvestorData?.data,
        hasTopBanner: !!(rawInvestorData?.data?.TopBanner || rawInvestorData?.TopBanner)
      });
    }

    if (rawInvestorData) {
      const mappedData = mapInvestorData(rawInvestorData);
      
      // Map banner data
      const topBanner = rawInvestorData?.data?.TopBanner || rawInvestorData?.TopBanner;
      bannerData = mapTopBannerData(topBanner);

      // Map introduction section (Rich text - Markdown)
      if (mappedData.introductionSection) {
        // Split by newlines if it's a string, or use as is if it's already processed
        const introText = typeof mappedData.introductionSection === 'string' 
          ? mappedData.introductionSection 
          : mappedData.introductionSection;
        introData = {
          text: introText,
          paragraphs: typeof introText === 'string' 
            ? introText.split('\n').filter(p => p.trim())
            : []
        };
      }

      // Map Corporate Governance Section
      if (mappedData.corporateGovernanceSection) {
        const cg = mappedData.corporateGovernanceSection;
        governanceData = {
          title: cg.sectionTitle || "Corporate Governance",
          backgroundImage: cg.desktopImage ? {
            url: cg.desktopImage,
            alt: cg.sectionTitle || "Corporate Governance"
          } : null,
          buttons: cg.links.map((link, index) => ({
            id: index + 1,
            label: link.text,
            href: link.href,
            isActive: false
          }))
        };
      }

      // Map Shareholder Information Section
      if (mappedData.shareholderInformationSection) {
        const sh = mappedData.shareholderInformationSection;
        // Split shareholder information into left and right columns
        // For now, we'll put all items in leftColumn and empty rightColumn
        // You can adjust the logic based on your needs
        const midPoint = Math.ceil(sh.shareholderInformation.length / 2);
        shareholderData = {
          title: sh.sectionTitle || "Shareholder Information",
          centerImage: sh.image ? {
            url: sh.image,
            alt: sh.sectionTitle || "Shareholder Information"
          } : null,
          leftColumn: sh.shareholderInformation.slice(0, midPoint).map(item => ({
            text: item.pdfTitle,
            href: item.documentPdf || item.cta.href || '#',
            download: !!item.documentPdf
          })),
          rightColumn: sh.shareholderInformation.slice(midPoint).map(item => ({
            text: item.pdfTitle,
            href: item.documentPdf || item.cta.href || '#',
            download: !!item.documentPdf
          }))
        };
      }

      // Map Reports and Filings Section
      if (mappedData.reportsFilingSection) {
        const rf = mappedData.reportsFilingSection;
        const financialHighlight = rf.financialHighlightCard;
        const integratedReport = rf.integratedReport;

        reportsFilingsData = {
          title: "Reports and Filings",
          leftCard: financialHighlight ? {
            badge: financialHighlight.financialYear || "Q2 FY26",
            items: [
              financialHighlight.grossProfit ? `Gross Profit : ${financialHighlight.grossProfit}` : null,
              financialHighlight.grossProfitMargin ? `Gross profit margin : ${financialHighlight.grossProfitMargin}` : null,
              financialHighlight.rndInvestment ? `Investment in R&D : ${financialHighlight.rndInvestment}` : null
            ].filter(Boolean),
            buttons: [
              {
                label: "Download Now",
                href: financialHighlight.documentFile || financialHighlight.cta.href || '#',
                download: !!financialHighlight.documentFile
              },
              {
                label: "View all",
                href: financialHighlight.viewAllUrl || '#'
              }
            ]
          } : null,
          middleCard: integratedReport ? {
            title: integratedReport.reportTitle ? integratedReport.reportTitle.split(' ') : ["Integrated", "Report"],
            image: integratedReport.coverImage ? {
              url: integratedReport.coverImage.url,
              alt: integratedReport.coverImage.alt
            } : null,
            buttons: [
              {
                label: integratedReport.downloadLabel || "Download Now",
                href: integratedReport.reportFile || '#',
                variant: "outline",
                download: !!integratedReport.reportFile
              },
              {
                label: integratedReport.viewAllLabel || "View all",
                href: integratedReport.viewAllUrl || '#',
                variant: "filled"
              }
            ]
          } : null,
          rightCard: mappedData.reportsFilingSection?.nseExchangeSection ? {
            badge: mappedData.reportsFilingSection.nseExchangeSection.sectionTitle || "Exchange filings (BSE/NSE)",
            links: mappedData.reportsFilingSection.nseExchangeSection.pdfDocuments.map(pdf => ({
              text: pdf.title,
              href: pdf.pdf || '#',
              download: !!pdf.pdf
            })),
            button: {
              label: "View all",
              href: "#"
            }
          } : null
        };
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Investors page - Mapped data:', {
          hasBanner: !!bannerData,
          hasIntro: !!introData,
          hasGovernance: !!governanceData,
          hasShareholder: !!shareholderData,
          hasReportsFilings: !!reportsFilingsData
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Investors page - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch investor data from Strapi';
    console.error('Error fetching Investors page data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Keep press release section (WhatsNew) as is - using homepage API
  // Fetch news insights data from Strapi (from homepage)
  let newsInsightsData = null;
  
  try {
    // Fetch from homepage using the same function as the homepage
    // This ensures we get the same news data structure with proper population
    const homepageData = await getHomepage();
    
    // Map using the same function as homepage
    try {
      newsInsightsData = mapHomepageNewsInsightsData(homepageData);
    } catch (mapError) {
      console.error('Error mapping news insights data:', mapError);
    }
  } catch (error) {
    console.error('Error fetching homepage data from Strapi for investors page:', error);
  }

  // Default news insights data if Strapi data is not available
  if (!newsInsightsData) {
    newsInsightsData = {
      title: "News & Insights",
      items: [
        {
          id: 1,
          date: "12 September, 2025",
          headline: "Lupin Announces Q2 Financial Results",
          image: {
            url: "/assets/placeholder.jpg",
            width: 627,
            height: 627,
            alt: "Q2 Financial Results"
          },
          href: "#"
        },
        {
          id: 2,
          date: "15 August, 2025",
          headline: "New Product Launch in Key Markets",
          image: {
            url: "/assets/placeholder.jpg",
            width: 627,
            height: 627,
            alt: "Product Launch"
          },
          href: "#"
        }
      ]
    };
  }

  // Keep What's New (Press Release) section as is - using homepage API
  // Fetch What's New data from Strapi (from homepage)
  let whatsNewData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract What's New data if available in Strapi
    if (investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew) {
      const whatsNew = investorsPageData?.data?.attributes?.whatsNew || investorsPageData?.whatsNew;
      whatsNewData = {
        title: whatsNew.title || "What's New",
        items: whatsNew.items || whatsNew.news || []
      };
    }
  } catch (error) {
    console.error('Error fetching What\'s New data from Strapi:', error);
  }

  // Default What's New data (fallback) - Keep Press Release with 4 items for slider
  if (!whatsNewData || !whatsNewData.items || whatsNewData.items.length === 0) {
    whatsNewData = {
      title: "What's New",
      items: [
        {
          id: 1,
          date: "December 29, 2025",
          headline: "Lupin Signs Exclusive Licensing Agreement with Gan & Lee Pharmaceuticals for novel GLP-1 receptor agonist",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-signs-exclusive-licensing-agreement-with-gan-lee-pharmaceuticals-for-novel-glp-1-receptor-agonist/"
        },
        {
          id: 2,
          date: "December 18, 2025",
          headline: "Lupin Signs Exclusive Licensing Agreement with Neopharmed for Gastroenterology Brand Plasil® in the Philippines and Brazil",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-signs-exclusive-licensing-agreement-with-neopharmed-for-gastroenterology-brand-plasil-in-the-philippines-and-brazil/"
        },
        {
          id: 3,
          date: "December 17, 2025",
          headline: "Lupin Receives Positive CHMP Opinion for Biosimilar Ranibizumab",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-positive-chmp-opinion-for-biosimilar-ranibizumab/"
        },
        {
          id: 4,
          date: "December 16, 2025",
          headline: "Lupin Receives EIR from US FDA for its Nagpur Injectable Facility",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-eir-from-us-fda-for-its-nagpur-injectable-facility/"
        }
      ]
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <InvestorIntro data={introData} />
      <WhatsNew data={whatsNewData} />
      <ReportsAndFilings data={reportsFilingsData} />
      <CorporateGovernance data={governanceData} />
      <ShareholderInformation data={shareholderData} />
     
      <NewsInsights data={newsInsightsData} />
      <SubscriberUpdated />
    </div>
  );
}

