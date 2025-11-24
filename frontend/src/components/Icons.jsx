// Placeholder icon components for the Finance Tutor UI
// All icons share a similar size prop and simple SVG shapes.
// Feel free to replace with custom designs later.

export function IconSparkles({ className = 'w-5 h-5', title = 'Sparkles' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>{title}</title>
      <path d="M12 3L13.5 7.5L18 9L13.5 10.5L12 15L10.5 10.5L6 9L10.5 7.5L12 3Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 4L19.5 5.5L21 6L19.5 6.5L19 8L18.5 6.5L17 6L18.5 5.5L19 4Z" fill="currentColor" />
      <path d="M19 16L19.5 17.5L21 18L19.5 18.5L19 20L18.5 18.5L17 18L18.5 17.5L19 16Z" fill="currentColor" />
      <path d="M5 16L5.5 17.5L7 18L5.5 18.5L5 20L4.5 18.5L3 18L4.5 17.5L5 16Z" fill="currentColor" />
    </svg>
  );
}

export function IconBrain({ className = 'w-5 h-5', title = 'Brain' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>{title}</title>
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0c1.527 0 2.5 1.5 2.5 3.5 0 1.126-.5 2.5-1 3.5 1 .5 2 1.5 2 3.5 0 2-1 3.5-2.5 3.5-.5 1.5-1.5 3-3 4-.5.5-1.5 1.5-2.5 1.5s-2-.5-2.5-1c-1.5-1.5-2.5-3-3-4.5C3 15.5 2 14 2 12c0-2 1-3 2-3.5-.5-1-1-2.374-1-3.5C3 3.5 3.973 2 5.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconChecklist({ className = 'w-5 h-5', title = 'Checklist' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>{title}</title>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCurlyBraces({ className = 'w-5 h-5', title = 'Curly Braces' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>{title}</title>
      <path d="M9 4C7.5 4 7 4.5 7 6v3c0 1.5-.5 2-2 2 1.5 0 2 .5 2 2v3c0 1.5.5 2 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 4c1.5 0 2 .5 2 2v3c0 1.5.5 2 2 2-1.5 0-2 .5-2 2v3c0 1.5-.5 2-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Simple placeholder icons for the rest of the UI
export function IconCurrency({ className = 'w-5 h-5', title = 'Currency' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <title>{title}</title>
      <text x="12" y="16" textAnchor="middle" fontSize="14" fontFamily="Arial" fill="currentColor">$</text>
    </svg>
  );
}

export function IconBook({ className = 'w-5 h-5', title = 'Book' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M4 4h16v16H4z" strokeWidth="2" />
    </svg>
  );
}

export function IconTrophy({ className = 'w-5 h-5', title = 'Trophy' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M8 4h8v4H8z" strokeWidth="2" />
      <path d="M6 8h12v12H6z" strokeWidth="2" />
    </svg>
  );
}

export function IconCrown({ className = 'w-5 h-5', title = 'Crown' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M4 12l4-4 4 4 4-4 4 4v8H4z" />
    </svg>
  );
}

export function IconCheck({ className = 'w-5 h-5', title = 'Check' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClock({ className = 'w-5 h-5', title = 'Clock' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFlame({ className = 'w-5 h-5', title = 'Flame' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M12 2c-3 5-5 9-5 13a5 5 0 0010 0c0-4-2-8-5-13z" />
    </svg>
  );
}

export function IconStar({ className = 'w-5 h-5', title = 'Star' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
  );
}

export function IconTarget({ className = 'w-5 h-5', title = 'Target' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconZap({ className = 'w-5 h-5', title = 'Zap' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRocket({ className = 'w-5 h-5', title = 'Rocket' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M2 12l10 2 2 10-4-4-8-8z" strokeWidth="2" />
    </svg>
  );
}

export function IconChart({ className = 'w-5 h-5', title = 'Chart' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M4 20V4h16" strokeWidth="2" />
      <path d="M8 16h4" strokeWidth="2" />
      <path d="M8 12h8" strokeWidth="2" />
      <path d="M8 8h12" strokeWidth="2" />
    </svg>
  );
}

export function IconVideo({ className = 'w-5 h-5', title = 'Video' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
      <polygon points="10,9 16,12 10,15" fill="currentColor" />
    </svg>
  );
}

export function IconShield({ className = 'w-5 h-5', title = 'Shield' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M12 2l8 4v6c0 5-3 9-8 11-5-2-8-6-8-11V6l8-4z" strokeWidth="2" />
    </svg>
  );
}

export function IconBracket({ className = 'w-5 h-5', title = 'Bracket' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <path d="M6 4h2v16H6" strokeWidth="2" />
      <path d="M18 4h-2v16h2" strokeWidth="2" />
    </svg>
  );
}

export function IconDollarSquare({ className = 'w-5 h-5', title = 'Dollar Square' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <title>{title}</title>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
      <path d="M12 8v8M9 10h6M9 14h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Export all icons for easy import elsewhere
export const Icons = {
  IconSparkles,
  IconBrain,
  IconChecklist,
  IconCurlyBraces,
  IconCurrency,
  IconBook,
  IconTrophy,
  IconCrown,
  IconCheck,
  IconClock,
  IconFlame,
  IconStar,
  IconTarget,
  IconZap,
  IconRocket,
  IconChart,
  IconVideo,
  IconShield,
  IconBracket,
  IconDollarSquare,
};
