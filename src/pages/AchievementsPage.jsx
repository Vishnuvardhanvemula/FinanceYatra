import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AchievementsPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    fetchAchievements();
  }, [user, token, navigate]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/dashboard/achievements', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        setAchievements(data.data.achievements);
        setStats(data.data.stats);
        setProgress(data.data.progress);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'getting-started', name: 'Getting Started', icon: '🎉' },
    { id: 'modules', name: 'Modules', icon: '📚' },
    { id: 'difficulty', name: 'Difficulty', icon: '⭐' },
    { id: 'streaks', name: 'Streaks', icon: '🔥' },
    { id: 'points', name: 'Points', icon: '💎' },
    { id: 'proficiency', name: 'Proficiency', icon: '📈' },
    { id: 'quiz', name: 'Quiz', icon: '🧠' },
    { id: 'special', name: 'Special', icon: '✨' },
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'bg-gray-100 text-gray-700 border-gray-300',
      uncommon: 'bg-green-100 text-green-700 border-green-300',
      rare: 'bg-blue-100 text-blue-700 border-blue-300',
      epic: 'bg-purple-100 text-purple-700 border-purple-300',
      legendary: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    };
    return colors[rarity] || colors.common;
  };

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = filteredAchievements.filter(a => a.isUnlocked).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">🏆 Achievements</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your learning milestones and unlock rewards
          </p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.unlocked}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unlocked</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.locked}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Locked</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-2">💎</div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.achievementPoints}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Achievement Points</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round((stats.unlocked / stats.total) * 100)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
            </div>
          </div>
        )}

        {/* Progress Tracking */}
        {progress && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Modules Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="text-2xl mr-2">📚</span> Modules Progress
              </h3>
              <div className="space-y-3">
                {progress.modules.targets.map((target, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{target.value} modules</span>
                      <span className={target.achieved ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}>
                        {target.achieved ? '✓' : `${progress.modules.current}/${target.value}`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          target.achieved ? 'bg-green-500 dark:bg-green-600' : 'bg-blue-500 dark:bg-teal-500'
                        }`}
                        style={{ 
                          width: `${Math.min((progress.modules.current / target.value) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streaks Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔥</span> Streaks Progress
              </h3>
              <div className="space-y-3">
                {progress.streaks.targets.map((target, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{target.value} days</span>
                      <span className={target.achieved ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}>
                        {target.achieved ? '✓' : `${progress.streaks.current}/${target.value}`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          target.achieved ? 'bg-orange-500 dark:bg-orange-600' : 'bg-yellow-500 dark:bg-yellow-600'
                        }`}
                        style={{ 
                          width: `${Math.min((progress.streaks.current / target.value) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="text-2xl mr-2">💎</span> Points Progress
              </h3>
              <div className="space-y-3">
                {progress.points.targets.map((target, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{target.value} points</span>
                      <span className={target.achieved ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}>
                        {target.achieved ? '✓' : `${progress.points.current}/${target.value}`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          target.achieved ? 'bg-purple-500 dark:bg-purple-600' : 'bg-indigo-500 dark:bg-teal-500'
                        }`}
                        style={{ 
                          width: `${Math.min((progress.points.current / target.value) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 dark:bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Info */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {unlockedCount} unlocked out of {filteredAchievements.length} achievements
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-2 transition-all hover:shadow-lg ${
                achievement.isUnlocked
                  ? 'border-yellow-300 dark:border-yellow-600 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20'
                  : 'border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              {/* Achievement Icon */}
              <div className="text-center mb-4">
                <div
                  className={`inline-block p-4 rounded-full ${
                    achievement.isUnlocked ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <span className={`text-5xl ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.isUnlocked ? achievement.icon : '🔒'}
                  </span>
                </div>
              </div>

              {/* Achievement Details */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {achievement.description}
                </p>
                
                {/* Rarity Badge */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRarityColor(
                      achievement.rarity
                    )}`}
                  >
                    {achievement.rarity.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold">
                    +{achievement.points} pts
                  </span>
                </div>
              </div>

              {/* Criteria */}
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {achievement.criteria}
                </p>
              </div>

              {/* Unlocked Badge */}
              {achievement.isUnlocked && (
                <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center text-green-600 dark:text-green-400 font-semibold text-sm">
                    <span className="mr-2">✓</span> Unlocked
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl">🎯</span>
            <p className="text-gray-500 dark:text-gray-400 mt-4">No achievements in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
