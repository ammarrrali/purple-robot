"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <--- This detects the current page
import { cn } from "@/lib/utils";

const navLinks = [
  { id: "/", label: "Home" }, // Changed 'about' to '/' for Home if you want, or keep 'about' for the page
  { id: "/services", label: "Services" },
  { id: "/case-studies", label: "Work" },
  { id: "/blog", label: "Insights" },
  { id: "/about", label: "About" },
  { id: "/careers", label: "Careers" },
  { id: "/contact", label: "Contact" },
];


export function LiquidNavBar() {
  const pathname = usePathname(); // Get current route (e.g., "/about")
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 py-6 md:px-16 md:py-8 pointer-events-none">

      {/* 1. BRAND LOGO (Left) */}
      <Link href="/" className="flex items-center gap-3 pointer-events-auto cursor-pointer group">
        <div className="relative w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all group-hover:border-purple-500/50">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Terminal size={18} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display font-semibold tracking-tight text-xl leading-none text-white mix-blend-difference">Codeeee</span>
          <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Software House</span>
        </div>
      </Link>

      {/* 2. LIQUID MIRROR CAPSULE (Center) */}
      <div className="hidden lg:flex pointer-events-auto">
        <div className="relative flex px-2 py-2 gap-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {navLinks.map((link) => {
            // Check if this link is active
            const isActive = pathname === link.id;

            return (
              <Link
                key={link.id}
                href={link.id}
                className={cn(
                  "relative px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 z-10",
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {/* The "Liquid" Background Pill now follows the URL */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-pill"
                    className="absolute inset-0 bg-purple-600 rounded-full -z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. RIGHT SIDE: GLASS ACTION BUTTON + MOBILE MENU TOGGLE */}
      <div className="pointer-events-auto flex items-center gap-3">
        <Link
          href="/contact"
          className="relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white text-[10px] font-semibold rounded-full transition-all hover:scale-105 active:scale-95 uppercase tracking-wider group overflow-hidden hidden sm:inline-block"
        >
          <span className="relative z-10">Get estimate</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </Link>

        {/* Mobile hamburger — only below lg where the capsule nav is hidden */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white hover:border-purple-500/50 transition-all"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 4. MOBILE MENU PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden pointer-events-auto absolute top-full left-4 right-4 mt-1 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.id}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-5 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors",
                      isActive
                        ? "text-white bg-purple-600/80 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="sm:hidden mt-2 px-5 py-4 rounded-xl text-center text-xs font-semibold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Get estimate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
