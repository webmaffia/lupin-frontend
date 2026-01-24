'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/community/KeyHighlights.scss';

export default function KeyHighlights({ highlights = [] }) {
  // Function to get icon path based on highlight id
  const getIconPath = (id) => {
    const iconMap = {
      1: '/assets/community/key1.svg',
      2: '/assets/community/key2.svg',
      3: '/assets/community/key3.svg',
      4: '/assets/community/key4.svg',
      5: '/assets/community/key5.svg'
    };
    return iconMap[id] || '/assets/community/key1.svg';
  };

  // Default highlights if not provided
  const defaultHighlights = [
    {
      id: 1,
      number: '880+',
      description: 'Lupin Farmer Schools trainings conducted'
    },
    {
      id: 2,
      number: '350+',
      description: 'animal husbandry demonstrations'
    },
    {
      id: 3,
      number: '4,726',
      description: 'soil tests conducted'
    },
    {
      id: 4,
      number: '100+',
      description: 'animal health camps'
    },
    {
      id: 5,
      number: '6,729',
      description: 'farmers linked to government schemes'
    }
  ];

  // Filter out highlights with empty values and ensure proper structure
  const validHighlights = highlights
    .filter((h) => {
      // Include if it has a description (required) or a valid number
      const hasDescription = h.description && h.description.trim() !== '';
      const hasNumber = (h.number !== null && h.number !== undefined && h.number !== '') ||
                       (h.value !== null && h.value !== undefined && h.value !== '');
      return hasDescription || hasNumber;
    })
    .map((h) => {
      // Use number if available, otherwise use value
      const displayNumber = h.number !== undefined && h.number !== null && h.number !== '' 
        ? h.number 
        : (h.value !== undefined && h.value !== null && h.value !== '' ? h.value : '');
      
      return {
        id: h.id || Math.random(),
        number: String(displayNumber),
        description: h.description || '',
        icon: h.icon || '/assets/community/key1.svg' // Use static icon
      };
    });

  // Use valid highlights if available, otherwise use defaults
  const highlightsData = validHighlights.length > 0 ? validHighlights : defaultHighlights;
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('KeyHighlights - highlights prop:', highlights);
    console.log('KeyHighlights - validHighlights:', validHighlights);
    console.log('KeyHighlights - highlightsData:', highlightsData);
  }

  return (
    <section className="key-highlights">
      <div className="key-highlights__container">
        <h2 className="key-highlights__title">Key Highlights</h2>
        <div className="key-highlights__grid">
          {highlightsData.map((highlight) => (
            <div key={highlight.id} className="key-highlights__item">
              <div className="key-highlights__icon-wrapper">
                <Image
                  src={highlight.icon || getIconPath(highlight.id)}
                  alt="Highlight icon"
                  width={100}
                  height={100}
                  className="key-highlights__icon"
                />
              </div>
              <div className="key-highlights__content">
                <div className="key-highlights__number">{highlight.number}</div>
                <p className="key-highlights__description">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

