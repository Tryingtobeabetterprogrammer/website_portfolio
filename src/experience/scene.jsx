import * as THREE from 'three';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import Room from "../experience/Scene_F.jsx";
import Grid from './gridPlain.jsx';
import { Html } from '@react-three/drei';
import { InteractiveMesh } from './SlidingPanel.jsx';
//import roomInfo from './roomInfo.jsx'; // Import roomInfo from a separate filem

const roomInfo = {
  'Living Room': {
    title: 'THINGS ABOUT ME:',
    description: `Hi, I am Vijay S., an engineering student from AMC Engineering College in Bangalore, Karnataka. My passion for coding began back in 12th grade, when working on a team project with friends sparked my curiosity about how computers work. That early interest grew into a deeper commitment, leading me to pursue a B.E. in Computer Science and Engineering with a specialization in Artificial Intelligence (AMIL). Since then, I have been honing my programming skills, exploring technology through hands-on projects, and steadily building my knowledge. I am an intermediate-level programmer with a strong drive to learn, improve, and take on new challenges.

    With dedication, curiosity, and a sincere love for technology, I believe I’m just getting started—and the journey ahead is full of potential.
    
    Thanks for taking the time to know me! 😊`,
        position: [1.10, 14.0, 6.00],
  },
  'Bedroom': {
    title: 'My Skill`s:',
    description: `Over time, I've built a strong foundation in programming and development tools. Here’s a list of the languages I know:

    Python

    C

    JavaScript (including Node.js and React.js)

    MySQL

I’ve also gained experience with the following tools and technologies:

    MongoDB

    Blender

    Linux (basic command-line and system operations)

My journey into technology really took off when two of my close friends and I decided to create a chatbot entirely on our own. It was a meaningful project that left a big impact on us. Since we already had Python in our 12th-grade syllabus, it made the whole process smoother and more exciting. That early success gave us the motivation to keep pushing forward.

Outside of programming, I’m an avid gamer. I own a PS4 and have spent countless hours exploring different game worlds. I’ve even experimented with reverse engineering games, driven by curiosity to understand how they work and customize gameplay to my liking.

Some of the games I’ve thoroughly enjoyed include:

    Outlast (1 & 2)

    GTA V

    Cyberpunk 2077

These experiences have not only been entertaining but have also helped sharpen my problem-solving skills and creativity—both valuable in the world of tech.
I also enjoy watching anime from time to time, especially classics like Dragon Ball Z and Attack on Titan.`,
    position: [-5.91, 7.2, -51.00],
  },
  'Office': {
    title: 'Office Space',
    description: `Welcome to my Office Room!

Here, you can connect with me through various platforms. Im active on LinkedIn, and you can also check out my coding profiles on LeetCode and Codeforces—platforms where I enjoy solving algorithmic challenges and sharpening my skills.

Beyond programming, I also enjoy working on electronics-related projects, experimenting with circuits and hardware alongside software development.

Feel free to explore the links below to see more of my work and get in touch:

• <a href="https://github.com/Tryingtobeabetterprogrammer" target="_blank" style="color:#4ea1d3;">GitHub</a><br/>
• <a href="https://www.linkedin.com/in/vijay-sharu-7661aa328" target="_blank" style="color:#4ea1d3;">LinkedIn</a><br/>
• <a href="https://leetcode.com/u/vij_sharu_dax" target="_blank" style="color:#4ea1d3;">LeetCode</a><br/>
• <a href="https://codeforces.com/profile/vijaysharu15" target="_blank" style="color:#4ea1d3;">Codeforces</a><br/>
• <a href="mailto:Vijaysharu15@gmail.com" style="color:#4ea1d3;">Email Me</a>`,
    position: [-54.3, 5.5, -50.46],
  },
  'Sport Room': {
    title: 'certificate',
    description: '.',
    position: [-49, 4, -1.9],
  },
  'Sport Room': {
    title: 'Hobby',
    description: `I enjoy staying active and exploring a variety of hobbies. I love playing table tennis, football, and going to the gym, which keep me physically fit and energetic. In my free time, I also enjoy playing video games, drawing, playing the keyboard, and watching anime to relax and express my creativity. I like spending quality time with my younger brother, cleaning my fish tank, and even trying out new recipes in the kitchen. I believe there is a lot of hidden talent within me, and I am continuously exploring new activities to discover and develop my skills.`,
    position: [-65, 4, 3.2],
  },
};

