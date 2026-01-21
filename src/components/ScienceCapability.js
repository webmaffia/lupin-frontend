'use client';

import '../scss/components/ScienceCapability.scss';

export default function ScienceCapability({ data }) {
  const defaultData = {
    text: "We are realizing this ambition through a Core-Common-Distinct business capability model, guided by clear enterprise architecture principles."
  };

  const capabilityData = data || defaultData;
  const text = capabilityData?.text || capabilityData?.content || capabilityData?.description || defaultData.text;

  // Process text to handle bold "Core-Common-Distinct"
  const processText = (text) => {
    if (!text) return '';
    return text.replace(/\bCore-Common-Distinct\b/g, '<strong>$&</strong>');
  };

  return (
    <section className="science-capability" data-node-id="3098:522">
      <div className="science-capability__container">
        <p 
          className="science-capability__text"
          dangerouslySetInnerHTML={{ __html: processText(text) }}
        />
      </div>
    </section>
  );
}

