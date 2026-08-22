import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Particles({ theme, count = 140 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Shell sits just outside the ring (1.55) so particles frame the crystal
      // rather than overlapping it, while staying mostly inside the frustum.
      const radius = 1.75 + Math.random() * 1.5;
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
  const ringRef = useRef();
  const floatRef = useRef();
  const groupRef = useRef();
  const { size } = useThree();
  const isSmall = size.width < 500;
  // Camera sits at z=5.6 with a 40deg fov, so the visible half-height at the
  // origin is 5.6 * tan(20deg) ~= 2.04 world units. The outermost element is
  // the orbit ring at 1.55 * scale, which at scale 1.0 lands around 76% of
  // that - enough margin that the vertical float never clips it at the edge.
  const scale = isSmall ? 0.82 : 1.0;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.y += delta * 0.22;
      // Slow breathing scale. Two different periods on the sine so the pulse
      // never lands on an obvious loop.
      const breathe = 1 + Math.sin(t * 0.7) * 0.035;
      coreRef.current.scale.setScalar(scale * breathe);
    }
    if (shellRef.current) {
      // Slightly different speed than the core so the wireframe shell
      // reads as an independent orbiting layer, not a decal.
      shellRef.current.rotation.x -= delta * 0.09;
      shellRef.current.rotation.y -= delta * 0.13;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
      // Gentle wobble on the ring's tilt so it never reads as a flat decal.
      ringRef.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.4) * 0.22;
    }
    if (floatRef.current) {
      // Vertical bob, independent of the parallax group so mouse movement
      // and the idle float don't fight each other.
      floatRef.current.position.y = Math.sin(t * 0.8) * 0.12;
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
      <group ref={floatRef}>
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
        {/* Thin orbiting ring - reads as an orbit/scan line and gives the
            silhouette a second axis of motion to catch the eye. */}
        <mesh ref={ringRef} scale={scale}>
          <torusGeometry args={[1.55, 0.016, 12, 128]} />
          <meshBasicMaterial
            color={theme.highlight}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      </group>
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
