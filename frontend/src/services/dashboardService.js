import api from './api';

const CACHE_DURATION = 5 * 60 * 1000; // 5 Minutes

const fetchWithCache = async (key, fetcher) => {
    const cached = localStorage.getItem(key);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }

    const data = await fetcher();
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
};

export const dashboardService = {
    getAnalytics: async () => {
        return fetchWithCache('dashboard_analytics', async () => {
            const response = await api.get('/dashboard/analytics');
            return response.data;
        });
    },

    getAchievements: async () => {
        return fetchWithCache('dashboard_achievements', async () => {
            const response = await api.get('/dashboard/achievements');
            return response.data;
        });
    },

    getStats: async () => {
        return fetchWithCache('dashboard_stats', async () => {
            const res = await api.get('/dashboard/stats');
            return res.data;
        });
    },

    getMarketData: async () => {
        return fetchWithCache('dashboard_market', async () => {
            const res = await api.get('/market/overview');
            return res.data;
        });
    },

    getMarketSentiment: async () => {
        return fetchWithCache('dashboard_sentiment', async () => {
            const res = await api.get('/market/sentiment');
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
