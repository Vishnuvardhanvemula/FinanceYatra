import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle } from 'lucide-react';

const SecurityFeature = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    const securityFeatures = [
        { icon: Lock, label: "End-to-End Encryption", status: "Active" },
        { icon: Eye, label: "Privacy First Design", status: "Verified" },
        { icon: CheckCircle2, label: "Sandbox Environment", status: "Isolated" },
        { icon: Shield, label: "Bank-Grade Security", status: "Protected" }
    ];

    return (
        <section className="min-h-[60vh] md:min-h-screen flex items-center justify-end px-6 md:px-20 relative z-10 py-20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl w-full"
            >
                {/* Main Card with Security Shield */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-900/30 via-slate-900/40 to-green-900/30 border border-emerald-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Animated Shield Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <pattern id="shield-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M10 0 L10 5 L5 10 L10 15 L10 20 L15 15 L20 10 L15 5 L10 0 Z" fill="currentColor" className="text-emerald-500" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#shield-pattern)" />
                        </svg>
                    </div>

                    {/* Pulsing Security Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                            transition={{ duration: 3, delay: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                        />
                    </div>

                    <div className="relative z-10">
                        {/* Animated Shield Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 mb-6 shadow-lg relative"
                        >
                            <Shield size={32} className="text-emerald-400" />
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-md"
                            />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Security First
                        </h2>
                        <h3 className="text-2xl font-semibold mb-6 text-emerald-400">
                            Bank-Grade Encryption
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            We don't ask for your bank passwords. We operate in a sandbox environment, ensuring your learning journey is safe, private, and completely risk-free.
                        </p>

                        {/* Security Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {securityFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                                    className="p-4 rounded-xl bg-black/30 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all group relative overflow-hidden"
                                >
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                    <div className="relative flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <feature.icon size={20} className="text-emerald-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-white mb-1">{feature.label}</div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <div className="text-xs text-emerald-400">{feature.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Security Status Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 1 }}
                            className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <CheckCircle2 size={24} className="text-emerald-400" />
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full bg-emerald-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-white">All Systems Secure</div>
                                    <div className="text-xs text-gray-400">Your data is protected with military-grade encryption</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <Lock size={14} className="text-emerald-500" />
                                <span>256-bit SSL</span>
                            </div>
                            <div className="w-px h-4 bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-emerald-500" />
                                <span>ISO 27001</span>
                            </div>
                            <div className="w-px h-4 bg-gray-700" />
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>GDPR Compliant</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default SecurityFeature;
