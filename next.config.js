/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.clerk.com",
      "images.clerk.dev",
      "uploadthing.com",
      "placehold.co",
    ],
  },
};

module.exports = nextConfig;
