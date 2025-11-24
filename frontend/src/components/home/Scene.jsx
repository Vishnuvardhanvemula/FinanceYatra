import React from 'react';
import { PerspectiveCamera, Environment, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { RupeeSymbol } from './RupeeSymbol';

const Scene = ({ scrollProgress, lowEnd = false, isMobile = false }) => {
    const compact = lowEnd || isMobile;
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 13]} fov={35} />

            {/* CINEMATIC LIGHTING */}
            <ambientLight intensity={0.5} color="#ffffff" />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow color="#ffecd1" />
            <pointLight position={[-10, -10, -10]} intensity={5} color="#2dd4bf" />
            <pointLight position={[0, 0, 5]} intensity={2} color="#fbbf24" distance={10} />

            <Environment preset="city" />

            {/* BACKGROUND ELEMENTS */}
            <Stars radius={100} depth={50} count={compact ? 800 : 5000} factor={compact ? 1 : 4} saturation={0} fade speed={1} />
            {/* Moving sparkles reacting to time (disabled on low-end or mobile devices) */}
            {!compact && <Sparkles count={100} scale={15} size={3} speed={0.4} opacity={0.5} color="#FCD34D" />}

            <group position={[0, 0, 0]}>
                <RupeeSymbol scrollProgress={scrollProgress} lowEnd={lowEnd} isMobile={isMobile} />
            </group>

            {/* POST PROCESSING - THE "GLOW UP" */}
            {/* Fancy post-processing - disabled on low-end devices */}
            {!compact && (
                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.0} radius={0.6} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            )}
        </>
    );
};

export default Scene;
