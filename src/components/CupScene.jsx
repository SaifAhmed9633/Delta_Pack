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

/**
 * CupModel
 * - Smoothly lerps body + rim color toward the target product color.
 * - Listens for a `spinKick` ref that we pulse whenever the product changes,
 *   giving a quick rotation flourish on transition.
 */
const CupModel = memo(function CupModel({ product, spinKick }) {
  const meshRef = useRef();
  const bodyMatRef = useRef();
  const rimMatRef = useRef();
  const baseMatRef = useRef();

  const texture = useTexture('/design.jpg');
  const { gl } = useThree();

  // Target colors as THREE.Color (memoized per product)
  const targetBody = useMemo(() => new THREE.Color(product.bodyColor), [product.bodyColor]);
  const targetRim = useMemo(() => new THREE.Color(product.rimColor), [product.rimColor]);

  useEffect(() => {
    texture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 8);
    texture.flipY = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.offset.x = 0.5;
    texture.repeat.set(1, 1);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture, gl]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Continuous idle rotation
    meshRef.current.rotation.y += 0.004;

    // Transition kick — burst of rotation decays over time
    if (spinKick?.current > 0) {
      meshRef.current.rotation.y += spinKick.current * delta * 6;
      spinKick.current = THREE.MathUtils.lerp(spinKick.current, 0, 0.06);
      if (spinKick.current < 0.001) spinKick.current = 0;
    }

    // Mouse tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      state.mouse.y * -0.08,
      0.08
    );

    // Smooth color transitions
    if (bodyMatRef.current) {
      bodyMatRef.current.color.lerp(targetBody, 0.08);
    }
    if (rimMatRef.current) {
      rimMatRef.current.color.lerp(targetRim, 0.08);
    }
    if (baseMatRef.current) {
      baseMatRef.current.color.lerp(targetRim, 0.08);
    }
  });

  const height = 13;
  const topRadius = 4.45;
  const bottomRadius = 2.9;

  return (
    <group ref={meshRef} dispose={null}>
      {/* Cup Body */}
      <mesh castShadow>
        <cylinderGeometry args={[topRadius, bottomRadius, height, 64, 1, true]} />
        <meshPhysicalMaterial
          ref={bodyMatRef}
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.08}
        />
      </mesh>

      {/* Top Rim */}
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[topRadius, 0.2, 16, 64]} />
        <meshStandardMaterial ref={rimMatRef} roughness={0.15} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -height / 2 + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[bottomRadius, 32]} />
        <meshStandardMaterial ref={baseMatRef} />
      </mesh>
    </group>
  );
});

/** Camera rig: lerps the camera along Z according to `zoomRef.current` (0..1). */
function CameraRig({ zoomRef }) {
  const camRef = useRef();

  useFrame(() => {
    if (!camRef.current) return;
    const t = zoomRef?.current ?? 0;
    // z goes from 40 (far) down to 22 (close-up) as user scrolls
    const targetZ = THREE.MathUtils.lerp(40, 22, t);
    const targetY = THREE.MathUtils.lerp(2, 0.5, t);
    camRef.current.position.z = THREE.MathUtils.lerp(camRef.current.position.z, targetZ, 0.08);
    camRef.current.position.y = THREE.MathUtils.lerp(camRef.current.position.y, targetY, 0.08);
    camRef.current.updateProjectionMatrix();
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 2, 40]} fov={35} />;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

/**
 * CupScene
 * @param {object} props
 * @param {object} props.product    - current product (from products.js)
 * @param {React.MutableRefObject<number>} props.zoomRef  - 0..1 scroll-driven zoom
 * @param {React.MutableRefObject<number>} props.spinKick - transition rotation kick
 */
export default function CupScene({ product, zoomRef, spinKick }) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        performance={{ min: 0.5 }}
      >
        <CameraRig zoomRef={zoomRef} />

        <Environment preset="studio" />
        <spotLight
          position={[20, 20, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.8}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <ambientLight intensity={0.7} />
        {/* Accent rim light tinted by the product */}
        <pointLight position={[-15, 5, -10]} intensity={1.2} color={product.accent} />

        <Suspense fallback={<Loader />}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4} floatingRange={[-0.2, 0.2]}>
            <CupModel product={product} spinKick={spinKick} />
          </Float>
          <Preload all />
        </Suspense>

        <ContactShadows
          position={[0, -6, 0]}
          opacity={0.4}
          scale={35}
          blur={2}
          far={4}
          resolution={256}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
