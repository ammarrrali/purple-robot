import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Get a Project Estimate",
  description:
    "Get in touch with Codeeee Labs for project inquiries or architectural consultation. Email info@codeeee.com or call +92 336 1287518. Based in Karachi, Pakistan.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Codeeee Labs",
    description:
      "Project inquiries & consultation. Email info@codeeee.com or call +92 336 1287518.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
