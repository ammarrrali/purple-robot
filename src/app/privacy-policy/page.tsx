import type { Metadata } from "next";
import Link from "next/link";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Codeeee Labs collects, uses, and protects personal data — covering website visitors and clients in the US, UK, Canada, the EU, and worldwide.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "What We Collect",
    body: [
      "When you contact us through this website, we collect the information you choose to provide: your name, email address, and the contents of your message. We do not require accounts and we do not collect payment information through this site.",
      "Like most websites, our hosting infrastructure records standard technical logs (IP address, browser type, pages visited) for security and performance monitoring. If analytics are enabled, we use them in aggregate to understand which pages are useful — not to profile individuals.",
    ],
  },
  {
    heading: "How We Use It",
    body: [
      "We use your contact details for exactly one purpose: responding to your inquiry and, if you become a client, delivering the work you've engaged us for. We do not sell, rent, or share your personal data with third parties for marketing. We do not send newsletters unless you explicitly ask for ongoing updates.",
    ],
  },
  {
    heading: "Client Project Data",
    body: [
      "Clients often share business data with us during projects — documents, databases, credentials. This data is handled under the confidentiality terms of the project contract: access limited to team members working on your project, credentials stored in a password manager (never in code or chat), and everything returned or destroyed at your direction when the engagement ends. For clients subject to GDPR or similar regimes, we sign data processing agreements on request.",
    ],
  },
  {
    heading: "International Visitors & GDPR",
    body: [
      "Codeeee Labs is based in Karachi, Pakistan, and serves clients in the United States, United Kingdom, Canada, the European Union, and worldwide. If you are in the EU/UK, you have the right to access, correct, export, or request deletion of personal data we hold about you. To exercise any of these rights, email info@codeeee.com — we respond within 30 days and there is no fee.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This website works without tracking cookies. If analytics are active, they may set a minimal cookie to distinguish visits; no advertising or cross-site tracking cookies are used.",
    ],
  },
  {
    heading: "Retention & Security",
    body: [
      "Contact inquiries are retained for as long as needed to handle the conversation and for reasonable business records, after which they are deleted. Data in transit to this site is encrypted via HTTPS.",
    ],
  },
  {
    heading: "Changes & Contact",
    body: [
      "If this policy changes, the updated version will be posted on this page with a revised date. Questions, concerns, or data requests: info@codeeee.com or +92 336 1287518.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <article className="pt-32 pb-20 px-6 md:px-16 max-w-3xl mx-auto relative z-10">
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">Privacy_Policy</span>
        </nav>

        <header className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-500 block mb-4">
            LEGAL // LAST_UPDATED: 2026-06-11
          </span>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.95] text-white">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-gray-400 leading-relaxed border-l-2 border-purple-500/30 pl-4">
            The short version: we collect only what you send us, we use it only to respond
            to you, and we never sell it. The longer version follows.
          </p>
        </header>

        {sections.map((s) => (
          <section key={s.heading} className="mb-12">
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white mb-5">
              <span className="text-purple-500 mr-2">//</span>
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sm text-gray-400 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
