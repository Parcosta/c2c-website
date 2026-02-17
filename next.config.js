/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  transpilePackages: ["sanity", "next-sanity", "@sanity/ui", "@portabletext/react"]
};

export default nextConfig;
