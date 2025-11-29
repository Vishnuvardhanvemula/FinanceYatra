import axios from 'axios';

const API_URL = 'http://localhost:5000/api/market';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getMarketPrices = async () => {
    const response = await axios.get(`${API_URL}/prices`);
    return response.data;
};

export const getPortfolio = async () => {
    const response = await axios.get(`${API_URL}/portfolio`, getAuthHeader());
    return response.data;
};

export const executeTrade = async (tradeData) => {
    const response = await axios.post(`${API_URL}/trade`, tradeData, getAuthHeader());
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await axios.get(`${API_URL}/leaderboard`, getAuthHeader());
    return response.data;
};
