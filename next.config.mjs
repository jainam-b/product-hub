/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.dummyjson.com',
          port: '',
          pathname: '/products/**',  // Update the path to allow images from this directory
        },
      ],
    },
  };
  
  export default nextConfig;
  