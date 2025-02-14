import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export default function Model({ isSpeaking, ...props }) {
  const group = useRef();
  const { scene } = useGLTF("/idle2.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    // Set hair color to blue
    if (materials.Wolf3D_Hair) {
      materials.Wolf3D_Hair.color.set("blue");
    }
  }, [materials]);

  useFrame((state, delta) => {
    if (isSpeaking) {
      // Update material color to green when speaking
      Object.values(materials).forEach((material) => {
        material.color.set("green");
      });

      // Update morph targets for lip-syncing
      const time = state.clock.getElapsedTime();
      if (time - lastUpdateTime >= 0.2) {
        setLastUpdateTime(time);

        // Reset all morph target influences to 0
        Object.keys(nodes.Wolf3D_Head.morphTargetInfluences).forEach(
          (key) => (nodes.Wolf3D_Head.morphTargetInfluences[key] = 0)
        );

        // Randomly select a morph target and apply influence
        const randomIndex = Math.floor(
          Math.random() *
            Object.keys(nodes.Wolf3D_Head.morphTargetDictionary).length
        );
        nodes.Wolf3D_Head.morphTargetInfluences[randomIndex] =
          Math.random() * 0.5;
      }
    } else {
      // Reset color when not speaking, but keep hair blue
      Object.values(materials).forEach((material) => {
        if (material !== materials.Wolf3D_Hair) {
          material.color.set("blue");
        }
      });
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" position={[0, -3.2, 4.3]} scale={[2, 2, 2]}>
        <group
          name="Armature"
          position={[1.224, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
        </group>
        <mesh
          name="Wolf3D_Hair"
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
        />
        <mesh
          name="Wolf3D_Body"
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
        />
        <mesh
          name="Wolf3D_Outfit_Footwear"
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
        />
        <mesh
          name="Wolf3D_Outfit_Top"
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
        />
        <mesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <mesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <mesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/idle2.glb");
