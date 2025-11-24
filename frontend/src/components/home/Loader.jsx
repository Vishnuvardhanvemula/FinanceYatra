import React from 'react';
import { useProgress, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#0b101b] z-50">
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <span className="mt-4 text-teal-500 font-mono text-sm animate-pulse">
                    {progress.toFixed(0)}% GENERATING ECONOMY...
                </span>
            </div>
        </Html>
    );
}
