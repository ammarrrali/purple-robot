import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join Codeeee Labs",
  description:
    "Work with Codeeee Labs, a Karachi-based software house building custom web apps, AI automation, mobile apps, and CRM systems for international clients. Send us your application.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — Codeeee Labs",
    description:
      "Join a senior engineering team building software for clients in the US, UK, Canada, and Europe.",
    url: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
