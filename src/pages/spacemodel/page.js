import React from "react";
import Model from "../../../public/Space";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
export default function Space() {
  return (
    <div className="w-[100%] h-[100%]">
      <Canvas className="w-[100%] h-[100%]">
        <Model />
        <OrbitControls />
        <ambientLight intensity={4} />
        <Stars />
      </Canvas>
    </div>
  );
}
