import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { getLeaderboard } from '../../services/marketService';
import toast from 'react-hot-toast';

const RankIcon = ({ rank }) => {
    if (rank === 1) return <Trophy className="text-yellow-400" size={24} />;
    if (rank === 2) return <Medal className="text-slate-300" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return <span className="font-bold text-slate-500 w-6 text-center">{rank}</span>;
};

const MarketLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
            } catch (error) {
                toast.error('Failed to load leaderboard');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                    <Award className="text-purple-500" />
                    Top Traders
                </h2>
                <p className="text-slate-400">The most profitable portfolios on the platform</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {leaderboard.map((entry, index) => (
                    <motion.div
                        key={entry.user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : ''}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 flex justify-center">
                                <RankIcon rank={entry.rank} />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
                                {entry.user.avatar ? (
                                    <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-white">
                                        {entry.user.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-white">{entry.user.name}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">{entry.user.proficiencyLevel || 'Trader'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-mono font-bold text-emerald-400 text-lg">
                                ${entry.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                                <TrendingUp size={12} />
                                Net Worth
                            </p>
                        </div>
                    </motion.div>
                ))}

                {leaderboard.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <p>No traders found yet. Be the first!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketLeaderboard;
