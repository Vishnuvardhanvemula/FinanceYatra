import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LayoutDashboard, TrendingUp, PieChart, Activity, Sparkles } from 'lucide-react';

const DashboardFeature = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    const stats = [
        { icon: TrendingUp, label: "Portfolio", value: "₹1.2M", change: "+12.5%" },
        { icon: PieChart, label: "Allocation", value: "8 Assets", change: "Balanced" },
        { icon: Activity, label: "Performance", value: "18.2%", change: "YTD" }
    ];

    return (
        <section className="min-h-[60vh] md:min-h-screen flex items-center justify-end px-6 md:px-20 relative z-10 py-20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl w-full"
            >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-teal-900/30 via-slate-900/40 to-emerald-900/30 border border-teal-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Subtle Background Glow */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        {/* Icon Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 mb-6 shadow-lg relative"
                        >
                            <LayoutDashboard size={28} className="text-teal-400" />
                            {/* <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-400" /> */}
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                            The Dashboard
                        </h2>l
                        <h3 className="text-xl font-semibold mb-4 text-teal-400">
                            Financial Command Center
                        </h3>
                        <p className="text-gray-300 text-base leading-relaxed mb-8">
                            Forget cluttered spreadsheets. Our AI-driven dashboard unifies your learning progress, simulated portfolio, and personalized roadmap into one sleek interface.
                        </p>

                        {/* Compact Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {stats.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="p-3 rounded-xl bg-black/30 border border-teal-500/20 backdrop-blur-sm hover:border-teal-400/40 hover:bg-black/40 transition-all group"
                                >
                                    <item.icon size={18} className="text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">{item.label}</div>
                                    <div className="text-lg font-bold text-white">{item.value}</div>
                                    <div className="text-[10px] text-teal-400 font-medium">{item.change}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Elegant Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8 }}
                            className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-white">Learning Progress</span>
                                <span className="text-sm font-bold text-teal-400">75%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "75%" } : { width: 0 }}
                                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                                />
                            </div>
                            <div className="text-xs text-gray-400 mt-2">18 of 24 modules completed</div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default DashboardFeature;
