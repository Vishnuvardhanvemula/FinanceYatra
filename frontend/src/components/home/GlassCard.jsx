import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", active = false }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`
      relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500
      ${active
                ? "bg-teal-900/20 border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.2)]"
                : "bg-slate-900/40 border-white/10 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-xl"
            }
      ${className}
    `}
    >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>
        {children}
    </motion.div>
);

export default GlassCard;
