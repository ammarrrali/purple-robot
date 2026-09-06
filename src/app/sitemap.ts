import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";

const SITE_URL = "https://codeeee.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/careers`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: c.date,
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  // Blog posts were missing from the sitemap entirely — they are the closest
  // thing the site has to rankable bottom-of-funnel content.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
