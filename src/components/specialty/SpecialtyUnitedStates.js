import Image from 'next/image';
import Link from 'next/link';
import '../../scss/components/specialty/SpecialtyUnitedStates.scss';

export default function SpecialtyUnitedStates({ data }) {
  // Default data from Figma design
  const contentData = data || {
    heading: "United States",
    paragraphs: [
      "With an extensive supply-chain network and deep roots in science, our U.S. specialty business has established a strong presence in the respiratory segment with the addition of asthma and COPD brands, including Xopenex HFA® and Brovana®.",
      "Brovana is our specialty respiratory medication for long-term maintenance treatment of chronic obstructive pulmonary disease (COPD). It contains arformoterol, a long-acting beta-2 agonist that works by relaxing airway muscles to improve airflow and breathing. Administered via nebulization, Brovana is designed to improve pulmonary function in patients.",
      "Xopenex HFA is our specialty prescription respiratory drug that acts as a bronchodilator and delivers levalbuterol via an inhaler. This medication supports acute symptom management while helping in long-term respiratory care.",
      "Going forward, Lupin's U.S. business aims to grow with an intent to care and to act with purpose. We are poised to lead with patient-centricity and a well-balanced portfolio in the specialty segment, targeting high-burden areas with very few players."
    ],
    buttons: [
      {
        text: "Know more about Brovana here",
        href: "#",
        variant: "outline"
      },
      {
        text: "Know more about Xopenex HFA here",
        href: "#",
        variant: "outline"
      },
      {
        text: "Visit our Lupin U.S. website",
        href: "#",
        variant: "filled"
      }
    ]
  };

  return (
    <div className="specialty-united-states" data-node-id="2957:1375">
      {/* Background Petals - Top Right */}
      <div className="specialty-united-states__petals">
        <Image
          src="/assets/images/specialty/petals.svg"
          alt="Decorative petals"
          width={1452}
          height={767}
          className="specialty-united-states__petals-img"
          quality={100}
        />
      </div>

      {/* Top Section - Image and First Content */}
      <div className="specialty-united-states__wrapper">
        {/* Left Side - Circular Image */}
        <div className="specialty-united-states__image-wrapper">
          <div className="specialty-united-states__image-circle">
            <Image
              src="/assets/images/specialty/serious-male-doctor-medical-mask-protective-suit-standing-operating-room-with-chest-x-ray-his-hands 1.png"
              alt="Doctor with chest X-ray"
              fill
              className="specialty-united-states__image"
              quality={100}
              sizes="587px"
            />
          </div>
        </div>

        {/* Right Side - Content (Heading, Paragraphs 1-2, First Button) */}
        <div className="specialty-united-states__content">
          {/* Heading */}
          <h2 className="specialty-united-states__heading" data-node-id="2957:1401">
            {contentData.heading}
          </h2>

          {/* Intro Paragraphs (1st and 2nd) */}
          <div className="specialty-united-states__intro" data-node-id="2957:1400">
            {contentData.paragraphs.slice(0, 2).map((paragraph, index) => (
              <p key={index} className="specialty-united-states__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* First Button */}
          {contentData.buttons[0] && (
            <Link
              href={contentData.buttons[0].href}
              className="specialty-united-states__button specialty-united-states__button--outline"
              data-node-id="2957:1385"
            >
              <span className="specialty-united-states__button-text">
                {contentData.buttons[0].text}
              </span>
              <svg
                className="specialty-united-states__button-arrow"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-node-id="2957:1389"
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

      {/* Full Width Section - Paragraphs 3-4 with Buttons */}
      <div className="specialty-united-states__full-width">
        {/* Third Paragraph with Second Button */}
        {contentData.paragraphs[2] && (
          <div className="specialty-united-states__section" data-node-id="2957:1403">
            <p className="specialty-united-states__paragraph">
              {contentData.paragraphs[2]}
            </p>
            {contentData.buttons[1] && (
              <Link
                href={contentData.buttons[1].href}
                className="specialty-united-states__button specialty-united-states__button--outline"
                data-node-id="2957:1407"
              >
                <span className="specialty-united-states__button-text">
                  {contentData.buttons[1].text}
                </span>
                <svg
                  className="specialty-united-states__button-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-node-id="2957:1411"
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
        )}

        {/* Fourth Paragraph with Third Button */}
        {contentData.paragraphs[3] && (
          <div className="specialty-united-states__section" data-node-id="2957:1405">
            <p className="specialty-united-states__paragraph">
              {contentData.paragraphs[3]}
            </p>
            {contentData.buttons[2] && (
              <Link
                href={contentData.buttons[2].href}
                className="specialty-united-states__button specialty-united-states__button--filled"
                data-node-id="2957:1414"
              >
                <span className="specialty-united-states__button-text">
                  {contentData.buttons[2].text}
                </span>
                <svg
                  className="specialty-united-states__button-arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-node-id="2957:1417"
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
        )}
      </div>
    </div>
  );
}

