/**
 * Celebration Modal Component
 * "Mission Accomplished" Aesthetic
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ArrowRight, X, Share2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CelebrationModal = ({ onClose, xpEarned = 100, rankProgress = 75 }) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
                {/* Confetti/Particle Effects (CSS or Canvas could be added here) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-500 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: -20,
                                opacity: 1
                            }}
                            animate={{
                                y: window.innerHeight + 20,
                                opacity: 0,
                                rotate: 360
                            }}
                            transition={{
                                duration: Math.random() * 2 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: 50 }}
                    className="bg-[#0b101b] border border-cyan-500/50 rounded-2xl p-1 max-w-md w-full relative shadow-[0_0_100px_rgba(6,182,212,0.3)]"
                >
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl opacity-50 blur-xl animate-pulse" />

                    <div className="bg-[#0b101b] rounded-xl p-8 relative z-10 overflow-hidden">
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center relative z-10">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.5)]"
                            >
                                <Trophy size={48} className="text-white drop-shadow-lg" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono mb-2"
                            >
                                MISSION ACCOMPLISHED
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-400 font-mono text-sm mb-8"
                            >
                                MODULE_COMPLETION_VERIFIED
                            </motion.p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl"
                                >
                                    <div className="text-cyan-400 mb-1 flex justify-center"><Star size={20} /></div>
                                    <div className="text-2xl font-bold text-white font-mono">+{xpEarned}</div>
                                    <div className="text-xs text-gray-500 font-mono">XP_GAINED</div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl"
                                >
                                    <div className="text-purple-400 mb-1 flex justify-center"><Award size={20} /></div>
                                    <div className="text-2xl font-bold text-white font-mono">{rankProgress}%</div>
                                    <div className="text-xs text-gray-500 font-mono">RANK_PROGRESS</div>
                                </motion.div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={() => navigate('/modules')}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all flex items-center justify-center gap-2 font-mono"
                                >
                                    NEXT_MISSION
                                    <ArrowRight size={18} />
                                </motion.button>

                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-mono text-sm"
                                >
                                    <Share2 size={16} />
                                    SHARE_ACHIEVEMENT
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CelebrationModal;
