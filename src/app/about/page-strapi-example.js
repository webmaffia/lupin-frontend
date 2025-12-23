/**
 * COMPLETE STRAPI-FRIENDLY PAGE EXAMPLE
 * Copy this pattern for any page that needs Strapi data
 */

import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { mapStrapiSEO, fetchStrapiPage } from '@/lib/strapi-utils';

// ============================================
// METADATA GENERATION (Required for SEO)
// ============================================

export async function generateMetadata() {
  try {
    // Fetch page data from Strapi
    const pageData = await fetchStrapiPage('about'); // Change slug as needed
    
    // Map Strapi SEO data to our format
    const seoData = mapStrapiSEO(
      pageData?.attributes?.seo,
      'https://www.lupin.com/about', // Canonical URL
      {
        // Fallback values if Strapi data is missing
        title: 'About Us - Lupin',
        description: 'Learn about Lupin\'s mission, vision, and values.',
        keywords: 'Lupin, about us, pharmaceutical company',
      }
    );

    // Generate Next.js metadata
    return generateSEOMetadata(seoData);
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);

    // Fallback metadata if Strapi is unavailable
    return generateSEOMetadata({
      title: 'About Us - Lupin',
      description: 'Learn about Lupin\'s mission, vision, and values.',
      canonicalUrl: 'https://www.lupin.com/about',
    });
  }
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function AboutPage() {
  let pageData = null;

  try {
    // Fetch page data from Strapi
    pageData = await fetchStrapiPage('about');
  } catch (error) {
    console.error('Error fetching page data:', error);
  }

  // If no data from Strapi, show fallback
  if (!pageData) {
    return (
      <div>
        <h1>About Us</h1>
        <p>Content is loading...</p>
      </div>
    );
  }

  const { title, content, seo } = pageData.attributes;

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

// ============================================
// ALTERNATIVE: DYNAMIC ROUTE EXAMPLE
// ============================================

/**
 * For dynamic routes like /blog/[slug]
 * File: app/blog/[slug]/page.js
 */

export async function generateMetadataDynamic({ params }) {
  try {
    // Fetch article from Strapi
    const article = await fetchStrapiPage(params.slug, 'articles'); // Different content type
    
    // Map SEO data
    const seoData = mapStrapiSEO(
      article?.attributes?.seo,
      `https://www.lupin.com/blog/${params.slug}`,
      {
        title: article?.attributes?.title || 'Blog Post',
        description: article?.attributes?.excerpt || 'Read our latest insights',
        keywords: article?.attributes?.tags?.join(', '),
      }
    );

    return generateSEOMetadata(seoData);
  } catch (error) {
    console.error('Error fetching article metadata:', error);

    return generateSEOMetadata({
      title: 'Blog Post - Lupin',
      description: 'Read our latest insights',
      canonicalUrl: `https://www.lupin.com/blog/${params.slug}`,
    });
  }
}

export async function generateStaticParams() {
  try {
    // Fetch all articles to generate static pages
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?fields=slug`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    
    return data.data.map((article) => ({
      slug: article.attributes.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const article = await fetchStrapiPage(params.slug, 'articles');

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article>
      <h1>{article.attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.attributes.content }} />
    </article>
  );
}

// ============================================
// SIMPLIFIED VERSION (ONE-LINER)
// ============================================

/**
 * Super simple version using the helper function
 */

import { generateStrapiPageMetadata } from '@/lib/strapi-utils';

export const metadata = await generateStrapiPageMetadata(
  'about', // slug
  'https://www.lupin.com', // base URL
  {
    title: 'About Us - Lupin',
    description: 'Learn about Lupin',
  }
);
