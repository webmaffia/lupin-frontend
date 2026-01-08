'use client';

import Image from 'next/image';
import BigCard from '@/components/global/BigCard';
import '@/scss/components/TdsDividendSection.scss';

/**
 * TdsDividendSection - Section for TDS on Dividend Payout
 * 
 * @param {string} title - Main title (default: "TDS on Dividend Payout")
 * @param {string} subtitle - Subtitle text
 * @param {string} cardText - Text inside the card
 * @param {string} pdfUrl - URL to the PDF file
 * @param {string} downloadButtonActive - Path to active download button image
 * @param {string} downloadButtonInactive - Path to inactive download button image
 */
export default function TdsDividendSection({
  title = "TDS on Dividend Payout",
  subtitle = "Communication in Respect of Deduction of Tax at Source on Dividend Payout",
  cardText = "Communication in Respect of Deduction of Tax at Source on Dividend Payout",
  pdfUrl = "#",
  downloadButtonActive = "/assets/policies/download-button-active.svg",
  downloadButtonInactive = "/assets/policies/download-button-inactive.svg"
}) {
  return (
    <section className="tds-dividend-section">
      {/* Decorative SVG */}
    
      <div className="tds-dividend-section__container">
        <div className="tds-dividend-section__content">
        <div className="tds-dividend-section__decorative">
        <Image
          src="/assets/dividend/elements.svg"
          alt=""
          width={1169}
          height={394}
          className="tds-dividend-section__decorative-img"
          quality={100}
        />
      </div>
          {/* Left side - Title and Subtitle */}
          <div className="tds-dividend-section__left">
            <h2 className="tds-dividend-section__title">
              <span>TDS on </span>
              <span>Dividend Payout</span>
            </h2>
            <p className="tds-dividend-section__subtitle">
              <span>Communication in Respect of Deduction of </span>
              <span>Tax at Source on Dividend Payout</span>
            </p>
          </div>

          {/* Right side - Card and Download */}
          <div className="tds-dividend-section__right">
            <BigCard
              centerLink={pdfUrl}
            
              pdfUrl={pdfUrl}
              isActive={false}
              downloadButtonActive={downloadButtonActive}
              downloadButtonInactive={downloadButtonInactive}
              centerText={cardText}
              
            />
          </div>
        </div>
      </div>
    </section>
  );
}

