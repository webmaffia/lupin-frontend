import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/OurStory.scss';

export default function OurStory({ data }) {
  // Default data (will be replaced by Strapi)
  const storyData = data || {
    eyebrow: "Our Story",
    heading: {
      line1: "The Promise",
      line2: "of Caring"
    },
    paragraphs: [
      "Science can be a potent catalyst for change and transformation. This conviction in the power of science to improve health outcomes and uplift communities served as the guiding light for our founder, Dr. Desh Bandhu Gupta, and for Lupin,",
      "the company he founded in 1968."
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
              </h2>
            </div>
            
            {/* Description */}
            <div className="our-story__description">
              {storyData.paragraphs.map((paragraph, index) => (
                <p key={index} className="our-story__paragraph">{paragraph}</p>
              ))}
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
