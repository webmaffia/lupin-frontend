'use client';

import { useState, useRef, useEffect } from 'react';
import '@/scss/pages/awards-and-recognition.scss';

export default function YearSelector({ onYearChange }) {
  const [activeYear, setActiveYear] = useState(2020);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005];

  // Notify parent component when active year changes
  useEffect(() => {
    if (onYearChange) {
      onYearChange(activeYear);
    }
  }, [activeYear, onYearChange]);

  useEffect(() => {
    let isScrolling = false;
    
    const checkScrollability = () => {
      if (scrollContainerRef.current && !isScrolling) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const tolerance = 1;
        setCanScrollLeft(scrollLeft > tolerance);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
      }
    };

    // Initial check after a small delay to ensure DOM is ready
    setTimeout(checkScrollability, 100);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    // Find current active year index
    const currentIndex = years.indexOf(activeYear);
    
    // Calculate new active year based on direction
    let newActiveYear = activeYear;
    if (direction === 'right' && currentIndex < years.length - 1) {
      // Right arrow = move to next year (older year, e.g., 2020 → 2019)
      newActiveYear = years[currentIndex + 1];
    } else if (direction === 'left' && currentIndex > 0) {
      // Left arrow = move to previous year (newer year, e.g., 2019 → 2020)
      newActiveYear = years[currentIndex - 1];
    }
    
    // Don't proceed if year hasn't changed
    if (newActiveYear === activeYear) return;
    
    // Update active year immediately
    setActiveYear(newActiveYear);
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      
      // Get all year buttons
      const yearButtons = Array.from(scrollContainerRef.current.querySelectorAll('.awards-and-recognition-years__year'));
      if (yearButtons.length === 0) return;
      
      // Find the button for the new active year and scroll to it
      const targetButton = yearButtons.find(btn => parseInt(btn.textContent) === newActiveYear);
      if (targetButton) {
        const container = scrollContainerRef.current;
        const buttonLeft = targetButton.offsetLeft;
        const buttonWidth = targetButton.offsetWidth;
        const containerWidth = container.clientWidth;
        
        // Center the active year in the viewport
        const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
        
        // Update scrollability state after scroll completes
        setTimeout(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const tolerance = 1;
            setCanScrollLeft(scrollLeft > tolerance);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
          }
        }, 500);
      }
    });
  };

  const handleYearClick = (year) => {
    if (year === activeYear) return;
    
    setActiveYear(year);
    
    // Scroll to the clicked year
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const yearButtons = Array.from(scrollContainerRef.current.querySelectorAll('.awards-and-recognition-years__year'));
        const targetButton = yearButtons.find(btn => parseInt(btn.textContent) === year);
        if (targetButton) {
          const container = scrollContainerRef.current;
          const buttonLeft = targetButton.offsetLeft;
          const buttonWidth = targetButton.offsetWidth;
          const containerWidth = container.clientWidth;
          
          const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
          
          container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth'
          });
        }
      }
    }, 10);
  };

  return (
    <div className="awards-and-recognition-years" data-node-id="2849:222">
      <button
        className={`awards-and-recognition-years__arrow awards-and-recognition-years__arrow--left ${!canScrollLeft ? 'awards-and-recognition-years__arrow--disabled' : ''}`}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        data-node-id="2849:223"
        aria-label="Previous years"
      >
        <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.3292 29.2129L0.712224 14.615L13.633 0.763517" stroke="#126430" strokeWidth="1.47674" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div 
        className="awards-and-recognition-years__container"
        ref={scrollContainerRef}
        data-node-id="2849:225"
      >
        {years.map((year) => (
          <button
            key={year}
            className={`awards-and-recognition-years__year ${activeYear === year ? 'awards-and-recognition-years__year--active' : ''}`}
            onClick={() => handleYearClick(year)}
            data-node-id={year === 2020 ? '2849:226' : year === 2019 ? '2849:227' : year === 2018 ? '2849:228' : year === 2017 ? '2849:229' : year === 2016 ? '2849:230' : year === 2015 ? '2849:231' : '2849:232'}
          >
            {year}
          </button>
        ))}
      </div>
      
      <button
        className={`awards-and-recognition-years__arrow awards-and-recognition-years__arrow--right ${!canScrollRight ? 'awards-and-recognition-years__arrow--disabled' : ''}`}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        data-node-id="2849:233"
        aria-label="Next years"
      >
        <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
          <path d="M14.3292 29.2129L0.712224 14.615L13.633 0.763517" stroke="#126430" strokeWidth="1.47674" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

