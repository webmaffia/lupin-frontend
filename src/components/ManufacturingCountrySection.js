'use client';

import ManufacturingSiteCard from './ManufacturingSiteCard';
import '../scss/components/ManufacturingCountrySection.scss';

export default function ManufacturingCountrySection({ data }) {
  // Default data structure (will be replaced by Strapi)
  const sectionData = data || {
    heading: "INDIA",
    sites: []
  };

  // Handle different Strapi data structures
  const heading = sectionData?.heading || sectionData?.country || sectionData?.title || "INDIA";
  
  // Extract sites from various possible Strapi field names
  let sites = sectionData?.sites || 
              sectionData?.manufacturingSites || 
              sectionData?.cards || 
              sectionData?.facilities || 
              [];

  // Check if should use full-width layout (single card or multiple full-width cards)
  const useFullWidth = sectionData?.fullWidth || false;
  
  // Check if should show background (default true, can be disabled)
  const showBackground = sectionData?.showBackground !== false;

  // Default site template (Strapi-friendly structure)
  const defaultSiteTemplate = {
    title: "Tarapur",
    description: "Produces fermentation-based and synthetic APIs.",
    address: {
      label: "Address",
      text: "T-142, MIDC, Tarapur, Boisar (West), Thane, Maharashtra – 401 506."
    }
  };

  // If no sites provided, create 12 cards using the template
  // This ensures Strapi can populate any of the 12 slots with actual data
  const displaySites = sites.length > 0 
    ? sites 
    : Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        ...defaultSiteTemplate
      }));

  // Determine grid class based on layout
  const gridClass = useFullWidth 
    ? 'manufacturing-country-section__grid--full-width'
    : displaySites.length === 1 
      ? 'manufacturing-country-section__grid--single'
      : '';

  // Add modifier class for India section
  const isIndia = heading === "INDIA";
  const sectionClasses = [
    'manufacturing-country-section',
    !showBackground ? 'manufacturing-country-section--no-background' : '',
    isIndia ? 'manufacturing-country-section--india' : ''
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className="manufacturing-country-section__container">
        <h2 className="manufacturing-country-section__heading">
          {heading}
        </h2>
        <div className={`manufacturing-country-section__grid ${gridClass}`}>
          {displaySites.map((site, index) => (
            <ManufacturingSiteCard key={site.id || index} data={site} />
          ))}
        </div>
      </div>
    </section>
  );
}
