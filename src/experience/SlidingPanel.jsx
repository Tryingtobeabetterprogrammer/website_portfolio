import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Mesh } from 'three';

export const InteractiveMesh = ({ position, name, handlePointerDown }) => {
  const meshRef = useRef();

  return (
    <mesh
      ref={meshRef}
      visible={false} // Make the mesh invisible
      position={position}
      name={name}
      onPointerDown={() => handlePointerDown(name, position)} // Trigger onPointerDown event
    >
      <boxGeometry args={[1, 1, 1]} /> {/* Example: Change the geometry here */}
      <meshStandardMaterial transparent opacity={0} /> {/* Invisible material */}
    </mesh>
  );
};

export const SlidingPanel = ({ handlePointerDown }) => {
  return (
    <>
      {/* Example: Invisible mesh for the Living Room */}
      <InvisibleMesh 
        position={[1.10, 1.40, 0.46]} 
        name="LivingRoomMesh" 
        handlePointerDown={handlePointerDown} 
      />
      {/* You can add more InvisibleMeshes for other rooms */}
      
      {/* Add other content for your sliding panel here */}
    </>
  );
};
