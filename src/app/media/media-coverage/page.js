import MediaCoverageClient from './MediaCoverageClient';
import { getMediaCoverage } from '@/lib/strapi';
import { getStrapiImageUrl } from '@/lib/strapi-utils';
import { getStrapiMedia } from '@/lib/strapi';

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default async function MediaCoveragePage() {
  // Fetch media coverage from Strapi
  let mediaCoverageData = [];

  try {
    const mediaCoverageResponse = await getMediaCoverage(100); // Fetch more for listing page
    const articles = mediaCoverageResponse?.data || [];

    mediaCoverageData = articles.map((article) => {
      // Get image URL if available
      let imageUrl = null;
      if (article.image) {
        imageUrl = getStrapiImageUrl(article.image) || getStrapiMedia(article.image);
      }
      // Fallback to default image if no image in article
      if (!imageUrl) {
        imageUrl = "/assets/media-kit-card/demo5.png";
      }

      // Check if article has video link
      const videoLink = article.video || article.videoLink || null;
      const link = videoLink ? null : `/media/media-coverage/${article.slug}`;

      return {
        id: article.id,
        name: formatDate(article.publishedOn || article.publishedAt) || article.title,
        title: article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '',
        image: imageUrl,
        imagePosition: "bottom-right",
        showArrow: false,
        link: link,
        videoLink: videoLink,
        date: formatDate(article.publishedOn || article.publishedAt)
      };
    });
  } catch (error) {
    console.error('Error fetching media coverage from Strapi:', error);
    // Fallback to empty array - component will handle gracefully
  }

  return <MediaCoverageClient initialData={mediaCoverageData} />;
}

