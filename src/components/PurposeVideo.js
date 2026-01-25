'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageUrl, isProxiedImage } from '@/lib/image-proxy';
import VideoModal from './VideoModal';

export default function PurposeVideo({ youtubeLink, image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = youtubeLink || 'https://youtube.com/shorts/HsNDyLnQ5Xs?si=S2CFP1288whkQoe1';
  const imageSrc = image?.url ? (getImageUrl(image.url) || image.url) : '/assets/images/purpose/circle.webp';
  const imageAlt = image?.alt || 'Our Story';

  const handlePlayClick = () => {
    if (videoUrl) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="purpose-story__media">
        <div className="purpose-story__video">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            quality={100}
            unoptimized={image?.url ? isProxiedImage(image.url) : false}
          />
          {videoUrl && (
            <button 
              className="purpose-story__play" 
              aria-label="Play video"
              onClick={handlePlayClick}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="white" opacity="0.9" />
                <path d="M24 18L42 30L24 42V18Z" fill="#00a859" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {videoUrl && (
        <VideoModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          videoUrl={videoUrl}
        />
      )}
    </>
  );
}

