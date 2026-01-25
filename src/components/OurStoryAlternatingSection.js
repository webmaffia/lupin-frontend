'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/OurStoryAlternatingSection.scss';

export default function OurStoryAlternatingSection({ 
  image, 
  text, 
  imageAlt, 
  isEven = false 
}) {
  return (
    <section className={`our-story-alternating ${isEven ? 'our-story-alternating--even' : 'our-story-alternating--odd'}`}>
      <div className="our-story-alternating__container">
        {/* Image - Left for odd, Right for even */}
        <div className="our-story-alternating__image-wrapper">
          <div className="our-story-alternating__image-container">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="our-story-alternating__image"
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text Panel - Right for odd, Left for even */}
        <div className="our-story-alternating__content-wrapper">
          <div className="our-story-alternating__content">
            <div className="our-story-alternating__text">
              {typeof text === 'string' ? <p>{text}</p> : <p>{text}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

