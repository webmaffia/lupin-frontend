import OurValuesContent from '@/components/OurValuesContent';
import { getOurValue, mapOurValueData } from '@/lib/strapi-pages';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/our-values.scss';

// Generate metadata for the our-values page
export const metadata = generateSEOMetadata({
  title: "Our Values - Lupin",
  description: "Core Beliefs That Guide Our Decisions and Behavior. At Lupin, we pride ourselves on our promise of caring for our customers, our commitment to our employees' growth and welfare, our continuous quality focus, and the spirit of innovation.",
  canonicalUrl: "https://www.lupin.com/about-us/our-values",
});

export default async function OurValuesPage() {
  let ourValueData = null;
  let error = null;
  
  try {
    const rawData = await getOurValue();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Our Value - Raw API data received:', {
        hasData: !!rawData,
        isDataObject: !Array.isArray(rawData?.data) && !!rawData?.data,
        hasTopBanner: !!(rawData?.data?.TopBanner || rawData?.TopBanner),
        hasIntroSection: !!(rawData?.data?.OurValueIntroSection || rawData?.OurValueIntroSection),
        hasValuesOverview: !!(rawData?.data?.ValuesOverviewSection || rawData?.ValuesOverviewSection),
        hasVideoSection: !!(rawData?.data?.CulturePrinciplesVideoSection || rawData?.CulturePrinciplesVideoSection)
      });
    }
    
    if (rawData) {
      ourValueData = mapOurValueData(rawData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Our Value - Mapped data:', {
          hasBanner: !!ourValueData?.banner,
          hasIntroSection: !!ourValueData?.introSection,
          valuesCount: ourValueData?.valuesOverview?.length || 0,
          hasVideoSection: !!ourValueData?.videoSection
        });
      }
    } else {
      error = 'No data received from Strapi API';
      console.error('Our Value - API returned empty response');
    }
  } catch (err) {
    error = err.message || 'Failed to fetch our value data from Strapi';
    console.error('Error fetching Our Value data from Strapi:', err);
    console.error('Error details:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  return <OurValuesContent data={ourValueData} error={error} />;
}

