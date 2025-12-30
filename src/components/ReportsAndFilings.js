'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/ReportsAndFilings.scss';

export default function ReportsAndFilings({ data }) {
  // Default data (will be replaced by Strapi)
  const reportsData = data || {
    title: "Reports and Filings",
    cards: [
      {
        id: 1,
        type: "quarterly",
        badge: "Q2 FY26",
        metrics: [
          "Gross Profit : INR 50,066 Mn",
          "Gross profit margin : 73.3%",
          "Investment in R&D : INR 5,091 Mn"
        ],
        downloadUrl: "#",
        viewAllUrl: "#"
      },
      {
        id: 2,
        type: "integrated",
        title: {
          line1: "Integrated",
          line2: "Report 2025"
        },
        image: {
          url: "/assets/reports-filings/integrated-report-image.jpg",
          alt: "Integrated Report 2025"
        },
        downloadUrl: "#",
        viewAllUrl: "#"
      },
      {
        id: 3,
        type: "filings",
        badge: "Exchange filings (BSE/NSE)",
        items: [
          "Disclosure Dated 20th june 2025",
          "BSE / NSE Letter Schedule of Analyst Investors Meet",
          "Change in Directors",
          "SE Intimation Updates API R&D and OTC Business",
          "BSE/NSE Letter Acquisition of Renascience Pharma Limited"
        ],
        viewAllUrl: "#"
      }
    ]
  };

  return (
    <section className="reports-filings" data-node-id="2216:786">
      <div className="reports-filings__container">
        {/* Title */}
        {reportsData.title && (
          <h2 className="reports-filings__title">
            {reportsData.title}
          </h2>
        )}

        {/* Cards Grid */}
        <div className="reports-filings__cards">
          {reportsData.cards && reportsData.cards.map((card) => (
            <div key={card.id} className={`reports-filings__card reports-filings__card--${card.type}`}>
              {/* Quarterly Report Card */}
              {card.type === 'quarterly' && (
                <>
                  {card.badge && (
                    <div className="reports-filings__badge">
                      {card.badge}
                    </div>
                  )}
                  {card.metrics && card.metrics.length > 0 && (
                    <div className="reports-filings__metrics">
                      {card.metrics.map((metric, index) => (
                        <p key={index} className="reports-filings__metric">
                          {metric}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="reports-filings__actions reports-filings__actions--quarterly">
                    {card.downloadUrl && (
                      <Link href={card.downloadUrl} className="reports-filings__btn reports-filings__btn--download">
                        Download Now
                      </Link>
                    )}
                    {card.viewAllUrl && (
                      <Link href={card.viewAllUrl} className="reports-filings__btn reports-filings__btn--view-all">
                        View all
                      </Link>
                    )}
                  </div>
                </>
              )}

              {/* Integrated Report Card */}
              {card.type === 'integrated' && (
                <>
                  <div className="reports-filings__integrated-content">
                    {card.title && (
                      <h3 className="reports-filings__integrated-title">
                        {card.title.line1 && (
                          <span className="reports-filings__title-line">{card.title.line1}</span>
                        )}
                        {card.title.line2 && (
                          <span className="reports-filings__title-line">{card.title.line2}</span>
                        )}
                      </h3>
                    )}
                    <div className="reports-filings__actions reports-filings__actions--integrated">
                      {card.downloadUrl && (
                        <Link href={card.downloadUrl} className="reports-filings__btn reports-filings__btn--download reports-filings__btn--primary">
                          Download Now
                        </Link>
                      )}
                      {card.viewAllUrl && (
                        <Link href={card.viewAllUrl} className="reports-filings__btn reports-filings__btn--view-all reports-filings__btn--secondary">
                          View all
                          <svg
                            className="reports-filings__arrow"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 11L11 1M11 1H1M11 1V11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                  {card.image && (
                    <div className="reports-filings__card-image reports-filings__card-image--integrated">
                      <Image
                        src={card.image.url}
                        alt={card.image.alt || ""}
                        fill
                        className="reports-filings__card-image-img"
                        quality={100}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Exchange Filings Card */}
              {card.type === 'filings' && (
                <>
                  {card.badge && (
                    <div className="reports-filings__badge reports-filings__badge--filings">
                      {card.badge}
                    </div>
                  )}
                  {card.items && card.items.length > 0 && (
                    <ul className="reports-filings__list">
                      {card.items.map((item, index) => (
                        <li key={index} className="reports-filings__list-item">
                          <Link href="#" className="reports-filings__list-link">
                            <span className="reports-filings__list-text">{item}</span>
                            <svg
                              className="reports-filings__arrow"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L11 1M11 1H1M11 1V11"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.viewAllUrl && (
                    <div className="reports-filings__actions reports-filings__actions--filings">
                      <Link href={card.viewAllUrl} className="reports-filings__btn reports-filings__btn--view-all">
                        View all
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

