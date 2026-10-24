import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "",
  },
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
