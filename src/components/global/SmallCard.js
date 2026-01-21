'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/scss/components/global/SmallCard.scss';

/**
 * SmallCard - Reusable small card component for financial documents
 * Follows the Notice card structure
 * 
 * @param {string} title - Card title
 * @param {string} pdfUrl - URL to the PDF file
 * @param {boolean} isActive - Whether the card is active (affects styling)
 * @param {string} downloadButtonActive - Path to active download button image
 * @param {string} downloadButtonInactive - Path to inactive download button image
 * @param {string} className - Additional CSS classes
 */
export default function SmallCard({ 
  title,
  pdfUrl = "#",
  isActive = false,
  downloadButtonActive = "/assets/policies/download-button-active.svg",
  downloadButtonInactive = "/assets/policies/download-button-inactive.svg",
  className = ''
}) {
  return (
    <div className="small-card">
      <div className="small-card__content">
        <div className="small-card__links">
          <Link href={pdfUrl} className="small-card__link" target="_blank" rel="noopener noreferrer">
            {title}
          </Link>
        </div>
        <div className="small-card__download">
          <Link href={pdfUrl} className="small-card__download-link" target="_blank" rel="noopener noreferrer">
            Download PDF
          </Link>
          <Link href={pdfUrl} className="small-card__download-button" target="_blank" rel="noopener noreferrer">
            <Image
              src={isActive ? downloadButtonActive : downloadButtonInactive}
              alt="Download"
              width={104}
              height={104}
              className="small-card__download-icon"
              quality={100}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

