import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import convertMaterialsToBasic from '../compounds/convertTobasic.jsx'

export default function Model(props) {
  const { scene } = useGLTF('/vij7.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  const newMaterials = React.useMemo(() => convertMaterialsToBasic(materials), [materials])

  // Optional: Apply converted materials to the mesh nodes
  React.useEffect(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh && node.material?.name) {
        const basicMaterial = newMaterials[node.material.name]
        if (basicMaterial) {
          node.material = basicMaterial
        }
      }
    })
  }, [nodes, newMaterials])

  // ✅ Render the model
  return <primitive object={clone} {...props} />
}

// Preload the model for better performance
useGLTF.preload('/vij7.gltf')
