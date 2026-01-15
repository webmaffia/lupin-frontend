import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getCommunity, mapCommunityInfoData, mapTopBannerData, mapLivelihoodTabsData } from '@/lib/strapi';
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
  let tabsData = null;

  try {
    const strapiData = await getCommunity();
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
    }

    // Map InfoSection data
    infoData = mapCommunityInfoData(strapiData);

    // Map LivelihoodTabs data
    tabsData = mapLivelihoodTabsData(strapiData);
  } catch (error) {
    console.error('Error fetching community data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Community",
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Community"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
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
      <InnerBanner data={bannerData} />
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
      <section className="community-livelihood">
        <div className="community-livelihood__bg">
          <picture>
            {/* Mobile image can be added here later */}
            {/* <source media="(max-width: 768px)" srcSet="/assets/community/livelihood-mobile.png" /> */}
            <img
              src="/assets/community/livelihood.png"
              alt="Livelihood"
              className="community-livelihood__bg-image"
            />
          </picture>
        </div>
        <div className="community-livelihood__container">
          <div className="community-livelihood__content">
            <h2 className="community-livelihood__heading">
              Livelihood Program
            </h2>
            <div className="community-livelihood__text">
              <h3 className="community-livelihood__subheading">
                Desh Bandhu Jan Utkarsh Pariyojana
              </h3>
              <div className="community-livelihood__paragraphs">
                <p className="community-livelihood__paragraph">
                  Agriculture remains the backbone of rural India, but still farmers face
                  challenges such as low productivity, climate vulnerability or lack of modern agricultural practices.
                </p>
                <p className="community-livelihood__paragraph">
                  Through its Livelihood Program, LHWRF addresses these challenges by enabling technology-led, climate-resilient livelihood solutions anchored in agriculture
                  and allied activities.
                </p>
                <p className="community-livelihood__paragraph">
                  Implemented across all eight states, the program has reached millions of families, supporting their transition from mere subsistence to long-term sustainability.
                  Within the Livelihood Program, LHWRF focuses on three focus areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LivelihoodTabs tabs={tabsData || []} />
      <LivesProgram programData={null} />
      <FoundationLink linkData={null} />
      <ImpactAtGlance impactData={null} />
    </div>
  );
}

