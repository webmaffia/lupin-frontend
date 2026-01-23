import AwardsAndRecognitionClient from './AwardsAndRecognitionClient';
import { getAwardsAndRecognition, getStrapiMedia } from '@/lib/strapi';

export default async function AwardsAndRecognitionPage() {
  // Fetch awards and recognition from Strapi
  let awardsData = [];

  try {
    const awardsResponse = await getAwardsAndRecognition(100); // Fetch all for year filtering
    const articles = awardsResponse?.data || [];

    awardsData = articles.map((article) => {
      // Get image URL from media field if available
      let imageUrl = null;
      if (article.media) {
        imageUrl = getStrapiMedia(article.media);
      }
      // Fallback to default image if no media in article
      if (!imageUrl) {
        imageUrl = "/assets/media-kit-card/demo5.png";
      }

      return {
        id: article.id,
        title: article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '',
        image: imageUrl,
        imagePosition: "bottom",
        publishedOn: article.publishedOn || null,
        publishedAt: article.publishedAt || null
      };
    });
  } catch (error) {
    console.error('Error fetching awards and recognition from Strapi:', error);
    // Fallback to empty array - component will handle gracefully
  }

  return <AwardsAndRecognitionClient initialData={awardsData} />;
}
