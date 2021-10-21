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

export const HeroThree = () => {
  const [width, height] = useWindowSize();
  console.log(height);

  return (
    <Canvas style={{ height: "60vh", width: "100vw" }} colorManagement>
      <color attach="background" args={"#1f1f1f"} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 0, 0]} intensity={0.5} />
      <Light brightness={10} color={"#00ff00"} position={[-5, 3, 6]} />

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

const InnerRing = () => {
  const mesh = useRef(null);

  useFrame((state) => {
    const { camera } = state;
    // camera.rotation.y = state.mouse.x * 0.2;
    // camera.rotation.x = state.mouse.y * 0.2;
    if (camera.position.z > 15) {
      camera.position.z = 5;
    } else if (camera.position.z > 0) {
      camera.position.z += state.mouse.y * 0.02;
    } else {
      camera.position.z = 5;
    }

    // mesh.current.rotation.x = state.mouse.y * 5;
    // mesh.current.rotation.y = state.mouse.x * 5;

    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.05, 20, 50]} />
      <meshBasicMaterial
        attach="material"
        color={0x222222}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
};

const OuterRing = () => {
  const mesh = useRef(null);
  useFrame((state) => {
    //const { camera } = state;

    // camera.rotation.x = state.mouse.y * 0.15;

    // mesh.current.rotation.y = state.mouse.y * 3;
    // mesh.current.rotation.x = state.mouse.x * 3;

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
  useFrame((state) => {
    //const { camera } = state;

    // camera.rotation.x = state.mouse.y * 0.15;

    // mesh.current.rotation.y = state.mouse.y * 3;
    // mesh.current.rotation.x = state.mouse.x * 3;

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
