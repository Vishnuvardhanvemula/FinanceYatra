import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Sparkles,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    Stars
} from '@react-three/drei';
import * as THREE from 'three';

// --- Weather Components ---

const BullishAtmosphere = () => (
    <group>
        <Sparkles count={100} scale={20} size={2} speed={0.4} color="#fbbf24" opacity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
);

const BearishAtmosphere = () => (
    <group>
        <Sparkles count={200} scale={20} size={1} speed={0.1} color="#60a5fa" opacity={0.4} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
    </group>
);

const NeutralAtmosphere = () => (
    <group>
        <Sparkles count={50} scale={20} size={1} speed={0.2} color="#ffffff" opacity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
    </group>
);

// --- Growth Components ---

const FloatingIsland = ({ growthLevel }) => {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.y = Math.sin(t / 4) / 8;
        mesh.current.position.y = Math.sin(t / 2) / 10;
    });

    // growthLevel: 0 (barren) to 1 (utopia)
    const sphereScale = 1 + growthLevel * 1.5;
    const distortion = 0.2 + growthLevel * 0.3;

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={[0, -1, 0]}>
                <sphereGeometry args={[sphereScale, 64, 64]} />
                <MeshDistortMaterial
                    color={growthLevel > 0.7 ? "#10b981" : growthLevel > 0.3 ? "#6366f1" : "#475569"}
                    speed={2}
                    distort={distortion}
                    radius={1}
                />
            </mesh>

            {/* Decorative Cubes that orbit - representing "Financial Assets" */}
            {[...Array(Math.floor(growthLevel * 10))].map((_, i) => (
                <AssetCube key={i} index={i} total={Math.floor(growthLevel * 10)} />
            ))}
        </Float>
    );
};

const AssetCube = ({ index, total }) => {
    const mesh = useRef();
    const radius = 3 + Math.random() * 2;
    const speed = 0.5 + Math.random();
    const offset = (index / total) * Math.PI * 2;

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + offset;
        mesh.current.position.x = Math.cos(t) * radius;
        mesh.current.position.z = Math.sin(t) * radius;
        mesh.current.position.y = Math.sin(t * 2) * 0.5;
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <MeshWobbleMaterial color="#ffffff" speed={1} factor={0.6} />
        </mesh>
    );
};

// --- Main Wrapper ---

const WealthVerse = ({ netWorth = 0, sentiment = 'Neutral' }) => {
    // Normalize net worth to 0-1 range for growth logic (capped at $100k for full growth)
    const growthLevel = Math.min(netWorth / 100000, 1);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Lights */}
                <ambientLight intensity={0.2} />

                {/* Atmosphere/Weather */}
                {sentiment === 'Bullish' && <BullishAtmosphere />}
                {sentiment === 'Bearish' && <BearishAtmosphere />}
                {sentiment === 'Neutral' && <NeutralAtmosphere />}

                {/* The World */}
                <FloatingIsland growthLevel={growthLevel} />

                {/* Effects & Background */}
                <ContactShadows
                    position={[0, -4, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2.5}
                    far={4.5}
                />

                <Environment preset="city" />
            </Canvas>

            {/* Visual Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)] pointer-events-none" />
        </div>
    );
};

export default WealthVerse;
