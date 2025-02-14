/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 space.glb 
Author: Loïc Norgeot (https://sketchfab.com/norgeotloic)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/need-some-space-d6521362b37b48e3a82bce4911409303
Title: Need some space?
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model1(props) {
  const { nodes, materials } = useGLTF("/space.glb");

  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.z += 0.001;
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <points
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.013}
      />
    </group>
  );
}

useGLTF.preload("/space.glb");
