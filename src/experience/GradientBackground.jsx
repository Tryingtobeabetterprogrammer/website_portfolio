import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function GradientBackground() {
  const texture = useLoader(THREE.TextureLoader, '/gradient-sky.jpg'); // from public/
  useThree(({ scene }) => {
    scene.background = texture;
  });
  return null;
}

export default GradientBackground() 