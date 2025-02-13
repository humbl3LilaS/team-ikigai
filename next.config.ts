import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: { unoptimized: true,
        remotePatterns: [{
            hostname: "https://robohash.org",
        }],
    },
};

export default nextConfig;
