'use client';

import Link from 'next/link';
import '@/scss/components/ExchangeFilingsLinks.scss';

/**
 * ExchangeFilingsLinks - Component for displaying exchange filing links in cards
 * 
 * @param {Array} cards - Array of card data, each containing an array of links
 * @param {string} className - Additional CSS classes (optional)
 */
export default function ExchangeFilingsLinks({ 
  cards = [],
  className = '' 
}) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className={`exchange-filings-links ${className}`}>
      {cards.map((card, cardIndex) => (
        <div key={cardIndex} className="exchange-filings-links__card">
          <div className="exchange-filings-links__links-container">
            {card.links && card.links.map((link, linkIndex) => {
              const isFirstLink = linkIndex === 0;
              const linkText = typeof link === 'string' ? link : (link.text || link.label || '');
              const linkHref = typeof link === 'object' ? (link.href || link.url || '#') : '#';
              
              return (
                <Link
                  key={linkIndex}
                  href={linkHref}
                  className={`exchange-filings-links__link ${
                    isFirstLink ? 'exchange-filings-links__link--first' : ''
                  }`}
                >
                  <span className="exchange-filings-links__link-text">{linkText}</span>
                  <svg
                    className={`exchange-filings-links__arrow ${
                      isFirstLink ? 'exchange-filings-links__arrow--large' : ''
                    }`}
                    width={isFirstLink ? "14" : "13"}
                    height={isFirstLink ? "14" : "13"}
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12L12 1M12 1H1M12 1V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}






