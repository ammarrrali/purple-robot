'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import DisplayCards from '@/components/ui/display-cards';
import { Cpu, Globe, Smartphone, Database, ArrowUpRight } from 'lucide-react';

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
      </div>
    </main>
  );
}