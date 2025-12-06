import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Eye, CheckCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForumThreadCard = ({ post }) => {
    const navigate = useNavigate();

    const isSystemEvent = post.tags?.includes('System Event');
    const isLegendary = post.tags?.includes('legendary');
    const isEpic = post.tags?.includes('epic');

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Module Help': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Ask an Expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'Challenge': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    if (isSystemEvent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/community/post/${post._id}`)}
                className={`relative overflow-hidden cursor-pointer rounded-xl p-[1px] ${isLegendary ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600' :
                        isEpic ? 'bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500' :
                            'bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600'
                    }`}
            >
                <div className="bg-[#0b101b] rounded-xl p-4 h-full relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isLegendary ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' :
                                    isEpic ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50' :
                                        'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                                }`}>
                                {isLegendary ? 'Legendary Drop' : isEpic ? 'Epic Find' : 'System Event'}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                            {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 ${isLegendary ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500' :
                            isEpic ? 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-indigo-300' :
                                'text-cyan-100'
                        }`}>
                        {post.title}
                    </h3>

                    <div className="text-slate-400 text-sm line-clamp-2 prose prose-invert max-w-none">
                        {post.content.split('\n\n')[0]} {/* Show first paragraph only for cleanness */}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
                                {post.author?.avatar ? (
                                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center"><User size={10} /></div>
                                )}
                            </div>
                            <span className="text-xs text-slate-300 font-medium">
                                {post.author?.name} <span className="text-slate-500">acquired new gear</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <div className="flex items-center gap-1 group">
                                <ThumbsUp size={12} className="group-hover:text-amber-400 transition-colors" />
                                <span>{post.upvotes?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare size={12} />
                                <span>{post.commentCount || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => navigate(`/community/post/${post._id}`)}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                    </span>
                    {post.isSolved && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                            <CheckCircle size={12} /> Solved
                        </span>
                    )}
                </div>
                <span className="text-xs text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                {post.title}
            </h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {post.content}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>{post.upvotes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        <span>{post.commentCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{post.views || 0}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                        {post.author?.avatar ? (
                            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={12} className="text-slate-400" />
                        )}
                    </div>
                    <span>{post.author?.name || 'Unknown'}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ForumThreadCard;
