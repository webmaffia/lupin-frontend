'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/AwardsAndRecognitionYears.scss';

// Awards data for each year
const awardsData = {
  2023: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2022: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2021: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2020: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2019: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2018: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ],
  2017: [
    "Acquisition of Five Brands from Menarini",
    "Launch of the world's first fixed-dose triple combination drug, Vilfuro-G®, for COPD in India",
    "Launch of Luforbec® 100/6 in Germany — Lupin's first inhalation product in that market",
    "Acquisition of ONDERO® and ONDERO MET®",
    "Launch of Spiriva (Tiotropium DPI) in the United States",
    "Launch of DIFIZMA® DPI, a triple drug combination for uncontrolled asthma",
    "Launch of Atharv Ability — a multi-disciplinary neuro-rehabilitation center in Mumbai",
    "Acquisition of French company Medisol",
    "Key milestone achieved for the Phase 1 MALT1 inhibitor program with AbbVie Inc.",
    "Launch of LYFE, Lupin Digital Health; for holistic cardiac care business"
  ]
};

export default function AwardsAndRecognitionYears({ activeYear: externalActiveYear, onYearChange }) {
  const activeYear = externalActiveYear || 2023;
  const awards = awardsData[activeYear] || [];
  const yearPrefix = Math.floor(activeYear / 100); // "20" for 2023
  
  // Years array for vertical slider
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
  const activeIndex = years.indexOf(activeYear);
  
  // Get years to display (previous, active, next) with infinite loop
  const getDisplayYears = () => {
    // Calculate previous year (loop to end if at start)
    const prevIndex = activeIndex === 0 ? years.length - 1 : activeIndex - 1;
    const prevYear = years[prevIndex];
    
    // Calculate next year (loop to start if at end)
    const nextIndex = activeIndex === years.length - 1 ? 0 : activeIndex + 1;
    const nextYear = years[nextIndex];
    
    return { prevYear, activeYear, nextYear };
  };
  
  const { prevYear, activeYear: currentActiveYear, nextYear } = getDisplayYears();

  return (
    <section className="awards-and-recognition-years" data-node-id="2936:181">
      <div className="awards-and-recognition-years__container" data-node-id="2936:182">
        {/* Content Box - Dark Green Rounded */}
        <div className="awards-and-recognition-years__content-box" data-node-id="2936:183">
          <div className="awards-and-recognition-years__content-inner" data-node-id="2936:184">
            {/* Year Prefix "20" */}
            <p className="awards-and-recognition-years__year-prefix" data-node-id="2936:185">
              {yearPrefix}
            </p>

            {/* Vertical Year Slider - Static HTML with Infinite Loop */}
            <div className="awards-and-recognition-years__year-slider-wrapper" data-node-id="2936:330">
              <p 
                className="awards-and-recognition-years__year awards-and-recognition-years__year--inactive"
                data-node-id="2936:331"
              >
                {prevYear.toString().slice(-2)}
              </p>
              <p 
                className="awards-and-recognition-years__year awards-and-recognition-years__year--active"
                data-node-id="2936:332"
              >
                {currentActiveYear.toString().slice(-2)}
              </p>
              <p 
                className="awards-and-recognition-years__year awards-and-recognition-years__year--inactive"
                data-node-id="2936:333"
              >
                {nextYear.toString().slice(-2)}
              </p>
            </div>

            {/* Awards List */}
            <ul className="awards-and-recognition-years__awards-list" data-node-id="2936:186">
              {awards.length > 0 ? (
                awards.map((award, index) => (
                  <li
                    key={index}
                    className="awards-and-recognition-years__award-item"
                    data-node-id={`2936:${316 + index}`}
                  >
                    <div className="awards-and-recognition-years__award-icon">
                      <Image
                        src="/assets/images/our-story/pointer.svg"
                        alt=""
                        width={20}
                        height={19}
                        className="awards-and-recognition-years__pointer-icon"
                      />
                    </div>
                    <p className="awards-and-recognition-years__award-text">
                      {award}
                    </p>
                  </li>
                ))
              ) : (
                <li className="awards-and-recognition-years__no-awards">
                  <p>No awards available for this year.</p>
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

