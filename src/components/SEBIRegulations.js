'use client';

import Link from 'next/link';
import '../scss/components/SEBIRegulations.scss';

export default function SEBIRegulations({ data }) {
  // Default data (will be replaced by Strapi)
  const regulationsData = data || {
    title: "Disclosure under Regulation 46 of SEBI Regulations, 2016",
    subtitle: "Disclosure under Regulation 46 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2016",
    items: [
      {
        id: 1,
        number: "1",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 2,
        number: "2",
        particulars: "Memorandum of Association and Articles of Association",
        url: "#"
      },
      {
        id: 3,
        number: "3",
        particulars: "Brief profile of board of directors including directorship and full-time positions in body corporates",
        url: "#"
      },
      {
        id: 4,
        number: "4",
        particulars: "Terms and conditions of appointment of independent directors",
        url: "#"
      },
      {
        id: 5,
        number: "5",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 6,
        number: "6",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 7,
        number: "7",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 8,
        number: "8",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 9,
        number: "9",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 10,
        number: "10",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 11,
        number: "11",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 12,
        number: "12",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 13,
        number: "13",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 14,
        number: "14",
        particulars: "Details of its business",
        url: "#"
      },
      {
        id: 15,
        number: "15",
        particulars: "Shareholding pattern",
        url: "#"
      },
      {
        id: 16,
        number: "16",
        particulars: "Details of agreements entered into with the media companies and/or their associates",
        url: "#"
      },
      {
        id: 17,
        number: "17",
        particulars: "Schedule of analysts or institutional investors meet",
        url: "#"
      },
      {
        id: 18,
        number: "18",
        particulars: "New name and the old name of the listed entity for a continuous period of one year",
        url: "#"
      }
    ]
  };

  return (
    <section className="sebi-regulations">
      <div className="sebi-regulations__container">
        {/* Header */}
        <div className="sebi-regulations__header">
          <h1 className="sebi-regulations__title">{regulationsData.title}</h1>
          <h2 className="sebi-regulations__subtitle">{regulationsData.subtitle}</h2>
        </div>

        {/* Table */}
        <div className="sebi-regulations__table-wrapper">
          {/* Table Header */}
          <div className="sebi-regulations__table-header">
            <div className="sebi-regulations__header-number">No.</div>
            <div className="sebi-regulations__header-particulars">Particulars</div>
            <div className="sebi-regulations__header-url">URL</div>
          </div>

          {/* Table Body */}
          <div className="sebi-regulations__table-body">
            {regulationsData.items.map((item) => (
              <div key={item.id} className="sebi-regulations__row">
                <div className="sebi-regulations__cell sebi-regulations__cell--number">
                  {item.number}
                </div>
                <div className="sebi-regulations__cell sebi-regulations__cell--particulars">
                  {item.particulars}
                </div>
                <div className="sebi-regulations__cell sebi-regulations__cell--url">
                  <Link href={item.url} className="sebi-regulations__link">
                    <span>Click here to visit</span>
                    <svg
                      className="sebi-regulations__arrow"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L11 1M11 1H1M11 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


