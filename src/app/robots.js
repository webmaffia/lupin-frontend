// Dynamic robots.txt for Next.js
// This generates a robots.txt automatically

export default function robots() {
  const baseUrl = 'https://www.lupin.com'; // Update with your actual domain

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
