import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DashboardPage from './pages/DashboardPage';
import AchievementsPage from './pages/AchievementsPage';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getProficiencyColor = (level) => {
    const colors = {
      beginner: 'bg-teal-500',
      intermediate: 'bg-teal-600',
      expert: 'bg-teal-700'
    };
    return colors[level] || 'bg-teal-500';
  };

  return (
    <nav className="navbar-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Elegant & Simple */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white text-xl font-bold">₹</span>
            </div>
            <h1 className="text-xl font-bold text-gradient tracking-tight">financeYatra</h1>
          </Link>

          {/* Desktop Navigation - Clean & Minimal */}
          <div className="hidden md:flex space-x-1">
            <Link to="/" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                Dashboard
              </Link>
            )}
            <Link to="/chat" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              Chat
            </Link>
            <Link to="/modules" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              Learn
            </Link>
            <a href="#about" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
              About
            </a>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-teal-50 dark:bg-gray-700 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Hello, {user?.name}
                  </span>
                  {user?.proficiencyLevel && user.proficiencyLevel !== 'unknown' && (
                    <span className={`text-xs px-3 py-1 rounded-full text-white ${getProficiencyColor(user.proficiencyLevel)} shadow-sm font-semibold capitalize`}>
                      {user.proficiencyLevel}
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="btn-gradient text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Home</Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Dashboard</Link>
              )}
              <Link to="/chat" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Chat</Link>
              <Link to="/modules" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Modules</Link>
              <hr className="my-2 dark:border-gray-600" />
              {isAuthenticated ? (
                <button onClick={handleLogout} className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Sign In</Link>
                  <Link to="/signup" className="mx-4 btn-gradient text-sm text-center">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white mt-auto relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 dark:bg-teal-600 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 dark:bg-teal-500 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-500 dark:bg-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">₹</span>
              </div>
              <h3 className="text-2xl font-bold text-white">financeYatra</h3>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-6 leading-relaxed max-w-md">
              Empowering India with financial literacy. Learn finance concepts in 11+ languages with AI-powered assistance. Your journey to financial freedom starts here.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">
                <span>🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">
                <span>💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">
                <span>📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">
                <span>📸</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Home
              </Link></li>
              <li><Link to="/modules" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Learning Modules
              </Link></li>
              <li><Link to="/chat" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> AI Chat
              </Link></li>
              <li><Link to="/dashboard" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Dashboard
              </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> GitHub Repository
              </a></li>
              <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra/blob/main/FEATURES.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Features Guide
              </a></li>
              <li><a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Powered by Ollama
              </a></li>
              <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra#readme" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Documentation
              </a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice - Enhanced UI */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-yellow-900/30 via-yellow-800/20 to-yellow-900/30 border border-yellow-600/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400 text-2xl">⚠️</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-lg font-semibold text-yellow-400">Educational Content Notice</h4>
                <p className="text-sm text-gray-300 dark:text-gray-400 leading-relaxed">
                  Information provided is for learning purposes. Always verify current rates, fees, and regulations with official sources like 
                  <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-medium ml-1 underline decoration-dotted">RBI</a>, 
                  your bank, or certified financial advisors before making financial decisions.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-colors">
                    <span>🏦</span> Reserve Bank of India
                  </a>
                  <a href="https://www.dicgc.org.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-colors">
                    <span>🛡️</span> DICGC
                  </a>
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-colors">
                    <span>📊</span> Income Tax Dept
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">
              &copy; 2025 financeYatra. Making Money Management Simple for Everyone
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-600 italic">
              Financial Wisdom — Powered by Intelligence
            </p>
          </div>
          <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-pulse"></span>
              11 Languages
            </span>
            <span>|</span>
            <span>100% Free & Private</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200/20 dark:bg-teal-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200/20 dark:bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 relative z-10">
        <div className="text-center mb-16 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg mb-8 border border-teal-200/50 dark:border-teal-700/50 hover:scale-105 transition-transform duration-300">
            <span className="w-2.5 h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-pulse"></span>
            <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Your Journey to
            <br />
            <span className="text-gradient inline-block animate-gradient-x">Financial Freedom</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-6">
            Learn. Grow. Prosper.
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your AI mentor for smart money decisions. Making financial education simple for everyone
            in <span className="font-bold text-teal-600 dark:text-teal-400">11+ languages</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => navigate(isAuthenticated ? '/modules' : '/signup')}
              className="btn-gradient text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              {isAuthenticated ? 'Browse Modules' : 'Start Learning Free'}
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="btn-gradient-outline text-lg px-8 py-4 group"
            >
              <svg className="w-5 h-5 mr-2 inline-block transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Try AI Assistant
            </button>
          </div>

          {/* Stats - Enhanced with Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-teal-100/50 dark:border-teal-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <svg className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <div className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-1">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Modules</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/50 dark:border-purple-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <svg className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
              </svg>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">11</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Languages</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 dark:border-blue-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Skill Levels</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100/50 dark:border-yellow-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Achievements</div>
            </div>
          </div>
        </div>

        {/* Features Grid - Enhanced & Modern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {/* Feature 1 - Structured Learning */}
          <div className="card-elevated p-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 dark:bg-teal-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-teal-500/50 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Structured Learning</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                15 comprehensive modules covering everything from banking basics to portfolio management and advanced investing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-teal-500 dark:text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Beginner to Expert levels</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-teal-500 dark:text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Interactive quizzes</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-teal-500 dark:text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Progress tracking</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 - AI Assistant */}
          <div className="card-elevated p-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeIn relative overflow-hidden" style={{animationDelay: '100ms'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AI Chat Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Get personalized answers based on your proficiency level. Powered by Ollama LLM with RAG technology.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>11+ Indian languages</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Context-aware responses</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Voice support (TTS)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 - Track Progress */}
          <div className="card-elevated p-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fadeIn relative overflow-hidden" style={{animationDelay: '200ms'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Monitor your learning journey with detailed analytics, achievements, and learning streaks.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personal dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Achievement badges</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Learning streaks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Section - Modern & Engaging */}
        <div className="mt-32 text-center" id="about">
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose <span className="text-gradient">financeYatra</span>?
            </h3>
            <p className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-3">
              Turning Financial Confusion into Confidence
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Where financial education meets innovation — guided by AI, driven by you
            </p>
          </div>
          
          <div className="card-glass p-8 md:p-12 max-w-6xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-400/20 dark:bg-teal-500/10 rounded-full -ml-20 -mt-20 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400/20 dark:bg-purple-500/10 rounded-full -mr-20 -mb-20 blur-2xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-gradient mb-3">100%</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Free Forever</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">No hidden costs or premium plans</div>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-gradient mb-3">11+</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Indian Languages</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Learn in your preferred language</div>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div className="text-6xl font-bold text-gradient mb-3">AI</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Powered Learning</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Personalized with Ollama LLM</div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">100% Private</div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Fast & Responsive</div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Mobile Friendly</div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Expert Content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#14b8a6',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
            containerStyle={{
              top: 80,
              right: 20,
            }}
          />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:id" element={
                <ErrorBoundary>
                  <ModuleDetailPage />
                </ErrorBoundary>
              } />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
