'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { isForced } from './hero-bot-3d';

/**
 * HeroRobotScene — "The Architect".
 *
 * The robot doesn't *use* a computer, it *makes* software: it floats with a
 * lattice of live code held between its hands. The open left palm projects
 * the beam that holds the core up; the right hand flicks, and every flick
 * throws a spark into it. Loose code shards drift in from the surrounding
 * space, snap onto the lattice and dissolve.
 *
 * Everything here is generated in code: no .glb, no HDR, no texture over the
 * wire. The only payload is three + @react-three/fiber, and this module is
 * dynamically imported by `hero-bot-3d.tsx` only once the device has been
 * cleared for it. Deliberately cheap to render: no shadow maps (a painted
 * contact shadow instead), no post-processing (additive sprites fake the
 * bloom), a procedural RoomEnvironment for the metal, and a frameloop the
 * wrapper parks whenever the hero is off-screen or the tab is hidden.
 */

/** Where the code lattice hangs, in robot-local space. */
const CORE = new THREE.Vector3(-0.82, 0.34, 0.92);

/* ------------------------------------------------------------------ */
/* Pointer — the canvas is pointer-events:none, so r3f never sees moves.
   We track the window ourselves and share it through one mutable object. */

const pointer = { x: 0, y: 0, lastMove: -Infinity };

/**
 * Small deterministic PRNG. Seeding the scatter keeps the scene reproducible
 * between renders — and keeps these `useMemo`s pure, which is what the React
 * compiler lint is asking for when it rejects `Math.random()` during render.
 */
