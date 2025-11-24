import React from 'react';
import { motion } from 'framer-motion';
import { Info, Clock, Share2, Maximize2 } from 'lucide-react';

const HolographicDatapad = ({
    children,
    title,
    subtitle,
    duration,
    lessonIndex,
    totalLessons,
    onVerifyData
}) => {
    return (
        <div className="relative group">
            {/* Holographic Projection Base Effect */}
            <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

            <div className="relative bg-gray-900/80 border border-cyan-500/30 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl">
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-10 z-20"></div>

                {/* Top Bar (Datapad Header) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-gray-900/50 relative z-30">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono tracking-tight">
                                {title}
                            </h2>
                            {subtitle && (
                                <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">
                                    {subtitle}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded text-xs font-mono text-cyan-400">
                            <Clock size={14} />
                            <span>{duration || '5 MINS'}</span>
                        </div>

                        <div className="h-6 w-px bg-gray-700 mx-1"></div>

                        <button
                            onClick={onVerifyData}
                            className="p-2 hover:bg-cyan-500/10 rounded-lg text-cyan-400 transition-colors"
                            title="Verify Data Source"
                        >
                            <Info size={18} />
                        </button>
                        <button className="p-2 hover:bg-purple-500/10 rounded-lg text-purple-400 transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-8 relative z-10 min-h-[500px]">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-xl pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative">
                        {children}
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-6 py-2 bg-gray-900/80 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest relative z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        CONNECTION_SECURE
                    </div>
                    <div>
                        UNIT {lessonIndex + 1} / {totalLessons}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolographicDatapad;
