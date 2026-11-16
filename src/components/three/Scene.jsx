import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Watch } from "../models/Watch";

gsap.registerPlugin(ScrollTrigger);
export default function Scene({ progress, isMobile }) {
  const cameraRef = useRef(null);

  useFrame(() => {
    // The camera may not be mounted yet on the very first frame (e.g. while
    // the GLB is still suspending), so guard against a null ref.
    cameraRef.current?.lookAt(0, 0, 0);
  });

  useEffect(() => {
    if (!cameraRef.current) return;

    if (isMobile) {
    } else {
    }

    const positions = [
      isMobile ? [1.8, 0.22, 1.3] : [4.7, 0.6, 3.5],
      isMobile ? [0, 1.2, 2.2] : [0, 2.5, 4.6],
      isMobile ? [1.2, 0.52, -1.6] : [2, 0.87, -2.6],
      isMobile ? [2.2, 0, 0.3] : [3.5, 0, 0.5],
    ];

    if (progress >= 1) {
      gsap.to(cameraRef.current.position, {
        x: isMobile ? 2.2 : 3.5,
        y: 0,
        z: isMobile ? 0.3 : 0.5,
        duration: 0.5,
        ease: "power1.out",
      });
    } else {
      const segmentProgress = 1 / 3;
      // Clamp so a floating-point value such as 0.9999999 can never index
      // past the end of the positions array.
      const segmentIndex = Math.min(
        Math.floor(progress / segmentProgress),
        positions.length - 2,
      );
      const percentage = (progress % segmentProgress) / segmentProgress;
      const [startX, startY, startZ] = positions[segmentIndex];
      const [endX, endY, endZ] = positions[segmentIndex + 1];
      const X = startX + (endX - startX) * percentage;
      const Y = startY + (endY - startY) * percentage;
      const Z = startZ + (endZ - startZ) * percentage;

      gsap.to(cameraRef.current.position, {
        x: X,
        y: Y,
        z: Z,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  }, [progress, isMobile]);
  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={90}
        near={0.1}
        far={100}
        position={isMobile ? [1.8, 0.22, 1.3] : [4.7, 0.6, 3.5]}
      />
      <Environment preset="city" />
      <Watch scale={isMobile ? 20 : 55} />
    </>
  );
}
