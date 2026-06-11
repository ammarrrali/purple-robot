import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Web Apps, AI Automation, Mobile & Custom CRMs",
  description:
    "Our core capabilities: AI automation and LLM integration, scalable web application and SaaS development, native iOS & Android mobile apps, and data-driven custom CRM systems.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Codeeee Labs",
    description:
      "AI automation, web application & SaaS development, mobile apps, and custom CRM systems.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
