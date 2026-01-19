import InnerBanner from '@/components/InnerBanner';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getGlobalTechnicalOperations, mapTopBannerData } from '@/lib/strapi';
import GTOTabs from './components/GTOTabs';
import '@/scss/pages/global-technical-operations.scss';

// Generate metadata for the Global Technical Operations page
export const metadata = generateSEOMetadata({
  title: "Global Technical Operations - Lupin | Advanced Manufacturing & Technical Excellence",
  description: "Discover Lupin's global technical operations and manufacturing capabilities. Learn about our state-of-the-art facilities, quality systems, and commitment to technical excellence in pharmaceutical manufacturing.",
  canonicalUrl: "https://www.lupin.com/global-technical-operations",
  keywords: "Lupin technical operations, manufacturing facilities, pharmaceutical manufacturing, quality systems, technical excellence, Lupin Limited, global operations",
});

export default async function GlobalTechnicalOperationsPage() {
  // Fetch data from Strapi
  let bannerData = null;

  try {
    const strapiData = await getGlobalTechnicalOperations();
    
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
  } catch (error) {
    console.error('Error fetching global-technical-operations data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Global Technical",
        line2: "Operations"
      },
      subheading: {
        enabled: true,

      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Global Technical Operations - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="global-technical-operations-content">
        <div className="global-technical-operations-content__container">
          <div className="global-technical-operations-content__wrapper">
            <div className="global-technical-operations-content__section" data-node-id="2852:541">
              {/* Background Petals SVG */}
              <div className="global-technical-operations-content__bg-petals" data-node-id="2852:542">
                <img 
                  src="/assets/global-technical/peatals.svg" 
                  alt="" 
                  className="global-technical-operations-content__bg-petals-img"
                />
              </div>
              
              {/* Text Content */}
              <div className="global-technical-operations-content__text" data-node-id="2852:548">
                <div className="global-technical-operations-content__text-main" data-node-id="2852:549">
                  <h1 className="global-technical-operations-content__heading" data-node-id="2852:550">
                    <p className="global-technical-operations-content__heading-line">Integrating Excellence Across Manufacturing,</p>
                    <p className="global-technical-operations-content__heading-line">Procurement and Supply Chain</p>
                  </h1>
                  <div className="global-technical-operations-content__paragraph-main" data-node-id="2852:551">
                    <p className="global-technical-operations-content__paragraph">
                      Manufacturing excellence, supported by a resilient supply chain and a globally aligned procurement approach, is critical to Lupin's ability to deliver quality healthcare efficiently and at scale. With our vast global footprint evolving rapidly, we preempted a need for closer integration across operational functions to ensure regulatory compliance, speed to market, dependable deliveries, cost optimization, and continuous innovation.
                    </p>
                    <p className="global-technical-operations-content__paragraph">
                      &nbsp;
                    </p>
                    <p className="global-technical-operations-content__paragraph">
                      Global Technical Operations (GTO) was established as an integrated way of working across Manufacturing, Procurement, and Supply Chain, bringing core functions together to enable collaboration, shared accountability, and a strong sense of alignment globally. Through this unit, we at Lupin work as an integrated entity, creating long-term value for our stakeholders.
                    </p>
                  </div>
                </div>
                <div className="global-technical-operations-content__paragraph-secondary" data-node-id="2852:552">
                  <p className="global-technical-operations-content__paragraph">
                    We are aligned around a clear sense of purpose and collective responsibility
                  </p>
                  <p className="global-technical-operations-content__paragraph">
                    through our Statement of Direction:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section - Full Width */}
      <section className="global-technical-operations-quote" data-node-id="2852:536">
        <div className="global-technical-operations-quote__wrapper" data-node-id="2852:537">
          {/* Top Quote SVG (flipped vertically) */}
          <div className="global-technical-operations-quote__top" data-node-id="2852:538">
            <img 
              src="/assets/community/top-quote.svg" 
              alt="" 
              className="global-technical-operations-quote__top-img"
            />
          </div>
          
          {/* Quote Text */}
          <p className="global-technical-operations-quote__text" data-node-id="2852:539">
            We are ready to solve challenges, make an impact, and learn, adapt, and transform on our journey together.
          </p>
          
          {/* Bottom Quote SVG */}
          <div className="global-technical-operations-quote__bottom" data-node-id="2852:540">
            <img 
              src="/assets/community/bottom-quote.svg" 
              alt="" 
              className="global-technical-operations-quote__bottom-img"
            />
          </div>
        </div>
      </section>
      
      {/* Certification Section */}
      <section className="global-technical-operations-certification" data-node-id="2980:29">
        <div className="global-technical-operations-certification__container">
          <p className="global-technical-operations-certification__text" data-node-id="2852:535">
            We are proud to say that we have successfully completely rigorous audits and have been certified by DNV for ISO 14001, Environment Management Systems (EMS) and ISO 45001, Occupational Health and Safety Management System (OHSMS). This milestone reflects Lupin's collective commitment to ensuring sustainability and responsible operational excellence across all our sites.
          </p>
        </div>
      </section>
      
      {/* Strategic Performance Areas Section */}
      <section className="global-technical-operations-spa" data-node-id="2852:455">
        <div className="global-technical-operations-spa__bg" data-node-id="2852:456"></div>
        <div className="global-technical-operations-spa__container" data-node-id="2852:457">
          {/* Heading and Subheading */}
          <div className="global-technical-operations-spa__header" data-node-id="2852:458">
            <h2 className="global-technical-operations-spa__heading" data-node-id="2852:459">
              Strategic Performance Areas
            </h2>
            <p className="global-technical-operations-spa__subheading" data-node-id="2852:460">
              SPAs form the core of GTO's multi-year transformation journey and guide us.
            </p>
          </div>
          
          {/* Content: Text and Image */}
          <div className="global-technical-operations-spa__content" data-node-id="2852:461">
            {/* Text List */}
            <div className="global-technical-operations-spa__list" data-node-id="2852:462">
              {/* Item 1: Quality and Regulatory Compliance */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:463">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:464">
                  <div className="global-technical-operations-spa__item-icon-bg" data-node-id="2852:465">
                    <div className="global-technical-operations-spa__item-icon-inner" data-node-id="2852:466">
                      <img 
                        src="/assets/global-technical/Icon1.svg" 
                        alt="Quality and Regulatory Compliance" 
                        className="global-technical-operations-spa__item-icon-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:469">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:470">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:471">
                      Quality and Regulatory Compliance
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:472">
                      GTO will lead the top league with unmatched quality and regulatory performance.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:473"></div>
                </div>
              </div>
              
              {/* Item 2: Customer Focus and Growth */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:474">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:475">
                  <img 
                    src="/assets/global-technical/Icon2.svg" 
                    alt="Customer Focus and Growth" 
                    className="global-technical-operations-spa__item-icon-img"
                  />
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:482">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:483">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:484">
                      Customer Focus and Growth
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:485">
                      GTO will stand for reliability, flexibility, and agility, delivering quality products.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:486"></div>
                </div>
              </div>
              
              {/* Item 3: Cost Leadership */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:487">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:488">
                  <img 
                    src="/assets/global-technical/Icon3.svg" 
                    alt="Cost Leadership" 
                    className="global-technical-operations-spa__item-icon-img"
                  />
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:494">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:495">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:496">
                      Cost Leadership
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:497">
                      GTO will think creatively to be cost-efficient and collaborate consistently to remain among the top five competitors in the industry.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:498"></div>
                </div>
              </div>
              
              {/* Item 4: Technology Leadership */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:499">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:500">
                  <img 
                    src="/assets/global-technical/Icon4.svg" 
                    alt="Technology Leadership" 
                    className="global-technical-operations-spa__item-icon-img"
                  />
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:504">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:505">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:506">
                      Technology Leadership
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:507">
                      GTO will continuously assess and invest in emerging technologies, including Generative AI and continuous manufacturing.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:508"></div>
                </div>
              </div>
              
              {/* Item 5: ESG */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:509">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:510">
                  <img 
                    src="/assets/global-technical/Icon5.svg" 
                    alt="ESG" 
                    className="global-technical-operations-spa__item-icon-img"
                  />
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:515">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:516">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:517">
                      ESG
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:518">
                      GTO will take a proactive approach aligned with ESG framework.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:519"></div>
                </div>
              </div>
              
              {/* Item 6: Capability Building */}
              <div className="global-technical-operations-spa__item" data-node-id="2852:520">
                <div className="global-technical-operations-spa__item-icon" data-node-id="2852:521">
                  <img 
                    src="/assets/global-technical/Icon6.svg" 
                    alt="Capability Building" 
                    className="global-technical-operations-spa__item-icon-img"
                  />
                </div>
                <div className="global-technical-operations-spa__item-text" data-node-id="2852:525">
                  <div className="global-technical-operations-spa__item-content" data-node-id="2852:527">
                    <h3 className="global-technical-operations-spa__item-title" data-node-id="2852:528">
                      Capability Building
                    </h3>
                    <p className="global-technical-operations-spa__item-description" data-node-id="2852:529">
                      GTO will develop future-ready technical skills across domains.
                    </p>
                  </div>
                  <div className="global-technical-operations-spa__item-divider" data-node-id="2852:526"></div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="global-technical-operations-spa__image" data-node-id="2852:530">
              <div className="global-technical-operations-spa__image-wrapper" data-node-id="2852:531">
                <div className="global-technical-operations-spa__image-mask" data-node-id="2852:532">
                  <img 
                    src="/assets/global-technical/statigic.png" 
                    alt="Strategic Performance Areas" 
                    className="global-technical-operations-spa__image-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Integrated GTO Structure Section */}
      <section className="global-technical-operations-structure" data-node-id="2852:443">
        {/* Background Petals SVG */}
        <div className="global-technical-operations-structure__bg-petals">
          <img 
            src="/assets/global-technical/patelsb.svg" 
            alt="" 
            className="global-technical-operations-structure__bg-petals-img"
          />
        </div>
        <div className="global-technical-operations-structure__container">
          <div className="global-technical-operations-structure__text" data-node-id="2852:450">
            <div className="global-technical-operations-structure__header" data-node-id="2852:451">
              <h2 className="global-technical-operations-structure__heading" data-node-id="2852:452">
                Our Integrated GTO Structure
              </h2>
              <p className="global-technical-operations-structure__subheading" data-node-id="2852:453">
                Where Manufacturing, Procurement and Supply Chain Go Hand-in-Hand
              </p>
            </div>
            <div className="global-technical-operations-structure__paragraph" data-node-id="2852:454">
              <p className="global-technical-operations-structure__paragraph-line">
                GTO has also enabled a shift from region-specific operations to a globally integrated way of working, strengthening collaboration across sites in India, the US, Mexico, and Brazil. We at GTO are building three core divisions that encompass our main operations and operate as equal yet collaborative pillars which help us in not only meeting our business outcomes but also help our patients get access to quality and affordable healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="global-technical-operations-tabs-section">
        <div className="global-technical-operations-tabs-section__container">
          <GTOTabs />
        </div>
      </section>
    </div>
  );
}

