import type { Metadata } from "next";

const SITE_URL = "https://codeeee.com";

export const metadata: Metadata = {
  title: "Contact — Get a Fixed-Scope Project Estimate",
  description:
    "Tell us what you are building and we will reply within one business day with an honest scope, timeline and fixed-scope estimate. WhatsApp, email or a 30-minute call — for clients in the US, UK, Europe and the Gulf.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Codeeee Labs",
    description:
      "Project inquiries & consultation. Email info@codeeee.com or call +92 336 1287518.",
    url: "/contact",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  name: "Contact Codeeee Labs",
  mainEntity: {
    "@type": "Organization",
    name: "Codeeee Labs",
    url: SITE_URL,
    email: "info@codeeee.com",
    telephone: "+923361287518",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
