import InnerBanner from '@/components/InnerBanner';
import CodeOfConduct from '@/components/CodeOfConduct';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Generate metadata for the code of conduct page
export const metadata = generateSEOMetadata({
  title: "Code of Conduct - Lupin | Corporate Governance Policies",
  description: "Access Lupin Limited's code of conduct policies, including codes for directors, senior management, and independent directors.",
  canonicalUrl: "https://www.lupin.com/investors/code-of-conduct",
  keywords: "Lupin code of conduct, corporate governance, director policies, senior management code, independent directors",
});

export default async function CodeOfConductPage() {
  // Custom banner data for this page
  const bannerData = {
    title: {
      line1: "Code of",
      line2: "Conduct"
    }
  };

  // Fetch code of conduct data from Strapi
  let codeOfConductData = null;
  
  try {
    // This would typically fetch from a Strapi endpoint
    // For now, component will use default data
    // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/code-of-conduct`);
    // codeOfConductData = await response.json();
  } catch (error) {
    console.error('Error fetching code of conduct data from Strapi:', error);
    // Will use default data from component
  }

  return (
    <div style={{ position: 'relative' }}>
      <InnerBanner data={bannerData} />
      <CodeOfConduct data={codeOfConductData} />
    </div>
  );
}

