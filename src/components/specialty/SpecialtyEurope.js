import Image from 'next/image';
import Link from 'next/link';
import '../../scss/components/specialty/SpecialtyEurope.scss';

export default function SpecialtyEurope({ data }) {
  // Default data from Figma design
  const contentData = data || {
    heading: "Europe",
    paragraphs: [
      "Lupin continues to expand in specialty medication across Europe. With NaMuscla, Lupin's flagship specialty neurology therapy, we are addressing the unmet needs of patients who have rare and debilitating neuromuscular disorders. Approved by the European Medicines Agency to treat symptomatic myotonia in adults with non-dystrophic myotonic disorders, the product reflects Lupin's innovation prowess in areas with limited treatment options.",
      "We are accelerating access to NaMuscla across key European markets, with the help of Lupin Neurosciences, our European subsidiary, headquartered in Zug, Switzerland.",
      "The business is advancing pediatric development through clinical trials to broaden NaMuscula's therapeutic potential. We are also conducting new studies to assess NaMuscula's broader capabilities in treating myotonic dystrophy, helping patients regain their mobility.",
      "This sustained investment showcases our focus on improving mobility, functional outcomes, and quality of life for patients in the CNS segment.",
      "Lupin is expanding its specialty ophthalmology business with the acquisition of VISUfarma from GHO Capital, a pan-European ophthalmic firm with an established portfolio of 60+ branded eye health products.",
      "This strategic expansion increases our presence in key markets, including Italy, the UK, Spain, Germany, and France. It also widens our offerings in areas such as dry eye, glaucoma, eyelid hygiene, blepharitis, retinal health, and nutraceuticals tailored for ophthalmologists.",
      "The acquisition supports Lupin's long-term specialty growth strategy by tapping into the growing global demand for advanced eye care, driven by the aging population and rising diabetes-related complications."
    ],
    buttons: [
      {
        text: "You can find out more about Lupin Lifesciences and NaMuscula here",
        href: "#",
        variant: "filled"
      }
    ]
  };

  return (
    <div className="specialty-europe" data-node-id="2957:1420">
      {/* Background Petals - Top Left (for even sections) */}
      <div className="specialty-europe__petals">
        <Image
          src="/assets/images/specialty/petalright.svg"
          alt="Decorative petals"
          width={1452}
          height={767}
          className="specialty-europe__petals-img"
          quality={100}
        />
      </div>

      {/* Top Section - Content and Image (reversed layout) */}
      <div className="specialty-europe__wrapper">
        {/* Left Side - Content */}
        <div className="specialty-europe__content">
          {/* Heading */}
          <h2 className="specialty-europe__heading" data-node-id="2957:1430">
            {contentData.heading}
          </h2>

          {/* Intro Paragraphs (1st, 2nd, 3rd, 4th) */}
          <div className="specialty-europe__intro" data-node-id="2957:1429">
            {contentData.paragraphs.slice(0, 4).map((paragraph, index) => (
              <p key={index} className="specialty-europe__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button after 4th paragraph */}
          {contentData.buttons[0] && (
            <Link
              href={contentData.buttons[0].href}
              className="specialty-europe__button specialty-europe__button--filled"
              data-node-id="2957:1443"
            >
              <span className="specialty-europe__button-text">
                {contentData.buttons[0].text}
              </span>
              <svg
                className="specialty-europe__button-arrow"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-node-id="2957:1447"
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

        {/* Right Side - Circular Image */}
        <div className="specialty-europe__image-wrapper">
          <div className="specialty-europe__image-circle">
            <Image
              src="/assets/images/specialty/side-view-nurse-helping-patient 1.png"
              alt="Nurse helping patient"
              fill
              className="specialty-europe__image"
              quality={100}
              sizes="587px"
            />
          </div>
        </div>
      </div>

      {/* Full Width Section - Paragraphs 5-7 */}
      <div className="specialty-europe__full-width">
        {/* Fifth, Sixth, Seventh Paragraphs */}
        <div className="specialty-europe__section" data-node-id="2957:1441">
          {contentData.paragraphs.slice(4, 7).map((paragraph, index) => (
            <p key={index} className="specialty-europe__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

