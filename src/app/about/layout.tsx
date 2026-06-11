import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — A Karachi Software House Built for High-Fidelity Engineering",
  description:
    "Codeeee Labs is a software development studio in Karachi, Pakistan, engineering custom web applications, AI automation, mobile apps, and CRM systems with a focus on performance and design.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Codeeee Labs",
    description:
      "A Karachi software house engineering custom web apps, AI automation, mobile apps, and CRMs.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
