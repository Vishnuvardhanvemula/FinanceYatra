import React, { useEffect, useRef, useState } from 'react';

function formatINR(n) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch (e) {
    return `₹${Math.round(n)}`;
  }
}

export default function DonutChart({ principal = 0, interest = 0, size = 220, stroke = 18, animate = true }) {
  const total = Number(principal) + Number(interest);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const principalPct = total > 0 ? (principal / total) : 0;
  const interestPct = total > 0 ? (interest / total) : 0;

  const principalLen = circumference * principalPct;
  const interestLen = circumference * interestPct;

  const [animated, setAnimated] = useState(!animate);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(t);
    }
  }, [principal, interest, animate]);

  const centerX = size / 2;
  const centerY = size / 2;

  // We'll draw two segments: principal (emerald) followed by interest (orange)
  // Principal will start at 12 o'clock (-90deg), interest follows right after.
  // To draw multiple segments using stroke-dasharray, we set dasharray for principal and interest on the same circle but with strokeDashoffset.

  // For principal segment, offset such that it starts at top and covers principalLen.
  const principalOffset = circumference * 0; // draw principal first from top
  // interest starts after principal, so offset by principalLen
  const interestOffset = -principalLen; // negative because svg stroke offset goes backward

  const dashArrayAll = `${principalLen} ${circumference - principalLen}`;
  const interestDashArray = `${interestLen} ${circumference - interestLen}`;

  const styleTransition = animated ? 'stroke-dashoffset 1100ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none';

  const principalPctDisp = Math.round(principalPct * 10000) / 100; // 2 decimals
  const interestPctDisp = Math.round(interestPct * 10000) / 100;

  return (
    <div className="donut-wrap" style={{ width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Principal ${principalPctDisp}% and Interest ${interestPctDisp}%, Total payable ${formatINR(total)}`}>
        <defs>
          <linearGradient id="gPrincipal" x1="0%" x2="100%">
            <stop offset="0%" stopColor="var(--fy-gradient-start,#10b981)" />
            <stop offset="100%" stopColor="var(--fy-gradient-mid,#14b8a6)" />
          </linearGradient>
          <linearGradient id="gInterest" x1="0%" x2="100%">
            <stop offset="0%" stopColor="var(--fy-accent,#f97316)" />
            <stop offset="100%" stopColor="var(--fy-accent,#fb923c)" />
          </linearGradient>
        </defs>

        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* background ring */}
          <circle r={radius} cx="0" cy="0" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />

          {/* principal segment */}
          {principalLen > 0 && (
          <circle
            r={radius}
            cx="0"
            cy="0"
            fill="none"
            stroke="url(#gPrincipal)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${principalLen} ${circumference - principalLen}`}
            strokeDashoffset={animated ? 0 : principalLen}
            style={{ transition: styleTransition, transform: 'rotate(-90deg)' }}
          />)}

          {/* interest segment */}
          {interestLen > 0 && (
          <circle
            r={radius}
            cx="0"
            cy="0"
            fill="none"
            stroke="url(#gInterest)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${interestLen} ${circumference - interestLen}`}
            strokeDashoffset={animated ? -principalLen : circumference}
            style={{ transition: styleTransition, transform: 'rotate(-90deg)' }}
          />)}

          {/* center label */}
          <foreignObject x={-radius} y={-radius} width={radius * 2} height={radius * 2} className="pointer-events-none">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ color: 'var(--fy-theme-text, white)', fontSize: 14 }}>
                <div style={{ fontSize: 12, opacity: 0.85 }}>Total Payable</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{formatINR(total)}</div>
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>
      <div className="mt-3 text-sm text-gray-300 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2"><span style={{ width: 10, height: 10, background: 'linear-gradient(90deg,var(--fy-gradient-start,#10b981),var(--fy-gradient-mid,#14b8a6))', borderRadius: 6 }} /> <span>Principal</span></div>
        <div className="flex items-center gap-2"><span style={{ width: 10, height: 10, background: 'linear-gradient(90deg,var(--fy-accent,#f97316),var(--fy-accent,#fb923c))', borderRadius: 6 }} /> <span>Interest</span></div>
      </div>
    </div>
  );
}
