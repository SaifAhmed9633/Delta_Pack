'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  useTexture, 
  ContactShadows, 
  Environment, 
  PerspectiveCamera, 
  Float,
  Preload
} from '@react-three/drei';
import { useRef, useEffect, Suspense, memo } from 'react';
import * as THREE from 'three';

// Memoized Cup Model to prevent unnecessary re-renders
const CupModel = memo(function CupModel() {
  const meshRef = useRef();
  const texture = useTexture('/design.jpg');
  const { gl } = useThree();

  useEffect(() => {
    texture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 8); // Cap anisotropy
    texture.flipY = true;
    texture.wrapS = THREE.RepeatWrapping; 
    texture.wrapT = THREE.RepeatWrapping;
    texture.offset.x = 0.5; 
    texture.repeat.set(1, 1);
    texture.colorSpace = THREE.SRGBColorSpace; 
    texture.needsUpdate = true;
  }, [texture, gl]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.004; // Slightly slower rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      state.mouse.y * -0.08, // Reduced mouse sensitivity
      0.08
    );
  });

  const height = 13;
  const topRadius = 4.45;
  const bottomRadius = 2.9;

  return (
    <group ref={meshRef} dispose={null}>
      {/* Cup Body - Reduced segments for performance */}
      <mesh castShadow>
        <cylinderGeometry args={[topRadius, bottomRadius, height, 64, 1, true]} />
        <meshPhysicalMaterial 
          map={texture} 
          side={THREE.DoubleSide} 
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.08}
        />
      </mesh>

      {/* Top Rim - Reduced segments */}
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[topRadius, 0.2, 16, 64]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.15} />
      </mesh>

      {/* Base - Reduced segments */}
      <mesh position={[0, -height / 2 + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[bottomRadius, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
});

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

export default function CupScene() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas 
        shadows
        dpr={[1, 1.5]} // Reduced max DPR for performance
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
        performance={{ min: 0.5 }} // Allow frame rate adjustment
      >
        <PerspectiveCamera makeDefault position={[0, 2, 40]} fov={35} />
        
        {/* Simplified lighting */}
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

        <Suspense fallback={<Loader />}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4} floatingRange={[-0.2, 0.2]}>
            <CupModel />
          </Float>
          <Preload all />
        </Suspense>

        {/* Optimized shadows */}
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
