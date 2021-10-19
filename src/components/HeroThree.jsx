import React, { useRef } from "react";
// import { MeshWobbleMaterial } from "@react-three/drei";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export const HeroThree = () => {
  return (
    <Canvas style={{ height: "50vh", width: "100vw" }} colorManagement>
      <CameraControls />

      <color attach="background" args={"#1f1f1f"} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 0, 0]} intensity={0.5} />

      <Light brightness={20} color={"#60ff9f"} position={[-5, 3, 6]} />
      <Light brightness={20} color={"#ffffff"} position={[-5, 3, 6]} />

      {/* <Icosahedron />*/}
      <Box />

      {/* <Torusknot /> */}
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

const Box = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[2.8, 2.8, 2.8]} />
      <meshStandardMaterial
        attach="material"
        color={0x222222}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
};

// const Triangle1 = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh position={[0, 0, 1]} ref={mesh}>
//       <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 5, 6.3]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x444444}
//         transparent
//         roughness={0.1}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// };

// const Icosahedron = ({ position }) => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh castShadow position={position} ref={mesh}>
//       <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
//       <MeshWobbleMaterial
//         attach="material"
//         factor={1}
//         speed={0.6}
//         color={0x444444}
//       />
//     </mesh>
//   );
// };

// const Ring = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh ref={mesh}>
//       <torusBufferGeometry attach="geometry" args={[2, 0.3, 16, 30]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x444444}
//         transparent
//         roughness={0.1}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// };

// const Triangle = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh position={[0, 0, 1]} ref={mesh}>
//       <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 3, 6.3]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x444444}
//         transparent
//         roughness={0.1}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// };

// const Diamond = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh position={[0, 0, 1]} ref={mesh}>
//       <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 4, 6.3, 4]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x444444}
//         transparent
//         roughness={0.1}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// };

// const Torusknot = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh ref={mesh}>
//       <boxBufferGeometry attach="geometry" args={[2, 4, 4, 4]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x444444}
//         transparent
//         roughness={0.1}
//         metalness={0.01}
//       />
//     </mesh>
//   );
// };

// const Sphere = () => {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh ref={mesh}>
//       <sphereGeometry attach="geometry" args={[2.5, 2.5, 2.5]} />
//       <meshStandardMaterial
//         attach="material"
//         color={0x222222}
//         transparent
//         roughness={0.1}
//         metalness={0.01}
//       />
//     </mesh>
//   );
// };
