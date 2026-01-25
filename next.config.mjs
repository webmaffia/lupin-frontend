/** @type {import('next').NextConfig} */

// Helper function to parse Strapi URL and create remote pattern
function getStrapiImagePattern() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1380';
  
  try {
    const url = new URL(strapiUrl);
    const protocol = url.protocol.replace(':', '') || 'http';
    const hostname = url.hostname;
    
    // Build pattern object
    const pattern = {
      protocol,
      hostname,
      pathname: '/uploads/**',
    };
    
    // Only add port if it's not the default port
    const defaultPort = protocol === 'https' ? '443' : '80';
    if (url.port && url.port !== defaultPort) {
      pattern.port = url.port;
    }
    
    // Log pattern for debugging (will show in build logs)
    console.log(`[Next.js Config] Image remotePattern for Strapi:`, JSON.stringify(pattern, null, 2));
    console.log(`[Next.js Config] Strapi URL: ${strapiUrl}`);
    
    return pattern;
  } catch (error) {
    console.warn('Invalid NEXT_PUBLIC_STRAPI_URL, using default localhost pattern');
    return {
      protocol: 'http',
      hostname: '65.2.155.211',
      port: '1380',
      pathname: '/uploads/**',
    };
  }
}

const nextConfig = {
  // Add empty turbopack config to silence the warning
  turbopack: {},
  
  // Redirects for moved pages
  async redirects() {
    return [
      // About Us redirects
      {
        source: '/about-us/purpose',
        destination: '/about-us/our-purpose',
        permanent: true,
      },
      {
        source: '/leaders',
        destination: '/about-us/leadership',
        permanent: true,
      },
      {
        source: '/leaders/:slug*',
        destination: '/about-us/leadership/:slug*',
        permanent: true,
      },
      {
        source: '/leaders/:slug*',
        destination: '/about-us/leadership/:slug*',
        permanent: true,
      },
      {
        source: '/awards-and-recognition',
        destination: '/about-us/awards-and-recognition',
        permanent: true,
      },
      {
        source: '/global-technical-operations',
        destination: '/about-us/global-technical-operations',
        permanent: true,
      },
      // Our Business redirects
      {
        source: '/global-generics',
        destination: '/our-business/global-generics',
        permanent: true,
      },
      {
        source: '/branded-emerging-markets',
        destination: '/our-business/branded-emerging-markets',
        permanent: true,
      },
      {
        source: '/india',
        destination: '/our-business/india',
        permanent: true,
      },
      {
        source: '/patient-support-programs',
        destination: '/our-business/india/patient-support-programs',
        permanent: true,
      },
      {
        source: '/specialty',
        destination: '/our-business/specialty',
        permanent: true,
      },
      {
        source: '/biosimilars',
        destination: '/our-business/biosimilars',
        permanent: true,
      },
      {
        source: '/allied-business',
        destination: '/our-business/allied-business',
        permanent: true,
      },
      // Investors redirects
      {
        source: '/investors/committees',
        destination: '/investors/committees-of-the-board',
        permanent: true,
      },
      {
        source: '/investors/disclosure-under-regulation-46-of-sebi-regulations-2016',
        destination: '/investors/disclosure-under-regulation-46-of-sebi-regulations-2015',
        permanent: true,
      },
      {
        source: '/investors/saksham-niveshak',
        destination: '/investors/iepf-saksham-niveshak',
        permanent: true,
      },
      {
        source: '/investors/news-and-events',
        destination: '/investors/news-events',
        permanent: true,
      },
      {
        source: '/investors/notice',
        destination: '/investors/notices',
        permanent: true,
      },
      {
        source: '/investors/reports-and-filings',
        destination: '/investors/reports-filings',
        permanent: true,
      },
      {
        source: '/investors/transfer-physical-shares',
        destination: '/investors/transfer-of-physical-shares-re-lodgement',
        permanent: true,
      },
    ];
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp'],
    deviceSizes: [414, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      getStrapiImagePattern(),
      // Allow images from www.lupin.com
      {
        protocol: 'https',
        hostname: 'www.lupin.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  
  // Disable CSS modules for .scss files
  webpack(config) {
    // Find the rule that handles CSS modules
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      ?.oneOf?.filter((rule) => Array.isArray(rule.use));

    if (rules) {
      rules.forEach((rule) => {
        if (rule.use) {
          rule.use.forEach((moduleLoader) => {
            if (
              moduleLoader.loader?.includes('css-loader') &&
              moduleLoader.options?.modules
            ) {
              // Disable CSS modules for .scss files
              if (typeof moduleLoader.options.modules === 'object') {
                moduleLoader.options.modules.auto = (resourcePath) => {
                  // Only use CSS modules for .module.css and .module.scss
                  return /\.module\.(css|scss|sass)$/i.test(resourcePath);
                };
              }
            }
          });
        }
      });
    }

    return config;
  },
};

export default nextConfig;
