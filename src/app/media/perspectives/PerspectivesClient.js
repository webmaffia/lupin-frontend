'use client';

import { useState, useEffect } from 'react';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import ProfileCard from '@/components/global/ProfileCard';
import MediaContact from '@/components/global/MediaContact';
import Pagination from '@/components/global/Pagination';
import '@/scss/pages/media.scss';

export default function PerspectivesClient({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Banner data for Perspectives page
  const bannerData = {
    title: {
      line1: "Perspectives",
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Perspectives"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Use initial data from server
  const allPerspectives = initialData || [];

  // Search and filter logic
  const filteredPerspectives = allPerspectives.filter((item) => {
    // Search filter - check name and title
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Year filter - extract year from date and match
    const matchesYear = selectedYear === '' ||
      (item.name && item.name.includes(selectedYear));

    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const totalItems = filteredPerspectives.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredPerspectives.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of cards section when page changes
      const cardsSection = document.querySelector('.sectionProfileCards');
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

      {/* Profile Cards Section */}
      <section className="sectionProfileCards">
        <div className="profile-cards-container">
          <div className="profile-card-grid">
            {currentPageItems.length > 0 ? (
              currentPageItems.map((item) => (
                <ProfileCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  link={item.link}
                  image={item.image}
                  imagePosition={item.imagePosition}
                  showArrow={item.showArrow}
                />
              ))
            ) : (
              <div className="profile-cards-no-results">
                <p>No perspectives found.</p>
              </div>
            )}
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

