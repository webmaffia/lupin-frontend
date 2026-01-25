import Image from 'next/image';
import Link from 'next/link';
import '../../scss/components/specialty/SpecialtyBrazil.scss';

export default function SpecialtyBrazil({ data }) {
  // Default data from Figma design
  const contentData = data || {
    heading: "Brazil",
    paragraphs: [
      "Lupin's Brazil subsidiary, MedQuímica, has entered the specialty segment through our rare-disease therapy, Cuprimine. The medication is used to treat the rare genetic disorder Wilson's disease, which is characterized by excess copper in the body that can cause liver damage and CNS dysfunction.",
      "Our smart research methodologies, along with a resilient supply chain, position us well to drive continued growth and improve access in the rare diseases segment through our specialty treatments."
    ],
    buttons: [
      {
        text: "Know more about Cuprimine",
        href: "#",
        variant: "outline"
      }
    ]
  };

  return (
    <div className="specialty-brazil" data-node-id="2957:1450">
      {/* Background Petals - Top Left (for even sections) */}
      <div className="specialty-brazil__petals">
        <Image
          src="/assets/images/specialty/petalright.svg"
          alt="Decorative petals"
          width={1452}
          height={767}
          className="specialty-brazil__petals-img"
          quality={100}
        />
      </div>

      {/* Top Section - Content and Image (reversed layout) */}
      <div className="specialty-brazil__wrapper">
        {/* Left Side - Content */}
        <div className="specialty-brazil__content">
          {/* Heading */}
          <h2 className="specialty-brazil__heading" data-node-id="2957:1461">
            {contentData.heading}
          </h2>

          {/* First Paragraph */}
          <div className="specialty-brazil__intro" data-node-id="2957:1460">
            <p className="specialty-brazil__paragraph">
              {contentData.paragraphs[0]}
            </p>
          </div>

          {/* Button */}
          {contentData.buttons[0] && (
            <Link
              href={contentData.buttons[0].href}
              className="specialty-brazil__button specialty-brazil__button--outline"
              data-node-id="2957:1465"
            >
              <span className="specialty-brazil__button-text">
                {contentData.buttons[0].text}
              </span>
              <svg
                className="specialty-brazil__button-arrow"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-node-id="2957:1469"
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

          {/* Second Paragraph */}
          <div className="specialty-brazil__section" data-node-id="2957:1463">
            <p className="specialty-brazil__paragraph">
              {contentData.paragraphs[1]}
            </p>
          </div>
        </div>

        {/* Right Side - Circular Image */}
        <div className="specialty-brazil__image-wrapper">
          <div className="specialty-brazil__image-circle">
            <Image
              src="/assets/images/specialty/professional-medical-office-with-diagnostic-tools-computer-screen 1.png"
              alt="Professional medical office with diagnostic tools"
              fill
              className="specialty-brazil__image"
              quality={100}
              sizes="587px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}






