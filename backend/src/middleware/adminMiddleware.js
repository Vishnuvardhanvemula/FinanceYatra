import User from '../models/User.js';

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user || !user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({ success: false, message: 'Server error checking admin status' });
    }
};
