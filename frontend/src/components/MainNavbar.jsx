import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Umbrella, FileText, ShieldAlert, Wallet, Activity, Home, LayoutDashboard, Layers, Trophy, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function MainNavbar() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
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
                <Link to="/admin/dashboard" className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 text-xs uppercase tracking-widest font-medium">Admin Panel</Link>
              ) : (
                <>
                  <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.home')}</Link>
                  {isAuthenticated && <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.dashboard')}</Link>}
                  <Link to="/modules" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.modules')}</Link>
                  <Link to="/challenges" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.challenges')}</Link>
                  <Link to="/community" className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide">{t('nav.community')}</Link>
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
                </>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
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

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 relative z-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />)}</svg>
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-20 left-0 w-full bg-[#0b101b]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl h-[calc(100vh-5rem)] overflow-y-auto"
              >
                <div className="flex flex-col space-y-2 p-6 pb-20">
                  <motion.div
                    className="flex flex-col space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {user?.isAdmin ? (
                      <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl font-medium border border-red-500/20 transition-all"
                        >
                          <ShieldAlert size={18} />
                          Admin Panel
                        </Link>
                      </motion.div>
                    ) : (
                      <>
                        {[
                          { to: "/", label: t('nav.home'), icon: <Home size={18} /> },
                          isAuthenticated && { to: "/dashboard", label: t('nav.dashboard'), icon: <LayoutDashboard size={18} /> },
                          { to: "/modules", label: t('nav.modules'), icon: <Layers size={18} /> },
                          { to: "/challenges", label: t('nav.challenges'), icon: <Trophy size={18} /> },
                          { to: "/community", label: t('nav.community'), icon: <Users size={18} /> },
                        ].filter(Boolean).map((item, idx) => (
                          <motion.div key={idx} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                            <Link
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors border border-transparent hover:border-white/5"
                            >
                              <div className="text-teal-400 opacity-80">{item.icon}</div>
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}

                        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                          <Link
                            to="/shop"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl font-medium transition-colors border border-amber-500/10"
                          >
                            <ShoppingBag size={18} />
                            {t('nav.shop')} <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse ml-auto"></span>
                          </Link>
                        </motion.div>

                        <div className="space-y-1 pt-2 mt-2 border-t border-white/10">
                          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Calculators</motion.div>
                          {[
                            { to: "/budget-planner", label: "Budget Planner", color: "text-teal-400", icon: <Wallet size={16} /> },
                            { to: "/market-simulator", label: "Stock Simulator", color: "text-blue-400", icon: <Activity size={16} /> },
                            { to: "/calculators/emi", label: "EMI Calculator", color: "text-blue-400", icon: <Calculator size={16} /> },
                            { to: "/calculators/sip", label: "SIP Calculator", color: "text-emerald-400", icon: <TrendingUp size={16} /> },
                            { to: "/calculators/retirement", label: "Retirement Planner", color: "text-violet-400", icon: <Umbrella size={16} /> },
                            { to: "/calculators/tax", label: "Tax Analyzer", color: "text-orange-400", icon: <FileText size={16} /> },
                            { to: "/calculators/emergency", label: "Emergency Fund", color: "text-red-400", icon: <ShieldAlert size={16} /> },
                          ].map((item, idx) => (
                            <motion.div key={idx} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                              <Link to={item.to} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:${item.color} hover:bg-white/5 rounded-xl transition-colors`}>
                                <div className={`opacity-60 ${item.color}`}>{item.icon}</div>
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    <hr className="my-2 border-white/10" />

                    {isAuthenticated ? (
                      <motion.button
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3.5 text-red-400 hover:bg-red-500/10 rounded-xl text-left font-medium w-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                      </motion.button>
                    ) : (
                      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-3 pt-2">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-center text-slate-300 hover:bg-white/5 rounded-xl font-medium border border-white/10">Sign In</Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-center bg-teal-500 text-white rounded-xl font-bold shadow-lg shadow-teal-500/20">Get Started</Link>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
