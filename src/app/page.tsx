'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot'; 
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { CodeeeeServicesSection } from '@/components/ui/codeeee-services';
import { LiquidNavBar } from '@/components/ui/liquid-navbar'; // <--- Import this
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Activity, Globe, Cpu, Database, Layers } from 'lucide-react';

const serviceData = [
  // ... (keep your existing serviceData array)
  { id: 1, title: "Core_Engine", content: "Developing high-performance software backbones.", icon: Database, status: "active", energy: 100 },
  { id: 2, title: "AI_Integration", content: "Deploying custom neural networks.", icon: Cpu, status: "high_demand", energy: 85 },
  { id: 3, title: "Visual_Logic", content: "Building immersive interfaces.", icon: Layers, status: "creative", energy: 95 }
];

export default function Home() { 
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <main className="h-dvh overflow-y-scroll snap-y snap-proximity md:snap-mandatory bg-[#030303] text-white selection:bg-purple-600/40 custom-scrollbar">
      
      {/* --- NEW LIQUID NAV --- */}
      <LiquidNavBar /> 

      {/* --- HERO SECTION --- */}
      <section className="relative h-dvh w-screen snap-start overflow-hidden">
        {/* ... (Keep your existing Hero code exactly as is) ... */}
        <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none z-50 m-4 md:m-6" />
        <div className="absolute inset-0 z-0 opacity-80">
          <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
        </div>
        
        {/* ... Rest of Hero Content ... */}
        <div className="relative z-10 w-full h-full pointer-events-none p-6 md:p-16 flex flex-col justify-end sm:justify-between">
           {/* (Keep the Motion Divs and Titles you already have) */}
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-end text-right hidden sm:block mt-32 md:mt-40">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                 <div className="flex items-center justify-end gap-3 text-gray-400 font-mono text-[10px] uppercase">
                    <span>Latency: 12ms</span>
                    <Activity size={12} className="text-purple-500 animate-pulse" /> 
                 </div>
                 {/* ... */}
              </div>
           </motion.div>
           
           <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 mb-8 md:mb-4">
              <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl text-left">
                  <h1 className="text-5xl sm:text-7xl lg:text-[140px] font-black leading-[0.8] md:leading-[0.75] tracking-tighter uppercase italic">
                    CODEEEE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-t from-gray-700 to-white">LABS</span>
                  </h1>
              </motion.div>
              {/* ... Shield Icon and Button ... */}
              <div className="max-w-xs text-right pointer-events-auto pb-4">
                  {/* ... */}
                  <p className="text-[10px] md:text-[11px] font-mono text-gray-400 leading-relaxed uppercase mb-6 md:mb-8">
                     Software house in Karachi engineering custom web apps, AI automation, mobile apps &amp; CRM systems.
                  </p>
                  <a href="/contact" className="group relative flex items-center gap-4 ml-auto w-fit">
                     <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-purple-500 transition-colors">Start_Inquiry</span>
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-purple-600 transition-all">
                        <ArrowUpRight size={16} />
                     </div>
                  </a>
              </div>
           </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      {/* <section className="relative min-h-screen w-screen snap-start bg-[#050505] flex items-center justify-center overflow-hidden">
         <CodeeeeServicesSection />
      </section> */}

      {/* --- TIMELINE --- */}
      <section className="relative h-dvh w-screen snap-start border-t border-white/5 bg-[#030303]">
        <div className="absolute top-24 left-6 md:top-32 md:left-16 z-20 pointer-events-none">
          <h2 className="text-purple-500 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase italic underline underline-offset-8">
            Process_Nodes
          </h2>
        </div>
        <RadialOrbitalTimeline  />
      </section>

    </main> 
  );
}