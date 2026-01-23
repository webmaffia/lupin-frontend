import PressReleasesClient from './PressReleasesClient';
import { getPressReleases } from '@/lib/strapi';

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Helper function to split title into headline array (max 4 lines)
function splitTitleIntoHeadline(title) {
  if (!title) return [];

  // Remove HTML entities and tags
  const cleanTitle = title
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]*>/g, '')
    .trim();

  // Split by words
  const words = cleanTitle.split(' ');
  const lines = [];
  let currentLine = '';

  // Try to create lines of roughly equal length
  const avgWordsPerLine = Math.ceil(words.length / 4);

  for (let i = 0; i < words.length; i++) {
    if (currentLine && (currentLine.split(' ').length >= avgWordsPerLine || i === words.length - 1)) {
      lines.push(currentLine.trim());
      currentLine = words[i];
    } else {
      currentLine += (currentLine ? ' ' : '') + words[i];
    }
  }

  if (currentLine) {
    lines.push(currentLine.trim());
  }

  // Limit to 4 lines
  return lines.slice(0, 4);
}

export default async function PressReleasesPage() {
  // Fetch press releases from Strapi
  let pressReleasesData = [];

  try {
    // Fetch all press releases (handles pagination automatically if > 100 records)
    const pressReleasesResponse = await getPressReleases(100); // Will fetch all pages if needed
    const articles = pressReleasesResponse?.data || [];

    pressReleasesData = articles.map((article) => ({
      id: article.id,
      date: formatDate(article.publishedOn || article.publishedAt),
      headline: splitTitleIntoHeadline(article.title),
      category: "Press Releases",
      href: `/media/press-releases/${article.slug}`,
      // Add raw data for search and filtering
      title: article.title || '',
      slug: article.slug || '',
      publishedOn: article.publishedOn || null,
      publishedAt: article.publishedAt || null
    }));
  } catch (error) {
    console.error('Error fetching press releases from Strapi:', error);
    // Fallback to empty array - component will handle gracefully
  }

  return <PressReleasesClient initialData={pressReleasesData} />;
}

