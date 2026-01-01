'use client';

import NavigationLinks from './NavigationLinks';
import '../scss/components/SharePrice.scss';

export default function SharePrice({ data }) {
  // Default data (will be replaced by Strapi)
  const sharePriceData = data || {
    iframeUrl: "",
    iframeTitle: "Share Price",
    shareCapital: {
      title: "Share Capital",
      date: "As on December 10, 2025",
      content: "Rs. 913,597,612/- comprising 456,798,806 equity shares of Rs. 2/- each"
    },
    listingOfSecurities: {
      title: "Listing of Securities",
      date: "As on December 10, 2025",
      content: "Rs. 913,597,612/- comprising 456,798,806 equity shares of Rs. 2/- each"
    }
  };

  return (
    <section className="share-price">
      {/* Container */}
      <div className="share-price__container">
        {/* Navigation Links */}
        <NavigationLinks />
      </div>

      {/* Info Boxes Section - Full Width */}
      <div className="share-price__info-boxes-wrapper">
        <div className="share-price__info-boxes">
          {/* Share Capital Box */}
          <div className="share-price__info-box">
            <h2 className="share-price__info-title">{sharePriceData.shareCapital?.title || "Share Capital"}</h2>
            <div className="share-price__info-card">
              <p className="share-price__info-text">
                {sharePriceData.shareCapital?.date || "As on December 10, 2025"}
                <br />
                {sharePriceData.shareCapital?.content || "Rs. 913,597,612/- comprising 456,798,806 equity shares of Rs. 2/- each"}
              </p>
            </div>
          </div>

          {/* Listing of Securities Box */}
          <div className="share-price__info-box">
            <h2 className="share-price__info-title">{sharePriceData.listingOfSecurities?.title || "Listing of Securities"}</h2>
            <div className="share-price__info-card">
              <p className="share-price__info-text">
                {sharePriceData.listingOfSecurities?.date || "As on December 10, 2025"}
                <br />
                {sharePriceData.listingOfSecurities?.content || "Rs. 913,597,612/- comprising 456,798,806 equity shares of Rs. 2/- each"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="share-price__container">
        {/* Iframe Section */}
        <div className="share-price__iframe-wrapper">
          {sharePriceData.iframeUrl ? (
            <iframe
              src={sharePriceData.iframeUrl}
              title={sharePriceData.iframeTitle}
              className="share-price__iframe"
              allowFullScreen
            />
          ) : (
            <div className="share-price__placeholder">
              <p>Share price iframe content will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

