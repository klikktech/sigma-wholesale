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
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          pathname: '**',
        },
      ],
    },
    compiler: {
      styledComponents: true,
    },
};


export default nextConfig;
