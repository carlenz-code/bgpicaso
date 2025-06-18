import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "https://back-sgce.onrender.com/user/login",
      },
    ];
  },
};

export default nextConfig;
