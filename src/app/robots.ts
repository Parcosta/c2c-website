import type { MetadataRoute } from "next";

import { resolveUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio"]
      }
    ],
    sitemap: resolveUrl("/sitemap.xml").toString()
  };
}
