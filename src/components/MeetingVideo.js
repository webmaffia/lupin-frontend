'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../scss/components/MeetingVideo.scss';

export default function MeetingVideo({ data, error = null }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Show error state if API failed
  if (error) {
    return (
      <section className="meeting-video">
        <div className="meeting-video__container">
          <div className="meeting-video__placeholder">
            <p>Unable to load meeting videos at this time. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no data
  if (!data || !data.videos || data.videos.length === 0) {
    return (
      <section className="meeting-video">
        <div className="meeting-video__container">
          <div className="meeting-video__placeholder">
            <p>No meeting videos available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPopupOpen(true);
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

  return (
    <>
      <section className="meeting-video">
        <div className="meeting-video__container">
          {/* Title */}
          {data.title && (
            <h2 className="meeting-video__title">
              {data.title}
            </h2>
          )}

          {/* Video Cards Grid */}
          <div className="meeting-video__grid">
            {data.videos.map((video) => (
              <div
                key={video.id}
                className="meeting-video__card"
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div className="meeting-video__thumbnail-wrapper">
                  {video.thumbnail && typeof video.thumbnail === 'string' && video.thumbnail.trim() !== '' ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title || 'Meeting video'}
                      fill
                      className="meeting-video__thumbnail"
                      quality={100}
                    />
                  ) : (
                    <div className="meeting-video__thumbnail-placeholder">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="40" cy="40" r="40" fill="#08a03f" />
                        <path
                          d="M32 26L54 40L32 54V26Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="meeting-video__play-button">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="40" cy="40" r="40" fill="#08a03f" />
                      <path
                        d="M32 26L54 40L32 54V26Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>

                {/* Video Title and Transcript Link */}
                <div className="meeting-video__card-content">
                  {video.title && (
                    <h3 className="meeting-video__card-title">
                      {video.title}
                    </h3>
                  )}
                  {video.transcriptLink && (
                    <a
                      href={video.transcriptLink.href}
                      className="meeting-video__transcript-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {video.transcriptLink.text}
                      <svg
                        className="meeting-video__transcript-arrow"
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
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {isPopupOpen && selectedVideo && (
        <div
          className="meeting-video__popup-overlay"
          onClick={handleOverlayClick}
        >
          <div className="meeting-video__popup">
            {/* Close Button */}
            <button
              className="meeting-video__close-button"
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
            <div className="meeting-video__video-wrapper">
              <video
                className="meeting-video__video"
                controls
                autoPlay
                src={selectedVideo.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Title */}
            {selectedVideo.title && (
              <h3 className="meeting-video__popup-title">
                {selectedVideo.title}
              </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
}
