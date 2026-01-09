'use client';

import { useState } from 'react';
import Tabs from '@/components/global/Tabs';
import QuarterlyResultsList from '@/components/QuarterlyResultsList';
import SmallCard from '@/components/global/SmallCard';
import '@/scss/components/QuarterlyResultsList.scss';

/**
 * QuarterlyResultsWithTabs - Wrapper component that combines Tabs and QuarterlyResultsList
 * Shows quarterly results list when FY 2025-26 tab is active
 * 
 * @param {Array} tabs - Array of tab labels
 * @param {Array} quarterlyItems - Array of quarterly result items to display before cards
 * @param {Array} cards - Array of card items to display after first quarterly results
 * @param {Array} quarterlyItemsAfterCards - Array of quarterly result items to display after cards
 * @param {Array} cardsAfterQ2 - Array of card items to display after Q2
 * @param {string} className - Additional CSS classes (optional)
 */
export default function QuarterlyResultsWithTabs({ 
  tabs = [],
  quarterlyItems = [],
  cards = [],
  quarterlyItemsAfterCards = [],
  cardsAfterQ2 = [],
  className = '' 
}) {
  // Initialize with first tab value (which should be 'FY 2025-26')
  const [activeTabValue, setActiveTabValue] = useState(tabs[0] || null);

  const handleTabChange = (tab) => {
    setActiveTabValue(tab.value);
  };

  // Show quarterly results list only when FY 2025-26 tab is active
  const shouldShowQuarterlyResults = activeTabValue === 'FY 2025-26';

  return (
    <div className={className}>
      <section className="reports-filings-tabs">
        <div className="reports-filings-tabs__container">
          <Tabs 
            title="Quarterly Results"
            tabs={tabs}
            onChange={handleTabChange}
          />
        </div>
      </section>
      
      {shouldShowQuarterlyResults && (
        <>
          {/* First Quarterly Results List (Q1) */}
          {quarterlyItems.length > 0 && (
            <QuarterlyResultsList items={quarterlyItems} />
          )}
          
          {/* Small Cards Section for Q1 */}
          {cards.length > 0 && (
            <section className="quarterly-results-cards">
              <div className="quarterly-results-cards__container">
                <div className="quarterly-results-cards__grid">
                  {cards.map((card, index) => (
                    <SmallCard
                      key={card.id || index}
                      title={card.title}
                      pdfUrl={card.pdfUrl || '#'}
                      isActive={card.isActive || false}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Second Quarterly Results List (Q2) - After Cards */}
          {quarterlyItemsAfterCards.length > 0 && (
            <QuarterlyResultsList items={quarterlyItemsAfterCards} />
          )}

          {/* Small Cards Section for Q2 */}
          {cardsAfterQ2.length > 0 && (
            <section className="quarterly-results-cards">
              <div className="quarterly-results-cards__container">
                <div className="quarterly-results-cards__grid">
                  {cardsAfterQ2.map((card, index) => (
                    <SmallCard
                      key={card.id || index}
                      title={card.title}
                      pdfUrl={card.pdfUrl || '#'}
                      isActive={card.isActive || false}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

