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
import TiltCard from '../components/TiltCard';

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
                await refreshUser(); // Update user XP and inventory

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
                                        <TiltCard
                                            className={`h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden group hover:border-slate-600 transition-colors duration-500 flex flex-col ${isEquipped ? 'ring-2 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : ''
                                                }`}
                                        >
                                            {/* Image Area */}
                                            <div className="aspect-square relative p-8 flex items-center justify-center bg-gradient-to-b from-slate-800/30 to-transparent">
                                                {/* Rarity Tag */}
                                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 backdrop-blur-sm z-10 ${item.rarity === 'legendary' ? 'bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' :
                                                    item.rarity === 'epic' ? 'bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.2)]' :
                                                        item.rarity === 'rare' ? 'bg-cyan-500/10 text-cyan-400' :
                                                            'bg-slate-500/10 text-slate-400'
                                                    }`}>
                                                    {item.rarity}
                                                </div>

                                                {item.previewImage ? (
                                                    <img
                                                        src={item.previewImage}
                                                        alt={item.name}
                                                        className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 ${locked && !owned ? 'grayscale opacity-30 blur-sm' : ''
                                                            }`}
                                                    />
                                                ) : (
                                                    <Box size={64} className="text-slate-700" />
                                                )}

                                                {/* Locked Overlay */}
                                                {locked && !owned && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20">
                                                        <div className="bg-slate-900/90 rounded-2xl p-4 flex flex-col items-center border border-slate-700 shadow-2xl">
                                                            <Lock size={24} className="text-slate-400 mb-2" />
                                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unlocks at</span>
                                                            <span className="text-sm font-bold text-white">
                                                                {item.unlockCondition.rankTier === 1 ? 'Beginner' :
                                                                    item.unlockCondition.rankTier === 2 ? 'Intermediate' :
                                                                        item.unlockCondition.rankTier === 3 ? 'Expert' :
                                                                            `Tier ${item.unlockCondition.rankTier}`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Equipped Badge */}
                                                {isEquipped && (
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5">
                                                        <Check size={10} strokeWidth={4} /> EQUIPPED
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6 flex flex-col flex-grow bg-slate-900/20">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <div className="mt-auto">
                                                    {!isInventoryView ? (
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Price</span>
                                                                <div className={`flex items-center gap-1.5 font-bold ${canAfford ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                                    <Zap size={14} fill="currentColor" />
                                                                    <span>{item.price.toLocaleString()}</span>
                                                                </div>
                                                            </div>

                                                            {owned && item.category !== 'mystery_box' ? (
                                                                <button disabled className="px-5 py-2.5 bg-slate-800 text-slate-500 rounded-xl font-semibold text-xs border border-slate-700 cursor-default opacity-60">
                                                                    Owned
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handlePurchase(item)}
                                                                    disabled={!canAfford || locked || purchasing === item.itemId}
                                                                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${!canAfford
                                                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                                                        : 'bg-white text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:scale-105 active:scale-95'
                                                                        }`}
                                                                >
                                                                    {purchasing === item.itemId ? (
                                                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mx-auto" />
                                                                    ) : (
                                                                        'Purchase'
                                                                    )}
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        // Inventory Actions
                                                        <div className="pt-2">
                                                            {isEquipped ? (
                                                                <button
                                                                    disabled
                                                                    className="w-full py-3 bg-slate-800/50 text-emerald-500 rounded-xl font-bold text-xs border border-emerald-500/20 cursor-default flex items-center justify-center gap-2"
                                                                >
                                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                                    Active
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleEquip(item)}
                                                                    disabled={equipping === item.itemId}
                                                                    className="w-full py-3 bg-white hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    {equipping === item.itemId ? (
                                                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mx-auto" />
                                                                    ) : "Equip Item"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TiltCard>
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
