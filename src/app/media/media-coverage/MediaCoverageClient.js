'use client';

import { useState, useEffect, useMemo } from 'react';
import InnerBanner from '@/components/InnerBanner';
import MediaNavigation from '@/components/MediaNavigation';
import ProfileCard from '@/components/global/ProfileCard';
import Pagination from '@/components/global/Pagination';
import MediaContact from '@/components/global/MediaContact';
import '@/scss/pages/media.scss';
import '@/scss/pages/test-profile-card.scss';

export default function MediaCoverageClient({ initialData }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const itemsPerPage = 6;

  // Banner data for Media Coverage page
  const bannerData = {
    title: {
      line1: "Media Coverage",
    },
    images: {
      banner: {
        url: "/assets/inner-banner/media-coverage.png",
        alt: "Media Coverage"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Use initial data from server
  const mediaCoverageItems = initialData || [];

  // Extract unique years from publishedOn dates (fallback to publishedAt)
  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    mediaCoverageItems.forEach((item) => {
      const dateToUse = item.publishedOn || item.publishedAt;
      if (dateToUse) {
        const year = new Date(dateToUse).getFullYear();
        if (!isNaN(year)) {
          yearsSet.add(year.toString());
        }
      }
    });
    return Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending
  }, [mediaCoverageItems]);

  // Helper function to check if URL is external (starts with http/https)
  const isExternalLink = (url) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  // Helper function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Helper function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleVideoClick = (item) => {
    setSelectedVideo({
      title: item.name,
      videoUrl: item.videoLink,
      isYouTube: isYouTubeUrl(item.videoLink)
    });
    setIsPopupOpen(true);
  };

  const handleLinkClick = (e, item) => {
    // If it's an external link, open in new tab
    if (item.externalLink && isExternalLink(item.externalLink)) {
      e.preventDefault();
      window.open(item.externalLink, '_blank', 'noopener,noreferrer');
    }
    // Otherwise, let the default Link behavior handle it (internal route)
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedVideo(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  // Search and filter logic
  const filteredItems = mediaCoverageItems.filter((item) => {
    // Search filter - check title and slug
    const title = item.title || '';
    const slug = item.slug || '';

    const matchesSearch = searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slug.toLowerCase().includes(searchQuery.toLowerCase());

    // Year filter - extract year from publishedOn (fallback to publishedAt) and match
    let matchesYear = true;
    if (selectedYear !== '') {
      const dateToUse = item.publishedOn || item.publishedAt;
      if (dateToUse) {
        const itemYear = new Date(dateToUse).getFullYear();
        matchesYear = itemYear.toString() === selectedYear;
      } else {
        matchesYear = false;
      }
    }

    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

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
        years={availableYears}
      />

      {/* Profile Cards Section */}
      <section className="sectionProfileCards sectionProfileCards--media-coverage">
        <div className="profile-cards-container">
          <div className="profile-card-grid">
            {currentPageItems.length > 0 ? (
              currentPageItems.map((item) => {
                const hasVideo = !!item.videoLink;
                const hasExternalLink = item.externalLink && isExternalLink(item.externalLink);
                const hasLink = !!(item.link || item.externalLink);
                const hasImage = !!item.image;
                const isClickable = hasVideo || hasExternalLink;

                return (
                  <div
                    key={item.id}
                    className={`profile-card-wrapper ${isClickable ? 'profile-card-wrapper--clickable' : ''}`}
                    onClick={hasVideo ? () => handleVideoClick(item) : hasExternalLink ? (e) => handleLinkClick(e, item) : undefined}
                    style={isClickable ? { cursor: 'pointer' } : {}}
                  >
                    <ProfileCard
                      name={item.name}
                      title={item.title}
                      date={item.date}
                      link={hasVideo ? undefined : (hasExternalLink ? undefined : item.link)}
                      image={item.image}
                      imagePosition={item.imagePosition}
                      showArrow={hasVideo ? false : (item.showArrow !== undefined ? item.showArrow : true)}
                      className={hasVideo ? 'profile-card--has-video' : ''}
                    />
                    {hasVideo && (
                      <button
                        className="profile-card__play-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(item);
                        }}
                        aria-label={`Play video: ${item.name}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="66"
                          height="66"
                          viewBox="0 0 66 66"
                          fill="none"
                        >
                          <path d="M25.5684 16.3633L48.4093 29.9996L25.5684 43.636V16.3633Z" fill="#0A963C" />
                          <g filter={`url(#filter0_d_play_${item.id})`}>
                            <path d="M32.9942 59.9986C19.6429 60.1272 7.37744 51.2621 3.75566 37.7681C-0.530471 21.7666 8.96331 5.31516 24.9577 1.02906C40.9593 -3.25704 57.4109 6.23666 61.697 22.2381C65.9831 38.2395 56.4965 54.6839 40.4949 58.97C37.9947 59.6414 35.473 59.97 32.9942 59.9986ZM25.5863 43.5686L48.4457 29.9959L25.5863 16.4233V43.5686Z" fill="white" />
                          </g>
                          <defs>
                            <filter id={`filter0_d_play_${item.id}`} x="-0.000710249" y="0" width="65.4545" height="65.4545" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy="2.72727" />
                              <feGaussianBlur stdDeviation="1.36364" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2497_283" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2497_283" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                      </button>
                    )}
                    {/* Show Explore button if item has link but no image */}
                    {!hasVideo && hasLink && !hasImage && (
                      <div className="profile-card__explore-button-wrapper">
                        {hasExternalLink ? (
                          <button
                            className="profile-card__explore-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLinkClick(e, item);
                            }}
                            aria-label={`Explore: ${item.title || item.name}`}
                          >
                            <span className="profile-card__explore-text">Explore</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="profile-card__explore-icon"
                            >
                              <path
                                d="M1 17L17 1M17 1H1M17 1V17"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        ) : (
                          <a
                            href={item.link}
                            className="profile-card__explore-button"
                            aria-label={`Explore: ${item.title || item.name}`}
                          >
                            <span className="profile-card__explore-text">Explore</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="profile-card__explore-icon"
                            >
                              <path
                                d="M1 17L17 1M17 1H1M17 1V17"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="profile-cards-no-results">
                <p>No media coverage found.</p>
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

      {/* Video Popup Modal */}
      {isPopupOpen && selectedVideo && (
        <div
          className="test-profile-card__popup-overlay"
          onClick={handleOverlayClick}
        >
          <div className="test-profile-card__popup">
            {/* Close Button */}
            <button
              className="test-profile-card__close-button"
              onClick={handleClosePopup}
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Video Player */}
            <div className="test-profile-card__video-wrapper">
              {selectedVideo.isYouTube ? (
                <iframe
                  className="test-profile-card__video test-profile-card__video--youtube"
                  src={`${getYouTubeEmbedUrl(selectedVideo.videoUrl)}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title || 'Video'}
                />
              ) : (
                <video
                  className="test-profile-card__video"
                  controls
                  autoPlay
                  src={selectedVideo.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video Title */}
            {selectedVideo.title && (
              <h3 className="test-profile-card__popup-title">
                {selectedVideo.title}
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

