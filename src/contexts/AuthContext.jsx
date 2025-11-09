/**
 * Authentication Context
 * Manages user authentication state across the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user profile on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/profile`);
          if (response.data.success) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.error('Failed to load user:', error);
          // Token might be expired, clear it
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register new user
  const register = async (email, password, name, preferredLanguage = 'en') => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        preferredLanguage
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('authToken', token);
        return { success: true };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('authToken', token);
        return { success: true };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Clear user-specific chat sessions before logout
      if (user?._id) {
        const userId = user._id;
        // Clear user-specific chat session from localStorage
        localStorage.removeItem(`chatSessionId_${userId}`);
        console.log(`🔐 Cleared chat session for user: ${userId}`);
      }
      
      if (token) {
        await axios.post(`${API_URL}/auth/logout`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('token'); // Also remove 'token' key if used
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, updates);

      if (response.data.success) {
        setUser(response.data.data);
        return { success: true };
      }

      return { success: false, message: response.data.message };

    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed'
      };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/change-password`, {
        currentPassword,
        newPassword
      });

      return {
        success: response.data.success,
        message: response.data.message
      };

    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed'
      };
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/auth/profile`);
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
