import PerspectivesClient from './PerspectivesClient';
import { getPerspectives } from '@/lib/strapi';
import { getStrapiImageUrl } from '@/lib/strapi-utils';
import { getStrapiMedia } from '@/lib/strapi';

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default async function PerspectivesPage() {
  // Fetch perspectives from Strapi
  let perspectivesData = [];

  try {
    const perspectivesResponse = await getPerspectives(100); // Fetch more for listing page
    const articles = perspectivesResponse?.data || [];

    perspectivesData = articles.map((article) => {
      // Get image URL if available
      let imageUrl = null;
      if (article.image) {
        imageUrl = getStrapiImageUrl(article.image) || getStrapiMedia(article.image);
      }
      // Fallback to default image if no image in article
      if (!imageUrl) {
        imageUrl = "/assets/media-kit-card/demo2.png";
      }

      return {
        id: article.id,
        name: formatDate(article.publishedOn || article.publishedAt),
        title: article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '',
        image: imageUrl,
        imagePosition: "bottom-right",
        showArrow: false,
        link: `/media/perspectives/${article.slug}`
      };
    });
  } catch (error) {
    console.error('Error fetching perspectives from Strapi:', error);
    // Fallback to empty array - component will handle gracefully
  }

  return <PerspectivesClient initialData={perspectivesData} />;
}

