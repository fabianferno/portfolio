import React, { useRef, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const FabianGyro3D = () => {
  const [width, height] = useWindowSize();
  console.log(height);

  return (
    <Canvas
      style={{ height: "60vh", width: "100vw", backgroundColor: "#1f1f1f" }}
      colorManagement
    >
      <Text
        scale={[12.8, 12.5, 12.8].map((scale) => (scale * width) / 1000)}
        color="#ffffff" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        F A B I A N
      </Text>
      <OrbitControls enableRotate={false} />

      <InnerRing />
      <OuterRing />
      <OuterMostRing />
    </Canvas>
  );
};

const InnerRing = () => {
  const mesh = useRef(null);

  useFrame((state) => {
    const { camera } = state;
    if (camera.position.z > 15) {
      camera.position.z = 5;
    } else if (camera.position.z > 0) {
      camera.position.z += state.mouse.y * 0.02;
    } else {
      camera.position.z = 10;
    }

    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.05, 20, 50]} />
      <meshBasicMaterial
        attach="material"
        color={0x000000}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
};

const OuterRing = () => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.02;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[3, 0.05, 20, 50]} />
      <meshBasicMaterial
        attach="material"
        color={0x000000}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
};

const OuterMostRing = () => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.y += 0.03;
    mesh.current.rotation.x += 0.015;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[4, 0.05, 50, 50]} />
      <meshBasicMaterial
        attach="material"
        color={0x000000}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
};
