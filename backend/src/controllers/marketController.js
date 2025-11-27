import { getMarketOverview } from '../services/marketService.js';

export const getMarketData = async (req, res) => {
    try {
        const data = await getMarketOverview();
        res.json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch market data',
            error: error.message
        });
    }
};
