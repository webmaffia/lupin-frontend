'use client';

import React from 'react';
import '@/scss/pages/community.scss';

export default function LivelihoodSection({ livelihoodData = null }) {
  // Default content if not provided
  const defaultData = {
    heading: "Livelihood Program",
    subheading: "Desh Bandhu Jan Utkarsh Pariyojana",
    paragraphs: [
      "Agriculture remains the backbone of rural India, but still farmers face challenges such as low productivity, climate vulnerability or lack of modern agricultural practices.",
      "Through its Livelihood Program, LHWRF addresses these challenges by enabling technology-led, climate-resilient livelihood solutions anchored in agriculture and allied activities.",
      "Implemented across all eight states, the program has reached millions of families, supporting their transition from mere subsistence to long-term sustainability. Within the Livelihood Program, LHWRF focuses on three focus areas."
    ],
    backgroundImage: "/assets/community/livelihood.png"
  };

  const data = livelihoodData || defaultData;

  return (
    <section className="community-livelihood">
      <div className="community-livelihood__bg">
        <picture>
          {/* Mobile image can be added here later */}
          {/* <source media="(max-width: 768px)" srcSet="/assets/community/livelihood-mobile.png" /> */}
          <img
            src={data.backgroundImage}
            alt="Livelihood"
            className="community-livelihood__bg-image"
          />
        </picture>
      </div>
      <div className="community-livelihood__container">
        <div className="community-livelihood__content">
          <h2 className="community-livelihood__heading">
            {data.heading}
          </h2>
          <div className="community-livelihood__text">
            <h3 className="community-livelihood__subheading">
              {data.subheading}
            </h3>
            <div className="community-livelihood__paragraphs">
              {data.paragraphs.map((paragraph, index) => (
                <p key={index} className="community-livelihood__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

