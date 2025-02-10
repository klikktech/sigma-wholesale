/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sigmawholeimages.s3.us-east-2.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
