'use client';

import { useState } from 'react';
import OurStoryYearSelector from '@/components/OurStoryYearSelector';
import AwardsAndRecognitionYears from '@/components/AwardsAndRecognitionYears';
import '@/scss/components/AwardsAndRecognitionSection.scss';

export default function AwardsAndRecognitionSection() {
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
  const [activeYear, setActiveYear] = useState(2023);

  const handleYearChange = (year) => {
    setActiveYear(year);
  };

  return (
    <section className="awards-and-recognition-section">
      <div className="awards-and-recognition-section__year-selector-wrapper">
        <OurStoryYearSelector 
          years={years}
          activeYear={activeYear}
          onYearChange={handleYearChange}
        />
      </div>
      <AwardsAndRecognitionYears 
        activeYear={activeYear}
        onYearChange={handleYearChange}
      />
    </section>
  );
}

