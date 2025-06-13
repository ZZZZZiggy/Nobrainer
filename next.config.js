/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["src/app", "src/components", "src/lib"], // Only lint these directories
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // Optimize bundle size
    optimizePackageImports: ["lucide-react"],
  },
  // Exclude generated files from webpack processing
  webpack: (config, { dev, isServer }) => {
    // Ignore generated prisma files during webpack processing
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/src/generated/**",
        "**/prisma/migrations/**",
        "**/*.wasm.js",
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
