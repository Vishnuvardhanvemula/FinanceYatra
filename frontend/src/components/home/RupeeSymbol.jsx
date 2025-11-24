import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const RupeeSymbol = ({ scrollProgress, lowEnd = false, isMobile = false }) => {
    const groupRef = useRef();

    // Geometry Construction
    const { topBarShape, bodyShape } = useMemo(() => {
        const top = new THREE.Shape();
        top.moveTo(-2.2, 0); top.lineTo(2.2, 0); top.lineTo(2.2, 0.5); top.lineTo(-2.2, 0.5);

        const body = new THREE.Shape();
        body.moveTo(-2.2, 1.0); body.lineTo(2.2, 1.0); body.lineTo(2.2, 0.5); body.lineTo(0.5, 0.5);
        body.bezierCurveTo(2.8, 0.5, 2.8, -1.8, 0.5, -1.8);
        body.lineTo(2.4, -4.0); body.lineTo(1.2, -4.0); body.lineTo(-0.4, -2.2);
        body.bezierCurveTo(1.0, -2.0, 1.2, 0.0, -2.2, 0.0);

        return { topBarShape: top, bodyShape: body };
    }, []);

    const useLow = lowEnd || isMobile;
    const extrudeSettings = useMemo(() => (
        useLow
            ? { depth: 0.3, bevelEnabled: false, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1, curveSegments: 8 }
            : { depth: 0.6, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 10, curveSegments: 48 }
    ), [useLow]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const progress = scrollProgress?.get() || 0;
        const time = state.clock.elapsedTime;

        // MOUSE INTERACTION (The "Look At" Effect)
        // We lerp the mouse position to avoid jitter
        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;

        // SCROLL LOGIC
        // 1. Position: Drifts from right to left, then centers
        const targetX = 3.5 - (progress * 5);
        const targetY = Math.sin(time * 0.5) * 0.1 - (progress * 1);

        // 2. Rotation: Tumbles + looks at mouse
        const targetRotX = (progress * Math.PI * 2) + (mouseY * 0.2);
        const targetRotY = (0.3 + (time * 0.1)) + (mouseX * 0.3);

        // PHYSICS
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} scale={isMobile ? 1.05 : (lowEnd ? 0.7 : 0.85)}>
                <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
                    <extrudeGeometry args={[topBarShape, extrudeSettings]} />
                    <meshPhysicalMaterial
                        color="#FCD34D" // Lighter Gold
                        emissive="#B45309" // Orange/Bronze Emissive
                        emissiveIntensity={0.2}
                        metalness={1}
                        roughness={0.15}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                    />
                </mesh>
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <extrudeGeometry args={[bodyShape, extrudeSettings]} />
                    <meshPhysicalMaterial
                        color="#FCD34D"
                        emissive="#B45309"
                        emissiveIntensity={0.2}
                        metalness={1}
                        roughness={0.15}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                    />
                </mesh>
            </group>
        </Float>
    );
};

export const RupeeFallback = ({ size = 120 }) => (
    <div className="flex items-center justify-center w-full h-full">
        <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
                <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
            </defs>
            <rect width="120" height="120" rx="18" fill="#071026" />
            <circle cx="60" cy="50" r="38" fill="url(#g)" opacity="0.95" />
            <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="46" fill="#0b101b" fontWeight="700" fontFamily="Inter, sans-serif">₹</text>
        </svg>
    </div>
);
