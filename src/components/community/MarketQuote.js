'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/community/MarketQuote.scss';

export default function MarketQuote({ quoteData = null }) {
  // Default quote data if not provided (based on Figma design)
  const defaultQuote = {
    quote: 'I left my sanitation job and dove into dairy farming. Now I know things I never imagined! My buffaloes give 20-30 liters of milk daily, and seeing this success, I bought five more.',
    author: 'Chotelal Saini',
    designation: 'Farmer',
    image: {
      url: '/assets/community/chote.png',
      alt: 'Chotelal Saini'
    }
  };

  // Use API data if available, otherwise use default
  const quote = quoteData || defaultQuote;
  
  // Don't render if no quote data is available
  if (!quote || !quote.quote) {
    return null;
  }

  return (
    <section className="market-quote">
      <div className="market-quote__container">
        <div className="market-quote__content">
          <div className="market-quote__image-wrapper">
            <div className="market-quote__image-circle">
              {quote.image && (
                <Image
                  src={quote.image.url}
                  alt={quote.image.alt || quote.author}
                  width={332}
                  height={330}
                  className="market-quote__image"
                  quality={100}
                />
              )}
            </div>
            <div className="market-quote__author-info">
              <p className="market-quote__author-name">{quote.author}</p>
              {quote.designation && (
                <p className="market-quote__author-designation">{quote.designation}</p>
              )}
            </div>
          </div>
          <div className="market-quote__text-wrapper">
            <div className="market-quote__quote-mark market-quote__quote-mark--open">
              <Image
                src="/assets/community/top-quote.svg"
                alt=""
                width={135}
                height={100}
                className="market-quote__quote-mark-image"
              />
            </div>
            <div className="market-quote__text-container">
              <blockquote className="market-quote__text">
                {quote.quote}
              </blockquote>
              <div className="market-quote__quote-mark market-quote__quote-mark--close">
                <Image
                  src="/assets/community/bottom-quote.svg"
                  alt=""
                  width={135}
                  height={100}
                  className="market-quote__quote-mark-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

