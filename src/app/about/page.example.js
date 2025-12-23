// Example: About page with custom SEO
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

// Generate metadata for the About page
export const metadata = generateSEOMetadata({
  title: "About Us - Lupin | Our Story & Mission",
  description: "Learn about Lupin's journey as a global pharmaceutical leader, our mission to improve lives, and our commitment to innovation and healthcare excellence.",
  canonicalUrl: "https://www.lupin.com/about",
  keywords: "Lupin about, pharmaceutical company history, healthcare mission, Lupin story",
});

export default function AboutPage() {
  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ]);

  return (
    <>
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div>
        <h1>About Us</h1>
        {/* Your page content */}
      </div>
    </>
  );
}
