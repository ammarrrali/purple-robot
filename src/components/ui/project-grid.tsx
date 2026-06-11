'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2, Cpu, Globe } from 'lucide-react';

const projects = [
  { title: "Quantum_Vault", tech: "Next.js / Rust", desc: "Enterprise-grade asset security platform.", icon: Cpu },
  { title: "Neural_Flow", tech: "AI / Python", desc: "Automated business intelligence engine.", icon: Code2 },
  { title: "Global_Bridge", tech: "Web3 / React", desc: "Cross-border liquidity infrastructure.", icon: Globe }
];

export const ProjectGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 py-20">
    {projects.map((p, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="group relative bg-white/[0.03] border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-purple-600/[0.05] hover:border-purple-500/30 transition-all duration-500"
      >
        <p.icon className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={28} />
        <h3 className="text-xl font-black uppercase italic mb-2 tracking-tight">{p.title}</h3>
        <p className="text-[10px] font-mono text-purple-400/60 uppercase mb-4 tracking-widest">{p.tech}</p>
        <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{p.desc}</p>
      </motion.div>
    ))}
  </div>
);