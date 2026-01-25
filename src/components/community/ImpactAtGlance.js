'use client';

import React from 'react';
import Image from 'next/image';
import '@/scss/components/community/ImpactAtGlance.scss';

export default function ImpactAtGlance({ impactData = null }) {
  // Don't render if no data
  if (!impactData) {
    return null;
  }

  const content = impactData;

  return (
    <section className="impact-at-glance">
      <div className="impact-at-glance__container">
        <div className="impact-at-glance__header">
          {content?.title && (
            <h2 className="impact-at-glance__title">{content.title}</h2>
          )}
          {content?.subtitle && (
            <p className="impact-at-glance__subtitle">{content.subtitle}</p>
          )}
        </div>
        <div className="impact-at-glance__content">
          <div className="impact-at-glance__map-wrapper">
            <Image
              src={content?.map || "/assets/community/map.png"}
              alt="India Map"
              width={660}
              height={660}
              className="impact-at-glance__map"
              quality={100}
            />
          </div>
          <div className="impact-at-glance__metrics">
            {content?.metrics && content.metrics.length > 0 && content.metrics.map((metric, index) => {
              // Different left positions for each metric based on Figma design
              const positionClasses = [
                'impact-at-glance__metric--pos1',
                'impact-at-glance__metric--pos2',
                'impact-at-glance__metric--pos3',
                'impact-at-glance__metric--pos4'
              ];
              const positionClass = positionClasses[index] || '';
              
              return (
                <div 
                  key={metric?.id || index} 
                  className={`impact-at-glance__metric ${positionClass}`}
                >
                  <div className="impact-at-glance__icon-wrapper">
                    <Image
                      src={metric?.icon || '/assets/community/key1.svg'}
                      alt="Impact icon"
                      width={100}
                      height={100}
                      className="impact-at-glance__icon"
                    />
                  </div>
                  <div className="impact-at-glance__text-wrapper">
                    {metric?.number && (
                      <div className="impact-at-glance__number">{metric.number}</div>
                    )}
                    {metric?.description && (
                      <p className="impact-at-glance__description">{metric.description}</p>
                    )}
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

