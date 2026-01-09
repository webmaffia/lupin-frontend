'use client';

import '@/scss/components/QuarterlyResultsList.scss';

/**
 * QuarterlyResultsList - Component to display quarterly results list
 * Based on Figma design: https://www.figma.com/design/QNIbuokNouJSBEY7GUGsEI/Jash---Final-Home-page-auto-layout--Copy-?node-id=2300-601
 * 
 * @param {Array} items - Array of quarterly result items with { period, status }
 * @param {string} className - Additional CSS classes (optional)
 * 
 * @example
 * <QuarterlyResultsList 
 *   items={[
 *     { period: 'Q1(July-Sep)', status: 'Unaudited' },
 *     { period: 'Q2(Oct-Dec)', status: 'Unaudited' }
 *   ]}
 * />
 */
export default function QuarterlyResultsList({ 
  items = [],
  className = '' 
}) {
  // Default data if no items provided
  const defaultItems = items.length > 0 ? items : [
    { period: 'Q1(July-Sep)', status: 'Unaudited' },
    { period: 'Q2(Oct-Dec)', status: 'Unaudited' },
    { period: 'Q3(Jan-Mar)', status: 'Unaudited' },
    { period: 'Q4(Apr-Jun)', status: 'Unaudited' }
  ];

  return (
    <section className={`quarterly-results-list ${className}`}>
      <div className="quarterly-results-list__container">
        {defaultItems.map((item, index) => (
          <div key={index} className="quarterly-results-list__item">
            <p className="quarterly-results-list__period">{item.period}</p>
            <p className="quarterly-results-list__status">{item.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

