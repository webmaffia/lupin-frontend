'use client';

import Link from 'next/link';
import '../scss/components/Grid5x3.scss';

export default function Grid5x3({ data }) {
  // Default data matching Figma design (node-id: 2273:779) - will be replaced by Strapi
  const gridData = data || {
    notices: [
      {
        id: 1,
        title: "Secretarial Compliance\nReport 2025",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 2,
        title: "Secretarial Compliance\nReport 2024",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 3,
        title: "Secretarial Compliance\nReport 2023",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 4,
        title: "Secretarial Compliance\nReport 2022",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 5,
        title: "Secretarial Compliance\nReport 2021",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 6,
        title: "Secretarial Compliance\nReport 2020",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 7,
        title: "Secretarial Compliance\nReport 2019",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 8,
        title: "Secretarial Compliance\nReport 2018",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 9,
        title: "Secretarial Compliance\nReport 2017",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 10,
        title: "Secretarial Compliance\nReport 2016",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 11,
        title: "Secretarial Compliance\nReport 2015",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 12,
        title: "Secretarial Compliance\nReport 2014",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 13,
        title: "Secretarial Compliance\nReport 2013",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 14,
        title: "Secretarial Compliance\nReport 2012",
        pdfUrl: "#",
        isActive: false
      },
      {
        id: 15,
        title: "Secretarial Compliance\nReport 2011",
        pdfUrl: "#",
        isActive: false
      }
    ],
    images: {
      decorativeGroup: "/assets/policies/group.svg"
    }
  };

  return (
    <section className="notice notice--grid-5x3">
      {/* Container */}
      <div className="notice__container">
        {/* Content */}
        <div className="notice__content">
          {/* Notice Cards Grid - 5x3 grid matching Figma design */}
          <div className="notice__grid notice__grid--5cols">
            {gridData.notices.map((notice) => {
              // Handle title with line breaks
              const titleLines = notice.title ? (typeof notice.title === 'string' ? notice.title.split('\n') : notice.title) : [];
              
              return (
                <div
                  key={notice.id}
                  className={`notice-card notice-card--simple ${notice.isActive ? 'notice-card--active' : ''}`}
                  data-node-id="2273:779"
                >
                  <div className="notice-card__content notice-card__content--simple">
                    {notice.title && (
                      <div className="notice-card__title" data-node-id="2273:780">
                        {titleLines.map((line, index) => (
                          <p key={index} className="notice-card__title-line">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {notice.pdfUrl && (
                      <Link 
                        href={notice.pdfUrl} 
                        className="notice-card__download-link notice-card__download-link--simple"
                        target={notice.pdfUrl.startsWith('http') ? '_blank' : undefined}
                        rel={notice.pdfUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        Download PDF
                      </Link>
                    )}
                  </div>
                  
                  {/* Bottom Decorative Circle Arrow */}
                  <div className="notice-card__decorative-circle">
                    <div className="notice-card__decorative-circle-inner">
                      <div className="notice-card__decorative-icon"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Group Image */}
          {gridData.images && gridData.images.decorativeGroup && (
            <div className="notice__decorative">
              <img
                src={gridData.images.decorativeGroup}
                alt=""
                className="notice__decorative-img"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
