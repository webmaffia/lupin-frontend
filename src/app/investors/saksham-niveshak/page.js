import InnerBanner from '@/components/InnerBanner';
import SakshamNiveshak from '@/components/SakshamNiveshak';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the Saksham Niveshak page
export const metadata = generateSEOMetadata({
  title: "Saksham Niveshak - Lupin | Investor Relations",
  description: "Information about unclaimed dividends and shares transfer to IEPF Account. Update your shareholder details to claim unpaid dividends.",
  canonicalUrl: "https://www.lupin.com/investors/saksham-niveshak",
  keywords: "Saksham Niveshak, unclaimed dividend, IEPF, shareholder details, Lupin investors",
});

export default async function SakshamNiveshakPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Saksham",
      line2: "Niveshak"
    }
  };

  // Fetch Saksham Niveshak data from Strapi
  let sakshamData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
    // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/saksham-niveshak`);
    // sakshamData = await response.json();
  } catch (error) {
    console.error('Error fetching Saksham Niveshak data from Strapi:', error);
    // Will use default data from component
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <SakshamNiveshak data={sakshamData} />
    </div>
  );
}

