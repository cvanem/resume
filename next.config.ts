import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the PDF renderer out of the bundle; it runs in the /api/resume
  // route handler at request time.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
