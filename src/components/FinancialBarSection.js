'use client';

import FinancialBarChart from './FinancialBarChart';
import '../scss/components/FinancialBarSection.scss';

/**
 * FinancialBarSection - Section component for financial bar charts
 */
export default function FinancialBarSection({ data }) {
  // Default data structure
  const sectionData = data || {
    title: "Revenue And Profitability",
    charts: [
      {
        title: "Net Sales (₹ Millions)",
        data: [
          { label: "FY25 – 221,921", value: 221921 },
          { label: "FY24 – 196,563", value: 196563 },
          { label: "FY23 – 162,700", value: 162700 },
          { label: "FY22 – 161,928", value: 161928 },
          { label: "FY21 – 149,270", value: 149270 }
        ]
      },
      {
        title: "Profit Before Tax (₹ Millions)",
        data: [
          { label: "FY25 – 40,150", value: 40150 },
          { label: "FY24 – 24,223", value: 24223 },
          { label: "FY23 – 7,165", value: 7165 },
          { label: "FY22 – 12,135", value: 12135 },
          { label: "FY21 – 16,751", value: 16751 }
        ]
      },
      {
        title: "Net Profit (₹ Millions)",
        data: [
          { label: "FY25 – 32,816", value: 32816 },
          { label: "FY24 – 19,145", value: 19145 },
          { label: "FY23 – 4,301", value: 4301 },
          { label: "FY22 – 15,280", value: 15280 },
          { label: "FY21 – 12,165", value: 12165 }
        ]
      },
      {
        title: "EBITDA (₹ Millions)",
        data: [
          { label: "FY25 – 54,792", value: 54792 },
          { label: "FY24 – 39,307", value: 39307 },
          { label: "FY23 – 18,715", value: 18715 },
          { label: "FY22 – 23,073", value: 23073 },
          { label: "FY21 – 27,032", value: 27032 }
        ]
      }
    ]
  };

  return (
    <section className="financial-bar-section">
      <div className="financial-bar-section__container">
        <h2 className="financial-bar-section__title">{sectionData.title}</h2>
        
        {/* Charts Grid */}
        <div className="financial-bar-section__charts">
          {sectionData.charts && sectionData.charts.map((chart, index) => (
            <FinancialBarChart
              key={index}
              title={chart.title}
              data={chart.data}
            />
          ))}
        </div>

    
      </div>
    </section>
  );
}

