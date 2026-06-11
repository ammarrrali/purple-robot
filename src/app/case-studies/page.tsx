import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Software Projects for US, UK, Canada & European Clients",
  description:
    "Detailed case studies from Codeeee Labs: SaaS platforms, logistics CRMs, WebGL experiences, and progressive web apps built for clients in the US, UK, Canada, and Europe.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Codeeee Labs",
    description:
      "SaaS platforms, logistics CRMs, WebGL experiences, and PWAs built for international clients.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <h1 className="text-[12vw] md:text-[6vw] font-black leading-[0.8] tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
            CASE_STUDIES
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-[1px] w-20 bg-purple-600" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Field_Reports // US_UK_CA_EU
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-gray-400 leading-relaxed">
            Detailed write-ups of how we engineer software for clients across the United
            States, United Kingdom, Canada, Europe, and the Gulf — what the problem was,
            what we built, and what it changed.
          </p>
        </div>

        {/* Case study list */}
        <div className="flex flex-col gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group relative rounded-3xl border border-white/10 bg-[#0a0a0a] hover:border-purple-500/50 transition-all p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-purple-500 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest">{cs.category}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">// {cs.region}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white group-hover:text-purple-100 transition-colors mb-4">
                  {cs.title.split(" — ")[0]}
                </h2>
                <p className="text-xs text-gray-400 font-mono leading-relaxed border-l-2 border-purple-500/20 pl-4 group-hover:border-purple-500 transition-colors">
                  {cs.summary}
                </p>
                <div className="flex gap-2 flex-wrap mt-5">
                  {cs.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-gray-300 uppercase tracking-wider font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 group-hover:text-white group-hover:border-purple-500/50 transition-colors self-start md:self-center">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