function makeRng(seed: number) {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.lastMove = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Generated textures                                                   */

/** Soft radial dot — stands in for bloom on eyes, reactor and sparks. */
function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(216,180,254,0.55)');
  grad.addColorStop(1, 'rgba(168,85,247,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Fake contact shadow: an elliptical smudge on the floor. */
function makeShadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(0,0,0,0.5)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.16)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * A sheet of "code" as coloured bars. Used for the drifting shards — each
 * shard takes a different slice of it, so no two read the same.
 */
function makeCodeTexture(seed: number) {
  const rnd = makeRng(seed);
  const W = 256;
  const H = 512;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, W, H);

  const palette = ['#e9d5ff', '#c084fc', '#a855f7', '#67e8f9', '#f0abfc'];
  const lineH = 18;
  let indent = 1;

  for (let y = 6; y < H; y += lineH) {
    if (rnd() < 0.14) indent = 1;
    else if (rnd() < 0.28) indent = Math.min(4, indent + 1);
    else if (rnd() < 0.22) indent = Math.max(1, indent - 1);

    let x = 14 + indent * 13;
    const tokens = 1 + Math.floor(rnd() * 3);
    for (let t = 0; t < tokens && x < W - 22; t++) {
      const w = 16 + rnd() * 62;
      g.fillStyle = palette[Math.floor(rnd() * palette.length)];
      g.globalAlpha = 0.5 + rnd() * 0.5;
      g.beginPath();
      g.roundRect(x, y + 4, Math.min(w, W - 22 - x), 7, 3);
      g.fill();
      x += w + 9;
    }
    g.globalAlpha = 1;
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

/** Vertical fade, black→white→black. Drives the projector beam's falloff. */
function makeBeamTexture() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(233,213,255,0.95)');
  grad.addColorStop(0.55, 'rgba(168,85,247,0.45)');
  grad.addColorStop(1, 'rgba(168,85,247,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ------------------------------------------------------------------ */
/* Shared geometry + materials — built once, reused by every part.      */

function useKit() {
  return useMemo(() => {
    const rbox = (w: number, h: number, d: number, r = 0.06, s = 4) =>
      new RoundedBoxGeometry(w, h, d, s, r);

    const geo = {
      torso: rbox(1.02, 1.12, 0.62, 0.2),
      chestPlate: rbox(0.66, 0.5, 0.08, 0.06),
      hip: rbox(0.78, 0.26, 0.5, 0.1),
      waist: new THREE.CylinderGeometry(0.3, 0.14, 0.6, 20),
      thruster: new THREE.CylinderGeometry(0.17, 0.26, 0.14, 20),
      thrusterRing: new THREE.TorusGeometry(0.24, 0.022, 10, 28),
      neck: new THREE.CylinderGeometry(0.13, 0.16, 0.2, 16),
      head: rbox(0.94, 0.8, 0.76, 0.24),
      visor: rbox(0.78, 0.34, 0.1, 0.08),
      ear: rbox(0.1, 0.34, 0.24, 0.05),
      brow: rbox(0.76, 0.05, 0.06, 0.02),
      antenna: new THREE.CylinderGeometry(0.022, 0.03, 0.34, 10),
      joint: new THREE.SphereGeometry(0.145, 20, 14),
      shoulder: new THREE.SphereGeometry(0.2, 22, 16),
      upperArm: new THREE.CapsuleGeometry(0.11, 0.34, 4, 14),
      foreArm: new THREE.CapsuleGeometry(0.095, 0.36, 4, 14),
      palm: rbox(0.28, 0.1, 0.3, 0.045),
      finger: rbox(0.055, 0.055, 0.19, 0.024),
      eye: new THREE.SphereGeometry(0.072, 20, 14),
      reactor: new THREE.TorusGeometry(0.15, 0.035, 12, 32),
      reactorCore: new THREE.SphereGeometry(0.1, 20, 14),
      ring: new THREE.TorusGeometry(2.15, 0.006, 8, 128),
      vent: rbox(0.5, 0.035, 0.06, 0.015),

      // --- the code lattice ---
      coreSolid: new THREE.IcosahedronGeometry(0.4, 1),
      coreOuter: new THREE.OctahedronGeometry(0.52, 0),
      shard: new THREE.PlaneGeometry(0.26, 0.17),
    };

    // Wireframes derived from the solids above.
    const coreWire = new THREE.WireframeGeometry(geo.coreSolid);
    const coreOuterWire = new THREE.WireframeGeometry(geo.coreOuter);

    const shell = new THREE.MeshStandardMaterial({
      color: '#1a1a22',
      metalness: 0.92,
      roughness: 0.34,
    });
    const shellLight = new THREE.MeshStandardMaterial({
      color: '#2e2e3b',
      metalness: 0.95,
      roughness: 0.22,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: '#0a0812',
      metalness: 0.9,
      roughness: 0.22,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: '#3b1d6b',
      metalness: 0.4,
      roughness: 0.3,
      emissive: new THREE.Color('#a855f7'),
      emissiveIntensity: 2.6,
    });
    const accentCool = new THREE.MeshStandardMaterial({
      color: '#0e3b45',
      metalness: 0.4,
      roughness: 0.3,
      emissive: new THREE.Color('#22d3ee'),
      emissiveIntensity: 1.8,
    });
    const mat = { shell, shellLight, glass, accent, accentCool };

    const dispose = () => {
      Object.values(geo).forEach((g) => g.dispose());
      coreWire.dispose();
      coreOuterWire.dispose();
      Object.values(mat).forEach((m) => m.dispose());
    };

    return { geo, mat, coreWire, coreOuterWire, dispose };
  }, []);
}

type Kit = ReturnType<typeof useKit>;

/* ------------------------------------------------------------------ */
/* Arms — two deliberately different poses.                             */
/*   'project' : open palm under the core, holding the beam steady.     */
/*   'conjure' : fingers flicking beside the core, feeding it sparks.   */

function Arm({
  kit,
  side,
  mode,
  glow,
}: {
  kit: Kit;
  side: 1 | -1;
  mode: 'project' | 'conjure';
  glow: THREE.Texture;
}) {
  const { geo, mat } = kit;
  const shoulder = useRef<THREE.Group>(null!);
  const elbow = useRef<THREE.Group>(null!);
  const wrist = useRef<THREE.Group>(null!);
  const fingers = useRef<(THREE.Group | null)[]>([]);

  // Each finger gets its own rhythm so the flicking never looks mechanical.
  const { phases, rates } = useMemo(() => {
    const rnd = makeRng(side === 1 ? 11 : 23);
    return {
      phases: [0, 1, 2, 3].map(() => rnd() * Math.PI * 2),
      rates: [0, 1, 2, 3].map(() => 8 + rnd() * 7),
    };
  }, [side]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (mode === 'project') {
      // Held steady, with just enough drift to look alive.
      const sway = Math.sin(t * 0.7) * 0.03;
      shoulder.current.rotation.x = -0.6 + sway;
      shoulder.current.rotation.z = -0.12 + Math.sin(t * 0.5) * 0.02;
      elbow.current.rotation.x = -0.1 - sway * 0.6;
      wrist.current.rotation.x = -0.48 + sway;
      wrist.current.rotation.y = 0.15;
      // Fingers splayed and barely breathing — an open, offering hand.
      for (let i = 0; i < 4; i++) {
        const f = fingers.current[i];
        if (!f) continue;
        f.rotation.x = -0.34 + Math.sin(t * 1.3 + i * 0.5) * 0.05;
      }
    } else {
      // Working hand: hunts around the lattice and taps at it.
      const drift = Math.sin(t * 0.9) * 0.07;
      const bounce = Math.max(0, Math.sin(t * 6.2)) * 0.05;
      shoulder.current.rotation.x = -1.25 + drift * 0.3;
      shoulder.current.rotation.z = -0.66 + drift * 0.5;
      elbow.current.rotation.x = -0.35 + bounce * 1.1;
      wrist.current.rotation.x = 0.15 - bounce * 1.2;
      wrist.current.rotation.y = -0.8;
      wrist.current.rotation.z = drift * 1.4;
      for (let i = 0; i < 4; i++) {
        const f = fingers.current[i];
        if (!f) continue;
        f.rotation.x = 0.1 + Math.max(0, Math.sin(t * rates[i] + phases[i])) * 0.62;
      }
    }
  });

  return (
    <group ref={shoulder} position={[side * 0.62, 0.4, 0]}>
      <mesh geometry={geo.shoulder} material={mat.shellLight} scale={0.86} />
      <mesh
        geometry={geo.vent}
        material={mat.accentCool}
        position={[side * 0.15, 0.02, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.26, 0.7, 0.7]}
      />
      <mesh geometry={geo.upperArm} material={mat.shell} position={[0, -0.3, 0]} />

      <group ref={elbow} position={[0, -0.56, 0]}>
        <mesh geometry={geo.joint} material={mat.shellLight} />
        <mesh geometry={geo.foreArm} material={mat.shell} position={[0, -0.3, 0]} />
        {/* Forearm status strip — the bit that reads as "powered". */}
        <mesh
          geometry={geo.vent}
          material={mat.accentCool}
          position={[side * 0.1, -0.34, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[0.55, 0.6, 0.6]}
        />

        <group ref={wrist} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={geo.joint} material={mat.shellLight} scale={0.62} />
          <mesh geometry={geo.palm} material={mat.shellLight} position={[0, -0.02, 0.11]} scale={1.15} />
          {/* Palm emitter — brighter on the hand that holds the beam. */}
          <sprite scale={[0.46, 0.46, 1]} position={[0, 0.04, 0.1]}>
            <spriteMaterial
              map={glow}
              color="#c084fc"
              blending={THREE.AdditiveBlending}
              transparent
              opacity={mode === 'project' ? 0.85 : 0.3}
              depthWrite={false}
              toneMapped={false}
            />
          </sprite>
          {[0, 1, 2, 3].map((i) => (
            <group
              key={i}
              ref={(el) => {
                fingers.current[i] = el;
              }}
              position={[-0.105 + i * 0.07, -0.03, 0.26]}
            >
              <mesh
                geometry={geo.finger}
                material={mat.shellLight}
                position={[0, 0, 0.09]}
                scale={[0.9, 0.9, 1]}
              />
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Head — tracks the cursor when it moves, drops back to the lattice.   */

function Head({ kit, glow }: { kit: Kit; glow: THREE.Texture }) {
  const { geo, mat } = kit;
  const head = useRef<THREE.Group>(null!);
  const eyes = useRef<THREE.Group>(null!);
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const glancing = performance.now() - pointer.lastMove < 1600;

    // Looking at you, or back down into the work.
    const wantY = glancing
      ? THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.5
      : Math.sin(t * 0.4) * 0.06;
    const wantX = glancing
      ? THREE.MathUtils.clamp(pointer.y, -1, 1) * 0.28
      : 0.26 + Math.sin(t * 0.9) * 0.035;

    const k = 1 - Math.pow(0.0018, dt); // frame-rate independent damping
    const aim = target.current;
    aim.x += (wantX - aim.x) * k;
    aim.y += (wantY - aim.y) * k;

    head.current.rotation.x = aim.x;
    head.current.rotation.y = aim.y;
    head.current.rotation.z = -aim.y * 0.16;
    head.current.position.y = 1.06 + Math.sin(t * 1.4) * 0.012;

    // Blink: a fast squash roughly every four seconds.
    const cycle = (t % 4.2) / 4.2;
    const blink = cycle > 0.965 ? 0.08 : 1;
    eyes.current.scale.y += (blink - eyes.current.scale.y) * (1 - Math.pow(0.001, dt));
  });

  return (
    <group ref={head} position={[0, 1.06, 0]}>
      <mesh geometry={geo.head} material={mat.shell} />
      {/* Brow ridge + jaw plate give the silhouette some structure. */}
      <mesh geometry={geo.brow} material={mat.shellLight} position={[0, 0.3, 0.32]} scale={[0.9, 1, 1]} />
      <mesh geometry={geo.brow} material={mat.accent} position={[0, -0.3, 0.3]} scale={[0.6, 0.7, 1]} />
      <mesh geometry={geo.ear} material={mat.shellLight} position={[-0.5, -0.02, 0]} />
      <mesh geometry={geo.ear} material={mat.shellLight} position={[0.5, -0.02, 0]} />
      <mesh geometry={geo.visor} material={mat.glass} position={[0, 0.05, 0.35]} />

      <group ref={eyes} position={[0, 0.05, 0.4]}>
        <mesh geometry={geo.eye} material={mat.accent} position={[-0.16, 0, 0]} />
        <mesh geometry={geo.eye} material={mat.accent} position={[0.16, 0, 0]} />
      </group>
      {[-0.16, 0.16].map((x) => (
        <sprite key={x} scale={[0.56, 0.56, 1]} position={[x, 0.05, 0.44]}>
          <spriteMaterial
            map={glow}
            color="#c084fc"
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}

      {/* Antenna */}
      <mesh geometry={geo.antenna} material={mat.shellLight} position={[0, 0.55, 0]} />
      <mesh geometry={geo.eye} material={mat.accent} position={[0, 0.75, 0]} scale={0.8} />
      <AntennaGlow glow={glow} />
    </group>
  );
}

function AntennaGlow({ glow }: { glow: THREE.Texture }) {
  const s = useRef<THREE.Sprite>(null!);
  useFrame(({ clock }) => {
    const p = 0.55 + Math.sin(clock.elapsedTime * 2.6) * 0.45;
    s.current.scale.setScalar(0.4 + p * 0.35);
    (s.current.material as THREE.SpriteMaterial).opacity = 0.35 + p * 0.5;
  });
  return (
    <sprite ref={s} position={[0, 0.75, 0]}>
      <spriteMaterial
        map={glow}
        color="#a855f7"
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  );
}

/* ------------------------------------------------------------------ */
/* Chest reactor                                                        */

function Reactor({ kit, glow }: { kit: Kit; glow: THREE.Texture }) {
  const { geo, mat } = kit;
  const ring = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Sprite>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ring.current.rotation.z = t * 0.8;
    const p = 0.5 + Math.sin(t * 1.8) * 0.5;
    halo.current.scale.setScalar(0.9 + p * 0.3);
    (halo.current.material as THREE.SpriteMaterial).opacity = 0.4 + p * 0.35;
  });

  return (
    <group position={[0, 0.16, 0.33]}>
      <mesh ref={ring} geometry={geo.reactor} material={mat.accentCool} />
      <mesh geometry={geo.reactorCore} material={mat.accent} />
      <sprite ref={halo} scale={[0.9, 0.9, 1]}>
        <spriteMaterial
          map={glow}
          color="#a855f7"
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The code lattice the robot is building                               */

function CodeCore({ kit, glow }: { kit: Kit; glow: THREE.Texture }) {
  const { geo, coreWire, coreOuterWire } = kit;
  const inner = useRef<THREE.Group>(null!);
  const outer = useRef<THREE.LineSegments>(null!);
  const halo = useRef<THREE.Sprite>(null!);
  const nodes = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    inner.current.rotation.y = t * 0.42;
    inner.current.rotation.x = Math.sin(t * 0.3) * 0.28;
    outer.current.rotation.y = -t * 0.24;
    outer.current.rotation.z = t * 0.15;

    // The lattice breathes each time the working hand taps.
    const beat = 0.5 + Math.sin(t * 6.2) * 0.5;
    const s = 1 + beat * 0.035;
    inner.current.scale.setScalar(s);
    nodes.current.scale.setScalar(s);
    halo.current.scale.setScalar(1.9 + beat * 0.25);
    (halo.current.material as THREE.SpriteMaterial).opacity = 0.5 + beat * 0.2;
  });

  return (
    <group position={CORE}>
      <group ref={inner}>
        <lineSegments geometry={coreWire}>
          <lineBasicMaterial
            color="#d8b4fe"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </lineSegments>
        {/* Faint solid shell so the wireframe reads as a volume, not a scribble. */}
        <mesh geometry={geo.coreSolid}>
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <points ref={nodes} geometry={geo.coreSolid}>
        <pointsMaterial
          size={0.05}
          color="#f5e9ff"
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      <lineSegments ref={outer} geometry={coreOuterWire}>
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>

      <sprite ref={halo} scale={[1.9, 1.9, 1]}>
        <spriteMaterial
          map={glow}
          color="#a855f7"
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.55}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

/**
 * Code shards: panels of source drifting in from the surrounding space,
 * shrinking onto the lattice and dissolving as they land.
 */
function Shards({ kit }: { kit: Kit }) {
  const { geo } = kit;
  const code = useMemo(() => makeCodeTexture(1337), []);
  const group = useRef<THREE.Group>(null!);
  const items = useRef<(THREE.Group | null)[]>([]);
  const { camera } = useThree();

  const COUNT = 9;
  const orbits = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const rnd = makeRng(200 + i);
        return {
          offset: i / COUNT + rnd() * 0.03,
          speed: 0.1 + rnd() * 0.05,
          angle: (i / COUNT) * Math.PI * 2 + rnd() * 0.4,
          depth: (rnd() - 0.5) * 0.35,
          radius: 0.62 + rnd() * 0.3,
          uv: [rnd() * 0.6, rnd() * 0.55] as [number, number],
        };
      }),
    [],
  );

  useEffect(() => () => code.dispose(), [code]);

  const scratch = useRef({ q: new THREE.Quaternion(), pq: new THREE.Quaternion() });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const { q, pq } = scratch.current;
    group.current.getWorldQuaternion(pq);
    pq.invert();

    for (let i = 0; i < COUNT; i++) {
      const m = items.current[i];
      if (!m) continue;
      const o = orbits[i];
      const p = (t * o.speed + o.offset) % 1; // 0 = drifting, 1 = absorbed
      const e = p * p; // accelerate as it's pulled in
      const r = o.radius * (1 - e) + 0.4 * e;
      const a = o.angle + p * 1.6;

      // A halo in the plane facing the camera, so the shards always read as
      // panels circling the lattice rather than streaks crossing the robot.
      m.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.8, o.depth);
      // Fade in from the dark, blow out on contact.
      const fade = Math.min(1, p * 5) * Math.max(0, 1 - Math.pow(p, 5));
      m.scale.setScalar(0.8 + (1 - e) * 0.3);
      m.children.forEach((c) => {
        const mm = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mm.opacity = fade * (mm.userData.base as number);
      });

      // Billboard, compensating for the robot group's own rotation.
      q.copy(camera.quaternion).premultiply(pq);
      m.quaternion.copy(q);
    }
  });

  return (
    <group ref={group} position={CORE}>
      {orbits.map((o, i) => (
        <group
          key={i}
          ref={(el) => {
            items.current[i] = el;
          }}
        >
          {/* Smoked-glass backing so the code sits on a panel. */}
          <mesh geometry={geo.shard} position={[0, 0, -0.004]}>
            <meshBasicMaterial
              color="#170c2e"
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
              onUpdate={(m: THREE.MeshBasicMaterial) => {
                m.userData.base = 0.6;
              }}
            />
          </mesh>
          <mesh geometry={geo.shard}>
            <meshBasicMaterial
              map={code}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
              // Each shard shows a different slice of the same sheet.
              onUpdate={(m: THREE.MeshBasicMaterial) => {
                m.userData.base = 0.8;
                if (!m.userData.sliced && m.map) {
                  const tex = m.map.clone();
                  tex.needsUpdate = true;
                  tex.repeat.set(0.38, 0.4);
                  tex.offset.set(o.uv[0], o.uv[1]);
                  m.map = tex;
                  m.userData.sliced = true;
                }
              }}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** The cone of light from the open palm that holds the lattice up. */
function ProjectorBeam({ from }: { from: [number, number, number] }) {
  const tex = useMemo(() => makeBeamTexture(), []);
  const mesh = useRef<THREE.Mesh>(null!);
  useEffect(() => () => tex.dispose(), [tex]);

  const { pos, len, quat } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const dir = CORE.clone().sub(a);
    const len = dir.length();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    // Stop short of the lattice centre so the cone never spears through it.
    return { pos: a.clone().addScaledVector(dir, 0.34), len: len * 0.66, quat };
  }, [from]);

  useFrame(({ clock }) => {
    const flicker = 0.78 + Math.sin(clock.elapsedTime * 9) * 0.06 + Math.sin(clock.elapsedTime * 3.3) * 0.1;
    (mesh.current.material as THREE.MeshBasicMaterial).opacity = flicker * 0.4;
  });

  return (
    <mesh ref={mesh} position={pos} quaternion={quat} scale={[1, len, 1]}>
      <cylinderGeometry args={[0.2, 0.045, 1, 20, 1, true]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Sparks thrown off the working hand and pulled into the lattice. */
function Sparks({ from }: { from: [number, number, number] }) {
  const pts = useRef<THREE.Points>(null!);
  const COUNT = 26;
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const rnd = makeRng(400 + i);
        return {
          t0: rnd(),
          speed: 0.5 + rnd() * 0.5,
          jitter: new THREE.Vector3(
            (rnd() - 0.5) * 0.5,
            (rnd() - 0.5) * 0.5,
            (rnd() - 0.5) * 0.4,
          ),
        };
      }),
    [],
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const a = useMemo(() => new THREE.Vector3(...from), [from]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const attr = pts.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      const p = (t * s.speed + s.t0) % 1;
      // Straight run from hand to lattice, bowed out by the seed's jitter.
      const bow = Math.sin(p * Math.PI);
      arr[i * 3] = a.x + (CORE.x - a.x) * p + s.jitter.x * bow;
      arr[i * 3 + 1] = a.y + (CORE.y - a.y) * p + s.jitter.y * bow;
      arr[i * 3 + 2] = a.z + (CORE.z - a.z) * p + s.jitter.z * bow;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pts} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#e9d5ff"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient dust + orbital rings — carried over from the SVG version.    */

function Dust() {
  const pts = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const rnd = makeRng(88);
    const N = 140;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 2 + rnd() * 2.6;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = (rnd() - 0.4) * 3.4;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) * 0.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    pts.current.rotation.y = clock.elapsedTime * 0.035;
    pts.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <points ref={pts} geometry={geo}>
      <pointsMaterial
        size={0.035}
        color="#c084fc"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Rings({ kit }: { kit: Kit }) {
  const { geo } = kit;
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    a.current.rotation.z = t * 0.1;
    b.current.rotation.z = -t * 0.07;
  });
  return (
    <group position={[0, 0.2, -0.9]}>
      <mesh ref={a} geometry={geo.ring} rotation={[1.28, 0, 0]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <mesh ref={b} geometry={geo.ring} rotation={[1.45, 0.4, 0]} scale={0.82}>
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Full rig                                                             */

// Roughly where each hand ends up once the arm poses settle — the beam and
// the sparks start here rather than being parented to the moving wrist, which
// keeps them from jittering with every finger tap.
const PALM_HAND: [number, number, number] = [-0.76, -0.48, 0.74];
const WORK_HAND: [number, number, number] = [-0.06, 0.32, 0.86];

function Robot({ glow }: { glow: THREE.Texture }) {
  const kit = useKit();
  const { geo, mat } = kit;
  const root = useRef<THREE.Group>(null!);
  const torso = useRef<THREE.Group>(null!);

  useEffect(() => kit.dispose, [kit]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    // The whole rig floats — nothing is standing on anything.
    root.current.position.y = -0.16 + Math.sin(t * 0.85) * 0.06;
    const k = 1 - Math.pow(0.02, dt);
    root.current.rotation.y +=
      (-0.2 + THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.16 - root.current.rotation.y) * k;
    torso.current.scale.y = 1 + Math.sin(t * 1.7) * 0.008;
    torso.current.rotation.x = 0.05 + Math.sin(t * 0.85) * 0.012;
  });

  return (
    <group ref={root} position={[0, -0.16, 0]}>
      <group ref={torso}>
        <mesh geometry={geo.torso} material={mat.shell} />
        <mesh geometry={geo.chestPlate} material={mat.shellLight} position={[0, 0.12, 0.29]} />
        <mesh geometry={geo.hip} material={mat.shellLight} position={[0, -0.66, 0]} />
        {/* No legs: the body tapers into a hover thruster, which keeps the
            silhouette clean and sells the float. */}
        <mesh geometry={geo.waist} material={mat.shell} position={[0, -1.06, 0]} />
        <mesh geometry={geo.thruster} material={mat.shellLight} position={[0, -1.42, 0]} />
        <mesh geometry={geo.thrusterRing} material={mat.accentCool} position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={geo.vent} material={mat.accentCool} position={[0, -0.32, 0.32]} scale={[0.6, 0.55, 0.55]} />
        <mesh geometry={geo.vent} material={mat.accentCool} position={[0, -0.43, 0.3]} scale={[0.42, 0.55, 0.55]} />
        <mesh geometry={geo.neck} material={mat.shellLight} position={[0, 0.64, 0]} />
        <Reactor kit={kit} glow={glow} />
      </group>

      <Head kit={kit} glow={glow} />
      <Arm kit={kit} side={-1} mode="project" glow={glow} />
      <Arm kit={kit} side={1} mode="conjure" glow={glow} />

      <CodeCore kit={kit} glow={glow} />
      <Shards kit={kit} />
      <ProjectorBeam from={PALM_HAND} />
      <Sparks from={WORK_HAND} />
      <Rings kit={kit} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Stage: lights, environment, floor smudge, perf watchdog              */

function Stage({ onDowngrade, forced }: { onDowngrade: () => void; forced: boolean }) {
  const { gl, scene, camera } = useThree();
  const glow = useMemo(() => makeGlowTexture(), []);
  const shadow = useMemo(() => makeShadowTexture(), []);

  useEffect(() => {
    camera.lookAt(-0.3, 0.05, 0.3);
  }, [camera]);

  // Procedural room IBL — without it, metalness reads as flat black. Scene
  // setup in r3f is imperative by design: `scene` is a three.js object the
  // renderer owns, not React state, so assigning to it here is the documented
  // pattern rather than a mutation the compiler needs to track.
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = env;
    scene.environmentIntensity = 0.4;
    pmrem.dispose();
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);

  useEffect(
    () => () => {
      glow.dispose();
      shadow.dispose();
    },
    [glow, shadow],
  );

  // Last line of defence: if this machine genuinely can't hold a usable frame
  // rate, tear the canvas down and let the SVG take over. Deliberately hard to
  // trip — the first seconds are shader compilation and IBL generation, and a
  // backgrounded tab throttles rAF, so neither is allowed to count.
  const warmup = useRef(0);
  const frames = useRef(0);
  const elapsed = useRef(0);
  const settled = useRef(false);
  useFrame((_, dt) => {
    if (settled.current) return;
    if (forced) return;
    if (document.hidden || dt > 0.4) {
      // Parked or hitching on a single catch-up frame — start the count over.
      warmup.current = 0;
      frames.current = 0;
      elapsed.current = 0;
      return;
    }
    if (warmup.current < 3) {
      warmup.current += dt;
      return;
    }
    frames.current++;
    elapsed.current += dt;
    if (elapsed.current > 3) {
      settled.current = true;
      if (frames.current / elapsed.current < 24) onDowngrade();
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#7c6aa8" />
      <directionalLight position={[3.2, 4.5, 3.5]} intensity={1.5} />
      <pointLight position={[-2.6, 1.2, 1.6]} intensity={14} distance={12} color="#a855f7" />
      <pointLight position={[2.8, 0.8, -2.2]} intensity={11} distance={12} color="#22d3ee" />
      {/* Bounce from the lattice onto the face, chest and hands. */}
      <pointLight position={CORE} intensity={11} distance={4.5} color="#c084fc" />

      <Robot glow={glow} />
      <Dust />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0.35]}>
        <planeGeometry args={[4.6, 3.2]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.75} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */

export default function HeroRobotScene({
  active,
  onReady,
  onDowngrade,
}: {
  active: boolean;
  onReady: () => void;
  onDowngrade: () => void;
}) {
  usePointerTracking();

  // r3f measures its container with a ResizeObserver, which here mounts into a
  // box that is already laid out — and so never fires an initial callback,
  // leaving the canvas at its default 300x150 with the renderer uninitialised.
  // Nudging window resize gets it measured; we retry until the drawing buffer
  // is real, since the first nudge can land before r3f's own listener is on.
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nudge = () => {
      const c = host.current?.querySelector('canvas');
      if (c && c.width > 300) return true;
      window.dispatchEvent(new Event('resize'));
      return false;
    };
    let tries = 0;
    const id = window.setInterval(() => {
      if (nudge() || ++tries > 12) window.clearInterval(id);
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div ref={host} className="w-full h-full">
      <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.6]}
      camera={{ position: [0.1, 0.45, 7.1], fov: 32 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        // One more frame before we let the SVG fade out, so the hand-off
        // never shows an empty box.
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
      style={{ pointerEvents: 'none' }}
      >
        <Stage onDowngrade={onDowngrade} forced={isForced()} />
      </Canvas>
    </div>
  );
}
