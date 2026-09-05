'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import { ArrowUpRight, Database, Box, Layers, Globe } from 'lucide-react';

// --- DATA: YOUR PROJECTS RENAMED FOR "CODEEEE" ---
const projects = [
  {
    id: 1,
    title: "AETHER_INTERFACE",
    category: "WEBGL / IMMERSIVE",
    desc: "A high-fidelity 3D portfolio demonstrating real-time glass refraction and physics-based rendering.",
    tech: ["Three.js", "React Fiber", "GLSL"],
    status: "Live_Experience",
    icon: Layers,
    size: "col-span-1 md:col-span-2", // Wide card for the "Hero" project
    href: "/case-studies/aether-interface-webgl-experience",
  },
  {
    id: 2,
    title: "NEXUS_LOGISTICS",
    category: "CRM / SUPPLY_CHAIN",
    desc: "Enterprise-grade inventory orchestration engine managing global supply nodes and data streams.",
    tech: ["Next.js", "PostgreSQL", "Redis"],
    status: "Private_Core",
    icon: Box,
    size: "col-span-1",
    href: "/case-studies/nexus-logistics-crm",
  },
  {
    id: 3,
    title: "QUANTUM_STACK",
    category: "FULL_STACK / SAAS",
    desc: "Scalable multi-tenant architecture designed to handle high-concurrency user loads with zero latency.",
    tech: ["Node.js", "Docker", "AWS"],
    status: "Deployed",
    icon: Database,
    size: "col-span-1",
    href: "/case-studies/quantum-stack-saas-platform",
  },
  {
    id: 4,
    title: "FLUID_OS",
    category: "WEBAPPS / PWA",
    desc: "Next-generation progressive web applications delivering native-level performance in browser environments.",
    tech: ["TypeScript", "Tailwind", "Vercel"],
    status: "Production",
    icon: Globe,
    size: "col-span-1 md:col-span-2", // Wide card
    href: "/case-studies/fluid-os-progressive-web-app",
  },
];

// --- COMPONENT: SPOTLIGHT CARD ---
const SpotlightCard = ({ project }: { project: typeof projects[0] }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Icon = project.icon;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden group ${project.size}`}
    >
      {/* Stretched link — whole card opens the case study without altering the layout */}
      <Link href={project.href} aria-label={`Read the ${project.title} case study`} className="absolute inset-0 z-20" />
      {/* SPOTLIGHT EFFECT LAYER (Purple Glow) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(147,51,234,0.15), transparent 40%)`,
        }}
      />
      
      {/* CONTENT LAYER */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-purple-500">
                <Icon size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">{project.category}</span>
             </div>
             <h3 className="text-2xl font-semibold uppercase text-white tracking-tight group-hover:text-purple-100 transition-colors">{project.title}</h3>
          </div>
          <div className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 group-hover:text-white group-hover:border-purple-500/50 transition-colors">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Description & Tech */}
        <div>
          <p className="text-xs text-gray-400 font-mono leading-relaxed mb-6 border-l-2 border-purple-500/20 pl-4 group-hover:border-purple-500 transition-colors">
            {project.desc}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-gray-300 uppercase tracking-wider font-bold group-hover:border-purple-500/30 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- PAGE LAYOUT ---
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40">
      <LiquidNavBar />
      
      <div className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-20">
          <h1 className="text-[12vw] md:text-[6vw] font-display font-semibold leading-[0.95] tracking-tight text-white">
            Our Work
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-[1px] w-20 bg-purple-600" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Selected software projects
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-gray-400 leading-relaxed">
            A selection of the web applications, CRMs, and immersive experiences we&apos;ve shipped.
            Each links to a full case study with the problem, the build, and the results.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <SpotlightCard key={project.id} project={project} />
          ))}
        </div>

        {/* Case Studies Link */}
        <div className="mt-32 flex justify-center">
          <Link
            href="/case-studies"
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all"
          >
            <span className="text-xs font-mono text-gray-400 group-hover:text-purple-400 uppercase tracking-widest">
              Read_Full_Case_Studies
            </span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

      </div>
    </main>
  );
}