import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
