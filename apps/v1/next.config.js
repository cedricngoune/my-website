/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le contenu partagé est un paquet TypeScript du monorepo : Next le compile
  transpilePackages: ["@portfolio/content"],
};

module.exports = nextConfig;
