import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Lock, CheckCircle2, PlayCircle, Clock, BookOpen } from 'lucide-react';

const ModuleNode = ({ module, index, status, prereqTitles, onClick, isLast }) => {
    const isLeft = index % 2 === 0;
    const ref = useRef(null);

    // Enhanced Tilt Logic
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

    const rotateX = useMotionTemplate`${mouseY.get() / -15}deg`;
    const rotateY = useMotionTemplate`${mouseX.get() / 15}deg`;

    // Status-based styles (Celestial Gold / Ultra-Luxury)
    const styles = {
        locked: {
            border: 'border-slate-800',
            bg: 'bg-slate-950/80',
            text: 'text-slate-600',
            icon: 'text-slate-700',
            glow: 'shadow-none',
            indicator: 'bg-slate-700',
            badge: 'bg-slate-900 text-slate-500 border-slate-800'
        },
        completed: {
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-950/20',
            text: 'text-emerald-400',
            icon: 'text-emerald-400',
            glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
            indicator: 'bg-emerald-500',
            badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
        },
        inProgress: {
            border: 'border-amber-500/50',
            bg: 'bg-amber-950/30',
            text: 'text-amber-400',
            icon: 'text-amber-400',
            glow: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
            indicator: 'bg-amber-500',
            badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
        },
        available: {
            border: 'border-slate-500/30',
            bg: 'bg-slate-900/40',
            text: 'text-slate-300',
            icon: 'text-slate-400',
            glow: 'shadow-[0_0_20px_rgba(148,163,184,0.1)]',
            indicator: 'bg-slate-400',
            badge: 'bg-slate-800/50 text-slate-300 border-slate-700/50'
        }
    };

    const currentStyle = styles[status] || styles.available;

    return (
        <div id={module.id} className={`flex items-center justify-center w-full relative ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

            {/* Constellation Beam (Connection to Next Node - Gold/Silver) */}
            {!isLast && (
                <div className="absolute top-1/2 left-0 w-full h-[400px] pointer-events-none z-0 overflow-visible">
                    <svg className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={isLeft ? '#94a3b8' : '#f59e0b'} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={isLeft ? '#f59e0b' : '#94a3b8'} stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                        <path
                            d={isLeft
                                ? "M 25% 0 C 50% 0, 50% 350, 75% 350"
                                : "M 75% 0 C 50% 0, 50% 350, 25% 350"
                            }
                            fill="none"
                            stroke={`url(#grad-${index})`}
                            strokeWidth="1.5"
                            strokeDasharray="8 8"
                            className="opacity-40"
                        />
                        <circle cx={isLeft ? "25%" : "75%"} cy="0" r="3" fill={isLeft ? "#94a3b8" : "#f59e0b"} className="animate-pulse" />
                    </svg>
                </div>
            )}

            {/* Card Container */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className={`w-[85%] md:w-[42%] relative group ${isLeft ? 'mr-auto md:mr-[8%]' : 'ml-auto md:ml-[8%]'}`}
            >
                <motion.div
                    ref={ref}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={() => { if (status !== 'locked') onClick(module); }}
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateX,
                        rotateY,
                    }}
                    className={`
                        relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500
                        ${currentStyle.border} ${currentStyle.bg} ${currentStyle.glow}
                        ${status !== 'locked' ? 'cursor-pointer hover:scale-[1.02] hover:border-opacity-100' : 'cursor-not-allowed opacity-80'}
                    `}
                >
                    {/* Dynamic Gradient Glow on Hover (Gold/White) */}
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
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                    />

                    {/* Scanline Effect (Subtle) */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_3px] pointer-events-none opacity-10 mix-blend-overlay"></div>

                    {/* Corner Accents (Techy) */}
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t border-l ${currentStyle.text} opacity-20 group-hover:opacity-60 transition-opacity rounded-tl-2xl`}></div>
                    <div className={`absolute bottom-0 right-0 w-8 h-8 border-b border-r ${currentStyle.text} opacity-20 group-hover:opacity-60 transition-opacity rounded-br-2xl`}></div>

                    <div className="p-6 relative z-20 transform-style-3d">
                        <div className="flex items-start justify-between mb-6">
                            <div className={`text-3xl p-3 rounded-xl bg-black/40 border border-white/5 shadow-inner ${status === 'locked' ? 'grayscale opacity-50' : ''}`}>
                                {module.icon}
                            </div>
                            <div className={`text-[10px] font-mono px-2.5 py-1 rounded-md border tracking-widest uppercase font-bold ${currentStyle.badge} flex items-center gap-1.5`}>
                                {status === 'locked' && <Lock size={10} />}
                                {status === 'completed' && <CheckCircle2 size={10} />}
                                {status === 'inProgress' && <PlayCircle size={10} />}
                                {status.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                        </div>

                        <h3 className={`text-2xl font-bold mb-3 font-sans tracking-tight ${status === 'locked' ? 'text-slate-500' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all'}`}>
                            {module.title}
                        </h3>

                        <p className="text-sm text-slate-400 line-clamp-2 mb-6 font-light leading-relaxed">
                            {module.description}
                        </p>

                        <div className="flex items-center gap-5 text-xs text-slate-500 font-mono border-t border-white/5 pt-5">
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} className={currentStyle.text} /> {module.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <BookOpen size={14} className={currentStyle.text} /> {module.lessons} LESSONS
                            </span>
                        </div>

                        {/* Prerequisites for Locked Modules (Encrypted Look) */}
                        {status === 'locked' && prereqTitles && prereqTitles.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-slate-800/50 bg-black/20 -mx-6 -mb-6 px-6 pb-6">
                                <div className="text-[10px] text-red-400/80 font-mono mb-3 flex items-center gap-2 uppercase tracking-wider">
                                    <Lock size={12} />
                                    ENCRYPTED // REQUIRES CLEARANCE:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {prereqTitles.map((title, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-1 rounded bg-red-950/20 text-red-400 border border-red-900/20 font-mono">
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
