import MediaKitClient from './MediaKitClient';
import { getMediaKit, getStrapiMedia } from '@/lib/strapi';
import { getStrapiImageUrl } from '@/lib/strapi-utils';

export default async function MediaKitPage() {
  // Fetch all media-kit articles
  let allMediaKitData = [];

  try {
    const mediaKitResponse = await getMediaKit(100);
    const articles = mediaKitResponse?.data || [];

    // Separate into profiles and PDFs based on article structure
    const profilesData = [];
    const pdfsData = [];

    articles.forEach((article) => {
      // Get PDF/link URL
      let pdfUrl = null;
      if (article.pdf || article.Pdf) {
        const pdf = article.pdf || article.Pdf;
        const pdfData = pdf?.data?.attributes || pdf;
        pdfUrl = pdfData?.url ? getStrapiMedia(pdfData) : (pdf?.url || null);
      } else if (article.link) {
        pdfUrl = article.link;
      }

      // Get image URL if available
      let imageUrl = null;
      if (article.image) {
        imageUrl = getStrapiImageUrl(article.image) || getStrapiMedia(article.image);
      }
      // Fallback to default image if no image in article
      if (!imageUrl) {
        imageUrl = "/assets/media-kit-card/demo4.png";
      }

      const title = article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '';
      const excerpt = article.excerpt?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '';

      // If article has excerpt (like "Chief Executive Officer"), it's a profile
      // Otherwise, it's a PDF/document
      if (excerpt && pdfUrl) {
        // This is a profile card
        profilesData.push({
          id: article.id,
          name: title,
          title: excerpt,
          link: pdfUrl,
          image: imageUrl
        });
      } else if (pdfUrl) {
        // This is a PDF download
        pdfsData.push({
          id: article.id,
          title: title || 'Document',
          pdfUrl: pdfUrl,
          image: imageUrl,
          imageAlt: title || 'PDF Download'
        });
      }
    });

    allMediaKitData = {
      profiles: profilesData,
      pdfs: pdfsData
    };
  } catch (error) {
    console.error('Error fetching media kit articles from Strapi:', error);
    // Fallback to empty arrays
    allMediaKitData = {
      profiles: [],
      pdfs: []
    };
  }

  return <MediaKitClient initialProfiles={allMediaKitData.profiles} initialPdfs={allMediaKitData.pdfs} />;
}

