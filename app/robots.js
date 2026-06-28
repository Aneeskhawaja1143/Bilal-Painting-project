import { SITE } from "@/lib/constants";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: SITE.url,
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}