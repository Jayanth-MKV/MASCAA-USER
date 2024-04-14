/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
       ignoreDuringBuilds:true
    },
    node: {
        fs:"false"
     },
     typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
