import Image from "next/image";
import Link from "next/link";
import "../scss/components/Hero.scss";

export default function Hero({ data }) {
  // ✅ SAFE fallback so page never crashes
  const heroData = data || {
    heading: [],
    subheading: [],
    cta: { text: "", href: "#" },
    stickyNotes: [
      { text: "Product Finder", href: "#" },
      { text: "Chat", href: "#" },
    ],
    image: { url: "/assets/gradient-texture.png", alt: "", width: 1914, height: 1860 },
  };

  const heading = Array.isArray(heroData.heading) ? heroData.heading : [];
  const subheading = Array.isArray(heroData.subheading) ? heroData.subheading : [];

  const stickyNotes = Array.isArray(heroData.stickyNotes) ? heroData.stickyNotes : [];
  const sticky0 = stickyNotes?.[0] || { text: "Product Finder", href: "#" };
  const sticky1 = stickyNotes?.[1] || { text: "Chat", href: "#" };

  const image = heroData.image || {};
  const imageUrl = image.url || "/assets/gradient-texture.png";
  const imageAlt = image.alt || "";
  const imageWidth = image.width || 1914;
  const imageHeight = image.height || 1860;

  const ctaHref = heroData?.cta?.href || "#";
  const ctaText = heroData?.cta?.text || "";

  return (
    <section className="hero">
      {/* Background with Gradients */}
      <div className="hero__bg">
        <div className="hero__bg-base"></div>

        <div className="hero__bg-texture">
          <Image
            src="/assets/gradient-texture.png"
            alt=""
            width={1914}
            height={1860}
            quality={100}
          />
        </div>

        <div className="hero__bg-gradient-diagonal"></div>
        <div className="hero__bg-gradient-top"></div>

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
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="hero__image"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__main">
          <div className="hero__text">
            <h1 className="hero__heading">
              {heading.map((line, index) => (
                <span key={index} className="hero__heading-line">
                  {line}
                  {index < heading.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="hero__subheading">
              {subheading.map((line, index) => (
                <span key={index} className="hero__subheading-line">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <Link href={ctaHref} className="hero__cta">
            <span className="hero__cta-text">{ctaText}</span>
          </Link>
        </div>

        {/* Sticky Notes */}
        <div className="hero__sticky-notes">
          <Link href={sticky0.href || "#"} className="hero__note hero__note--product">
            <div className="hero__note-circle hero__note-circle--rotated">
              <Image src="/assets/circle-product-finder.svg" alt="" fill quality={100} />
            </div>
            <span className="hero__note-dot"></span>
            <span className="hero__note-text">{sticky0.text || ""}</span>
          </Link>

          <Link href={sticky1.href || "#"} className="hero__note hero__note--chat">
            <div className="hero__note-circle">
              <Image src="/assets/Chat.svg" alt="" fill quality={100} />
            </div>
            <span className="hero__note-text">{sticky1.text || ""}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
