/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
      ignoreDuringBuilds: true
   },
   node: {
      fs: "false"
   },
   typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
   },
   webpack5: true,
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
