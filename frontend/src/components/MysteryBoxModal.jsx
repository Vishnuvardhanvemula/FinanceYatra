import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const MysteryBoxModal = ({ isOpen, onClose, boxItem, droppedItem }) => {
    const [stage, setStage] = useState('closed'); // closed, shaking, opening, revealed

    useEffect(() => {
        if (isOpen && stage === 'closed') {
            // Start sequence
            setStage('shaking');
            setTimeout(() => {
                setStage('opening');
                setTimeout(() => {
                    setStage('revealed');
                    confetti({
                        particleCount: 150,
                        spread: 100,
                        origin: { y: 0.6 },
                        colors: getRarityColors(droppedItem?.rarity)
                    });
                }, 1000);
            }, 2000);
        }
    }, [isOpen]);

    const getRarityColors = (rarity) => {
        switch (rarity) {
            case 'legendary': return ['#fbbf24', '#d97706', '#fffbeb'];
            case 'epic': return ['#e879f9', '#c026d3', '#fae8ff'];
            case 'rare': return ['#60a5fa', '#2563eb', '#eff6ff'];
            default: return ['#94a3b8', '#475569', '#f8fafc'];
        }
    };

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'legendary': return 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]';
            case 'epic': return 'text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]';
            case 'rare': return 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]';
            default: return 'text-slate-400';
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden"
                >
                    {/* Close button (only after reveal) */}
                    {stage === 'revealed' && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    )}

                    {/* Content based on stage */}
                    <div className="min-h-[300px] flex flex-col items-center justify-center w-full">
                        {stage !== 'revealed' ? (
                            <motion.div
                                animate={stage === 'shaking' ? {
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                                } : stage === 'opening' ? {
                                    scale: 1.5,
                                    opacity: 0,
                                    filter: "brightness(2)"
                                } : {}}
                                transition={stage === 'shaking' ? {
                                    duration: 0.5,
                                    repeat: 3
                                } : { duration: 0.5 }}
                            >
                                <Box size={120} className="text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative mb-6">
                                    <div className={`absolute inset-0 blur-3xl opacity-30 ${droppedItem?.rarity === 'legendary' ? 'bg-amber-500' :
                                            droppedItem?.rarity === 'epic' ? 'bg-fuchsia-500' :
                                                droppedItem?.rarity === 'rare' ? 'bg-blue-500' : 'bg-slate-500'
                                        }`} />

                                    {droppedItem?.previewImage ? (
                                        <img
                                            src={droppedItem.previewImage}
                                            alt={droppedItem.name}
                                            className="w-40 h-40 object-contain relative z-10 drop-shadow-2xl"
                                        />
                                    ) : (
                                        <Sparkles size={80} className={`relative z-10 ${getRarityColor(droppedItem?.rarity)}`} />
                                    )}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${getRarityColor(droppedItem?.rarity)}`}>
                                        {droppedItem?.rarity}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{droppedItem?.name}</h2>
                                    <p className="text-slate-400 mb-6">{droppedItem?.description}</p>

                                    {droppedItem?.isRefund && (
                                        <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-amber-300 border border-amber-500/20 mb-4">
                                            Duplicate item! Refunded {droppedItem.refundAmount} XP
                                        </div>
                                    )}

                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        Awesome!
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}

                        <div className="mt-8 text-slate-500 font-medium">
                            {stage === 'shaking' && "Opening..."}
                            {stage === 'opening' && "..."}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MysteryBoxModal;
