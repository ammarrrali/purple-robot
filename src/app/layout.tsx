import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/ui/site-footer"; // <--- Import
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://codeeee.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codeeee Labs — Software House in Karachi | Web Apps, AI & Mobile Development",
    template: "%s | Codeeee Labs",
  },
  description:
    "Codeeee Labs is a software house building custom web applications, AI automation, mobile apps, and CRM systems for clients in the US, UK, Canada, Europe, and worldwide. Senior engineering from Karachi at offshore rates.",
  keywords: [
    "software house Karachi",
    "offshore software development company",
    "outsource software development Pakistan",
    "web app development agency",
    "AI automation agency",
    "custom CRM development",
    "mobile app development agency",
    "Next.js development agency",
    "software development for US startups",
    "software development agency UK",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Codeeee Labs",
    title: "Codeeee Labs — Software House in Karachi",
    description:
      "Custom web applications, AI automation, mobile apps, and CRM systems. High-fidelity digital engineering from Karachi, Pakistan.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codeeee Labs — Software House in Karachi",
    description:
      "Custom web applications, AI automation, mobile apps, and CRM systems. High-fidelity digital engineering from Karachi, Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codeeee Labs",
  url: SITE_URL,
  email: "info@codeeee.com",
  telephone: "+923361287518",
  description:
    "Karachi-based software house building custom web applications, AI automation, mobile apps, and CRM systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923361287518",
    email: "info@codeeee.com",
    contactType: "sales",
    availableLanguage: ["English", "Urdu"],
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "China" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Pakistan" },
  ],
  sameAs: ["https://instagram.com/codeeeelabs"],
  knowsAbout: [
    "Web Application Development",
    "AI Automation",
    "Mobile App Development",
    "Custom CRM Systems",
    "SaaS Development",
    "Progressive Web Apps",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <SiteFooter /> {/* <--- Add Here */}
        <Analytics />
      </body>
    </html>
  );
}
