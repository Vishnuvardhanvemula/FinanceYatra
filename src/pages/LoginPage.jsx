/**
 * Login Page
 * User authentication page
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/20 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 dark:bg-teal-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-400 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
              <span className="text-white text-2xl font-bold">₹</span>
            </div>
            <h1 className="text-4xl font-extrabold text-teal-600 dark:text-teal-400">
              financeYatra
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Your AI-Powered Finance Tutor
          </p>
        </div>

        {/* Login Card */}
        <div className="card-glass p-8 animate-fadeIn" style={{animationDelay: '100ms'}}>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Sign in to continue your learning journey
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm flex items-center gap-3 animate-fadeIn">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full text-lg relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 spinner"></div>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Log In
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-xs font-medium text-gray-500 dark:text-gray-400">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Continue as Guest */}
          <button
            onClick={() => navigate('/chat')}
            className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold transition-all duration-200 border-2 border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-500 hover:shadow-md flex items-center justify-center gap-2"
          >
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 hover:underline inline-flex items-center gap-1">
              <span>Sign up free</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 text-center animate-fadeIn" style={{animationDelay: '200ms'}}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-sm">
              <span>🌍</span>
              <span className="font-medium">11 Languages</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-sm">
              <span>🤖</span>
              <span className="font-medium">AI Powered</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-sm">
              <span>🔊</span>
              <span className="font-medium">Voice Support</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
