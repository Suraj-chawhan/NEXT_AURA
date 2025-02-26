import React, { useEffect, useRef, useMemo } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export default function Model({ isSpeaking, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/idle2.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (isSpeaking && actions["Talking"]) {
      actions["Talking"].play();
    } else if (!isSpeaking && actions["Idle"]) {
      actions["Idle"].play();
    }
  }, [isSpeaking, actions]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, -3.2, 4.3]}
      scale={[2, 2, 2]}
    >
      <group name="Scene">
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
        <mesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/idle2.glb");
