import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Crown, Zap, Star } from 'lucide-react';

const RankBadge = ({ tier, label, className = "" }) => {
    // Tier 0: Novice - Clean Slate (Minimalist)
    if (tier === 0) {
        return (
            <div className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 ${className}`}>
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">{label}</span>
            </div>
        );
    }

    // Tier 1: Apprentice - Forged Bronze (Metallic)
    if (tier === 1) {
        return (
            <div className={`relative inline-flex items-center gap-2 px-5 py-1.5 rounded-xl bg-gradient-to-b from-amber-900/40 to-black border border-amber-700/30 shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)] ${className}`}>
                <div className="absolute inset-0 rounded-xl bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <Award className="w-4 h-4 text-amber-500 relative z-10" />
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 tracking-wider uppercase relative z-10 drop-shadow-sm">
                    {label}
                </span>
            </div>
        );
    }

    // Tier 2: Expert - Chrome/Silver (Precision)
    if (tier === 2) {
        return (
            <div className={`relative inline-flex items-center gap-2 px-6 py-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 border-t border-l border-slate-400/30 border-b-slate-900 border-r-slate-900 shadow-[0_4px_20px_-5px_rgba(148,163,184,0.3)] overflow-hidden ${className}`}>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
                />
                <Zap className="w-4 h-4 text-cyan-400 relative z-10" fill="currentColor" fillOpacity={0.2} />
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-500 tracking-widest uppercase relative z-10">
                    {label}
                </span>
            </div>
        );
    }

    // Tier 3: Master - Gold (Ornate)
    if (tier === 3) {
        return (
            <div className={`relative inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-b from-yellow-900/40 to-black border border-yellow-500/30 shadow-[0_0_25px_-5px_rgba(234,179,8,0.4)] overflow-hidden ${className}`}>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.2),transparent_70%)]"></div>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-200/20 to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />

                <Crown className="w-5 h-5 text-yellow-400 relative z-10 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" fill="currentColor" fillOpacity={0.2} />
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 tracking-widest uppercase relative z-10 drop-shadow-sm filter">
                    {label}
                </span>
            </div>
        );
    }

    // Tier 4: Legendary - Holographic (Cosmic)
    if (tier === 4) {
        return (
            <div className={`relative inline-flex items-center gap-3 px-8 py-2 rounded-full bg-black border border-white/10 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] overflow-hidden group ${className}`}>
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 animate-spin-slow opacity-50 mask-image-content"></div>

                {/* Background Aurora */}
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/40 via-purple-900/40 to-indigo-900/40 opacity-80"></div>

                {/* Particles (Simulated) */}
                <motion.div
                    className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full"
                    animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{ y: [10, -10], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                />

                <Star className="w-5 h-5 text-fuchsia-400 relative z-10 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]" fill="currentColor" />

                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 tracking-[0.2em] uppercase relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {label}
                </span>
            </div>
        );
    }

    return null;
};

export default RankBadge;
