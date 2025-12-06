import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MessageCircle } from 'lucide-react';
import MainNavbar from '../components/MainNavbar';
import ForumThreadCard from '../components/community/ForumThreadCard';
import CreatePostModal from '../components/community/CreatePostModal';
import forumService from '../services/forumService';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await forumService.getAllPosts(activeCategory, searchQuery);
            if (data.posts) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [activeCategory, searchQuery]);

    const categories = ['All', 'General', 'Module Help', 'Ask an Expert', 'Challenge'];

    return (
        <div className="min-h-screen bg-[#081226] text-slate-200 font-sans selection:bg-blue-500/30">
            <MainNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Community Hub</h1>
                        <p className="text-slate-400">Connect, learn, and grow with other finance enthusiasts.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={20} />
                        New Discussion
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>

                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                                Categories
                            </h3>
                            <div className="space-y-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending / Info Box */}
                        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-xl p-5">
                            <h3 className="font-semibold text-white mb-2">Ask an Expert</h3>
                            <p className="text-sm text-slate-400 mb-4">
                                Stuck on a complex topic? Post in the "Ask an Expert" category to get help from certified pros.
                            </p>
                            <button
                                onClick={() => { setActiveCategory('Ask an Expert'); setIsModalOpen(true); }}
                                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Ask Question
                            </button>
                        </div>
                    </div>

                    {/* Main Content - Post List */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map(post => (
                                    <ForumThreadCard key={post._id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                                <MessageCircle size={48} className="mx-auto text-slate-600 mb-4" />
                                <h3 className="text-lg font-medium text-slate-300">No discussions found</h3>
                                <p className="text-slate-500 mt-1">Be the first to start a conversation in this category!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPostCreated={fetchPosts}
            />
        </div>
    );
};

export default CommunityPage;
