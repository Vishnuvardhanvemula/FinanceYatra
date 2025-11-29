import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Umbrella, FileText, ShieldAlert, Wallet, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function MainNavbar() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = React.useState(false);
  const [mobileCalculatorsOpen, setMobileCalculatorsOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

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
    <nav className="fixed w-full top-0 left-0 z-[999]">
      <div className="bg-[#020617]/60 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Logo size={44} asLink={false} />
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {user?.isAdmin ? (
                // Admin View: Only Admin Dashboard
                <Link to="/admin/dashboard" className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 text-xs uppercase tracking-widest font-medium">Admin Panel</Link>
              ) : (
                // User View: Full Navigation
                <>
                  {isAuthenticated && <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.dashboard')}</Link>}
                  <Link to="/chat" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.chat')}</Link>
                  <Link to="/modules" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.modules')}</Link>
                  <Link to="/challenges" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.challenges')}</Link>
                  <Link to="/community" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">Community</Link>
                  <Link to="/shop" className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors tracking-wide flex items-center gap-2">
                    <span>{t('nav.shop')}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  </Link>
                  <div className="relative" onMouseEnter={() => setCalculatorsOpen(true)} onMouseLeave={() => setCalculatorsOpen(false)}>
                    <button
                      ref={buttonRef}
                      onClick={() => navigate('/calculators')}
                      className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide"
                      aria-expanded={calculatorsOpen}
                      aria-haspopup="true"
                    >
                      {t('nav.calculators')}
                      <svg className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>

                    <AnimatePresence>
                      {calculatorsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-64 bg-[#0b101b]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                          style={{ boxShadow: '0 20px 60px -10px rgba(0,0,0,0.8)' }}
                        >
                          <div className="py-2">
                            <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Tools</div>

                            <Link to="/budget-planner" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                                <Wallet size={16} />
                              </div>
                              <span>Budget Planner</span>
                            </Link>

                            <Link to="/market-simulator" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                                <Activity size={16} />
                              </div>
                              <span>Stock Simulator</span>
                            </Link>

                            <Link to="/calculators/emi" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                                <Calculator size={16} />
                              </div>
                              <span>EMI Calculator</span>
                            </Link>

                            <Link to="/calculators/sip" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                                <TrendingUp size={16} />
                              </div>
                              <span>SIP Calculator</span>
                            </Link>

                            <Link to="/calculators/retirement" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300 transition-colors">
                                <Umbrella size={16} />
                              </div>
                              <span>Retirement Planner</span>
                            </Link>

                            <Link to="/calculators/tax" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-colors">
                                <FileText size={16} />
                              </div>
                              <span>Tax Analyzer</span>
                            </Link>

                            <Link to="/calculators/emergency" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors group">
                              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors">
                                <ShieldAlert size={16} />
                              </div>
                              <span>Emergency Fund</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">About</a>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={toggleTheme} className="p-2.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200" title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              <LanguageSwitcher />

              {isAuthenticated ? (
                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden lg:block">
                      <div className="text-sm font-medium text-white leading-none mb-1">{user?.name}</div>
                      {user?.proficiencyLevel && user.proficiencyLevel !== 'unknown' && (
                        <div className={`text-[10px] font-bold uppercase tracking-wider ${user.proficiencyLevel === 'expert' ? 'text-amber-400' : 'text-teal-400'}`}>{user.proficiencyLevel}</div>
                      )}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                      {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : user?.name?.charAt(0)}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-200" title={t('nav.logout')}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 text-xs uppercase tracking-widest font-medium">{t('nav.login')}</Link>
                  <Link to="/signup" className="px-5 py-2 bg-white text-black rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">{t('nav.signup')}</Link>
                </>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}</svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 animate-fadeIn">
              <div className="flex flex-col space-y-2">
                {user?.isAdmin ? (
                  // Admin View: Only Admin Dashboard
                  <Link to="/admin/dashboard" className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">Admin Panel</Link>
                ) : (
                  // User View: Full Navigation
                  <>
                    {isAuthenticated && <Link to="/dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Dashboard</Link>}
                    <Link to="/chat" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Chat</Link>
                    <Link to="/modules" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Modules</Link>
                    <Link to="/challenges" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Challenges</Link>
                    <Link to="/community" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Community</Link>

                    <div className="space-y-1">
                      <button
                        onClick={() => setMobileCalculatorsOpen(!mobileCalculatorsOpen)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span>Calculators</span>
                        <svg className={`w-4 h-4 transition-transform ${mobileCalculatorsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>

                      <AnimatePresence>
                        {mobileCalculatorsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 space-y-1"
                          >
                            <Link to="/budget-planner" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">Budget Planner</Link>
                            <Link to="/market-simulator" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">Stock Simulator</Link>
                            <Link to="/calculators/emi" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">EMI Calculator</Link>
                            <Link to="/calculators/sip" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">SIP Calculator</Link>
                            <Link to="/calculators/retirement" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">Retirement Planner</Link>
                            <Link to="/calculators/tax" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">Tax Analyzer</Link>
                            <Link to="/calculators/emergency" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 rounded-lg">Emergency Fund</Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
                <hr className="my-2 dark:border-gray-600" />
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left">Logout</button>
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
      </div>
    </nav>
  );
}
