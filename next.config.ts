import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ed.hub.revmaorg.gr"],
  },
  i18n: {
    locales: ['en', 'el'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

export default nextConfig;
