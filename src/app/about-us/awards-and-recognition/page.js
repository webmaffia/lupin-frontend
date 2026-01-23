'use client';

import { useState } from 'react';
import InnerBanner from '@/components/InnerBanner';
import ProfileCard from '@/components/global/ProfileCard';
import YearSelector from './components/YearSelector';
import '@/scss/pages/awards-and-recognition.scss';

// Note: Metadata should be handled in a layout file for client components

export default function AwardsAndRecognitionPage() {
  const [activeYear, setActiveYear] = useState(2020);

  // Default banner data
  const bannerData = {
    title: {
      line1: "Awards and",
      line2: "Recognition"
    },
    subheading: {
      enabled: true,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Awards and Recognition - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  // Content for each year (to be populated with actual data)
  const yearContent = {
    2020: [
      {
        title: "Our Vizag Team Won the Outstanding Award in the Water Management Category at the 19th Exceed Environment Awards 2025.",
        image: "/assets/media-kit-card/demo5.png",
        imagePosition: "bottom"
      },
      {
        title: "Lupin Human Welfare and Research Foundation (LHWRF) was honored with the highest rating of VO 1A Grading, organized by Crisil Intelligence.",
        image: "/assets/media-kit-card/demo5.png",
        imagePosition: "bottom"
      },
      {
        title: "Lupin Diagnostics received Leading Diagnostics Chain and the Excellence in High-Diagnostics awards at the 16th Elets Healthcare innovation award in 2025. These awards are testaments to our patient-first approach.",
        image: "/assets/media-kit-card/demo5.png",
        imagePosition: "bottom"
      },
      {
        title: "Lupin Human Welfare and Research Foundation won the Excellence in CSR (National) award at the ET HealthWorld Healthcare Awards 2025.",
        image: "/assets/media-kit-card/demo5.png",
        imagePosition: "bottom"
      },
      {
        title: "Our Tarapur team won the Competitors Award at the Green Manufacturing Excellence Awards 2025, organized by Futurescaper.",
        image: "/assets/media-kit-card/demo5.png",
        imagePosition: "bottom"
      }
    ],
    2019: {
      title: "Mandideep facility received the Medal of Honor for our notable work in environmental protection from the Honorable Chief Minister of Madhya Pradesh, Dr. Mohan Yadav, at the Annual Environment Awards.",
      image: "/assets/media-kit-card/demo5.png",
      imagePosition: "bottom"
    },
    2018: {
      title: "Mandideep facility received the Medal of Honor for our notable work in environmental protection from the Honorable Chief Minister of Madhya Pradesh, Dr. Mohan Yadav, at the Annual Environment Awards.",
      image: "/assets/media-kit-card/demo5.png",
      imagePosition: "bottom"
    },
    2017: {
      title: "Mandideep facility received the Medal of Honor for our notable work in environmental protection from the Honorable Chief Minister of Madhya Pradesh, Dr. Mohan Yadav, at the Annual Environment Awards.",
      image: "/assets/media-kit-card/demo5.png",
      imagePosition: "bottom"
    },
    2016: {
      title: "Mandideep facility received the Medal of Honor for our notable work in environmental protection from the Honorable Chief Minister of Madhya Pradesh, Dr. Mohan Yadav, at the Annual Environment Awards.",
      image: "/assets/media-kit-card/demo5.png",
      imagePosition: "bottom"
    },
    2015: {
      title: "Mandideep facility received the Medal of Honor for our notable work in environmental protection from the Honorable Chief Minister of Madhya Pradesh, Dr. Mohan Yadav, at the Annual Environment Awards.",
      image: "/assets/media-kit-card/demo5.png",
      imagePosition: "bottom"
    }
  };

  const currentContent = yearContent[activeYear] || yearContent[2020];

  return (
    <div className="awards-and-recognition-page">
      <InnerBanner data={bannerData} />
      
      {/* Content sections will be added based on Figma design */}
      <section className="awards-and-recognition-content">
        <div className="awards-and-recognition-content__container">
          <div className="awards-and-recognition-content__text" data-node-id="2849:235">
            <h2 className="awards-and-recognition-content__heading" data-node-id="2849:236">
              Setting the Bar Higher
            </h2>
            <div className="awards-and-recognition-content__paragraph" data-node-id="2849:237">
              <p>Our actions have earned us a number of accolades for various facets of our journey, including innovation, employee satisfaction, quality<br />standards and social upliftment efforts.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Year Selector Section */}
      <section className="awards-and-recognition-years-section">
        <div className="awards-and-recognition-years-section__container">
          <YearSelector onYearChange={setActiveYear} />
        </div>
      </section>
      
      {/* Year Content Section */}
      <section className="awards-and-recognition-year-content">
        <div className="awards-and-recognition-year-content__container">
          <div className="profile-cards-container">
            <div className="profile-card-grid">
              {Array.isArray(currentContent) ? (
                currentContent.map((item, index) => (
                  <ProfileCard
                    key={index}
                    name=""
                    title={item.title}
                    image={item.image}
                    imagePosition={item.imagePosition}
                    showArrow={false}
                  />
                ))
              ) : (
                <ProfileCard
                  name=""
                  title={currentContent.title}
                  image={currentContent.image}
                  imagePosition={currentContent.imagePosition}
                  showArrow={false}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

