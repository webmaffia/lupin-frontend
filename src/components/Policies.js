'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import '../scss/components/Policies.scss';

export default function Policies({ data }) {
  // Default data (will be replaced by Strapi)
  const policiesData = data || {
    policies: [
      {
        id: 1,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: true
      },
      {
        id: 2,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
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
                className={`policy-card ${policy.isActive ? 'policy-card--active' : ''}`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{policy.title}</h3>
                  <div className="policy-card__download">
                    <Link href={policy.pdfUrl} className="policy-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={policy.pdfUrl} className="policy-card__download-button">
                      <Image
                        src={policy.isActive ? policiesData.images.downloadButton.active : policiesData.images.downloadButton.inactive}
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
              src={policiesData.images.decorativeGroup}
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

