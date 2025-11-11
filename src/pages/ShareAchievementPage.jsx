import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useMetaTags from '../hooks/useMetaTags';

const ShareAchievementPage = () => {
  const { achievementId } = useParams();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAchievement();
  }, [achievementId]);

  const fetchAchievement = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch the specific achievement by ID
      // For now, we'll simulate with a mock achievement
      const mockAchievement = {
        id: achievementId,
        title: "Financial Master",
        description: "Completed 10 advanced modules with perfect scores",
        icon: "🎓",
        points: 500,
        rarity: "legendary",
        category: "proficiency",
        isUnlocked: true,
        unlockedAt: new Date().toISOString(),
        tier: "gold"
      };

      setAchievement(mockAchievement);
    } catch (err) {
      setError('Achievement not found');
    } finally {
      setLoading(false);
    }
  };

  // Set up meta tags for social sharing
  const achievementTitle = achievement ? `${achievement.title} - Finance Yatra` : 'Achievement Unlocked - Finance Yatra';
  const achievementDescription = achievement ? `I just unlocked the "${achievement.title}" achievement on Finance Yatra! ${achievement.description}` : 'Check out this amazing achievement on Finance Yatra!';
  const achievementImage = achievement ? `https://financeyatra.vercel.app/api/achievement-image/${achievement.id}` : 'https://financeyatra.vercel.app/og-image.png';
  const achievementUrl = window.location.href;

  useMetaTags(achievementTitle, achievementDescription, achievementImage, achievementUrl);

  const getRarityColor = (rarity) => {
    const colors = {
      common: { bg: 'from-gray-400 to-gray-600', text: 'text-gray-100' },
      uncommon: { bg: 'from-green-400 to-green-600', text: 'text-green-100' },
      rare: { bg: 'from-blue-400 to-blue-600', text: 'text-blue-100' },
      epic: { bg: 'from-purple-400 to-purple-600', text: 'text-purple-100' },
      legendary: { bg: 'from-yellow-400 to-orange-600', text: 'text-yellow-100' },
    };
    return colors[rarity] || colors.common;
  };

  const shareOnTwitter = () => {
    const text = `I just unlocked the "${achievement.title}" achievement on Finance Yatra! 🎉 #FinanceYatra #AchievementUnlocked`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const title = `Achievement Unlocked: ${achievement.title}`;
    const summary = `I just earned the ${achievement.title} achievement on Finance Yatra! ${achievement.description}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`, '_blank');
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading achievement...</p>
        </div>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-md text-center p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Achievement Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This achievement doesn't exist or hasn't been unlocked yet.</p>
          <button
            onClick={() => navigate('/achievements')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Achievements
          </button>
        </div>
      </div>
    );
  }

  const rarityColors = getRarityColor(achievement.rarity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
          >
            Achievement Unlocked! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Share your accomplishment with the world
          </motion.p>
        </div>

        {/* Achievement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Top Gradient Banner */}
          <div className={`bg-gradient-to-r ${rarityColors.bg} p-8 text-center relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Achievement Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="relative z-10 mb-6"
            >
              <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-7xl filter drop-shadow-lg">{achievement.icon}</span>
              </div>
            </motion.div>

            {/* Achievement Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`text-4xl font-black mb-2 ${rarityColors.text} drop-shadow-lg`}
            >
              {achievement.title}
            </motion.h2>

            {/* Rarity Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-white/30"
            >
              <span className="text-white font-bold text-lg uppercase tracking-wide">
                {achievement.rarity} Achievement
              </span>
            </motion.div>
          </div>

          {/* Achievement Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {achievement.points}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Points Earned</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1 capitalize">
                      {achievement.category.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Category</div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Achievement Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Unlocked On</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {new Date(achievement.unlockedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Rarity Level</span>
                      <span className={`font-semibold capitalize px-3 py-1 rounded-full text-sm ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        achievement.rarity === 'uncommon' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    {achievement.tier && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 dark:text-gray-400">Tier</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                          {achievement.tier}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Share Your Achievement
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Let your friends and followers know about your financial learning milestone!
          </p>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareOnTwitter}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareOnFacebook}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareOnLinkedIn}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyShareLink}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </motion.button>
          </div>

          {/* Share URL */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Share this link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-mono"
              />
              <button
                onClick={copyShareLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate('/achievements')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
          >
            ← Back to Achievements
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShareAchievementPage;