import Image from 'next/image';
import '@/scss/components/sustainability/OurPeople.scss';

export default function OurPeople() {
  const initiatives = [
    {
      id: 1,
      title: "Diversity and Inclusion",
      status: "9%",
      statusType: "Status",
      goal: "15% women at work in India operations",
      targetYear: "2030",
      percentage: "15%",
      goalPercentage: 15,
      statusPercentage: 9,
      showPieChart: true
    },
    {
      id: 2,
      title: "Employee Volunteering",
      status: "24,000+ hours",
      statusType: "Status",
      goal: "50,000 hours of employee volunteering",
      goalHighlight: "50,000 hours",
      targetYear: "2030",
      showPieChart: false,
      showHours: true
    },
    {
      id: 3,
      title: "Employee Well-Being and Safety",
      status: "80%",
      statusType: "Status",
      goal: "Employee satisfaction score of 80%",
      targetYear: "Every Year",
      percentage: "80%",
      goalPercentage: 80,
      statusPercentage: 80,
      showPieChart: true
    },
    {
      id: 4,
      title: "Supplier Sustainability",
      status: "Ongoing",
      statusType: "Status",
      goal: "100% coverage of critical suppliers",
      targetYear: "Every 3 Years",
      percentage: "100%",
      showPieChart: false,
      showIcon: true
    },
    {
      id: 5,
      title: "Social Impact",
      status: "248,256",
      statusType: "Status",
      goal: "Support 2.5 million beneficiaries with livelihood programs",
      targetYear: "2030",
      statusPercentage: 10,
      showPieChart: true
    }
  ];

  return (
    <section className="our-people">
      {/* Background Image with Picture Tag */}
      <div className="our-people__bg">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/assets/sustainability/bg3-mobile.png" 
          />
          <img
            src="/assets/sustainability/bg3.png"
            alt="Our People background"
            className="our-people__bg-image"
          />
        </picture>
      </div>
      {/* Header */}
      <div className="our-people__header">
        <div className="our-people__header-box">
          <div className="our-people__header-content">
            <p className="our-people__header-subtitle">Transforming Our People Through</p>
            <h2 className="our-people__header-title">Our People</h2>
          </div>
          <div className="our-people__header-icon">
            <Image 
              src="/assets/sustainability/peatals.svg" 
              alt="Petals decoration" 
              width={110}
              height={109}
              className="our-people__header-icon-img"
            />
          </div>
        </div>
      </div>

      {/* Initiatives List */}
      <div className="our-people__initiatives">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="our-people__initiative-card">
            {/* Left Box - Goal Content with Small Graph */}
            <div className="our-people__initiative-left-box">
              <div className="our-people__initiative-left-content">
                <h3 className="our-people__initiative-title">{initiative.title}</h3>
                <div className="our-people__initiative-goal">
                  <p className="our-people__initiative-goal-label">Our Goal</p>
                  <p className="our-people__initiative-goal-text">{initiative.goal}</p>
                  {initiative.goalHighlight && (
                    <p className="our-people__initiative-goal-highlight">{initiative.goalHighlight}</p>
                  )}
                  <p className="our-people__initiative-target">Target Year: {initiative.targetYear}</p>
                </div>
              </div>
              {/* Small pie chart for status - on right side of left box */}
              {initiative.showPieChart && !initiative.showHours && (
                <div className="our-people__initiative-status-info-left">
                  <div 
                    className="our-people__initiative-pie-small"
                    style={{
                      background: initiative.statusPercentage 
                        ? `conic-gradient(#ffffff 0% ${initiative.statusPercentage}%, rgba(255, 255, 255, 0.3) ${initiative.statusPercentage}% 100%)`
                        : 'conic-gradient(#ffffff 0% 10%, rgba(255, 255, 255, 0.3) 10% 100%)'
                    }}
                  ></div>
                  <p className="our-people__initiative-status-text">
                    {initiative.statusType}: {initiative.status}
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="our-people__initiative-divider"></div>

            {/* Right Box - Large Graph/Status */}
            <div className="our-people__initiative-right-box">
              {initiative.showHours && (
                <div className="our-people__initiative-hours">
                  <div className="our-people__initiative-hours-circle">
                    <p className="our-people__initiative-hours-value">{initiative.status}</p>
                    <p className="our-people__initiative-hours-label">hours</p>
                  </div>
                  <p className="our-people__initiative-status-label">{initiative.statusType}</p>
                </div>
              )}
              {initiative.showPieChart && !initiative.showHours && (
                <div className="our-people__initiative-chart">
                  {/* Large pie chart for goal percentage */}
                  <div className="our-people__initiative-pie-wrapper">
                    <div 
                      className="our-people__initiative-pie"
                      style={{
                        background: initiative.goalPercentage 
                          ? `conic-gradient(#ffffff 0% ${initiative.goalPercentage}%, rgba(255, 255, 255, 0.3) ${initiative.goalPercentage}% 100%)`
                          : 'conic-gradient(#ffffff 0% 10%, rgba(255, 255, 255, 0.3) 10% 100%)'
                      }}
                    ></div>
                    {initiative.percentage && (
                      <p className="our-people__initiative-percentage">{initiative.percentage}</p>
                    )}
                  </div>
                </div>
              )}
              {initiative.showIcon && (
                <div className="our-people__initiative-icon-wrapper">
                  <p className="our-people__initiative-percentage-large">{initiative.percentage}</p>
                  <div className="our-people__initiative-icon"></div>
                  <p className="our-people__initiative-status-text">
                    {initiative.statusType}: {initiative.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

