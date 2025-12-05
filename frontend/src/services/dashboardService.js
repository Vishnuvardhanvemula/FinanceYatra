import { API_URL } from '../config/api';
import axios from 'axios';

const CACHE_DURATION = 5 * 60 * 1000; // 5 Minutes

const fetchWithCache = async (key, fetcher) => {
    const cached = localStorage.getItem(key);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            // console.log(`⚡ Serving ${key} from cache`); // Optional: for debugging
            return data;
        }
    }

    // console.log(`🌐 Fetching ${key} from API`);
    const data = await fetcher();
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
};

export const dashboardService = {
    getAnalytics: async (token) => {
        return fetchWithCache('dashboard_analytics', async () => {
            const response = await fetch(`${API_URL}/dashboard/analytics`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.json();
        });
    },

    getAchievements: async (token) => {
        return fetchWithCache('dashboard_achievements', async () => {
            const response = await fetch(`${API_URL}/dashboard/achievements`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.json();
        });
    },

    getStats: async (token) => {
        return fetchWithCache('dashboard_stats', async () => {
            const res = await axios.get(`${API_URL}/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        });
    },

    getMarketData: async (token) => {
        return fetchWithCache('dashboard_market', async () => {
            const res = await axios.get(`${API_URL}/market/overview`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        });
    },

    getMarketSentiment: async (token) => {
        // Shorter cache for market sentiment (e.g. 2 mins) could be useful, but keeping unified for now
        return fetchWithCache('dashboard_sentiment', async () => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.get(`${API_URL}/market/sentiment`, { headers });
            return res.data;
        });
    },

    // Helper to clear cache (e.g. on logout)
    clearCache: () => {
        localStorage.removeItem('dashboard_analytics');
        localStorage.removeItem('dashboard_achievements');
        localStorage.removeItem('dashboard_stats');
        localStorage.removeItem('dashboard_market');
        localStorage.removeItem('dashboard_sentiment');
    }
};
