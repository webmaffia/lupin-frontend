import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/OurStory.scss';

export default function OurStory({ data }) {
  // Default data (will be replaced by Strapi)
  const storyData = data || {
    eyebrow: "The Lupin Story",
    heading: {
      line1: "Driven by ",
      line2: "Science... ",
      line3: "Inspired by Patients"
    },
    paragraphs: [
      "Founded by Dr. Desh Bandhu Gupta in 1968, Lupin",
      "aimed to improve access to essential",
      "medicines. Today we stand tall as a globally",
      "trusted pharmaceutical company guided by",
      "science, quality, and a patient-first mindset"
    ],
    cta: {
      text: "know more",
      href: "#our-story"
    }
  };

  return (
    <section className="our-story">
      {/* Background */}
      <div className="our-story__bg">
        {/* Gradient base */}
        <div className="our-story__bg-gradient"></div>
        
        {/* Green blur ellipse - CSS only */}
        <div className="our-story__bg-ellipse"></div>
        
        {/* Texture overlay */}
        <div className="our-story__bg-texture">
          <Image
            src="/assets/gradient-texture.png"
            alt=""
            width={1920}
            height={971}
            quality={100}
          />
        </div>
        
        {/* Pattern decoration */}
        <div className="our-story__bg-pattern">
          <Image
            src="/assets/e287bd148edd9892715405681c54ad67f24da1c0.svg"
            alt=""
            width={646}
            height={716}
            quality={100}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="our-story__container">
        {/* Founder Image */}
        <div className="our-story__image-wrapper">
          <Image
            src="/assets/674fc7febad2add4eedc3fdf118dcb3b7e306b0a.png"
            alt="Founder Dr. Desh Bandhu Gupta"
            width={802}
            height={776}
            className="our-story__image"
            quality={100}
          />
        </div>

        {/* Text Content */}
        <div className="our-story__content">
          {/* Text Section */}
          <div className="our-story__text">
            {/* Heading */}
            <div className="our-story__heading-wrapper">
              <p className="our-story__eyebrow">{storyData.eyebrow}</p>
              <h2 className="our-story__heading">
                <span className="our-story__heading-line">{storyData.heading.line1}</span>
                <span className="our-story__heading-line">{storyData.heading.line2}</span>
                {storyData.heading.line3 && (
                  <span className="our-story__heading-line">{storyData.heading.line3}</span>
                )}
              </h2>
            </div>
            
            {/* Description */}
            <div className="our-story__description">
              <p className="our-story__paragraph">
                {storyData.paragraphs.map((paragraph, index) => (
                  <span key={index}>
                    {paragraph}
                    {index < storyData.paragraphs.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link href={storyData.cta.href} className="our-story__cta">
            <div className="our-story__cta-inner">
              <span className="our-story__cta-dot"></span>
              <span className="our-story__cta-text">{storyData.cta.text}</span>
            </div>
            <span className="our-story__cta-underline"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
