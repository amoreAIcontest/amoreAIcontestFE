import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'down-sg.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'down-bs-sg.vod.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'down-zl-sg.vod.susercontent.com',
      },
    ],
  },
};

export default nextConfig;
