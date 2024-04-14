/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
       ignoreDuringBuilds:true
    },
    node: {
        fs:"false"
     },
     ignoreBuildErrors: true,
};

export default nextConfig;
