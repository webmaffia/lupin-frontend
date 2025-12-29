'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '../scss/components/InvestorFAQs.scss';

export default function InvestorFAQs({ initialFAQs = [] }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(new Set([0])); // First FAQ (id: 0) is expanded by default
  const [visibleCount, setVisibleCount] = useState(5); // Show first 5 FAQs initially (1 expanded + 4 collapsed)
  const [faqs, setFaqs] = useState(initialFAQs.length > 0 ? initialFAQs : getDefaultFAQs()); // Use initial data or fallback
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigationLinks = [
    { id: 'share-price', label: 'Share Price', href: '/investors/share-price' },
    { id: 'analyst-coverage', label: 'Analyst Coverage', href: '/investors/analyst-coverage' },
    { id: 'shareholding-pattern', label: 'Shareholding Pattern', href: '/investors/shareholding-pattern' },
    { id: 'dividend', label: 'Dividend', href: '/investors/dividend' },
    { id: 'unclaimed-dividend', label: 'Unclaimed Dividend & Shares', href: '/investors/unclaimed-dividend' },
    { id: 'memorandum', label: 'Memorandum & Articles of Association', href: '/investors/memorandum' },
    { id: 'investor-faqs', label: 'Investor FAQs', href: '/investors/investor-faqs' },
    { id: 'business-responsibility', label: 'Business Responsibility', href: '/investors/business-responsibility' }
  ];

  // Default FAQs fallback - all FAQs
  function getDefaultFAQs() {
    return [
      { 
        id: 0, 
        question: "When was Lupin formed and when did it go public?", 
        answer: "1. Lupin Chemicals Pvt Ltd came into existence on March 1, 1983. It became a Public Limited Company on 23.12.1991.\n2. On June 24, 1993 Lupin Chemicals Limited came out with a public issue.\n3. On July 30, 2001 Lupin Laboratories Limited merged with Lupin Chemicals Limited, and the name of Lupin Chemicals Limited changed to Lupin Limited."
      },
      { id: 1, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 2, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 3, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 4, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 5, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 6, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 7, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." },
      { id: 8, question: "Does Lupin pay a dividend?", answer: "Yes, Lupin pays dividends to its shareholders. The dividend policy and payment schedule are determined by the Board of Directors based on the company's financial performance and other factors." }
    ];
  }

  // Fetch more FAQs from API
  const loadMoreFAQs = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/investor-faqs?start=${faqs.length}&limit=4`);
      const data = await response.json();
      
      if (data.faqs && data.faqs.length > 0) {
        // Add new FAQs with proper IDs from Strapi
        const newFAQs = data.faqs.map((faq, index) => ({
          id: faqs.length + index,
          question: faq.question || faq.title,
          answer: faq.answer || faq.content
        }));
        setFaqs(prev => {
          const updated = [...prev, ...newFAQs];
          setVisibleCount(prevCount => prevCount + newFAQs.length);
          setHasMore(data.hasMore !== false);
          return updated;
        });
      } else {
        // If API returns no FAQs (Strapi not configured), show 4 more from existing data
        setVisibleCount(prev => {
          const newCount = Math.min(prev + 4, faqs.length);
          setHasMore(newCount < faqs.length);
          return newCount;
        });
      }
    } catch (error) {
      // Silently fallback: show 4 more from existing data
      setVisibleCount(prev => {
        const newCount = Math.min(prev + 4, faqs.length);
        setHasMore(newCount < faqs.length);
        return newCount;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFAQ = (id) => {
    setExpandedItems(prev => {
      // If clicking the same item that's already expanded, close it
      if (prev.has(id)) {
        return new Set();
      }
      // Otherwise, expand only this item (close all others)
      return new Set([id]);
    });
  };

  return (
    <section className="investor-faqs">
      {/* Background */}
      <div className="investor-faqs__bg"></div>

      {/* Container */}
      <div className="investor-faqs__container">
        {/* Navigation Links */}
        <div className="investor-faqs__tabs">
          <div className="investor-faqs__tabs-row investor-faqs__tabs-row--1">
            {navigationLinks.slice(0, 5).map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`investor-faqs__tab ${pathname === link.href ? 'investor-faqs__tab--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="investor-faqs__tabs-row investor-faqs__tabs-row--2">
            {navigationLinks.slice(5, 8).map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`investor-faqs__tab ${pathname === link.href ? 'investor-faqs__tab--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="investor-faqs__list">
          {faqs.slice(0, visibleCount).map((faq) => {
            const isExpanded = expandedItems.has(faq.id);
            return (
              <div key={faq.id} className={`investor-faqs__item ${isExpanded ? 'investor-faqs__item--expanded' : ''}`}>
                <button
                  className="investor-faqs__item-header"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isExpanded}
                >
                  <h4 className="investor-faqs__item-question">{faq.question}</h4>
                  <span className="investor-faqs__item-icon">{isExpanded ? '−' : '+'}</span>
                </button>
                {isExpanded && (
                  <div className="investor-faqs__item-answer">
                    <p style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
                  </div>
                )}
                {!isExpanded && <div className="investor-faqs__item-divider"></div>}
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        {(visibleCount < faqs.length || hasMore) && (
          <div className="investor-faqs__view-all">
            <button
              onClick={loadMoreFAQs}
              className="investor-faqs__view-all-link"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'View All'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

