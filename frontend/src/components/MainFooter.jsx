import React from 'react';
import { Link } from 'react-router-dom';

export default function MainFooter() {
  return (
    <footer className="bg-[#020617] text-white mt-auto relative overflow-hidden border-t border-white/[0.05] z-50">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', width: '50vw', height: '50vw', top: '-20%', right: '-10%' }} />
        <div className="absolute rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', width: '40vw', height: '40vw', bottom: '-10%', left: '-10%' }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center">
                  <span className="text-amber-400 text-xl font-serif italic font-bold">f</span>
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-white">finance<span className="text-gray-400">Yatra</span></h3>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-md font-light">
                Empowering the next generation of investors with institutional-grade tools and education.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
            <div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Platform</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/modules" className="text-gray-400 hover:text-white transition-colors">Modules</Link></li>
                  <li><Link to="/challenges" className="text-gray-400 hover:text-white transition-colors">Challenges</Link></li>
                  <li><Link to="/chat" className="text-gray-400 hover:text-white transition-colors">AI Assistant</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Resources</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="https://github.com/Vishnuvardhanvemula/FinanceYatra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Status</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 mb-6">
              <div className="bg-amber-900/10 border border-amber-500/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-amber-500 text-lg">⚠️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-amber-500 uppercase tracking-wide">Educational Notice</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-1">
                      Simulations are for educational purposes only. Past performance does not guarantee future results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.05] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2025 financeYatra. All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-xs text-gray-500 uppercase tracking-widest">
                <span>Privacy</span>
                <span>Terms</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Systems Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
