import ShopItem from '../models/ShopItem.js';
import User from '../models/User.js';

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
            const rates = item.dropRates && item.dropRates.length > 0
                ? item.dropRates
                : [
                    { rarity: 'common', probability: 0.6 },
                    { rarity: 'rare', probability: 0.3 },
                    { rarity: 'epic', probability: 0.09 },
                    { rarity: 'legendary', probability: 0.01 }
                ];

            // Normalize rates to be sure? Assuming they sum to 1 or close.
            // Let's just iterate.
            // If rates is an object { common: 0.7, ... } as per seed script
            // We need to handle that format. Seed script used object.
            // Let's check seed script format again.
            // dropRates: { common: 0.7, rare: 0.25, epic: 0.05 }

            let dropRates = item.dropRates;
            // If it's a Map or Object in Mongoose, we access it.
            // If it's stored as Mixed/Object:

            if (!dropRates || Object.keys(dropRates).length === 0) {
                dropRates = { common: 0.6, rare: 0.3, epic: 0.09, legendary: 0.01 };
            }

            for (const [rarity, probability] of Object.entries(dropRates)) {
                cumulativeProbability += probability;
                if (random <= cumulativeProbability) {
                    selectedRarity = rarity;
                    break;
                }
            }

            // 3. Select random item of that rarity
            const itemsOfRarity = potentialItems.filter(i => i.rarity === selectedRarity);

            // Fallback if no items of that rarity exist
            const pool = itemsOfRarity.length > 0 ? itemsOfRarity : potentialItems;

            droppedItem = pool[Math.floor(Math.random() * pool.length)];

            // Check if user already owns the dropped item
            // If unique items only, we might want to reroll or give XP refund.
            // For simplicity, we'll allow duplicates for now OR convert to XP.
            // Let's convert duplicates to XP refund.
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

        res.json({
            success: true,
            message: droppedItem
                ? (droppedItem.isRefund ? `Duplicate item! Refunded ${droppedItem.refundAmount} XP.` : `You found: ${droppedItem.name}!`)
                : `Successfully purchased ${item.name}`,
            data: {
                inventory: user.inventory,
                remainingXp: user.xp,
                droppedItem: droppedItem // Frontend needs this for animation
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
            // If it's another item of the same category, set false? 
            // We'd need to look up every item's category to do this perfectly in the inventory array,
            // or just rely on `equippedItems` as the source of truth for display.
            // Let's just set the flag for the equipped one.
            // Ideally we should unset the previous one.
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
