'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useSpring } from 'framer-motion';

function DynamicCupModel({ config, texturePath }) {
  const meshRef = useRef();
  
  // لو مفيش صورة جاية من الداتابيز، استخدم صورة بيضاء أو افتراضية
  const texture = useTexture(texturePath && texturePath.length > 10 ? texturePath : '/design.jpg'); 
  const { gl } = useThree();

  useEffect(() => {
    if(texture) {
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.colorSpace = THREE.SRGBColorSpace; 
      
      // معادلة ضبط الصورة
      const REFERENCE_HEIGHT = 8.0; 
      const scaleFactor = (config.height || 8) / REFERENCE_HEIGHT;

      texture.repeat.set(1, 1 * scaleFactor);
      texture.offset.set(0, (1 - scaleFactor) / 2);
      texture.wrapS = THREE.RepeatWrapping; 
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
    }
  }, [texture, gl, config.height]);

  // مفتاح سحري: كل ما الأبعاد تتغير، المفتاح ده بيتغير فالرياكت بيبني الشكل من جديد
  const geometryKey = `${config.top}-${config.bottom}-${config.height}`;

  return (
    <group>
      {/* جسم الكوب */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Key هنا مهم جداً للتحديث الفوري */}
        <cylinderGeometry key={geometryKey} args={[config.top, config.bottom, config.height, 64, 1, true]} />
        <meshPhysicalMaterial 
          map={texture} 
          side={THREE.DoubleSide} 
          roughness={0.3} 
          metalness={0.05}
          clearcoat={0.1}
        />
      </mesh>

      {/* الحافة العلوية */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, config.height/2, 0]}>
        <torusGeometry key={`rim-${config.top}`} args={[config.top, 0.08, 64, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* القاع */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -config.height/2 + 0.3, 0]}>
        <circleGeometry key={`base-${config.bottom}`} args={[config.bottom - 0.05, 64]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function CupShowcase({ config, texturePath }) {
  // قيم افتراضية عشان لو الداتابيز بعتت قيم فاضية الكود ميضربش
  const safeConfig = {
    height: Number(config?.height) || 8,
    top: Number(config?.top) || 4,
    bottom: Number(config?.bottom) || 3
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#000]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <PerspectiveCamera makeDefault position={[0, 5, 55]} fov={20} />
        
        <Stage environment="city" intensity={0.6} shadows={false} adjustCamera={false}>
          <DynamicCupModel config={safeConfig} texturePath={texturePath} />
        </Stage>

        <OrbitControls 
          makeDefault 
          enablePan={false}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.6}
          minDistance={20}
          maxDistance={100}
        />
      </Canvas>
    </div>
  );
}