/**
 * Interactive Lesson Quiz Component
 * Supports MCQ, True/False, Fill in the Blanks, and Scenario-based questions
 */

import React, { useState, useRef, memo } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Sparkles, Brain, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LessonQuiz = memo(({ quiz, lessonTitle, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const quizRef = useRef(null);

  if (!quiz || quiz.length === 0) return null;

  const question = quiz[currentQuestion];
  const totalQuestions = quiz.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer!');
      return;
    }

    // Store current scroll position
    const currentScrollY = window.scrollY;

    const isCorrect = selectedAnswer === question.correct;
    setShowResult(true);
    
    const newAnswers = [...userAnswers, {
      questionIndex: currentQuestion,
      userAnswer: selectedAnswer,
      isCorrect
    }];
    setUserAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! 🎉', { duration: 2000 });
    } else {
      toast.error('Not quite right. Review the explanation!', { duration: 2000 });
    }

    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      
      // Scroll to quiz component
      if (quizRef.current) {
        quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === question.correct ? 1 : 0), totalQuestions);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'scenario':
        return <Brain className="text-purple-500" size={20} />;
      case 'calculation':
        return <Sparkles className="text-blue-500" size={20} />;
      case 'truefalse':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <CheckCircle className="text-teal-500" size={20} />;
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect Score! You\'re a Financial Literacy Champion!', color: 'text-yellow-500' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent! You\'ve mastered this lesson!', color: 'text-green-500' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Review the topics you missed.', color: 'text-blue-500' };
    if (percentage >= 40) return { emoji: '📚', message: 'Keep learning! Revisit the lesson content.', color: 'text-orange-500' };
    return { emoji: '💪', message: 'Don\'t give up! Review the lesson and try again.', color: 'text-red-500' };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border-2 border-teal-200 dark:border-teal-700">
        <div className="text-center">
          <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Quiz Completed!
          </h3>
          <p className={`text-xl font-semibold mb-6 ${scoreMessage.color}`}>
            {scoreMessage.message}
          </p>

          {/* Score Display */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 inline-block">
            <div className="flex items-center gap-4">
              <Trophy className="text-yellow-500" size={40} />
              <div className="text-left">
                <div className="text-4xl font-bold text-teal-600 dark:text-teal-400">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {percentage}% Correct
                </div>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Review Your Answers:</h4>
            <div className="space-y-3">
              {quiz.map((q, idx) => {
                const userAnswer = userAnswers.find(a => a.questionIndex === idx);
                return (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <div className={`flex-shrink-0 ${userAnswer?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {userAnswer?.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Q{idx + 1}:</span> {q.question}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              <RotateCcw size={20} />
              Retake Quiz
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              📚 Review Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={quizRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-teal-100 dark:border-teal-900">
      {/* Quiz Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Knowledge Check
            </h3>
          </div>
          <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Type Badge */}
      {question.type && (
        <div className="mb-4 flex items-center gap-2">
          {getQuestionTypeIcon(question.type)}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
            {question.type === 'truefalse' ? 'True/False' : question.type || 'Multiple Choice'}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {question.question}
        </h4>
        {question.context && (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            {question.context}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correct;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                showCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600'
                  : showIncorrect
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'
                  : isSelected
                  ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500 dark:border-teal-600'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-teal-400 dark:hover:border-teal-500'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  showCorrect
                    ? 'bg-green-500 text-white'
                    : showIncorrect
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {showCorrect ? <CheckCircle size={18} /> : showIncorrect ? <XCircle size={18} /> : String.fromCharCode(65 + idx)}
                </div>
                <span className={`flex-1 ${
                  showCorrect || showIncorrect
                    ? 'font-semibold'
                    : ''
                } ${
                  showCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : showIncorrect
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answer) */}
      {showResult && question.explanation && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Explanation:</p>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedAnswer === null
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center gap-2 group"
          >
            {currentQuestion < totalQuestions - 1 ? (
              <>
                <span>Next Question</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            ) : (
              'Complete Quiz 🎉'
            )}
          </button>
        )}
      </div>

      {/* Score Tracker */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-600 dark:text-gray-400">
          Current Score: <span className="font-semibold text-teal-600 dark:text-teal-400">{score}/{currentQuestion}</span>
        </div>
        {showResult && (
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium">
            {selectedAnswer === question.correct ? (
              <>
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600 dark:text-green-400">Correct!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 dark:text-red-400">Incorrect</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

// Display name for debugging
LessonQuiz.displayName = 'LessonQuiz';

export default LessonQuiz;
