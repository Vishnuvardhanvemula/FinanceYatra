// Centralized API base URL for frontend
const PROD_API_URL = 'https://finance-yatra-f4yl.vercel.app/api';
export const API_URL = import.meta.env.PROD
    ? PROD_API_URL
    : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
