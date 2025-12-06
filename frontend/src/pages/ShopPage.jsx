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
        { id: 'all', label: 'All Items', icon: ShoppingBag },
        { id: 'frame', label: 'Frames', icon: Box },
        { id: 'accessory', label: 'Accessories', icon: Star },
        { id: 'theme', label: 'Themes', icon: Zap },
        { id: 'mystery_box', label: 'Mystery', icon: Box },
        { id: 'inventory', label: 'My Inventory', icon: Package },
    ];

    const getFilteredItems = () => {
        if (activeCategory === 'inventory') {
            // Map inventory items to full item details
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
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden pb-20">
            <ParticleBackground />

            <MysteryBoxModal
                isOpen={showMysteryBox}
                onClose={() => setShowMysteryBox(false)}
                boxItem={mysteryBoxItem}
                droppedItem={droppedItem}
            />

            {/* Header */}
            <div className="relative pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4"
                        >
                            XP Store
                        </motion.h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Spend your hard-earned XP on exclusive cosmetic upgrades and rewards.
                        </p>
                    </div>

                    {/* XP Balance Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl"
                    >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Your Balance</div>
                            <div className="text-3xl font-bold text-white font-mono">{user?.xp?.toLocaleString() || 0} XP</div>
                        </div>
                    </motion.div>
                </div>

                {/* Featured Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-950 z-10" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />

                    <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-amber-500/30">
                                Featured Item
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Luxury Dark Theme
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 max-w-xl">
                                Experience finance in style with our premium dark theme featuring gold accents and exclusive animations.
                            </p>
                            <button
                                onClick={() => {
                                    const item = items.find(i => i.itemId === 'theme_dark_gold');
                                    if (item) handlePurchase(item);
                                }}
                                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all"
                            >
                                Get it Now - 5,000 XP
                            </button>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-amber-500/30 blur-3xl rounded-full" />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/566/566312.png"
                                    alt="Featured Theme"
                                    className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800'
                                }`}
                        >
                            <cat.icon size={18} />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500"
                                >
                                    <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <Package size={48} className="text-slate-700" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-400 mb-2">
                                        {activeCategory === 'inventory' ? "Your inventory is empty" : "No items found"}
                                    </h3>
                                    <p className="text-slate-500 max-w-xs text-center">
                                        {activeCategory === 'inventory'
                                            ? "Visit the shop to acquire exclusive items for your journey."
                                            : "Check back later for new arrivals in this category."}
                                    </p>
                                </motion.div>
                            )}

                            {filteredItems.map((item) => {
                                const owned = isOwned(item.itemId);
                                const canAfford = user?.xp >= item.price;
                                const locked = item.unlockCondition?.rankTier > (user?.rankTier || 0);
                                const isInventoryView = activeCategory === 'inventory';
                                const isEquipped = item.isEquipped;

                                return (
                                    <TiltCard
                                        key={item.itemId}
                                        className={`h-full bg-slate-900/40 backdrop-blur-md border ${isEquipped ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
                                            item.rarity === 'legendary' ? 'border-amber-500/30' :
                                                item.rarity === 'epic' ? 'border-fuchsia-500/30' :
                                                    'border-slate-800'
                                            } rounded-2xl overflow-hidden hover:border-emerald-500/30`}
                                    >
                                        {/* Rarity Badge */}
                                        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider z-10 ${item.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-400' :
                                            item.rarity === 'epic' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                                                item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-slate-700/50 text-slate-400'
                                            }`}>
                                            {item.rarity}
                                        </div>

                                        {/* Preview Area */}
                                        <div className="h-48 bg-gradient-to-b from-slate-800/50 to-transparent flex items-center justify-center p-6 relative group-hover:bg-slate-800/70 transition-colors">
                                            {item.previewImage ? (
                                                <img src={item.previewImage} alt={item.name} className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <Box size={64} className="text-slate-600" />
                                            )}

                                            {locked && !owned && (
                                                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-20">
                                                    <Lock className="w-8 h-8 text-slate-500 mb-2" />
                                                    <span className="text-sm text-slate-400 font-medium">Unlocks at Rank Tier {item.unlockCondition.rankTier}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                            <p className="text-sm text-slate-400 mb-6 line-clamp-2">{item.description}</p>

                                            <div className="flex items-center justify-between relative z-10">
                                                {!isInventoryView ? (
                                                    // Shop View
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            <Zap size={16} className={canAfford ? "text-emerald-400" : "text-rose-400"} />
                                                            <span className={`font-bold font-mono ${canAfford ? "text-white" : "text-rose-400"}`}>
                                                                {item.price.toLocaleString()} XP
                                                            </span>
                                                        </div>

                                                        {owned && item.category !== 'mystery_box' ? (
                                                            <button disabled className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg font-medium text-sm flex items-center gap-2 cursor-default">
                                                                <Check size={14} /> Owned
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handlePurchase(item)}
                                                                disabled={!canAfford || locked || purchasing === item.itemId}
                                                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${!canAfford
                                                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                                                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                                                                    }`}
                                                            >
                                                                {purchasing === item.itemId ? (
                                                                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    'Purchase'
                                                                )}
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    // Inventory View
                                                    <div className="w-full">
                                                        {isEquipped ? (
                                                            <button disabled className="w-full px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg font-bold text-sm flex items-center justify-center gap-2 cursor-default">
                                                                <Check size={14} /> Equipped
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEquip(item)}
                                                                disabled={equipping === item.itemId}
                                                                className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                                                            >
                                                                {equipping === item.itemId ? (
                                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    'Equip'
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
