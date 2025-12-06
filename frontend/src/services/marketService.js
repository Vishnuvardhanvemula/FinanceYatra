import api from './api';

export const getMarketPrices = async () => {
    const response = await api.get('/market/prices');
    return response.data;
};

export const getPortfolio = async () => {
    const response = await api.get('/market/portfolio');
    return response.data;
};

export const executeTrade = async (tradeData) => {
    const response = await api.post('/market/trade', tradeData);
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await api.get('/market/leaderboard');
    return response.data;
};
