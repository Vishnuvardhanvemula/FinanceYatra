import React from 'react';
import { motion } from 'framer-motion';

const SplineChart = ({ data, height = 150, color = "#14b8a6" }) => {
    if (!data || data.length < 2) return null;

    // Normalize data
    const maxVal = Math.max(...data.map(d => d.value));
    const minVal = 0;
    const range = maxVal - minVal || 1;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((d.value - minVal) / range) * 80; // Leave some headroom
        return { x, y };
    });

    // Generate SVG Path (Simple Catmull-Rom or similar smoothing could be used, 
    // but for simplicity and "tech" look, straight lines with slight curves or just a polyline is often fine. 
    // Let's do a simple cubic bezier smoothing for "Spline" look)

    const controlPoint = (current, previous, next, reverse) => {
        const p = previous || current;
        const n = next || current;
        const smoothing = 0.2;
        const o = {
            x: p.x + (n.x - p.x) * smoothing,
            y: p.y + (n.y - p.y) * smoothing,
        };
        return o;
    };

    const svgPath = (points, command) => {
        // Build the d attributes by looping over the points
        const d = points.reduce((acc, point, i, a) => {
            if (i === 0) return `M ${point.x},${point.y}`;

            const cps = controlPoint(a[i - 1], a[i - 2], point);
            const cpe = controlPoint(point, a[i - 1], a[i + 1], true);

            // Simple cubic bezier for now, or just L for straight lines if smoothing is too complex for this snippet
            // For a true "Spline" look without a library, a simple quadratic curve is easier
            return `${acc} C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${point.x},${point.y}`;
        }, '');
        return d;
    };

    // Simplified path generation for reliability without external libs
    const generateSmoothPath = (points) => {
        let path = `M ${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const start = points[i - 1];
            const end = points[i];
            const midX = (start.x + end.x) / 2;
            path += ` C ${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`;
        }
        return path;
    };

    const pathD = generateSmoothPath(points);
    const fillPathD = `${pathD} L 100,100 L 0,100 Z`;

    return (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-900/20">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Fill Area */}
                <motion.path
                    d={fillPathD}
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Stroke Line */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="1.5"
                        fill="#fff"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + (i * 0.1) }}
                    />
                ))}
            </svg>

            {/* Tooltip Overlay (simplified) */}
            <div className="absolute inset-0 flex items-end justify-between px-2 pb-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {data.map((d, i) => (
                    <div key={i} className="text-[10px] text-slate-400 font-mono flex flex-col items-center gap-1">
                        <div className="bg-slate-800 text-white px-1 rounded -mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{d.value}</div>
                        <span>{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SplineChart;
