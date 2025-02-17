/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 dora.glb 
*/

import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export default function Model({ position, ...props }) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/dora.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    console.log("Available animations:", Object.keys(actions));
    // Replace "Run" with the exact animation name from your file.
    if (actions["Run"]) {
      actions["Run"].play();
    } else {
      // If your animation is actually named "run" (all lowercase), use that:
      actions["run"]?.play();
    }
  }, [actions]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={position}
      scale={[50, 50, 50]}
      rotation={[0, Math.PI, 0]}
    >
      <group name="Scene">
        <group
          name="Doraobjcleanermaterialmergergles"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Object_2"
            geometry={nodes.Object_2.geometry}
            material={materials["mesh_4_7.nr.004"]}
            skeleton={nodes.Object_2.skeleton}
          />
          <skinnedMesh
            name="Object_3"
            geometry={nodes.Object_3.geometry}
            material={materials["mesh_4_8.nr.004"]}
            skeleton={nodes.Object_3.skeleton}
          />
          <skinnedMesh
            name="Object_4"
            geometry={nodes.Object_4.geometry}
            material={materials["mesh_4_9.nr.004"]}
            skeleton={nodes.Object_4.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dora.glb");
