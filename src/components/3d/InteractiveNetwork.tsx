"use client";

import { Canvas } from "@react-three/fiber";
import NetworkGraph from "./NetworkGraph";

type InteractiveNetworkProps = {
  /** Optional CSS class name for the container div */
  className?: string;
};

/**
 * InteractiveNetwork — Full-screen 3D particle proximity-graph background.
 *
 * Renders a transparent R3F canvas that sits behind all page content.
 * Particles drift gently, react to mouse movement, and form dynamic
 * connection lines when they pass close to one another.
 */
export default function InteractiveNetwork({
  className = "",
}: InteractiveNetworkProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 8],
          near: 0.1,
          far: 20,
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <NetworkGraph />
      </Canvas>
    </div>
  );
}
