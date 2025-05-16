import { Html } from '@react-three/drei';
import { useRef } from 'react';

const MyComponent = () => {
  const containerRef = useRef(null); // Create the reference

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
      
      {/* Attach the Html component to the mesh */}
      <Html position={[0, 2, 0]} transform occlude={false}>
        {/* This is the content inside the Html component */}
        <div ref={containerRef}>
          |
        </div>
      </Html>
    </mesh>
  );
};

export default MyComponent;
