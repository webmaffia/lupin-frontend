'use client';

import NavigationLinks from './NavigationLinks';
import '../scss/components/SharePrice.scss';

export default function SharePrice({ data, error = null }) {
  // Show error state if API failed (but still show iframe if available)
  const sharePriceData = data || {
    iframeUrl: "",
    iframeTitle: "Share Price",
    shareCapital: null,
    listingOfSecurities: null
  };

  return (
    <section className="share-price">
      {/* Container */}
      <div className="share-price__container">
        {/* Navigation Links */}
        <NavigationLinks />
      </div>

      {/* Info Boxes Section - Full Width */}
      {(sharePriceData.shareCapital || sharePriceData.listingOfSecurities) && (
        <div className="share-price__info-boxes-wrapper">
          <div className="share-price__info-boxes">
            {/* Share Capital Box */}
            {sharePriceData.shareCapital && (
              <div className="share-price__info-box">
                <h2 className="share-price__info-title">{sharePriceData.shareCapital.title}</h2>
                <div className="share-price__info-card">
                  <div 
                    className="share-price__info-text"
                    dangerouslySetInnerHTML={{ __html: sharePriceData.shareCapital.content }}
                  />
                </div>
              </div>
            )}

            {/* Listing of Securities Box */}
            {sharePriceData.listingOfSecurities && (
              <div className="share-price__info-box">
                <h2 className="share-price__info-title">{sharePriceData.listingOfSecurities.title}</h2>
                <div className="share-price__info-card">
                  <div 
                    className="share-price__info-text"
                    dangerouslySetInnerHTML={{ __html: sharePriceData.listingOfSecurities.content }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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

