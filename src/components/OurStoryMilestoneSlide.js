'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/OurStoryMilestoneSlide.scss';

export default function OurStoryMilestoneSlide({ year, milestones = [] }) {
  // Extract last 2 digits for display (e.g., 2023 -> "23")
  const yearDisplay = year.toString().slice(-2);

  return (
    <div className="our-story-milestone-slide" data-node-id="2936:183">
      <div className="our-story-milestone-slide__inner" data-node-id="2936:184">
        {/* Large Year Number */}
        <p className="our-story-milestone-slide__year-number" data-node-id="2936:185">
          {yearDisplay}
        </p>

        {/* Milestones List */}
        <div className="our-story-milestone-slide__milestones" data-node-id="2936:186">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="our-story-milestone-slide__milestone"
              data-node-id={`2936:${316 + index}`}
            >
              {/* Bullet Icon */}
              <div className="our-story-milestone-slide__bullet">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.5" cy="9.5" r="9.5" fill="#08A03F"/>
                </svg>
              </div>
              {/* Milestone Text */}
              <p className="our-story-milestone-slide__text">
                {milestone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

