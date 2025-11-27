import axios from 'axios';

const API_URL = 'http://localhost:5000/api/market';

export const fetchMarketOverview = async () => {
    try {
        const response = await axios.get(`${API_URL}/overview`);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch market data');
        }
    } catch (error) {
        console.error('Market Service Error:', error);
        return []; // Return empty array on error to prevent UI crash
    }
};
