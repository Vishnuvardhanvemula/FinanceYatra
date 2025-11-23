import React from 'react';
import { Link } from 'react-router-dom';

export default function MainFooter() {
  return (
    <footer className="bg-[#0b101b] bg-opacity-95 text-white mt-auto relative overflow-hidden footer-separator z-50">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute rounded-full mix-blend-screen filter blur-3xl" style={{background: 'rgba(20,184,166,0.08)', width: '48vw', height: '48vw', top: '-8vw', right: '-10vw'}} />
        <div className="absolute rounded-full mix-blend-screen filter blur-3xl" style={{background: 'rgba(20,184,166,0.06)', width: '40vw', height: '40vw', bottom: '-8vw', left: '-10vw'}} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-500 dark:bg-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">₹</span>
                </div>
                <h3 className="text-2xl font-bold text-white">financeYatra</h3>
              </div>
              <p className="text-gray-300 dark:text-gray-400 text-sm mb-6 leading-relaxed max-w-md">Empowering India with financial literacy. Learn finance in 11+ languages with AI assistance.</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">🐦</a>
                <a href="#" className="w-10 h-10 bg-white/10 dark:bg-white/5 hover:bg-teal-500 dark:hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200">📘</a>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Home</Link></li>
                <li><Link to="/modules" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Learning Modules</Link></li>
                <li><Link to="/challenges" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Challenges</Link></li>
                <li><Link to="/chat" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> AI Chat</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> GitHub Repository</a></li>
                <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra/blob/main/FEATURES.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Features Guide</a></li>
                <li><a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Powered by Ollama</a></li>
                <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra#readme" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">•</span> Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 mb-6">
            <div className="bg-gradient-to-r from-yellow-900/30 via-yellow-800/20 to-yellow-900/30 border border-yellow-600/40 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0"><div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center"><span className="text-yellow-400 text-xl">⚠️</span></div></div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-yellow-400">Educational Content Notice</h4>
                  <p className="text-sm text-gray-300 dark:text-gray-400 leading-relaxed mt-2">Information provided is for learning purposes. Always verify current rates, fees, and regulations with official sources.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 dark:border-white/5 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 dark:text-gray-500">&copy; 2025 financeYatra. Making Money Management Simple for Everyone</p>
              <p className="text-xs text-gray-500 dark:text-gray-600 italic">Financial Wisdom — Powered by Intelligence</p>
            </div>
            <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-pulse"></span>11 Languages</span>
              <span>|</span>
              <span>100% Free & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
