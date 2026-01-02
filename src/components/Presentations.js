'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function Presentations({ data }) {
  // Default data (will be replaced by Strapi)
  const presentationsData = data || {
    presentations: [
      {
        id: 1,
        title: "Q1 FY2026 Earnings Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "Q2 FY2026 Earnings Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Q3 FY2026 Earnings Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Q4 FY2026 Earnings Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Annual Report 2025 Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Investor Day 2025 Presentation",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Strategy Update Presentation",
        pdfUrl: "#",
        isActive: false
      }
    ],
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Title */}
        <h2 className="policies__section-title">
          Presentations
        </h2>

        {/* Content */}
        <div className="policies__content">
          {/* Presentation Cards Grid */}
          <div className="policies__grid">
            {presentationsData.presentations.map((presentation) => (
              <div
                key={presentation.id}
                className={`policy-card ${presentation.isActive ? 'policy-card--active' : ''}`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{presentation.title}</h3>
                  <div className="policy-card__download">
                    <Link href={presentation.pdfUrl} className="policy-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={presentation.pdfUrl} className="policy-card__download-button">
                      <Image
                        src={presentation.isActive ? presentationsData.images.downloadButton.active : presentationsData.images.downloadButton.inactive}
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

          {/* Decorative Group Image */}
          <div className="policies__decorative">
            <Image
              src={presentationsData.images.decorativeGroup}
              alt=""
              width={319}
              height={313}
              className="policies__decorative-img"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

