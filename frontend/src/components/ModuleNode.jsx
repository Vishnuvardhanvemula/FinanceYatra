import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const ModuleNode = ({ module, index, status, prereqTitles, onClick }) => {
    const isLeft = index % 2 === 0;
    const ref = useRef(null);

    // Tilt Logic
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

    // Status-based styles
    const styles = {
        locked: {
            border: 'border-gray-800',
            bg: 'bg-gray-900/40',
            text: 'text-gray-600',
            icon: 'text-gray-700',
            glow: 'shadow-none',
            indicator: 'bg-gray-700'
        },
        completed: {
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-900/10',
            text: 'text-emerald-400',
            icon: 'text-emerald-400',
            glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
            indicator: 'bg-emerald-500'
        },
        inProgress: {
            border: 'border-cyan-500/50',
            bg: 'bg-cyan-900/20',
            text: 'text-cyan-400',
            icon: 'text-cyan-400',
            glow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
            indicator: 'bg-cyan-500'
        },
        available: {
            border: 'border-blue-500/30',
            bg: 'bg-blue-900/10',
            text: 'text-blue-400',
            icon: 'text-blue-400',
            glow: 'shadow-[0_0_20px_rgba(59,130,246,0.1)]',
            indicator: 'bg-blue-500'
        }
    };

    const currentStyle = styles[status] || styles.available;

    return (
        <div id={module.id} className={`flex items-center justify-center w-full mb-16 relative ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Center Line Connection Point */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0b101b] border-2 border-gray-700 z-10 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${currentStyle.indicator} ${status === 'inProgress' ? 'animate-pulse' : ''} shadow-[0_0_10px_currentColor]`}></div>
            </div>

            {/* Connection Line */}
            <div className={`absolute top-1/2 h-[1px] bg-gradient-to-r from-gray-700 via-gray-600 to-transparent w-[calc(50%-2rem)] ${isLeft ? 'right-1/2 mr-2' : 'left-1/2 ml-2 rotate-180'}`}></div>

            {/* Card Container */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`w-[45%] md:w-[40%] relative group ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
            >
                <motion.div
                    ref={ref}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={() => { console.log('[ModuleNode] Clicked module:', module); onClick(module); }}
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateX,
                        rotateY,
                    }}
                    className={`
                        relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-300 cursor-pointer
                        ${currentStyle.border} ${currentStyle.bg} ${currentStyle.glow}
                        group-hover:border-opacity-100 group-hover:scale-[1.02]
                    `}
                >
                    {/* Dynamic Gradient Glow on Hover */}
                    <motion.div
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    600px circle at ${mouseX}px ${mouseY}px,
                                    rgba(255, 255, 255, 0.05),
                                    transparent 80%
                                )
                            `,
                        }}
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    />

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

                    {/* Corner Accents */}
                    <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${currentStyle.text} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${currentStyle.text} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${currentStyle.text} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${currentStyle.text} opacity-30 group-hover:opacity-100 transition-opacity`}></div>

                    <div className="p-6 relative z-20 transform-style-3d">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`text-4xl p-3 rounded-lg bg-black/20 border border-white/5 ${status === 'locked' ? 'grayscale opacity-50' : ''}`}>
                                {module.icon}
                            </div>
                            <div className={`text-[10px] font-mono px-2 py-1 rounded border tracking-widest ${currentStyle.border} ${currentStyle.text} bg-black/20`}>
                                {status.toUpperCase()}
                            </div>
                        </div>

                        <h3 className={`text-xl font-bold mb-2 font-sans tracking-tight ${status === 'locked' ? 'text-gray-500' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all'}`}>
                            {module.title}
                        </h3>

                        <p className="text-sm text-gray-400 line-clamp-2 mb-6 font-light leading-relaxed">
                            {module.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono border-t border-white/5 pt-4">
                            <span className="flex items-center gap-1.5">
                                <span className={currentStyle.text}>⏱</span> {module.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className={currentStyle.text}>📚</span> {module.lessons} LESSONS
                            </span>
                        </div>

                        {/* Prerequisites for Locked Modules */}
                        {status === 'locked' && prereqTitles && prereqTitles.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-800/50">
                                <div className="text-[10px] text-red-400/80 font-mono mb-2 flex items-center gap-2 uppercase tracking-wider">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    ACCESS_DENIED // REQUIRES:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {prereqTitles.map((title, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-1 rounded bg-red-950/30 text-red-400 border border-red-900/30 font-mono">
                                            {title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ModuleNode;
