import axios from 'axios';

const API_URL = 'http://localhost:5000/api/budget';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}/transactions`, getAuthHeader());
    return response.data;
};

export const addTransaction = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transactions`, transactionData, getAuthHeader());
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await axios.delete(`${API_URL}/transactions/${id}`, getAuthHeader());
    return response.data;
};

export const getGoals = async () => {
    const response = await axios.get(`${API_URL}/goals`, getAuthHeader());
    return response.data;
};

export const addGoal = async (goalData) => {
    const response = await axios.post(`${API_URL}/goals`, goalData, getAuthHeader());
    return response.data;
};

export const updateGoalProgress = async (id, amount) => {
    const response = await axios.put(`${API_URL}/goals/${id}/progress`, { amount }, getAuthHeader());
    return response.data;
};

export const deleteGoal = async (id) => {
    const response = await axios.delete(`${API_URL}/goals/${id}`, getAuthHeader());
    return response.data;
};
