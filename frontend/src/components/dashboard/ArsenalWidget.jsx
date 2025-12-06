import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SpotlightCard from '../SpotlightCard'; // Ensure correct path
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ArsenalWidget = () => {
    const { user, refreshUser } = useAuth(); // Added refreshUser
    const navigate = useNavigate();
    const [recommendedItem, setRecommendedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [equipping, setEquipping] = useState(false);
    const [mode, setMode] = useState('recommendation'); // 'recommendation' or 'showcase'

    useEffect(() => {
        if (user) {
            fetchRecommendation();
        }
    }, [user]);

    const fetchRecommendation = async () => {
        try {
            setLoading(true);
            const response = await api.get('/shop/items');
            if (response.data.success) {
                const allItems = response.data.data;
                const ownedIds = new Set(user.inventory.map(i => i.itemId));

                // 1. Check for "New" Items (acquired in last 24h and not equipped)
                const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                const recentItems = user.inventory.filter(i => {
                    const purchaseDate = new Date(i.purchasedAt);
                    // Check if already equipped
                    return purchaseDate > oneDayAgo && !i.isEquipped;
                });

                if (recentItems.length > 0) {
                    // Show the most recent one
                    const recentInvItem = recentItems[recentItems.length - 1]; // Last produced
                    const shopItem = allItems.find(i => i.itemId === recentInvItem.itemId);
                    if (shopItem) {
                        // Double check against equipped items map if available
                        // But i.isEquipped flag on inventory should be enough
                        setRecommendedItem(shopItem);
                        setMode('showcase');
                        setLoading(false);
                        return;
                    }
                }

                // 2. Recommendation Mode
                const unownedItems = allItems.filter(i => !ownedIds.has(i.itemId) && i.isActive);

                if (unownedItems.length === 0) {
                    setRecommendedItem(null);
                    setLoading(false);
                    return;
                }

                // Sort logic
                const affordable = unownedItems.filter(i => i.price <= user.xp);
                const aspirational = unownedItems.filter(i => i.price > user.xp && i.price <= user.xp * 1.5);

                let targetItem;
                if (affordable.length > 0) {
                    targetItem = affordable.sort((a, b) => b.price - a.price)[0];
                } else if (aspirational.length > 0) {
                    targetItem = aspirational.sort((a, b) => a.price - b.price)[0];
                } else {
                    targetItem = unownedItems.sort((a, b) => a.price - b.price)[0];
                }

                setRecommendedItem(targetItem);
                setMode('recommendation');
            }
        } catch (error) {
            console.error("Failed to fetch arsenal recommendation", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEquip = async () => {
        if (!recommendedItem) return;
        try {
            setEquipping(true);
            const response = await api.post('/shop/equip', { itemId: recommendedItem.itemId });
            if (response.data.success) {
                toast.success(`Equipped ${recommendedItem.name}!`);
                if (refreshUser) {
                    await refreshUser();
                } else {
                    window.location.reload();
                }
                // Hide widget or refresh content after equip? 
                // Perhaps switch to recommending something else?
                fetchRecommendation();
            }
        } catch (error) {
            console.error("Equip error", error);
            toast.error("Failed to equip item");
        } finally {
            setEquipping(false);
        }
    };

    // Fallback UI if no specific item recommended
    if (!recommendedItem && !loading) {
        return (
            <SpotlightCard className="h-full group overflow-hidden cursor-pointer" variant="default" onClick={() => navigate('/shop')}>
                <div className="absolute inset-0 bg-slate-900/50" />
                <div className="relative p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShoppingBag size={24} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Armory Offline</h3>
                    <p className="text-xs text-slate-500 font-mono mb-4">No active recommendations.</p>
                    <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider group-hover:bg-slate-700 group-hover:text-white transition-colors">
                        Visit Marketplace
                    </button>
                </div>
            </SpotlightCard>
        );
    }

    if (loading) return null; // Or skeleton

    const isAffordable = user.xp >= (recommendedItem?.price || 0);

    return (
        <SpotlightCard className="h-full group overflow-hidden" variant="default">
            {/* Dynamic Background */}
            <div className={`absolute inset-0 opacity-20 transition-opacity duration-1000 ${mode === 'showcase' ? 'bg-emerald-500/20' : 'bg-amber-500/10'}`} />

            <div className="relative p-6 h-full flex flex-col">
                {/* Header Badge */}
                <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${mode === 'showcase'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-amber-500/20 border-amber-500/50 text-amber-400'}`}>
                        {mode === 'showcase' ? 'New Acquisition' : 'Upgrade Available'}
                    </div>
                    {mode === 'showcase' ? <CheckCircle size={16} className="text-emerald-400" /> : <Lock size={16} className="text-slate-500" />}
                </div>

                {/* Item Preview (Mini Holo) */}
                <div className="flex-1 flex items-center justify-center relative my-4">
                    <div className={`absolute inset-0 rounded-full blur-[40px] ${mode === 'showcase' ? 'bg-emerald-500/20' : 'bg-amber-500/10'}`} />
                    <motion.img
                        src={recommendedItem?.previewImage}
                        alt={recommendedItem?.name}
                        className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                {/* Info & Action */}
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-bold text-white leading-tight">{recommendedItem?.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">{recommendedItem?.category}</p>
                    </div>

                    {mode === 'recommendation' ? (
                        <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1 font-mono font-bold ${isAffordable ? 'text-emerald-400' : 'text-rose-400'}`}>
                                <Zap size={14} fill="currentColor" />
                                <span>{recommendedItem?.price?.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => navigate('/shop')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${isAffordable
                                    ? 'bg-white text-black hover:bg-emerald-400 hover:text-white'
                                    : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                            >
                                {isAffordable ? 'Acquire' : 'Earn More'} <ArrowRight size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleEquip}
                            disabled={equipping}
                            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {equipping ? (
                                <>Processing...</>
                            ) : (
                                <>Equip Now <Zap size={14} /></>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </SpotlightCard>
    );
};

export default ArsenalWidget;
