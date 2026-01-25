import Image from 'next/image';
import Link from 'next/link';
import '../../scss/components/specialty/SpecialtyCanada.scss';

export default function SpecialtyCanada({ data }) {
  // Default data from Figma design
  const contentData = data || {
    heading: "Canada",
    paragraphs: [
      "Lupin's Canadian subsidiary is expanding its portfolio, and broadening its footprint by specializing in gastroenterology and women's health segments. 60% of this business is driven by our specialty focus, with key products including Zaxine®, Relistor®, and Intrarosa®.",
      "To expand our specialty niche, we recently acquired Nalcrom® from Sanofi and in-licensed three branded products for Attention-Deficit/Hyperactivity Disorder (ADHD)."
    ],
    buttons: [
      {
        text: "Read more on Lupin's Canada subsidiary",
        href: "#",
        variant: "filled"
      }
    ]
  };

  return (
    <div className="specialty-canada" data-node-id="2957:1482">
      {/* Background Petals - Top Right (for odd sections) */}
      <div className="specialty-canada__petals">
        <Image
          src="/assets/images/specialty/petals.svg"
          alt="Decorative petals"
          width={1452}
          height={767}
          className="specialty-canada__petals-img"
          quality={100}
        />
      </div>

      {/* Top Section - Image and Content */}
      <div className="specialty-canada__wrapper">
        {/* Left Side - Circular Image */}
        <div className="specialty-canada__image-wrapper">
          <div className="specialty-canada__image-circle">
            <Image
              src="/assets/specialty/a02cb2b089d64f67c6bdc9f8cdb56099603cea3c.png"
              alt="Female doctors"
              fill
              className="specialty-canada__image"
              quality={100}
              sizes="587px"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="specialty-canada__content">
          {/* Heading */}
          <h2 className="specialty-canada__heading" data-node-id="2957:1501">
            {contentData.heading}
          </h2>

          {/* Intro Paragraphs */}
          <div className="specialty-canada__intro" data-node-id="2957:1500">
            {contentData.paragraphs.map((paragraph, index) => (
              <p key={index} className="specialty-canada__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button */}
          {contentData.buttons[0] && (
            <Link
              href={contentData.buttons[0].href}
              className="specialty-canada__button specialty-canada__button--filled"
              data-node-id="2957:1503"
            >
              <span className="specialty-canada__button-text">
                {contentData.buttons[0].text}
              </span>
              <svg
                className="specialty-canada__button-arrow"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-node-id="2957:1506"
              >
                <path
                  d="M1 14L14 1M14 1H1M14 1V14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}







