import React from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import logoSrc from '../assets/logo-source.png';

export default function MainNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, left: 0, width: 192 });

  React.useEffect(() => {
    if (!calculatorsOpen) return;
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // position dropdown so its right edge aligns with button right
    setDropdownPos({ top: rect.bottom + window.scrollY + 8, left: rect.right - 192 + window.scrollX, width: 192 });

    const handleKey = (e) => {
      if (e.key === 'Escape') setCalculatorsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [calculatorsOpen]);

  React.useEffect(() => {
    if (!calculatorsOpen) return;
    const onDocMouseDown = (e) => {
      const btn = buttonRef.current;
      const dd = document.getElementById('calculators-dropdown-portal');
      if (btn && (btn.contains(e.target) || (dd && dd.contains(e.target)))) return;
      setCalculatorsOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [calculatorsOpen]);

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
    <nav className="fixed w-full top-0 left-0 z-[100]">
      <div className="navbar-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Logo size={44} src={logoSrc} />
            </div>
          </Link>

          <div className="hidden md:flex space-x-2 items-center">
            <Link to="/" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Home</Link>
            {isAuthenticated && <Link to="/dashboard" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Dashboard</Link>}
            <Link to="/chat" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Chat</Link>
            <Link to="/modules" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Learn</Link>
            <Link to="/challenges" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Challenges</Link>
            <div className="relative" onMouseEnter={() => setCalculatorsOpen(true)}>
              <button
                ref={buttonRef}
                onClick={() => navigate('/calculators')}
                className="px-3 py-1 flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium"
                aria-expanded={calculatorsOpen}
                aria-haspopup="true"
              >
                Calculators
                <svg className={`w-4 h-4 transition-transform ${calculatorsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              {calculatorsOpen && buttonRef.current && createPortal(
                <div id="calculators-dropdown-portal" style={{ position: 'absolute', top: dropdownPos.top + 'px', left: dropdownPos.left + 'px', width: dropdownPos.width + 'px' }}>
                  <div className="bg-[#0b101b] backdrop-blur-md rounded-lg shadow-2xl z-[10000] py-2" style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.6)' }}>
                    <Link to="/calculators/emi" className="block px-4 py-2 text-sm text-gray-100 hover:bg-white/10">EMI Calculator</Link>
                    <Link to="/sip" className="block px-4 py-2 text-sm text-gray-100 hover:bg-white/10">SIP Calculator</Link>
                    <Link to="/calculators/retirement" className="block px-4 py-2 text-sm text-gray-100 hover:bg-white/10">Retirement Calculator</Link>
                    <Link to="/calculators/emergency" className="block px-4 py-2 text-sm text-gray-100 hover:bg-white/10">Emergency Fund</Link>
                    <Link to="/calculators/tax" className="block px-4 py-2 text-sm text-gray-100 hover:bg-white/10">Income Tax Calculator</Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            <a href="#about" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">About</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200" title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/6 rounded-xl">
                  <span className="text-sm font-medium text-white">Hello, {user?.name}</span>
                  {user?.proficiencyLevel && user.proficiencyLevel !== 'unknown' && (
                    <span className={`text-xs px-3 py-1 rounded-full text-white ${getProficiencyColor(user.proficiencyLevel)} shadow-sm font-semibold capitalize`}>{user.proficiencyLevel}</span>
                  )}
                </div>
                <button onClick={handleLogout} className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 font-medium">Sign In</Link>
                <Link to="/signup" className="btn-gradient text-sm shadow-lg shadow-teal-500/20">Get Started</Link>
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
              <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Home</Link>
              {isAuthenticated && <Link to="/dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Dashboard</Link>}
              <Link to="/chat" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Chat</Link>
              <Link to="/modules" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Modules</Link>
              <Link to="/challenges" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Challenges</Link>
              <Link to="/calculators" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Calculators</Link>
              <Link to="/sip" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">SIP</Link>
              <Link to="/retirement" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Retirement</Link>
              <Link to="/calculators/emergency" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg">Emergency Fund</Link>
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
