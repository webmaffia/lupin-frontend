import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getAboutUs, mapAboutUsTopfoldData, mapAboutUsFoldsData, mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/about-us.scss';

// Generate metadata for the About Us page
//test
export const metadata = generateSEOMetadata({
  title: "About Us - Lupin | Global Pharmaceutical Leader Committed to Transforming Healthcare",
  description: "Learn about Lupin, a leading global pharmaceutical company with over five decades of experience in delivering innovative healthcare solutions. Discover our mission, values, and commitment to improving lives worldwide.",
  canonicalUrl: "https://www.lupin.com/about-us",
  keywords: "Lupin about us, pharmaceutical company history, global healthcare leader, Lupin Limited, pharmaceutical innovation, healthcare company",
});

export default async function AboutUsPage() {
  // Fetch data from Strapi
  let bannerData = null;
  let topfoldData = null;
  let foldsData = null;

  try {
    const strapiData = await getAboutUs();
    
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

    // Map Topfold data
    topfoldData = mapAboutUsTopfoldData(strapiData);
    
    // Map Folds data
    foldsData = mapAboutUsFoldsData(strapiData);
  } catch (error) {
    console.error('Error fetching about-us data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "About Us",
      },
      subheading: {
        enabled: true,
        text: "A Global Pharmaceutical Leader Committed to Transforming Healthcare"
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "About Us - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Default topfold data if Strapi data is not available
  if (!topfoldData) {
    topfoldData = {
      heading: ["Shaping", "Healthier", "World", "Together"],
      description: "Lupin is built on a simple belief — that quality healthcare should reach every life it can touch. From our humble beginnings to becoming a trusted global pharmaceutical leader, we remain driven by innovation, compassion, and responsibility. Our journey continues with a diverse portfolio that spans generics, complex generics, specialty medicines, biosimilars, and APIs, all designed to make meaningful impact across 100+ markets worldwide."
    };
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="about-us-content">
        <div className="about-us-content__container">
          <div className="about-us-content__wrapper">
            <div className="about-us-content__topfold">
              <div className="about-us-content__topfold-content">
                {topfoldData?.heading && (
                  <h1 className="about-us-content__topfold-heading">
                    {topfoldData.heading.map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </h1>
                )}
                <div className="about-us-content__topfold-petals">
                  <Image
                    src="/assets/about/petalsabout.svg"
                    alt="Decorative petals"
                    width={270}
                    height={388}
                    quality={100}
                  />
                </div>
                {topfoldData?.description && (
                  <p className="about-us-content__topfold-description">
                    {topfoldData.description}
                  </p>
                )}
              </div>
            </div>
        
            {(() => {
              // Default fold data with headings and text content
              const defaultFolds = [
                { 
                  heading: 'Our Purpose', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  text: 'We Catalyze Treatments that Transform Hope into Healing\n\nOurs is a purpose-driven journey of over five decades, where we relentlessly aim to improve lives, build sustainability and deliver long-term value to our stakeholders',
                  href: '/about-us/purpose'
                },
                { 
                  heading: 'Our\nValues', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  text: 'At Lupin, we pride ourselves on our promise of caring for our customers, our commitment to our employees\' growth and welfare, our continuous quality focus, and the spirit of innovation that drives each of us to discover better ways of working. This culture is shaped and driven by our values.',
                  href: '/about-us/our-values'
                },
                { 
                  heading: 'Our\nLeadership', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  text: 'At Lupin, we are guided by a team that brings experience, vision, and a shared commitment to growth. We strive to create an impact, innovate, and bring meaningful change every day.',
                  href: '/leaders'
                },
                { 
                  heading: 'Global\nPresence', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  text: 'From a single vision in 1968 to an organization that moves across borders, Lupin has grown into a network of 24,000+ people across 11 countries and six continents.',
                  href: '/about-us/global-presence'
                },
                { 
                  heading: 'Our Manufacturing\nApproach', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  text: 'Our manufacturing strength is built on the power of technology, advanced facilities, rigorous quality systems, and a commitment to sustainable, reliable production.',
                  href: '/about-us/our-manufacturing-sites'
                },
                { 
                  heading: 'Our Science', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  text: 'At Lupin, our Research and Development (R&D) division drives our industry positioning as a leading pharmaceutical solutions provider in the US and in India. It develops solutions that allow us to deliver on our purpose and vision.',
                  href: '/about-us/our-science'
                }
              ];
              
              // Use Strapi data if available, otherwise use defaults
              const foldsToRender = Array.isArray(foldsData) 
                ? foldsData.map((fold, index) => ({
                    heading: fold.heading || defaultFolds[index]?.heading || 'Our Purpose',
                    text: fold.text || defaultFolds[index]?.text || '',
                    href: fold.href || defaultFolds[index]?.href || '#',
                    color: index % 2 === 0 ? 'teal' : 'green',
                    svg: index % 2 === 0 ? 'svg1' : 'svg2',
                    svgPosition: index % 2 === 0 ? 'right' : 'left',
                    imagePosition: index % 2 === 0 ? 'left' : 'right'
                  }))
                : defaultFolds;
              
              return foldsToRender.map((fold, index) => {
                const headingLines = fold.heading.split('\n').filter(line => line.trim());
                const textContent = fold.text || defaultFolds[index]?.text || '';
                
                return (
                  <section key={index} className={`about-us-content__fold about-us-content__fold--${fold.color}`}>
                    <div className="about-us-content__fold-container">
                      <div className={`about-us-content__fold-image about-us-content__fold-image--${fold.imagePosition}`}>
                        <Image
                          src="/assets/about/image.png"
                          alt="About Us"
                          width={800}
                          height={623}
                          quality={100}
                        />
                        <Link href={fold.href || '#'} className="about-us-content__fold-cta">
                          <div className="about-us-content__fold-cta-circle"></div>
                          <span className="about-us-content__fold-cta-text">
                            READ<br />MORE
                          </span>
                        </Link>
                      </div>
                      <div className={`about-us-content__fold-svg about-us-content__fold-svg--${fold.svgPosition}`}>
                        <Image
                          src={`/assets/about/${fold.svg}.svg`}
                          alt="Decorative SVG"
                          width={fold.svg === 'svg1' ? 251 : 531}
                          height={fold.svg === 'svg1' ? 284 : 384}
                          quality={100}
                        />
                      </div>
                      <h2 className="about-us-content__fold-heading">
                        {headingLines.map((line, lineIndex) => (
                          <span key={lineIndex}>{line.trim()}</span>
                        ))}
                      </h2>
                      <div className="about-us-content__fold-text">
                        {textContent.split('\n\n').filter(para => para.trim()).map((paragraph, paraIndex) => (
                          <p key={paraIndex}>{paragraph.trim()}</p>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              });
            })()}
            
            {/* View All CTA */}
            <div className="about-us-content__view-all">
              <Link href="#" className="about-us-content__view-all-button">
                <span className="about-us-content__view-all-text">view all</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
