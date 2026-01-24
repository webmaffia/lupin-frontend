import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import PurposeVideo from '@/components/PurposeVideo';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getOurPurpose, mapOurPurposeData } from '@/lib/strapi-pages';
import '@/scss/components/Purpose.scss';

// Generate metadata for the purpose page
export const metadata = generateSEOMetadata({
  title: "Our Purpose - Lupin",
  description: "We Catalyze Treatments That Transform Hope Into Healing. A purpose-driven journey of over five decades – improving lives, building sustainability, and delivering long-term value to our stakeholders.",
  canonicalUrl: "https://www.lupin.com/about-us/our-purpose",
});

export default async function PurposePage() {
  let purposeData = null;
  let error = null;

  try {
    const rawData = await getOurPurpose();
    if (rawData) {
      purposeData = mapOurPurposeData(rawData);
    } else {
      error = new Error('No data received from Strapi API');
    }
  } catch (err) {
    console.error('Error fetching our-purpose data from Strapi:', err);
    error = err instanceof Error ? err : new Error('Failed to fetch our-purpose data');
  }

  const bannerData = purposeData?.banner || {
    title: {
      line1: "Our Purpose",
      line2: ""
    },
    background: {
      color1: "#0d4a4a",
      color2: "#00a859",
      opacity: 0.9
    }
  };

  const pageIntro = purposeData?.pageIntro;
  const treatmentSection = purposeData?.treatmentSection;
  const commitmentSection = purposeData?.commitmentSection;
  const guidedFrameworkSection = purposeData?.guidedFrameworkSection;

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Our Purpose Page - treatmentSection:', treatmentSection);
    console.log('Our Purpose Page - purposeData:', purposeData);
  }

  return (
    <>
      <Header />
      <InnerBanner data={bannerData} />
      <main className="wrapper">


        {/* Section 2: Catalyzing Hope Into Healing */}
        {pageIntro && (
          <section className="purpose-story">
            <div className="container-para">
              <div className="purpose-story__content">
                <div className="purpose-story__text">
                  {pageIntro.heading && (
                    <h2 className="purpose-story__title">
                      {pageIntro.heading.split('\n').map((line, index, array) => (
                        <React.Fragment key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h2>
                  )}
                  {pageIntro.paragraphDescription && (
                    <p className="purpose-story__paragraph">
                      {pageIntro.paragraphDescription}
                    </p>
                  )}
                </div>
                <PurposeVideo youtubeLink={pageIntro.youtubeLink} image={pageIntro.image} />
              </div>
            </div>
          </section>
        )}

        {/* Section 3: We Catalyze Treatments */}
        {treatmentSection && (treatmentSection.heading || treatmentSection.paragraphDescription) && (
          <section className="purpose-mountain">
            {(treatmentSection.desktopImage?.url || treatmentSection.mobileImage?.url) && (
              <div className="purpose-mountain__bg-wrapper">
                <picture>
                  {treatmentSection.mobileImage?.url && (
                    <source media="(max-width: 767px)" srcSet={treatmentSection.mobileImage.url} />
                  )}
                  {treatmentSection.desktopImage?.url ? (
                    <img
                      src={treatmentSection.desktopImage.url}
                      alt={treatmentSection.desktopImage.alt || 'Treatment background'}
                      className="purpose-mountain__bg"
                    />
                  ) : treatmentSection.mobileImage?.url ? (
                    <img
                      src={treatmentSection.mobileImage.url}
                      alt={treatmentSection.mobileImage.alt || 'Treatment background'}
                      className="purpose-mountain__bg"
                    />
                  ) : null}
                </picture>
              </div>
            )}
            <div className="container-mountain">
              <div className="purpose-mountain__content">
                <div className="purpose-mountain__text">
                  {treatmentSection.heading && (
                    <h2 className="purpose-mountain__title">
                      {String(treatmentSection.heading).replace(/"/g, '').split('\n').map((line, index, array) => (
                        <React.Fragment key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h2>
                  )}
                  {treatmentSection.paragraphDescription && (
                    <p className="purpose-mountain__paragraph">
                      {String(treatmentSection.paragraphDescription)}
                    </p>
                  )}
                </div>
                <div className="purpose-mountain__media">
                  <Image
                    src="/assets/images/purpose/healingflower.webp"
                    alt="Transformation"
                    width={600}
                    height={600}
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Our Purpose Is Rooted In 3 Core Commitments */}
        {commitmentSection && (
          <section className="purpose-commitments">
            <div className="container-commitments">
              <div className="purpose-commitments__header">
                {commitmentSection.sectionTitle && (
                  <h2 className="purpose-commitments__title">
                    {commitmentSection.sectionTitle.split('\n').map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h2>
                )}
              </div>
              {commitmentSection.cards && commitmentSection.cards.length > 0 && (
                <div className="purpose-commitments__grid">
                  {commitmentSection.cards.map((card) => (
                    <div key={card.id} className="purpose-commitments__card purpose-commitments__card--image">
                      {card.image?.url && (
                        <div className="purpose-commitments__card-media">
                          <Image
                            src={card.image.url}
                            alt={card.image.alt || `${card.titleLine1} ${card.titleLine2}`}
                            fill
                            quality={100}
                          />
                        </div>
                      )}
                      <div className="purpose-commitments__card-content">
                        <h3 className="purpose-commitments__card-title">
                          {card.titleLine1 && (
                            <span className="purpose-commitments__card-title-word">{card.titleLine1}</span>
                          )}
                          {card.titleLine2 && (
                            <>
                              <br />
                              <span className="purpose-commitments__card-title-word">{card.titleLine2}</span>
                            </>
                          )}
                        </h3>
                        {card.description && (
                          <p className="purpose-commitments__card-text">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 5: Our Guiding Framework */}
        {guidedFrameworkSection && (
          <section className="purpose-framework">
            <div className="container-framework">
              {guidedFrameworkSection.sectionTitle && (
                <h2 className="purpose-framework__title">
                  {guidedFrameworkSection.sectionTitle.trim()}
                </h2>
              )}
              <div className="purpose-framework__line">
                <Image
                  src="/assets/images/purpose/frameworkline.webp"
                  alt="Line"
                  width={200}
                  height={10}
                  quality={100}
                />
              </div>
              {guidedFrameworkSection.cards && guidedFrameworkSection.cards.length > 0 && (
                <div className="purpose-framework__circles">
                  {guidedFrameworkSection.cards.map((card, index) => (
                    <div 
                      key={card.id} 
                      className={`purpose-framework__circle ${index === 0 ? 'purpose-framework__circle--white' : 'purpose-framework__circle--green'}`}
                    >
                      <h3 className="purpose-framework__circle-title">
                        {card.titleLine1 && (
                          <span className="purpose-framework__circle-title-word">{card.titleLine1}</span>
                        )}
                        {card.titleLine2 && (
                          <>
                            <br />
                            {card.titleLine2}
                          </>
                        )}
                      </h3>
                      {card.description && (
                        <p className="purpose-framework__circle-text">
                          {card.description}
                        </p>
                      )}
                      {index === 0 && card.image?.url && (
                        <div className="purpose-framework__circle-icon">
                          <Image
                            src={card.image.url}
                            alt={card.image.alt || `${card.titleLine1} ${card.titleLine2}`}
                            width={200}
                            height={200}
                            quality={100}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

