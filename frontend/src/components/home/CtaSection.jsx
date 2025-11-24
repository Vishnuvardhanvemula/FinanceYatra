import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CtaSection = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
            <div className="max-w-4xl relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter drop-shadow-2xl">
                        Your Wealth Journey <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Starts Today.</span>
                    </h2>
                    <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join 50,000+ students learning to manage their finances with our AI-driven platform.
                        <br />
                        {!isAuthenticated && (
                            <span className="text-teal-500/80 text-sm font-mono mt-2 block">NO CREDIT CARD REQUIRED</span>
                        )}
                    </p>

                    {isAuthenticated ? (
                        <Link to="/dashboard">
                            <button className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_60px_rgba(20,184,166,0.4)] hover:shadow-[0_0_80px_rgba(20,184,166,0.6)] active:scale-95">
                                Go to Dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_60px_rgba(20,184,166,0.4)] hover:shadow-[0_0_80px_rgba(20,184,166,0.6)] active:scale-95">
                                Create Free Account
                            </button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default CtaSection;
