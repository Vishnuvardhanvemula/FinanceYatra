import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
    <section className="min-h-[60vh] md:min-h-screen flex flex-col justify-center px-6 md:px-20 relative z-10 pt-20">
        <div className="max-w-[800px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/30 border border-teal-500/30 text-teal-300 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-teal-900/20">
                    <span className="text-teal-300" aria-hidden>✨</span>
                    AI-Powered Financial Literacy
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tight drop-shadow-2xl">
                    Master Money <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-400 to-emerald-400 animate-gradient-x pb-2">
                        Without Fear.
                    </span>
                </h1>

                <p className="text-xl text-gray-300 mb-4 max-w-xl font-light leading-relaxed drop-shadow-md">
                    Your personal AI tutor that simulates real-world economies. Learn to invest, save, and grow wealth in a risk-free sandbox.
                </p>
                <p className="text-teal-300 text-base sm:text-lg font-medium mb-6 max-w-xl">
                    Empowering your journey from saving to wealth creation.
                </p>

                <div className="flex flex-col gap-6">
                    <Link to="/signup" className="inline-block">
                        <button className="w-full sm:w-auto group relative px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(20,184,166,0.7)] active:scale-95">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">Start Learning Free <ArrowRight size={20} /></span>
                        </button>
                    </Link>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                            <span>No Credit Card Required</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span>50,000+ Students</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                            <span>100% Risk-Free</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 cursor-pointer hover:text-white/60 transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <ChevronDown size={24} />
        </motion.div>
    </section>
);

export default HeroSection;
