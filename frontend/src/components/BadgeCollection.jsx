import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, Star, Clock, Zap, Target } from 'lucide-react';
import api from '../services/api';

const BadgeCollection = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedBadge, setSelectedBadge] = useState(null);

    useEffect(() => {
        fetchBadges();
    }, []);

    const fetchBadges = async () => {
        try {
            const response = await api.get('/badges');
            if (response.data.success) {
                setBadges(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching badges:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'milestone', label: 'Milestones' },
        { id: 'streak', label: 'Streaks' },
        { id: 'special', label: 'Special' },
    ];

    const filteredBadges = filter === 'all'
        ? badges
        : badges.filter(b => b.category === filter);

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'legendary': return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
            case 'epic': return 'text-fuchsia-400 border-fuchsia-500/50 bg-fuchsia-500/10';
            case 'rare': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
            default: return 'text-slate-400 border-slate-700 bg-slate-800/50';
        }
    };

    return (
        <div className="w-full">
            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${filter === cat.id
                                ? 'bg-white text-black'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {filteredBadges.map((badge) => (
                    <motion.div
                        key={badge.badgeId}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedBadge(badge)}
                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-3 cursor-pointer relative group ${badge.isEarned
                                ? getRarityColor(badge.rarity)
                                : 'border-slate-800 bg-slate-900/50 opacity-60 grayscale'
                            }`}
                    >
                        <div className="text-3xl mb-2 filter drop-shadow-lg">
                            {badge.icon}
                        </div>

                        {!badge.isEarned && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 rounded-2xl backdrop-blur-[1px]">
                                <Lock size={16} className="text-slate-500" />
                            </div>
                        )}

                        {badge.isEarned && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                                <Star size={8} className="text-black fill-current" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Badge Detail Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBadge(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`badge-${selectedBadge.badgeId}`}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full relative z-10 shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl mb-6 ${selectedBadge.isEarned
                                        ? 'bg-gradient-to-br from-white/10 to-transparent border border-white/20'
                                        : 'bg-slate-800 border border-slate-700 grayscale opacity-50'
                                    }`}>
                                    {selectedBadge.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{selectedBadge.name}</h3>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${selectedBadge.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-400' :
                                        selectedBadge.rarity === 'epic' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                                            selectedBadge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-slate-700 text-slate-400'
                                    }`}>
                                    {selectedBadge.rarity} Badge
                                </div>

                                <p className="text-slate-400 mb-6">
                                    {selectedBadge.description}
                                </p>

                                {selectedBadge.isEarned ? (
                                    <div className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                                        <Trophy size={16} />
                                        Earned on {new Date(selectedBadge.earnedAt).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <div className="text-slate-500 text-sm font-medium flex items-center gap-2">
                                        <Lock size={16} />
                                        Locked
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BadgeCollection;
