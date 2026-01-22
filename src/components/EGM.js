'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function EGM({ data }) {
  // Default data (will be replaced by Strapi)
  const egmData = data || {
    title: "Extraordinary General Meeting (EGM)",
    cards: [
      {
        id: 1,
        title: "EGM Notice",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "EGM Resolution",
        pdfUrl: "#",
        isActive: false
      }
    ],
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorative: "/assets/egm/decorative.svg"
    }
  };

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Title */}
        <h2 className="policies__section-title">
          {egmData.title || "Extraordinary General Meeting (EGM)"}
        </h2>

        {/* Content */}
        <div className="policies__content">
          {/* EGM Cards Grid */}
          <div className="policies__grid">
            {egmData.cards && egmData.cards.map((card) => (
              <div
                key={card.id}
                className={`policy-card`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{card.title}</h3>
                  <div className="policy-card__download">
                    <Link href={card.pdfUrl || "#"} className="policy-card__download-link" target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </Link>
                    <Link href={card.pdfUrl || "#"} className="policy-card__download-button" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={card.isActive ? egmData.images.downloadButton.active : egmData.images.downloadButton.inactive}
                        alt="Download"
                        width={104}
                        height={104}
                        className="policy-card__download-icon"
                        quality={100}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative SVG */}
          {egmData.images?.decorative && (
            <div className="policies__decorative">
              <Image
                src={egmData.images.decorative}
                alt=""
                width={726}
                height={406}
                className="policies__decorative-img"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

