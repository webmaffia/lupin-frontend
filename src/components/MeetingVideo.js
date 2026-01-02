'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../scss/components/MeetingVideo.scss';

export default function MeetingVideo({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Default data (will be replaced by Strapi)
  const meetingVideoData = data || {
    title: "Annual General Meeting",
    videos: [
      {
        id: 1,
        title: "42nd Annual General Meeting – Aug 2, 2024",
        thumbnail: "/assets/meeting-video/Youtube-thumb.png",
        videoUrl: "https://www.lupin.com/video/lupin-agm-2024.mp4",
        transcriptLink: {
          text: "42nd Annual General Meeting Transcript",
          href: "#"
        }
      },
      {
        id: 2,
        title: "41st Annual General Meeting – August 3, 2023",
        thumbnail: "/assets/meeting-video/Youtube-thumb.png",
        videoUrl: "https://www.lupin.com/video/lupin-agm-2023.mp4"
      },
      {
        id: 3,
        title: "40th Annual General Meeting – August 4, 2022",
        thumbnail: "/assets/meeting-video/Youtube-thumb.png",
        videoUrl: "https://www.lupin.com/video/lupin-agm-2022.mp4"
      },
      {
        id: 4,
        title: "39th Annual General Meeting – August 5, 2021",
        thumbnail: "/assets/meeting-video/Youtube-thumb.png",
        videoUrl: "https://www.lupin.com/video/lupin-agm-2021.mp4"
      }
    ]
  };

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
          {meetingVideoData.title && (
            <h2 className="meeting-video__title">
              {meetingVideoData.title}
            </h2>
          )}

          {/* Video Cards Grid */}
          <div className="meeting-video__grid">
            {meetingVideoData.videos.map((video) => (
              <div
                key={video.id}
                className="meeting-video__card"
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div className="meeting-video__thumbnail-wrapper">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
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

