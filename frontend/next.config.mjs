/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sigmawholesaleimages.s3.us-east-2.amazonaws.com',
          pathname: '**',
        },
      ],
    },
    compiler: {
      // ssr and displayName are configured by default
      styledComponents: true,
    },
};


export default nextConfig;
