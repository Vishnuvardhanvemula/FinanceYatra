import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ThumbsUp, MessageSquare, CheckCircle, User, Send, Clock } from 'lucide-react';
import MainNavbar from '../components/MainNavbar';
import { toast } from 'react-hot-toast';
import forumService from '../services/forumService';

const ForumThreadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchPostDetails = async () => {
        try {
            const data = await forumService.getPostById(id);
            setPost(data.post);
            setComments(data.comments);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load discussion');
            navigate('/community');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, [id]);

    const handleUpvote = async () => {
        try {
            const data = await forumService.likePost(id);
            setPost(prev => ({ ...prev, upvotes: data.upvotes }));
        } catch (error) {
            console.error('Failed to vote', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const comment = await forumService.addComment(id, newComment);
            setComments(prev => [...prev, comment]);
            setNewComment('');
            toast.success('Comment added!');

            // Update post comment count locally
            setPost(prev => ({ ...prev, commentCount: (prev.commentCount || 0) + 1 }));
        } catch (error) {
            toast.error('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#081226] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="min-h-screen bg-[#081226] text-slate-200 font-sans selection:bg-blue-500/30">
            <MainNavbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate('/community')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Discussions
                </button>

                {/* Main Post */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {post.category}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden">
                                {post.author?.avatar ? (
                                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={14} className="m-1 text-slate-400" />
                                )}
                            </div>
                            <span className="text-white">{post.author?.name}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-8 text-slate-300 whitespace-pre-wrap">
                        {post.content}
                    </div>

                    <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                        <button
                            onClick={handleUpvote}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-300"
                        >
                            <ThumbsUp size={16} />
                            <span>{post.upvotes?.length || 0} Upvotes</span>
                        </button>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400">
                            <MessageSquare size={16} />
                            <span>{post.commentCount || 0} Comments</span>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Comments</h3>

                    {/* Comment Input */}
                    <form onSubmit={handleCommentSubmit} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add to the discussion..."
                            rows={3}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none mb-3"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting || !newComment.trim()}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <Send size={16} />
                                Post Comment
                            </button>
                        </div>
                    </form>

                    {/* Comment List */}
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <motion.div
                                key={comment._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-white/5 border border-white/10 rounded-xl p-4 ${comment.isAcceptedAnswer ? 'border-green-500/30 bg-green-500/5' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden">
                                            {comment.author?.avatar ? (
                                                <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={14} className="m-1 text-slate-400" />
                                            )}
                                        </div>
                                        <span className="font-medium text-white text-sm">{comment.author?.name}</span>
                                        <span className="text-xs text-slate-500">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {comment.isAcceptedAnswer && (
                                        <span className="flex items-center gap-1 text-xs font-medium text-green-400">
                                            <CheckCircle size={12} /> Accepted Answer
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-300 text-sm whitespace-pre-wrap">{comment.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ForumThreadDetail;
