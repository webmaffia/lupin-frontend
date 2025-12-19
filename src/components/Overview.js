import Image from 'next/image';
import '../scss/components/Overview.scss';

export default function Overview({ data }) {
  // Default data (will be replaced by Strapi)
  const overviewData = data || {
    eyebrow: "Overview",
    heading: {
      line1: "Global Impact",
      line2: "Human Touch"
    },
    stats: [
      { number: "15", suffix: "+", label: "Global Facilities", isHighlighted: false },
      { number: "24000", suffix: "+", label: "Employees", isHighlighted: true },
      { number: "100", suffix: "+", label: "Countries", isHighlighted: false },
      { number: "1000", suffix: "+", label: "Products", isHighlighted: false }
    ]
  };

  return (
    <section className="overview">
      {/* Background with Gradients */}
      <div className="overview__bg">
        <div className="overview__bg-gradient"></div>
        <div className="overview__bg-overlay"></div>
      </div>

      {/* Container */}
      <div className="overview__container">
        {/* Headline */}
        <div className="overview__headline">
          <p className="overview__eyebrow">{overviewData.eyebrow}</p>
          <h2 className="overview__heading">
            <span className="overview__heading-line">{overviewData.heading.line1}</span>
            <span className="overview__heading-line">{overviewData.heading.line2}</span>
          </h2>
        </div>

        {/* Stats Section */}
        <div className="overview__stats-wrapper">
          {/* Decorative Petals */}
          <div className="overview__petals">
            <Image
              src="/assets/petals-decoration.svg"
              alt=""
              width={465}
              height={477}
              quality={100}
            />
          </div>

          {/* Stats Grid */}
          <div className="overview__stats">
            {/* Column 1 */}
            <div className="overview__stats-col overview__stats-col--1">
              <div className={`overview__stat ${overviewData.stats[0].isHighlighted ? '' : 'overview__stat--dim'}`}>
                <div className="overview__stat-number">
                  <span className="overview__stat-value">{overviewData.stats[0].number}</span>
                  <span className="overview__stat-suffix">{overviewData.stats[0].suffix}</span>
                </div>
                <p className="overview__stat-label">{overviewData.stats[0].label}</p>
              </div>

              <div className={`overview__stat ${overviewData.stats[2].isHighlighted ? '' : 'overview__stat--dim'}`}>
                <div className="overview__stat-number">
                  <span className="overview__stat-value">{overviewData.stats[2].number}</span>
                  <span className="overview__stat-suffix">{overviewData.stats[2].suffix}</span>
                </div>
                <p className="overview__stat-label">{overviewData.stats[2].label}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="overview__stats-col overview__stats-col--2">
              <div className={`overview__stat ${overviewData.stats[1].isHighlighted ? '' : 'overview__stat--dim'}`}>
                <div className="overview__stat-number">
                  <span className="overview__stat-value">{overviewData.stats[1].number}</span>
                  <span className="overview__stat-suffix">{overviewData.stats[1].suffix}</span>
                </div>
                <p className="overview__stat-label">{overviewData.stats[1].label}</p>
              </div>

              <div className={`overview__stat ${overviewData.stats[3].isHighlighted ? '' : 'overview__stat--dim'}`}>
                <div className="overview__stat-number">
                  <span className="overview__stat-value">{overviewData.stats[3].number}</span>
                  <span className="overview__stat-suffix">{overviewData.stats[3].suffix}</span>
                </div>
                <p className="overview__stat-label">{overviewData.stats[3].label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

