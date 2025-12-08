import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Zap, Box, Lock, Check, AlertCircle, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import api from '../services/api';

// Components
import GlowingRing from '../components/GlowingRing';
import ParticleBackground from '../components/ParticleBackground';
import MysteryBoxModal from '../components/MysteryBoxModal';


const ShopPage = () => {
    const { user, refreshUser } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [purchasing, setPurchasing] = useState(null);
    const [equipping, setEquipping] = useState(null);

    // Mystery Box State
    const [showMysteryBox, setShowMysteryBox] = useState(false);
    const [mysteryBoxItem, setMysteryBoxItem] = useState(null);
    const [droppedItem, setDroppedItem] = useState(null);

    useEffect(() => {
        fetchShopItems();
    }, []);

    const fetchShopItems = async () => {
        try {
            const response = await api.get('/shop/items');
            if (response.data.success) {
                setItems(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching shop items:', error);
            toast.error('Failed to load shop items');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (item) => {
        if (user.xp < item.price) {
            toast.error('Not enough XP!');
            return;
        }

        setPurchasing(item.itemId);
        try {
            const response = await api.post('/shop/purchase', { itemId: item.itemId });
            if (response.data.success) {
                // Update user state immediately with response data (Optimistic UI)
                const { remainingXp, inventory } = response.data.data;
                setUser(prev => ({
                    ...prev,
                    xp: remainingXp,
                    inventory: inventory
                }));

                if (item.category === 'mystery_box') {
                    setMysteryBoxItem(item);
                    setDroppedItem(response.data.data.droppedItem);
                    setShowMysteryBox(true);
                } else {
                    toast.success(`Purchased ${item.name}!`);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error(error.response?.data?.message || 'Purchase failed');
        } finally {
            setPurchasing(null);
        }
    };

    const handleEquip = async (item) => {
        setEquipping(item.itemId);
        try {
            const response = await api.post('/shop/equip', { itemId: item.itemId });
            if (response.data.success) {
                toast.success(`Equipped ${item.name}`);
                await refreshUser();
            }
        } catch (error) {
            console.error('Equip error:', error);
            toast.error('Failed to equip item');
        } finally {
            setEquipping(null);
        }
    };

    const categories = [
        { id: 'all', label: 'All', icon: ShoppingBag },
        { id: 'theme', label: 'Themes', icon: Zap },
        { id: 'frame', label: 'Frames', icon: Box },
        { id: 'accessory', label: 'Gear', icon: Star },
        { id: 'mystery_box', label: 'Mystery', icon: Box },
        { id: 'inventory', label: 'Inventory', icon: Package },
    ];

    const getFilteredItems = () => {
        if (activeCategory === 'inventory') {
            if (!user?.inventory) return [];
            return user.inventory.map(invItem => {
                const shopItem = items.find(i => i.itemId === invItem.itemId);
                if (!shopItem) return null;
                return { ...shopItem, isInventory: true, isEquipped: invItem.isEquipped };
            }).filter(Boolean);
        }

        return activeCategory === 'all'
            ? items
            : items.filter(item => item.category === activeCategory);
    };

    const filteredItems = getFilteredItems();
    const isOwned = (itemId) => user?.inventory?.some(i => i.itemId === itemId);

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden pb-20 font-sans selection:bg-emerald-500/30">
            <ParticleBackground />

            <MysteryBoxModal
                isOpen={showMysteryBox}
                onClose={() => setShowMysteryBox(false)}
                boxItem={mysteryBoxItem}
                droppedItem={droppedItem}
            />

            {/* Navbar Placeholder/Spacing */}
            <div className="h-20" />

            {/* Header / Hero Section */}
            <div className="relative pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md shadow-sm"
                    >
                        <Zap size={16} className="text-emerald-400 fill-emerald-400" />
                        <span className="text-sm font-medium text-slate-300">
                            Balance: <span className="text-white font-bold">{user?.xp?.toLocaleString() || 0} XP</span>
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500"
                    >
                        Marketplace
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400 max-w-2xl font-light"
                    >
                        Upgrade your financial persona with vivid themes, dynamic frames, and exclusive accessories.
                    </motion.p>
                </div>
            </div>

            {/* Category Tabs - Centered & Glassmorphic */}
            <div className="sticky top-20 z-40 px-6 mb-12 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-1 p-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-full shadow-2xl overflow-x-auto max-w-full no-scrollbar"
                >
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeCategory === cat.id
                                ? 'text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            {activeCategory === cat.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <cat.icon size={16} />
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Items Grid */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="col-span-full flex flex-col items-center justify-center py-32 text-center"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3">
                                        <Package size={40} className="text-slate-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {activeCategory === 'inventory' ? "Inventory Empty" : "No Items Found"}
                                    </h3>
                                    <p className="text-slate-500 max-w-sm">
                                        {activeCategory === 'inventory'
                                            ? "Your collection awaits. Explore the marketplace to find your first treasure."
                                            : "This section is currently out of stock. Check back for new drops."}
                                    </p>
                                </motion.div>
                            )}

                            {filteredItems.map((item, index) => {
                                const owned = isOwned(item.itemId);
                                const canAfford = user?.xp >= item.price;
                                const locked = item.unlockCondition?.rankTier > (user?.rankTier || 0);
                                const isInventoryView = activeCategory === 'inventory';
                                const isEquipped = item.isEquipped;

                                // Rarity Colors
                                const rarityConfig = {
                                    legendary: { color: 'text-amber-400', border: 'border-amber-500/50', shadow: 'shadow-amber-500/20', bg: 'bg-amber-500/10' },
                                    epic: { color: 'text-fuchsia-400', border: 'border-fuchsia-500/50', shadow: 'shadow-fuchsia-500/20', bg: 'bg-fuchsia-500/10' },
                                    rare: { color: 'text-cyan-400', border: 'border-cyan-500/50', shadow: 'shadow-cyan-500/20', bg: 'bg-cyan-500/10' },
                                    common: { color: 'text-slate-400', border: 'border-slate-700', shadow: 'shadow-slate-500/0', bg: 'bg-slate-800/30' }
                                };
                                const rc = rarityConfig[item.rarity] || rarityConfig.common;

                                return (
                                    <motion.div
                                        key={item.itemId}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="h-full"
                                    >
                                        <div className={`group relative h-full flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 border ${rc.border} ${isEquipped ? 'ring-2 ring-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]'}`}>

                                            {/* Card Background - Dynamic */}
                                            <div className="absolute inset-0 bg-slate-900/60 z-0" />
                                            <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b ${rc.bg.replace('10', '5')} to-transparent`} />

                                            {/* Holographic Header */}
                                            <div className="relative z-10 p-6 flex justify-between items-start border-b border-white/5 bg-white/5 backdrop-blur-md">
                                                <div className="flex flex-col">
                                                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase mb-1 ${rc.color}`}>
                                                        {item.category} • {item.rarity}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${rc.bg.replace('/10', '')} animate-pulse`} />
                                                        <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                                            {item.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                                {/* Equiped Tag */}
                                                {isEquipped && (
                                                    <div className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                                        Active
                                                    </div>
                                                )}
                                            </div>

                                            {/* Image Showcase - The "Holodeck" */}
                                            <div className="relative z-10 flex-grow py-8 px-6 flex items-center justify-center overflow-hidden">
                                                {/* Spotlight Effect - Enhanced Contrast */}
                                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[50px] opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${rc.bg.replace('10', '50')}`} />
                                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-[30px]" /> {/* White core for contrast */}

                                                {/* Scanner Grid Line */}
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_200%] bg-top group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                                {/* Scanner Grid Line */}
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_200%] bg-top group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                                {item.previewImage ? (
                                                    <img
                                                        src={item.previewImage}
                                                        alt={item.name}
                                                        className={`w-32 h-32 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_20px_40px_rgba(255,255,255,0.2)] ${locked && !owned ? 'grayscale opacity-40 blur-[2px]' : ''}`}
                                                    />
                                                ) : (
                                                    <Box size={80} className={`${rc.color} opacity-80`} />
                                                )}

                                                {/* Lock Overlay (Moved inside image showcase) */}
                                                {locked && !owned && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm z-20">
                                                        <div className="px-5 py-3 bg-slate-900 border border-slate-700 rounded-xl flex items-center gap-3 shadow-2xl">
                                                            <Lock size={16} className="text-rose-400" />
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] uppercase text-slate-500 font-bold">Unlocks at</span>
                                                                <span className="text-xs font-bold text-white">Rank Tier {item.unlockCondition.rankTier}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Footer */}
                                            <div className="relative z-10 p-4 bg-slate-950/40 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    {!isInventoryView ? (
                                                        <>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Price</span>
                                                                <div className={`flex items-center gap-1 font-mono font-bold ${canAfford ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                                    <Zap size={14} fill="currentColor" /> {item.price.toLocaleString()}
                                                                </div>
                                                            </div>

                                                            {owned && item.category !== 'mystery_box' ? (
                                                                <button disabled className="ml-auto w-full max-w-[120px] py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-500 text-xs font-bold uppercase tracking-wider cursor-default">
                                                                    Owned
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handlePurchase(item)}
                                                                    disabled={!canAfford || locked || purchasing === item.itemId}
                                                                    className={`ml-auto w-full max-w-[140px] relative overflow-hidden group/btn py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${!canAfford
                                                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                                                        : 'bg-white text-slate-950 hover:bg-emerald-400 hover:text-white shadow-lg'}`}
                                                                >
                                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                                                                    {purchasing === item.itemId ? (
                                                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                                    ) : (
                                                                        <>Purchase</>
                                                                    )}
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        // Inventory Actions
                                                        <button
                                                            onClick={() => handleEquip(item)}
                                                            disabled={isEquipped || equipping === item.itemId}
                                                            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${isEquipped
                                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                                                                : 'bg-white text-slate-950 hover:bg-indigo-400 hover:text-white shadow-lg active:scale-95'
                                                                }`}
                                                        >
                                                            {equipping === item.itemId ? (
                                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                            ) : isEquipped ? (
                                                                <> <Check size={14} /> Equipped </>
                                                            ) : (
                                                                'Equip'
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Bottom Gradient Fade */}
            <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-30" />
        </div>
    );
};

export default ShopPage;
