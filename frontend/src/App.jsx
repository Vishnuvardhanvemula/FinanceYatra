import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import MainNavbar from './components/MainNavbar';
import MainFooter from './components/MainFooter';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DashboardPage from './pages/DashboardPage';
import AchievementsPage from './pages/AchievementsPage';
import ShareAchievementPage from './pages/ShareAchievementPage';
import DailyQuizPage from './pages/DailyQuizPage';
import WeeklyChallengesPage from './pages/WeeklyChallengesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengesPage from './pages/ChallengesPage';
import EMICalculatorPage from './pages/EMICalculatorPage';
import Calculators from './pages/Calculators';
import SIPCalculator from './pages/SIPCalculator';
import RetirementCalculator from './pages/RetirementCalculator';
import TaxCalculator from './pages/TaxCalculator';
import EmergencyFund from './pages/EmergencyFund';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat';

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      {/* Add top padding equal to navbar height so content doesn't sit under the fixed navbar */}
      <main className="flex-1 pt-20">{children}</main>
      {showFooter && <MainFooter />}
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
              // Use CSS variables set by ThemeContext for light/dark compatibility
              style: { background: 'var(--fy-toast-bg, #1f2937)', color: 'var(--fy-text, #fff)', borderRadius: '12px', padding: '16px' },
              success: { iconTheme: { primary: 'var(--fy-gradient-start, #14b8a6)', secondary: 'var(--fy-text, #fff)' } },
              error: { iconTheme: { primary: '#ef4444', secondary: 'var(--fy-text, #fff)' } },
            }}
            containerStyle={{ top: 80, right: 20 }}
          />

          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:id" element={<ErrorBoundary><ModuleDetailPage /></ErrorBoundary>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/share/achievement/:achievementId" element={<ShareAchievementPage />} />
              <Route path="/daily-quiz" element={<DailyQuizPage />} />
              <Route path="/weekly-challenges" element={<WeeklyChallengesPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/calculators/emi" element={<ProtectedRoute><EMICalculatorPage /></ProtectedRoute>} />
              <Route path="/calculators" element={<ProtectedRoute><Calculators /></ProtectedRoute>} />
              <Route path="/calculators/emergency" element={<ProtectedRoute><EmergencyFund /></ProtectedRoute>} />
              <Route path="/calculators/retirement" element={<ProtectedRoute><RetirementCalculator /></ProtectedRoute>} />
              <Route path="/calculators/sip" element={<ProtectedRoute><SIPCalculator /></ProtectedRoute>} />
              <Route path="/calculators/tax" element={<ProtectedRoute><TaxCalculator /></ProtectedRoute>} />
              <Route path="/sip" element={<SIPCalculator />} />
              <Route path="/emi" element={<EMICalculatorPage />} />
              <Route path="/retirement" element={<RetirementCalculator />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
