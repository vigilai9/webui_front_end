/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    typescript: {
      ignoreBuildErrors: true, // Temporary during setup
    },
  };
  
  export default nextConfig;
