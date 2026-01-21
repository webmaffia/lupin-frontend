'use client';

import Link from 'next/link';
import '../scss/components/GlobalGenericsInhalation.scss';

export default function GlobalGenericsInhalation({ data }) {
  const defaultData = {
    heading: "Our Inhalation Business",
    description: "Research shows that in 2024, the inhalation and nasal spray generic drugs market in North America was valued at around USD 4.8 billion, capturing about 38% of global market share led by the U.S., while Europe accounted for around USD 8.4 billion in revenue in the same year. Lupin's inhalation portfolio spans across metered-dose inhalers (MDIs), dry-powder inhalers (DPIs), and nasal sprays. Lupin is also committed to advancing its green propellant inhalers, which have near-zero global warming potential (GWP) to reduce environmental impact while preserving clinical efficacy and safety. This initiative aligns with evolving regulatory expectations in Europe and Lupin's commitment to sustainable pharmaceutical innovation. This focus strengthens Lupin's position as a responsible leader in complex inhalation generics across regulated markets.",
    link: {
      text: "Click here to know more about how Lupin is advancing its respiratory care.",
      url: "#"
    }
  };

  const inhalationData = data || defaultData;
  const heading = inhalationData?.heading || inhalationData?.title || defaultData.heading;
  const description = inhalationData?.description || inhalationData?.text || inhalationData?.content || defaultData.description;
  const linkText = inhalationData?.link?.text || inhalationData?.linkText || defaultData.link.text;
  const linkUrl = inhalationData?.link?.url || inhalationData?.linkUrl || defaultData.link.url;

  return (
    <section className="global-generics-inhalation" data-node-id="3114:638">
      <div className="global-generics-inhalation__container">
        <h2 className="global-generics-inhalation__heading">
          {heading}
        </h2>
        <p className="global-generics-inhalation__description">
          {description}
        </p>
        {linkText && (
          <Link href={linkUrl} className="global-generics-inhalation__link">
            {linkText}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="global-generics-inhalation__link-arrow">
              <path d="M1 12L12 1M12 1H1M12 1V12" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}

