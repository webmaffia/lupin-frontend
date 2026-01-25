import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getAboutUs, mapAboutUsData } from '@/lib/strapi-pages';
import { getImageUrl, isProxiedImage } from '@/lib/image-proxy';
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

  const CustomHeading = ({ children }) => {
    return <h1 className="about-us-content__topfold-heading">{children}</h1>;
  }

  const CustomParagraph = ({ children }) => {
    return <p className="about-us-content__topfold-description">{children}</p>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <section className="about-us-content">
        <div className="about-us-content__container">
          <div className="about-us-content__wrapper">
            <div className="about-us-content__topfold">
              <div className="about-us-content__topfold-content">
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: CustomHeading,
                  }}
                >
                  {pageIntroData.heading}
                </ReactMarkdown>

                <div className="about-us-content__topfold-petals">
                  <Image
                    src={getImageUrl(pageIntroData?.image?.url) || pageIntroData?.image?.url || "/assets/about/petalsabout.svg"}
                    alt={pageIntroData?.image?.alt || "Decorative petals"}
                    width={270}
                    height={388}
                    quality={100}
                    unoptimized={isProxiedImage(pageIntroData?.image?.url)}
                  />
                </div>
                {pageIntroData?.description && (
                  <ReactMarkdown
                    remarkPlugins={[remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: CustomParagraph,
                    }}
                  >
                    {pageIntroData.description}
                  </ReactMarkdown>
                )}
              </div>
            </div>

            {(() => {
              // Default fold data with headings and text content

              // Use Strapi data if available, otherwise use defaults
              // Follow the defaultFolds structure and use colors from defaultFolds
              const foldsToRender = overviewSections || [];

              return foldsToRender.map((fold, index) => {
                const headingLines = fold.title.split(/\s+/).filter(word => word.trim());

                return (
                  <section key={index} className={`about-us-content__fold about-us-content__fold--${fold.color}`}>
                    <div className="about-us-content__fold-container">
                      <div className={`about-us-content__fold-image about-us-content__fold-image--${fold.imagePosition}`}>
                        <Image
                          src={getImageUrl(fold.image?.url) || fold.image?.url || "/assets/about/image.png"}
                          alt={fold.image?.alt || "About Us"}
                          width={800}
                          height={623}
                          quality={100}
                          unoptimized={isProxiedImage(fold.image?.url)}
                        />
                      </div>
                      {fold.icon && fold.icon.url && (
                        <div className={`about-us-content__fold-svg about-us-content__fold-svg--${fold.svgPosition}`}>
                          <Image
                            src={getImageUrl(fold.icon.url) || fold.icon.url}
                            alt={fold.icon.alt || "Decorative SVG"}
                            width={fold.svg === 'svg1' ? 251 : 531}
                            height={fold.svg === 'svg1' ? 284 : 384}
                            quality={100}
                            unoptimized={isProxiedImage(fold.icon.url)}
                          />
                        </div>
                      )}
                      <h2 className="about-us-content__fold-heading">
                        {headingLines.map((word, wordIndex) => (
                          <span key={wordIndex}>{word.trim()}</span>
                        ))}
                      </h2>
                      <div className="about-us-content__fold-text">
                        <ReactMarkdown
                          remarkPlugins={[remarkBreaks]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {fold.description}
                        </ReactMarkdown>
                        {fold.cta && fold.cta.href && fold.cta.href !== '#' && (() => {
                          // Check if this CTA links to our-story - if so, don't render the link
                          const ctaHref = fold.cta.href;
                          const isOurStoryLink = ctaHref.includes('our-story') || ctaHref.includes('ourstory');
                          
                          // If it's our-story link, don't render the CTA button
                          if (isOurStoryLink) {
                            return null;
                          }
                          
                          // Otherwise, render the link normally
                          return (
                            <Link 
                              href={ctaHref.startsWith('http') ? ctaHref : (ctaHref.startsWith('/') ? ctaHref : `/${ctaHref}`)} 
                              className="about-us-content__fold-text-cta"
                              target={ctaHref.startsWith('http') ? '_blank' : undefined}
                              rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              <span className="about-us-content__fold-text-cta-text">
                                {fold.cta.text || 'Read More'}
                              </span>
                              <svg
                                className="about-us-content__fold-text-cta-icon"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 17L17 1M17 1H1M17 1V17"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          );
                        })()}
                      </div>
                    </div>
                  </section>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Redirect Section */}
      {/* Hide redirect section if it links to our-story (still working on it) */}
      {redirectSection && redirectSection.href && redirectSection.href !== '#' && !redirectSection.href.includes('our-story') && !redirectSection.href.includes('ourstory') && (
        <section className="about-us-content__redirect">
          <div className="about-us-content__container">
            <Link 
              href={redirectSection.href.startsWith('http') ? redirectSection.href : (redirectSection.href.startsWith('/') ? redirectSection.href : `/${redirectSection.href}`)}
              className="about-us-content__redirect-link"
              target={redirectSection.href.startsWith('http') ? '_blank' : undefined}
              rel={redirectSection.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {redirectSection.text || 'View All'}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
