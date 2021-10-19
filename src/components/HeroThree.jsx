import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

export const HeroThree = () => {
  return (
    <Canvas style={{ height: "60vh", width: "100vw" }} colorManagement>
      <color attach="background" args={"#1f1f1f"} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 0, 0]} intensity={0.5} />
      <Light brightness={10} color={"#00ff00"} position={[-5, 3, 6]} />

      <Text
        scale={[15, 13.5, 15]}
        color="#ffffff" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        F A B I A N
      </Text>
      <OrbitControls />

      <Ring />
    </Canvas>
  );
};

const Light = ({ brightness, color, position }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={position}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
};

const Ring = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[1.8, 0.05, 20, 50]} />
      <meshBasicMaterial
        attach="material"
        color={0x222222}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
};
