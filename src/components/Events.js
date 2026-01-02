'use client';

import Link from 'next/link';
import '../scss/components/Events.scss';

export default function Events({ data }) {
  // Default data (will be replaced by Strapi)
  const eventsData = data || {
    title: "Events",
    events: [
      {
        id: 1,
        date: "August 5, 2025",
        title: "Q1 FY2026 Board meeting",
        href: "#",
        variant: "dark" // dark green background, white text
      },
      {
        id: 2,
        date: "August 11, 2025",
        title: "43rd Annual General Meeting",
        href: "#",
        variant: "light" // light green background, dark green text
      }
    ]
  };

  return (
    <section className="events">
      <div className="events__container">
        {/* Title */}
        {eventsData.title && (
          <h2 className="events__title">
            {eventsData.title}
          </h2>
        )}

        {/* Events Grid */}
        <div className="events__grid">
          {eventsData.events.map((event) => (
            <Link
              key={event.id}
              href={event.href || "#"}
              className={`events__card events__card--${event.variant || 'dark'}`}
            >
              {/* CTA Button */}
              <div className="events__cta-button">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 17L17 1M17 1H1M17 1V17"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Card Content */}
              <div className="events__card-content">
                <div className="events__card-text">
                  {event.date && (
                    <p className="events__card-date">
                      {event.date}
                    </p>
                  )}
                  {event.title && (
                    <h3 className="events__card-title">
                      {event.title}
                    </h3>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
