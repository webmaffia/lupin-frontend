import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/Hero.scss';

export default function Hero({ data }) {
  // Default data (will be replaced by Strapi)
  const heroData = data || {
    heading: {
      line1: "Your health",
      line2: "our promise"
    },
    subheading: [
      "Advancing healthcare with trust, innovation,",
      "and compassion — delivering solutions that",
      "enhance lives globally."
    ],
    cta: {
      text: "know more",
      href: "#"
    },
    stickyNotes: [
      {
        text: "Product Finder",
        href: "#product-finder"
      },
      {
        text: "Chat",
        href: "#chat"
      }
    ]
  };

  return (
    <section className="hero">
      {/* Background with Gradients */}
      <div className="hero__bg">
        {/* Base green background */}
        <div className="hero__bg-base"></div>
        
        {/* Gradient texture with color dodge blend */}
        <div className="hero__bg-texture">
          <Image
            src="/assets/gradient-texture.png"
            alt=""
            width={1914}
            height={1860}
            quality={100}
          />
        </div>
        
        {/* Diagonal gradient overlay */}
        <div className="hero__bg-gradient-diagonal"></div>
        
        {/* Top gradient overlay with multiply blend */}
        <div className="hero__bg-gradient-top"></div>
        
        {/* Petals decoration */}
        <div className="hero__bg-petals">
          <Image
            src="/assets/petals-decoration.svg"
            alt=""
            width={709}
            height={726}
            quality={100}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="hero__image-wrapper">
        <Image
          src="/assets/hero-image.png"
          alt="Healthcare"
          width={944}
          height={894}
          className="hero__image"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="hero__content">
        {/* Heading and CTA */}
        <div className="hero__main">
          <div className="hero__text">
            <h1 className="hero__heading">
              <span className="hero__heading-line">{heroData.heading.line1}</span>
              <span className="hero__heading-line">{heroData.heading.line2}</span>
            </h1>
            <p className="hero__subheading">
              {heroData.subheading.map((line, index) => (
                <span key={index} className="hero__subheading-line">{line}</span>
              ))}
            </p>
          </div>

          {/* CTA Button */}
          <Link href={heroData.cta.href} className="hero__cta">
            <span className="hero__cta-dot"></span>
            <span className="hero__cta-text">{heroData.cta.text}</span>
            <span className="hero__cta-underline"></span>
          </Link>
        </div>

        {/* Sticky Notes */}
        <div className="hero__sticky-notes">
          {/* Product Finder */}
          <Link href={heroData.stickyNotes[0].href} className="hero__note hero__note--product">
            <div className="hero__note-circle hero__note-circle--rotated">
              <Image
                src="/assets/circle-product-finder.svg"
                alt=""
                fill
                quality={100}
              />
            </div>
            <span className="hero__note-dot"></span>
            <span className="hero__note-text">{heroData.stickyNotes[0].text}</span>
          </Link>

          {/* Chat */}
          <Link href={heroData.stickyNotes[1].href} className="hero__note hero__note--chat">
            <div className="hero__note-circle">
              <Image
                src="/assets/chat-bubble-circle.svg"
                alt=""
                fill
                quality={100}
              />
            </div>
            <span className="hero__note-text">{heroData.stickyNotes[1].text}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

