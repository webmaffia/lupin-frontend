'use client';

import '../scss/components/ScienceArchitecture.scss';

export default function ScienceArchitecture({ data }) {
  const defaultData = {
    content: [
      {
        text: "Our enterprise architecture principles ensure that we remain ",
        bold: "experience-led, data-first, cloud-enabled, AI-powered, and quality-by-design.",
        after: " These principles help us make disciplined technology choices, reduce complexity, and scale innovation responsibly."
      },
      " ",
      "A unified GenAI platform, strong data foundations, and platform-led design allow intelligence to be embedded seamlessly into everyday decisions and operations.",
      " ",
      {
        text: "Ultimately, our digital ambition is about ",
        bold: "people, purpose, and performance.",
        after: " Through proactive communication, team collaboration and by building AI fluency, we create shared momentum and confidence in change."
      },
      " ",
      {
        text: "This is how Lupin continues to strengthen its digital foundation, ",
        bold: "running with purpose, growing with resilience, and innovating without limits.",
        after: ""
      },
      " ",
      "We do this to deliver better outcomes for patients worldwide."
    ]
  };

  const architectureData = data || defaultData;
  const content = architectureData?.content || architectureData?.paragraphs || architectureData?.text || defaultData.content;

  const renderParagraph = (item, index) => {
    if (typeof item === 'string') {
      // Skip empty strings or whitespace-only strings
      if (!item.trim()) {
        return null;
      }
      return <p key={index} className="science-architecture__paragraph">{item}</p>;
    } else if (typeof item === 'object' && item.text) {
      return (
        <p key={index} className="science-architecture__paragraph">
          {item.text}
          <strong>{item.bold}</strong>
          {item.after}
        </p>
      );
    }
    return null;
  };

  return (
    <section className="science-architecture" data-node-id="3102:601">
      <div className="science-architecture__container">
        <div className="science-architecture__content">
          {Array.isArray(content) ? (
            content.map((item, index) => renderParagraph(item, index))
          ) : (
            <p className="science-architecture__paragraph">{content}</p>
          )}
        </div>
      </div>
    </section>
  );
}

