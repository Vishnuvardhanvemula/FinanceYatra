import axios from 'axios';
import { API_URL } from '../config/api';

const CACHE_DURATION = 5 * 60 * 1000; // 5 Minutes

// Helper for caching
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

export const moduleService = {
    // Get all modules (Cached)
    getAllModules: async () => {
        try {
            return await fetchWithCache('all_modules', async () => {
                const response = await axios.get(API_URL);
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching modules:', error);
            // If API fails, try to return stale cache if available
            const cached = localStorage.getItem('all_modules');
            if (cached) return JSON.parse(cached).data;

            return { success: false, message: error.message };
        }
    },

    // Get single module (Cached by ID)
    getModuleById: async (id) => {
        try {
            return await fetchWithCache(`module_${id}`, async () => {
                const response = await axios.get(`${API_URL}/${id}`);
                return response.data;
            });
        } catch (error) {
            console.error('Error fetching module:', error);
            return { success: false, message: error.message };
        }
    },

    // Get user stats
    getUserStats: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/progress`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user stats:', error);
            return { success: false, message: error.message };
        }
    },

    // Start a module
    startModule: async (token, moduleId) => {
        try {
            const response = await axios.post(`${API_URL}/${moduleId}/start`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error starting module:', error);
            return { success: false, message: error.message };
        }
    },

    // Complete a lesson
    completeLesson: async (token, moduleId, lessonIndex) => {
        try {
            const response = await axios.post(`${API_URL}/${moduleId}/lessons/${lessonIndex}/complete`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error completing lesson:', error);
            return { success: false, message: error.message };
        }
    },

    // Generate AI Quiz
    generateQuiz: async (token, moduleId, lessonIndex) => {
        try {
            // Note: Using a different base URL for quizzes since it's a separate route file
            const response = await axios.get(`${API_URL.replace('/modules', '')}/quiz/generate/${moduleId}/${lessonIndex}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error generating quiz:', error);
            return { success: false, message: error.message };
        }
    },

    // Admin: Create Module
    createModule: async (token, data) => {
        try {
            const response = await axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating module:', error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    // Admin: Update Module
    updateModule: async (token, id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating module:', error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    // Admin: Delete Module
    deleteModule: async (token, id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting module:', error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    }
};
