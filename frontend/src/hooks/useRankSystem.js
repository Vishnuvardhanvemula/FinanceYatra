import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { XP_VALUES } from '../config/xpConfig';

export const RANKS = {
    NOVICE: { ...XP_VALUES.RANKS.NOVICE, theme: 'default', color: 'text-teal-400', border: 'border-teal-500/30', glow: 'shadow-teal-500/20' },
    APPRENTICE: { ...XP_VALUES.RANKS.APPRENTICE, theme: 'bronze', color: 'text-amber-600', border: 'border-amber-600/30', glow: 'shadow-amber-600/20' },
    EXPERT: { ...XP_VALUES.RANKS.EXPERT, theme: 'silver', color: 'text-slate-300', border: 'border-slate-400/30', glow: 'shadow-slate-400/20' },
    MASTER: { ...XP_VALUES.RANKS.MASTER, theme: 'gold', color: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' },
    LEGENDARY: { ...XP_VALUES.RANKS.LEGENDARY, theme: 'platinum', color: 'text-fuchsia-400', border: 'border-fuchsia-500/30', glow: 'shadow-fuchsia-500/20' }
};

export const useRankSystem = () => {
    const { user } = useAuth();
    const { setTheme, theme } = useTheme();
    const [currentRank, setCurrentRank] = useState(RANKS.NOVICE);

    const xp = user?.xp || 0;

    // Calculate Rank
    const calculatedRank = useMemo(() => {
        if (xp >= RANKS.LEGENDARY.min) return RANKS.LEGENDARY;
        if (xp >= RANKS.MASTER.min) return RANKS.MASTER;
        if (xp >= RANKS.EXPERT.min) return RANKS.EXPERT;
        if (xp >= RANKS.APPRENTICE.min) return RANKS.APPRENTICE;
        return RANKS.NOVICE;
    }, [xp]);

    // Update State
    useEffect(() => {
        setCurrentRank(calculatedRank);
    }, [calculatedRank]);

    // Auto-Theme Switcher
    useEffect(() => {
        if (calculatedRank.theme !== theme) {
            // Only auto-switch if the user hasn't manually overridden it (optional logic, 
            // but for this request "auto-evolve" implies forced evolution or at least auto-set)
            // We'll enforce it for now to ensure the "Prestige" feel.
            setTheme(calculatedRank.theme);
        }
    }, [calculatedRank, theme, setTheme]);

    return {
        rank: currentRank,
        nextRank: getNextRank(currentRank),
        progressToNext: getProgressToNext(xp, currentRank),
        isLegendary: currentRank.label === 'Legendary'
    };
};

// Helpers
const getNextRank = (current) => {
    if (current.label === 'Novice') return RANKS.APPRENTICE;
    if (current.label === 'Apprentice') return RANKS.EXPERT;
    if (current.label === 'Expert') return RANKS.MASTER;
    if (current.label === 'Master') return RANKS.LEGENDARY;
    return null; // Max rank
};

const getProgressToNext = (xp, current) => {
    if (current.label === 'Legendary') return 100;
    const next = getNextRank(current);
    const totalNeeded = next.min - current.min;
    const currentProgress = xp - current.min;
    return Math.min(100, Math.max(0, (currentProgress / totalNeeded) * 100));
};
