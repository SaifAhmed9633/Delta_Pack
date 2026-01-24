'use client';
import { Canvas, useThree } from '@react-three/fiber';
import { useTexture, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function StaticCup({ config, texturePath }) {
  const meshRef = useRef();
  
  const texture = useTexture(texturePath && texturePath.length > 10 ? texturePath : '/design.jpg'); 
  const { gl } = useThree();

  useEffect(() => {
    if(texture) {
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.colorSpace = THREE.SRGBColorSpace; 
      
      // Center the texture on the cup - offset by 0.25 to show front of design
      texture.repeat.set(1, 1);
      texture.offset.set(0.25, 0);  // Shift texture to center the logo/design
      texture.wrapS = THREE.RepeatWrapping; 
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
    }
  }, [texture, gl, config.height]);

  const geometryKey = `${config.top}-${config.bottom}-${config.height}`;

  return (
    <group rotation={[0, 0, 0]}>
      {/* Cup Body */}
      <mesh ref={meshRef}>
        <cylinderGeometry key={geometryKey} args={[config.top, config.bottom, config.height, 64, 1, true]} />
        <meshPhysicalMaterial 
          map={texture} 
          side={THREE.DoubleSide} 
          roughness={0.4} 
          metalness={0.02}
          clearcoat={0.15}
        />
      </mesh>

      {/* Top Rim / Lid */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, config.height/2, 0]}>
        <torusGeometry key={`rim-${config.top}`} args={[config.top, 0.12, 32, 64]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} />
      </mesh>
      
      {/* Lid Top */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, config.height/2 + 0.1, 0]}>
        <circleGeometry args={[config.top - 0.05, 64]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.4} />
      </mesh>

      {/* Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -config.height/2 + 0.15, 0]}>
        <circleGeometry key={`base-${config.bottom}`} args={[config.bottom - 0.05, 64]} />
        <meshStandardMaterial color="#f5f5f5" side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
      
      {/* Shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -config.height/2 - 0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[1.5, 1.2, 3, 16, 1, true]} />
      <meshBasicMaterial color="#ddd" wireframe />
    </mesh>
  );
}

export default function CupPreview({ config, texturePath }) {
  const safeConfig = {
    height: Number(config?.height) || 8,
    top: Number(config?.top) || 4,
    bottom: Number(config?.bottom) || 3
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#f8e8f0] via-[#f5e5ed] to-[#f0dce5]">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        frameloop="demand"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 32]} fov={30} />
        
        {/* Soft Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <hemisphereLight args={['#fff', '#f5e5ed', 0.5]} />
        
        <Suspense fallback={<LoadingFallback />}>
          <StaticCup config={safeConfig} texturePath={texturePath} />
        </Suspense>
      </Canvas>
    </div>
  );
}
