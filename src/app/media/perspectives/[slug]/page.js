import InnerBanner from '@/components/InnerBanner';
import PressReleaseDetail from '@/components/PressReleaseDetail';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getArticle, getStrapiMedia } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import '@/scss/pages/press-release-detail.scss';

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export async function generateMetadata({ params }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lupin.com';

  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
      return generateSEOMetadata({
        title: "Perspective - Lupin | Corporate Communications",
        description: "Read insights and perspectives from the leading minds in our industry.",
        canonicalUrl: `${siteUrl}/media/perspectives/${slug || ''}`,
        keywords: "Lupin perspectives, industry insights, Lupin Limited",
      });
    }

    const article = await getArticle(slug);

    if (!article) {
      return generateSEOMetadata({
        title: "Perspective - Lupin | Corporate Communications",
        description: "Read insights and perspectives from the leading minds in our industry.",
        canonicalUrl: `${siteUrl}/media/perspectives/${slug}`,
        keywords: "Lupin perspectives, industry insights, Lupin Limited",
      });
    }

    const title = article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || 'Perspective';
    const excerpt = article.excerpt?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '';

    return generateSEOMetadata({
      title: `${title} - Lupin | Perspective`,
      description: excerpt || "Read insights and perspectives from the leading minds in our industry.",
      canonicalUrl: `${siteUrl}/media/perspectives/${slug}`,
      keywords: "Lupin perspectives, industry insights, Lupin Limited",
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || '';
    return generateSEOMetadata({
      title: "Perspective - Lupin | Corporate Communications",
      description: "Read insights and perspectives from the leading minds in our industry.",
      canonicalUrl: `${siteUrl}/media/perspectives/${slug}`,
      keywords: "Lupin perspectives, industry insights, Lupin Limited",
    });
  }
}

export default async function PerspectiveDetailPage({ params }) {
  let perspectiveData = null;

  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
      console.warn('No slug provided in params');
      notFound();
    }

    const article = await getArticle(slug);

    if (!article) {
      console.warn(`Article not found for slug: ${slug}`);
      notFound();
    }

    // Get author image from media field if available
    let authorImage = null;
    if (article.media) {
      authorImage = getStrapiMedia(article.media);
    }
    // Fallback to default if no media
    if (!authorImage) {
      authorImage = "/assets/press/Image.png";
    }

    perspectiveData = {
      title: article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '',
      date: formatDate(article.publishedOn || article.publishedAt),
      author: {
        name: article.author?.name || article.author?.username || '',
        image: authorImage
      },
      content: article.content || '',
      activeCategory: 'perspectives'
    };
  } catch (error) {
    console.error('Error fetching perspective from Strapi:', error);
    // Only call notFound if it's a real error, not just missing data
    notFound();
  }

  const bannerData = {
    title: {
      line1: "Perspectives",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Perspectives"
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
      <PressReleaseDetail data={perspectiveData} />
    </div>
  );
}

