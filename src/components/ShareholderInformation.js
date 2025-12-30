'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/ShareholderInformation.scss';

export default function ShareholderInformation({ data }) {
  // Default data (will be replaced by Strapi)
  const shareholderData = data || {
    title: "Shareholder Information",
    centerImage: {
      url: "/assets/shareholder-information/center-image.png",
      alt: "Shareholder Information"
    },
    leftColumn: [
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015"
    ],
    rightColumn: [
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015",
      "Disclosure under Regulation 46 of SEBI Regulations, 2015"
    ]
  };

  // Helper function to render a list of links
  const renderLinks = (links, columnClass) => {
    if (!links || !Array.isArray(links)) return null;
    
    return (
      <div className={`shareholder-information__column ${columnClass}`}>
        {links.map((link, index) => {
          // Support both string and object format
          const linkText = typeof link === 'string' ? link : link.text || link.label || '';
          const linkHref = typeof link === 'object' ? (link.href || link.url || '#') : '#';
          
          return (
            <Link
              key={index}
              href={linkHref}
              className="shareholder-information__link"
            >
              <span className="shareholder-information__link-text">{linkText}</span>
              <svg
                className="shareholder-information__arrow"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12L12 1M12 1H1M12 1V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <section className="shareholder-information" data-node-id="2216:875">
      <div className="shareholder-information__container">
        {/* Title */}
        {shareholderData.title && (
          <h2 className="shareholder-information__title">
            {shareholderData.title}
          </h2>
        )}

        {/* Content Grid */}
        <div className="shareholder-information__content">
          {/* Left Column */}
          {renderLinks(shareholderData.leftColumn, 'shareholder-information__column--left')}

          {/* Center Image */}
          {shareholderData.centerImage && (
            <div className="shareholder-information__image-wrapper">
              <Image
                src={shareholderData.centerImage.url}
                alt={shareholderData.centerImage.alt || ""}
                fill
                className="shareholder-information__image"
                quality={100}
              />
            </div>
          )}

          {/* Right Column */}
          {renderLinks(shareholderData.rightColumn, 'shareholder-information__column--right')}
        </div>
      </div>
    </section>
  );
}

