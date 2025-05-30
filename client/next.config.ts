import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  /* config options here */ images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
