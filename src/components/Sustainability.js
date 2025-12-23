import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/Sustainability.scss';

export default function Sustainability({ data }) {
  // Default data (will be replaced by Strapi)
  const sustainabilityData = data || {
    eyebrow: "Sustainability",
    heading: {
      line1: "Caring",
      line2: "for People",
      line3: "and Planet",
    },
    description: {
      line1: "Our mission extends beyond medicine – we invest",
      line2: "in people, communities, and a greener tomorrow."
    },
    cta: {
      text: "know more",
      href: "#sustainability"
    },
    backgroundImage: "/assets/3d912ec77c9e95fffd0212f6b331bddc3ea324cc.png"
  };

  return (
    <section className="sustainability" data-node-id="22:3301">
      {/* Background Image */}
      <div className="sustainability__bg" data-node-id="22:3302">
        <div className="sustainability__bg-image" data-node-id="22:3303">
          <Image
            src={sustainabilityData.backgroundImage}
            alt="Sustainability"
            fill
            quality={100}
            className="sustainability__bg-img"
          />
        </div>
      </div>

      {/* Content */}
      <div className="sustainability__content" data-node-id="22:3304">
        <div className="sustainability__text" data-node-id="22:3305">
          <div className="sustainability__header" data-node-id="22:3306">
            <p className="sustainability__eyebrow" data-node-id="22:3307">
              {sustainabilityData.eyebrow}
            </p>
            <div className="sustainability__heading" data-node-id="22:3308">
              <p>{sustainabilityData.heading.line1}</p>
              <p>{sustainabilityData.heading.line2}</p>
              <p>{sustainabilityData.heading.line3}</p>
              <p>{sustainabilityData.heading.line4}</p>
            </div>
          </div>
          <div className="sustainability__description" data-node-id="22:3309">
            <p>{sustainabilityData.description.line1}</p>
            <p>{sustainabilityData.description.line2}</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={sustainabilityData.cta.href} className="our-story__cta" data-node-id="22:3310">
          <div className="sustainability__cta-inner">
            <span className="sustainability__cta-dot" data-node-id="22:3313"></span>
            <span className="sustainability__cta-text" data-node-id="22:3312">
              {sustainabilityData.cta.text}
            </span>
          </div>
          <span className="sustainability__cta-underline" data-node-id="22:3314"></span>
        </Link>
      </div>
    </section>
  );
}

