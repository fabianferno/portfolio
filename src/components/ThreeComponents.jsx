import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { MeshWobbleMaterial } from "@react-three/drei";

export const Light1 = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-3, 3, 6]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
};

export const Light2 = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[3, 3, 6]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
};

export const Light3 = ({ brightness, color }) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[0, -3, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
};

export const Box = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[-1, 0, 0]} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[2.8, 2.8, 2.8]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Triangle1 = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[0, 0, 1]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 5, 6.3]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Icosahedron = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <MeshWobbleMaterial
        attach="material"
        factor={1}
        speed={0.6}
        color={0x444444}
      />
    </mesh>
  );
};

export const Ring = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.3, 16, 30]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Triangle = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[0, 0, 1]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 3, 6.3]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Diamond = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[0, 0, 1]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[2, 0.3, 26, 4, 6.3, 4]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Torusknot = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[2, 4, 4, 4]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.01}
      />
    </mesh>
  );
};

export const Sphere1 = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <sphereGeometry attach="geometry" args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial
        attach="material"
        color={0x444444}
        transparent
        roughness={0.1}
        metalness={0.01}
      />
    </mesh>
  );
};
