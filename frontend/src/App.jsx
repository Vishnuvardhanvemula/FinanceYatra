import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import MainNavbar from './components/MainNavbar';
import MainFooter from './components/MainFooter';
import PageTransition from './components/PageTransition'; // Import PageTransition
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
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
import ShopPage from './pages/ShopPage';
import EMICalculatorPage from './pages/EMICalculatorPage';
import Calculators from './pages/Calculators';
import SIPCalculator from './pages/SIPCalculator';
import RetirementCalculator from './pages/RetirementCalculator';
import TaxCalculator from './pages/TaxCalculator';
import EmergencyFund from './pages/EmergencyFund';
import NotFoundPage from './pages/NotFoundPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import MarketPage from './pages/MarketPage';
import CommunityPage from './pages/CommunityPage';
import ForumThreadDetail from './pages/ForumThreadDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ModuleEditorPage from './pages/admin/ModuleEditorPage';
import ChatWidget from './components/chat/ChatWidget';

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing ring - "fluid" feel
  // Lower stiffness = more lag/drag. Higher damping = less bounce.
  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      // Check for pointer cursor or interactive elements
      const isInteractive =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a');

      setIsPointer(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Dot - Instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          width: isPointer ? 8 : 8,
          height: isPointer ? 8 : 8,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Trailing Ring - Laggy follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference border border-white rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 80 : 24,
          height: isPointer ? 80 : 24,
          opacity: isPointer ? 1 : 0.6,
          backgroundColor: isPointer ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
          scale: isClicking ? 0.9 : 1,
          borderWidth: isPointer ? '1px' : '2px',
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8
        }}
      />
    </>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat';

  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <MainNavbar />
      {/* Add top padding equal to navbar height so content doesn't sit under the fixed navbar */}
      <main className="flex-1 pt-20">{children}</main>
      {showFooter && <MainFooter />}
    </div>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage2 /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/modules" element={<PageTransition><ModulesPage /></PageTransition>} />
          <Route path="/modules/:id" element={<PageTransition><ErrorBoundary><ModuleDetailPage /></ErrorBoundary></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
          <Route path="/achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
          <Route path="/share/achievement/:achievementId" element={<PageTransition><ShareAchievementPage /></PageTransition>} />
          <Route path="/daily-quiz" element={<PageTransition><DailyQuizPage /></PageTransition>} />
          <Route path="/weekly-challenges" element={<PageTransition><WeeklyChallengesPage /></PageTransition>} />
          <Route path="/leaderboard" element={<PageTransition><LeaderboardPage /></PageTransition>} />
          <Route path="/challenges" element={<PageTransition><ChallengesPage /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
          <Route path="/budget-planner" element={<PageTransition><BudgetPlannerPage /></PageTransition>} />
          {/* Stock Market Simulator Route */}
          <Route path="/market-simulator" element={<PageTransition><MarketPage /></PageTransition>} />
          <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
          <Route path="/community/post/:id" element={<PageTransition><ForumThreadDetail /></PageTransition>} />
        </Route>

        {/* Public Calculator Routes */}
        <Route path="/calculators" element={<PageTransition><Calculators /></PageTransition>} />
        <Route path="/calculators/emi" element={<PageTransition><EMICalculatorPage /></PageTransition>} />
        <Route path="/calculators/emergency" element={<PageTransition><EmergencyFund /></PageTransition>} />
        <Route path="/calculators/retirement" element={<PageTransition><RetirementCalculator /></PageTransition>} />
        <Route path="/calculators/sip" element={<PageTransition><SIPCalculator /></PageTransition>} />
        <Route path="/calculators/tax" element={<PageTransition><TaxCalculator /></PageTransition>} />
        <Route path="/sip" element={<PageTransition><SIPCalculator /></PageTransition>} />
        <Route path="/emi" element={<PageTransition><EMICalculatorPage /></PageTransition>} />
        <Route path="/retirement" element={<PageTransition><RetirementCalculator /></PageTransition>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<PageTransition><AdminDashboardPage /></PageTransition>} />
          <Route path="modules/new" element={<PageTransition><ModuleEditorPage /></PageTransition>} />
          <Route path="modules/edit/:id" element={<PageTransition><ModuleEditorPage /></PageTransition>} />
        </Route>

        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

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
            <AnimatedRoutes />
            <ChatWidget />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
