/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["sanity", "next-sanity", "@sanity/ui", "@portabletext/react"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**"
      }
    ],
    minimumCacheTTL: 60
  },
  compiler: {
    styledComponents: true
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}"
    }
  }
};

export default nextConfig;
