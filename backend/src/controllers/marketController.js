import Portfolio from '../models/Portfolio.js';
import StockTransaction from '../models/StockTransaction.js';
import YahooFinance from 'yahoo-finance2';
import marketService from '../services/marketService.js';
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

// Supported Stocks for the platform
const SUPPORTED_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Cyclical' },
    { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
    { symbol: 'META', name: 'Meta Platforms', sector: 'Technology' },
    { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Communication' },
    { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial' },
    { symbol: 'V', name: 'Visa Inc.', sector: 'Financial' }
];

// Helper to fetch real stock data
const fetchStockData = async (symbols) => {
    try {
        const results = await yahooFinance.quote(symbols);
        return results.map(quote => ({
            symbol: quote.symbol,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent
        }));
    } catch (error) {
        console.error('Failed to fetch stock data:', error.message);
        // Fallback to mock data if API fails (to prevent app crash)
        return symbols.map(sym => ({
            symbol: sym,
            price: 150.00 + (Math.random() * 10),
            change: 1.5,
            changePercent: 1.0
        }));
    }
};

export const getMarketPrices = async (req, res) => {
    try {
        const symbols = SUPPORTED_STOCKS.map(s => s.symbol);
        const realData = await fetchStockData(symbols);

        const stocks = SUPPORTED_STOCKS.map(stock => {
            const data = realData.find(d => d.symbol === stock.symbol) || {};
            return {
                ...stock,
                currentPrice: data.price || 0,
                change24h: data.changePercent || 0
            };
        });

        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch market prices', error: error.message });
    }
};

export const getMarketOverview = async (req, res) => {
    try {
        // Return top 5 stocks for dashboard
        const symbols = SUPPORTED_STOCKS.slice(0, 5).map(s => s.symbol);
        const realData = await fetchStockData(symbols);

        const stocks = SUPPORTED_STOCKS.slice(0, 5).map(stock => {
            const data = realData.find(d => d.symbol === stock.symbol) || {};
            return {
                symbol: stock.symbol,
                name: stock.name,
                price: data.price || 0,
                change: data.change || 0,
                changePercent: data.changePercent || 0
            };
        });
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch market overview', error: error.message });
    }
};

export const getPortfolio = async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne({ user: req.user._id });

        if (!portfolio) {
            portfolio = await Portfolio.create({
                user: req.user._id,
                balance: 10000,
                holdings: []
            });
        }

        // Get current prices for all holdings
        const holdingSymbols = portfolio.holdings.map(h => h.symbol);
        let priceMap = {};

        if (holdingSymbols.length > 0) {
            const realData = await fetchStockData(holdingSymbols);
            realData.forEach(d => {
                priceMap[d.symbol] = d.price;
            });
        }

        let holdingsValue = 0;
        const updatedHoldings = portfolio.holdings.map(holding => {
            const currentPrice = priceMap[holding.symbol] || holding.averagePrice;
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
        // Verify stock exists in our supported list
        const stockInfo = SUPPORTED_STOCKS.find(s => s.symbol === symbol);
        if (!stockInfo) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Fetch REAL-TIME price for the trade
        const quotes = await fetchStockData([symbol]);
        const currentPrice = quotes[0]?.price;

        if (!currentPrice) {
            return res.status(500).json({ message: 'Failed to fetch current stock price' });
        }

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

export const getMarketSentiment = async (req, res) => {
    try {
        const sentimentData = await marketService.analyzeMarketSentiment();
        res.json(sentimentData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to analyze market sentiment', error: error.message });
    }
};
