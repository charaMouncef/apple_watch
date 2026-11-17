import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { Watch } from "../models/Watch";
import StudioLights from "./StudioLights";

export default function Scene({ progressRef, isMobile }) {
  const cameraRef = useRef(null);
  const quickToRef = useRef(null);
  const lastProgressRef = useRef(-1);

  useEffect(() => {
    const camera = cameraRef.current;

    if (!camera) return;

    const cameraPosition = camera.position;

    const moveX = gsap.quickTo(cameraPosition, "x", {
      duration: 0.5,
      ease: "power1.out",
    });

    const moveY = gsap.quickTo(cameraPosition, "y", {
      duration: 0.5,
      ease: "power1.out",
    });

    const moveZ = gsap.quickTo(cameraPosition, "z", {
      duration: 0.5,
      ease: "power1.out",
    });

    quickToRef.current = { moveX, moveY, moveZ };

    return () => {
      moveX.tween.kill();
      moveY.tween.kill();
      moveZ.tween.kill();

      quickToRef.current = null;
      lastProgressRef.current = -1;
    };
  }, [isMobile]);

  useFrame(() => {
    const camera = cameraRef.current;

    if (!camera) return;

    camera.lookAt(0, 0, 0);

    const quickTo = quickToRef.current;

    if (!quickTo) return;

    const progress = progressRef.current;

    // Don't update the camera destination if scroll progress hasn't changed.
    if (progress === lastProgressRef.current) return;

    lastProgressRef.current = progress;

    const positions = [
      isMobile ? [1.8, 0.22, 1.3] : [4.7, 0.6, 3.5],
      isMobile ? [0, 1.2, 2.2] : [0, 2.5, 4.6],
      isMobile ? [1.2, 0.52, -1.6] : [2, 0.87, -2.6],
      isMobile ? [2.2, 0, 0.3] : [3.5, 0, 0.5],
    ];

    const segmentProgress = 1 / 3;

    const segmentIndex = Math.min(
      Math.floor(progress / segmentProgress),
      positions.length - 2,
    );

    const percentage = Math.min(
      Math.max(
        (progress - segmentIndex * segmentProgress) / segmentProgress,
        0,
      ),
      1,
    );

    const start = positions[segmentIndex];
    const end = positions[segmentIndex + 1];

    const x = start[0] + (end[0] - start[0]) * percentage;
    const y = start[1] + (end[1] - start[1]) * percentage;
    const z = start[2] + (end[2] - start[2]) * percentage;

    quickTo.moveX(x);
    quickTo.moveY(y);
    quickTo.moveZ(z);
  });

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
      <StudioLights />
      <Watch scale={isMobile ? 20 : 55} />
    </>
  );
}
