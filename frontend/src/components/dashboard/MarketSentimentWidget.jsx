import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, RefreshCw, AlertCircle, Newspaper } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import SpotlightCard from '../SpotlightCard';

const MarketSentimentWidget = ({ rankTier }) => {
    const [sentimentData, setSentimentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSentiment();
    }, []);

    const fetchSentiment = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.getMarketSentiment();
            setSentimentData(data);
        } catch (err) {
            console.error("Failed to fetch sentiment:", err);
            setError("AI Analysis Unavailable");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-6 flex items-center justify-center h-64">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <span className="text-xs text-cyan-500/50 font-mono animate-pulse">ANALYZING MARKET DATA...</span>
                    </div>
                </div>
            </SpotlightCard>
        );
    }

    if (error) {
        return (
            <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
                <div className="p-6 flex items-center justify-center h-64 text-slate-500 gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            </SpotlightCard>
        );
    }

    const { sentimentScore, sentiment, summary, analyzedHeadlines } = sentimentData;

    // Determine colors based on sentiment
    const getSentimentColor = (score) => {
        if (score >= 60) return 'text-emerald-400'; // Greed
        if (score <= 40) return 'text-rose-400';    // Fear
        return 'text-amber-400';                    // Neutral
    };

    const getSentimentBg = (score) => {
        if (score >= 60) return 'bg-emerald-500';
        if (score <= 40) return 'bg-rose-500';
        return 'bg-amber-500';
    };

    const colorClass = getSentimentColor(sentimentScore);
    const bgClass = getSentimentBg(sentimentScore);

    return (
        <SpotlightCard className="h-full" variant={rankTier === 4 ? 'legendary' : 'default'}>
            <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${bgClass}/10 rounded-lg border ${bgClass}/20`}>
                            <Newspaper className={colorClass} size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">AI Market Analyst</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Real-time Sentiment</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-2xl font-mono font-bold ${colorClass}`}>{sentimentScore}</span>
                        <div className="text-right">
                            <div className={`text-[10px] font-bold uppercase ${colorClass}`}>{sentiment}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Fear & Greed Index</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 flex-1">
                    {/* Gauge / Visual */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center relative">
                        {/* Semi-Circle Gauge Background */}
                        <div className="w-40 h-20 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-slate-800 box-border"></div>
                            <motion.div
                                initial={{ rotate: -180 }}
                                animate={{ rotate: -180 + (sentimentScore / 100) * 180 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-transparent border-t-${sentimentScore >= 60 ? 'emerald' : sentimentScore <= 40 ? 'rose' : 'amber'}-500 box-border`}
                                style={{ transformOrigin: '50% 50%' }}
                            ></motion.div>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-slate-300 leading-relaxed italic">"{summary}"</p>
                        </div>
                    </div>

                    {/* Headlines */}
                    <div className="md:col-span-8 flex flex-col justify-center gap-3">
                        {analyzedHeadlines.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-start justify-between gap-4 hover:bg-white/10 transition-colors">
                                <span className="text-sm text-slate-200 line-clamp-1">{item.title}</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${item.sentiment === 'Bullish' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        item.sentiment === 'Bearish' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    } uppercase tracking-wider shrink-0`}>
                                    {item.sentiment}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

export default MarketSentimentWidget;
