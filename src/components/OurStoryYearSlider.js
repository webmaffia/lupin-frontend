'use client';

import React, { useRef, useState, useEffect } from 'react';
import OurStoryMilestoneSlide from './OurStoryMilestoneSlide';
import '@/scss/components/OurStoryYearSlider.scss';

export default function OurStoryYearSlider() {
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017];
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeYear, setActiveYear] = useState(2023);

  // Milestones data for each year
  const milestonesData = {
    2023: [
      "Acquisition of Five Brands from Menarini",
      "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
      "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
      "Acquisition of ONDERO® and ONDERO MET®",
      "Launch of Spiriva (Tiotropium DPI) in the United States",
      "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
      "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
      "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business",
      "Acquisition of French company Medisol",
      "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc."
    ],
    2022: [],
    2021: [],
    2020: [],
    2019: [],
    2018: [],
    2017: []
  };

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const tolerance = 1;
    
    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  };

  useEffect(() => {
    checkScrollability();
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = 200; // Adjust scroll distance as needed
    
    if (direction === 'left') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    
    // Check scrollability after scroll
    setTimeout(checkScrollability, 300);
  };

  const handleYearClick = (year) => {
    setActiveYear(year);
  };

  return (
    <section className="our-story-year-slider" data-node-id="2888:555">
      {/* Year Navigation */}
      <div className="our-story-year-slider__container">
        {/* Left Arrow Button */}
        <button
          className={`our-story-year-slider__arrow our-story-year-slider__arrow--left ${!canScrollLeft ? 'our-story-year-slider__arrow--disabled' : ''}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          data-node-id="2888:556"
          aria-label="Scroll left"
        >
          <div className="our-story-year-slider__arrow-wrapper" data-node-id="2888:557">
            {/* Ellipse Background */}
            <div className="our-story-year-slider__arrow-ellipse" data-node-id="2888:558">
              <div className="our-story-year-slider__arrow-ellipse-inner">
                <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="52" cy="52" r="52" fill="#126430" opacity="0.3"/>
                </svg>
              </div>
            </div>
            {/* Chevron Icon */}
            <div className="our-story-year-slider__arrow-chevron" data-node-id="2888:559">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 3L5.5 9L11.5 15" stroke="#e1e1e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        {/* Years Display - Scrollable Container */}
        <div 
          className="our-story-year-slider__years-wrapper"
          ref={scrollContainerRef}
        >
          <div className="our-story-year-slider__years" data-node-id="2888:560">
            {years.map((year, index) => (
              <button
                key={`${year}-${index}`}
                className={`our-story-year-slider__year ${activeYear === year ? 'our-story-year-slider__year--active' : ''}`}
                onClick={() => handleYearClick(year)}
                data-node-id={`2888:${561 + index}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          className={`our-story-year-slider__arrow our-story-year-slider__arrow--right ${!canScrollRight ? 'our-story-year-slider__arrow--disabled' : ''}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          data-node-id="2888:568"
          aria-label="Scroll right"
        >
          <div className="our-story-year-slider__arrow-circle">
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="52" cy="52" r="52" fill="#e1e1e1"/>
            </svg>
          </div>
          <div className="our-story-year-slider__arrow-chevron-right">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 3L13.5 9L7.5 15" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Milestone Slide */}
      <div className="our-story-year-slider__slide-container">
        <OurStoryMilestoneSlide 
          year={activeYear} 
          milestones={milestonesData[activeYear] || []} 
        />
      </div>
    </section>
  );
}

