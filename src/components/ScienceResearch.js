'use client';

import Image from 'next/image';
import '../scss/components/ScienceResearch.scss';

export default function ScienceResearch({ data }) {
  const defaultData = {
    heading: "Research and Development",
    content: [
      "Innovation at Lupin is driven by a single motivation; to deliver advanced, accessible and safe healthcare solutions to reduce the burden of diseases worldwide.",
      "Our globally spread R&D centers and team of scientists bring deep domain knowledge across complex generics, specialty formulations, Active Pharmaceutical Ingredients and novel therapies.",
      "With 41 product filings and 52 approvals in FY25, Lupin is gaining momentum in complex generics and Active Pharmaceutical Ingredients. Our Intellectual Property Management Group plays a vital role in safeguarding innovations across Active Pharmaceutical Ingredients, biologics, and novel chemical entities.",
      "In FY25, we secured 87 patents out of which 6 were for formulations and 81 for new chemical entities.",
      "Our New Chemical Entity (NCE) team, with a strategic focus on oncology, immunology, and metabolic disorders, is advancing novel therapeutics from early-stage research through clinical development. These efforts underscore our commitment to delivering breakthrough medicines that transform lives."
    ],
    image: {
      url: "/assets/images/our-sci/biotechnology-scientist-researching-laboratory-using-microscope-typing-pc-chemist-examining-virus-evolution-using-high-tech-scientific-research-vaccine-development-against-covid19-1 1.png",
      alt: "Scientist researching in laboratory"
    }
  };

  const researchData = data || defaultData;
  const heading = researchData?.heading || researchData?.title || defaultData.heading;
  const content = researchData?.content || researchData?.paragraphs || researchData?.text || defaultData.content;
  const imageUrl = researchData?.image?.url || researchData?.image || defaultData.image.url;
  const imageAlt = researchData?.image?.alt || researchData?.imageAlt || defaultData.image.alt;

  // Process content to handle bold numbers
  const processContent = (text) => {
    if (!text) return '';
    
    // Replace bold numbers (41, 52, 87, 6, 81)
    return text.replace(/\b(41|52|87|6|81)\b/g, '<strong>$1</strong>');
  };

  return (
    <section className="science-research" data-node-id="2952:3478">
      <div className="science-research__content">
        <div className="science-research__left">
          <div className="science-research__image-wrapper">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="science-research__image"
              quality={100}
            />
          </div>
        </div>
        <div className="science-research__right">
          <div className="science-research__background">
            <Image
              src="/assets/images/our-sci/BG.svg"
              alt=""
              fill
              className="science-research__background-image"
              quality={100}
            />
          </div>
          <div className="science-research__right-content">
            <h2 className="science-research__heading">
              {heading}
            </h2>
            <div className="science-research__text">
              {Array.isArray(content) ? (
                content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="science-research__paragraph"
                    dangerouslySetInnerHTML={{ __html: processContent(paragraph) }}
                  />
                ))
              ) : (
                <p 
                  className="science-research__paragraph"
                  dangerouslySetInnerHTML={{ __html: processContent(content) }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

