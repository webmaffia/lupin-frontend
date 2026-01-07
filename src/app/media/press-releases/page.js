'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import MediaSearch from '@/components/MediaSearch';
import MediaContact from '@/components/global/MediaContact';
import '@/scss/pages/media.scss';
import '@/scss/components/WhatsNew.scss';

export default function PressReleasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Banner data for Press Releases page
  const bannerData = {
    title: {
      line1: "Press Releases",
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Press Releases"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Press releases data (using WhatsNew structure)
  const allPressReleases = [
    {
      id: 1,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 2,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 3,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 4,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 5,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    },
    {
      id: 6,
      date: "September 17, 2025",
      headline: [
        "Lupin Receives Positive",
        "CHMP Opinion for",
        "Biosimilar Ranibizu",
        "mab"
      ],
      category: "Press Releases",
      href: "#"
    }
  ];

  // Search and filter logic
  const filteredPressReleases = allPressReleases.filter((item) => {
    // Search filter - check date, headline, and category
    const headlineText = Array.isArray(item.headline) 
      ? item.headline.join(' ') 
      : item.headline || '';
    const matchesSearch = searchQuery === '' || 
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      headlineText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Year filter - placeholder for future year matching
    const matchesYear = selectedYear === '' || true;
    
    return matchesSearch && matchesYear;
  });

  // Reset filters when search changes
  useEffect(() => {
    // This ensures the component re-renders when search changes
  }, [searchQuery, selectedYear]);

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <MediaNavigation />
      
      <section className="sectionMediaSearch">
        <MediaSearch 
          onSearch={(query) => setSearchQuery(query)}
          onYearChange={(year) => setSelectedYear(year)}
        />
      </section>

      {/* Press Releases Grid Section */}
      <section className="sectionPressReleases">
        <div className="whats-new__container">
          <div className="whats-new__cards-wrapper">
            <div className="whats-new__grid">
              {filteredPressReleases.map((item, index) => (
                <div key={item.id || index} className="whats-new__card">
                  {/* Date */}
                  <div className="whats-new__date">
                    {item.date}
                  </div>

                  {/* Category Button */}
                  {item.category && (() => {
                    // Split category text (e.g., "Press Releases" -> ["Press", "Releases"])
                    const categoryParts = item.category.split(' ');
                    const firstPart = categoryParts[0] || item.category;
                    const secondPart = categoryParts.slice(1).join(' ') || '';
                    
                    return (
                      <Link href={item.href || "#"} className="whats-new__category-btn">
                        <div className="whats-new__category-line">
                          <span className="whats-new__category-text">{firstPart}</span>
                          <svg
                            className="whats-new__category-arrow"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 11L11 1M11 1H1M11 1V11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        {secondPart && (
                          <span className="whats-new__category-text">{secondPart}</span>
                        )}
                      </Link>
                    );
                  })()}

                  {/* Headline */}
                  <h3 className="whats-new__headline">
                    {Array.isArray(item.headline) ? (
                      item.headline.map((line, lineIndex) => (
                        <span key={lineIndex} className="whats-new__headline-line">
                          {line}
                          {lineIndex < item.headline.length - 1 && <br />}
                        </span>
                      ))
                    ) : (
                      item.headline
                    )}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MediaContact 
        contact={{
          name: "Rajalakshmi Azariah",
          title: "Vice President & Global Head – Corporate Communications",
          email: "rajalakshmiazariah@lupin.com"
        }}
      />
    </div>
  );
}

