import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const RoadmapPath = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 h-full z-0">
            {/* Background Track */}
            <div className="absolute inset-0 bg-gray-800/50 w-full h-full rounded-full"></div>

            {/* Glowing Progress Line */}
            <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 origin-top rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{ scaleY, height: '100%' }}
            />
        </div>
    );
};

export default RoadmapPath;
