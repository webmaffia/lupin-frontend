'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import MediaContact from '@/components/global/MediaContact';
import Pagination from '@/components/global/Pagination';
import '@/scss/pages/media.scss';
import '@/scss/components/WhatsNew.scss';

export default function PressReleasesClient({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Use initial data from server
  const allPressReleases = initialData || [];

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

    // Year filter - extract year from date and match
    const matchesYear = selectedYear === '' || 
      (item.date && item.date.includes(selectedYear));

    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const totalItems = filteredPressReleases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredPressReleases.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of cards section when page changes
      const cardsSection = document.querySelector('.sectionPressReleases');
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <MediaNavigation
        onSearch={(query) => setSearchQuery(query)}
        onYearChange={(year) => setSelectedYear(year)}
      />

      {/* Press Releases Grid Section */}
      <section className="sectionPressReleases">
        <div className="whats-new__container">
          <div className="whats-new__cards-wrapper">
            <div className="whats-new__grid">
              {currentPageItems.length > 0 ? (
                currentPageItems.map((item, index) => (
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
                ))
              ) : (
                <div className="whats-new__no-results">
                  <p>No press releases found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <MediaContact
        contact={{
          name: "Rajalakshmi Azariah",
          title: "Vice President & Global Head – Corporate Communications",
          email: "rajalakshmiazariah@lupin.com"
        }}
        mediaKitLink="/media/media-kit"
      />
    </div>
  );
}

