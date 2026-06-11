"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-purple-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Phase_01",
  iconClassName = "text-purple-500",
  titleClassName = "text-purple-400",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // Base Layout & Shape
        "relative flex h-40 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl px-4 py-3 transition-all duration-700",
        // Dark Theme Styling (Blackish Purple)
        "border-2 border-purple-500/10 bg-[#050505]/90 backdrop-blur-md",
        // Hover Effects
        "hover:border-purple-500/50 hover:bg-[#0a0a0a] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        // The "Fade Out" Gradient Effect (Updated to fade to Black)
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-black after:to-transparent after:content-['']",
        // Content Layout
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-purple-900/20 ring-1 ring-purple-500/20 p-1.5">
          {icon}
        </span>
        <p className={cn("text-lg font-black italic uppercase tracking-tighter text-white", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-xs font-mono text-gray-400 uppercase tracking-widest">{description}</p>
      <p className="text-[10px] font-mono text-purple-500/60 uppercase">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    { className: "[grid-area:stack] hover:-translate-y-10 z-30" },
    { className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 z-20" },
    { className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 z-10" },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}