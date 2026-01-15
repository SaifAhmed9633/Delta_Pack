'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  useTexture, 
  ContactShadows, 
  Environment, 
  PerspectiveCamera, 
  Float 
} from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function CupModel() {
  const meshRef = useRef();
  const texture = useTexture('/design.jpg');
  
  // نستخدم useThree للوصول لإمكانيات كارت الشاشة
  const { gl } = useThree();

  useEffect(() => {
    // 1. تحسين جودة الصورة (Anisotropy) لتكون حادة من الزوايا
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    
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
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      state.mouse.y * -0.1, 
      0.1
    );
  });

  // الأبعاد (ثابتة كما طلبت)
  const height = 13;
  const topRadius = 4.45;
  const bottomRadius = 2.9;

  return (
    <group ref={meshRef} dispose={null}>
      {/* 1. جسم الكوب */}
      <mesh castShadow receiveShadow frustumCulled={false}>
        {/* زيادة التنعيم: 128 بدلاً من 64 */}
        <cylinderGeometry args={[topRadius, bottomRadius, height, 128, 1, true]} />
        
        {/* استخدام PhysicalMaterial لواقعية أكثر */}
        <meshPhysicalMaterial 
          map={texture} 
          side={THREE.DoubleSide} 
          roughness={0.2}       // نعومة الورق المصقول
          metalness={0.1} 
          clearcoat={0.1}       // طبقة ورنيش خفيفة جداً
          clearcoatRoughness={0.1}
          reflectivity={0.5}
        />
      </mesh>

      {/* 2. الحافة العلوية (Rim) */}
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} frustumCulled={false}>
        <torusGeometry args={[topRadius, 0.2, 32, 128]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.1} />
      </mesh>

      {/* 3. القاعدة */}
      <mesh position={[0, -height / 2 + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
        <circleGeometry args={[bottomRadius, 64]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

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
        // ⚠️ هام: التغيير لـ [1, 2] يعطي دقة عالية جداً
        // لو الجهاز هنج (Crash) رجعها لـ 1 تاني
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping, // تحسين الألوان والإضاءة
          toneMappingExposure: 1.2
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 40]} fov={35} near={0.1} far={1000} />
        
        {/* إضاءة بيئة الاستوديو */}
        <Environment preset="studio" blur={0.5} />
        
        <spotLight 
          position={[20, 20, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} // زيادة الإضاءة قليلاً
          castShadow 
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.8} />

        <Suspense fallback={<Loader />}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.3, 0.3]}>
             <CupModel />
          </Float>
        </Suspense>

        {/* تحسين دقة الظل */}
        <ContactShadows 
          position={[0, -6, 0]} 
          opacity={0.5} 
          scale={40} 
          blur={2.5} 
          far={4} 
          resolution={512} // رفعنا الدقة من 256
          color="#000000"
        />
      </Canvas>
    </div>
  );
}