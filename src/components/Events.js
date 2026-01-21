'use client';

import Link from 'next/link';
import '../scss/components/Events.scss';

export default function Events({ data, error = null }) {
  // Show error state if API failed
  if (error) {
    return (
      <section className="events">
        <div className="events__container">
          <div className="events__placeholder">
            <p>Unable to load events at this time. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no data
  if (!data || !data.events || data.events.length === 0) {
    return (
      <section className="events">
        <div className="events__container">
          <div className="events__placeholder">
            <p>No events available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  const eventsData = {
    title: data.title || "Events",
    events: data.events
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
