'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import '../scss/components/Policies.scss';

export default function Policies({ data, error }) {
  // Static image paths (not data)
  const staticImages = {
    downloadButton: {
      active: "/assets/policies/download-button-active.svg",
      inactive: "/assets/policies/download-button-inactive.svg"
    },
    decorativeGroup: "/assets/policies/group.svg"
  };

  // Show error state if API failed
  if (error) {
    return (
      <section className="policies">
        <div className="policies__container">
          <NavigationLinks links={[
            { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
            { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
            { id: 'policies', label: 'Policies', href: '/investors/policies' }
          ]} />
          <div className="policies__content">
            <div className="policies__placeholder">
              <p>Unable to load policies at this time. Please try again later.</p>
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
  if (!data || !data.policies || data.policies.length === 0) {
    return (
      <section className="policies">
        <div className="policies__container">
          <NavigationLinks links={[
            { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
            { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
            { id: 'policies', label: 'Policies', href: '/investors/policies' }
          ]} />
          <div className="policies__content">
            <div className="policies__placeholder">
              <p>No policies available at this time.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const policiesData = data;

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Navigation Links */}
        <NavigationLinks links={[
          { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
          { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
          { id: 'policies', label: 'Policies', href: '/investors/policies' }
        ]} />

        {/* Content */}
        <div className="policies__content">
          {/* Policy Cards Grid */}
          <div className="policies__grid">
            {policiesData.policies.map((policy) => (
              <div
                key={policy.id}
                className={`policy-card`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{policy.title}</h3>
                  <div className="policy-card__download">
                    <Link href={policy.pdfUrl || '#'} className="policy-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={policy.pdfUrl || '#'} className="policy-card__download-button">
                      <Image
                        src={policy.isActive ? staticImages.downloadButton.active : staticImages.downloadButton.inactive}
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
              src={staticImages.decorativeGroup}
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



