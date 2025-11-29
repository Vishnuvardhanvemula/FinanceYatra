import Portfolio from '../models/Portfolio.js';
import StockTransaction from '../models/StockTransaction.js';

// Mock Data for Phase 1
const MOCK_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 175.50, sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 138.20, sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 330.00, sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 145.80, sector: 'Consumer Cyclical' },
    { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 215.30, sector: 'Automotive' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', basePrice: 460.10, sector: 'Technology' },
    { symbol: 'META', name: 'Meta Platforms', basePrice: 310.50, sector: 'Technology' },
    { symbol: 'NFLX', name: 'Netflix Inc.', basePrice: 450.20, sector: 'Communication' },
    { symbol: 'JPM', name: 'JPMorgan Chase', basePrice: 148.00, sector: 'Financial' },
    { symbol: 'V', name: 'Visa Inc.', basePrice: 245.60, sector: 'Financial' }
];

// Helper to generate slightly randomized price
const getCurrentPrice = (basePrice) => {
    const fluctuation = (Math.random() - 0.5) * 0.04; // +/- 2%
    return basePrice * (1 + fluctuation);
};

export const getMarketPrices = async (req, res) => {
    try {
        const stocks = MOCK_STOCKS.map(stock => ({
            ...stock,
            currentPrice: getCurrentPrice(stock.basePrice),
            change24h: (Math.random() - 0.5) * 5 // Mock % change
        }));
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch market prices', error: error.message });
    }
};

export const getPortfolio = async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne({ user: req.user._id });

        if (!portfolio) {
            // Initialize new portfolio for user
            portfolio = await Portfolio.create({
                user: req.user._id,
                balance: 10000,
                holdings: []
            });
        }

        // Calculate current total value based on mock prices
        let holdingsValue = 0;
        const updatedHoldings = portfolio.holdings.map(holding => {
            const stock = MOCK_STOCKS.find(s => s.symbol === holding.symbol);
            const currentPrice = stock ? getCurrentPrice(stock.basePrice) : holding.averagePrice;
            const currentValue = currentPrice * holding.quantity;
            holdingsValue += currentValue;
            return {
                ...holding.toObject(),
                currentPrice,
                currentValue
            };
        });

        const totalValue = portfolio.balance + holdingsValue;

        res.json({
            balance: portfolio.balance,
            totalValue,
            holdings: updatedHoldings
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch portfolio', error: error.message });
    }
};

export const executeTrade = async (req, res) => {
    const { symbol, type, quantity } = req.body;
    const userId = req.user._id;

    if (!symbol || !type || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid trade parameters' });
    }

    try {
        const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        const currentPrice = getCurrentPrice(stock.basePrice);
        const totalAmount = currentPrice * quantity;

        let portfolio = await Portfolio.findOne({ user: userId });
        if (!portfolio) {
            portfolio = await Portfolio.create({ user: userId, balance: 10000, holdings: [] });
        }

        if (type === 'BUY') {
            if (portfolio.balance < totalAmount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            portfolio.balance -= totalAmount;

            const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
            if (existingHolding) {
                // Update average price
                const totalCost = (existingHolding.quantity * existingHolding.averagePrice) + totalAmount;
                existingHolding.quantity += Number(quantity);
                existingHolding.averagePrice = totalCost / existingHolding.quantity;
            } else {
                portfolio.holdings.push({
                    symbol,
                    quantity: Number(quantity),
                    averagePrice: currentPrice
                });
            }

        } else if (type === 'SELL') {
            const existingHolding = portfolio.holdings.find(h => h.symbol === symbol);
            if (!existingHolding || existingHolding.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient holdings' });
            }

            portfolio.balance += totalAmount;
            existingHolding.quantity -= Number(quantity);

            // Remove holding if quantity is 0
            if (existingHolding.quantity === 0) {
                portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== symbol);
            }
        } else {
            return res.status(400).json({ message: 'Invalid trade type' });
        }

        await portfolio.save();

        // Log Transaction
        await StockTransaction.create({
            user: userId,
            symbol,
            type,
            quantity,
            price: currentPrice,
            totalAmount
        });

        res.json({
            message: `Successfully ${type === 'BUY' ? 'bought' : 'sold'} ${quantity} ${symbol}`,
            portfolio
        });

    } catch (error) {
        res.status(500).json({ message: 'Trade execution failed', error: error.message });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        // Fetch all portfolios and populate user details
        const portfolios = await Portfolio.find()
            .populate('user', 'name avatar proficiencyLevel')
            .sort({ totalValue: -1 }) // Sort by highest value
            .limit(10); // Top 10

        // Transform data for frontend
        const leaderboard = portfolios.map((p, index) => ({
            rank: index + 1,
            user: p.user,
            totalValue: p.totalValue,
            balance: p.balance
        }));

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message });
    }
};
