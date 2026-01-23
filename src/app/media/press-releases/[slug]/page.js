import InnerBanner from '@/components/InnerBanner';
import PressReleaseDetail from '@/components/PressReleaseDetail';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getArticle } from '@/lib/strapi';
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
        title: "Press Release - Lupin | Corporate Communications",
        description: "Read the latest press releases and corporate communications from Lupin Limited.",
        canonicalUrl: `${siteUrl}/media/press-releases/${slug || ''}`,
        keywords: "Lupin press release, corporate communications, Lupin Limited",
      });
    }

    const article = await getArticle(slug);

    if (!article) {
      return generateSEOMetadata({
        title: "Press Release - Lupin | Corporate Communications",
        description: "Read the latest press releases and corporate communications from Lupin Limited.",
        canonicalUrl: `${siteUrl}/media/press-releases/${slug}`,
        keywords: "Lupin press release, corporate communications, Lupin Limited",
      });
    }

    const title = article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || 'Press Release';
    const excerpt = article.excerpt?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '';

    return generateSEOMetadata({
      title: `${title} - Lupin | Press Release`,
      description: excerpt || "Read the latest press releases and corporate communications from Lupin Limited.",
      canonicalUrl: `${siteUrl}/media/press-releases/${slug}`,
      keywords: "Lupin press release, corporate communications, Lupin Limited",
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || '';
    return generateSEOMetadata({
      title: "Press Release - Lupin | Corporate Communications",
      description: "Read the latest press releases and corporate communications from Lupin Limited.",
      canonicalUrl: `${siteUrl}/media/press-releases/${slug}`,
      keywords: "Lupin press release, corporate communications, Lupin Limited",
    });
  }
}

export default async function PressReleaseDetailPage({ params }) {
  let pressReleaseData = null;

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

    pressReleaseData = {
      title: article.title?.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/<[^>]*>/g, '') || '',
      date: formatDate(article.publishedOn || article.publishedAt),
      author: {
        name: article.author?.name || article.author?.username || '',
        image: null // Don't show profile image for press releases
      },
      content: article.content || '',
      activeCategory: 'press-releases'
    };
  } catch (error) {
    console.error('Error fetching press release from Strapi:', error);
    // Only call notFound if it's a real error, not just missing data
    notFound();
  }

  const bannerData = {
    title: {
      line1: "Press Releases",
      line2: ""
    },
    images: {
      banner: {
        url: "/assets/inner-banner/freepik-enhance-42835.jpg",
        alt: "Press Releases"
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
      <PressReleaseDetail data={pressReleaseData} />
    </div>
  );
}

