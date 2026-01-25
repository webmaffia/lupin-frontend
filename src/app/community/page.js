import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getCommunity, mapCommunityData } from '@/lib/strapi-pages';
import LivelihoodSection from '@/components/community/LivelihoodSection';
import LivelihoodTabs from '@/components/community/LivelihoodTabs';
import LivesProgram from '@/components/community/LivesProgram';
import FoundationLink from '@/components/community/FoundationLink';
import ImpactAtGlance from '@/components/community/ImpactAtGlance';
import '@/scss/pages/community.scss';

// Generate metadata for the Community page
export async function generateMetadata() {
  return generateSEOMetadata({
    title: "Community - Lupin | Our Commitment to Society",
    description: "Discover how Lupin is making a positive impact in communities worldwide through our corporate social responsibility initiatives and community engagement programs.",
    canonicalUrl: "https://www.lupin.com/community",
    keywords: "Lupin community, corporate social responsibility, CSR, community engagement, Lupin Limited, social impact",
  });
}

export default async function CommunityPage() {
  // Fetch data from Strapi
  let communityData = {
    banner: null,
    pageIntroSection: null,
    impactSection: null,
    livelihoodSection: null,
    tabSectionDetails: [],
    liveProgramSection: null
  };

  try {
    const strapiData = await getCommunity();
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('CommunityPage - Raw Strapi data:', strapiData);
      console.log('CommunityPage - TabSectionDetails from API:', strapiData?.data?.TabSectionDetails);
    }
    
    communityData = mapCommunityData(strapiData);
    
    // Debug logging after mapping
    if (process.env.NODE_ENV === 'development') {
      console.log('CommunityPage - Mapped communityData:', communityData);
      console.log('CommunityPage - tabSectionDetails:', communityData.tabSectionDetails);
      communityData.tabSectionDetails.forEach((tab, index) => {
        console.log(`CommunityPage - Tab ${index + 1} (id: ${tab.id}):`, {
          title: tab.title,
          content: tab.content
        });
      });
    }
  } catch (error) {
    console.error('Error fetching community data from Strapi:', error);
  }

  // Map ImpactSection data for ImpactAtGlance component
  // Format number with commas
  const formatNumber = (num) => {
    if (typeof num === 'string') {
      // Remove any existing commas and format
      const cleanNum = num.replace(/,/g, '');
      return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const impactData = communityData.impactSection ? {
    title: communityData.impactSection.sectionTitle,
    subtitle: communityData.impactSection.headings.length > 0 
      ? communityData.impactSection.headings.map(h => h.description).join(' | ')
      : '',
    map: communityData.impactSection.map,
    metrics: communityData.impactSection.metrics.map((metric, index) => ({
      id: metric.id || index + 1,
      number: formatNumber(metric.value),
      description: metric.description,
      icon: '/assets/community/key1.svg' // Use static icon
    }))
  } : null;

  // Map LivelihoodSection data
  const livelihoodData = communityData.livelihoodSection ? {
    heading: communityData.livelihoodSection.heading,
    subheading: communityData.livelihoodSection.sectionTitle,
    description: communityData.livelihoodSection.description,
    backgroundImage: communityData.livelihoodSection.image?.url || communityData.livelihoodSection.image?.mobileUrl || '/assets/community/livelihood.png'
  } : null;

  // Map TabSectionDetails data for LivelihoodTabs
  const tabsData = communityData.tabSectionDetails.map((tab) => ({
    id: tab.id,
    title: tab.title,
    content: tab.content
  }));

  // Map LiveProgramSection data
  const liveProgramData = communityData.liveProgramSection ? {
    title: communityData.liveProgramSection.heading,
    subtitle: communityData.liveProgramSection.subHeading,
    description: communityData.liveProgramSection.description,
    image: communityData.liveProgramSection.image,
    highlights: communityData.liveProgramSection.keyHighlights
  } : null;

  const CustomParagraph = ({ children }) => {
    return <p className="community-info__paragraph">{children}</p>;
  }

  return (
    <div style={{ position: 'relative' }}>
      {communityData.banner && <InnerBanner data={communityData.banner} />}
      
      {/* PageIntroSection */}
      {communityData.pageIntroSection && (
        <section className="community-info">
          <div className="community-info__container">
            <div className="community-info__content">
              <div className="community-info__text">
                {communityData.pageIntroSection.content && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                    p: CustomParagraph,
                  }}
                  >
                    {communityData.pageIntroSection.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
            {communityData.pageIntroSection.image && (
              <div className="community-info__image-wrapper">
                <Image
                  src={communityData.pageIntroSection.image.url}
                  alt={communityData.pageIntroSection.image.alt}
                  width={communityData.pageIntroSection.image.width}
                  height={communityData.pageIntroSection.image.height}
                  className="community-info__image"
                  quality={100}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ImpactSection */}
      {communityData.impactSection && (
        <ImpactAtGlance impactData={impactData} />
      )}

      {/* LivelihoodSection */}
      {communityData.livelihoodSection && (
        <LivelihoodSection livelihoodData={livelihoodData} />
      )}

      {/* TabSectionDetails */}
      {communityData.tabSectionDetails.length > 0 && (
        <LivelihoodTabs tabs={tabsData} />
      )}

      {/* LiveProgramSection */}
      {communityData.liveProgramSection && (
        <LivesProgram programData={liveProgramData} />
      )}

      {/* FoundationLink - Keep static for now */}
      <FoundationLink linkData={null} />
    </div>
  );
}

