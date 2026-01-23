import InnerBanner from '@/components/InnerBanner';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the Privacy Policy page
export const metadata = generateSEOMetadata({
  title: "Privacy Policy - Lupin | Data Protection & Privacy",
  description: "Lupin Limited pledges to comply with internationally recognized standards of privacy protection, including GDPR. Learn about how we collect, use, and protect your personal data.",
  canonicalUrl: "https://www.lupin.com/privacy-policy",
  keywords: "privacy policy, data protection, GDPR, Lupin privacy, personal data, data privacy, Lupin Limited privacy policy",
});

// Fetch privacy policy data from Strapi
async function getPrivacyPolicyData() {
  try {
    // Check if Strapi is configured
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      return null; // Use default data
    }

    // Fetch from Strapi - adjust endpoint based on your Strapi content type name
    // This assumes you have a "privacy-policy" single type or collection type in Strapi
    const data = await fetchAPI('privacy-policy?populate=deep', {
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
    console.error('Error fetching privacy policy data from Strapi:', error);
    // Return null to use default data on error
    return null;
  }
}

export default async function PrivacyPolicyPage() {
  // Fetch data from Strapi
  const strapiData = await getPrivacyPolicyData();

  const bannerData = {
    title: {
      line1: "Privacy",
      line2: "Policy",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Privacy Policy - Lupin"
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
      <PrivacyPolicyContent data={strapiData} />
    </div>
  );
}
