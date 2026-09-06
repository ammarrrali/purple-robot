'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import DisplayCards from '@/components/ui/display-cards';
import { Cpu, Globe, Smartphone, Database, ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/content/case-studies';

// --- SERVICE DATA ---
const servicesData = [
  {
    icon: <Cpu className="size-4 text-purple-300" />,
    title: "AI Automation",
    description: "Neural Workflow Engines & LLM Integration",
    href: "/services/ai-automation",
    date: "LLM & automation",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] hover:-translate-y-10",
  },
  {
    icon: <Globe className="size-4 text-purple-300" />,
    title: "Web Applications",
    description: "Scalable Enterprise Logic & SaaS",
    href: "/services/web-applications",
    date: "SaaS & web apps",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-4 md:translate-x-12 translate-y-10 hover:-translate-y-1",
  },
  {
    icon: <Smartphone className="size-4 text-purple-300" />,
    title: "Mobile Apps",
    description: "Immersive Native iOS & Android",
    href: "/services/mobile-apps",
    date: "iOS & Android",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-8 md:translate-x-24 translate-y-20 hover:translate-y-10",
  },
  {
    icon: <Database className="size-4 text-purple-300" />,
    title: "Custom CRM",
    description: "Data-Driven Management Core",
    href: "/services/custom-crm",
    date: "Bespoke systems",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-12 md:translate-x-36 translate-y-30 hover:translate-y-20",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative overflow-x-hidden">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[8.5vw] md:text-[4.5vw] font-display font-semibold leading-[0.95] tracking-tight text-white"
          >
            Software Development Services
          </motion.h1>
          <motion.div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-purple-600" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest text-center">
              Web · AI · Mobile · CRM
            </span>
            <div className="h-[1px] w-12 bg-purple-600" />
          </motion.div>
          <p className="mt-8 max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed">
            Codeeee Labs is a software development company building custom web applications, AI
            automation, mobile apps, and CRM systems for startups and businesses across the US, UK,
            Canada, and Europe. Four core practices, one senior team — pick a capability below for
            scope, process, pricing, and FAQs.
          </p>
        </div>

        {/* The Stacked Cards - Added significant margin-bottom to prevent overlap */}
        <div className="w-full max-w-4xl flex justify-center scale-75 md:scale-100 relative z-10 mb-48 md:mb-64">
           <DisplayCards cards={servicesData} />
        </div>

        {/* Detailed List - Added padding-top and changed spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 w-full relative z-10 mt-20">
           {servicesData.map((s, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="border-l-2 border-white/5 pl-8 hover:border-purple-500/50 transition-all group py-4"
             >
                <Link href={s.href} className="block">
                  <div className="flex items-center gap-3 mb-4 text-purple-400">
                    {s.icon}
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">{s.date}</span>
                  </div>
                  <h3 className="text-3xl font-semibold uppercase text-white mb-4 tracking-tighter group-hover:text-purple-100 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-sm font-mono uppercase tracking-tight">
                    {s.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-hover:text-purple-400 transition-colors">
                    Access_Brief <ArrowUpRight size={12} />
                  </span>
                </Link>
             </motion.div>
           ))}
        </div>

        {/* ============ ENGAGEMENT MODEL ============ */}
        <section className="w-full relative z-10 mt-32 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white mb-6">
            How an engagement actually runs
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-10 max-w-2xl">
            Every project follows the same four stages, whichever service it sits under. The point
            of the structure is that you see working software early and often, rather than a
            months-long silence followed by a reveal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              ['01', 'Discovery', 'We map your workflow, data model and goals, then return a scoped roadmap with honest estimates. You get a fixed-scope quote before any build work starts — the number you sign is the number you pay.'],
              ['02', 'Weekly shipping', 'Working software in a staging environment every week. Demos run inside the timezone overlap; deep development happens in your off-hours, so progress appears overnight.'],
              ['03', 'Launch', 'Managed deployment, monitoring and a documented handover — on your own infrastructure, in your own repository.'],
              ['04', 'Partnership', 'Retained development capacity, or a clean handoff to your in-house team. Because there is no proprietary framework, any competent team can take over.'],
            ].map(([code, title, body]) => (
              <div key={code} className="border-l-2 border-white/5 pl-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">{code}</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ STACK ============ */}
        <section className="w-full relative z-10 mt-28 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white mb-6">
            The stack, and why it is boring on purpose
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8 max-w-2xl">
            TypeScript end to end: Next.js and React on the frontend, Node.js on the backend,
            PostgreSQL for data, Redis where caching matters, deployment on AWS or Vercel. For
            mobile we build native iOS and Android, or a progressive web app where that is the
            better answer. We choose hireable, battle-tested technology deliberately — your
            platform should outlive any single vendor, including us.
          </p>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Vercel', 'Three.js', 'Python'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-300 uppercase tracking-wider font-bold">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ============ WHAT IT COSTS ============ */}
        <section className="w-full relative z-10 mt-28 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white mb-6">
            What it costs
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Most agencies will not publish a number. These are the bands our work actually falls
            into. Because our engineering team is based in Karachi, they typically land 40–60%
            below equivalent US or UK agency quotes for the same scope.
          </p>
          <div className="overflow-x-auto border border-white/10 rounded-2xl">
            <table className="w-full text-left text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-medium">Scope</th>
                  <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-medium">Typical range</th>
                  <th className="px-5 py-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-medium">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/5"><td className="px-5 py-4 text-white">AI automation pilot — one workflow, end to end</td><td className="px-5 py-4 font-mono">$5,000 – $15,000</td><td className="px-5 py-4 font-mono">2–4 weeks</td></tr>
                <tr className="border-b border-white/5"><td className="px-5 py-4 text-white">Focused web application or MVP</td><td className="px-5 py-4 font-mono">$15,000 – $40,000</td><td className="px-5 py-4 font-mono">2–4 months</td></tr>
                <tr><td className="px-5 py-4 text-white">Multi-tenant SaaS or full CRM platform</td><td className="px-5 py-4 font-mono">$40,000 – $120,000</td><td className="px-5 py-4 font-mono">Scoped after discovery</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============ PROOF ============ */}
        <section className="w-full relative z-10 mt-28 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white mb-6">
            Systems we have shipped
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 hover:bg-white/[0.02] transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">{c.category}</span>
                <h3 className="text-lg font-semibold text-white mt-3 mb-2 tracking-tight leading-snug">{c.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-hover:text-purple-400 transition-colors">
                  Read case study <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="w-full relative z-10 mt-28 max-w-4xl rounded-3xl border border-purple-500/30 bg-purple-600/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-white mb-2">
              Tell us what you are trying to build
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Describe the problem and we will come back with an honest scope, a timeline and a
              fixed-scope estimate. We reply within one business day.
            </p>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors shrink-0"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Start a project</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}
