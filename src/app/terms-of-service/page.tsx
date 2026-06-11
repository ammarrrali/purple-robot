import type { Metadata } from "next";
import Link from "next/link";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing the use of the Codeeee Labs website and the general framework for client engagements — IP ownership, confidentiality, and how projects are contracted.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "About These Terms",
    body: [
      "These terms govern your use of this website, operated by Codeeee Labs, Karachi, Pakistan. Client projects are governed by individual written agreements signed per engagement — where a project contract exists, it takes precedence over anything here.",
    ],
  },
  {
    heading: "Use of This Website",
    body: [
      "The content of this site — text, case studies, graphics, and code powering the experience — belongs to Codeeee Labs. You're welcome to read, share, and link to it. You may not scrape it wholesale, republish it as your own, or use it to train commercial products without permission.",
      "Case studies on this site describe real engagements with details anonymized to protect client confidentiality. Figures cited in articles and guides are illustrative market estimates, not binding quotes — actual project pricing is established in writing per engagement.",
    ],
  },
  {
    heading: "How Engagements Work",
    body: [
      "Every client project begins with a written scope and agreement covering deliverables, timeline, payment schedule, and confidentiality. As a standing policy: intellectual property in custom work transfers to the client upon payment, code lives in the client's own repositories, and either party can terminate per the contract's notice terms with the client keeping everything paid for.",
      "We treat client information as confidential by default — before, during, and after an engagement — and sign NDAs on request.",
    ],
  },
  {
    heading: "No Warranties on Website Content",
    body: [
      "Articles and guides on this site are provided in good faith for general information. They are not legal, financial, or contractual advice, and technology pricing and capabilities change quickly. Verify anything material to a decision, or better, ask us directly.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Codeeee Labs is not liable for indirect or consequential damages arising from use of this website. Liability in client engagements is defined in the respective project agreement.",
    ],
  },
  {
    heading: "Governing Law & Contact",
    body: [
      "These website terms are governed by the laws of Pakistan. Client agreements may specify a different governing law and jurisdiction as negotiated per engagement. Questions: info@codeeee.com or +92 336 1287518.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <article className="pt-32 pb-20 px-6 md:px-16 max-w-3xl mx-auto relative z-10">
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">Terms_of_Service</span>
        </nav>

        <header className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-500 block mb-4">
            LEGAL // LAST_UPDATED: 2026-06-11
          </span>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.95] text-white">
            Terms of Service
          </h1>
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
