import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFire, FaLightbulb, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import api from '../../services/api';

const RecommendedModules = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [dailyGoal, setDailyGoal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await api.get('/dashboard/recommendations');
                if (response.data.success) {
                    setRecommendations(response.data.data.recommendations);
                    setDailyGoal(response.data.data.dailyGoal);
                }
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4 mb-8">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mb-8">
            {/* Daily Goal Widget */}
            {dailyGoal && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                        <FaFire size={100} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-orange-100 font-medium">
                            <FaFire className="text-yellow-300" />
                            <span>Daily Goal</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{dailyGoal.message}</h3>
                        {dailyGoal.type === 'ai_generated' && (
                            <p className="text-xs text-orange-200 mt-2 flex items-center gap-1">
                                <FaLightbulb size={10} /> AI Personalized
                            </p>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Recommended Modules */}
            {recommendations.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaLightbulb className="text-yellow-500" />
                            Recommended for You
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendations.map((module, index) => (
                            <Link to={`/modules/${module.id}`} key={module._id || index}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                                module.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                            }`}>
                                            {module.difficulty}
                                        </span>
                                        {module.score && (
                                            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" title="Relevance Score">
                                                {Math.round(module.score * 100)}% Match
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                        {module.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                                        {module.description}
                                    </p>

                                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mt-auto">
                                        Start Learning <FaArrowRight className="ml-1" size={12} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default RecommendedModules;
