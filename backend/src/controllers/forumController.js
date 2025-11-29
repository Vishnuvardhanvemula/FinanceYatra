import ForumPost from '../models/ForumPost.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

// Get all posts with filtering and pagination
export const getPosts = async (req, res) => {
    try {
        const { category, search, sort = 'newest', page = 1, limit = 10 } = req.query;
        const query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const sortOptions = {};
        if (sort === 'newest') sortOptions.createdAt = -1;
        else if (sort === 'popular') sortOptions.upvotes = -1; // Approximate, ideally sort by array length
        else if (sort === 'views') sortOptions.views = -1;

        const posts = await ForumPost.find(query)
            .populate('author', 'name avatar proficiencyLevel')
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await ForumPost.countDocuments(query);

        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
};

// Get single post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id)
            .populate('author', 'name avatar proficiencyLevel');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Increment views
        post.views += 1;
        await post.save();

        const comments = await Comment.find({ post: post._id })
            .populate('author', 'name avatar proficiencyLevel')
            .sort({ isAcceptedAnswer: -1, createdAt: 1 }); // Accepted answers first, then chronological

        res.json({ post, comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    console.log('📝 createPost called with body:', req.body);
    try {
        const { title, content, category, tags } = req.body;

        console.log('👤 User ID:', req.userId);

        const newPost = await ForumPost.create({
            author: req.userId,
            title,
            content,
            category,
            tags
        });

        console.log('✅ Post created:', newPost._id);

        // Award XP for creating a post
        try {
            const user = await User.findById(req.userId);
            if (user) {
                user.awardXP(10, 'forum_post');
                await user.save();
                console.log('✨ XP awarded to user:', user._id);
            } else {
                console.warn('⚠️ User not found for XP award:', req.userId);
            }
        } catch (xpError) {
            console.error('❌ Failed to award XP:', xpError);
            // Don't fail the request if XP award fails
        }

        res.status(201).json(newPost);
    } catch (error) {
        console.error('❌ createPost error:', error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

// Add a comment
export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;

        const post = await ForumPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = await Comment.create({
            post: postId,
            author: req.userId,
            content
        });

        // Update comment count
        post.commentCount += 1;
        await post.save();

        // Award XP for commenting
        try {
            const user = await User.findById(req.userId);
            if (user) {
                user.awardXP(5, 'forum_comment');
                await user.save();
            }
        } catch (xpError) {
            console.error('Failed to award XP for comment:', xpError);
        }

        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'name avatar proficiencyLevel');

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
};

// Toggle upvote on a post
export const votePost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.userId;
        const index = post.upvotes.indexOf(userId);

        if (index === -1) {
            post.upvotes.push(userId);
        } else {
            post.upvotes.splice(index, 1);
        }

        await post.save();
        res.json({ upvotes: post.upvotes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to vote', error: error.message });
    }
};

// Mark post as solved (Author or Admin only)
export const markSolved = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        post.isSolved = !post.isSolved;
        await post.save();

        res.json({ isSolved: post.isSolved });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status', error: error.message });
    }
};
