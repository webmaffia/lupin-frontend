'use client';

import '../scss/components/IndiaWhatWeDo.scss';

export default function IndiaWhatWeDo({ data }) {
  const defaultData = {
    heading: "What We Do",
    content: [
      "Lupin's IRF business delivers a strong portfolio of generics with leading therapies across diabetes, cardiology, gastroenterology and more, improving affordability and everyday access to care.",
      "In the biosimilars segment, Etanercept is Lupin's flagship therapy for chronic immune-mediated inflammatory diseases, including rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis, and plaque psoriasis, addressing significant unmet patient needs. These capabilities are anchored in Lupin Biotech, our dedicated research and state-of-the-art manufacturing platform focused on developing high-quality biosimilars at scale.",
      "Complementing this, Lupin continues to expand its footprint in complex specialty drugs, including inhalation therapies and innovative combinations, strengthening long-term, patient-centric healthcare solutions."
    ]
  };

  const whatWeDoData = data || defaultData;
  const heading = whatWeDoData?.heading || whatWeDoData?.title || defaultData.heading;
  const content = whatWeDoData?.content || whatWeDoData?.paragraphs || whatWeDoData?.text || defaultData.content;

  // Process content to handle bold and underlined text
  const processContent = (text) => {
    if (!text) return '';
    // Bold and underline "biosimilars segment"
    let processed = text.replace(/\b(biosimilars segment)\b/gi, '<strong style="text-decoration: underline; text-decoration-thickness: 8%;">$1</strong>');
    // Bold and underline "complex specialty drugs"
    processed = processed.replace(/\b(complex specialty drugs)\b/gi, '<strong style="text-decoration: underline; text-decoration-thickness: 8%;">$1</strong>');
    return processed;
  };

  return (
    <section className="india-what-we-do" data-node-id="3067:3094">
      <div className="india-what-we-do__container">
        <h2 className="india-what-we-do__heading">
          {heading}
        </h2>
        <div className="india-what-we-do__content">
          {Array.isArray(content) ? (
            content.map((paragraph, index) => (
              paragraph && paragraph.trim() ? (
                <p 
                  key={index} 
                  className="india-what-we-do__paragraph"
                  dangerouslySetInnerHTML={{ __html: processContent(paragraph) }}
                />
              ) : null
            ))
          ) : (
            <p 
              className="india-what-we-do__paragraph"
              dangerouslySetInnerHTML={{ __html: processContent(content) }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

