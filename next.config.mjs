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
