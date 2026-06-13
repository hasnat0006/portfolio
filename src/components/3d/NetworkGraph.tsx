"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  Points,
  Vector3,
} from "three";

// ── Configuration ───────────────────────────────────────────────────
const PARTICLE_COUNT = 120;
const MAX_LINES = 400;
const BOUNDARY = 5;
const INTERACTION_RADIUS = 1.5;
const PROXIMITY_THRESHOLD = 2.0;
const STEERING_FORCE = 0.02;
const PARTICLE_SPEED = 0.008;
const COLOR_ACCENT = "#14b8a6";

/**
 * NetworkGraph — Pure WebGL particle proximity-graph rendered inside an R3F canvas.
 *
 * 120 particles drift with individual velocities, bounce off spatial boundaries,
 * react to pointer proximity with a smooth steering force, and dynamically form
 * connection lines when any two particles pass within the proximity threshold.
 *
 * All animation state lives in refs — no React re-renders drive the loop.
 */
export default function NetworkGraph() {
  const { pointer } = useThree();

  // ── Pre-allocate particle positions (Float32Array, 120 × 3) ──────────
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      arr[idx] = (Math.random() - 0.5) * BOUNDARY * 2;
      arr[idx + 1] = (Math.random() - 0.5) * BOUNDARY * 2;
      arr[idx + 2] = (Math.random() - 0.5) * BOUNDARY * 1.5;
    }
    return arr;
  }, []);

  // ── Pre-allocate particle velocities ─────────────────────────────────
  const velocities = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      arr[idx] = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
      arr[idx + 1] = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
      arr[idx + 2] = (Math.random() - 0.5) * PARTICLE_SPEED;
    }
    return arr;
  }, []);

  // ── Pre-allocate line vertex pairs (MAX_LINES × 2 vertices × 3 coords) ─
  const linePositions = useMemo(() => {
    return new Float32Array(MAX_LINES * 2 * 3);
  }, []);

  // ── Per-line opacity buffer for dynamic fading ───────────────────────
  const lineOpacities = useMemo(() => {
    return new Float32Array(MAX_LINES);
  }, []);

  // ── Refs bound to the GPU geometry for direct buffer mutation ────────
  const pointsRef = useRef<Points>(null);
  const linesRef = useRef<LineSegments>(null);

  // ── Helper vector (re-used each frame to avoid GC) ───────────────────
  const mouseVec = useRef(new Vector3());

  // ── Geometry initialisation (runs once) ──────────────────────────────
  const pointGeometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const lineGeometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  // ── Per-frame animation loop ─────────────────────────────────────────
  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05); // clamp delta to avoid jumps on tab-switch

    /* ─1── Position Updates & Boundary Bounce ──────────────────────── */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      positions[idx] += velocities[idx] * dt * 60;
      positions[idx + 1] += velocities[idx + 1] * dt * 60;
      positions[idx + 2] += velocities[idx + 2] * dt * 60;

      // Boundary bounce (X, Y)
      if (positions[idx] > BOUNDARY) {
        positions[idx] = BOUNDARY;
        velocities[idx] *= -1;
      } else if (positions[idx] < -BOUNDARY) {
        positions[idx] = -BOUNDARY;
        velocities[idx] *= -1;
      }
      if (positions[idx + 1] > BOUNDARY) {
        positions[idx + 1] = BOUNDARY;
        velocities[idx + 1] *= -1;
      } else if (positions[idx + 1] < -BOUNDARY) {
        positions[idx + 1] = -BOUNDARY;
        velocities[idx + 1] *= -1;
      }
      // Z boundary (softer)
      if (positions[idx + 2] > BOUNDARY * 0.6) {
        positions[idx + 2] = BOUNDARY * 0.6;
        velocities[idx + 2] *= -1;
      } else if (positions[idx + 2] < -BOUNDARY * 0.6) {
        positions[idx + 2] = -BOUNDARY * 0.6;
        velocities[idx + 2] *= -1;
      }
    }

    /* ─2── Pointer Interaction Field ───────────────────────────────── */
    // Map normalized pointer (-1 to 1) to scene coordinates
    mouseVec.current.set(pointer.x * BOUNDARY, pointer.y * BOUNDARY, 0);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const dx = positions[idx] - mouseVec.current.x;
      const dy = positions[idx + 1] - mouseVec.current.y;
      const dz = positions[idx + 2] - mouseVec.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < INTERACTION_RADIUS && dist > 0.01) {
        const force = (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS;
        const normX = dx / dist;
        const normY = dy / dist;
        const normZ = dz / dist;

        // Gentle repulsion — pushes particles away from cursor
        velocities[idx] += normX * force * STEERING_FORCE;
        velocities[idx + 1] += normY * force * STEERING_FORCE;
        velocities[idx + 2] += normZ * force * STEERING_FORCE;

        // Clamp velocity so particles don't fly off too fast
        const vx = velocities[idx];
        const vy = velocities[idx + 1];
        const vz = velocities[idx + 2];
        const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const maxSpeed = PARTICLE_SPEED * 4;
        if (speed > maxSpeed) {
          velocities[idx] = (vx / speed) * maxSpeed;
          velocities[idx + 1] = (vy / speed) * maxSpeed;
          velocities[idx + 2] = (vz / speed) * maxSpeed;
        }
      }
    }

    /* ─3── Proximity-Graph Calculation (O(N²)) ────────────────────── */
    let lineCount = 0;

    for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
      const i3 = i * 3;
      const ax = positions[i3];
      const ay = positions[i3 + 1];
      const az = positions[i3 + 2];

      for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
        const j3 = j * 3;
        const dx = ax - positions[j3];
        const dy = ay - positions[j3 + 1];
        const dz = az - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < PROXIMITY_THRESHOLD * PROXIMITY_THRESHOLD) {
          const dist = Math.sqrt(distSq);
          const lineIdx = lineCount * 6; // 2 vertices × 3 coords

          // Vertex A
          linePositions[lineIdx] = ax;
          linePositions[lineIdx + 1] = ay;
          linePositions[lineIdx + 2] = az;
          // Vertex B
          linePositions[lineIdx + 3] = positions[j3];
          linePositions[lineIdx + 4] = positions[j3 + 1];
          linePositions[lineIdx + 5] = positions[j3 + 2];

          // Opacity: closer = brighter, threshold-edge = fades
          lineOpacities[lineCount] = 1 - dist / PROXIMITY_THRESHOLD;

          lineCount++;
        }
      }
    }

    // Zero out remaining line vertices beyond current lineCount
    for (let i = lineCount * 6; i < MAX_LINES * 6; i++) {
      linePositions[i] = 0;
    }

    /* ─4── GPU Buffer Commits ─────────────────────────────────────── */
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      // Update draw range so unused line vertices don't render
      linesRef.current.geometry.setDrawRange(0, lineCount * 2);
    }
  });

  // ── Render ─────────────────────────────────────────────────────────
  const accent = new Color(COLOR_ACCENT);

  return (
    <group>
      {/* Particle points */}
      <points ref={pointsRef} geometry={pointGeometry} frustumCulled={false}>
        <pointsMaterial
          size={0.08}
          color={accent}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={2} // NormalBlending — avoids additive bloom
        />
      </points>

      {/* Connection lines */}
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        frustumCulled={false}
      >
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={2}
        />
      </lineSegments>
    </group>
  );
}
