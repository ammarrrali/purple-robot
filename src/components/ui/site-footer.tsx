'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Mail, Smartphone, Instagram, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { title: "Sitemap", items: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Portfolio", href: "/portfolio" }, { label: "Case Studies", href: "/case-studies" }, { label: "Insights", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }] },
  { title: "Services", items: [{ label: "AI Automation", href: "/services/ai-automation" }, { label: "Web Applications", href: "/services/web-applications" }, { label: "Mobile Apps", href: "/services/mobile-apps" }, { label: "Custom CRMs", href: "/services/custom-crm" }] },
  { title: "Connect", items: [{ label: "Instagram", href: "https://instagram.com/codeeeelabs" }, { label: "info@codeeee.com", href: "mailto:info@codeeee.com" }, { label: "+92 336 1287518", href: "tel:+923361287518" }] },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 text-purple-500">
                <Terminal size={24} />
                <span className="font-display font-semibold text-2xl tracking-tight text-white">Codeeee</span>
              </div>
              <p className="font-mono text-xs text-gray-500 leading-relaxed max-w-sm mb-8">
                Architecting high-fidelity digital environments for the next generation of web infrastructure. Serving clients across the US, UK, Canada, Europe &amp; the Gulf. <br/>
                <span className="text-purple-500/60">Est. 2026 · Karachi, PK</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Available for new projects
              </span>
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-purple-500 pl-3">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="group flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors">
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
              © 2026 Codeeee Labs. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="text-[10px] text-gray-600 hover:text-white font-mono uppercase tracking-widest transition-colors">
                Privacy_Policy
              </Link>
              <Link href="/terms-of-service" className="text-[10px] text-gray-600 hover:text-white font-mono uppercase tracking-widest transition-colors">
                Terms_of_Service
              </Link>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="mailto:info@codeeee.com" aria-label="Email Codeeee Labs" className="text-gray-600 hover:text-white transition-colors"><Mail size={16} /></a>
            <a href="tel:+923361287518" aria-label="Call Codeeee Labs" className="text-gray-600 hover:text-white transition-colors"><Smartphone size={16} /></a>
            <a href="https://instagram.com/codeeeelabs" target="_blank" rel="noopener noreferrer" aria-label="Codeeee Labs on Instagram" className="text-gray-600 hover:text-white transition-colors"><Instagram size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}