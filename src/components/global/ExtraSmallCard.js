'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/scss/components/global/ExtraSmallCard.scss';

/**
 * ExtraSmallCard - Reusable extra small card component for financial documents
 * Smaller version of SmallCard with reduced dimensions
 * 
 * @param {string} title - Card title
 * @param {string} pdfUrl - URL to the PDF file
 * @param {boolean} isActive - Whether the card is active (affects styling)
 * @param {string} downloadButtonActive - Path to active download button image
 * @param {string} downloadButtonInactive - Path to inactive download button image
 * @param {string} className - Additional CSS classes
 */
export default function ExtraSmallCard({ 
  title,
  pdfUrl = "#",
  isActive = false,
  downloadButtonActive = "/assets/policies/download-button-active.svg",
  downloadButtonInactive = "/assets/policies/download-button-inactive.svg",
  className = ''
}) {
  return (
    <div className={`extra-small-card ${isActive ? 'extra-small-card--active' : ''} ${className}`}>
      <div className="extra-small-card__content">
        <div className="extra-small-card__links">
          <Link href={pdfUrl} className="extra-small-card__link">
            {title}
          </Link>
        </div>
        <div className="extra-small-card__download">
          <Link href={pdfUrl} className="extra-small-card__download-link">
            Download PDF
          </Link>
          <Link href={pdfUrl} className="extra-small-card__download-button">
            <Image
              src={isActive ? downloadButtonActive : downloadButtonInactive}
              alt="Download"
              width={46}
              height={46}
              className="extra-small-card__download-icon"
              quality={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

