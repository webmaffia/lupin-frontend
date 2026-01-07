'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Notice.scss';

export default function Notice({ data }) {
  // Default data (will be replaced by Strapi)
  const noticeData = data || {
    notices: [
      {
        id: 1,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        englishLink: "#",
        marathiLink: "#",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 8,
        englishLink: "#",
        marathiLink: "#",
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
    <section className="notice">
      {/* Container */}
      <div className="notice__container">
        {/* Content */}
        <div className="notice__content">
          {/* Notice Cards Grid */}
          <div className="notice__grid">
            {noticeData.notices.map((notice) => (
              <div
                key={notice.id}
                className={`notice-card ${notice.isActive ? 'notice-card--active' : ''}`}
              >
                <div className="notice-card__content">
                  <div className="notice-card__links">
                    <Link href={notice.englishLink || notice.pdfUrl} className="notice-card__link">
                      Q1 FY 2026 - English
                    </Link>
                    <Link href={notice.marathiLink || "#"} className="notice-card__link">
                      Q1 FY 2026 - Marathi
                    </Link>
                  </div>
                  <div className="notice-card__download">
                    <Link href={notice.pdfUrl || notice.englishLink || "#"} className="notice-card__download-link">
                      Download PDF
                    </Link>
                    <Link href={notice.pdfUrl || notice.englishLink || "#"} className="notice-card__download-button">
                      <Image
                        src={notice.isActive ? noticeData.images.downloadButton.active : noticeData.images.downloadButton.inactive}
                        alt="Download"
                        width={104}
                        height={104}
                        className="notice-card__download-icon"
                        quality={100}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Group Image */}
          <div className="notice__decorative">
            <Image
              src={noticeData.images.decorativeGroup}
              alt=""
              width={319}
              height={313}
              className="notice__decorative-img"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

