'use client';

import NavigationLinks from './NavigationLinks';
import '../scss/components/ShareholdingPattern.scss';

export default function ShareholdingPattern({ data }) {
  // Default data (will be replaced by Strapi)
  const shareholdingData = data || {
    iframeUrl: "https://content.dionglobal.in/lupinworldnew/ShareHolding.aspx",
    iframeTitle: "Shareholding Pattern"
  };

  return (
    <section className="shareholding-pattern">
      {/* Container */}
      <div className="shareholding-pattern__container">
        {/* Navigation Links */}
        <NavigationLinks />

        {/* Iframe Section */}
        <div className="shareholding-pattern__iframe-wrapper">
          {shareholdingData.iframeUrl ? (
            <iframe
              src={shareholdingData.iframeUrl}
              title={shareholdingData.iframeTitle}
              className="shareholding-pattern__iframe"
              allowFullScreen
            />
          ) : (
            <div className="shareholding-pattern__placeholder">
              <p>Iframe content will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

