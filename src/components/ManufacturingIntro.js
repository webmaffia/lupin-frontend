'use client';

import '../scss/components/ManufacturingIntro.scss';

export default function ManufacturingIntro({ data }) {
  // Default data (will be replaced by Strapi)
  const introData = data || {
    text: "Lupin's manufacturing footprint reflects its commitment to quality, scale, and innovation. Our strategically located, state-of-the-art facilities enable reliable production of high-quality medications across key markets. Continue and know more about our manufacturing facilities worldwide:"
  };

  // Handle different Strapi data structures
  let displayText = '';
  
  if (introData) {
    // If text string is provided directly
    if (introData.text) {
      displayText = introData.text;
    }
    // If paragraphs array is provided, join them
    else if (Array.isArray(introData.paragraphs)) {
      displayText = introData.paragraphs.join(' ');
    }
    // If content array is provided
    else if (Array.isArray(introData.content)) {
      displayText = introData.content.join(' ');
    }
  }

  // If no text, use default
  if (!displayText) {
    displayText = introData.text || "Lupin's manufacturing footprint reflects its commitment to quality, scale, and innovation. Our strategically located, state-of-the-art facilities enable reliable production of high-quality medications across key markets. Continue and know more about our manufacturing facilities worldwide:";
  }

  return (
    <section className="manufacturing-intro" data-node-id="3082:2">
      <div className="manufacturing-intro__container">
        <p className="manufacturing-intro__text" data-node-id="3030:6019">
          {displayText}
        </p>
      </div>
    </section>
  );
}

