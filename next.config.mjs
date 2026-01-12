/** @type {import('next').NextConfig} */

// Helper function to parse Strapi URL and create remote pattern
function getStrapiImagePattern() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1380';

  try {
    const url = new URL(strapiUrl);
    const protocol = url.protocol.replace(':', '') || 'http';
    const hostname = url.hostname;

    const pattern = {
      protocol,
      hostname,
      pathname: '/uploads/**',
    };

    // Add port only if non-default
    const defaultPort = protocol === 'https' ? '443' : '80';
    if (url.port && url.port !== defaultPort) {
      pattern.port = url.port;
    }

    console.log('[Next.js Config] Strapi Image Pattern:', pattern);
    return pattern;
  } catch (error) {
    console.warn(
      '[Next.js Config] Invalid NEXT_PUBLIC_STRAPI_URL, falling back to default'
    );
    return {
      protocol: 'http',
      hostname: '65.2.155.211',
      port: '1380',
      pathname: '/uploads/**',
    };
  }
}

const nextConfig = {
  /**
   * REQUIRED FOR AZURE + PIPELINE
   * This generates `.next/standalone/server.js`
   */
  output: 'standalone',

  /**
   * Silence turbopack warning
   */
  turbopack: {},

  /**
   * Image optimization (Strapi CMS)
   */
  images: {
    formats: ['image/webp'],
    deviceSizes: [414, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [getStrapiImagePattern()],
  },

  /**
   * SCSS + CSS Modules control
   */
  webpack(config) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      ?.oneOf?.filter((rule) => Array.isArray(rule.use));

    if (rules) {
      rules.forEach((rule) => {
        rule.use?.forEach((loader) => {
          if (
            loader.loader?.includes('css-loader') &&
            loader.options?.modules
          ) {
            if (typeof loader.options.modules === 'object') {
              loader.options.modules.auto = (resourcePath) =>
                /\.module\.(css|scss|sass)$/i.test(resourcePath);
            }
          }
        });
      });
    }

    return config;
  },
};

export default nextConfig;
