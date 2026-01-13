import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getAboutUs, mapAboutUsTopfoldData, mapAboutUsFoldsData, mapTopBannerData } from '@/lib/strapi';
import '@/scss/pages/about-us.scss';

// Generate metadata for the About Us page
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
        
            <section className="about-us-content__fold about-us-content__fold--teal">
              <div className="about-us-content__fold-container">
                <div className="about-us-content__fold-image about-us-content__fold-image--left">
                  <Image
                    src="/assets/about/image.png"
                    alt="About Us"
                    width={800}
                    height={623}
                    quality={100}
                  />
                  <Link href="#" className="about-us-content__fold-cta">
                    <div className="about-us-content__fold-cta-circle"></div>
                    <span className="about-us-content__fold-cta-text">
                      READ<br />MORE
                    </span>
                  </Link>
                </div>
                <div className="about-us-content__fold-svg about-us-content__fold-svg--right">
                  <Image
                    src="/assets/about/svg1.svg"
                    alt="Decorative SVG"
                    width={251}
                    height={284}
                    quality={100}
                  />
                </div>
                <h2 className="about-us-content__fold-heading">Our Purpose</h2>
                <div className="about-us-content__fold-text">
                  {foldsData?.teal?.text ? (
                    foldsData.teal.text.split('\n\n').filter(para => para.trim()).map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                  ) : (
                    <>
                      <p>Founded by Dr. Desh Bandhu Gupta in 1968, Lupin began as a simple but powerful idea: that quality healthcare should be within reach for everyone.</p>
                      <p>What started as a small, determined venture has grown into a global pharmaceutical leader. This is the story of how that belief took shape, gained momentum, and became the Lupin you see today.</p>
                    </>
                  )}
                </div>
              </div>
            </section>
            <section className="about-us-content__fold about-us-content__fold--green">
              <div className="about-us-content__fold-container">
                <div className="about-us-content__fold-image about-us-content__fold-image--right">
                  <Image
                    src="/assets/about/image.png"
                    alt="About Us"
                    width={800}
                    height={623}
                    quality={100}
                  />
                  <Link href="#" className="about-us-content__fold-cta">
                    <div className="about-us-content__fold-cta-circle"></div>
                    <span className="about-us-content__fold-cta-text">
                      READ<br />MORE
                    </span>
                  </Link>
                </div>
                <div className="about-us-content__fold-svg about-us-content__fold-svg--left">
                  <Image
                    src="/assets/about/svg2.svg"
                    alt="Decorative SVG"
                    width={531}
                    height={384}
                    quality={100}
                  />
                </div>
                <h2 className="about-us-content__fold-heading">Our Purpose</h2>
                <div className="about-us-content__fold-text">
                  {foldsData?.green?.text ? (
                    foldsData.green.text.split('\n\n').filter(para => para.trim()).map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))
                  ) : (
                    <>
                      <p>Founded by Dr. Desh Bandhu Gupta in 1968, Lupin began as a simple but powerful idea: that quality healthcare should be within reach for everyone.</p>
                      <p>What started as a small, determined venture has grown into a global pharmaceutical leader. This is the story of how that belief took shape, gained momentum, and became the Lupin you see today.</p>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

