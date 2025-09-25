import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables lint blocking during build
  },
};

export default nextConfig;

