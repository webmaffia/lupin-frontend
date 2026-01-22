import OurValuesContent from '@/components/OurValuesContent';
import { getOurValues, mapOurValuesContentData, mapTopBannerData } from '@/lib/strapi';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/our-values.scss';

// Generate metadata for the our-values page
export const metadata = generateSEOMetadata({
  title: "Our Values - Lupin",
  description: "Core Beliefs That Guide Our Decisions and Behavior. At Lupin, we pride ourselves on our promise of caring for our customers, our commitment to our employees' growth and welfare, our continuous quality focus, and the spirit of innovation.",
  canonicalUrl: "https://www.lupin.com/about-us/our-values",
});

export default async function OurValuesPage() {
  // Fetch data from Strapi
  let bannerData = null;
  let contentData = null;

  try {
    const strapiData = await getOurValues();
    bannerData = mapTopBannerData(strapiData?.data?.TopBanner || strapiData?.TopBanner);
    contentData = mapOurValuesContentData(strapiData);
  } catch (error) {
    console.error('Error fetching our-values data from Strapi:', error);
    // Will use default data below
  }

  // Default banner data if Strapi data is not available
  if (!bannerData) {
    bannerData = {
      title: {
        line1: "Our Values",
      },
      subheading: {
        enabled: true,
        text: "Core Beliefs That Guide Our Decisions and Behavior"
      },
      images: {
        banner: {
          url: "/assets/inner-banner/freepik-enhance-42835.jpg",
          alt: "Our Values - Lupin"
        },
        petal: {
          url: "/assets/inner-banner/petal-2.svg",
          alt: "Decorative petal"
        }
      }
    };
  }

  // Default content data if Strapi data is not available
  if (!contentData) {
    contentData = {
      heading: "Core values that define us",
      description: "At Lupin, we pride ourselves on our promise of caring for our customers, our commitment to our employees' growth and welfare, our continuous quality focus, and the spirit of innovation that drives each of us to discover better ways of working. This culture is shaped and driven by our values.",
      decoration: {
        url: "/assets/our-values/decoration.svg",
        alt: "Decorative element",
        width: 1228,
        height: 576
      }
    };
  }

  return <OurValuesContent bannerData={bannerData} contentData={contentData} />;
}

