/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimisation — add external domains here if needed
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
  formats: ["image/avif", "image/webp"],
},

  // Compress responses for better performance
  compress: true,
};

module.exports = nextConfig;
