import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Torus, Octahedron, MeshTransmissionMaterial, Sparkles, Environment, Stars, TorusKnot, Box } from '@react-three/drei';

const RankModel = ({ tier }) => {
    const mesh = useRef(null);
    const mesh2 = useRef(null);
    const mesh3 = useRef(null);
    const group = useRef(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Organic movement for the whole group
        if (group.current) {
            group.current.rotation.y = Math.sin(t * 0.1) * 0.1;
        }

        if (mesh.current) {
            mesh.current.rotation.x = t * 0.2;
            mesh.current.rotation.y = t * 0.3;
        }
        if (mesh2.current) {
            // Counter-rotation or complex axis for specific tiers
            if (tier === 2) { // Reactor
                mesh2.current.rotation.x = t * 0.4;
            } else {
                mesh2.current.rotation.x = t * -0.2;
                mesh2.current.rotation.z = t * 0.1;
            }
        }
        if (mesh3.current) {
            if (tier === 2) { // Reactor 3rd axis
                mesh3.current.rotation.y = t * 0.5;
            } else {
                mesh3.current.rotation.z = t * 0.2;
            }
        }
    });

    // Tier 0: Novice - "The Spark" (Cyan Rhombus)
    if (tier === 0) {
        return (
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <group ref={group}>
                    {/* Cyan Rhombus (Octahedron) */}
                    <Octahedron args={[0.5, 0]} ref={mesh}>
                        <meshStandardMaterial
                            color="#06b6d4"
                            emissive="#06b6d4"
                            emissiveIntensity={2}
                            toneMapped={false}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </Octahedron>
                    {/* Faint Dust Particles (Broken Circle Effect) */}
                    <Sparkles count={40} scale={1.8} size={1.5} speed={0.2} opacity={0.3} color="#ffffff" />
                </group>
            </Float>
        );
    }

    // Tier 1: Apprentice - "The Orbit" (Structure)
    if (tier === 1) {
        return (
            <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
                <group ref={group}>
                    {/* Central Cyan Rhombus (Larger & Brighter) */}
                    <Octahedron args={[0.7, 0]} ref={mesh}>
                        <meshStandardMaterial
                            color="#06b6d4"
                            emissive="#22d3ee"
                            emissiveIntensity={2.5}
                            toneMapped={false}
                            roughness={0.1}
                            metalness={0.9}
                        />
                    </Octahedron>

                    {/* Golden Holographic Ring */}
                    <Torus args={[1.1, 0.02, 16, 64]} ref={mesh2} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial
                            color="#fbbf24"
                            emissive="#fbbf24"
                            emissiveIntensity={2}
                            toneMapped={false}
                            wireframe={false}
                        />
                    </Torus>

                    {/* Blue Data Particles */}
                    <Sparkles count={35} scale={2.2} size={3} speed={0.6} opacity={0.8} color="#38bdf8" />
                </group>
            </Float>
        );
    }

    // Tier 2: Expert - "The Reactor" (High Energy)
    if (tier === 2) {
        return (
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                <group ref={group}>
                    {/* Ring 1 (Gold - Fast Spin) */}
                    <Torus args={[1.3, 0.04, 16, 64]} ref={mesh}>
                        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} emissive="#fbbf24" emissiveIntensity={0.5} />
                    </Torus>
                    {/* Ring 2 (Silver - Off-Axis Spin) */}
                    <Torus args={[1.1, 0.04, 16, 64]} ref={mesh2} rotation={[Math.PI / 3, 0, 0]}>
                        <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.1} emissive="#e2e8f0" emissiveIntensity={0.5} />
                    </Torus>

                    {/* Central Spinning Core */}
                    <Octahedron args={[0.6, 0]} ref={mesh3}>
                        <meshStandardMaterial
                            color="#06b6d4"
                            emissive="#22d3ee"
                            emissiveIntensity={3}
                            toneMapped={false}
                        />
                    </Octahedron>

                    {/* Firefly Particles (Cyan & White) */}
                    <Sparkles count={30} scale={3} size={4} speed={2} opacity={0.8} color="#22d3ee" />
                    <Sparkles count={20} scale={2.5} size={2} speed={1} opacity={0.6} color="#ffffff" />
                </group>
            </Float>
        );
    }

    // Tier 3: Master - "The Network" (Interconnected)
    if (tier === 3) {
        return (
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <group ref={group}>
                    {/* Main Crystal Core (Icosahedron) */}
                    <Icosahedron args={[0.8, 0]} ref={mesh}>
                        <MeshTransmissionMaterial
                            backside
                            samples={8}
                            thickness={1.2}
                            chromaticAberration={0.8}
                            anisotropy={0.8}
                            distortion={0.6}
                            distortionScale={0.6}
                            temporalDistortion={0.3}
                            iridescence={1}
                            iridescenceIOR={1.6}
                            iridescenceThicknessRange={[0, 1400]}
                            color="#3b82f6"
                            bg="#000000"
                        />
                    </Icosahedron>

                    {/* Inner Reactor Core */}
                    <Icosahedron args={[0.4, 0]} ref={mesh3}>
                        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={4} toneMapped={false} />
                    </Icosahedron>

                    {/* Ring 1 (Gold - Data) */}
                    <Torus args={[1.1, 0.02, 16, 64]} ref={mesh2} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} toneMapped={false} />
                    </Torus>

                    {/* Ring 2 (Cyan - Connection) */}
                    <Torus args={[1.3, 0.02, 16, 64]} rotation={[0, Math.PI / 4, 0]}>
                        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} toneMapped={false} />
                    </Torus>

                    {/* Ring 3 (Purple - Deep Tech) */}
                    <Torus args={[1.5, 0.02, 16, 64]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
                    </Torus>

                    {/* Dense Web of Particles */}
                    <Sparkles count={80} scale={4} size={4} speed={1} opacity={0.6} color="#a855f7" />
                    <Sparkles count={40} scale={3} size={2} speed={2} opacity={0.8} color="#22d3ee" />
                </group>
            </Float>
        );
    }

    // Tier 4: Legendary - "The Singularity" (Pure Light)
    if (tier === 4) {
        return (
            <Float speed={5} rotationIntensity={3} floatIntensity={2}>
                <group ref={group}>
                    {/* Supernova Core (Blinding White-Gold) */}
                    <Sphere args={[0.8, 64, 64]} ref={mesh}>
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#fff7ed"
                            emissiveIntensity={10}
                            toneMapped={false}
                        />
                    </Sphere>

                    {/* Holographic Shockwave (Rainbow Iridescence) */}
                    <Sphere args={[1.8, 64, 64]} ref={mesh2}>
                        <MeshTransmissionMaterial
                            backside
                            samples={8}
                            thickness={0.2}
                            chromaticAberration={1}
                            anisotropy={1}
                            distortion={1}
                            distortionScale={1}
                            temporalDistortion={0.5}
                            iridescence={1}
                            iridescenceIOR={1.5}
                            iridescenceThicknessRange={[0, 1400]}
                            color="#ffffff"
                            roughness={0}
                        />
                    </Sphere>

                    {/* Inner Shockwave Ring */}
                    <Torus args={[1.4, 0.05, 16, 100]} ref={mesh3} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={5} toneMapped={false} />
                    </Torus>

                    {/* Exploding Particles */}
                    <Sparkles count={100} scale={6} size={6} speed={4} opacity={1} color="#fbbf24" />
                    <Sparkles count={50} scale={8} size={4} speed={5} opacity={0.5} color="#ffffff" />
                    <Stars radius={60} depth={50} count={1000} factor={4} saturation={1} fade speed={2} />
                </group>
            </Float>
        );
    }

    return null;
};

const RankAvatar = ({ tier }) => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 4] }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color={tier === 4 ? "#e879f9" : "blue"} intensity={1} />
                {/* Studio Lighting for extra polish */}
                <rectAreaLight width={2} height={2} intensity={5} color={"#fff"} position={[0, 0, 5]} lookAt={[0, 0, 0]} />
                <Environment preset="city" />
                <RankModel tier={tier} />
            </Canvas>
        </div>
    );
};

export default RankAvatar;
