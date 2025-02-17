import React, { useState, useEffect, useRef } from "react";
import {
  useGLTF,
  useAnimations,
  Html,
  CameraControls,
} from "@react-three/drei";
import { io } from "socket.io-client";
import * as THREE from "three";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/solar.glb");
  const { actions } = useAnimations(animations, group);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetPosition, setPlanetPosition] = useState(new THREE.Vector3());
  const [apiResponse, setApiResponse] = useState("");
  const cameraControls = useRef();
  const socketRef = useRef();

  // Initialize Socket.io and set up response listener
  useEffect(() => {
    socketRef.current = io("https://websocket-jarvis-eyif.onrender.com");
    socketRef.current.on("ans", (response) => {
      setApiResponse(response);
      // Convert the response text to speech
      const speech = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(speech);
    });
    return () => socketRef.current.disconnect();
  }, []);

  // Handle planet click: update selection, save its world position, and animate camera
  const handlePlanetClick = (name, event) => {
    event.stopPropagation();
    const worldPosition = new THREE.Vector3();
    event.object.getWorldPosition(worldPosition);
    setSelectedPlanet(name);
    setPlanetPosition(worldPosition);

    // Animate the camera to look at the selected planet from an offset position
    cameraControls.current.setLookAt(
      worldPosition.x + 5,
      worldPosition.y + 5,
      worldPosition.z + 5,
      worldPosition.x,
      worldPosition.y,
      worldPosition.z,
      true
    );
  };

  // When the "Tell me about this planet" button is clicked
  const handleAsk = () => {
    socketRef.current.emit("message", `Tell me about planet ${selectedPlanet}`);
  };

  return (
    <>
      {/* CameraControls allows smooth camera animations */}
      <CameraControls ref={cameraControls} />
      <group ref={group} {...props} dispose={null}>
        {/* The solar system model */}
        <group name="Sketchfab_Scene">
          {/* For demonstration, we add click handlers to a few planet meshes.
              Add similar onClick handlers for the other planets as needed. */}
          <mesh
            name="mercury_mercury1_0"
            geometry={nodes.mercury_mercury1_0.geometry}
            material={materials.mercury1}
            onClick={(e) => handlePlanetClick("Mercury", e)}
          />
          <mesh
            name="venus_venus1_0"
            geometry={nodes.venus_venus1_0.geometry}
            material={materials.venus1}
            onClick={(e) => handlePlanetClick("Venus", e)}
          />
          <mesh
            name="earth_earth1_0"
            geometry={nodes.earth_earth1_0.geometry}
            material={materials.earth1}
            onClick={(e) => handlePlanetClick("Earth", e)}
          />
          {/* Add additional planets here */}
        </group>
      </group>

      {/* HTML overlay that appears at the planet's world position */}
      {selectedPlanet && (
        <Html position={planetPosition}>
          <div className="planet-info" style={overlayStyles}>
            <h3>{selectedPlanet}</h3>
            <button onClick={handleAsk}>Tell me about this planet</button>
            <div className="response">{apiResponse}</div>
          </div>
        </Html>
      )}
    </>
  );
}

useGLTF.preload("/solar.glb");

// Optional inline styles for the overlay
const overlayStyles = {
  background: "rgba(0,0,0,0.7)",
  padding: "1rem",
  borderRadius: "8px",
  color: "#fff",
  textAlign: "center",
};
