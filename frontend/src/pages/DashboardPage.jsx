import { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner';
import AchievementBadge from '../components/AchievementBadge';

// Helper function to render achievement icons as SVG
const AchievementIcon = ({ icon }) => {
  const iconMap = {
    '🎉': { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', path: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> },
    '💬': { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', path: <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /> },
    '📚': { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', path: <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /> },
    '🎓': { color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30', path: <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /> },
    '⭐': { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', path: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> },
    '🌟': { color: 'text-yellow-500 dark:text-yellow-300', bg: 'bg-yellow-100 dark:bg-yellow-900/30', path: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> },
    '🏆': { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', path: <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /> },
    '🟢': { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', path: <circle cx="10" cy="10" r="6" /> },
    '🟡': { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', path: <circle cx="10" cy="10" r="6" /> },
    '🔴': { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', path: <circle cx="10" cy="10" r="6" /> },
    '🔥': { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30', path: <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /> },
    '💎': { color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30', path: <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />, path2: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /> },
    '📈': { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', path: <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /> },
    '🎯': { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', path: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /> },
  };

  // Handle multiple fire emojis for streaks
  if (icon.includes('🔥')) {
    const fireCount = (icon.match(/🔥/g) || []).length;
    const fireIcon = iconMap['🔥'];
    return (
      <div className={`w-12 h-12 ${fireIcon.bg} rounded-full flex items-center justify-center relative`}>
        <svg className={`w-7 h-7 ${fireIcon.color}`} fill="currentColor" viewBox="0 0 20 20">
          {fireIcon.path}
        </svg>
        {fireCount > 1 && (
          <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {fireCount}
          </span>
        )}
      </div>
    );
  }

  // Handle multiple diamond emojis
  if (icon.includes('💎')) {
    const diamondCount = (icon.match(/💎/g) || []).length;
    const diamondIcon = iconMap['💎'];
    return (
      <div className={`w-12 h-12 ${diamondIcon.bg} rounded-full flex items-center justify-center relative`}>
        <svg className={`w-7 h-7 ${diamondIcon.color}`} fill="currentColor" viewBox="0 0 20 20">
          {diamondIcon.path}
          {diamondIcon.path2}
        </svg>
        {diamondCount > 1 && (
          <span className="absolute -top-1 -right-1 bg-cyan-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {diamondCount}
          </span>
        )}
      </div>
    );
  }

  const iconData = iconMap[icon] || iconMap['⭐']; // Default to star

  return (
    <div className={`w-12 h-12 ${iconData.bg} rounded-full flex items-center justify-center`}>
      <svg className={`w-7 h-7 ${iconData.color}`} fill="currentColor" viewBox="0 0 20 20">
        {iconData.path}
        {iconData.path2}
      </svg>
    </div>
  );
};

const DashboardPage = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [bannerTheme, setBannerTheme] = useState('default');

  // Memoize user progress to detect changes
  const userProgressKey = useMemo(() => 
    JSON.stringify(user?.moduleProgress || []),
    [user?.moduleProgress]
  );

  useEffect(() => {
    // Debug: log auth and token state when dashboard mounts / updates
    // eslint-disable-next-line no-console
    console.debug('Dashboard mount/useEffect: authLoading=', authLoading, 'user=', user ? { id: user.id, email: user.email } : null, 'hasToken=', !!token);

    // Wait for auth to finish loading before checking
    if (authLoading) return;
    
    if (!user || !token) {
      navigate('/login');
      return;
    }

    fetchDashboardData();
    logDailyActivity(); // Log user's daily activity
  }, [user, token, authLoading, navigate, userProgressKey]);

  const logDailyActivity = async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${API_URL}/dashboard/log-activity`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.warn('⚠️ Activity logging endpoint not available (404) - skipping');
        return;
      }

      const data = await response.json();
      
      if (data.success && data.data.activityLogged) {
        console.log('✅ Daily activity logged successfully');
        // Refresh analytics to show updated streak and activity
        fetchDashboardData();
      }
    } catch (error) {
      console.error('❌ Error logging daily activity:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch analytics, achievements, and stats in parallel
      const [analyticsRes, achievementsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/dashboard/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/achievements`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/dashboard/stats`, {
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

      // If none of the requests succeeded, set an error
      if (!analyticsData.success && !achievementsData.success && !statsData.success) {
        setError('Failed to load dashboard data. Please check your connection and try again.');
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('An error occurred while loading the dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchDashboardData();
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg text-center p-6 rounded-xl shadow-lg bg-white">
          <h3 className="text-xl font-bold mb-2">Unable to load dashboard</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={handleRetry} className="px-4 py-2 bg-blue-600 text-white rounded-md">Retry</button>
            <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-md">Reload Page</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Banner */}
        <div className="mb-8">
          <ProfileBanner
            user={user}
            achievements={achievements?.achievements || []}
            theme={bannerTheme}
            showCustomization={true}
            onThemeChange={setBannerTheme}
          />
        </div>

        {/* Quick Stats Cards removed to avoid duplication with ProfileBanner stats */}

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
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" />
                        </svg>
                        Beginner
                      </span>
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
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" />
                        </svg>
                        Intermediate
                      </span>
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
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" />
                        </svg>
                        Expert
                      </span>
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
                      <div className="flex-shrink-0">
                        {activity.type === 'module_completed' ? (
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : activity.type === 'module_started' ? (
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
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
                <div
                  className="rounded-xl shadow-md p-6 text-white"
                  style={{
                      background: `linear-gradient(135deg, var(--fy-gradient-start, #14b8a6), var(--fy-gradient-mid, #0d9488), var(--fy-gradient-end, #0f766e))`
                    }}
                >
                <div className="text-center mb-4">
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'var(--fy-accent, #0f766e)', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}
                    >
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'white' }}>
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--fy-theme-text, #ffffff)' }}>{user?.email}</p>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--fy-theme-text, #ffffff)' }}>Proficiency Level</span>
                    <span className="font-semibold capitalize" style={{ color: 'var(--fy-accent, #3b82f6)' }}>
                      {analytics.overview.proficiencyLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--fy-theme-text, #ffffff)' }}>Learning Time</span>
                    <span className="font-semibold" style={{ color: 'var(--fy-accent, #3b82f6)' }}>
                      {analytics.overview.learningTimeFormatted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: 'var(--fy-theme-text, #ffffff)' }}>Member Since</span>
                    <span className="font-semibold" style={{ color: 'var(--fy-theme-text, #ffffff)' }}>
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
                    className="text-blue-600 dark:text-teal-400 hover:text-blue-700 dark:hover:text-teal-300 text-sm font-medium flex items-center gap-1 group"
                  >
                    <span>View All</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
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
                        <AchievementIcon icon={achievement.icon} />
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
                    <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
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
