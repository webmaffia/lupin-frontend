import '../scss/components/AlliedBusinessIntro.scss';

export default function AlliedBusinessIntro({ data }) {
  // Default data from Figma design
  const introData = data || {
    text: "At Lupin, patient centricity is about building meaningful, accessible and holistic healthcare solutions. Through our allied businesses, we are addressing unmet needs across diagnosis, prevention, treatment and rehabilitation. Our specialized arms and focused services reflect our commitment to making healthcare more inclusive, personalized, and impactful. Discover how our allied businesses are transforming care and enhancing lives."
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
    text = "At Lupin, patient centricity is about building meaningful, accessible and holistic healthcare solutions. Through our allied businesses, we are addressing unmet needs across diagnosis, prevention, treatment and rehabilitation. Our specialized arms and focused services reflect our commitment to making healthcare more inclusive, personalized, and impactful. Discover how our allied businesses are transforming care and enhancing lives.";
  }

  return (
    <section className="allied-business-intro" data-node-id="3168:2">
      <div className="allied-business-intro__container">
        <div className="allied-business-intro__box">
          <p className="allied-business-intro__text" data-node-id="3067:535">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

