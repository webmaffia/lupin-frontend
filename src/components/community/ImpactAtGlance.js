'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/community/ImpactAtGlance.scss';

export default function ImpactAtGlance({ impactData = null }) {
  // Default content if not provided (based on Figma design)
  const defaultContent = {
    title: 'Impact at a Glance',
    subtitle: '8 states | 26 districts | 5400+ villages positively impacted across India',
    metrics: [
      {
        id: 1,
        number: '5,246,945',
        description: 'cubic meters water recharge potential created',
        icon: '/assets/community/key1.svg'
      },
      {
        id: 2,
        number: '65,000+',
        description: 'free medical consultations delivered',
        icon: '/assets/community/key1.svg'
      },
      {
        id: 3,
        number: '1,100+',
        description: 'health camps conducted',
        icon: '/assets/community/key1.svg'
      },
      {
        id: 4,
        number: '24,500+',
        description: 'acres of land transformed through sustainable vegetable cultivation',
        icon: '/assets/community/key1.svg'
      }
    ]
  };

  const content = impactData || defaultContent;

  return (
    <section className="impact-at-glance">
      <div className="impact-at-glance__container">
        <div className="impact-at-glance__header">
          <h2 className="impact-at-glance__title">{content.title}</h2>
          <p className="impact-at-glance__subtitle">{content.subtitle}</p>
        </div>
        <div className="impact-at-glance__content">
          {content.map && (
            <div className="impact-at-glance__map-wrapper">
              <Image
                src={content.map}
                alt="India Map"
                width={660}
                height={660}
                className="impact-at-glance__map"
                quality={100}
              />
            </div>
          )}
          <div className="impact-at-glance__metrics">
            {content.metrics.map((metric, index) => {
              // Different left positions for each metric based on Figma design
              const positionClasses = [
                'impact-at-glance__metric--pos1',
                'impact-at-glance__metric--pos2',
                'impact-at-glance__metric--pos3',
                'impact-at-glance__metric--pos4'
              ];
              const positionClass = positionClasses[index] || '';
              
              // Format number with commas
              const formatNumber = (num) => {
                if (typeof num === 'string') {
                  // Remove any existing commas and format
                  const cleanNum = num.replace(/,/g, '');
                  return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              };
              
              const formattedNumber = formatNumber(metric.number);
              
              return (
                <div 
                  key={metric.id} 
                  className={`impact-at-glance__metric ${positionClass}`}
                >
                  <div className="impact-at-glance__icon-wrapper">
                    {/* Use static key1.svg icon - commented out dynamic icon */}
                    {/* <Image
                      src={metric.icon}
                      alt="Impact icon"
                      width={100}
                      height={100}
                      className="impact-at-glance__icon"
                    /> */}
                    <Image
                      src="/assets/community/key1.svg"
                      alt="Impact icon"
                      width={100}
                      height={100}
                      className="impact-at-glance__icon"
                    />
                  </div>
                  <div className="impact-at-glance__text-wrapper">
                    <div className="impact-at-glance__number">{formattedNumber}</div>
                    <p className="impact-at-glance__description">{metric.description}</p>
                    <div className="impact-at-glance__divider"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

