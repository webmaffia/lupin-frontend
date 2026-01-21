'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../scss/components/IndiaTherapySection.scss';

export default function IndiaTherapySection({ data }) {
  // Tabs data - fixed, does not change - all in one row
  const tabs = [
    { id: 'anti-tb', label: 'Anti-Tuberculosis (TB)' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'anti-diabetes', label: 'Anti-Diabetes' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'womens-health-1', label: "Women's Health" },
    { id: 'gastrointestinal', label: 'Gastrointestinal' },
    { id: 'oncology', label: 'Oncology' },
    { id: 'pain-management', label: 'Pain Management' },
    { id: 'anti-infectives', label: 'Anti-Infectives' },
    { id: 'vitamins', label: 'Vitamins/Minerals/Nutrients' },
    { id: 'ophthalmology', label: 'Ophthalmology' },
    { id: 'urology', label: 'Urology' },
    { id: 'womens-health-2', label: "Women's Health" },
    { id: 'dermatology', label: 'Dermatology' },
    { id: 'bone-muscle', label: 'Bone and Muscle Health' }
  ];

  // Content data for each tab
  const contentData = {
    'respiratory': {
      heading: 'Respiratory',
      description: "Lupin is a leading player in respiratory care, addressing the growing burden of asthma and COPD. Ranked 2nd in this segment, we are conducting continuous in-depth research to advance innovative, patient-centric respiratory therapies. Lupin is set to become the 1st Indian pharmaceutical company to deploy next-generation, near-zero global warming potential propellants across its respiratory inhalers at scale."
    }
  };

  // Respiratory is the default active tab
  const [activeTabId, setActiveTabId] = useState('respiratory');

  const activeContent = contentData[activeTabId] || null;

  return (
    <section className="india-therapy-section" data-node-id="3071:3897">
      <div className="india-therapy-section__container">
        <div className="india-therapy-section__tabs-container">
          <div className="india-therapy-section__tabs-row">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`india-therapy-section__tab ${activeTabId === tab.id ? 'india-therapy-section__tab--active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {activeContent && (
          <div className="india-therapy-section__content">
            <div className="india-therapy-section__text-content">
              <div className="india-therapy-section__heading-wrapper">
                <div className="india-therapy-section__icon">
                  <Image
                    src="/assets/images/india/whitepointer.svg"
                    alt=""
                    width={31}
                    height={31}
                    className="india-therapy-section__icon-image"
                  />
                </div>
                <h2 className="india-therapy-section__heading">
                  {activeContent.heading}
                </h2>
              </div>
              <p className="india-therapy-section__description">
                {activeContent.description}
              </p>
            </div>
            <div className="india-therapy-section__image-wrapper">
              <div className="india-therapy-section__image-container">
                <Image
                  src="/assets/images/india/lady.png"
                  alt={activeContent.heading || 'Therapy image'}
                  width={786}
                  height={591}
                  className="india-therapy-section__image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
