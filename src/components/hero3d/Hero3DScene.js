import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Particles({ theme, count = 140 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.1 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={theme.highlight}
        size={0.045}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.65}
      />
    </points>
  );
}

function TechCrystal({ theme }) {
  const coreRef = useRef();
  const shellRef = useRef();
  const groupRef = useRef();
  const { size } = useThree();
  const isSmall = size.width < 500;
  const scale = isSmall ? 1.05 : 1.3;

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.y += delta * 0.22;
    }
    if (shellRef.current) {
      // Slightly different speed than the core so the wireframe shell
      // reads as an independent orbiting layer, not a decal.
      shellRef.current.rotation.x -= delta * 0.09;
      shellRef.current.rotation.y -= delta * 0.13;
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
      <Particles theme={theme} />
      {/* Faceted crystal core - flat-shaded so each triangle reads as a
                distinct cut facet, like a gem or prism, instead of a smooth blob. */}
      <mesh ref={coreRef} scale={scale}>
        <octahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color={theme.imageHighlight}
          emissive={theme.jacketColor}
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.55}
          flatShading={true}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>
      {/* Wireframe shell floating just outside the core - a circuit/tech
                accent that catches the theme's highlight color. */}
      <mesh ref={shellRef} scale={scale * 1.18}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color={theme.highlight}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DScene({ theme }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight color={theme.body} intensity={0.6} />
      <pointLight
        position={[4, 4, 4]}
        color={theme.highlight}
        intensity={1.2}
      />
      <pointLight
        position={[-4, -2, -3]}
        color={theme.imageHighlight}
        intensity={0.6}
      />
      <Suspense fallback={null}>
        <TechCrystal theme={theme} />
      </Suspense>
    </Canvas>
  );
}
