import { API_URL } from '../config/api';
import axios from 'axios';

export const dashboardService = {
    getAnalytics: async (token) => {
        const response = await fetch(`${API_URL}/dashboard/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.json();
    },

    getAchievements: async (token) => {
        const response = await fetch(`${API_URL}/dashboard/achievements`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.json();
    },

    getStats: async (token) => {
        const res = await axios.get(`${API_URL}/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    getMarketData: async (token) => {
        const res = await axios.get(`${API_URL}/market/overview`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    }
};
