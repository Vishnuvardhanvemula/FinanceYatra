import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Lock, ArrowRight, Mail, AlertCircle, TrendingUp, Globe } from 'lucide-react';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate a slight delay for the "premium" feel of processing
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = await login(formData.email, formData.password);

      if (result.success) {
        if (result.user.isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-white flex overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Left Panel - Form Section */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-20 relative z-10">

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3"
        >
          <img src={logo} alt="FinYatra Logo" className="w-12 h-12 rounded-xl shadow-lg shadow-indigo-500/20" />
          <span className="text-xl font-bold tracking-tight text-white">FinYatra</span>
        </motion.div>

        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-10 h-[120px] flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                {isAdminMode ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                    Command Center
                  </span>
                ) : (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Welcome Back
                  </span>
                )}
              </h1>
              <p className="text-slate-400 text-lg">
                {isAdminMode
                  ? 'Secure access for system administrators.'
                  : 'Master Your Financial Future.'}
              </p>
            </div>

            {/* Admin Toggle Switch */}
            <div className="mb-8 flex items-center gap-3">
              <span className={`text-sm font-medium transition-colors ${!isAdminMode ? 'text-white' : 'text-slate-500'}`}>User</span>
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 ${isAdminMode ? 'bg-red-500/20 shadow-inner shadow-red-900/50 justify-end' : 'bg-slate-800 shadow-inner justify-start'}`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className={`w-6 h-6 rounded-full shadow-md ${isAdminMode ? 'bg-red-500' : 'bg-indigo-500'}`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAdminMode ? 'text-white' : 'text-slate-500'}`}>Admin</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-200 text-sm overflow-hidden"
                  >
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                <div className="relative group">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                      ? 'top-[-10px] text-xs bg-[#030712] px-1 text-indigo-400'
                      : 'top-3.5 text-slate-500'
                      }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all hover:border-slate-700"
                  />
                  <Mail className={`absolute right-4 top-3.5 transition-colors duration-200 ${focusedField === 'email' ? 'text-indigo-400' : 'text-slate-600'}`} size={20} />
                </div>

                <div className="relative group">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'password' || formData.password
                      ? 'top-[-10px] text-xs bg-[#030712] px-1 text-indigo-400'
                      : 'top-3.5 text-slate-500'
                      }`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all hover:border-slate-700"
                  />
                  <Lock className={`absolute right-4 top-3.5 transition-colors duration-200 ${focusedField === 'password' ? 'text-indigo-400' : 'text-slate-600'}`} size={20} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/50 transition-colors" />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                </label>
                {!isAdminMode && (
                  <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] ${isAdminMode
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-red-900/20'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/20'
                  }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isAdminMode ? 'Authenticate' : 'Sign In'}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className={`mt-8 text-center transition-opacity duration-300 ${isAdminMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <p className="text-slate-500">
                New to FinYatra?{' '}
                <Link
                  to="/signup"
                  className="text-white font-bold hover:text-indigo-400 transition-colors"
                  tabIndex={isAdminMode ? -1 : 0}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-slate-600 uppercase tracking-wider font-medium">
          <span>© 2024 FinYatra</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Section */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] bg-slate-900 relative overflow-hidden items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[#0B0F19]">
          <div className={`absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${isAdminMode ? 'from-red-900/40 via-slate-900 to-slate-900' : 'from-indigo-900/40 via-slate-900 to-slate-900'}`}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        {/* Animated 3D-like Elements */}
        <div className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center">
          {/* Central Glowing Orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-96 h-96 rounded-full blur-[120px] ${isAdminMode ? 'bg-red-600/20' : 'bg-indigo-600/20'}`}
          />

          {/* Rotating Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.02, 1]
              }}
              transition={{
                rotate: { duration: 25 + i * 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className={`absolute border rounded-full ${i === 1 ? 'w-[500px] h-[500px] border-dashed border-slate-700/20' :
                i === 2 ? 'w-[700px] h-[700px] border-dotted border-slate-700/10' :
                  'w-[900px] h-[900px] border-solid border-slate-700/5'
                }`}
            />
          ))}

          {/* Floating Cards / Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-[20%] right-[10%] p-5 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-56 transform rotate-6 hover:rotate-0 transition-transform duration-500"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-2.5 rounded-xl ${isAdminMode ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Growth</div>
                <div className="text-lg font-bold text-white">+24.5%</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                className={`h-full ${isAdminMode ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-[25%] left-[10%] p-5 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-56 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${isAdminMode ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                <Globe size={24} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Markets</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  Active
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAdminMode ? 'bg-red-400' : 'bg-indigo-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAdminMode ? 'bg-red-500' : 'bg-indigo-500'}`}></span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter leading-tight drop-shadow-2xl">
              Future of
              <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isAdminMode ? 'from-red-400 via-orange-400 to-red-400' : 'from-indigo-400 via-cyan-400 to-indigo-400'} animate-gradient-x`}>
                Finance
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
