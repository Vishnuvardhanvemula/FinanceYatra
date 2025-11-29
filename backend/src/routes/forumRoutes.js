import express from 'express';
import { authenticate, optionalAuth } from '../middleware/authMiddleware.js';
import {
    getPosts,
    getPostById,
    createPost,
    addComment,
    votePost,
    markSolved
} from '../controllers/forumController.js';

const router = express.Router();

router.get('/', optionalAuth, getPosts);
router.get('/:id', optionalAuth, getPostById);
router.post('/', authenticate, createPost);
router.post('/:id/comment', authenticate, addComment);
router.post('/:id/vote', authenticate, votePost);
router.patch('/:id/solve', authenticate, markSolved);

export default router;
