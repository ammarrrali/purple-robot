import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/ui/site-footer"; // <--- Import
import { Analytics } from "@/components/analytics";

// Display serif for headings — editorial, characterful, mature.
const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Body sans — professional and highly legible (not Inter/Geist).
const fontSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Mono — reserved for small technical labels only.
const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Hero wordmark only — the heavy geometric sans the "CODEEEE LABS" lockup uses.
const fontHero = Geist({
  variable: "--font-hero",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://codeeee.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Custom Software Development for US, UK & European Companies | Codeeee Labs",
    template: "%s | Codeeee Labs",
  },
  description:
    "Codeeee Labs is a software house building custom web applications, AI automation, mobile apps, and CRM systems for clients in the US, UK, Canada, Europe, and worldwide. Senior engineering from Karachi at offshore rates.",
  keywords: [
    "custom software development company",
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
    title: "Custom Software Development for US, UK & European Companies",
    description:
      "Custom web applications, AI automation, mobile apps, and CRM systems. Senior engineering at offshore rates — you own the code from the first commit.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development for US, UK & European Companies",
    description:
      "Custom web applications, AI automation, mobile apps, and CRM systems. Senior engineering at offshore rates — you own the code from the first commit.",
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
  // Entity consistency: every profile Codeeee owns should be listed here.
  // Add each URL as the profile is claimed — LinkedIn, GitHub, Clutch,
  // GoodFirms and Crunchbase are the ones that matter for a software house.
  sameAs: ["https://instagram.com/codeeeelabs"],
  knowsAbout: [
    "Custom ERP Systems",
    "Freight Forwarding Software",
    "Road Transport and Fleet Software",
    "Custom CRM Systems",
    "Web Application Development",
    "Mobile App Development",
    "AI Automation",
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
        className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} ${fontHero.variable} antialiased`}
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
