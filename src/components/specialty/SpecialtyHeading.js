import '../../scss/components/specialty/SpecialtyHeading.scss';

export default function SpecialtyHeading({ data }) {
  // Default data from Figma design
  const headingData = data || {
    text: "Here is a snapshot of our footprint in the specialty segment"
  };

  // Handle different data structures
  let text = '';
  
  if (headingData) {
    if (headingData.text) {
      text = headingData.text;
    } else if (typeof headingData === 'string') {
      text = headingData;
    }
  }

  // Use default if no text
  if (!text) {
    text = "Here is a snapshot of our footprint in the specialty segment";
  }

  return (
    <section className="specialty-heading" data-node-id="3152:4">
      <div className="specialty-heading__container">
        <p className="specialty-heading__text" data-node-id="2957:1509">
          {text}
        </p>
      </div>
    </section>
  );
}

