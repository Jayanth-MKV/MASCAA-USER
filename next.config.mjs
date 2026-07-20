/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack: (config) => {
      config.resolve.fallback = {
         fs: false,
         net: false,
         dns: false,
         child_process: false,
         tls: false,
      };

      return config;
   },
};

export default nextConfig;
