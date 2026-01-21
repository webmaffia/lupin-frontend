'use client';

import Image from 'next/image';
import '../scss/components/GlobalGenericsRegionalPresence.scss';

export default function GlobalGenericsRegionalPresence({ data }) {
  const defaultData = {
    heading: "Regional Presence",
    background: {
      desktop: "/assets/images/global-generic/bigbg.png",
      mobile: "/assets/images/global-generic/bigbg.png" // Same for now, will be changed in Strapi
    },
    regions: [
      {
        title: "United States",
        position: "top-left",
        backgroundColor: "#08a03f",
        highlights: [
          "#3 largest generics company by prescriptions filled",
          "#3 in U.S. generics respiratory sales"
        ],
        description: "Since entering the pharmaceutical generics market in 2003, Lupin has received over 300 FDA approvals and currently markets more than 150 generic products in the U.S. With deep science-led backing, a robust portfolio, strong customer relationships, and utmost attention to quality, the U.S. remains a critical driver of Lupin's growth."
      },
      {
        title: "Canada",
        position: "top-right",
        backgroundColor: "#034a1d",
        highlights: [
          "~18% CAGR growth (FY20–FY25)",
          "First generic Tolvaptan – affordable access to critical kidney therapy"
        ],
        description: "The Canadian pharmaceutical market continues to grow extensively and specializes in gastroenterology, women's health, and niche and complex generics, delivering an 18% CAGR between FY20 and FY25."
      },
      {
        title: "United Kingdom",
        position: "middle-left",
        backgroundColor: "#05461d",
        highlights: [
          "Luforbec: #1 primary care respiratory brand",
          "Leadership in sustainable inhalers",
          "230,000+ patients treated monthly for respiratory disorders"
        ],
        description: "Lupin Healthcare UK has strengthened its leadership in respiratory care. Luforbec, Lupin's flagship inhaler, is the top primary care respiratory brand by value and volume, with a large user base highlighting its widespread adoption and trust among prescribers. Lupin also leads in sustainability through the provision of carbon-neutral inhalers and the development of next-generation, eco-friendly propellants."
      },
      {
        title: "Europe",
        position: "middle-right",
        backgroundColor: "#0a933c",
        highlights: [
          "Contributes ~11% of global revenues",
          "Growth led by respiratory, neurology and injectables"
        ],
        description: "Lupin's European operations have consistently delivered strong growth, supported by expansion in respiratory, neurology, and injectable portfolios. Together with the U.K. and Australia, Europe contributes to approximately 11% of Lupin's global revenues, underscoring its importance as a strategic market."
      },
      {
        title: "Australia",
        position: "bottom",
        backgroundColor: "#0a933c",
        highlights: [
          "#4 generics player (Generic Health)",
          "Strategic Expansion into Complex Generics"
        ],
        description: "Australia is a mature, highly regulated pharmaceutical market with a strong generics base. Lupin's wholly owned subsidiary, Generic Health, is the one of the largest generics player in Australia and has delivered consistent growth over the past five years. Portfolio expansion, operational agility, and entry into new therapy areas continue to strengthen Lupin's presence in this important developed market."
      }
    ]
  };

  const regionalData = data || defaultData;
  const heading = regionalData?.heading || defaultData.heading;
  const backgroundDesktop = regionalData?.background?.desktop || regionalData?.backgroundImage?.desktop || defaultData.background.desktop;
  const backgroundMobile = regionalData?.background?.mobile || regionalData?.backgroundImage?.mobile || defaultData.background.mobile;
  const regions = regionalData?.regions || regionalData?.items || defaultData.regions;

  return (
    <section className="global-generics-regional" data-node-id="3115:643">
      <div className="global-generics-regional__background">
        <Image
          src={backgroundDesktop}
          alt="Regional presence background"
          fill
          className="global-generics-regional__bg-image global-generics-regional__bg-image--desktop"
          quality={100}
        />
        <Image
          src={backgroundMobile}
          alt="Regional presence background"
          fill
          className="global-generics-regional__bg-image global-generics-regional__bg-image--mobile"
          quality={100}
        />
      </div>
      <div className="global-generics-regional__container">
        <h2 className="global-generics-regional__heading">
          {heading}
        </h2>
        <div className="global-generics-regional__cards">
          {regions.map((region, index) => (
            <div 
              key={index} 
              className={`global-generics-regional__card global-generics-regional__card--${region.position || 'top-left'}`}
              style={{ backgroundColor: region.backgroundColor || '#08a03f' }}
            >
              <h3 className="global-generics-regional__card-title">
                {region.title || region.name || ''}
              </h3>
              {region.highlights && region.highlights.length > 0 && (
                <ul className="global-generics-regional__highlights">
                  {region.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="global-generics-regional__highlight">
                      <div className="global-generics-regional__highlight-icon">
                        <Image
                          src="/assets/images/global-generic/extrasmall.svg"
                          alt=""
                          width={18}
                          height={17}
                          quality={100}
                        />
                      </div>
                      <span className="global-generics-regional__highlight-text">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
              {region.description && (
                <p className="global-generics-regional__description">
                  {region.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

