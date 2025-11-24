import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from './GlassCard';

const FeatureSection = ({ align = 'left', title, subtitle, icon: Icon, description, color = 'teal' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    const isBlue = color === 'blue';
    const baseColor = isBlue ? 'blue' : 'teal';
    const textColor = isBlue ? 'text-blue-400' : 'text-teal-400';
    const bgColor = isBlue ? 'bg-blue-500' : 'bg-teal-500';
    const bgLight = isBlue ? 'bg-blue-500/20' : 'bg-teal-500/20';

    return (
        <section className={`min-h-[60vh] md:min-h-screen flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'} px-6 md:px-20 relative z-10 pointer-events-none py-20`}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: align === 'right' ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'right' ? 50 : -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto max-w-xl w-full"
            >
                <GlassCard active={isInView}>
                    <div className={`w-14 h-14 rounded-2xl ${bgLight} ${textColor} flex items-center justify-center mb-8 shadow-inner`}>
                        <Icon size={28} />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
                    <h3 className={`text-2xl font-semibold mb-6 ${textColor}`}>{subtitle}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

                    {/* Interactive Mock Data viz */}
                    <div className="mt-8 p-4 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex justify-between items-end h-16 gap-2 mb-2">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={isInView ? { height: `${h}%` } : { height: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                    className={`flex-1 rounded-t-sm ${bgColor} opacity-80`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: '100%' } : { width: 0 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className={`h-full ${bgColor}`}
                                />
                            </div>
                            <div className="text-xs font-mono text-gray-500">ANALYSIS COMPLETE</div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </section>
    );
};

export default FeatureSection;
