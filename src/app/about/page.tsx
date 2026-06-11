'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import { GlassTypographyScene } from '@/components/ui/glass-typography-scene';

export default function AboutPage() {
  return (
    <main className="h-dvh w-full bg-[#030303] overflow-hidden relative">
      <LiquidNavBar />

      {/* Crawlable page content — the visual heading is rendered in WebGL, so search
          engines and screen readers need a real HTML equivalent */}
      <div className="sr-only">
        <h1>About Codeeee Labs — Software House in Karachi, Pakistan</h1>
        <p>
          Codeeee Labs is a software development studio based in Karachi, Pakistan,
          engineering high-fidelity digital products: custom web applications and SaaS
          platforms, AI automation and LLM integration, native iOS and Android mobile
          apps, and data-driven CRM systems. Established 2026. Contact us at
          info@codeeee.com or +92 336 1287518.
        </p>
      </div>

      {/* --- PURE CODE 3D SCENE --- */}
      {/* This component contains both the 3D Text and the Glass Spheres */}
      <div className="absolute inset-0 z-10">
        <GlassTypographyScene />
      </div>

      {/* --- OVERLAY UI LAYERS --- */}
      <div className="absolute bottom-12 w-full flex justify-center z-30 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full"
        >
          <span className="text-[9px] font-mono font-black tracking-widest text-gray-400 uppercase">
            Real-time WebGL Refraction
          </span>
        </motion.div>
      </div>

      {/* --- DECORATIVE HUD --- */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-12 z-20 pointer-events-none">
        <div className="flex flex-col gap-2">
           <span className="text-[8px] font-mono font-black text-purple-600 uppercase tracking-widest">Est. 2026</span>
           <div className="h-20 w-[1px] bg-gradient-to-b from-purple-600 to-transparent ml-1" />
        </div>
      </div>
    </main>
  );
}
