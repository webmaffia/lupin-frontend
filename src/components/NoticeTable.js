'use client';

import '../scss/components/Policies.scss';

export default function NoticeTable({ data }) {
  // Default data (will be replaced by Strapi)
  const tableData = data || {
    paragraph: "Notice text will be added here based on Figma design",
    table: {
      headers: [
        { text: "Year of Dividend", bgColor: "#08a03f", textColor: "#ffffff", padding: "17px" },
        { text: "Date of Declaration of Dividend", bgColor: "#d9f0e1", textColor: "#08a03f", padding: "58px" },
        { text: "Due Date for transfer to IEPF", bgColor: "#08a03f", textColor: "#ffffff", padding: "17px" }
      ],
      rows: [
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" },
        { "Year of Dividend": "2024-2025", "Date of Declaration of Dividend": "11.08.2025", "Due Date for transfer to IEPF": "16.09.2032" }
      ]
    }
  };

  return (
    <section className="policies">
      {/* Container */}
      <div className="policies__container">
        {/* Content */}
        <div className="policies__content policies__content--no-top-margin">
          {/* Paragraph */}
          {tableData.paragraph && (
            <p className="policies__table-paragraph">
              {tableData.paragraph}
            </p>
          )}

          {/* Table */}
          {tableData.table && (
            <div className="policies__voting-table-wrapper">
              {/* Header Row */}
              <div className="policies__voting-table-header">
                {tableData.table.headers && tableData.table.headers.map((header, index) => (
                  <div 
                    key={index} 
                    className={`policies__voting-table-header-cell ${index === 1 ? 'policies__voting-table-header-cell--large-padding' : ''}`}
                    style={{ 
                      backgroundColor: header.bgColor || '#08a03f',
                      color: header.textColor || '#ffffff'
                    }}
                  >
                    <p>{header.text}</p>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              <div className="policies__voting-table-rows">
                {tableData.table.rows && tableData.table.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="policies__voting-table-row">
                    {tableData.table.headers && tableData.table.headers.map((header, colIndex) => (
                      <p key={colIndex} className="policies__voting-table-cell">
                        {row[header.text] || ''}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

