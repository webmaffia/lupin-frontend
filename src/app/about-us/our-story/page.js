import OurStoryContent from '@/components/OurStoryContent';
import { getOurStory, mapOurStoryData } from '@/lib/strapi-pages';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import '@/scss/pages/our-story.scss';

// Generate metadata for the our-story page
export const metadata = generateSEOMetadata({
  title: "Our Story - Lupin | Five Decades of Transforming Healthcare",
  description: "Discover Lupin's journey from a small pharmaceutical company in 1968 to a global leader in healthcare. Learn about our milestones, innovations, and commitment to making quality medicines accessible worldwide.",
  canonicalUrl: "https://www.lupin.com/about-us/our-story",
  keywords: "Lupin history, pharmaceutical company story, Lupin journey, healthcare transformation, pharmaceutical milestones, Lupin Limited history",
});

export default async function OurStoryPage() {
  let ourStoryData = null;
  let error = null;
  
  try {
    const rawData = await getOurStory();
    
    if (rawData) {
      ourStoryData = mapOurStoryData(rawData);
    } else {
      error = 'No data received from Strapi API';
    }
  } catch (err) {
    error = err.message || 'Failed to fetch our story data from Strapi';
    console.error('Error fetching Our Story data from Strapi:', err);
  }

  return <OurStoryContent data={ourStoryData} error={error} />;
}

