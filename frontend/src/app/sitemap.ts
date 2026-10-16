import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studyo.vercel.app"; // ⚠️ Baad mein apna domain daalo
  const now = new Date();

  const tools = [
    "/pdf-merge",
    "/pdf-compress",
    "/image-compressor",
    "/citation-generator",
    "/word-counter",
    "/gpa-calculator",
  ];

  const companyPages = [
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const toolEntries = tools.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const companyEntries = companyPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolEntries,
    ...companyEntries,
  ];
}