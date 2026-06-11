'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* -------------------------------- */
/* Clean Mirror Ball (No Glitch)    */
/* -------------------------------- */
function HeroMirrorBall({ hover, lowPower }: { hover: boolean; lowPower: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<any>(null);
  const { pointer, viewport } = useThree();
  const hoverStrength = useRef(0);

  useFrame(() => {
    if (!mesh.current || !material.current) return;
    hoverStrength.current = THREE.MathUtils.lerp(hoverStrength.current, hover ? 1 : 0, 0.045);

    const targetX = (pointer.x * viewport.width) / 3;
    const targetY = (pointer.y * viewport.height) / 3;

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.06 * hoverStrength.current);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.06 * hoverStrength.current);
    mesh.current.position.z = 1.3;

    const s = THREE.MathUtils.lerp(0.01, 0.45, hoverStrength.current);
    mesh.current.scale.setScalar(s);
    mesh.current.rotation.x += 0.002;
    mesh.current.rotation.y += 0.003;

    // Kept clean - no crazy distortion
    material.current.distortion = THREE.MathUtils.lerp(material.current.distortion, 0.2, 0.08);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 1.3]} scale={0.01}>
      <icosahedronGeometry args={[1, lowPower ? 6 : 15]} />
      <MeshTransmissionMaterial
        ref={material}
        backside
        samples={lowPower ? 4 : 16}
        resolution={lowPower ? 384 : 1024}
        transmission={1}
        roughness={0}
        thickness={2}
        ior={1.45}
        chromaticAberration={0.03}
        distortion={0}
        distortionScale={0.2}
        temporalDistortion={0.4}
        color="#ffffff"
      />
    </mesh>
  );
}

/* -------------------------------- */
/* Typography Settings              */
/* -------------------------------- */
function BackgroundText({ onHover }: { onHover: (hovered: boolean) => void }) {
  const { viewport } = useThree();
  
  // 1. MASSIVE SCALING:
  // Divisor of 5 makes the text fill the screen width almost entirely.
  const fontSize = viewport.width / 5;
  
  // 2. HARD LEFT ALIGNMENT:
  // viewport.width / -2 is the mathematical left edge.
  // Margin is capped at 0.8 world units (desktop) but shrinks proportionally on
  // narrow viewports so the text isn't pushed off the right edge on phones.
  const xOffset = (-viewport.width / 2) + Math.min(0.8, viewport.width * 0.08);

  // 3. FONT SOURCE:
  // Direct link to Inter Black Italic to ensure 900 weight works.
  const fontUrl = "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff";

  return (
    <group
      position={[0, 0, -2.6]}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      {/* LINE 1: CODEEEE */}
      <Text
        position={[xOffset, 1.1, 0]}
        fontSize={fontSize}
        font={fontUrl}
        fontStyle="italic"
        fontWeight={900}
        color="white"
        anchorX="left"
        anchorY="middle"
        letterSpacing={-0.1} // TIGHT: Letters almost touching
        lineHeight={0.75}
      >
        CODEEEE
      </Text>

      {/* LINE 2: LABS (To match your image) */}
      <Text
        position={[xOffset, -0.1, 0]}
        fontSize={fontSize} // Same massive size as top line
        font={fontUrl}
        fontStyle="italic"
        fontWeight={900}
        color="#888" // Subtle grey for contrast
        anchorX="left"
        anchorY="middle"
        letterSpacing={-0.1}
        lineHeight={0.75}
      >
        LABS
      </Text>

      {/* SUBTITLE: Small tag */}
      <Text
        position={[xOffset, -1.5, 0]}
        fontSize={fontSize * 0.25}
        font={fontUrl}
        fontStyle="italic"
        fontWeight={900}
        color="white"
        anchorX="left"
        anchorY="middle"
        letterSpacing={-0.05}
      >
        HIGH_FIDELITY ARCHITECTURE
      </Text>
    </group>
  );
}

/* -------------------------------- */
/* Scene Export                     */
/* -------------------------------- */
export function GlassTypographyScene() {
  const [hovered, setHovered] = useState(false);
  // Phones get a cheaper refraction setup — the mirror ball is tiny until hovered,
  // and hover barely exists on touch, so the quality drop is invisible there.
  const [lowPower, setLowPower] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)');
    setLowPower(mq.matches);
  }, []);

  return (
    <div className="w-full h-full bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
        dpr={lowPower ? [1, 1.25] : [1, 1.5]}
      >
        {/* PURE BLACK BACKGROUND */}
        <color attach="background" args={['#030303']} />
        
        {/* Clean Lighting setup */}
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />
        
        {/* City Environment provides the crisp reflections on the ball */}
        <Environment preset="city" />

        <group>
          <BackgroundText onHover={setHovered} />
          <HeroMirrorBall hover={hovered} lowPower={lowPower} />
        </group>
      </Canvas>
    </div>
  );
}