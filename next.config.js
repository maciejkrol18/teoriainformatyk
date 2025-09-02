require("dotenv").config({
  path: ".env.local",
});

const { withPlausibleProxy } = require("next-plausible");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.replace("https://", ""),
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      // TODO: Bandaid patches. Should store pfp's in the db or just ditch them
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "**/avatars/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  output: "standalone",
};

module.exports = withBundleAnalyzer(
  withPlausibleProxy({ customDomain: process.env.PLAUSIBLE_URL })({
    ...nextConfig,
  })
);
