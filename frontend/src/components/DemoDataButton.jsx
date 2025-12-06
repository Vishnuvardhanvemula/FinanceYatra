import React from 'react';
import { Zap } from 'lucide-react';

export default function DemoDataButton({ onFill, className = '' }) {
    return (
        <button
            onClick={onFill}
            className={`
        relative group flex items-center gap-2 px-4 py-2 
        bg-amber-500/10 hover:bg-amber-500/20 
        border border-amber-500/30 hover:border-amber-500/50 
        text-amber-400 font-medium text-sm rounded-lg 
        transition-all duration-300
        ${className}
      `}
        >
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Load Demo Data</span>

            {/* Ping animation to draw attention */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
        </button>
    );
}
