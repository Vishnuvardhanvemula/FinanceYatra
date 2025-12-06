import api from './api';

export const getTransactions = async () => {
    const response = await api.get('/budget/transactions');
    return response.data;
};

export const addTransaction = async (transactionData) => {
    const response = await api.post('/budget/transactions', transactionData);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(`/budget/transactions/${id}`);
    return response.data;
};

export const getGoals = async () => {
    const response = await api.get('/budget/goals');
    return response.data;
};

export const addGoal = async (goalData) => {
    const response = await api.post('/budget/goals', goalData);
    return response.data;
};

export const updateGoalProgress = async (id, amount) => {
    const response = await api.put(`/budget/goals/${id}/progress`, { amount });
    return response.data;
};

export const deleteGoal = async (id) => {
    const response = await api.delete(`/budget/goals/${id}`);
    return response.data;
};
