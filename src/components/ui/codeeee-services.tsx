"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Cpu, Globe, Smartphone, Database } from "lucide-react";

const codeeeeServices = [
  {
    icon: <Cpu className="size-4 text-purple-300" />,
    title: "AI_AUTOMATION",
    description: "Neural Workflow Engines",
    date: "DEPLOYED_V2.4",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Globe className="size-4 text-purple-300" />,
    title: "WEBAPP_SYSTEMS",
    description: "Enterprise Scalable Logic",
    date: "LIVE_STABLE",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Smartphone className="size-4 text-purple-300" />,
    title: "MOBILE_APPS",
    description: "Immersive iOS & Android",
    date: "CROSS_PLATFORM",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Database className="size-4 text-purple-300" />,
    title: "CUSTOM_CRMS",
    description: "Data-Driven Management",
    date: "OPTIMIZED",
    titleClassName: "text-purple-500",
    className: "[grid-area:stack] translate-x-36 translate-y-30 hover:translate-y-20",
  },
];

export function CodeeeeServicesSection() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-transparent">
      <div className="mb-12 text-center px-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">OUR_CAPABILITIES</h2>
        <div className="w-12 h-1 bg-purple-600 mx-auto mt-2" />
      </div>
      <div className="w-full max-w-3xl pr-20 md:pr-0">
        <DisplayCards cards={codeeeeServices} />
      </div>
    </div>
  );
}