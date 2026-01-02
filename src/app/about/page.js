import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/components/About.scss';

// Generate metadata for the about page
export const metadata = generateSEOMetadata({
  title: "About - Lupin",
  description: "Lupin is built on a simple belief — that quality healthcare should reach every life it can touch. From our humble beginnings to becoming a trusted global pharmaceutical leader, we remain driven by innovation, compassion, and responsibility.",
  canonicalUrl: "https://www.lupin.com/about",
});

export default function AboutPage() {
  const bannerData = {
    title: {
      line1: "About Us",
      line2: ""
    },
    background: {
      color1: "#00a0a0",
      color2: "#0b7f7a",
      opacity: 0.9
    }
  };

  return (
    <>
      <Header />
      <InnerBanner data={bannerData} />
      <main className="wrapper">
        <section className="about-hero">
          <div className="containerpara">
            <div className="about-hero__content">
              <div className="about-hero__slogan">
                <h1 className="about-hero__title">
                  <span>Shaping</span>
                  <span>Healthier</span>
                  <span>World</span>
                  <span>Together</span>
                </h1>
              </div>
              <div className="about-hero__image">
                <Image
                  src="/assets/images/about/petal.webp"
                  alt="Lupin Logo"
                  width={500}
                  height={500}
                  quality={100}
                />
              </div>
              <div className="about-hero__description">
                <p className="about-hero__text">
                  Lupin is built on a simple belief — that quality healthcare should reach every life it can touch. from our humble beginnings to becoming a trusted global pharmaceutical leader, we remain driven by innovation, compassion, and responsibility. Our journey continues with a diverse portfolio that spans generics, complex generics, specialty medicines, biosimilars, and apis, all designed to make meaningful impact across 100+ markets worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="our-story">
          <div className="our-story__wrapper">
            <div className="our-story__media">
            {/* <div className="our-story__hover"> */}
            {/* <div className="inner_banner_clip"></div> */}
            <span>
              <Image
                src="/assets/images/about/story.webp"
                alt="Our Story"
                width={800}
                height={600}
                quality={100}
              />
              </span>
              {/* <button className="our-story__cta">
                READ<br />MORE
              </button> */}
            </div>
            <div className="our-story__content">
            {/* <div className="inner_banner_clip"></div> */}
              <Image
                src="/assets/images/about/icon-1.webp"
                alt="Our Story"
                width={200}
                height={200}
                quality={100}
                className="our-story__icon"
              />
              <div className="our-story__circle">
                <p>
                  <strong>Founded by Dr. Desh Bandhu Gupta in 1968</strong>,
                  Lupin began as a simple but powerful idea: that quality healthcare
                  should be within reach for everyone.
                  <br /><br />
                  What started as a small, determined venture has grown into a
                  global pharmaceutical leader. This is the story of how that belief
                  took shape, gained momentum, and became the Lupin you see today.
                </p>
              </div>
            </div>
            {/* OVERLAPPING TITLE */}
            <div className="our-story__title">
              <h2>Our<br />Story</h2>
            </div>
          </div>

          <div className="our-story__wrapper">
            <div className="our-story__content">
              <Image
                src="/assets/images/about/icon-1.webp"
                alt="Our Purpose"
                width={200}
                height={200}
                quality={100}
                className="our-story__icon"
              />
              <div className="our-story__circle">
                <p>
                  <strong>Founded by Dr. Desh Bandhu Gupta in 1968</strong>,
                  Lupin began as a simple but powerful idea: that quality healthcare
                  should be within reach for everyone.
                  <br /><br />
                  What started as a small, determined venture has grown into a
                  global pharmaceutical leader. This is the story of how that belief
                  took shape, gained momentum, and became the Lupin you see today.
                </p>
              </div>
            </div>
            <div className="our-story__media">
              <Image
                src="/assets/images/about/purpose.webp"
                alt="Our Purpose"
                width={800}
                height={600}
                quality={100}
              />
              {/* <button className="our-story__cta">
                READ<br />MORE
              </button> */}
            </div>
            {/* OVERLAPPING TITLE */}
            <div className="our-story__title">
              <h2>Our Purpose</h2>
            </div>
          </div>

          <div className="our-story__wrapper">
            <div className="our-story__media">
              <Image
                src="/assets/images/about/values.webp"
                alt="Our Values"
                width={800}
                height={600}
                quality={100}
              />
              {/* <button className="our-story__cta">
                READ<br />MORE
              </button> */}
            </div>
            <div className="our-story__content">
              <Image
                src="/assets/images/about/icon-2.webp"
                alt="Our Values"
                width={200}
                height={200}
                quality={100}
                className="our-story__icon"
              />
              <div className="our-story__circle">
                <p>
                  <strong>Founded by Dr. Desh Bandhu Gupta in 1968</strong>,
                  Lupin began as a simple but powerful idea: that quality healthcare
                  should be within reach for everyone.
                  <br /><br />
                  What started as a small, determined venture has grown into a
                  global pharmaceutical leader. This is the story of how that belief
                  took shape, gained momentum, and became the Lupin you see today.
                </p>
              </div>
            </div>
            {/* OVERLAPPING TITLE */}
            <div className="our-story__title">
              <h2>Our <br />Values</h2>
            </div>
          </div>

          <div className="our-story__wrapper">
            <div className="our-story__content">
              <Image
                src="/assets/images/about/icon-3.webp"
                alt="Our Leadership"
                width={200}
                height={200}
                quality={100}
                className="our-story__icon"
              />
              <div className="our-story__circle">
                <p>
                  <strong>Founded by Dr. Desh Bandhu Gupta in 1968</strong>,
                  Lupin began as a simple but powerful idea: that quality healthcare
                  should be within reach for everyone.
                  <br /><br />
                  What started as a small, determined venture has grown into a
                  global pharmaceutical leader. This is the story of how that belief
                  took shape, gained momentum, and became the Lupin you see today.
                </p>
              </div>
            </div>
            <div className="our-story__media">
              <Image
                src="/assets/images/about/leader.webp"
                alt="Our Leadership"
                width={800}
                height={600}
                quality={100}
              />
              {/* <button className="our-story__cta">
                READ<br />MORE
              </button> */}
            </div>
            {/* OVERLAPPING TITLE */}
            <div className="our-story__title">
              <h2>Our <br />Leadership</h2>
            </div>
          </div>

          <div className="our-story__wrapper">
            <div className="our-story__media">
              <Image
                src="/assets/images/about/global.webp"
                alt="Global Presence"
                width={800}
                height={600}
                quality={100}
              />
              {/* <button className="our-story__cta">
                READ<br />MORE
              </button> */}
            </div>
            <div className="our-story__content">
              <Image
                src="/assets/images/about/icon-4.webp"
                alt="Global Presence"
                width={200}
                height={200}
                quality={100}
                className="our-story__icon"
              />
              <div className="our-story__circle">
                <p>
                  <strong>Founded by Dr. Desh Bandhu Gupta in 1968</strong>,
                  Lupin began as a simple but powerful idea: that quality healthcare
                  should be within reach for everyone.
                  <br /><br />
                  What started as a small, determined venture has grown into a
                  global pharmaceutical leader. This is the story of how that belief
                  took shape, gained momentum, and became the Lupin you see today.
                </p>
              </div>
            </div>
            {/* OVERLAPPING TITLE */}
            <div className="our-story__title">
              <h2>Global <br />Presence</h2>
            </div>
          </div>

          <Link href="#" className="about-tiles__view-all">View All</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

