'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useTexture,
  ContactShadows,
  Environment,
  PerspectiveCamera,
  Float,
  Preload,
} from '@react-three/drei';
import { useRef, useEffect, useMemo, Suspense, memo } from 'react';
import * as THREE from 'three';
import { useCup } from '@/lib/cupContext';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Per-section targets (Three.js world space) ───────────────
// x: horizontal offset (+ = right), y: vertical, scale, cameraZ
const SECTION_TARGETS = {
  hero:     { x: 0,    y: 0.5,  scale: 1.00, cameraZ: 36, opacity: 1.00 },
  features: { x: 8.5,  y: 0.5,  scale: 0.74, cameraZ: 40, opacity: 0.92 },
  models:   { x: 9.0,  y: -0.5, scale: 0.80, cameraZ: 38, opacity: 0.95 },
  contact:  { x: 7.5,  y: 1.5,  scale: 0.58, cameraZ: 44, opacity: 0.75 },
};

// ─── Floating label that shows section name ───────────────────
const SECTION_LABELS = {
  hero:     null,
  features: 'MATERIAL',
  models:   'DIMENSIONS',
  contact:  'INQUIRE NOW',
};

// ─── CupModel — colors lerp + group position/scale lerp ───────
const CupModel = memo(function CupModel({ sectionRef, productRef, spinKickRef }) {
  const groupRef   = useRef();
  const bodyMatRef = useRef();
  const rimMatRef  = useRef();
  const baseMatRef = useRef();

  const texture = useTexture('/design.jpg');
  const { gl }  = useThree();

  useEffect(() => {
    texture.anisotropy  = Math.min(gl.capabilities.getMaxAnisotropy(), 8);
    texture.flipY       = true;
    texture.wrapS       = THREE.RepeatWrapping;
    texture.wrapT       = THREE.RepeatWrapping;
    texture.offset.x    = 0.5;
    texture.repeat.set(1, 1);
    texture.colorSpace  = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture, gl]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const section = sectionRef.current  || 'hero';
    const product = productRef.current;
    const target  = SECTION_TARGETS[section] || SECTION_TARGETS.hero;

    // ── Smooth group position / scale ──
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, target.x, 0.055
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, target.y, 0.055
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, target.scale, 0.055)
    );

    // ── Continuous idle + mouse tilt ──
    groupRef.current.rotation.y += 0.004;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, state.mouse.y * -0.07, 0.07
    );

    // ── Spin kick on product change ──
    if (spinKickRef.current > 0) {
      groupRef.current.rotation.y += spinKickRef.current * delta * 7;
      spinKickRef.current = THREE.MathUtils.lerp(spinKickRef.current, 0, 0.05);
      if (spinKickRef.current < 0.002) spinKickRef.current = 0;
    }

    // ── Smooth color lerp ──
    if (product) {
      const bodyColor = new THREE.Color(product.bodyColor);
      const rimColor  = new THREE.Color(product.rimColor);
      bodyMatRef.current?.color.lerp(bodyColor, 0.07);
      rimMatRef.current?.color.lerp(rimColor,  0.07);
      baseMatRef.current?.color.lerp(rimColor,  0.07);
    }
  });

  const height      = 13;
  const topRadius   = 4.45;
  const bottomRadius = 2.9;

  return (
    <group ref={groupRef} dispose={null}>
      <mesh castShadow>
        <cylinderGeometry args={[topRadius, bottomRadius, height, 64, 1, true]} />
        <meshPhysicalMaterial
          ref={bodyMatRef}
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.10}
        />
      </mesh>
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[topRadius, 0.22, 16, 64]} />
        <meshStandardMaterial ref={rimMatRef} roughness={0.15} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[bottomRadius, 32]} />
        <meshStandardMaterial ref={baseMatRef} />
      </mesh>
    </group>
  );
});

// ─── Camera follows the cup (lerps Z) ─────────────────────────
function CameraRig({ sectionRef }) {
  const camRef = useRef();

  useFrame(() => {
    if (!camRef.current) return;
    const section = sectionRef.current || 'hero';
    const targetZ = SECTION_TARGETS[section]?.cameraZ ?? 38;
    camRef.current.position.z = THREE.MathUtils.lerp(
      camRef.current.position.z, targetZ, 0.05
    );
    camRef.current.updateProjectionMatrix();
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 2, 36]} fov={35} />;
}

// ─── Accent point light follows product color ──────────────────
function AccentLight({ productRef }) {
  const lightRef = useRef();
  useFrame(() => {
    if (!lightRef.current || !productRef.current) return;
    const c = new THREE.Color(productRef.current.accent);
    lightRef.current.color.lerp(c, 0.06);
  });
  return <pointLight ref={lightRef} position={[-14, 4, -8]} intensity={1.4} />;
}

// ─── Loader fallback ──────────────────────────────────────────
function Loader() {
  return (
    <mesh>
      <cylinderGeometry args={[3, 2, 8, 16, 1, true]} />
      <meshStandardMaterial color="#111" wireframe />
    </mesh>
  );
}

// ─── Inner canvas scene ───────────────────────────────────────
function Scene({ sectionRef, productRef, spinKickRef }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      performance={{ min: 0.5 }}
    >
      <CameraRig sectionRef={sectionRef} />
      <Environment preset="studio" />
      <spotLight position={[20, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow shadow-mapSize={[512, 512]} />
      <ambientLight intensity={0.65} />
      <AccentLight productRef={productRef} />

      <Suspense fallback={<Loader />}>
        <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[-0.15, 0.15]}>
          <CupModel sectionRef={sectionRef} productRef={productRef} spinKickRef={spinKickRef} />
        </Float>
        <Preload all />
      </Suspense>

      <ContactShadows position={[0, -7, 0]} opacity={0.3} scale={40} blur={2.5} far={4} resolution={256} />
    </Canvas>
  );
}

// ─── PersistentCup — the exported component ───────────────────
/**
 * Drop this anywhere on the page (e.g. inside the hero section wrapper).
 * It renders a fixed full-viewport canvas that persists through all sections.
 * The cup position/scale/color animate automatically via CupContext.
 */
export default function PersistentCup() {
  const { section, product, spinKick } = useCup();

  // Stable refs so Three.js useFrame always sees the latest value without re-mounting
  const sectionRef = useRef(section);
  const productRef = useRef(product);

  useEffect(() => { sectionRef.current = section; }, [section]);
  useEffect(() => { productRef.current = product;  }, [product]);

  const opacity = SECTION_TARGETS[section]?.opacity ?? 1;

  return (
    <>
      {/* Fixed full-viewport canvas — pointer-events:none so it never blocks UI */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 18,
          opacity,
          transition: 'opacity 1s ease',
        }}
      >
        <Scene sectionRef={sectionRef} productRef={productRef} spinKickRef={spinKick} />
      </div>

      {/* Floating section label near cup (desktop only) */}
      <AnimatePresence>
        {section !== 'hero' && SECTION_LABELS[section] && (
          <motion.div
            key={section}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-[20%] right-[4%] z-[19] hidden lg:block pointer-events-none"
          >
            <div
              className="text-[9px] font-mono tracking-[0.4em] px-3 py-1.5 rounded-full border"
              style={{
                color: product?.accent ?? '#22c55e',
                borderColor: `${product?.accent ?? '#22c55e'}40`,
                background: `${product?.accent ?? '#22c55e'}0a`,
              }}
            >
              {SECTION_LABELS[section]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
