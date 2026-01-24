'use client';

import Image from 'next/image';
import '../scss/components/ScienceHighlights.scss';

export default function ScienceHighlights({ data }) {
  const defaultData = {
    items: [
      {
        value: "480",
        label: "Cumulative Patents"
      },
      {
        value: "713",
        label: "Cumulative Filings"
      },
      {
        value: "550",
        label: "Cumulative Approvals"
      },
      {
        value: "INR 170,000+",
        label: "Mn Investment In R&D"
      },
      {
        value: "7",
        label: "Research Centers Globally"
      },
      {
        value: "1,400 +",
        label: "Experts"
      }
    ]
  };

  const highlightsData = data || defaultData;
  const items = highlightsData?.items || highlightsData?.highlights || highlightsData?.cards || defaultData.items;

  const backgroundImage = highlightsData?.backgroundImage?.desktop || highlightsData?.backgroundImage || '/assets/images/Background.png';
  const backgroundImageMobile = highlightsData?.backgroundImage?.mobile || backgroundImage;

  return (
    <section className="science-highlights" data-node-id="3089:473">
      <div className="science-highlights__background">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="science-highlights__bg-image"
          quality={100}
        />
      </div>
      <div className="science-highlights__container">
        <div className="science-highlights__border">
          <Image
            src="/assets/images/our-sci/Rectangle 223.svg"
            alt=""
            fill
            className="science-highlights__border-image"
            quality={100}
          />
        </div>
        <div className="science-highlights__grid">
          {items.map((item, index) => (
            <div key={index} className="science-highlights__item">
              <div className="science-highlights__icon">
                <Image
                  src="/assets/images/our-sci/icon1.svg"
                  alt=""
                  width={225}
                  height={225}
                  quality={100}
                />
              </div>
              <div className="science-highlights__value">
                {(() => {
                  const value = item.value || item.number || item.count || '';
                  if (typeof value === 'string' && value.includes('INR')) {
                    const parts = value.split(/(INR\s+)/);
                    return parts.map((part, idx) => 
                      part.startsWith('INR') ? (
                        <span key={idx} className="science-highlights__value-currency">{part}</span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    );
                  }
                  return value;
                })()}
              </div>
              <div className="science-highlights__label">
                {item.label || item.description || item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

