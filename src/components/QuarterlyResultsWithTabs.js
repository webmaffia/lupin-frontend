'use client';

import { useState } from 'react';
import Tabs from '@/components/global/Tabs';
import QuarterlyResultsList from '@/components/QuarterlyResultsList';
import SmallCard from '@/components/global/SmallCard';
import '@/scss/components/QuarterlyResultsList.scss';

/**
 * QuarterlyResultsWithTabs - Wrapper component that combines Tabs and QuarterlyResultsList
 * Shows quarterly results list for the active tab with different data for each tab
 * 
 * @param {Array} tabs - Array of tab labels
 * @param {Object} tabsData - Object mapping tab values to their quarterly data
 * @param {Array} quarterlyItems - Array of quarterly result items (legacy - for first tab only)
 * @param {Array} cards - Array of card items (legacy - for first tab only)
 * @param {Array} quarterlyItemsAfterCards - Array of quarterly result items (legacy - for first tab only)
 * @param {Array} cardsAfterQ2 - Array of card items (legacy - for first tab only)
 * @param {string} className - Additional CSS classes (optional)
 */
export default function QuarterlyResultsWithTabs({ 
  tabs = [],
  tabsData = {},
  quarterlyItems = [],
  cards = [],
  quarterlyItemsAfterCards = [],
  cardsAfterQ2 = [],
  className = '' 
}) {
  // Initialize with first tab value
  const [activeTabValue, setActiveTabValue] = useState(tabs[0] || null);

  const handleTabChange = (tab) => {
    setActiveTabValue(tab.value);
  };

  // Get data for the active tab
  const activeTabData = tabsData[activeTabValue];
  
  // Use tabsData if available, otherwise fall back to legacy props (for first tab)
  const displayData = activeTabData || {
    quarterlyItems: quarterlyItems,
    cards: cards,
    quarterlyItemsAfterCards: quarterlyItemsAfterCards,
    cardsAfterQ2: cardsAfterQ2
  };

  // Show quarterly results list for the active tab
  const shouldShowQuarterlyResults = activeTabValue && tabs.includes(activeTabValue);

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
          {displayData.quarterlyItems && displayData.quarterlyItems.length > 0 && (
            <QuarterlyResultsList items={displayData.quarterlyItems} />
          )}
          
          {/* Small Cards Section for Q1 */}
          {displayData.cards && displayData.cards.length > 0 && (
            <section className="quarterly-results-cards">
              <div className="quarterly-results-cards__container">
                <div className="quarterly-results-cards__grid">
                  {displayData.cards.map((card, index) => (
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
          {displayData.quarterlyItemsAfterCards && displayData.quarterlyItemsAfterCards.length > 0 && (
            <QuarterlyResultsList items={displayData.quarterlyItemsAfterCards} />
          )}

          {/* Small Cards Section for Q2 */}
          {displayData.cardsAfterQ2 && displayData.cardsAfterQ2.length > 0 && (
            <section className="quarterly-results-cards">
              <div className="quarterly-results-cards__container">
                <div className="quarterly-results-cards__grid">
                  {displayData.cardsAfterQ2.map((card, index) => (
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

