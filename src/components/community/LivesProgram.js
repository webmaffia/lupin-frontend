'use client';

import React from 'react';
import Image from 'next/image';
import KeyHighlights from '@/components/community/KeyHighlights';
import '@/scss/components/community/LivesProgram.scss';

export default function LivesProgram({ programData = null }) {
  // Default content if not provided (based on Figma design)
  const defaultContent = {
    title: 'Lives Program',
    subtitle: 'Desh Bandhu Jan Aarogya Sewa',
    content: [
      {
        type: 'paragraph',
        text: 'The Lives program by LHWRF was designed to tackle the growing burden of non-communicable diseases in rural India, especially where early diagnosis poses a major challenge. The program bridges this gap by introducing preventative and primary healthcare to communities.'
      },
      {
        type: 'paragraph',
        text: 'The program focuses on sustained management of chronic diabetes, COPD, cardiovascular diseases, hypertension and asthma, through door-to-door screenings, mobile health camps, and by strengthening public health infrastructure.'
      }
    ]
  };

  const content = programData || defaultContent;

  return (
    <section className="lives-program">
      <div className="lives-program__container">
        <div className="lives-program__content">
          <div className="lives-program__left">
            <div className="lives-program__title-section">
              {content.title && (
                <h2 className="lives-program__title">
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <h3 className="lives-program__subtitle">
                  {content.subtitle}
                </h3>
              )}
            </div>
            {content.content && content.content.length > 0 && (
              <div className="lives-program__text">
                {content.content.map((item, index) => (
                  <div key={index} className="lives-program__item">
                    {item.type === 'heading' && (
                      <h3 className="lives-program__heading">{item.text}</h3>
                    )}
                    {item.type === 'paragraph' && (
                      <p className="lives-program__paragraph">{item.text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lives-program__right">
            <Image
              src="/assets/community/livesprogram.png"
              alt="Lives Program"
              width={872}
              height={600}
              className="lives-program__image"
              quality={100}
            />
          </div>
        </div>
        <div className="lives-program__highlights">
          <KeyHighlights highlights={[
            {
              id: 1,
              number: '192,677',
              description: 'patients screened',
              icon: '/assets/community/keynew1.svg'
            },
            {
              id: 2,
              number: '1100+',
              description: 'health camps',
              icon: '/assets/community/keynew2.svg'
            },
            {
              id: 3,
              number: '65,000+',
              description: 'free consultations',
              icon: '/assets/community/keynew2.svg'
            }
          ]} />
        </div>
      </div>
    </section>
  );
}

