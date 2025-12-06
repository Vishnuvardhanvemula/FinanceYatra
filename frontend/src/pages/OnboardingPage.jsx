/**
 * Onboarding Page
 * Initial setup after user registration
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { ChevronRight, Sparkles, Brain, Target, Globe } from 'lucide-react';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const handleStart = () => {
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans text-white">
      <ParticleBackground />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-12 bg-indigo-500' : 'w-4 bg-slate-800'
                }`}
            />
          ))}
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />

          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-indigo-500/40">
                  <Sparkles className="w-10 h-10 text-indigo-400" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Welcome, {user.name}
                </h1>
                <p className="text-xl text-indigo-300 font-medium mb-4">
                  Initiating Financial Protocol...
                </p>
                <p className="text-slate-400 leading-relaxed mb-10 max-w-lg mx-auto">
                  You are about to enter a simulated economy designed to master wealth creation. No risk. All reward.
                </p>

                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-white text-slate-950 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20 flex items-center gap-2 mx-auto"
                >
                  Initialize System <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">System Capabilities</h2>
                  <p className="text-slate-400">Powered by advanced AI and Real-time data.</p>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Universal Language</h3>
                      <p className="text-sm text-slate-400">Speak or Type in 11+ Indian languages. The AI understands you.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Adaptive Intelligence</h3>
                      <p className="text-sm text-slate-400">The system detects your proficiency level automatically.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Mission Roadmap</h3>
                      <p className="text-sm text-slate-400">Complete tactical modules to unlock new ranks and badges.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-8 ring-4 ring-green-500/10 animate-pulse">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-white">
                  System Online
                </h2>
                <p className="text-slate-400 mb-10 max-w-md mx-auto">
                  Your profile has been created. Your financial journey begins now.
                </p>

                <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 mb-10 text-left">
                  <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    Next Objective:
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Navigate to the <strong>Modules</strong> section and complete "Banking Basics" to earn your first badge.
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-xl flex items-center justify-center gap-2"
                >
                  Launch Dashboard <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < 3 && (
          <div className="text-center mt-8">
            <button
              onClick={handleStart}
              className="text-slate-500 text-sm hover:text-white transition-colors uppercase tracking-widest font-semibold"
            >
              Skip Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
