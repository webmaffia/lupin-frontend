'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/scss/components/global/IntegratedReportCard.scss';

/**
 * IntegratedReportCard - Standalone component for Integrated Report/Annual Report card
 * Based on middleCard from ReportsAndFilings component
 * 
 * @param {Array|string} title - Card title (can be array for multiple lines or string)
 * @param {Object} image - Image object with { url, alt }
 * @param {Array} buttons - Array of button objects with { label, href, variant: 'outline' | 'filled' }
 * @param {string} className - Additional CSS classes (optional)
 * 
 * @example
 * <IntegratedReportCard 
 *   title={["Integrated", "Report 2025"]}
 *   image={{ url: "/assets/reports-filings/circle.png", alt: "Integrated Report 2025" }}
 *   buttons={[
 *     { label: "Download Now", href: "#", variant: "outline" },
 *     { label: "View all", href: "#", variant: "filled" }
 *   ]}
 * />
 */
export default function IntegratedReportCard({ 
  title,
  image,
  buttons = [],
  className = '' 
}) {
  // Default data if not provided
  const defaultTitle = title || ["Integrated", "Report 2025"];
  const defaultImage = image || {
    url: "/assets/reports-filings/circle.png",
    alt: "Integrated Report"
  };

  return (
    <div className={`integrated-report-card ${className}`}>
      {defaultImage && defaultImage.url && (
        <div className="integrated-report-card__image-wrapper">
          <Image
            src={defaultImage.url}
            alt={defaultImage.alt || ""}
            width={600}
            height={600}
            className="integrated-report-card__image"
            quality={100}
          />
        </div>
      )}
      <div className="integrated-report-card__content">
        {defaultTitle && (
          <h3 className="integrated-report-card__title">
            {Array.isArray(defaultTitle) ? (
              // If title is an array, render each line
              defaultTitle.map((line, index) => (
                <span key={index} className="integrated-report-card__title-line">
                  {line}
                </span>
              ))
            ) : typeof defaultTitle === 'string' ? (
              // If title is a string, split by newline
              defaultTitle.split('\n').map((line, index) => (
                <span key={index} className="integrated-report-card__title-line">
                  {line.trim()}
                </span>
              ))
            ) : null}
          </h3>
        )}
        <div className="integrated-report-card__buttons">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href || "#"}
              className={`integrated-report-card__button ${
                button.variant === 'filled' 
                  ? 'integrated-report-card__button--filled-white' 
                  : 'integrated-report-card__button--outline-white'
              }`}
            >
              {button.label}
              {button.variant === 'filled' && (
                <svg
                  className="integrated-report-card__button-arrow"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 10L10 1M10 1H1M10 1V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