const Scene = ({ cameraref, controlsRef,PointerEvent }) => {
  const waypoints = [
    { name: 'Living Room', position: new THREE.Vector3(50, 52, 34), target: new THREE.Vector3(0, 2.5, 0), zoom: 57 },
    { name: 'Bedroom', position: new THREE.Vector3(50, 35, -25), target: new THREE.Vector3(0, 2, -55), zoom: 57 },
    { name: 'Office', position: new THREE.Vector3(3, 35, 7), target: new THREE.Vector3(-51, -0.1, -51), zoom: 57 },
    { name: 'Sport Room', position: new THREE.Vector3(90, 50, 34), target: new THREE.Vector3(10, 23, 15), zoom: 57 },
  ];

  const [showPanel, setShowPanel] = useState(null);
  const [panelPosition, setPanelPosition] = useState([0, 0, 0]);
  const [waypointsIndex, setWaypointsIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const TransitionProgress = useRef(0);
  const transitionFromPos = useRef(new THREE.Vector3());
  const transitionFromTarget = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const highlightMesh = useRef();

  const { scene, camera } = useThree();

  useFrame(() => {
    const wp = waypoints[waypointsIndex];
    if (!wp) return;

    if (!isMoving && wp.zoom !== undefined && cameraref.current) {
      cameraref.current.zoom = THREE.MathUtils.lerp(cameraref.current.zoom, wp.zoom, 0.05);
      cameraref.current.updateProjectionMatrix();
    }

    if (controlsRef?.current && wp.target) {
      controlsRef.current.target.lerp(wp.target, 0.1);
      controlsRef.current.update();
    }
  });

  useFrame((_, delta) => {
    if (!isMoving || !controlsRef.current) return;

    const current = waypoints[waypointsIndex];

    TransitionProgress.current += delta / 1.5;
    const t = THREE.MathUtils.smoothstep(TransitionProgress.current, 0, 1);

    camera.position.lerpVectors(transitionFromPos.current, current.position, t);
    controlsRef.current.target.lerpVectors(transitionFromTarget.current, current.target, t);
    controlsRef.current.update();

    if (t >= 1) setIsMoving(false);
  });

  const navigateToRoom = (roomIndex) => {
    if (!isMoving && controlsRef.current && cameraref.current) {
      TransitionProgress.current = 0;
      transitionFromPos.current.copy(cameraref.current.position);
      transitionFromTarget.current.copy(controlsRef.current.target);
      setIsMoving(true);
      setWaypointsIndex(roomIndex);
    }
  };
  const handlePointerMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.current.setFromCamera(mouse.current, camera);

    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersected = intersects[0];
      const hitPoint = intersected.point;
      if (intersected.object.name === 'MainPlane') {
        const highlightPos = new THREE.Vector3().copy(hitPoint).floor().addScalar(0.5);
        highlightMesh.current.position.set(highlightPos.x, 0.01, highlightPos.z);
      }
    }
  };


  const handlePointerDown = (roomName, position) => {
    setShowPanel(roomName);
    setPanelPosition(roomInfo[roomName]?.position || [0, 0, 0]);
  };
  useEffect(() => {
    window.addEventListener('click', handlePointerMove);
    return () => {
      window.removeEventListener('click', handlePointerMove);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<mesh />}>
        <group  onPointerMove={handlePointerMove}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 0.5]} name="MainPlane">
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#aaaaaa" side={THREE.DoubleSide} visible={false} opacity={0.5} transparent />
          </mesh>

          <Room />

          {/* Invisible Clickable Meshes */}
          <mesh visible={false} position={[1.10, 1.40, 0.46]} name="LivingRoomMesh" onPointerDown={() => handlePointerDown('Living Room')}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
  
  <arrowHelper
    args={[
      new THREE.Vector3(0, -1, 0),   // direction (pointing down)
      new THREE.Vector3(1.10, 3, 0.46), // from position above the mesh
      1.1,                           // length
      0xff0000,                      // color (red)
    ]}
    scale={[4.5, 0.5, 4.5]}
  />


          <mesh visible={false} position={[1.25, 2.1, -56.81]} name="BedroomMesh" onPointerDown={() => handlePointerDown('Bedroom')}>
            <boxGeometry args={[2, 1, 1.4]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
          <arrowHelper
    args={[
      new THREE.Vector3(0, -1, 0),   // direction (pointing down)
      new THREE.Vector3(1.10, 3.5, -56.99999), // from position above the mesh
      1.1,                           // length
      0xff0000,                      // color (red)
    ]}
    scale={[4.5, 0.5, 4.5]}
  />

          <mesh visible={false} position={[-50.3, 2, -50.46]} name="Computer" onPointerDown={() => handlePointerDown('Office')}>
            <boxGeometry args={[1.73, 1.4, 1.5]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
          <arrowHelper
    args={[
      new THREE.Vector3(0, -1, 0),   // direction (pointing down)
      new THREE.Vector3(-50.3, 4, -50.46), // from position above the mesh
      1.1,                           // length
      0xff0000,                      // color (red)
    ]}
    scale={[4.5, 0.5, 4.5]}
  />
          

          <mesh visible={true} position={[-53, 1, 3.2]} name="Hobby" onPointerDown={() => handlePointerDown('Sport Room')}>
            <boxGeometry args={[2, 2.8, 4]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
          <arrowHelper
    args={[
      new THREE.Vector3(0, -1, 0),   // direction (pointing down)
      new THREE.Vector3(-53, 4, 3.2), // from position above the mesh
      1.1,                           // length
      0xff0000,                      // color (red)
    ]}
    scale={[4.5, 0.5, 4.5]}
  />
          <mesh visible={true} position={[-49, 4, -1.9]} name="certificate" onPointerDown={() => handlePointerDown('Sport Room')}>
            <boxGeometry args={[2, 2.8, 2]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
          <arrowHelper
    args={[
      new THREE.Vector3(0, 0, -1),   // direction (pointing down)
      new THREE.Vector3(-49, 4, -1.7), // from position above the mesh
      1.1,                           // length
      0xff0000,                      // color (red)
    ]}
    scale={[4.5, 0.5, 4.5]}
  />
          

          <gridHelper args={[5, 8]} position={[0, 0, 0]} visible={false} />

          <mesh ref={highlightMesh} rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.5, 0.5]} name="highlightPos">
            <planeGeometry args={[3, 3]} />
            <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} />
          </mesh>

          <Grid row={10} col={15} planeDepth={3} planewidth={3} spacing={0} visible={false} />
        </group>

        {/* Room Navigator Buttons with Icons */}
        <primitive object={camera}>
          <Html position={[-11.5, -4.7, -5]} transform occlude={false}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0)',
                padding: '5px',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                display: 'grid',
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                {waypoints.map((room, index) => {
                  const icon = {
                    'Living Room': '🛋️',
                    'Bedroom': '🛏️',
                    'Office': '💼',
                    'Sport Room': '🏋️',
                  }[room.name] || '🏠';

                  return (
                    <button
                      key={index}
                      onClick={() => navigateToRoom(index)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      <span>{icon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Html>
        </primitive>

        <InteractiveMesh />
      </Suspense>

      {/* Info Panel */}
      {showPanel && (
        <Html position={panelPosition}>
          <div
            style={{
              width: '500px',
              background: 'rgba(10, 9, 9, 0.95)',
              padding: '70px',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <h3
        style={{
          margin: '0 0 12px',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          position: 'relative',
          top: '-20px',
          maxHeight: '60px',
          overflowY: 'auto',
          paddingRight: '60px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',

        }}
      >
              {roomInfo[showPanel]?.title}
            </h3>
            
            <p style={{ fontSize: '20px', lineHeight: '1.5', textAlign: 'justify',maxHeight: '450px',overflowY: 'auto', whiteSpace: 'pre-wrap',paddingRight: '20px',boxSizing: 'border-box' }}>
            <div dangerouslySetInnerHTML={{ __html: roomInfo[showPanel].description }} /> 
            </p>
            <button onClick={() => setShowPanel(null)} style={{ marginTop: '10px', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </Html>
      )}
    </>
  );
};

export default Scene;