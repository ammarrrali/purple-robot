"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Terminal, Cpu, Globe, Zap, Network, Box, ScanLine } from "lucide-react";
import { SiteFooter } from "./site-footer"; // Ensure path is correct

const timelineData = [
  {
    id: 1,
    title: "GENESIS_CORE",
    content: "Established the fundamental logic gates and rendering engines. The birth of high-fidelity web architecture.",
    icon: Box,
    status: "Initialized_2023",
  },
  {
    id: 2,
    title: "NEURAL_UPLINK",
    content: "Integrated AI workflows into the development pipeline. Automated 40% of redundant code generation.",
    icon: Cpu,
    status: "Compiled_2024",
  },
  {
    id: 3,
    title: "GLOBAL_GRID",
    content: "Expanded server nodes to 3 continents. Latency reduced to <50ms for international clients.",
    icon: Globe,
    status: "Deployed_2025",
  },
  {
    id: 4,
    title: "HYPER_SCALE",
    content: "Current phase. Building self-healing infrastructure and WebGL immersive interfaces for enterprise.",
    icon: Zap,
    status: "Active_2026",
  },
  {
    id: 5,
    title: "SINGULARITY",
    content: "Future roadmap. Full integration of quantum-ready security protocols and neural interfaces.",
    icon: Network,
    status: "Pending_2027",
  },
];

export default function RadialOrbitalTimeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [mounted, setMounted] = useState(false);

  const activeItem = timelineData.find((t) => t.id === expandedId);

  useEffect(() => {
    setMounted(true);
    let frameId: number;
    const rotate = () => {
      setRotationAngle((prev) => (prev + 0.1) % 360);
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const getPosition = useCallback((index: number, total: number, angleOffset: number) => {
    const angle = ((index / total) * 360 + angleOffset) % 360;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const radius = isMobile ? 120 : 220; 
    const radian = (angle * Math.PI) / 180;
    
    return {
      x: Number((radius * Math.cos(radian)).toFixed(2)),
      y: Number((radius * Math.sin(radian)).toFixed(2)),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Number(Math.max(0.3, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)).toFixed(2))
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full">
      {/* --- ORBITAL SECTION --- */}
      <section 
        className="w-full min-h-[700px] md:min-h-[850px] flex items-center justify-center overflow-visible relative py-20" 
        onClick={() => setExpandedId(null)}
      >
        {/* HUD DISPLAY (LEFT SIDE) */}
        <div className="absolute z-30 pointer-events-none top-0 left-0 w-full px-6 pt-10 flex justify-center md:top-1/2 md:left-0 md:transform md:-translate-y-1/2 md:justify-start md:pl-16 md:w-auto">
          <div className={cn("transition-all duration-500", activeItem ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
            {activeItem && (
              <Card className="bg-black/80 backdrop-blur-2xl border-l-2 border-purple-500 border-y-0 border-r-0 rounded-none text-white shadow-2xl w-full max-w-sm md:w-[320px]">
                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-purple-500/10 rounded-md border border-purple-500/30">
                        {React.createElement(activeItem.icon, { size: 16, className: "text-purple-400" })}
                     </div>
                     <Badge variant="outline" className="text-[9px] border-white/20 text-gray-400 uppercase">
                        {activeItem.status}
                     </Badge>
                  </div>
                  <CardTitle className="text-2xl font-display font-semibold tracking-tight">{activeItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-xs text-gray-400 font-mono leading-relaxed">{`>> ${activeItem.content}`}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* ORBITING NODES */}
        <div className="relative flex items-center justify-center">
          <div className="absolute z-10 flex flex-col items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-black border border-purple-500/50 shadow-[0_0_60px_rgba(147,51,234,0.4)] flex items-center justify-center relative z-20">
                  <Terminal size={24} className="text-white" />
               </div>
               <span className="mt-4 text-[10px] font-mono uppercase tracking-widest text-purple-500">System_Core</span>
          </div>

          {timelineData.map((item, index) => {
            const pos = getPosition(index, timelineData.length, rotationAngle);
            const isSelected = expandedId === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={{ 
                  transform: `translate(${pos.x}px, ${pos.y}px)`, 
                  zIndex: isSelected ? 50 : pos.zIndex, 
                  opacity: isSelected ? 1 : pos.opacity,
                  scale: isSelected ? 1.2 : 1
                }}
                onClick={(e) => { e.stopPropagation(); setExpandedId(isSelected ? null : item.id); }}
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border transition-all", isSelected ? "bg-white text-black border-white shadow-2xl" : "bg-black/80 text-gray-400 border-white/10 group-hover:border-purple-500")}>
                  <Icon size={18} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER INTEGRATION --- */}
      {/* This pushes the footer below the orbital container */}
      <SiteFooter />
    </div>
  );
}