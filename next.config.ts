import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cunitsLD",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
