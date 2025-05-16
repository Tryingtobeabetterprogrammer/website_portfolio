import * as THREE from 'three';

function convertMaterialsToBasic(materials, alphaTest = 0) {
  const newMaterials = {};

  Object.entries(materials).forEach(([key, material]) => {
    if (material instanceof THREE.MeshStandardMaterial) {
      newMaterials[key] = material; // Retain original materials
    } else {
      newMaterials[key] = new THREE.MeshStandardMaterial({ // Convert only non-reactive materials
        map: material.map,
        transparent: material.transparent || false,
        alphaTest: material.alphaTest || 0,
      });
    }
  });

  return newMaterials;
}

export default convertMaterialsToBasic;