'use client';

import Link from 'next/link';
import '../scss/components/Subsidiaries.scss';

export default function Subsidiaries({ data }) {
  // Default data (will be replaced by Strapi)
  const subsidiariesData = data || {
    subsidiaries: [
      {
        id: 1,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 2,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 3,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 4,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 5,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 6,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 7,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 8,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      },
      {
        id: 9,
        name: "Lupin Pharmaceuticals, Inc., USA.",
        years: [
          { year: "2017", url: "#", isActive: false },
          { year: "2018", url: "#", isActive: false },
          { year: "2019", url: "#", isActive: false },
          { year: "2020", url: "#", isActive: false },
          { year: "2021", url: "#", isActive: false },
          { year: "2022", url: "#", isActive: false },
          { year: "2023", url: "#", isActive: false },
          { year: "2024", url: "#", isActive: false },
          { year: "2025", url: "#", isActive: false }
        ]
      }
    ]
  };

  // Split years into two rows: first row (5 years) and second row (4 years)
  const getYearRows = (years) => {
    return {
      firstRow: years.slice(0, 5),
      secondRow: years.slice(5)
    };
  };

  return (
    <section className="subsidiaries">
      <div className="subsidiaries__container">
        <div className="subsidiaries__grid">
          {subsidiariesData.subsidiaries.map((subsidiary) => {
            const { firstRow, secondRow } = getYearRows(subsidiary.years);
            
            return (
              <div key={subsidiary.id} className="subsidiary-card">
                <div className="subsidiary-card__content">
                  <h3 className="subsidiary-card__title">{subsidiary.name}</h3>
                  
                  <div className="subsidiary-card__years">
                    {/* First Row - 5 years */}
                    <div className="subsidiary-card__years-row">
                      {firstRow.map((yearItem, index) => (
                        <Link
                          key={index}
                          href={yearItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`subsidiary-card__year ${yearItem.isActive ? 'subsidiary-card__year--active' : ''}`}
                        >
                          {yearItem.year}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Second Row - 4 years */}
                    <div className="subsidiary-card__years-row">
                      {secondRow.map((yearItem, index) => (
                        <Link
                          key={index}
                          href={yearItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`subsidiary-card__year ${yearItem.isActive ? 'subsidiary-card__year--active' : ''}`}
                        >
                          {yearItem.year}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

