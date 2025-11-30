import axios from 'axios';

const API_URL = 'http://localhost:5000/api/modules';

export const moduleService = {
    // Get all modules
    getAllModules: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching modules:', error);
            return { success: false, message: error.message };
        }
    },

    // Get single module
    getModuleById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
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
            const response = await axios.get(`http://localhost:5000/api/quiz/generate/${moduleId}/${lessonIndex}`, {
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
