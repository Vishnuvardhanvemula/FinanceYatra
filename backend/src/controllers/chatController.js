import chatService from '../services/chatService.js';

export const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Call the Chat Service
        const response = await chatService.getResponse(message, history || []);

        res.json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Chat Controller Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process chat message'
        });
    }
};
