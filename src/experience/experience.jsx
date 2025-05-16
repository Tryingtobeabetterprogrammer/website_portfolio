import React, { useRef, useEffect, useState } from 'react';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { SlidingPanel } from './SlidingPanel'; // Corrected import
import Scene from './scene'; // Assuming Scene is another component that you have
import './RightSlidePanel.css'; // Importing styles for the panel

const Experience = () => {
  const controlsRef = useRef();
  const cameraref = useRef();
  const PointerEvent = useRef({ x: 0, y: 0 });

  const [activeRoom, setActiveRoom] = useState(null); // State for active room

  useEffect(() => {
    const onPointerMove = (event) => {
      PointerEvent.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      PointerEvent.current.y = -(event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const handleOpenPane = (room) => {
    setActiveRoom(room); // Open the panel and set the room
  };

  const closePanel = () => {
    setActiveRoom(null); // Close the panel when the user clicks the close button
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <OrthographicCamera
          ref={cameraref}
          position={[45, 39, 34]}
          rotation={[0, 1, 0]}
          zoom={40}
          makeDefault
        />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        {/* Assuming Scene contains mesh components */}
        <Scene
          cameraref={cameraref}
          PointerEvent={PointerEvent}
          controlsRef={controlsRef}
          onMeshClick={handleOpenPane} // Passing the open handler to Scene
        />
      </Canvas>

      {/* Only show SlidingPanel when there is an active room */}
      {activeRoom && (
        <SlidingPanel
          isOpen={!!activeRoom}
          roomName={activeRoom}
          onClose={closePanel}
        >
          <p>Details about {activeRoom}...</p>
        </SlidingPanel>
      )}
    </div>
  );
};

export default Experience;