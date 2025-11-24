import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = '', onClick }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useMotionTemplate`${mouseY.get() / -20}deg`;
    const rotateY = useMotionTemplate`${mouseX.get() / 20}deg`;

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
            }}
            className={`relative group h-full ${className}`}
        >
            {/* Content Wrapper with Premium Fintech Glassmorphism */}
            <div className="relative h-full w-full rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] overflow-hidden">

                {/* Subtle Noise Texture (Reduced Opacity) */}
                <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

                {/* "Diamond" Border Gradient (Softer) */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/0 to-white/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Inner Glow to simulate thickness */}
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none"></div>

                {/* Dynamic Spotlight Effect */}
                <motion.div
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.05),
                transparent 80%
              )
            `,
                    }}
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                />

                {/* Content */}
                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default TiltCard;
