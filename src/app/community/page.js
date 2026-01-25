import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getCommunity, mapCommunityInfoData, mapTopBannerData, mapLivelihoodTabsData, mapLivelihoodSectionData, mapImpactSectionData, mapLiveProgramSectionData } from '@/lib/strapi';
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
  let bannerData = null;
  let infoData = null;
  let impactData = null;
  let livelihoodData = null;
  let tabsData = null;
  let liveProgramData = null;

  try {
    const strapiData = await getCommunity();
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }

    // Map InfoSection data
    infoData = mapCommunityInfoData(strapiData);

    // Map ImpactSection data
    impactData = mapImpactSectionData(strapiData);

    // Map LivelihoodSection data
    livelihoodData = mapLivelihoodSectionData(strapiData);

    // Map LivelihoodTabs data
    tabsData = mapLivelihoodTabsData(strapiData);

    // Map LiveProgramSection data
    liveProgramData = mapLiveProgramSectionData(strapiData);
  } catch (error) {
    console.error('Error fetching community data from Strapi:', error);
  }

  // Default info data if Strapi data is not available
  const defaultParagraphs = [
    "At Lupin, communities have always been at the heart of everything we do. Our founder, Dr. Desh Bandhu Gupta's, conviction of selfless service to those in need led to the establishment of our CSR arm, Lupin Human Welfare and Research Foundation (LHWRF) and has shaped our efforts to build rural communities, promote sustainable livelihoods, and protect our environment.",
    "Through this channel, we have closely worked with underserved and marginalized communities to create lasting social change. Over the past 3 decades, we have impacted 2.02 million lives across India."
  ];

  const paragraphs = infoData?.paragraphs || defaultParagraphs;
  const infoImage = infoData?.image || {
    url: "/assets/community/infoImage.png",
    alt: "Community Impact",
    width: 600,
    height: 600
  };

  return (
    <div style={{ position: 'relative' }}>
      {bannerData && <InnerBanner data={bannerData} />}
      <section className="community-info">
        <div className="community-info__container">
          <div className="community-info__content">
            <div className="community-info__text">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="community-info__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="community-info__image-wrapper">
            <Image
              src={infoImage.url}
              alt={infoImage.alt}
              width={infoImage.width}
              height={infoImage.height}
              className="community-info__image"
              quality={100}
            />
          </div>
        </div>
      </section>
      {impactData && <ImpactAtGlance impactData={impactData} />}
      <LivelihoodSection livelihoodData={livelihoodData} />
      <LivelihoodTabs tabs={tabsData || []} />
      {liveProgramData && <LivesProgram programData={liveProgramData} />}
      <FoundationLink linkData={null} />
      
    </div>
  );
}

