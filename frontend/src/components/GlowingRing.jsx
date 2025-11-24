import React from 'react';
import { motion } from 'framer-motion';

const GlowingRing = ({ percentage = 0, size = 200, strokeWidth = 12, color = "#14b8a6" }) => {
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Outer Glow Layer */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ background: color }}></div>

            <svg width={size} height={size} className="transform -rotate-90 relative z-10">
                {/* Track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                {/* Progress */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                />

                {/* Particle at the tip (Optional, complex to calculate position perfectly in SVG without JS math, skipping for simplicity/performance) */}
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-white drop-shadow-lg"
                >
                    {percentage}%
                </motion.span>
                <span className="text-xs text-cyan-400 uppercase tracking-widest mt-1 font-mono">Completed</span>
            </div>
        </div>
    );
};

export default GlowingRing;
