import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "/a/**",
        },
        {
            protocol: "https",
            hostname: "cdn.sanity.io", // Correct hostname
            port: "",
            pathname: "/images/**",
            
        },
    ],
},
};

export default nextConfig;
