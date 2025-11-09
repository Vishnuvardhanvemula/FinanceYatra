import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
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
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Home
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Learning Modules
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> AI Chat
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> About Us
              </a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Help Center
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Privacy Policy
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Terms of Service
              </a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="text-teal-400">•</span> Contact
              </a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; 2025 financeYatra. Made with care in India
          </p>
          <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-pulse"></span>
              All Systems Operational
            </span>
            <span>|</span>
            <span>Powered by Ollama & RAG</span>
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
    <div className="bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-full shadow-sm mb-6 border border-teal-100 dark:border-teal-900">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Master Your
            <br />
            <span className="text-gradient">Financial Journey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Learn essential finance concepts, investment strategies, and money management skills
            in <span className="font-semibold text-teal-600 dark:text-teal-400">11+ languages</span> with AI assistance
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={() => navigate(isAuthenticated ? '/modules' : '/signup')}
              className="btn-gradient text-lg"
            >
              {isAuthenticated ? 'Browse Modules' : 'Start Learning Free'}
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="btn-gradient-outline text-lg"
            >
              Try AI Assistant
            </button>
          </div>

          {/* Stats - Clean & Minimal */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">15+</span>
              <span className="text-gray-600 dark:text-gray-400">Modules</span>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">11</span>
              <span className="text-gray-600 dark:text-gray-400">Languages</span>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">3</span>
              <span className="text-gray-600 dark:text-gray-400">Skill Levels</span>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-teal-600 mb-1">20+</span>
              <span className="text-gray-600">Achievements</span>
            </div>
          </div>
        </div>

        {/* Features Grid - Refined & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Feature 1 */}
          <div className="card-elevated p-8 group transition-all duration-300 animate-fadeIn">
            <div className="w-16 h-16 bg-teal-500 dark:bg-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Structured Learning</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              15 comprehensive modules covering everything from banking basics to portfolio management and cryptocurrency.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Beginner to Expert levels
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Interactive quizzes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Progress tracking
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="card-elevated p-8 group transition-all duration-300 animate-fadeIn" style={{animationDelay: '100ms'}}>
            <div className="w-16 h-16 bg-teal-600 dark:bg-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">AI Chat Assistant</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Get personalized answers based on your proficiency level. Powered by Ollama LLM with RAG technology.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> 11+ Indian languages
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Context-aware responses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Voice support (TTS)
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="card-elevated p-8 group transition-all duration-300 animate-fadeIn" style={{animationDelay: '200ms'}}>
            <div className="w-16 h-16 bg-teal-700 dark:bg-teal-800 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Monitor your learning journey with detailed analytics, achievements, and learning streaks.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Personal dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Achievement badges
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-500 dark:text-teal-400">✓</span> Learning streaks
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Section - Elegant & Minimal */}
        <div className="mt-24 text-center">
          <div className="card-glass p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Why Choose financeYatra?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-10">
              Your trusted partner in financial education
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Free Forever</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">11+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Indian Languages</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">AI</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Powered Learning</div>
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
          <Toaster 
            position="top-center"
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
          />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:id" element={<ModuleDetailPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
