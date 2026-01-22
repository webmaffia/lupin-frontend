'use client';

import { useState } from 'react';
import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import VideoModal from '@/components/VideoModal';

export default function OurValuesContent({ bannerData, contentData }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoUrl = "https://www.youtube.com/watch?v=1BqgtIw94y4";

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="our-values-content">
        <div className="our-values-content__logo">
          <Image
            src="/assets/our-values/logo.png"
            alt="Spirit of Lupin"
            width={500}
            height={200}
            quality={100}
            className="our-values-content__logo-img"
          />
        </div>
        <div className="our-values-content__container">
          <div className="our-values-content__frame">
            <h1 className="our-values-content__heading">
              {contentData.heading}
            </h1>
          
            <p className="our-values-content__description">
              {contentData.description}
            </p>
          </div>
          {contentData.decoration && (
            <div className="our-values-content__decoration">
              <Image
                src={contentData.decoration.url}
                alt={contentData.decoration.alt}
                width={contentData.decoration.width}
                height={contentData.decoration.height}
                quality={100}
                className="our-values-content__decoration-img"
              />
            </div>
          )}
        </div>
      </section>
      <section className="our-values-listing">
        <div className="our-values-listing__container">
          <div className="our-values-listing__grid">
            {[
              {
                id: 1,
                title: "Integrity",
                description: "We conduct ourselves with uncompromising integrity and honesty, upholding the highest standards of ethical behavior and transparency. Everything we do must stand public scrutiny.",
                image: "/assets/our-values/imageThumbnail.png"
              },
              {
                id: 2,
                title: "Teamwork",
                description: "We align efforts across levels and geographies to deliver outstanding results. We encourage diverse opinions and work together in a coordinated and mutually supportive way.",
                image: "/assets/our-values/imageThumbnail.png"
              },
              {
                id: 3,
                title: "Passion for Excellence",
                description: "We relentlessly pursue excellence through innovation and continuous improvement in all our projects, processes, and products. To set our standards, we benchmark with the best in the world.",
                image: "/assets/our-values/imageThumbnail.png"
              },
              {
                id: 4,
                title: "Entrepreneurial Spirit",
                description: "We empower our employees to generate new ideas, explore avenues, and offer solutions that add exceptional value. We encourage ownership with responsibility, passion, and conviction.",
                image: "/assets/our-values/imageThumbnail.png"
              },
              {
                id: 5,
                title: "Respect and Care",
                description: "We are compassionate and sensitive towards all our stakeholders and treat them the way we expect to be treated. We provide equal and fair opportunities for employment, learning, and career development.",
                image: "/assets/our-values/imageThumbnail.png"
              },
              {
                id: 6,
                title: "Customer Focus",
                description: "We strive to understand and meet customer needs in a professional and responsive manner, building long-term partnerships for mutual benefit.",
                image: "/assets/our-values/imageThumbnail.png"
              }
            ].map((value) => (
              <div key={value.id} className="our-values-listing__card">
                <div className="our-values-listing__card-image-wrapper">
                  <Image
                    src={value.image}
                    alt={value.title}
                    width={758}
                    height={553}
                    quality={100}
                    className="our-values-listing__card-image"
                  />
                </div>
                <div className="our-values-listing__card-content">
                  <h2 className="our-values-listing__card-title">
                    {value.title}
                  </h2>
                  <p className="our-values-listing__card-description">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="our-values-video">
        <div className="our-values-video__container">
          <h2 className="our-values-video__heading">
            Principles That Shape Our Culture
          </h2>
          <div className="our-values-video__wrapper">
            <Image
              src="/assets/our-values/poster-image.png"
              alt="Video poster"
              fill
              className="our-values-video__poster-image"
              quality={100}
            />
            <div className="our-values-video__play-button-wrapper" onClick={() => setIsVideoModalOpen(true)}>
              <button className="our-values-video__play-button" aria-label="Play video">
                <svg width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="76" cy="76" r="76" fill="white"/>
                  <path d="M64 48L64 104L104 76L64 48Z" fill="#08A03F"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={videoUrl}
      />
    </div>
  );
}

