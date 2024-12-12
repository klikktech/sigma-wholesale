/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sigmaimages.s3.us-east-2.amazonaws.com',
          pathname: '**',
        },
      ],
    },
    compiler: {
      styledComponents: true,
    },
    webpack: (config, { isServer }) => {
      // Increase the timeout value (in milliseconds)
      config.watchOptions = {
        aggregateTimeout: 5000, // Default is 20
        poll: 1000, // Check for changes every second
      }
      return config
    },
};


export default nextConfig;
