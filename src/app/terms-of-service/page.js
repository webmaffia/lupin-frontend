import InnerBanner from '@/components/InnerBanner';
import TermsOfServiceContent from '@/components/TermsOfServiceContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the Terms of Service page
export const metadata = generateSEOMetadata({
  title: "Terms of Service - Lupin | Terms & Conditions",
  description: "Read Lupin's Terms and Conditions of Use. By using this website, you agree to abide by these terms and conditions.",
  canonicalUrl: "https://www.lupin.com/terms-of-service",
  keywords: "terms of service, terms and conditions, Lupin terms, website terms, user agreement, Lupin Limited terms",
});

// Fetch terms of service data from Strapi
async function getTermsOfServiceData() {
  try {
    // Check if Strapi is configured
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      return null; // Use default data
    }

    // Fetch from Strapi - adjust endpoint based on your Strapi content type name
    const data = await fetchAPI('terms-of-service?populate=deep', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    // Map Strapi response to component format
    if (data.data) {
      // Collection type response
      const attributes = Array.isArray(data.data) ? data.data[0]?.attributes : data.data?.attributes;
      return attributes || null;
    }

    return null;
  } catch (error) {
    console.error('Error fetching terms of service data from Strapi:', error);
    // Return null to use default data on error
    return null;
  }
}

export default async function TermsOfServicePage() {
  // Fetch data from Strapi
  const strapiData = await getTermsOfServiceData();

  const bannerData = {
    title: {
      line1: "Disclaimer",
  
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Terms of Service - Lupin"
      },
      petal: {
        url: "/assets/inner-banner/petal-2.svg",
        alt: "Decorative petal"
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <TermsOfServiceContent data={strapiData} />
    </div>
  );
}

