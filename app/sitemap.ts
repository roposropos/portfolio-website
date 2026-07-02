import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    {
      url: `${siteUrl}/pl`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date("2026-07-02"),
      changeFrequency: "monthly",
      priority: 0.95
    }
  ];
}
