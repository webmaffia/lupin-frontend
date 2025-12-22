import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/OurPurpose.scss';

export default function OurPurpose({ data }) {
  // Default data (will be replaced by Strapi)
  const purposeData = data || {
    eyebrow: "Our Purpose",
    heading: "We Catalyze Treatments That Transform Hope Into Healing",
    description: "Ours is a purpose-driven journey of over five decades, where we relentlessly aim to improve lives, build sustainability and deliver long-term value to our stakeholders",
    cards: [
      {
        id: 1,
        title: "Relief from disease",
        description: "Delivering meaningful treatments for today and tomorrow",
        ctaText: "know more",
        ctaHref: "#relief"
      },
      {
        id: 2,
        title: "Innovation to unlock access at scale",
        description: "Making complex, cutting-edge healthcare solutions accessible to all",
        ctaText: "know more",
        ctaHref: "#innovation"
      },
      {
        id: 3,
        title: "Solutions for underserved communities",
        description: "Serving markets and patients overlooked by others",
        ctaText: "know more",
        ctaHref: "#solutions"
      }
    ]
  };

  return (
    <section className="our-purpose">
      {/* Background */}
      <div className="our-purpose__bg"></div>

      {/* Container */}
      <div className="our-purpose__container">
        {/* Headline Section */}
        <div className="our-purpose__headline">
          <p className="our-purpose__eyebrow">{purposeData.eyebrow}</p>
          <div className="our-purpose__text">
            <h2 className="our-purpose__heading">{purposeData.heading}</h2>
            <p className="our-purpose__description">{purposeData.description}</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="our-purpose__cards">
          {/* Card 1 - Relief from disease */}
          <div className="our-purpose__card our-purpose__card--1">
            <Image
              src="/assets/7606e79d191062e8404f7fa4cfa8518ef1408bc9.svg"
              alt=""
              width={679}
              height={477}
              className="our-purpose__card-bg"
              quality={100}
            />
            <div className="our-purpose__card-content">
              <div className="our-purpose__card-text">
                <h3 className="our-purpose__card-title">{purposeData.cards[0].title}</h3>
                <p className="our-purpose__card-description">{purposeData.cards[0].description}</p>
              </div>
              <Link href={purposeData.cards[0].ctaHref} className="our-purpose__card-cta our-purpose__card-cta--button">
                <span className="our-purpose__card-cta-dot"></span>
                <span className="our-purpose__card-cta-text">{purposeData.cards[0].ctaText}</span>
                <span className="our-purpose__card-cta-underline"></span>
              </Link>
            </div>
          </div>

          {/* Card 2 - Innovation */}
          <div className="our-purpose__card our-purpose__card--2">
            <Image
              src="/assets/d7267b305d22096f0afba1663701be81b6c29416.svg"
              alt=""
              width={504}
              height={663}
              className="our-purpose__card-bg"
              quality={100}
            />
            <div className="our-purpose__card-content">
              <div className="our-purpose__card-text">
                <h3 className="our-purpose__card-title">{purposeData.cards[1].title}</h3>
                <p className="our-purpose__card-description">{purposeData.cards[1].description}</p>
              </div>
              <Link href={purposeData.cards[1].ctaHref} className="our-purpose__card-cta our-purpose__card-cta--button">
                <span className="our-purpose__card-cta-dot"></span>
                <span className="our-purpose__card-cta-text">{purposeData.cards[1].ctaText}</span>
                <span className="our-purpose__card-cta-underline"></span>
              </Link>
            </div>
          </div>

          {/* Card 3 - Solutions */}
          <div className="our-purpose__card our-purpose__card--3">
            <Image
              src="/assets/862c605a1dc7bafea0492ef5cf325fa8015d70da.svg"
              alt=""
              width={681}
              height={477}
              className="our-purpose__card-bg"
              quality={100}
            />
            <div className="our-purpose__card-content">
              <div className="our-purpose__card-text">
                <h3 className="our-purpose__card-title">{purposeData.cards[2].title}</h3>
                <p className="our-purpose__card-description">{purposeData.cards[2].description}</p>
              </div>
              <Link href={purposeData.cards[2].ctaHref} className="our-purpose__card-cta our-purpose__card-cta--button">
                <span className="our-purpose__card-cta-dot"></span>
                <span className="our-purpose__card-cta-text">{purposeData.cards[2].ctaText}</span>
                <span className="our-purpose__card-cta-underline"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

