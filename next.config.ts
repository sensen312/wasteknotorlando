import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/wasteknotorlando" : "",
  assetPrefix: isProd ? "/wasteknotorlando/" : "",
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
