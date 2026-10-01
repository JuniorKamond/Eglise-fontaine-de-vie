import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Les anciennes adresses continuent de fonctionner
  async redirects() {
    return [
      { source: "/inscription", destination: "/planifier-une-visite", permanent: true },
      { source: "/visit-planner", destination: "/planifier-une-visite", permanent: true },
    ];
  },
};

export default nextConfig;
