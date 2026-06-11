import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Projects & Case Studies",
  description:
    "Selected work by Codeeee Labs: immersive WebGL experiences, enterprise logistics CRMs, scalable multi-tenant SaaS platforms, and high-performance progressive web apps.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Codeeee Labs",
    description:
      "Immersive WebGL experiences, enterprise CRMs, SaaS platforms, and progressive web apps.",
    url: "/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
