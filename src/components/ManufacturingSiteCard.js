'use client';

import '../scss/components/ManufacturingSiteCard.scss';

export default function ManufacturingSiteCard({ data }) {
  // Default data structure (will be replaced by Strapi)
  const cardData = data || {
    title: "Tarapur",
    description: "Produces fermentation-based and synthetic APIs.",
    address: {
      label: "Address",
      text: "T-142, MIDC, Tarapur, Boisar (West), Thane, Maharashtra – 401 506."
    }
  };

  // Handle different Strapi data structures
  const title = cardData?.title || cardData?.name || cardData?.siteName || "";
  const description = cardData?.description || cardData?.text || cardData?.info || "";
  const addressLabel = cardData?.address?.label || cardData?.addressLabel || "Address";
  const addressText = cardData?.address?.text || cardData?.address || cardData?.addressText || "";

  return (
    <div className="manufacturing-site-card" data-node-id="3030:5834">
      <div className="manufacturing-site-card__background" data-node-id="3030:5835"></div>
      <div className="manufacturing-site-card__content">
        <h3 className="manufacturing-site-card__title" data-node-id="3030:5840">
          {title}
        </h3>
        <p className="manufacturing-site-card__description" data-node-id="3030:5837">
          {description}
        </p>
        <div className="manufacturing-site-card__address">
          <p className="manufacturing-site-card__address-label" data-node-id="3030:5839">
            {addressLabel}
          </p>
          <div className="manufacturing-site-card__address-text" data-node-id="3030:5838">
            {addressText.split('\n').map((line, index) => (
              <p key={index} className="manufacturing-site-card__address-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

