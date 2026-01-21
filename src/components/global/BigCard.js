'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/scss/components/global/BigCard.scss';

/**
 * BigCard - Reusable big card component for financial documents
 * Follows the Notice card structure
 * 
 * @param {string} centerLink - Link to center version
 * @param {string} marathiLink - Link to Marathi version
 * @param {string} pdfUrl - URL to the PDF file
 * @param {boolean} isActive - Whether the card is active (affects styling)
 * @param {string} downloadButtonActive - Path to active download button image
 * @param {string} downloadButtonInactive - Path to inactive download button image
 * @param {string} centerText - Text for center link (default: "Q1 FY 2026 - center")

 * @param {string} className - Additional CSS classes
 */
export default function BigCard({ 
  centerLink = "#",

  pdfUrl = "#",
  isActive = false,
  downloadButtonActive = "/assets/policies/download-button-active.svg",
  downloadButtonInactive = "/assets/policies/download-button-inactive.svg",
  centerText = "Q1 FY 2026 - center",

  className = ''
}) {
  return (
    <div className={`big-card ${isActive ? 'big-card--active' : ''} ${className}`}>
      <div className="big-card__content">
        <div className="big-card__links">
          <Link href={centerLink || pdfUrl} className="big-card__link" target="_blank" rel="noopener noreferrer">
            {centerText}
          </Link>
         
        </div>
        <div className="big-card__download">
          <Link href={pdfUrl || centerLink || "#"} className="big-card__download-link" target="_blank" rel="noopener noreferrer">
            Download PDF
          </Link>
          <Link href={pdfUrl || centerLink || "#"} className="big-card__download-button" target="_blank" rel="noopener noreferrer">
            <Image
              src={isActive ? downloadButtonActive : downloadButtonInactive}
              alt="Download"
              width={104}
              height={104}
              className="big-card__download-icon"
              quality={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

