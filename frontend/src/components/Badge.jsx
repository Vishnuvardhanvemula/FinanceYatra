import React from 'react';
import bronze from '../assets/badges/bronze-badge.svg';
import silver from '../assets/badges/silver-badge.svg';
import gold from '../assets/badges/gold-badge.svg';
import platinum from '../assets/badges/platinum-badge.svg';

const BADGE_MAP = {
  bronze,
  silver,
  gold,
  platinum,
};

const Badge = ({ tier = 'default', size = 40, className = '', locked = false, alt }) => {
  const key = tier && BADGE_MAP[tier] ? tier : 'bronze';
  const src = BADGE_MAP[key];

  const wrapperStyle = {
    width: size,
    height: size,
    lineHeight: 0,
  };

  return (
    <div style={wrapperStyle} className={`relative inline-block ${className}`} aria-hidden={false}>
      <img
        src={src}
        alt={alt || `${tier} badge`}
        width={size}
        height={size}
        style={{ display: 'block' }}
        className={`${locked ? 'filter grayscale opacity-70' : ''} rounded-full`}
      />

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/40 rounded-full w-full h-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 10V8a6 6 0 1112 0v2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="10" width="12" height="8" rx="2" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Badge;
