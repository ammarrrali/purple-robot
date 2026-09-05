'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroBot } from './hero-bot';

/**
 * HeroBot3D — the SVG bot, upgraded to a real WebGL robot *only* where that
 * is free.
 *
 * The rule this file enforces: the 3D robot must never cost the page
 * anything. So the heavy module is never in the first-load bundle, never
 * requested until the browser is idle and the hero is actually on screen,
 * and never requested at all on a device that hasn't cleared `canRun3D()`.
 * Everything else keeps the original zero-dependency SVG, which also stays
 * on screen underneath until the canvas has painted its first frame — and
 * comes back if the frame-rate watchdog in the scene decides otherwise.
 */

const Scene = dynamic(() => import('./hero-robot-scene'), { ssr: false });

/**
 * Debug escape hatch: `?bot3d=force` skips the capability gate and the
 * frame-rate watchdog, so the scene can be inspected (or captured by the
 * scripts in /reel) on machines and headless browsers it would normally
 * refuse to run on.
 */
export function isForced(): boolean {
  return (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('bot3d') === 'force'
  );
}

/** Cheap, synchronous "is this machine up for it?" check. */
function canRun3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (isForced()) return true;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // Touch devices: thermals and fill-rate are the risk, and the SVG already
  // looks right at those sizes.
  if (window.matchMedia('(hover: none)').matches) return false;
  if (window.innerWidth < 900) return false;
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 6) return false;

  // Probe for a real WebGL2 context — and refuse a software renderer.
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return false;
  } catch {
    return false;
  }

  return true;
}

export function HeroBot3D({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false); // fetch + mount the WebGL module
  const [ready, setReady] = useState(false); // canvas has painted
  const [failed, setFailed] = useState(false); // watchdog / error → SVG forever
  const [active, setActive] = useState(true); // hero visible & tab focused
  const [svgGone, setSvgGone] = useState(false); // SVG finished fading out

  // Decide, then wait for idle + visibility before pulling in three.js.
  useEffect(() => {
    if (!canRun3D()) return;
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const idle: typeof window.requestIdleCallback | undefined =
      window.requestIdleCallback?.bind(window);

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting && !cancelled) {
          // Hero is on screen — queue the load for the next idle slot so it
          // can never compete with hydration or the LCP paint.
          if (idle) idle(() => !cancelled && setLoad(true), { timeout: 2500 });
          else setTimeout(() => !cancelled && setLoad(true), 1200);
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  // A hidden tab should not be spending GPU time on a robot.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setActive(false);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Only drop the SVG once it has finished fading, so the swap never pops.
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => setSvgGone(true), 800);
    return () => clearTimeout(id);
  }, [ready]);

  const onDowngrade = useCallback(() => {
    setFailed(true);
    setReady(false);
    setSvgGone(false);
    setLoad(false);
  }, []);

  const show3D = load && !failed;

  return (
    <div ref={hostRef} className={className} aria-hidden>
      <div className="relative w-full aspect-square">
        {/* Zero-dependency baseline: server-rendered, always paints first. */}
        {!svgGone && (
          <HeroBot
            className={`absolute inset-0 transition-opacity duration-700 ${
              ready ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {show3D && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Scene
              active={active}
              onReady={() => setReady(true)}
              onDowngrade={onDowngrade}
            />
          </div>
        )}
      </div>
    </div>
  );
}
