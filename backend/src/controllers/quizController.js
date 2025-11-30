import quizGeneratorService from '../services/quizGeneratorService.js';
import Module from '../models/Module.js';

export const generateQuiz = async (req, res) => {
    try {
        const { moduleId, lessonIndex } = req.params;
        const user = req.user; // From auth middleware

        // 1. Fetch Module Context
        const module = await Module.findOne({ id: moduleId });
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const lesson = module.lessons[lessonIndex];
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // 2. Generate Quiz
        console.log(`🧠 Generating quiz for ${module.title} - ${lesson.title} (${user.proficiencyLevel})`);

        try {
            const questions = await quizGeneratorService.generateQuiz(
                module.title,
                lesson.title,
                user.proficiencyLevel || 'Beginner'
            );

            res.json({ success: true, data: questions, source: 'ai' });
        } catch (aiError) {
            console.warn('⚠️ AI Quiz Generation failed, falling back to static content:', aiError.message);

            // Fallback to static quiz if available
            if (lesson.quiz && lesson.quiz.length > 0) {
                res.json({ success: true, data: lesson.quiz, source: 'static' });
            } else {
                res.status(500).json({ message: 'Failed to generate quiz and no static content available.' });
            }
        }

    } catch (error) {
        console.error('❌ Quiz Controller Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
