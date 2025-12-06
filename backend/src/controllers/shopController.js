import ShopItem from '../models/ShopItem.js';
import User from '../models/User.js';
import ForumPost from '../models/ForumPost.js';

// Get all active shop items
export const getShopItems = async (req, res) => {
    try {
        const items = await ShopItem.find({ isActive: true }).sort({ price: 1 });

        // If user is logged in, we could potentially flag owned items here, 
        // but for now let's just return the catalog.
        // The frontend can cross-reference with user inventory.

        res.json({
            success: true,
            data: items
        });
    } catch (error) {
        console.error('Error fetching shop items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch shop items'
        });
    }
};

// Purchase an item
export const purchaseItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user._id;

        const item = await ShopItem.findOne({ itemId, isActive: true });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if already owned (unless it's a consumable/mystery box)
        if (item.category !== 'mystery_box') {
            const alreadyOwned = user.inventory.some(i => i.itemId === itemId);
            if (alreadyOwned) {
                return res.status(400).json({ success: false, message: 'Item already owned' });
            }
        }

        if ((user.xp || 0) < item.price) {
            return res.status(400).json({ success: false, message: 'Insufficient XP' });
        }

        // Deduct XP
        user.xp -= item.price;

        let purchasedItem = item;
        let droppedItem = null;

        // Handle Mystery Box Logic
        if (item.category === 'mystery_box') {
            // 1. Get all potential items (excluding mystery boxes)
            const potentialItems = await ShopItem.find({
                category: { $ne: 'mystery_box' },
                isActive: true
            });

            // 2. Determine rarity based on drop rates
            const random = Math.random();
            let cumulativeProbability = 0;
            let selectedRarity = 'common';

            // Default drop rates if not specified
            const rates = item.dropRates || { common: 0.6, rare: 0.3, epic: 0.09, legendary: 0.01 };

            // Handle both array and object formats for dropRates
            let dropRates = rates;
            if (Array.isArray(rates)) {
                // Convert array to object if needed or iterate array directly.
                // Assuming object structure { common: 0.6 ... } for simplicity based on previous code
                dropRates = { common: 0.6, rare: 0.3, epic: 0.09, legendary: 0.01 }; // Fallback
            }

            // Using standard object iteration
            const entries = Object.entries(item.dropRates || { common: 0.6, rare: 0.3, epic: 0.09, legendary: 0.01 });
            for (const [rarity, probability] of entries) {
                cumulativeProbability += probability;
                if (random <= cumulativeProbability) {
                    selectedRarity = rarity;
                    break;
                }
            }

            // 3. Select random item of that rarity
            const itemsOfRarity = potentialItems.filter(i => i.rarity === selectedRarity);
            const pool = itemsOfRarity.length > 0 ? itemsOfRarity : potentialItems;
            droppedItem = pool[Math.floor(Math.random() * pool.length)];

            // Check if user already owns the dropped item
            const alreadyHasDrop = user.inventory.some(i => i.itemId === droppedItem.itemId);
            if (alreadyHasDrop) {
                const refund = Math.floor(droppedItem.price / 2);
                user.xp += refund;
                droppedItem = { ...droppedItem.toObject(), isRefund: true, refundAmount: refund };
            } else {
                user.inventory.push({
                    itemId: droppedItem.itemId,
                    purchasedAt: new Date(),
                    isEquipped: false
                });
            }
        } else {
            // Normal purchase
            user.inventory.push({
                itemId: item.itemId,
                purchasedAt: new Date(),
                isEquipped: false
            });
        }

        await user.save();

        // --- Community Celebration Logic (System Event) ---
        // Post to forum if item is impactful (Rare+)
        try {
            const highRarity = ['rare', 'epic', 'legendary'];
            // Determine item to celebrate (purchased or dropped)
            const itemToCelebrate = droppedItem && !droppedItem.isRefund ? droppedItem : (item.category !== 'mystery_box' ? item : null);

            if (itemToCelebrate && highRarity.includes(itemToCelebrate.rarity)) {

                const emojis = {
                    rare: '💠',
                    epic: '🔮',
                    legendary: '👑'
                };
                const emoji = emojis[itemToCelebrate.rarity] || '✨';

                await ForumPost.create({
                    author: user._id, // User gets the credit
                    title: `${emoji} ACQUISITION: ${user.name.split(' ')[0]} secured ${itemToCelebrate.name}!`,
                    content: `A new standard has been set.\n\n**${user.name}** has just acquired the **[ ${itemToCelebrate.rarity.toUpperCase()} ]** item: **${itemToCelebrate.name}**.\n\n*System Message: Upgrade confirmed. Congratulations on the new addition to your arsenal.*`,
                    category: 'General',
                    tags: ['System Event', 'Celebration', itemToCelebrate.rarity],
                    isSolved: false
                });
            }
        } catch (forumError) {
            console.error('Failed to create celebration post:', forumError);
        }

        res.json({
            success: true,
            message: droppedItem
                ? (droppedItem.isRefund ? `Duplicate item! Refunded ${droppedItem.refundAmount} XP.` : `You found: ${droppedItem.name}!`)
                : `Successfully purchased ${item.name}`,
            data: {
                inventory: user.inventory,
                remainingXp: user.xp,
                droppedItem: droppedItem
            }
        });

    } catch (error) {
        console.error('Error purchasing item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to purchase item'
        });
    }
};

// Equip an item
export const equipItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const inventoryItem = user.inventory.find(i => i.itemId === itemId);

        if (!inventoryItem) {
            return res.status(404).json({ success: false, message: 'Item not in inventory' });
        }

        // Find item details to know category
        const itemDetails = await ShopItem.findOne({ itemId });
        if (!itemDetails) {
            return res.status(404).json({ success: false, message: 'Item details not found' });
        }

        // Unequip current item of same category
        const category = itemDetails.category;

        // Update equippedItems map
        if (user.equippedItems) {
            user.equippedItems[category] = itemId;
        } else {
            user.equippedItems = { [category]: itemId };
        }

        // Update inventory isEquipped flags
        user.inventory.forEach(i => {
            // If it's the item we're equipping, set true
            if (i.itemId === itemId) {
                i.isEquipped = true;
            }
        });

        await user.save();

        res.json({
            success: true,
            message: `Equipped ${itemDetails.name}`,
            data: {
                equippedItems: user.equippedItems
            }
        });

    } catch (error) {
        console.error('Error equipping item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to equip item'
        });
    }
};

// Get user inventory
export const getInventory = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        // We might want to populate with item details
        // Since inventory only has itemId, we need to fetch details
        const itemIds = user.inventory.map(i => i.itemId);
        const itemDetails = await ShopItem.find({ itemId: { $in: itemIds } });

        const inventoryWithDetails = user.inventory.map(invItem => {
            const details = itemDetails.find(d => d.itemId === invItem.itemId);
            return {
                ...invItem.toObject(),
                details: details || null
            };
        });

        res.json({
            success: true,
            data: inventoryWithDetails,
            equippedItems: user.equippedItems
        });
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inventory'
        });
    }
};
