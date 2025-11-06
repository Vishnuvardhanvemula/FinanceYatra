import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">financeYatra</h1>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-indigo-600 transition">
              Chat Assistant
            </Link>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Hi, {user?.name}
                  {user?.proficiencyLevel && user.proficiencyLevel !== 'unknown' && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      {user.proficiencyLevel}
                    </span>
                  )}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition">
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">financeYatra</h3>
            <p className="text-gray-400 text-sm">
              Learn finance concepts with ease. Your journey to financial literacy starts here.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 financeYatra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master Your Financial Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn essential finance concepts, investment strategies, and money management skills
              to take control of your financial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Basics</h3>
              <p className="text-gray-600">
                Learn the fundamentals of investing, from stocks and bonds to portfolio diversification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Management</h3>
              <p className="text-gray-600">
                Master the art of budgeting and learn how to manage your money effectively.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Planning</h3>
              <p className="text-gray-600">
                Create a comprehensive financial plan for your future goals and retirement.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/chat')}
              className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition shadow-md"
            >
              Start Learning Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
