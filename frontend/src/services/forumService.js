import api from './api';

const forumService = {
    // Get all posts with optional filters
    getAllPosts: async (category = 'All', search = '') => {
        try {
            let url = '/forum?';
            if (category !== 'All') url += `category=${encodeURIComponent(category)}&`;
            if (search) url += `search=${encodeURIComponent(search)}&`;

            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    // Create a new post
    createPost: async (postData) => {
        try {
            const response = await api.post('/forum', postData);
            return response.data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Get a single post by ID
    getPostById: async (postId) => {
        try {
            const response = await api.get(`/forum/${postId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    // Add a comment to a post
    addComment: async (postId, content) => {
        try {
            const response = await api.post(`/forum/${postId}/comments`, { content });
            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    },

    // Like a post
    likePost: async (postId) => {
        try {
            const response = await api.post(`/forum/${postId}/like`);
            return response.data;
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    }
};

export default forumService;
