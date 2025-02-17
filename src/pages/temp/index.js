// import React from "react";
// import { Model } from "../../../public/Solar";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// function index() {
//   return (
//     <div className="w-[100vh] h-[100vh]">
//       <Canvas className="h-[100%] w-[100%]">
//         <Model />
//         <ambientLight intensity={4} />
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

// export default index;

// import React, { useState, useEffect, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Box, Sphere } from "@react-three/drei";

// const BallGame = () => {
//   // Glass positions (target positions for the ball)
//   const glassPositions = [-4, 0, 4];
//   // Ball position state (x-coordinate)
//   const [ballX, setBallX] = useState(-10); // start off-screen left
//   // Randomly chosen target from glassPositions
//   const [targetX, setTargetX] = useState(null);
//   // Whether the ball is still moving
//   const [moving, setMoving] = useState(true);
//   // Reference to the sphere mesh
//   const ballRef = useRef();

//   // On mount, choose a random target
//   useEffect(() => {
//     const randomTarget =
//       glassPositions[Math.floor(Math.random() * glassPositions.length)];
//     setTargetX(randomTarget);
//   }, []);

//   // Animate the ball each frame
//   useFrame((state, delta) => {
//     if (moving && targetX !== null) {
//       // Fast speed initially
//       let speed = 20;
//       // If near the target, decelerate
//       if (Math.abs(ballX - targetX) < 2) {
//         speed = 5;
//       }
//       let newX;
//       if (ballX < targetX) {
//         newX = ballX + speed * delta;
//         if (newX >= targetX) {
//           newX = targetX;
//           setMoving(false);ss
//         }
//       } else if (ballX > targetX) {
//         newX = ballX - speed * delta;
//         if (newX <= targetX) {
//           newX = targetX;
//           setMoving(false);
//         }
//       } else {
//         newX = ballX;
//         setMoving(false);
//       }
//       setBallX(newX);
//       if (ballRef.current) {
//         ballRef.current.position.x = newX;
//       }
//     }
//   });

//   return (
//     <Canvas camera={{ position: [0, 5, 15] }}>
//       <ambientLight intensity={1} />
//       {/* Render the three glasses as semi-transparent boxes */}
//       {glassPositions.map((pos, index) => (
//         <Box key={index} args={[3, 3, 3]} position={[pos, 0, 0]}>
//           <meshStandardMaterial color="skyblue" transparent opacity={0.5} />
//         </Box>
//       ))}
//       {/* Render the sphere ball */}
//       <Sphere ref={ballRef} args={[1, 32, 32]} position={[ballX, 1, 0]}>
//         <meshStandardMaterial color="red" />
//       </Sphere>
//     </Canvas>
//   );
// };

// export default BallGame;
