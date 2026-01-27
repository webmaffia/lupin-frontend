import Image from 'next/image';
import '@/scss/components/sustainability/OurPatients.scss';

export default function OurPatients() {
  const initiatives = [
    {
      id: 1,
      title: "Product Launches",
      goal: "23 launches-Complex generics in regulated markets",
      targetYear: "2028",
      status: "12",
      statusDetails: "( including 1 filing of Ranibizumab complete + 4 more filings )",
      showChart: true
    },
    {
      id: 2,
      title: "Patient Assistance Programs",
      goal: "Benefitting 300,000 patients",
      targetYear: "2030",
      status: "100,000+",
      statusPercentage: 33,
      showPieChart: true
    },
    {
      id: 3,
      title: "Education and Awareness Initiatives",
      goal: "3 million patients",
      goalSecondary: "50,000 Healthcare professionals",
      targetYear: "2030",
      status: "140,000+",
      statusLabel: "Patients",
      statusSecondary: "38,000+",
      statusSecondaryLabel: "Healthcare professionals",
      showIcons: true,
      iconType: "education"
    },
    {
      id: 4,
      title: "Early Diagnosis and Rehabilitation",
      goal: "Diagnose 2 million+ patients for lung disease, 5,000 women for breast cancer",
      targetYear: "2030",
      status: "990,000+",
      statusLabel: "lung disease",
      statusSecondary: "2,400+",
      statusSecondaryLabel: "women",
      showIcons: true,
      iconType: "diagnosis"
    }
  ];

  return (
    <section className="our-patients">
      {/* Background Image with Picture Tag */}
      <div className="our-patients__bg">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/assets/sustainability/bg4.png" 
          />
          <img
            src="/assets/sustainability/bg4.png"
            alt="Our Patients background"
            className="our-patients__bg-image"
          />
        </picture>
      </div>
      {/* Header */}
      <div className="our-patients__header">
        <div className="our-patients__header-box">
          <div className="our-patients__header-content">
            <p className="our-patients__header-subtitle">Healing patients through</p>
            <h2 className="our-patients__header-title">Our Patients</h2>
          </div>
          <div className="our-patients__header-icon">
            <Image 
              src="/assets/sustainability/peatals.svg" 
              alt="Petals decoration" 
              width={110}
              height={109}
              className="our-patients__header-icon-img"
            />
          </div>
        </div>
      </div>

      {/* Initiatives List */}
      <div className="our-patients__initiatives">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="our-patients__initiative-card">
            {/* Left Box - Goal Content */}
            <div className="our-patients__initiative-left-box">
              <div className="our-patients__initiative-left-content">
                <h3 className="our-patients__initiative-title">{initiative.title}</h3>
                <div className="our-patients__initiative-goal">
                  <p className="our-patients__initiative-goal-label">Our Goal</p>
                  <p className="our-patients__initiative-goal-text">{initiative.goal}</p>
                  {initiative.goalSecondary && (
                    <p className="our-patients__initiative-goal-text">{initiative.goalSecondary}</p>
                  )}
                  <p className="our-patients__initiative-target">Target Year: {initiative.targetYear}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="our-patients__initiative-divider"></div>

            {/* Right Box - Status/Graph */}
            <div className="our-patients__initiative-right-box">
              {initiative.showChart && (
                <div className="our-patients__initiative-chart-wrapper">
                  <p className="our-patients__initiative-status-label">Status</p>
                  <div className="our-patients__initiative-chart-content">
                    <p className="our-patients__initiative-status-value">{initiative.status}</p>
                    <div className="our-patients__initiative-chart-icon">
                      <Image 
                        src="/assets/images/sustainability/00c413fdbe5adad85cefb57317b947646b074692.svg" 
                        alt="Chart icon" 
                        width={50}
                        height={50}
                        className="our-patients__chart-icon-img"
                      />
                    </div>
                  </div>
                  {initiative.statusDetails && (
                    <p className="our-patients__initiative-status-details">{initiative.statusDetails}</p>
                  )}
                </div>
              )}
              {initiative.showPieChart && (
                <div className="our-patients__initiative-pie-wrapper">
                  <p className="our-patients__initiative-status-label">Status</p>
                  <div className="our-patients__initiative-pie-content">
                    <p className="our-patients__initiative-status-value">{initiative.status}</p>
                    <div 
                      className="our-patients__initiative-pie"
                      style={{
                        background: initiative.statusPercentage 
                          ? `conic-gradient(#ffffff 0% ${initiative.statusPercentage}%, rgba(255, 255, 255, 0.3) ${initiative.statusPercentage}% 100%)`
                          : 'conic-gradient(#ffffff 0% 33%, rgba(255, 255, 255, 0.3) 33% 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {initiative.showIcons && (
                <div className="our-patients__initiative-icons-wrapper">
                  <p className="our-patients__initiative-status-label">Status</p>
                  <div className="our-patients__initiative-icons-content">
                    <div className="our-patients__initiative-icon-item">
                      <p className="our-patients__initiative-status-value">{initiative.status}</p>
                      {initiative.statusLabel && (
                        <p className="our-patients__initiative-status-label-text">{initiative.statusLabel}</p>
                      )}
                      <div className={`our-patients__initiative-icon our-patients__initiative-icon--${initiative.iconType}-1`}>
                        {initiative.iconType === 'education' ? (
                          <Image 
                            src="/assets/images/sustainability/06e9166f00eed5722f6ec1d84721ba6957405e7f.svg" 
                            alt="Heart icon" 
                            width={50}
                            height={50}
                            className="our-patients__icon-img"
                          />
                        ) : (
                          <Image 
                            src="/assets/images/sustainability/25ee3987c84065596a15935b2704338e2e1930a6.svg" 
                            alt="Lungs icon" 
                            width={50}
                            height={50}
                            className="our-patients__icon-img"
                          />
                        )}
                      </div>
                    </div>
                    {initiative.statusSecondary && (
                      <div className="our-patients__initiative-icon-item">
                        <p className="our-patients__initiative-status-value">{initiative.statusSecondary}</p>
                        {initiative.statusSecondaryLabel && (
                          <p className="our-patients__initiative-status-label-text">{initiative.statusSecondaryLabel}</p>
                        )}
                        <div className={`our-patients__initiative-icon our-patients__initiative-icon--${initiative.iconType}-2`}>
                          {initiative.iconType === 'education' ? (
                            <Image 
                              src="/assets/images/sustainability/2f2695bf4f28759b31dee032d23658e5aede0d92.svg" 
                              alt="Hand icon" 
                              width={50}
                              height={50}
                              className="our-patients__icon-img"
                            />
                          ) : (
                            <Image 
                              src="/assets/images/sustainability/54406aaa872062088faf2c4896b80005cf420140.svg" 
                              alt="Female symbol icon" 
                              width={50}
                              height={50}
                              className="our-patients__icon-img"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

