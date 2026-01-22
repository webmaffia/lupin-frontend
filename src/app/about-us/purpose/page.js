import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import PurposeVideo from '@/components/PurposeVideo';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/components/Purpose.scss';

// Generate metadata for the purpose page
export const metadata = generateSEOMetadata({
  title: "Our Purpose - Lupin",
  description: "We Catalyze Treatments That Transform Hope Into Healing. A purpose-driven journey of over five decades – improving lives, building sustainability, and delivering long-term value to our stakeholders.",
  canonicalUrl: "https://www.lupin.com/about-us/purpose",
});

export default function PurposePage() {
  const bannerData = {
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

  return (
    <>
      <Header />
      <InnerBanner data={bannerData} />
      <main className="wrapper">


        {/* Section 2: Catalyzing Hope Into Healing */}
        <section className="purpose-story">
          <div className="container-para">
            <div className="purpose-story__content">
              <div className="purpose-story__text">
                <h2 className="purpose-story__title">
                A Purpose <br />That Heals
                </h2>
                <p className="purpose-story__paragraph">
                Ours is a purpose-driven journey of over five decades – improving lives, building sustainability, and delivering long-term value to our stakeholders. Guided by a clear sense of purpose, our Founder, Dr. Desh Bandhu Gupta, shaped Lupin's mission to ensure that no one is left without access to quality healthcare they deserve. Our founder, Dr. Desh Bandhu Gupta, discovered our 'why' and established our mission – to ensure that no one is left without the quality care they deserve.
                </p>
                <p className="purpose-story__paragraph">
                  It is this blend of vision, compassion, and resilience that drives us to keep moving forward, so that generations to come may benefit from the foundation we continue to build.
                </p>
              </div>
              <PurposeVideo />
            </div>
          </div>
        </section>

        {/* Section 3: We Catalyze Treatments */}
        <section className="purpose-mountain">
          <div className="purpose-mountain__bg-wrapper">
            <picture>
              <source media="(max-width: 767px)" srcSet="/assets/images/purpose/transform-mobile.webp" />
              <img
                src="/assets/images/purpose/transform.webp"
                alt=""
                className="purpose-mountain__bg"
              />
            </picture>
          </div>
          <div className="container-mountain">
            <div className="purpose-mountain__content">
              <div className="purpose-mountain__text">
                <h2 className="purpose-mountain__title">
                  "We Catalyze<br />
                  Treatments That<br />
                  Transform Hope Into Healing"
                </h2>
                <p className="purpose-mountain__paragraph">
                  This statement is a reaffirmation of who we are,<br /> and what we stand for - our north star,<br /> guiding us every step of the way.
                </p>
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

        {/* Section 4: Our Purpose Is Rooted In 3 Core Commitments */}
        <section className="purpose-commitments">
          <div className="container-commitments">
            <div className="purpose-commitments__header">
              <h2 className="purpose-commitments__title">
                Our Purpose Is Rooted <br />In 3 Core Commitments
              </h2>
              {/* <div className="purpose-commitments__icon">
                <Image
                  src="/assets/images/purpose/framework.webp"
                  alt="Framework Icon"
                  width={100}
                  height={100}
                  quality={100}
                />
              </div> */}
            </div>
            <div className="purpose-commitments__grid">
              <div className="purpose-commitments__card purpose-commitments__card--image">
                <div className="purpose-commitments__card-media">
                  <Image
                    src="/assets/images/purpose/core.webp"
                    alt="Relief From Disease"
                    fill
                    quality={100}
                  />
                </div>
                <div className="purpose-commitments__card-content">
                  <h3 className="purpose-commitments__card-title">
                    <span className="purpose-commitments__card-title-word">Relief</span> <br />
                    <span className="purpose-commitments__card-title-word">From Disease</span>
                  </h3>
                  <p className="purpose-commitments__card-text">
                    Delivering meaningful treatments <br />for today and tomorrow.
                  </p>
                </div>
              </div>
              <div className="purpose-commitments__card purpose-commitments__card--image">
                <div className="purpose-commitments__card-media">
                  <Image
                    src="/assets/images/purpose/core.webp"
                    alt="Innovating to Unlock Access at Scale"
                    fill
                    quality={100}
                  />
                </div>
                <div className="purpose-commitments__card-content">
                  <h3 className="purpose-commitments__card-title">
                    <span className="purpose-commitments__card-title-word">Innovating to Unlock </span> <br />
                    <span className="purpose-commitments__card-title-word">Access at Scale</span>
                  </h3>
                  <p className="purpose-commitments__card-text">
                    Making complex, cutting-edge<br />
                    healthcare solutions accessible to all.
                  </p>
                </div>
              </div>
              <div className="purpose-commitments__card purpose-commitments__card--image">
                <div className="purpose-commitments__card-media">
                  <Image
                    src="/assets/images/purpose/core.webp"
                    alt="Solutions for underserved communities"
                    fill
                    quality={100}
                  />
                </div>
                <div className="purpose-commitments__card-content">
                  <h3 className="purpose-commitments__card-title">
                    <span className="purpose-commitments__card-title-word">Solutions for </span> <br />
                    <span className="purpose-commitments__card-title-word">underserved communities</span>
                  </h3>
                  <p className="purpose-commitments__card-text">
                    Serving markets and patients<br />
                    overlooked by others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Our Guiding Framework */}
        <section className="purpose-framework">
          <div className="container-framework">
            <h2 className="purpose-framework__title">Our Guiding Framework</h2>
            <div className="purpose-framework__line">
              <Image
                src="/assets/images/purpose/frameworkline.webp"
                alt="Line"
                width={200}
                height={10}
                quality={100}
              />
            </div>
            <div className="purpose-framework__circles">
              <div className="purpose-framework__circle purpose-framework__circle--white">
                <h3 className="purpose-framework__circle-title">
                  <span className="purpose-framework__circle-title-word">Purpose</span> <br />Our North Star
                </h3>
                <p className="purpose-framework__circle-text">The very reason we exist beyond profit.</p>
                <div className="purpose-framework__circle-icon">
                  <Image
                    src="/assets/images/purpose/framework.webp"
                    alt="Purpose"
                    width={200}
                    height={200}
                    quality={100}
                  />
                </div>
              </div>
              <div className="purpose-framework__circle purpose-framework__circle--green">
                <h3 className="purpose-framework__circle-title">
                  <span className="purpose-framework__circle-title-word">Vision</span> <br />Our Future Ambition
                </h3>
                <p className="purpose-framework__circle-text">Where we want to go and what we aspire to achieve.</p>
              </div>
              <div className="purpose-framework__circle purpose-framework__circle--green">
                <h3 className="purpose-framework__circle-title">
                  <span className="purpose-framework__circle-title-word">Strategy</span> <br />Our Driving Path
                </h3>
                <p className="purpose-framework__circle-text">What we will do in the short term and the value we add.</p>
              </div>
              <div className="purpose-framework__circle purpose-framework__circle--green">
                <h3 className="purpose-framework__circle-title">
                  <span className="purpose-framework__circle-title-word">Values</span> <br />Our Core Beliefs
                </h3>
                <p className="purpose-framework__circle-text">Attitude that dictates our decisions and behavior.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

