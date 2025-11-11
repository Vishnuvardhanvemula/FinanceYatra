/**
 * Profile Banner Component
 * Modern, aesthetic banner with glass morphism and animations
 * Shows tier badges, stats, and achievement highlights
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Badge from './Badge';

const BANNER_THEMES = {
  default: {
    gradient: 'from-teal-500 via-teal-600 to-teal-700',
    pattern: 'opacity-10',
    accentColor: 'bg-teal-500',
    textColor: 'text-teal-700',
    ringColor: 'ring-teal-300',
  },
  bronze: {
    gradient: 'from-orange-700 via-amber-500 to-yellow-600',
    pattern: 'opacity-15',
    accentColor: 'bg-orange-500',
    textColor: 'text-orange-600',
    ringColor: 'ring-orange-400',
  },
  silver: {
    gradient: 'from-gray-600 via-slate-400 to-gray-600',
    pattern: 'opacity-15',
    accentColor: 'bg-gray-500',
    textColor: 'text-gray-600',
    ringColor: 'ring-gray-400',
  },
  gold: {
    gradient: 'from-yellow-600 via-amber-400 to-orange-500',
    pattern: 'opacity-20',
    accentColor: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    ringColor: 'ring-yellow-400',
  },
  platinum: {
    gradient: 'from-purple-600 via-fuchsia-500 to-pink-600',
    pattern: 'opacity-20',
    accentColor: 'bg-purple-500',
    textColor: 'text-purple-600',
    ringColor: 'ring-purple-400',
  },
  master: {
    gradient: 'from-indigo-900 via-purple-800 to-pink-900',
    pattern: 'opacity-25',
    accentColor: 'bg-indigo-600',
    textColor: 'text-indigo-600',
    ringColor: 'ring-indigo-400',
  },
};

const ProfileBanner = ({ 
  user, 
  achievements = [], 
  theme = 'default',
  showCustomization = false,
  onThemeChange 
}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme();
  
  const bannerTheme = BANNER_THEMES[selectedTheme] || BANNER_THEMES.default;
  
  // Handler for theme selector toggle
  const handleToggleThemeSelector = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('🎨 Theme Selector Button Clicked!');
    console.log('Current state:', showThemeSelector);
    setShowThemeSelector(prev => {
      console.log('Setting to:', !prev);
      return !prev;
    });
  };
  
  // Calculate tier based on achievements
  const getTierFromAchievements = () => {
    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    if (unlockedCount >= 25) return 'master';
    if (unlockedCount >= 20) return 'platinum';
    if (unlockedCount >= 15) return 'gold';
    if (unlockedCount >= 10) return 'silver';
    if (unlockedCount >= 5) return 'bronze';
    return 'default';
  };

  const userTier = getTierFromAchievements();
  
  // Get tier icon
  const getTierIcon = (tier) => {
    // Return a small Badge component for the tier so UI shows consistent SVGs
    const normalized = tier === 'default' ? 'bronze' : tier; // fallback mapping
    return <Badge tier={normalized} size={20} className="inline-block mr-2 align-middle" />;
  };
  
  // Achievement category icon & color map
  const ACHIEVEMENT_ICON_MAP = {
    welcome: {
      bg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    learning: {
      bg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      )
    },
    module: {
      bg: 'bg-gradient-to-br from-purple-600 to-pink-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      )
    },
    milestone: {
      bg: 'bg-gradient-to-br from-yellow-500 to-amber-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
      )
    },
    points: {
      bg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        </svg>
      )
    },
    streak: {
      bg: 'bg-gradient-to-br from-orange-500 to-red-500',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" />
        </svg>
      )
    },
    default: {
      bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
      svg: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      )
    }
  };

  // Heuristic to detect category from achievement title or explicit type
  const detectAchievementCategory = (achievement) => {
    const title = (achievement?.title || '').toLowerCase();
    const type = (achievement?.type || '').toLowerCase();
    if (type) {
      if (ACHIEVEMENT_ICON_MAP[type]) return type;
    }
    if (/welcome|onboard|getting started|started/.test(title)) return 'welcome';
    if (/learn|learning|lesson|study|module|course/.test(title)) return 'learning';
    if (/module|master|module master|module-complete/.test(title)) return 'module';
    if (/milestone|milestone|achievement|elite|unlock/.test(title)) return 'milestone';
    if (/point|points|score|earned/.test(title)) return 'points';
    if (/streak|day streak|consecutive/.test(title)) return 'streak';
    return 'default';
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    // update global theme (applies class to document and persists locally/server)
    try {
      setGlobalTheme(newTheme, { user });
    } catch (e) {
      // safe fallback
    }
    setShowThemeSelector(false);
    onThemeChange?.(newTheme);
  };

  // keep local selectedTheme in sync with global theme (for other parts of app)
  useEffect(() => {
    if (globalTheme && globalTheme !== selectedTheme) {
      setSelectedTheme(globalTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalTheme]);

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.isUnlocked).length;
  const completionPercentage = totalAchievements > 0 ? Math.round((unlockedAchievements / totalAchievements) * 100) : 0;

  // Debug: log theme gallery state when opened to help diagnose "empty" cases
  useEffect(() => {
    if (showThemeSelector) {
      try {
        // eslint-disable-next-line no-console
        console.debug('Theme gallery opened — available themes:', Object.keys(BANNER_THEMES), 'unlocked:', unlockedAchievements);
      } catch (e) {}
    }
  }, [showThemeSelector, unlockedAchievements]);

  // Framer Motion variants for recent achievements: subtle pop-in, stagger, and hover lift
  const achContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const achItemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 480, damping: 28 }
    },
    hover: { y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 350, damping: 20 } }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Modern Glass Morphism Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative h-64 overflow-hidden`}
        style={{
            background: `linear-gradient(135deg, var(--fy-gradient-start, #14b8a6), var(--fy-gradient-mid, #0d9488), var(--fy-gradient-end, #0f766e))`
        }}
      >
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="w-full h-full opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Achievement Icons - Smaller and More Elegant */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {achievements.slice(0, 8).map((achievement, index) => (
            achievement.isUnlocked && (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.15,
                  scale: 1,
                  y: [0, -15, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  delay: index * 0.1,
                  y: {
                    duration: 4 + (index % 3),
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }
                }}
                className="absolute text-white text-2xl filter drop-shadow-lg"
                style={{
                  left: `${10 + (index * 11)}%`,
                  top: `${15 + (index % 3) * 25}%`,
                }}
              >
                {achievement.icon}
              </motion.div>
            )
          ))}
        </div>

        {/* Top Bar - Theme Selector & Quick Info */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
          {/* Tier Badge removed here to avoid duplicate display with avatar badge (kept on avatar) */}

          {/* Theme Customization Button */}
          {showCustomization && (
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleToggleThemeSelector}
              className="relative bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-2xl transition-all duration-250 border border-white/20 shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer z-50"
              type="button"
            >
              <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C10.346 3 9 4.346 9 6C9 7.654 10.346 9 12 9C13.654 9 15 7.654 15 6C15 4.346 13.654 3 12 3Z" fill="currentColor" opacity="0.9"/>
                <path d="M5 12C3.346 12 2 13.346 2 15C2 16.654 3.346 18 5 18C6.654 18 8 16.654 8 15C8 13.346 6.654 12 5 12Z" fill="currentColor" opacity="0.9"/>
                <path d="M19 12C17.346 12 16 13.346 16 15C16 16.654 17.346 18 19 18C20.654 18 22 16.654 22 15C22 13.346 20.654 12 19 12Z" fill="currentColor" opacity="0.9"/>
                <path d="M12 15C9 15 7 18 7 21H17C17 18 15 15 12 15Z" fill="currentColor" opacity="0.9"/>
              </svg>
              <span className="text-sm font-semibold hidden sm:inline">{showThemeSelector ? 'Close' : 'Customize'}</span>
            </motion.button>
          )}
        </div>
      </motion.div>

        {/* Theme Selector Dropdown - Grand Luxury Modal */}
      {showThemeSelector && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-teal-900/20 to-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300" style={{ zIndex: 9999 }} onClick={() => setShowThemeSelector(false)}>
          <div
            className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-[2rem] shadow-[0_0_80px_rgba(20,184,166,0.28)] p-8 w-[92vw] max-w-4xl border-2 border-teal-200/30 dark:border-teal-500/30 max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(20,184,166,0.35), 0 0 0 1px rgba(20,184,166,0.08), inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)'
            }}
          >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139, 92, 246) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            {/* Animated Glow Orbs (teal brand tones) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/12 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Content Container */}
            <div className="relative z-10">
                {/* Luxury Header with Crown (branded teal) */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-teal-300/40 dark:border-teal-500/40">
                  <div className="flex items-center gap-4">
                      <div className="relative">
                      <div className="absolute inset-0 bg-teal-400/25 rounded-2xl blur-xl animate-pulse"></div>
                      <div className="relative bg-teal-600 dark:bg-teal-500 p-3 rounded-2xl shadow-2xl">
                        {/* Crown SVG to replace emoji */}
                        <svg className="w-6 h-6 text-white drop-shadow-2xl" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M5 20h14v-2H5v2zm14-9.5L16 7l-3 4-3-4L5 10.5V6l4 2.5L12 6l3 2.5L19 6v4.5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-3xl text-teal-700 dark:text-teal-300 flex items-center gap-2 tracking-tight">
                         Theme Gallery
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">
                        Unlock exclusive premium themes by completing achievements
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowThemeSelector(false)}
                    className="group relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/30 dark:hover:to-red-800/30 text-gray-700 dark:text-gray-300 p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    <svg className="w-6 h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Theme Grid (branded) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[45vh] overflow-y-auto pr-3 custom-scrollbar mb-5">
                  {Object.keys(BANNER_THEMES).map((themeKey, index) => {
                    // Get tier requirements
                    const tierRequirements = {
                      default: 0,
                      bronze: 5,
                      silver: 10,
                      gold: 15,
                      platinum: 20,
                      master: 25
                    };
                    
                    // Check if theme is locked based on achievement count
                    const requiredAchievements = tierRequirements[themeKey] || 0;
                    const isLocked = unlockedAchievements < requiredAchievements;
                    const isActive = selectedTheme === themeKey;
                    
                    return (
                      <motion.button
                        key={themeKey}
                        // prevent initial hidden state (avoids empty-looking gallery on slow devices / heavy loads)
                        initial={false}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.02, type: "spring", stiffness: 200 }}
                        onClick={() => !isLocked && handleThemeChange(themeKey)}
                        disabled={isLocked}
                        whileHover={!isLocked ? { scale: 1.08, y: -8, rotateY: 5 } : { scale: 1.02 }}
                        whileTap={!isLocked ? { scale: 0.95 } : {}}
                        data-theme-key={themeKey}
                        className={`
                          relative p-5 rounded-3xl transition-all duration-500 group overflow-hidden
                          ${isActive 
                            ? `ring-4 ${BANNER_THEMES[themeKey].ringColor} shadow-[0_20px_60px_rgba(20,184,166,0.28)]` 
                            : 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]'}
                          ${isLocked 
                            ? 'cursor-not-allowed opacity-70' 
                            : 'cursor-pointer hover:-translate-y-1'}
                          bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
                          border-2 ${isActive ? 'border-teal-400' : 'border-gray-200 dark:border-gray-600'}
                        `}
                        style={{
                          transform: isActive ? 'translateY(-4px)' : '',
                          boxShadow: isActive ? '0 20px 60px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)' : ''
                        }}
                      >
                        {/* Luxury Theme Preview Card */}
                        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden mb-4 shadow-2xl ring-2 ring-gray-200/50 dark:ring-gray-600/50 ${isLocked ? 'grayscale blur-[2px]' : 'group-hover:ring-purple-400/50'} transition-all duration-500`}>
                          {/* Gradient Background */}
                          <div className={`w-full h-full bg-gradient-to-br ${BANNER_THEMES[themeKey].gradient} relative`}>
                            {/* Luxury Shimmer Effect */}
                            {!isLocked && (
                              <>
                                <motion.div
                                  animate={{
                                    x: ['-100%', '200%'],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: [0.4, 0, 0.2, 1],
                                  }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                                  style={{ width: '50%' }}
                                />
                                {/* Sparkle Effect (SVG) */}
                                <motion.div
                                  animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.8, 1.2, 0.8],
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                  }}
                                  className="absolute top-1/4 right-1/4 w-8 h-8"
                                >
                                  <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M12 2l1.9 4.3L18 8l-4 1.2L12 14l-2-4.8L6 8l4.1-1.7L12 2z" />
                                  </svg>
                                </motion.div>
                              </>
                            )}
                            
                            {/* Pattern Overlay */}
                            <div className={`absolute inset-0 ${BANNER_THEMES[themeKey].pattern}`}>
                              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <pattern id={`pattern-${themeKey}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="10" cy="10" r="1" fill="white" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill={`url(#pattern-${themeKey})`} />
                              </svg>
                            </div>

                            {/* Premium Lock Overlay */}
                            {isLocked && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md">
                                <motion.div
                                  animate={{
                                    scale: [1, 1.15, 1],
                                    rotate: [0, -5, 5, 0],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="relative"
                                >
                                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl"></div>
                                  {/* Lock SVG */}
                                  <div className="relative text-white drop-shadow-2xl">
                                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                      <path d="M6 10v6a2 2 0 002 2h8a2 2 0 002-2v-6" strokeLinecap="round" strokeLinejoin="round" />
                                      <rect x="8" y="10" width="8" height="6" rx="1" />
                                      <path d="M9 10V8a3 3 0 016 0v2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="mt-3 text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm"
                                >
                                  {tierRequirements[themeKey]} Achievements Required
                                </motion.div>
                              </div>
                            )}

                            {/* Premium Active Badge */}
                            {isActive && !isLocked && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-3 right-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2.5 shadow-2xl ring-4 ring-white/50 dark:ring-gray-800/50"
                              >
                                <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Luxury Theme Info */}
                        <div className="text-center space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <div className={`font-black text-base capitalize tracking-wide ${isActive ? 'bg-gradient-to-r ' + BANNER_THEMES[themeKey].textColor + ' bg-clip-text text-transparent' : 'text-gray-800 dark:text-gray-200'}`}>
                              {themeKey === 'default' ? (
                                <span className="inline-flex items-center">
                                  {/* small sparkle SVG */}
                                  <svg className="w-4 h-4 mr-2 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M12 2l1.9 4.3L18 8l-4 1.2L12 14l-2-4.8L6 8l4.1-1.7L12 2z" />
                                  </svg>
                                  <span>Default</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center">
                                  {getTierIcon(themeKey)}
                                  <span className="align-middle">{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</span>
                                </span>
                              )}
                            </div>
                            {!isLocked && themeKey !== 'default' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-300/30">
                                Premium
                              </span>
                            )}
                          </div>
                          
                          {isLocked ? (
                            <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5 font-medium">
                              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 2l2.4 5.1L20 8l-4 3 1 5.9L12 14.8 7 16.9 8 11 4 8l5.6-0.9L12 2z" />
                              </svg>
                              <span>Unlock with {tierRequirements[themeKey] || 0} achievements</span>
                            </div>
                          ) : isActive ? (
                            <motion.div
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              className={`text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-1.5`}
                            >
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>Currently Active</span>
                            </motion.div>
                          ) : (
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              Click to activate theme
                            </div>
                          )}
                        </div>

                        {/* Luxury Hover Glow Effect */}
                        {!isLocked && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${BANNER_THEMES[themeKey].gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl`}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Luxury Footer Info with Progress - Fixed at Bottom */}
                <div className="space-y-4 pt-4 border-t-2 border-purple-300/30 dark:border-purple-500/30">
                  {/* Elite Progress Card */}
                  <div className="relative p-5 bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-blue-100/90 dark:from-purple-950/90 dark:via-pink-950/90 dark:to-blue-950/90 rounded-2xl border-2 border-purple-300/60 dark:border-purple-400/40 shadow-2xl overflow-hidden backdrop-blur-sm">
                    {/* Decorative Orb */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                            <span className="relative text-2xl drop-shadow-lg">🎯</span>
                          </div>
                          <span className="font-black text-base bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-sm">
                            Achievement Progress
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-br from-white/80 to-purple-100/80 dark:from-gray-900/80 dark:to-purple-900/80 backdrop-blur-md rounded-full border-2 border-purple-400/60 dark:border-purple-400/50 shadow-lg">
                          <span className="text-base font-black bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                            {unlockedAchievements} / {totalAchievements}
                          </span>
                        </div>
                      </div>
                      
                      {/* Luxury Progress Bar */}
                      <div className="relative h-4 bg-white/70 dark:bg-gray-900/70 rounded-full overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] border-2 border-purple-300/60 dark:border-purple-400/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${completionPercentage}%` }}
                          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                        >
                          <motion.div
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                          {/* Glowing edge */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                        </motion.div>
                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mix-blend-difference">
                            {completionPercentage}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Next Milestone */}
                      {unlockedAchievements < 25 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3.5 flex justify-center"
                        >
                          {unlockedAchievements < 5 ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/70 dark:to-orange-900/70 rounded-full border-2 border-amber-400 dark:border-amber-500 shadow-lg">
                              <Badge tier="bronze" size={28} locked={true} />
                              <span className="text-xs font-bold text-amber-900 dark:text-amber-100">Just <strong className="text-amber-700 dark:text-amber-200">{5 - unlockedAchievements} more</strong> to unlock Bronze</span>
                            </span>
                          ) : unlockedAchievements < 10 ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-800/70 dark:to-slate-800/70 rounded-full border-2 border-gray-400 dark:border-gray-500 shadow-lg">
                              <Badge tier="silver" size={28} locked={true} />
                              <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Just <strong className="text-gray-700 dark:text-gray-200">{10 - unlockedAchievements} more</strong> to unlock Silver</span>
                            </span>
                          ) : unlockedAchievements < 15 ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-200 to-amber-200 dark:from-yellow-900/70 dark:to-amber-900/70 rounded-full border-2 border-yellow-400 dark:border-yellow-500 shadow-lg">
                              <Badge tier="gold" size={28} locked={true} />
                              <span className="text-xs font-bold text-yellow-900 dark:text-yellow-100">Just <strong className="text-yellow-700 dark:text-yellow-200">{15 - unlockedAchievements} more</strong> to unlock Gold</span>
                            </span>
                          ) : unlockedAchievements < 20 ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-900/70 dark:to-blue-900/70 rounded-full border-2 border-cyan-400 dark:border-cyan-500 shadow-lg">
                              <Badge tier="platinum" size={28} locked={true} />
                              <span className="text-xs font-bold text-cyan-900 dark:text-cyan-100">Just <strong className="text-cyan-700 dark:text-cyan-200">{20 - unlockedAchievements} more</strong> to unlock Platinum</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/70 dark:to-pink-900/70 rounded-full border-2 border-purple-400 dark:border-purple-500 shadow-lg">
                              {/* show crown for master */}
                              <svg className="w-7 h-7 text-purple-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M5 20h14v-2H5v2zm14-9.5L16 7l-3 4-3-4L5 10.5V6l4 2.5L12 6l3 2.5L19 6v4.5z" />
                              </svg>
                              <span className="text-xs font-bold text-purple-900 dark:text-purple-100">Just <strong className="text-purple-700 dark:text-purple-200">{25 - unlockedAchievements} more</strong> to unlock Master</span>
                            </span>
                          )}
                        </motion.div>
                      )}
                      {unlockedAchievements >= 25 && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="mt-3 text-sm text-center font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M5 9l1.5 3L10 13l-3 2 1 3-3-2-3 2 1-3L1 13l3-1.5L5 9z" />
                          </svg>
                          <span>Elite Status Achieved! All Themes Unlocked!</span>
                          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M5 20h14v-2H5v2zm14-9.5L16 7l-3 4-3-4L5 10.5V6l4 2.5L12 6l3 2.5L19 6v4.5z" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Elite Tier Requirements Card */}
                  <div className="relative p-5 bg-gradient-to-br from-indigo-100/90 via-purple-100/90 to-pink-100/90 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90 rounded-2xl border-2 border-indigo-300/60 dark:border-indigo-400/40 shadow-2xl overflow-hidden backdrop-blur-sm">
                    {/* Decorative Background */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-60"></div>
                            <div className="relative text-3xl p-2 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 rounded-xl shadow-lg">
                              {/* Gem SVG */}
                              <svg className="w-6 h-6 text-indigo-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 2L3 8l9 14 9-14-9-6z" />
                              </svg>
                            </div>
                          </div>
                        <div>
                          <div className="font-black text-base bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
                            Tier Unlock Milestones
                          </div>
                          <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                            Complete achievements to unlock premium themes
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { tier: 'Bronze', required: 5, gradient: 'from-amber-500 to-orange-500', borderColor: 'border-amber-400' },
                          { tier: 'Silver', required: 10, gradient: 'from-gray-400 to-slate-500', borderColor: 'border-gray-400' },
                          { tier: 'Gold', required: 15, gradient: 'from-yellow-400 to-amber-500', borderColor: 'border-yellow-400' },
                          { tier: 'Platinum', required: 20, gradient: 'from-cyan-400 to-blue-500', borderColor: 'border-cyan-400' },
                          { tier: 'Master', required: 25, gradient: 'from-purple-500 to-pink-500', borderColor: 'border-purple-400' },
                        ].map(({ tier, required, gradient, borderColor }) => {
                          const isUnlocked = unlockedAchievements >= required;
                          const isCurrent = !isUnlocked && (
                            (tier === 'Bronze' && unlockedAchievements < 5) ||
                            (tier === 'Silver' && unlockedAchievements >= 5 && unlockedAchievements < 10) ||
                            (tier === 'Gold' && unlockedAchievements >= 10 && unlockedAchievements < 15) ||
                            (tier === 'Platinum' && unlockedAchievements >= 15 && unlockedAchievements < 20) ||
                            (tier === 'Master' && unlockedAchievements >= 20 && unlockedAchievements < 25)
                          );
                          
                          return (
                            <motion.div
                              key={tier}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tier === 'Bronze' ? 0 : tier === 'Silver' ? 0.1 : tier === 'Gold' ? 0.2 : tier === 'Platinum' ? 0.3 : 0.4 }}
                              className={`
                                relative p-3 rounded-2xl text-center transition-all duration-300
                                ${isUnlocked 
                                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 border-2 border-green-500 dark:border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                                  : isCurrent 
                                    ? `bg-gradient-to-br ${gradient} text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] border-2 ${borderColor} scale-105 ring-4 ring-white/30 dark:ring-black/30` 
                                    : 'bg-white/40 dark:bg-gray-800/40 border-2 border-gray-300/50 dark:border-gray-600/50 opacity-50'}
                              `}
                            >
                              <div className={`text-3xl mb-1 font-bold ${isCurrent ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-bounce' : ''}`}>
                                {isUnlocked ? (
                                  <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  // show the corresponding small badge for locked/preview state
                                  <Badge tier={tier.toLowerCase() === 'master' ? 'platinum' : tier.toLowerCase()} size={36} locked={!isUnlocked} />
                                )}
                              </div>
                              <div className={`text-xs font-bold mb-0.5 ${isUnlocked ? 'text-green-700 dark:text-green-300' : isCurrent ? 'text-white drop-shadow-lg' : 'text-gray-600 dark:text-gray-400'}`}>
                                {tier}
                              </div>
                              <div className={`text-[10px] font-semibold ${isUnlocked ? 'text-green-600 dark:text-green-400' : isCurrent ? 'text-white/95 drop-shadow' : 'text-gray-500 dark:text-gray-500'}`}>
                                {isUnlocked ? '✓ Unlocked' : `${required} needed`}
                              </div>
                              
                              {isCurrent && (
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_12px_rgba(253,224,71,0.8)] border-2 border-white"
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Summary Row - condensed stats under banner */}
      <div className="max-w-7xl mx-auto -mt-8 mb-6 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-gradient-to-br from-purple-700 to-purple-600 text-white rounded-2xl px-4 py-2 shadow-lg flex items-center gap-3">
            <div className="text-sm font-bold opacity-90">Achievements</div>
            <div className="text-lg font-black">{unlockedAchievements}/{totalAchievements}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white rounded-2xl px-4 py-2 shadow-lg flex items-center gap-3">
            <div className="text-sm font-bold opacity-90">Points</div>
            <div className="text-lg font-black">{(user?.totalPoints || 0).toLocaleString()}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl px-4 py-2 shadow-lg flex items-center gap-3">
            <div className="text-sm font-bold opacity-90">Streak</div>
            <div className="text-lg font-black">{user?.currentStreak || 0}d</div>
          </div>
        </div>
      </div>

      {/* Profile Info Section - Modern Card Style */}
      <div className="relative -mt-20 px-6 pb-6">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar with Ring Progress */}
            <div className="relative flex-shrink-0">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative"
              >
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-36 h-36 -rotate-90 pointer-events-none" style={{ zIndex: 0 }}>
                  <circle
                    cx="72"
                    cy="72"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 68}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - completionPercentage / 100) }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className={bannerTheme.textColor}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 m-2 shadow-xl flex items-center justify-center text-5xl font-bold overflow-visible relative"
                >
                  {user?.name?.[0]?.toUpperCase() || (
                    <span className="text-4xl">👤</span>
                  )}
                </motion.div>

                {/* Move badges out of the avatar element and render them as siblings later in the DOM
                    This avoids stacking context issues caused by transforms/overflow and guarantees
                    badges appear above the avatar and the progress ring. */}
              </motion.div>

              {/* Badges container (rendered after avatar to ensure it sits on top) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Tier Badge on Avatar (moved here) */}
                {userTier !== 'default' && (
                  <div className="absolute -bottom-1 -right-1 z-50 pointer-events-auto">
                    <Badge tier={userTier} size={44} />
                  </div>
                )}

                {/* Completion badge removed per design request - keeping progress ring and counts elsewhere */}
              </div>
            </div>

            {/* User Info & Stats */}
            <div className="flex-1 text-center md:text-left">
              {/* Name & Title */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">
                  {user?.name || 'Guest User'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2 justify-center md:justify-start">
                  <span className={`${bannerTheme.accentColor} w-2 h-2 rounded-full`}></span>
                  <span className="capitalize">
                    {userTier !== 'default' ? `${userTier} ` : ''}Member
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Level {Math.floor((user?.totalPoints || 0) / 100)}
                  </span>
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mt-6"
              >
                {/* Achievement Count */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-4 text-center border border-purple-200 dark:border-purple-800">
                  <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
                    {unlockedAchievements}
                  </div>
                  <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-1">
                    Achievements
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    of {totalAchievements}
                  </div>
                </div>

                {/* Points */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-4 text-center border border-yellow-200 dark:border-yellow-800">
                  <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">
                    {(user?.totalPoints || 0).toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mt-1">
                    Total Points
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    💰 Earned
                  </div>
                </div>

                {/* Streak */}
                <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 rounded-2xl p-4 text-center border border-orange-200 dark:border-red-800">
                  <div className="text-3xl font-black text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                    🔥 {user?.currentStreak || 0}
                  </div>
                  <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-1">
                    Day Streak
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Keep it up!
                  </div>
                </div>
              </motion.div>

              {/* Achievement Highlights - Enhanced */}
              {achievements.filter(a => a.isUnlocked).length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        {/* SVG Trophy (no emoji) */}
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span>Recent Achievements</span>
                      </div>
                  <motion.div className="flex flex-wrap gap-2" variants={achContainerVariants} initial="hidden" animate="visible">
                    {achievements.slice(0, 4).map((achievement) => (
                      achievement.isUnlocked && (
                        <motion.div
                          key={achievement.id}
                          variants={achItemVariants}
                          whileHover="hover"
                          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-4 py-2 rounded-xl text-sm flex items-center gap-3 shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer transform-gpu"
                        >
                          {/* Small stylized badge instead of emoji */}
                          {/* Category-based icon & color */}
                          {(() => {
                            const category = detectAchievementCategory(achievement);
                            const iconData = ACHIEVEMENT_ICON_MAP[category] || ACHIEVEMENT_ICON_MAP.default;
                            return (
                              <>
                                <div className={`w-8 h-8 rounded-md ${iconData.bg} flex items-center justify-center text-sm font-bold text-white shadow-inner`} aria-hidden>
                                  {iconData.svg}
                                </div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{(achievement.title || '').replace(/[^\p{L}\p{N}\s]/gu, '').trim()}</span>
                              </>
                            );
                          })()}
                        </motion.div>
                      )
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
