import Link from 'next/link';
import Image from 'next/image';
import '../scss/components/CSR.scss';

export default function CSR({ data }) {
  // Default data (will be replaced by Strapi)
  const csrData = data || {
    eyebrow: "CSR",
    heading: {
      line1: "Beyond",
      line2: "Medicines"
    },
    subheading: "The Lupin Foundation works in over 4,500 villages to ensure sustainable development.",
    description: "At the core of Lupin's CSR work is a passion to build sustainable models for enhancement of human development indices, which can be widely replicated through collaborations and partnerships.",
    cta: {
      text: "know more",
      href: "#csr"
    },
    image: "/assets/3f5064924f1431ea7a34af03258f97fc97981619.png"
  };

  return (
    <section className="csr" data-node-id="22:3315">
      {/* Background */}
      <div className="csr__bg" data-node-id="22:3316">
        
      </div>

      {/* Content Container */}
      <div className="csr__container">
        {/* Circular Image */}
        <div className="csr__image-wrapper" data-node-id="22:3332">
          <div className="csr__image-circle" data-node-id="22:3333">
            <Image
              src={csrData.image}
              alt="CSR Activities"
              width={770}
              height={770}
              className="csr__image"
              quality={100}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="csr__content" data-node-id="22:3334">
          <div className="csr__text" data-node-id="22:3335">
            <div className="csr__header" data-node-id="22:3336">
              <div className="csr__title-group" data-node-id="22:3337">
                <p className="csr__eyebrow" data-node-id="22:3338">
                  {csrData.eyebrow}
                </p>
                <div className="csr__heading" data-node-id="22:3339">
                  <p>{csrData.heading.line1}</p>
                  <p>{csrData.heading.line2}</p>
                </div>
              </div>
              <p className="csr__subheading" data-node-id="22:3340">
                {csrData.subheading}
              </p>
            </div>
            <p className="csr__description" data-node-id="22:3341">
              {csrData.description}
            </p>
          </div>

          {/* CTA Button */}
          <Link href={csrData.cta.href} className="our-story__cta" data-node-id="22:3342">
            <div className="csr__cta-inner">
              <span className="csr__cta-dot" data-node-id="22:3345"></span>
              <span className="csr__cta-text" data-node-id="22:3344">
                {csrData.cta.text}
              </span>
            </div>
            <span className="csr__cta-underline" data-node-id="22:3346"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

