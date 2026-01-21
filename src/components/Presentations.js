'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function Presentations({ data, error = null }) {
  // Show error state if API failed
  if (error) {
    return (
      <section className="policies">
        <div className="policies__container">
          <div className="policies__placeholder">
            <p>Unable to load presentations at this time. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no data
  if (!data || !data.presentations || data.presentations.length === 0) {
    return (
      <section className="policies">
        <div className="policies__container">
          <div className="policies__placeholder">
            <p>No presentations available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  const presentationsData = {
    title: data.title || "Presentations",
    presentations: data.presentations,
    images: data.images || {
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
        {presentationsData.title && (
          <h2 className="policies__section-title">
            {presentationsData.title}
          </h2>
        )}

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
                    <Link href={presentation.pdfUrl} className="policy-card__download-link" target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </Link>
                    <Link href={presentation.pdfUrl} className="policy-card__download-button" target="_blank" rel="noopener noreferrer">
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

