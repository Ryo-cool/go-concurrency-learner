import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monaco Editorの設定
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
