'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <ScenePoster />,
});

// Lightweight stand-in shown while the Spline runtime + scene download, and as
// the permanent backdrop on connections/devices where a multi-megabyte 3D scene
// would wreck the first impression. Pure CSS — costs nothing.
function ScenePoster() {
  return (
    <div className="w-full h-full bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.10),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}

function shouldSkipHeavyScene(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const conn = (navigator as any).connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return true;
  return false;
}

export const InteractiveRobotSpline = ({ scene, className }: { scene: string; className?: string }) => {
  // 'pending' until we've checked the device; avoids kicking off the download
  // during hydration on devices that will never show it.
  const [mode, setMode] = useState<'pending' | 'full' | 'poster'>('pending');

  useEffect(() => {
    setMode(shouldSkipHeavyScene() ? 'poster' : 'full');
  }, []);

  return (
    <div className={className}>
      {mode === 'full' ? (
        <Suspense fallback={<ScenePoster />}>
          <Spline scene={scene} />
        </Suspense>
      ) : (
        <ScenePoster />
      )}
    </div>
  );
};
