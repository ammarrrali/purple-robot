import type { Metadata } from "next";
import { services } from "@/content/services";

const SITE_URL = "https://codeeee.com";

export const metadata: Metadata = {
  title: "Custom Software Development Services",
  description:
    "Custom software development services for companies in the US, UK, Canada and Europe: AI automation and LLM integration, web application and SaaS development, native mobile apps, and bespoke CRM systems. Fixed-scope quotes, you own the code.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Custom Software Development Services — Codeeee Labs",
    description:
      "AI automation, web application & SaaS development, mobile apps, and custom CRM systems for US, UK and European companies.",
    url: "/services",
  },
};

// Hub pages carried no breadcrumb or list markup. Both are declared here, in
// the server layout, so the client page below stays free of schema plumbing.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Software development services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/services/${s.slug}`,
  })),
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
