import InnerBanner from '@/components/InnerBanner';
import CookiePolicyContent from '@/components/CookiePolicyContent';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { fetchAPI } from '@/lib/strapi';

// Generate metadata for the Cookie Policy page
export const metadata = generateSEOMetadata({
  title: "Cookie Policy - Lupin | Cookie Usage & Preferences",
  description: "Learn about how Lupin uses cookies and similar tracking technologies on our website. Understand cookie types, purposes, and how to manage your preferences.",
  canonicalUrl: "https://www.lupin.com/cookie-policy",
  keywords: "cookie policy, cookies, tracking technologies, Lupin cookies, website cookies, cookie preferences, GDPR cookies",
});

// Fetch cookie policy data from Strapi
async function getCookiePolicyData() {
  try {
    // Check if Strapi is configured
    if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
      return null; // Use default data
    }

    // Fetch from Strapi - adjust endpoint based on your Strapi content type name
    const data = await fetchAPI('cookie-policy?populate=deep', {
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
    console.error('Error fetching cookie policy data from Strapi:', error);
    // Return null to use default data on error
    return null;
  }
}

export default async function CookiePolicyPage() {
  // Fetch data from Strapi
  const strapiData = await getCookiePolicyData();

  const bannerData = {
    title: {
      line1: "Cookie",
      line2: "Policy",
    },
    subheading: {
      enabled: false,
      text: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Cookie Policy - Lupin"
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
      <CookiePolicyContent data={strapiData} />
    </div>
  );
}

