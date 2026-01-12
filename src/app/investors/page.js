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

// Generate metadata for the investors page
export const metadata = generateSEOMetadata({
  title: "Investor Relations - Lupin | Stock Information & Corporate Governance",
  description: "Access Lupin Limited's investor relations information, including stock details, financial reports, corporate governance, and investor resources.",
  canonicalUrl: "https://www.lupin.com/investors",
  keywords: "Lupin investor relations, stock information, financial reports, corporate governance, investor resources, Lupin Limited",
});

export default async function InvestorsPage() {
  // Fetch news insights data from Strapi
  let newsInsightsData = null;
  
  try {
    // Fetch from homepage using the same function as the homepage
    // This ensures we get the same news data structure with proper population
    const homepageData = await getHomepage();
    
    // Log raw API response for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Investors page - Raw Strapi API response:', JSON.stringify(homepageData, null, 2));
    }
    
    // Map using the same function as homepage
    try {
      newsInsightsData = mapHomepageNewsInsightsData(homepageData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Investors page - Mapped news insights data:', JSON.stringify(newsInsightsData, null, 2));
      }
    } catch (mapError) {
      console.error('Error mapping news insights data:', mapError);
      // Will fall back to default data
    }
  } catch (error) {
    console.error('Error fetching homepage data from Strapi for investors page:', error);
    // Will use default data below
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

  const bannerData = {
    title: {
      line1: "Investors",
     
    },
    subheading: {
      enabled: true,
      text: "Trust and Growth Focus"
    },
    images: {
      banner: {
        url: "/assets/inner-banner/Investors.png",
        alt: "Investor Relations"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };
  
  // Fetch intro section data from Strapi
  let introData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract intro data if available in Strapi
    // Supports multiple data structures:
    // 1. paragraphs array (preferred)
    // 2. content array
    // 3. text string (will be split by newlines)
    if (investorsPageData?.data?.attributes?.intro || investorsPageData?.intro) {
      const intro = investorsPageData?.data?.attributes?.intro || investorsPageData?.intro;
      introData = {
        paragraphs: intro.paragraphs || intro.content || (intro.text ? intro.text.split('\n').filter(p => p.trim()) : []),
        content: intro.content || (intro.text ? [intro.text] : []),
        text: intro.text || intro.content
      };
    }
  } catch (error) {
    console.error('Error fetching intro data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch What's New data from Strapi
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
    // Will use default data below
  }

  // Default What's New data extracted from HTML
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
        },
        {
          id: 5,
          date: "December 16, 2025",
          headline: "Lupin Secures SBTi Validation for Emission Reduction Targets",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-secures-sbti-validation-for-emission-reduction-targets/"
        },
        {
          id: 6,
          date: "December 12, 2025",
          headline: "Lupin Manufacturing Solutions and PolyPeptide Announce Strategic Alliance to Scale Global Peptide Supply Chain",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-manufacturing-solutions-and-polypeptide-announce-strategic-alliance-to-scale-global-peptide-supply-chain/"
        },
        {
          id: 7,
          date: "December 5, 2025",
          headline: "Lupin Receives Tentative Approval from U.S. FDA for Siponimod Tablets",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-tentative-approval-from-u-s-fda-for-siponimod-tablets/"
        },
        {
          id: 8,
          date: "December 4, 2025",
          headline: "Lupin and Valorum Enter into an Exclusive Licensing Agreement for Biosimilar Armlupeg™ (Pegfilgrastim-unne) in the United States",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-and-valorum-enter-into-an-exclusive-licensing-agreement-for-biosimilar-armlupeg-pegfilgrastim-unne-in-the-united-states/"
        },
        {
          id: 9,
          date: "December 1, 2025",
          headline: "Lupin Receives Approval from U.S. FDA for Biosimilar Armlupeg™ (Pegfilgrastim-unne)",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-approval-from-u-s-fda-for-biosimilar-armlupeg-pegfilgrastim-unne/"
        },
        {
          id: 10,
          date: "November 28, 2025",
          headline: "Lupin Foundation Earns CRISIL's Highest VO 1A Rating for Excellence in Social Responsibility",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-foundation-earns-crisils-highest-vo-1a-rating-for-excellence-in-social-responsibility/"
        },
        {
          id: 11,
          date: "November 15, 2025",
          headline: "Lupin Announces Closure of Inspection by U.S. FDA at its Nagpur Unit-1 Facility with No Observations",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-announces-closure-of-inspection-by-u-s-fda-at-its-nagpur-unit-1-facility-with-no-observations/"
        },
        {
          id: 12,
          date: "November 14, 2025",
          headline: "Lupin Launches Risperidone Long-Acting Injectable with 180-day CGT exclusivity in the U.S., the First Product from its Proprietary Long-Acting Injectable Platform PrecisionSphere™",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-launches-risperidone-long-acting-injectable-with-180-day-cgt-exclusivity-in-the-u-s-the-first-product-from-its-proprietary-long-acting-injectable-platform-precisionsphere/"
        },
        {
          id: 13,
          date: "November 13, 2025",
          headline: "Lupin Establishes a New Global Standard in Sustainable Pharma with an S&P Global ESG Score of 91",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-establishes-a-new-global-standard-in-sustainable-pharma-with-an-sp-global-esg-score-of-91/"
        },
        {
          id: 14,
          date: "November 12, 2025",
          headline: "Lupin Receives EIR from U.S. FDA for its Aurangabad (CSN) Facility",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-eir-from-u-s-fda-for-its-aurangabad-csn-facility/"
        },
        {
          id: 15,
          date: "November 12, 2025",
          headline: "Lupin Manufacturing Solutions Unveils Dedicated Oncology Block at Vizag, India",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-manufacturing-solutions-unveils-dedicated-oncology-block-at-vizag-india/"
        },
        {
          id: 16,
          date: "November 8, 2025",
          headline: "Lupin Bioresearch Center Receives Zero Observations from U.S. FDA After Successful Inspection and Assessment",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-bioresearch-center-receives-zero-observations-from-u-s-fda-after-successful-inspection-and-assessment/"
        },
        {
          id: 17,
          date: "November 6, 2025",
          headline: "Lupin Q2 FY2026 Results",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-q2-fy2026-results/"
        },
        {
          id: 18,
          date: "November 5, 2025",
          headline: "Lupin Receives EIR from U.S. FDA for its Pithampur Unit-3 Facility",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-eir-from-u-s-fda-for-its-pithampur-unit-3-facility/"
        },
        {
          id: 19,
          date: "October 30, 2025",
          headline: "Lupin Digital Health Launches VITALYFE™",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-digital-health-launches-vitalyfe/"
        },
        {
          id: 20,
          date: "October 28, 2025",
          headline: "Governor Murphy and Local Leaders Attend Ribbon-Cutting Ceremony, Marking the Inauguration of Lupin's New Corporate Offices in Bridgewater",
          category: "Press Release",
          href: "https://www.lupin.com/governor-murphy-and-local-leaders-attend-ribbon-cutting-ceremony-marking-the-inauguration-of-lupins-new-corporate-offices-in-bridgewater/"
        },
        {
          id: 21,
          date: "October 24, 2025",
          headline: "Lupin Launches Authorized Generic Version of Ravicti® in the United States",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-launches-authorized-generic-version-of-ravicti-in-the-united-states/"
        },
        {
          id: 22,
          date: "October 13, 2025",
          headline: "Lupin Announces Presentation of Phase 1 Data on LNP3693 (STING agonist) at the ESMO Congress 2025",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-announces-presentation-of-phase-1-data-on-lnp3693-sting-agonist-at-the-esmo-congress-2025/"
        },
        {
          id: 23,
          date: "October 9, 2025",
          headline: "Lupin Unveils Strategic Partnership Program to Expand Reach of its Long-Acting Injectable Platform",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-unveils-strategic-partnership-program-to-expand-reach-of-its-long-acting-injectable-platform/"
        },
        {
          id: 24,
          date: "October 8, 2025",
          headline: "Lupin Announces Plans to Build a New State-of-the-Art Manufacturing Facility in Coral Springs, Florida Extending its Long-Standing Commitment to the U.S. Market",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-announces-plans-to-build-a-new-state-of-the-art-manufacturing-facility-in-coral-springs-florida/"
        },
        {
          id: 25,
          date: "October 3, 2025",
          headline: "Lupin Launches Liraglutide Injection in the United States",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-launches-liraglutide-injection-in-the-united-states/"
        },
        {
          id: 26,
          date: "October 1, 2025",
          headline: "Lupin Launches Rivaroxaban for Oral Suspension in the United States",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-launches-rivaroxaban-for-oral-suspension-in-the-united-states/"
        },
        {
          id: 27,
          date: "September 30, 2025",
          headline: "Lupin Receives Approval from U.S. FDA for Rivaroxaban for Oral Suspension",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-approval-from-u-s-fda-for-rivaroxaban-for-oral-suspension/"
        },
        {
          id: 28,
          date: "September 29, 2025",
          headline: "Lupin Strengthens its Global Specialty Ophthalmology Business with Acquisition of VISUfarma from GHO Capital",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-strengthens-its-global-specialty-ophthalmology-business-with-acquisition-of-visufarma-from-gho-capital/"
        },
        {
          id: 29,
          date: "September 24, 2025",
          headline: "Lupin Receives Tentative Approval from U.S. FDA for Bictegravir, Emtricitabine, and Tenofovir Alafenamide Tablets",
          category: "Press Release",
          href: "https://www.lupin.com/lupin-receives-tentative-approval-from-u-s-fda-for-bictegravir-emtricitabine-and-tenofovir-alafenamide-tablets/"
        }
      ]
    };
  }

  // Fetch Corporate Governance data from Strapi
  let governanceData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract Corporate Governance data if available in Strapi
    if (investorsPageData?.data?.attributes?.corporateGovernance || investorsPageData?.corporateGovernance) {
      const governance = investorsPageData?.data?.attributes?.corporateGovernance || investorsPageData?.corporateGovernance;
      governanceData = {
        title: governance.title || "Corporate Governance",
        backgroundImage: governance.backgroundImage || governance.image,
        buttons: governance.buttons || governance.items || []
      };
    }
  } catch (error) {
    console.error('Error fetching Corporate Governance data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Shareholder Information data from Strapi
  let shareholderData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract Shareholder Information data if available in Strapi
    if (investorsPageData?.data?.attributes?.shareholderInformation || investorsPageData?.shareholderInformation) {
      const shareholder = investorsPageData?.data?.attributes?.shareholderInformation || investorsPageData?.shareholderInformation;
      shareholderData = {
        title: shareholder.title || "Shareholder Information",
        centerImage: shareholder.centerImage || shareholder.image,
        leftColumn: shareholder.leftColumn || shareholder.leftLinks || [],
        rightColumn: shareholder.rightColumn || shareholder.rightLinks || []
      };
    }
  } catch (error) {
    console.error('Error fetching Shareholder Information data from Strapi:', error);
    // Will use default data from component
  }

  // Fetch Reports and Filings data from Strapi
  let reportsFilingsData = null;
  try {
    const investorsPageData = await getHomepage();
    // Extract Reports and Filings data if available in Strapi
    if (investorsPageData?.data?.attributes?.reportsAndFilings || investorsPageData?.reportsAndFilings) {
      const reports = investorsPageData?.data?.attributes?.reportsAndFilings || investorsPageData?.reportsAndFilings;
      reportsFilingsData = {
        title: reports.title || "Reports and Filings",
        leftCard: reports.leftCard || null,
        middleCard: reports.middleCard || null,
        rightCard: reports.rightCard || null
      };
    }
  } catch (error) {
    console.error('Error fetching Reports and Filings data from Strapi:', error);
    // Will use default data from component
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

