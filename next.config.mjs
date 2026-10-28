/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/dessert-shop",
  assetPrefix: "/dessert-shop/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
