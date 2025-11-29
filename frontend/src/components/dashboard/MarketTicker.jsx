import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Lock, Sparkles } from 'lucide-react';
import { getMarketPrices } from '../../services/marketService';

const MINIMUM_RANK_TIER = 2; // Expert and above

const MarketTicker = ({ userRankTier = 0 }) => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLocked = userRankTier < MINIMUM_RANK_TIER;

    useEffect(() => {
        if (isLocked) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                const data = await getMarketPrices();
                // Map API data to Ticker format
                const formattedData = data.map(item => ({
                    symbol: item.symbol,
                    name: item.name,
                    currency: 'USD',
                    price: item.currentPrice,
                    change: item.change24h,
                    changePercent: item.change24h
                }));
                setMarketData(formattedData);
            } catch (error) {
                console.error('Failed to load market data', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Refresh every 60 seconds
        const interval = setInterval(loadData, 60000);
        return () => clearInterval(interval);
    }, [isLocked]);

    // Loading State
    if (loading && !isLocked) {
        return (
            <div className="w-full h-16 bg-slate-900/50 border-y border-white/5 flex items-center justify-center gap-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-32 bg-slate-800/50 rounded-lg" />
                ))}
            </div>
        );
    }

    // Locked State (Premium Feature)
    if (isLocked) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/80 border-y border-amber-500/20 overflow-hidden relative group"
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[3000ms]" />

                {/* Lock Icon Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="flex items-center justify-center py-4 px-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <Lock className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white tracking-wide">Live Market Data</span>
                                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider">Premium</span>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                                Unlock at <span className="text-amber-400 font-bold">Expert Rank</span> to access real-time market intelligence
                            </span>
                        </div>
                        <Sparkles className="w-5 h-5 text-amber-400/50 animate-pulse" />
                    </div>
                </div>
            </motion.div>
        );
    }

    // Empty State
    if (!marketData || marketData.length === 0) return null;

    // Unlocked State (Full Ticker)
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-transparent border-b border-white/[0.03] overflow-hidden relative backdrop-blur-sm"
        >
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <div className="flex items-center py-2 overflow-hidden">
                <motion.div
                    className="flex items-center gap-12 px-8 min-w-full"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate data for seamless loop */}
                    {[...marketData, ...marketData, ...marketData].map((item, index) => (
                        <div key={`${item.symbol}-${index}`} className="flex items-center gap-3 shrink-0 group cursor-default opacity-70 hover:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-widest">
                                    {item.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono font-medium text-slate-200">
                                        {item.currency === 'INR' ? '₹' : item.currency === 'USD' ? '$' : ''}
                                        {item.price ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                                    </span>
                                    <span className={`text-[10px] font-bold flex items-center ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {item.change >= 0 ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                                        {item.changePercent ? Math.abs(item.changePercent).toFixed(2) : '0.00'}%
                                    </span>
                                </div>
                            </div>
                            {index !== (marketData.length * 3) - 1 && (
                                <div className="w-px h-6 bg-white/5 mx-2" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MarketTicker;
