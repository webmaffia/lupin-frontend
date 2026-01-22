import '../../scss/components/specialty/SpecialtyIntro.scss';

export default function SpecialtyIntro({ data }) {
  // Default data from Figma design
  const introData = data || {
    text: "Lupin's specialty business is backed by in-depth research and robust manufacturing capabilities. Driven by a steady supply and smart marketing, we have expanded our commercial standing globally with a diverse portfolio across therapy areas such as respiratory, ophthalmology and CNS."
  };

  // Handle different data structures
  let text = '';
  
  if (introData) {
    if (introData.text) {
      text = introData.text;
    } else if (Array.isArray(introData.paragraphs) && introData.paragraphs.length > 0) {
      text = introData.paragraphs.join(' ');
    } else if (typeof introData === 'string') {
      text = introData;
    }
  }

  // Use default if no text
  if (!text) {
    text = "Lupin's specialty business is backed by in-depth research and robust manufacturing capabilities. Driven by a steady supply and smart marketing, we have expanded our commercial standing globally with a diverse portfolio across therapy areas such as respiratory, ophthalmology and CNS.";
  }

  return (
    <section className="specialty-intro" data-node-id="2957:1373">
      <div className="specialty-intro__container">
        <div className="specialty-intro__box" data-node-id="2957:1373">
          <p className="specialty-intro__text" data-node-id="2957:1374">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

