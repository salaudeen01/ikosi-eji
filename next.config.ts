import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint during `next build`
  },
  reactStrictMode: true,
};

export default nextConfig;
