import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getGlobalPresence, mapTopBannerData, mapGlobalPresenceContentBoxData, mapGlobalPresenceCountrySectionsData } from '@/lib/strapi';
import '@/scss/pages/global-presence.scss';

// Generate metadata for the Global Presence page
export const metadata = generateSEOMetadata({
  title: "Global Presence - Lupin | Worldwide Pharmaceutical Operations",
  description: "Discover Lupin's global presence and operations across multiple continents. Learn about our international markets, manufacturing facilities, and commitment to delivering quality healthcare worldwide.",
  canonicalUrl: "https://www.lupin.com/global-presence",
  keywords: "Lupin global presence, international operations, worldwide pharmaceutical, global markets, Lupin Limited, international healthcare",
});

export default async function GlobalPresencePage() {
  // Fetch data from Strapi
  let bannerData = null;
  let contentBoxData = null;
  let countrySectionsData = null;

  try {
    const strapiData = await getGlobalPresence();
    
    // Map TopBanner data for InnerBanner
    const data = strapiData?.data || strapiData;
    if (data?.TopBanner) {
      bannerData = mapTopBannerData(data.TopBanner);
      
      // Add subheading if available
      if (data.TopBanner.subHeading && !bannerData.subheading) {
        bannerData.subheading = {
          enabled: true,
          text: data.TopBanner.subHeading
        };
      }
    }

    // Map ContentBox data
    contentBoxData = mapGlobalPresenceContentBoxData(strapiData);
    
    // Map Country Sections data
    countrySectionsData = mapGlobalPresenceCountrySectionsData(strapiData);
  } catch (error) {
    console.error('Error fetching global-presence data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Global Presence",
      },
      subheading: {
        enabled: true,
  
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Global Presence - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Default content box data if Strapi data is not available
  const heading = contentBoxData?.heading || "Making affordable healthcare accessible globally";
  const paragraph = contentBoxData?.paragraph || "Lupin has expanded and grown manifold since its inception in 1968. We have operations in 11 countries across six continents, allowing for safe and reliable delivery of medicines to our patients across 100+ countries.";
  const iconUrl = contentBoxData?.icon || "/assets/images/icon-global-presence.svg";

  // Default country sections data if Strapi data is not available
  const countrySections = countrySectionsData || [
    {
      id: 1,
      name: "India",
      description: "Lupin's journey began in India, when Dr. Desh Bandhu Gupta (fondly called DBG) established the company in 1968. From one facility in Aurangabad in 1979, the company now has 11 state-of-the-art manufacturing facilities across the country. Scientists and R&D personnel at the company's two research centres in Pune and Aurangabad leverage cutting-edge technology to provide unique solutions, including those in the field of high quality affordable biosimilars. Along with the commercial enterprise, DBG also founded the Lupin Human Welfare & Research Foundation, which promotes holistic rural development in India.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "India Office",
      websiteUrl: "#",
      ctaText: "Read more",
      order: 1
    },
    {
      id: 2,
      name: "USA",
      description: "Lupin Pharmaceuticals Inc., established in 2003 in Baltimore, Maryland, currently has five offices along the US East Coast with its salesforce across the country. Lupin is present in the US through manufacturing, research and development, and commercial divisions for generics, complex generics, biosimilars and branded pharmaceuticals. In 2015, the company set up the Center of Excellence for Inhalation Research in Coral Springs, Florida. Subsequently, it acquired Novel Laboratories, Inc. to create Lupin Somerset — its first manufacturing facility in the US. In 2017-18, Lupin achieved a milestone when US revenues crossed $1 billion.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "USA Office",
      websiteUrl: "#",
      order: 2
    },
    {
      id: 3,
      name: "UK",
      description: "Lupin Healthcare, our subsidiary in the UK has a portfolio consisting of high quality generics with a focus on anti-retroviral and oral contraceptives. In January 2019, we launched our first set of medicines in the neuromuscular space for the UK market. The entrepreneurial spirit, external focus, and pipeline strength, transitions Lupin in the U.K. from a standard generics business to a more specialist organization that partners with the NHS to deliver value.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "UK Office",
      websiteUrl: "#",
      order: 3
    },
    {
      id: 4,
      name: "South Africa",
      description: "Pharma Dynamics, our subsidiary in South Africa, is committed to expanding access to effective, affordable healthcare and helping create a healthy future for all South Africans. Our quality generic medicines offer patients cost savings of up to 70%. We also invest in various wellness programmes to support patients on their journey to holistic wellness.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "South Africa Office",
      websiteUrl: "#",
      order: 4
    },
    {
      id: 5,
      name: "Australia",
      description: "Generic Health, Lupin's subsidiary in Australia, is among the fastest growing pharmaceutical companies in the country. It is a leading provider of high-quality generic prescription, injectables and over-the-counter medicines, supplying to pharmacies and hospitals across Australia. We are committed to supporting the health and wellbeing of all Australians through our comprehensive product range, competitive pricing, and healthcare expertise.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Australia Office",
      websiteUrl: "#",
      order: 5
    },
    {
      id: 6,
      name: "Philippines",
      description: "Multicare, Lupin's subsidiary in the Philippines, is among the top five branded generic companies in the country. It is committed to providing high-quality products that enhance healthcare for patients and deliver greater value for medical professionals. Multicare strategically focuses on therapeutic areas and specialties, and has established a reputation in women's health, especially in their journey to becoming mothers. Other areas of focus for the company include rheumatology, respiratory, oncology, neuroscience, diabetes, gastroenterology, pediatrics, and nephrology.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Philippines Office",
      websiteUrl: "#",
      order: 6
    },
    {
      id: 7,
      name: "Germany",
      description: "Our subsidiary in Germany, Hormosan, focuses on offering innovative drugs through to generics for affordable treatment of various acute and chronic diseases. We have made constant progress in select therapy areas including rare diseases in neurology, pain management, sexual health and HIV. As a pharmaceutical company, Hormosan is an integral part of German society, contributing optimal, guideline-compliant care for patients through medication.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Germany Office",
      websiteUrl: "#",
      order: 7
    },
    {
      id: 8,
      name: "Netherlands",
      description: "Nanomi, our subsidiary in the Netherlands, is a leader in the field of microsphere and nanoparticle manufacture and development of long-acting release medicines. Its proprietary Microsieve technology guarantees cost-effective, highly controlled and reproducible production of these medicines. Through Nanomi, Lupin's mission is to become a global leader in the field of complex injectables and introduce a wide portfolio of branded and generic products in key markets.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Netherlands Office",
      websiteUrl: "#",
      order: 8
    },
    {
      id: 9,
      name: "Mexico",
      description: "Laboratorios Grin, our subsidiary in Mexico, is currently dedicated to the development, manufacturing and commercialization of ophthalmological products, proteolytic enzymes, oral antibiotics and antivertiginosis, among others. Its focus areas include visual health, food supplements, respiratory diseases, algology, male health and angiology. Products manufactured here are exported to seven countries in the region.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Mexico Office",
      websiteUrl: "#",
      order: 9
    },
    {
      id: 10,
      name: "Brazil",
      description: "Medquímica, Lupin's subsidiary in Brazil, is one of the most prominent pharmaceutical companies in the region, manufacturing drugs that are high in quality, reliability and safety. Here, we manufacture solid and liquid medicines for five focus areas: over-the-counter (OTC), similar drugs, hospital, generics, and dietary supplements. Like every other Lupin manufacturing site, quality is of utmost importance and the Medquimica site has been awarded the certificate of Good Manufacturing Practices (GMP).",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Brazil Office",
      websiteUrl: "#",
      order: 10
    },
    {
      id: 11,
      name: "Canada",
      description: "Lupin Pharma Canada Limited, established in Toronto & Montreal In 2014, is the Canadian subsidiary of Lupin Limited. We are committed to strengthening our branded product portfolio with the launch of additional medicines developed from our own research and manufacturing process, as well as through strategic brand acquisitions and licensing.",
      image: "/assets/global-presence/image-usa.png",
      imageAlt: "Canada Office",
      websiteUrl: "#",
      order: 11
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="global-presence-content">
        <div className="global-presence-content__container">
          <div className="global-presence-content__wrapper">
            <div className="global-presence-content__box" data-node-id="2885:381">
              <div className="global-presence-content__box-border" data-node-id="2885:383"></div>
              <div className="global-presence-content__box-icon" data-node-id="2885:384">
                <img 
                  src={iconUrl} 
                  alt="" 
                  className="global-presence-content__icon-img"
                />
              </div>
              <div className="global-presence-content__text" data-node-id="2885:396">
                {heading && (
                  <h2 className="global-presence-content__heading" data-node-id="2885:397">
                    {heading}
                  </h2>
                )}
                {paragraph && (
                  <p className="global-presence-content__paragraph" data-node-id="2885:398">
                    {paragraph}
                  </p>
                )}
              </div>
            </div>
            
            {/* Country Sections - Dynamic with alternating layout */}
            {countrySections && countrySections.length > 0 && countrySections.map((country, index) => {
              // Even sections (index 1, 3, 5...) get reversed layout
              const isReversed = index % 2 === 1;
              // Odd sections (index 0, 2, 4...) for bottom center, even (index 1, 3, 5...) for bottom right
              const isOdd = index % 2 === 0;
              
              return (
                <div 
                  key={country.id || index} 
                  className={`global-presence-content__country-section ${isReversed ? 'global-presence-content__country-section--reversed' : ''} ${isOdd ? 'global-presence-content__country-section--odd' : 'global-presence-content__country-section--even'}`}
                  data-node-id={`country-${country.id || index}`}
                >
                  {/* Background Petals SVG */}
                  <div className="global-presence-content__country-bg-petals">
                    <img 
                      src="/assets/global-presence/bg-petals.svg" 
                      alt="" 
                      className="global-presence-content__country-bg-petals-img"
                    />
                  </div>
                  
                  <div className="global-presence-content__country-image-wrapper" data-node-id={`country-image-${country.id || index}`}>
                    <div className="global-presence-content__country-image-mask" data-node-id={`country-mask-${country.id || index}`}>
                      <img 
                        src={country.image} 
                        alt={country.imageAlt} 
                        className="global-presence-content__country-image"
                      />
                    </div>
                  </div>
                  <div className="global-presence-content__country-content" data-node-id={`country-content-${country.id || index}`}>
                    <div className="global-presence-content__country-text" data-node-id={`country-text-${country.id || index}`}>
                      {country.name && (
                        <h2 className="global-presence-content__country-heading" data-node-id={`country-heading-${country.id || index}`}>
                          {country.name}
                        </h2>
                      )}
                      {country.description && (
                        <p className="global-presence-content__country-paragraph" data-node-id={`country-paragraph-${country.id || index}`}>
                          {country.description}
                        </p>
                      )}
                    </div>
                    <div className="global-presence-content__country-cta" data-node-id={`country-cta-${country.id || index}`}>
                      <a href={country.websiteUrl} className="global-presence-content__country-button" data-node-id={`country-button-${country.id || index}`}>
                        <span className="global-presence-content__country-button-text" data-node-id={`country-button-text-${country.id || index}`}>
                          {country.ctaText || "Visit Website"}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

