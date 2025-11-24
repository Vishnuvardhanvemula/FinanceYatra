import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Sparkles, MessageSquare, Lightbulb, Target } from 'lucide-react';

const AiTutorFeature = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
    const [activeScenario, setActiveScenario] = useState(0);

    const scenarios = [
        { icon: Target, title: "Investment Strategy", desc: "Learn portfolio allocation" },
        { icon: Lightbulb, title: "Tax Planning", desc: "Optimize your returns" },
        { icon: MessageSquare, title: "Risk Assessment", desc: "Understand your profile" }
    ];

    return (
        <section className="min-h-[60vh] md:min-h-screen flex items-center justify-start px-6 md:px-20 relative z-10 py-20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl w-full"
            >
                {/* Main Card with AI Chat Interface */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-900/30 via-slate-900/40 to-indigo-900/30 border border-blue-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Animated Neural Network Background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full">
                            {[...Array(6)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx={`${20 + i * 15}%`}
                                    cy={`${30 + (i % 2) * 40}%`}
                                    r="2"
                                    fill="#60A5FA"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Floating Orbs */}
                    <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10">
                        {/* Icon Badge with Sparkle */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 mb-6 shadow-lg relative"
                        >
                            <Brain size={32} className="text-blue-400" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1"
                            >
                                {/* <Sparkles size={16} className="text-yellow-400" /> */}
                            </motion.div>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            AI Tutor
                        </h2>
                        <h3 className="text-2xl font-semibold mb-6 text-blue-400">
                            Learn by Simulation
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Don't just read about finance—experience it. Our AI Tutor creates risk-free scenarios tailored to the Indian economy, helping you master concepts before spending a rupee.
                        </p>

                        {/* Interactive Scenario Selector */}
                        <div className="space-y-3 mb-6">
                            {scenarios.map((scenario, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    onClick={() => setActiveScenario(i)}
                                    className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all ${activeScenario === i
                                            ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20'
                                            : 'bg-black/20 border-blue-500/20 hover:border-blue-400/40'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeScenario === i ? 'bg-blue-500/30' : 'bg-blue-500/10'
                                            }`}>
                                            <scenario.icon size={20} className="text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-white">{scenario.title}</div>
                                            <div className="text-xs text-gray-400">{scenario.desc}</div>
                                        </div>
                                        {activeScenario === i && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 rounded-full bg-blue-400"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* AI Chat Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.9 }}
                            className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                    <Brain size={16} className="text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-blue-400 mb-1 font-semibold">AI Tutor</div>
                                    <div className="text-sm text-gray-300">
                                        Let's simulate a market downturn. How would you rebalance your portfolio?
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-all">
                                    Increase bonds
                                </div>
                                <div className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-all">
                                    Hold position
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AiTutorFeature;
