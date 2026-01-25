'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/GlobalGenericsPortfolio.scss';

export default function GlobalGenericsPortfolio({ data }) {
  const defaultData = {
    description: "By leveraging a robust portfolio spanning therapy areas such as anti-diabetes, cardiovascular, respiratory, anti-infectives, anti-TB, and more, Lupin has become a partner of choice and reaches over 60 million lives annually, a considerable portion of the American population. Across other developed markets, including Europe, Canada, and Australia, Lupin's generics business continues to scale through differentiated portfolios and strong local execution. Together, these markets account for approximately 11% of Lupin's global revenues.",
    link: {
      text: "View our Generics Portfolio",
      url: "#"
    },
    image: {
      url: "/assets/images/global-generic/Firefly_Gemini Flash_Premium healthcare scene showing a doctor consulting a patient in a calm clinical env 288275 1.png",
      alt: "Doctor consulting a patient"
    }
  };

  const portfolioData = data || defaultData;
  const description = portfolioData?.description || portfolioData?.text || portfolioData?.content || defaultData.description;
  const linkText = portfolioData?.link?.text || portfolioData?.linkText || defaultData.link.text;
  const linkUrl = portfolioData?.link?.url || portfolioData?.linkUrl || defaultData.link.url;
  const imageUrl = portfolioData?.image?.url || portfolioData?.image || defaultData.image.url;
  const imageAlt = portfolioData?.image?.alt || portfolioData?.imageAlt || defaultData.image.alt;

  // Don't render image if URL is empty or null
  const hasImage = imageUrl && imageUrl.trim() !== '';

  return (
    <section className="global-generics-portfolio" data-node-id="3030:2227">
      <div className="global-generics-portfolio__content">
        {hasImage && (
          <div className="global-generics-portfolio__left">
            <div className="global-generics-portfolio__image-wrapper">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="global-generics-portfolio__image"
                quality={100}
              />
            </div>
          </div>
        )}
        <div className="global-generics-portfolio__right">
          <div className="global-generics-portfolio__background"></div>
          <div className="global-generics-portfolio__petals">
            <Image
              src="/assets/images/global-generic/petals.svg"
              alt=""
              width={447}
              height={214}
              className="global-generics-portfolio__petals-image"
              quality={100}
            />
          </div>
          <div className="global-generics-portfolio__right-content">
            <p className="global-generics-portfolio__description">
              {description}
            </p>
            {linkText && (
              <Link href={linkUrl} className="global-generics-portfolio__link">
                {linkText}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="global-generics-portfolio__link-arrow">
                  <path d="M1 12L12 1M12 1H1M12 1V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

