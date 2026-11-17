import { Environment, Lightformer } from "@react-three/drei";

export default function StudioLights() {
  return (
    <group name="lights">
      <Environment resolution={256}>
        {/* Main softbox */}
        <Lightformer
          intensity={3}
          position={[-5, 4, 5]}
          scale={[8, 5, 1]}
          form="rect"
          rotateY={Math.PI / 4}
        />

        {/* Side reflection */}
        <Lightformer
          intensity={2}
          position={[5, 2, 2]}
          scale={[5, 4, 1]}
          form="rect"
          rotateY={-Math.PI / 3}
        />

        {/* Top highlight */}
        <Lightformer
          intensity={1.5}
          position={[0, 6, 0]}
          scale={[6, 3, 1]}
          form="rect"
        />
      </Environment>

      {/* Soft directional lighting */}
      <spotLight
        position={[-4, 6, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        distance={20}
        decay={2}
      />

      <ambientLight intensity={0.15} />
    </group>
  );
}
