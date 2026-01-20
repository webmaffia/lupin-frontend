'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';
import '../scss/components/EmployeeStockOptionSchemes.scss';

export default function EmployeeStockOptionSchemes({ data, error = null }) {
  // Show error state if API failed
  if (error) {
    return (
      <section className="policies employee-stock-option-schemes">
        <div className="policies__container">
          <div className="policies__content">
            <div className="policies__placeholder">
              <p>Unable to load employee stock option schemes at this time. Please try again later.</p>
              {process.env.NODE_ENV === 'development' && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  Error: {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no data
  if (!data || !data.schemes || data.schemes.length === 0) {
    return (
      <section className="policies employee-stock-option-schemes">
        <div className="policies__container">
          <div className="policies__content">
            <div className="policies__placeholder">
              <p>No employee stock option schemes available at this time.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const schemesData = {
    schemes: data.schemes,
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorativeGroup: "/assets/policies/group.svg"
    }
  };

  return (
    <section className="policies employee-stock-option-schemes">
      {/* Container */}
      <div className="policies__container">
        {/* Content */}
        <div className="policies__content">
          {/* Scheme Cards Grid */}
          <div className="policies__grid">
            {schemesData.schemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`policy-card ${scheme.isActive ? 'policy-card--active' : ''}`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{scheme.title}</h3>
                  <div className="policy-card__download">
                    <Link href={scheme.pdfUrl} className="policy-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={scheme.pdfUrl} className="policy-card__download-button">
                      <Image
                        src={scheme.isActive ? schemesData.images.downloadButton.active : schemesData.images.downloadButton.inactive}
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
              src={schemesData.images.decorativeGroup}
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

