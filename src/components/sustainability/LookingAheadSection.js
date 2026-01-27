import '@/scss/components/sustainability/LookingAheadSection.scss';

export default function LookingAheadSection() {
  return (
    <section className="looking-ahead">
      <div className="looking-ahead__container">
        <div className="looking-ahead__content">
          <h2 className="looking-ahead__title">Looking Ahead</h2>
          <div className="looking-ahead__text">
            <p>Through continuous innovation, improvement, and accountability,</p>
            <p>Lupin demonstrates a deep commitment to creating sustainable value for</p>
            <p>generations to come. This dedication is anchored in protecting nature, empowering and inspiring people and improving patient lives through responsible and ethical healthcare solutions.</p>
          </div>
        </div>
        <div className="looking-ahead__image-wrapper">
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet="/assets/images/sustainability/looking-ahead-mobile.png" 
            />
            <img
              src="/assets/images/sustainability/2a1a02f537582b0e91074720181131714b1c5115.png"
              alt="Looking ahead - Earth and nature"
              className="looking-ahead__image"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

