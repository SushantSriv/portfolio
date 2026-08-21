import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei/core/MeshDistortMaterial";

function DistortBlob({ theme }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const { size } = useThree();
  const isSmall = size.width < 500;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
    if (groupRef.current) {
      // Subtle mouse-parallax: lerp group rotation toward pointer position.
      const targetX = state.mouse.y * 0.25;
      const targetY = state.mouse.x * 0.25;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y +=
        (targetY - groupRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={isSmall ? 1.15 : 1.4}>
        <icosahedronBufferGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color={theme.imageHighlight}
          emissive={theme.jacketColor}
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.35}
          distort={0.4}
          speed={1.6}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DScene({ theme }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight color={theme.body} intensity={0.6} />
      <pointLight
        position={[4, 4, 4]}
        color={theme.highlight}
        intensity={1.1}
      />
      <pointLight
        position={[-4, -2, -3]}
        color={theme.imageHighlight}
        intensity={0.5}
      />
      <Suspense fallback={null}>
        <DistortBlob theme={theme} />
      </Suspense>
    </Canvas>
  );
}
