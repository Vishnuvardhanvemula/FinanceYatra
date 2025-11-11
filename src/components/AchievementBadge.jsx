/**
 * Achievement Badge Component with Tier Support
 * Displays badges with Bronze, Silver, Gold, and Platinum tiers
 * Includes animations, confetti effects, and shareable cards
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
// Badge SVGs
import bronzeBadge from '../assets/badges/bronze-badge.svg';
import silverBadge from '../assets/badges/silver-badge.svg';
import goldBadge from '../assets/badges/gold-badge.svg';
import platinumBadge from '../assets/badges/platinum-badge.svg';

const TIER_COLORS = {
  bronze: {
    gradient: 'from-amber-900 via-orange-500 to-amber-700',
    secondaryGradient: 'from-amber-600/20 via-orange-400/30 to-amber-800/20',
    bg: 'bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20',
    border: 'border-amber-500 dark:border-amber-600',
    text: 'text-amber-800 dark:text-amber-300',
    glow: 'shadow-[0_0_30px_rgba(251,146,60,0.6)] dark:shadow-[0_0_30px_rgba(251,146,60,0.4)]',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(251,191,36,0.3)]',
    particles: ['#f59e0b', '#fb923c', '#ea580c'],
  },
  silver: {
    gradient: 'from-slate-400 via-gray-100 to-slate-500',
    secondaryGradient: 'from-slate-300/20 via-gray-200/30 to-slate-400/20',
    bg: 'bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-700/30 dark:to-slate-700/20',
    border: 'border-slate-400 dark:border-slate-500',
    text: 'text-slate-700 dark:text-slate-300',
    glow: 'shadow-[0_0_30px_rgba(148,163,184,0.6)] dark:shadow-[0_0_30px_rgba(148,163,184,0.4)]',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(203,213,225,0.4)]',
    particles: ['#cbd5e1', '#94a3b8', '#64748b'],
  },
  gold: {
    gradient: 'from-yellow-500 via-amber-300 to-yellow-600',
    secondaryGradient: 'from-yellow-400/20 via-amber-200/30 to-yellow-500/20',
    bg: 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/20',
    border: 'border-yellow-400 dark:border-yellow-500',
    text: 'text-yellow-800 dark:text-yellow-300',
    glow: 'shadow-[0_0_40px_rgba(250,204,21,0.8)] dark:shadow-[0_0_40px_rgba(250,204,21,0.5)]',
    innerGlow: 'shadow-[inset_0_0_25px_rgba(253,224,71,0.4)]',
    particles: ['#fbbf24', '#fcd34d', '#f59e0b'],
  },
  platinum: {
    gradient: 'from-indigo-600 via-purple-400 to-pink-600',
    secondaryGradient: 'from-indigo-500/20 via-purple-300/30 to-pink-500/20',
    bg: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20',
    border: 'border-purple-500 dark:border-purple-600',
    text: 'text-purple-800 dark:text-purple-300',
    glow: 'shadow-[0_0_50px_rgba(168,85,247,0.9)] dark:shadow-[0_0_50px_rgba(168,85,247,0.6)]',
    innerGlow: 'shadow-[inset_0_0_30px_rgba(192,132,252,0.5)]',
    particles: ['#a855f7', '#ec4899', '#d946ef'],
  },
};

const AchievementBadge = ({ 
  achievement, 
  tier = 'bronze', 
  isUnlocked = false,
  isNew = false,
  showAnimation = false,
  size = 'medium',
  onClick 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  
  const tierData = achievement.hasTiers ? achievement.tiers[tier] : null;
  const colors = TIER_COLORS[tier];
  
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  };

  useEffect(() => {
    if (isNew && showAnimation) {
      triggerConfetti();
    }
  }, [isNew, showAnimation]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    
    // Confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = tier === 'platinum' 
      ? ['#9333ea', '#ec4899', '#f59e0b']
      : tier === 'gold'
      ? ['#eab308', '#f59e0b', '#fbbf24']
      : tier === 'silver'
      ? ['#9ca3af', '#d1d5db', '#e5e7eb']
      : ['#ea580c', '#f97316', '#fb923c'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setShowConfetti(false);
      }
    })();
  };

  const handleShare = async () => {
    // Navigate to the share page for this achievement
    navigate(`/share/achievement/${achievement.id}`);
  };

  const badgeContent = (
    <motion.div
      initial={showAnimation ? { scale: 0, rotate: -180, opacity: 0 } : false}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      whileHover={{ 
        scale: 1.15, 
        rotate: [0, -8, 8, -8, 0],
        transition: { duration: 0.5 }
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`${sizeClasses[size]} relative cursor-pointer group`}
      onClick={() => {
        onClick?.();
        setShowModal(true);
      }}
    >
      {/* Outer Glow Ring */}
      {isUnlocked && (
        <motion.div
          className={`absolute inset-0 rounded-full ${colors.glow} blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Badge Container with 3D Effect */}
      <div className={`
        w-full h-full rounded-full
        ${colors.bg} ${colors.border} border-[6px]
        flex items-center justify-center
        ${isUnlocked ? `${colors.glow} ${colors.innerGlow}` : 'opacity-40 grayscale'}
        transition-all duration-500
        relative overflow-hidden
        transform-gpu
        shadow-2xl
        group-hover:border-[7px]
      `}
      style={{
        background: isUnlocked ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), linear-gradient(135deg, ${colors.gradient})` : undefined
      }}
      >
        {/* Animated Background Pattern */}
        {isUnlocked && (
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`badge-pattern-${achievement.id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <motion.circle 
                    cx="15" 
                    cy="15" 
                    r="2" 
                    fill="currentColor"
                    animate={{ r: [2, 3, 2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#badge-pattern-${achievement.id})`} />
            </svg>
          </div>
        )}

        {/* Rotating Shimmer Effect */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.6) 30deg, transparent 60deg)`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Radial Shimmer Effect */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-white/40 via-transparent to-transparent"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Diagonal Shine */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        )}
        
        {/* Badge SVG with animation (replaces emoji) */}
        <motion.div
          className="z-10 flex items-center justify-center"
          animate={isUnlocked ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {(() => {
            // Prefer tier-specific badge svg when available
            const srcMap = {
              bronze: bronzeBadge,
              silver: silverBadge,
              gold: goldBadge,
              platinum: platinumBadge,
            };
            const useTier = tier || (achievement?.tier || '').toLowerCase();
            const src = srcMap[useTier] || null;
            if (src) {
              return (
                <img
                  src={src}
                  alt={`${useTier || 'badge'} badge`}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain"
                />
              );
            }
            // Fallback to original icon string (if SVG not available)
            return (
              <span className="text-4xl filter drop-shadow-lg">{tierData?.icon || achievement.icon}</span>
            );
          })()}
        </motion.div>

        {/* Sparkle Effects */}
        {isUnlocked && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${20 + Math.sin((i * Math.PI) / 3) * 30}%`,
                  left: `${50 + Math.cos((i * Math.PI) / 3) * 35}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}

        {/* Lock Overlay with Blur */}
        {!isUnlocked && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="text-3xl filter drop-shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🔒
            </motion.span>
          </motion.div>
        )}

        {/* New Badge Indicator with Pulse */}
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800"
          >
            <motion.span
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            >
              NEW!
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Tier Badge with 3D Effect */}
      {achievement.hasTiers && isUnlocked && (
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            absolute -bottom-2 left-1/2 transform -translate-x-1/2
            ${colors.bg} ${colors.border} border-3
            px-3 py-1 rounded-full text-xs font-black ${colors.text}
            shadow-lg
            backdrop-blur-sm
          `}
          style={{
            background: `linear-gradient(135deg, ${colors.secondaryGradient})`,
          }}
        >
          <span className="relative z-10">{tier.toUpperCase()}</span>
        </motion.div>
      )}

      {/* Corner Ribbon for Rare Achievements */}
      {achievement.rarity && ['legendary', 'epic'].includes(achievement.rarity) && isUnlocked && (
        <div className="absolute -top-1 -right-1">
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-6 h-6"
          >
            <span className="text-2xl">
              {achievement.rarity === 'legendary' ? '👑' : '⭐'}
            </span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );

  return (
    <>
      {badgeContent}

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-center`}>
                <motion.div
                  animate={{ rotate: [0, 6, -6, 6, 0] }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 flex items-center justify-center"
                >
                  {(() => {
                    const srcMap = {
                      bronze: bronzeBadge,
                      silver: silverBadge,
                      gold: goldBadge,
                      platinum: platinumBadge,
                    };
                    const useTier = tier || (achievement?.tier || '').toLowerCase();
                    const src = srcMap[useTier] || null;
                    if (src) {
                      return (
                        <img src={src} alt={`${useTier || 'badge'} badge`} className="w-24 h-24 object-contain" />
                      );
                    }
                    return <div className="text-8xl">{tierData?.icon || achievement.icon}</div>;
                  })()}
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tierData?.title || achievement.title}
                </h2>
                {achievement.hasTiers && (
                  <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-white font-bold">
                    {tier.toUpperCase()} TIER
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {tierData?.description || achievement.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className={`${colors.bg} ${colors.border} border-2 rounded-lg p-3`}>
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {tierData?.points || achievement.points}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                  </div>
                  <div className={`${colors.bg} ${colors.border} border-2 rounded-lg p-3`}>
                    <div className={`text-2xl font-bold ${colors.text} capitalize`}>
                      {achievement.rarity}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rarity</div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Unlock Criteria:
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tierData?.description || achievement.criteria}
                  </p>
                </div>

                {/* Tier Progress */}
                {achievement.hasTiers && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                      Tier Progress:
                    </h4>
                    <div className="space-y-2">
                      {['bronze', 'silver', 'gold', 'platinum'].map((t) => (
                        <div key={t} className="flex items-center gap-2">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            ${TIER_COLORS[t].bg} ${TIER_COLORS[t].border} border-2
                            ${tier === t || ['bronze', 'silver', 'gold', 'platinum'].indexOf(tier) > ['bronze', 'silver', 'gold', 'platinum'].indexOf(t) ? '' : 'opacity-30 grayscale'}
                          `}>
                            {/* tier badge svg */}
                            {(() => {
                              const srcMap = {
                                bronze: bronzeBadge,
                                silver: silverBadge,
                                gold: goldBadge,
                                platinum: platinumBadge,
                              };
                              const src = srcMap[t];
                              if (src) return <img src={src} alt={`${t} badge`} className="w-5 h-5 object-contain" />;
                              return <span className="text-sm">{achievement.tiers[t].icon}</span>;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                              {t}
                            </div>
                            <div className="text-xs text-gray-500">
                              {achievement.tiers[t].threshold} days
                            </div>
                          </div>
                          {(tier === t || ['bronze', 'silver', 'gold', 'platinum'].indexOf(tier) > ['bronze', 'silver', 'gold', 'platinum'].indexOf(t)) && (
                            <span className="text-green-500">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isUnlocked && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleShare}
                      className={`
                        flex-1 ${colors.bg} ${colors.text} ${colors.border} border-2
                        px-4 py-3 rounded-lg font-bold
                        hover:shadow-lg transition-all duration-200
                        flex items-center justify-center gap-2
                      `}
                    >
                      <span>📤</span> Share
                    </button>
                    <button
                      onClick={triggerConfetti}
                      className={`
                        px-4 py-3 rounded-lg font-bold
                        bg-gradient-to-r ${colors.gradient}
                        text-white hover:shadow-lg transition-all duration-200
                      `}
                    >
                      🎉
                    </button>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementBadge;
