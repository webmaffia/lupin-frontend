import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getAboutUs, mapAboutUsData } from '@/lib/strapi-pages';
import { mapTopBannerData } from '@/lib/strapi';
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
  let pageIntroData = null;
  let overviewSections = null;
  let redirectSection = null;

  try {
    const strapiData = await getAboutUs();
    
    // Map all data using the new mapping function
    const mappedData = mapAboutUsData(strapiData);
    
    // Map TopBanner data for InnerBanner
    bannerData = mappedData.banner;
    
    // Map PageIntroSection (Topfold)
    pageIntroData = mappedData.pageIntro;
    
    // Map AboutOverviewSection (Folds)
    overviewSections = mappedData.overviewSections || [];
    
    // Map RedirectSection
    redirectSection = mappedData.redirectSection;
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

  // Default page intro data if Strapi data is not available
  if (!pageIntroData) {
    pageIntroData = {
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
                {pageIntroData?.heading && (
                  <h1 className="about-us-content__topfold-heading">
                    {Array.isArray(pageIntroData.heading) 
                      ? pageIntroData.heading.join(' ')
                      : pageIntroData.heading
                    }
                  </h1>
                )}
                <div className="about-us-content__topfold-petals">
                  <Image
                    src={pageIntroData?.image?.url || "/assets/about/petalsabout.svg"}
                    alt={pageIntroData?.image?.alt || "Decorative petals"}
                    width={270}
                    height={388}
                    quality={100}
                  />
                </div>
                {pageIntroData?.description && (
                  <p className="about-us-content__topfold-description">
                    {pageIntroData.description}
                  </p>
                )}
              </div>
            </div>
        
            {(() => {
              // Default fold data with headings and text content
              const defaultFolds = [
                { 
                  title: 'Our Purpose', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  description: 'We Catalyze Treatments that Transform Hope into Healing\n\nOurs is a purpose-driven journey of over five decades, where we relentlessly aim to improve lives, build sustainability and deliver long-term value to our stakeholders',
                  href: '/about-us/our-purpose'
                },
                { 
                  title: 'Our\nValues', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  description: 'At Lupin, we pride ourselves on our promise of caring for our customers, our commitment to our employees\' growth and welfare, our continuous quality focus, and the spirit of innovation that drives each of us to discover better ways of working. This culture is shaped and driven by our values.',
                  href: '/about-us/our-values'
                },
                { 
                  title: 'Our\nLeadership', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  description: 'At Lupin, we are guided by a team that brings experience, vision, and a shared commitment to growth. We strive to create an impact, innovate, and bring meaningful change every day.',
                  href: '/about-us/leadership'
                },
                { 
                  title: 'Global\nPresence', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  description: 'From a single vision in 1968 to an organization that moves across borders, Lupin has grown into a network of 24,000+ people across 11 countries and six continents.',
                  href: '/about-us/global-presence'
                },
                { 
                  title: 'Our Manufacturing\nApproach', 
                  color: 'green', 
                  svg: 'svg2', 
                  svgPosition: 'left', 
                  imagePosition: 'right', 
                  description: 'Our manufacturing strength is built on the power of technology, advanced facilities, rigorous quality systems, and a commitment to sustainable, reliable production.',
                  href: '/about-us/our-manufacturing-sites'
                },
                { 
                  title: 'Our Science', 
                  color: 'teal', 
                  svg: 'svg1', 
                  svgPosition: 'right', 
                  imagePosition: 'left', 
                  description: 'At Lupin, our Research and Development (R&D) division drives our industry positioning as a leading pharmaceutical solutions provider in the US and in India. It develops solutions that allow us to deliver on our purpose and vision.',
                  href: '/about-us/our-science'
                }
              ];
              
              // Use Strapi data if available, otherwise use defaults
              // Follow the defaultFolds structure and use colors from defaultFolds
              const foldsToRender = Array.isArray(overviewSections) && overviewSections.length > 0
                ? overviewSections.map((section, index) => {
                    // Get default fold for this index to use its color, svg, and positions
                    const defaultFold = defaultFolds[index] || defaultFolds[0];
                    
                    return {
                      title: section.title || defaultFold.title || 'Our Purpose',
                      description: section.description || defaultFold.description || '',
                      href: section.cta?.href || defaultFold.href || '#',
                      image: section.image || null,
                      icon: section.icon || null,
                      // Use color, svg, svgPosition, and imagePosition from defaultFolds
                      color: defaultFold.color || (index % 2 === 0 ? 'teal' : 'green'),
                      svg: defaultFold.svg || (index % 2 === 0 ? 'svg1' : 'svg2'),
                      svgPosition: defaultFold.svgPosition || (index % 2 === 0 ? 'right' : 'left'),
                      imagePosition: section.imagePosition || defaultFold.imagePosition || (index % 2 === 0 ? 'left' : 'right')
                    };
                  })
                : defaultFolds;
              
              return foldsToRender.map((fold, index) => {
                const headingLines = fold.title.split(/\s+/).filter(word => word.trim());
                
                return (
                  <section key={index} className={`about-us-content__fold about-us-content__fold--${fold.color}`}>
                    <div className="about-us-content__fold-container">
                      <div className={`about-us-content__fold-image about-us-content__fold-image--${fold.imagePosition}`}>
                        <Image
                          src={fold.image?.url || "/assets/about/image.png"}
                          alt={fold.image?.alt || "About Us"}
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
                        {fold.icon ? (
                          <Image
                            src={fold.icon.url}
                            alt={fold.icon.alt || "Decorative SVG"}
                            width={fold.svg === 'svg1' ? 251 : 531}
                            height={fold.svg === 'svg1' ? 284 : 384}
                            quality={100}
                          />
                        ) : (
                          <Image
                            src={`/assets/about/${fold.svg}.svg`}
                            alt="Decorative SVG"
                            width={fold.svg === 'svg1' ? 251 : 531}
                            height={fold.svg === 'svg1' ? 284 : 384}
                            quality={100}
                          />
                        )}
                      </div>
                      <h2 className="about-us-content__fold-heading">
                        {headingLines.map((word, wordIndex) => (
                          <span key={wordIndex}>{word.trim()}</span>
                        ))}
                      </h2>
                      <div className="about-us-content__fold-text">
                        {(() => {
                          const textContent = fold.description || defaultFolds[index]?.description || '';
                          // Split by double newlines for paragraphs, strip markdown
                          const paragraphs = textContent
                            .replace(/\*\*/g, '')
                            .replace(/\*/g, '')
                            .replace(/#{1,6}\s/g, '')
                            .split('\n\n')
                            .filter(para => para.trim());
                          
                          return paragraphs.map((paragraph, paraIndex) => (
                            <p key={paraIndex}>{paragraph.trim()}</p>
                          ));
                        })()}
                      </div>
                    </div>
                  </section>
                );
              });
            })()}
            
            {/* View All CTA */}
            {redirectSection && (
              <div className="about-us-content__view-all">
                <Link href={redirectSection.href || '#'} className="about-us-content__view-all-button">
                  <span className="about-us-content__view-all-text">{redirectSection.text || 'view all'}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
