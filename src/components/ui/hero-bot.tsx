'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroBot — a pure-SVG robot given real 3D depth with CSS.
 *
 * No WebGL, no library, no download: the SVG ships in the server HTML and
 * animates entirely in CSS (`.hb-*` keyframes in globals.css). The 3D comes
 * from `transform-style: preserve-3d` — three layers at different depths
 * (rings behind, robot mid, particles in front) inside a perspective box that
 * tilts toward the pointer. Weightless and instant on every device.
 */
export function HeroBot({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Pointer tilt is a desktop nicety; touch devices keep the idle float.
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const clamp = (n: number) => Math.max(-1, Math.min(1, n));
        stage.style.setProperty('--rx', `${clamp(-py) * 12}deg`);
        stage.style.setProperty('--ry', `${clamp(px) * 16}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      stage.style.setProperty('--rx', '0deg');
      stage.style.setProperty('--ry', '0deg');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      <div className="hb-perspective w-full h-full">
        <div ref={stageRef} className="hb-stage relative w-full aspect-square max-w-[560px] mx-auto">
          {/* ---- Layer 1: glow + orbital rings (behind) ---- */}
          <svg viewBox="0 0 400 400" className="hb-layer hb-layer-back" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="hb-glow" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#7c3aed" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="190" r="185" fill="url(#hb-glow)" />
            <g className="hb-spin" style={{ transformOrigin: '200px 200px' }}>
              <ellipse cx="200" cy="200" rx="168" ry="60" stroke="#a855f7" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 9" />
            </g>
            <g className="hb-spin-rev" style={{ transformOrigin: '200px 200px' }}>
              <ellipse cx="200" cy="200" rx="150" ry="150" stroke="#7c3aed" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 14" />
            </g>
          </svg>

          {/* ---- Layer 2: the robot (mid) ---- */}
          <svg viewBox="0 0 400 400" className="hb-layer hb-layer-mid" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hb-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a2a35" />
                <stop offset="55%" stopColor="#141419" />
                <stop offset="100%" stopColor="#0a0a0d" />
              </linearGradient>
              <linearGradient id="hb-visor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1030" />
                <stop offset="100%" stopColor="#05040a" />
              </linearGradient>
              <linearGradient id="hb-rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="hb-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <clipPath id="hb-visor-clip">
                <rect x="140" y="128" width="120" height="90" rx="26" />
              </clipPath>
            </defs>

            <g className="hb-float" style={{ transformOrigin: '200px 200px' }}>
              {/* Antenna */}
              <line x1="200" y1="92" x2="200" y2="66" stroke="url(#hb-rim)" strokeWidth="3" strokeLinecap="round" />
              <circle className="hb-pulse" cx="200" cy="60" r="7" fill="#a855f7" filter="url(#hb-blur)" style={{ transformOrigin: '200px 60px' }} />
              <circle cx="200" cy="60" r="4" fill="#e9d5ff" />

              {/* Head */}
              <rect x="118" y="96" width="164" height="150" rx="40" fill="url(#hb-metal)" stroke="url(#hb-rim)" strokeWidth="1.5" />
              <rect x="118" y="96" width="164" height="150" rx="40" stroke="#c084fc" strokeOpacity="0.25" strokeWidth="1" />

              {/* Side sensors */}
              <rect x="104" y="150" width="16" height="44" rx="8" fill="url(#hb-metal)" stroke="#7c3aed" strokeOpacity="0.5" strokeWidth="1" />
              <rect x="280" y="150" width="16" height="44" rx="8" fill="url(#hb-metal)" stroke="#7c3aed" strokeOpacity="0.5" strokeWidth="1" />
              <circle className="hb-blink" cx="112" cy="172" r="3" fill="#a855f7" />
              <circle className="hb-blink" cx="288" cy="172" r="3" fill="#a855f7" style={{ animationDelay: '0.6s' }} />

              {/* Visor */}
              <rect x="140" y="128" width="120" height="90" rx="26" fill="url(#hb-visor)" stroke="#3b2a63" strokeWidth="1" />
              <g clipPath="url(#hb-visor-clip)">
                <rect className="hb-scan" x="140" y="128" width="120" height="10" fill="#a855f7" opacity="0.35" />
              </g>

              {/* Eyes */}
              <g className="hb-eyes">
                <circle cx="176" cy="172" r="15" fill="#a855f7" filter="url(#hb-blur)" />
                <circle cx="224" cy="172" r="15" fill="#a855f7" filter="url(#hb-blur)" />
                <circle cx="176" cy="172" r="8" fill="#f5e9ff" />
                <circle cx="224" cy="172" r="8" fill="#f5e9ff" />
              </g>

              {/* Mouth */}
              <line x1="176" y1="232" x2="224" y2="232" stroke="#5b3fa0" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
              <rect x="168" y="224" width="64" height="16" rx="6" fill="none" stroke="#3b2a63" strokeWidth="1" />

              {/* Neck + shoulders */}
              <rect x="188" y="246" width="24" height="18" fill="url(#hb-metal)" />
              <path d="M150 300 Q200 268 250 300 L250 320 Q200 300 150 320 Z" fill="url(#hb-metal)" stroke="url(#hb-rim)" strokeWidth="1" strokeOpacity="0.6" />
              <circle className="hb-pulse" cx="200" cy="292" r="5" fill="#a855f7" style={{ transformOrigin: '200px 292px', animationDelay: '0.4s' }} />
            </g>
          </svg>

          {/* ---- Layer 3: particles (front) ---- */}
          <svg viewBox="0 0 400 400" className="hb-layer hb-layer-front" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#c084fc">
              <circle className="hb-twinkle" cx="70" cy="120" r="2.5" />
              <circle className="hb-twinkle" cx="330" cy="150" r="2" style={{ animationDelay: '0.8s' }} />
              <circle className="hb-twinkle" cx="96" cy="270" r="2" style={{ animationDelay: '1.4s' }} />
              <circle className="hb-twinkle" cx="316" cy="288" r="2.5" style={{ animationDelay: '0.4s' }} />
              <circle className="hb-twinkle" cx="200" cy="360" r="2" style={{ animationDelay: '1.1s' }} />
              <circle className="hb-twinkle" cx="150" cy="80" r="1.6" style={{ animationDelay: '2s' }} />
              <circle className="hb-twinkle" cx="270" cy="330" r="1.6" style={{ animationDelay: '1.7s' }} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
