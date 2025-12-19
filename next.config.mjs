/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add empty turbopack config to silence the warning
  turbopack: {},
  
  // Image optimization settings
  images: {
    formats: ['image/webp'],
    deviceSizes: [414, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
