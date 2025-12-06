import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import Logo from './Logo';

export default function MainFooter() {
  return (
    <footer className="bg-[#020617] text-white mt-auto relative overflow-hidden border-t border-white/[0.05] z-50">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', width: '50vw', height: '50vw', top: '-20%', right: '-10%' }} />
        <div className="absolute rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', width: '40vw', height: '40vw', bottom: '-10%', left: '-10%' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Logo size={42} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md font-light">
                Empowering the next generation of investors with institutional-grade tools, interactive simulations, and a supportive community.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/Vishnuvardhanvemula/FinanceYatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-700 hover:border-sky-600 hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6">Platform</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
                  <li><Link to="/modules" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Modules</Link></li>
                  <li><Link to="/challenges" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Challenges</Link></li>
                  <li><Link to="/chat" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">AI Assistant</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6">Resources</h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="https://github.com/Vishnuvardhanvemula/FinanceYatra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block flex items-center gap-2"
                    >
                      <Github size={14} /> GitHub Repo
                    </a>
                  </li>
                  <li><a href="#" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Documentation</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">API Status</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Notice */}
          <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500/50 rounded-r-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="text-amber-500 text-lg animate-pulse">⚠️</span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wide">Educational Notice</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                  All market data and simulations are for educational purposes only. Past performance does not guarantee future results. Invest responsibly.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.05] mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} <span className="text-slate-300">FinanceYatra</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500 font-medium uppercase tracking-wider">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Systems Normal
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
