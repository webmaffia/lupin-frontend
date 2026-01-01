'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import '../scss/components/CodeOfConduct.scss';

export default function CodeOfConduct({ data }) {
  // Default data (will be replaced by Strapi)
  const codeOfConductData = data || {
    codes: [
      {
        id: 1,
        title: "Lupin Secures SBTi validation for Emission ReductionTargets",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "Code of Conduct for Independent Directors",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Code of Conduct- Directors",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Code of Conduct-Senior Management",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Familiarization programme for independent directors",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Code of Practices and Procedures for fair disclosure of Unpublished Price Sensitive Information",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Code of Conduct for Independent Directors",
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
    <section className="code-of-conduct">
      {/* Container */}
      <div className="code-of-conduct__container">
        {/* Navigation Links */}
        <NavigationLinks links={[
          { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
          { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
          { id: 'policies', label: 'Policies', href: '/investors/policies' }
        ]} />

        {/* Content */}
        <div className="code-of-conduct__content">
          {/* Code Cards Grid */}
          <div className="code-of-conduct__grid">
            {codeOfConductData.codes.map((code) => (
              <div
                key={code.id}
                className={`code-card ${code.isActive ? 'code-card--active' : ''}`}
              >
                <div className="code-card__content">
                  <h3 className="code-card__title">{code.title}</h3>
                  <div className="code-card__download">
                    <Link href={code.pdfUrl} className="code-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={code.pdfUrl} className="code-card__download-button">
                      <Image
                        src={code.isActive ? codeOfConductData.images.downloadButton.active : codeOfConductData.images.downloadButton.inactive}
                        alt="Download"
                        width={104}
                        height={104}
                        className="code-card__download-icon"
                        quality={100}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Group Image */}
          <div className="code-of-conduct__decorative">
            <Image
              src={codeOfConductData.images.decorativeGroup}
              alt=""
              width={319}
              height={313}
              className="code-of-conduct__decorative-img"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

