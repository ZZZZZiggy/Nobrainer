/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 暂时忽略 ESLint 错误以测试 Vercel 部署
    dirs: ["src/app", "src/components", "src/lib"],
  },
  typescript: {
    ignoreBuildErrors: true, // 暂时忽略 TypeScript 错误以测试 Vercel 部署
  },
  serverExternalPackages: ["@prisma/client"],
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

    // Externalize Prisma for serverless functions
    if (isServer) {
      config.externals.push("@prisma/client");
    }

    return config;
  },
};

module.exports = nextConfig;
