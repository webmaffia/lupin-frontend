import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/Life.scss';

export default function Life({ data }) {
  // Default data (will be replaced by Strapi)
  const lifeData = data || {
    heading: {
      large: "Life",
      small: "at Lupin World"
    },
    description: "In every walk of Lupin life, our people are the #ForceOfGood in their mission of enhancing patient's life and longevity",
    cta: {
      text: "Join our Lupin team",
      href: "#careers"
    },
    backgroundImage: "/assets/6e01a9ab02dfdbf2b098d95bb83f779151169bffx.png"
  };

  return (
    <section className="life" data-node-id="22:3347">
      {/* Background Gradient and Image */}
      <div className="life__bg" data-node-id="22:3348">
        {/* Gradient Background */}
        <div className="life__bg-gradient" data-node-id="22:3350"></div>
        
        {/* Background Image with Mask */}
        <div className="life__bg-image" data-node-id="22:3352">
          <div className="life__bg-image-mask" data-node-id="22:3354">
            <Image
              src={lifeData.backgroundImage}
              alt="Life at Lupin"
              width={2024}
              height={1077}
              quality={100}
              className="life__bg-img"
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="life__container" data-node-id="22:3355">
        {/* Text Content */}
        <div className="life__content" data-node-id="22:3356">
          {/* Heading Section */}
          <div className="life__heading-wrapper" data-node-id="22:3357">
            <div className="life__heading" data-node-id="22:3358">
              <p className="life__heading-large" data-node-id="22:3359">
                {lifeData.heading.large}
              </p>
              <p className="life__heading-small" data-node-id="22:3360">
                {lifeData.heading.small}
              </p>
            </div>
            
            {/* Underline */}
            <div className="life__underline" data-node-id="22:3361"></div>
          </div>

          {/* Description */}
          <p className="life__description" data-node-id="22:3362">
            {lifeData.description}
          </p>
        </div>

        {/* CTA Button */}
        <Link href={lifeData.cta.href} className="life__cta" data-node-id="22:3363">
          <div className="life__cta-inner" data-node-id="22:3364">
            <div className="life__cta-content" data-node-id="22:3365">
              <span className="life__cta-dot" data-node-id="22:3366"></span>
              <span className="life__cta-text" data-node-id="22:3367">
                {lifeData.cta.text}
              </span>
            </div>
            <span className="life__cta-underline" data-node-id="22:3368"></span>
          </div>
        </Link>
      </div>
    </section>
  );
}

