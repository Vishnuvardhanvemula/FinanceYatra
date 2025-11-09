import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    fetchDashboardData();
  }, [user, token, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch analytics, achievements, and stats in parallel
      const [analyticsRes, achievementsRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/dashboard/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/dashboard/achievements', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [analyticsData, achievementsData, statsData] = await Promise.all([
        analyticsRes.json(),
        achievementsRes.json(),
        statsRes.json()
      ]);

      if (analyticsData.success) setAnalytics(analyticsData.data);
      if (achievementsData.success) setAchievements(achievementsData.data);
      if (statsData.success) setStats(statsData.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your learning progress and achievements
          </p>
        </div>

        {/* Quick Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Points */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-yellow-500 dark:border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Points</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {stats.totalPoints}
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3">
                  <span className="text-3xl">💎</span>
                </div>
              </div>
            </div>

            {/* Current Streak */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-orange-500 dark:border-orange-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {stats.currentStreak} days
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3">
                  <span className="text-3xl">🔥</span>
                </div>
              </div>
            </div>

            {/* Modules Completed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500 dark:border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Modules Completed</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {stats.modulesCompleted}/{stats.totalModules}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                  <span className="text-3xl">📚</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500 dark:border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Achievements</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {stats.achievementsUnlocked}/{stats.totalAchievements}
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3">
                  <span className="text-3xl">🏆</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Module Progress */}
            {analytics?.modules && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Learning Progress</h2>
                
                {/* Overall Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Completion</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-teal-400">
                      {analytics.modules.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-teal-500 dark:to-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${analytics.modules.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Module Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analytics.modules.completedModules}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {analytics.modules.inProgressModules}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      {analytics.modules.notStartedModules}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Not Started</p>
                  </div>
                </div>

                {/* Difficulty Progress */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Progress by Difficulty</h3>
                  
                  {/* Beginner */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">🟢 Beginner</span>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {analytics.modules.completedByDifficulty.beginner}/{analytics.modules.totalByDifficulty.beginner}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 dark:bg-green-600 h-2 rounded-full"
                        style={{ 
                          width: `${(analytics.modules.completedByDifficulty.beginner / analytics.modules.totalByDifficulty.beginner) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Intermediate */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">🟡 Intermediate</span>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {analytics.modules.completedByDifficulty.intermediate}/{analytics.modules.totalByDifficulty.intermediate}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 dark:bg-yellow-600 h-2 rounded-full"
                        style={{ 
                          width: `${(analytics.modules.completedByDifficulty.intermediate / analytics.modules.totalByDifficulty.intermediate) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Expert */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">🔴 Expert</span>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {analytics.modules.completedByDifficulty.expert}/{analytics.modules.totalByDifficulty.expert}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 dark:bg-red-600 h-2 rounded-full"
                        style={{ 
                          width: `${(analytics.modules.completedByDifficulty.expert / analytics.modules.totalByDifficulty.expert) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Activity */}
            {analytics?.activity?.weekly && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Weekly Activity</h2>
                <div className="flex justify-between items-end h-40">
                  {analytics.activity.weekly.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full px-1">
                        <div className="relative">
                          <div
                            className="bg-gradient-to-t from-blue-500 to-indigo-600 dark:from-teal-500 dark:to-teal-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                            style={{
                              height: `${Math.max((day.count / 5) * 100, 5)}px`,
                              minHeight: day.count > 0 ? '20px' : '5px'
                            }}
                            title={`${day.count} activities`}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{day.day}</p>
                      <p className="text-xs font-semibold text-gray-900 dark:text-gray-200">{day.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {analytics?.activity?.recent && analytics.activity.recent.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {analytics.activity.recent.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      <div className="text-3xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{activity.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {activity.points && (
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                            +{activity.points}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Profile & Achievements */}
          <div className="space-y-8">
            {/* User Profile Card */}
            {analytics?.overview && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-teal-600 dark:to-teal-800 rounded-xl shadow-md p-6 text-white">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <p className="text-blue-200 dark:text-teal-200 text-sm">{user?.email}</p>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100 dark:text-teal-100">Proficiency Level</span>
                    <span className="font-semibold capitalize">
                      {analytics.overview.proficiencyLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100 dark:text-teal-100">Learning Time</span>
                    <span className="font-semibold">
                      {analytics.overview.learningTimeFormatted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100 dark:text-teal-100">Member Since</span>
                    <span className="font-semibold">
                      {new Date(analytics.overview.memberSince).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Achievements */}
            {achievements && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Achievements</h2>
                  <button
                    onClick={() => navigate('/achievements')}
                    className="text-blue-600 dark:text-teal-400 hover:text-blue-700 dark:hover:text-teal-300 text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      {achievements.stats.unlocked}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Unlocked</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-gray-600 dark:text-gray-300">
                      {achievements.stats.locked}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Locked</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {achievements.stats.achievementPoints}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Points</p>
                  </div>
                </div>

                {/* Recent Unlocked Achievements */}
                <div className="space-y-3">
                  {achievements.achievements
                    .filter(a => a.isUnlocked)
                    .slice(0, 5)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                      >
                        <span className="text-3xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                          +{achievement.points}
                        </span>
                      </div>
                    ))}
                </div>

                {achievements.achievements.filter(a => a.isUnlocked).length === 0 && (
                  <div className="text-center py-6">
                    <span className="text-4xl">🎯</span>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Start learning to unlock achievements!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
