import React, { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = "", onClick, variant = "default" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (divRef.current) divRef.current.style.setProperty('--opacity', '1');
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (divRef.current) divRef.current.style.setProperty('--opacity', '0');
    };

    const handleMouseEnter = () => {
        if (divRef.current) divRef.current.style.setProperty('--opacity', '1');
    };

    const handleMouseLeave = () => {
        if (divRef.current) divRef.current.style.setProperty('--opacity', '0');
    };

    // Variant Styles
    const getBorderColor = () => {
        if (variant === "legendary") return "border-fuchsia-500/30 shadow-[0_0_15px_rgba(232,121,249,0.15)]";
        if (variant === "master") return "border-amber-500/20";
        return "border-white/10";
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative overflow-hidden rounded-3xl border bg-white/[0.02] transition-all duration-300 ${getBorderColor()} ${className}`}
            style={{
                '--mouse-x': '0px',
                '--mouse-y': '0px',
                '--opacity': '0'
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity: 'var(--opacity)',
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${variant === 'legendary' ? 'rgba(232,121,249,0.15)' : 'rgba(255,255,255,0.1)'}, transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

export default SpotlightCard;
