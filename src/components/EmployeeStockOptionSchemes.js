'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';
import '../scss/components/EmployeeStockOptionSchemes.scss';

export default function EmployeeStockOptionSchemes({ data }) {
  // Default data (will be replaced by Strapi)
  const schemesData = data || {
    schemes: [
      {
        id: 1,
        title: "2025",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "2014",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "2011",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "2011",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "2011",
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

