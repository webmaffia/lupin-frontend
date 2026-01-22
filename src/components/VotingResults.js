'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Policies.scss';

export default function VotingResults({ data }) {
  // Default data (will be replaced by Strapi)
  const votingData = data || {
    paragraph: "Based on the consolidated results of e-voting and Ballot, the Resolution as set out in the Notice of Extraordinary General Meeting has been approved by the Shareholders with requisite majority.",
    card: {
      id: 1,
      title: "Voting Results",
      pdfUrl: "#",
      isActive: false
    },
    images: {
      downloadButton: {
        active: "/assets/policies/download-button-active.svg",
        inactive: "/assets/policies/download-button-inactive.svg"
      },
      decorative: "/assets/egm/decorative.svg"
    }
  };

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Content */}
        <div className="policies__content policies__content--no-top-margin">
          {/* Paragraph */}
          {votingData.paragraph && (
            <p className="policies__paragraph">
              {votingData.paragraph}
            </p>
          )}

          {/* Voting Results Card Grid */}
          {votingData.card && (
            <div className="policies__grid">
              <div
                className={`policy-card`}
              >
                <div className="policy-card__content">
                  <h3 className="policy-card__title">{votingData.card.title}</h3>
                  <div className="policy-card__download">
                    <Link href={votingData.card.pdfUrl || "#"} className="policy-card__download-link" target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </Link>
                    <Link href={votingData.card.pdfUrl || "#"} className="policy-card__download-button" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={votingData.card.isActive ? votingData.images.downloadButton.active : votingData.images.downloadButton.inactive}
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
            </div>
          )}

          {/* Decorative SVG */}
          {votingData.images?.decorative && (
            <div className="policies__decorative">
              <Image
                src={votingData.images.decorative}
                alt=""
                width={726}
                height={406}
                className="policies__decorative-img"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

