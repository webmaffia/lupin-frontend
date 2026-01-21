'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function DeclarationOfResultsEvoting({ data }) {
  // Default data (will be replaced by Strapi)
  const declarationData = data || {
    title: "Declaration of Results of E-voting",
    cards: [
      {
        id: 1,
        title: "E-voting Result 1",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "E-voting Result 2",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "E-voting Result 3",
        pdfUrl: "#",
        isActive: false
      }
    ],
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      }
    }
  };

  return (
    <section className="policies policies--light-bg">
      {/* Container */}
      <div className="policies__container">
        {/* Title */}
        <h2 className="policies__section-title">
          {declarationData.title || "Declaration of Results of E-voting"}
        </h2>

        {/* Content */}
        <div className="policies__content">
          {/* Declaration Cards Grid */}
          <div className="policies__grid">
            {declarationData.cards && declarationData.cards.map((card) => (
              <div
                key={card.id}
                className={`policy-card ${card.isActive ? 'policy-card--active' : ''}`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{card.title}</h3>
                  <div className="policy-card__download">
                    <Link href={card.pdfUrl || "#"} className="policy-card__download-link" target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </Link>
                    <Link href={card.pdfUrl || "#"} className="policy-card__download-button" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={card.isActive ? declarationData.images.downloadButton.active : declarationData.images.downloadButton.inactive}
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
        </div>
      </div>
    </section>
  );
}

