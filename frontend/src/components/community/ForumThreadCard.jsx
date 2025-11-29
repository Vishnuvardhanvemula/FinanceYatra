import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Eye, CheckCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForumThreadCard = ({ post }) => {
    const navigate = useNavigate();

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Module Help': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Ask an Expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'Challenge': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

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
