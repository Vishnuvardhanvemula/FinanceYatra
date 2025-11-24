/**
 * Interactive Lesson Quiz Component
 * "Mission Briefing" Aesthetic
 */

import React, { useState, useRef, memo } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Sparkles, Brain, AlertCircle, Terminal, Activity, ArrowRight, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('SELECT_OPTION_REQUIRED');
      return;
    }

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
      toast.success('ANSWER_CORRECT: Data Verified', {
        icon: '✅',
        style: { background: '#064e3b', color: '#34d399', border: '1px solid #059669' }
      });
    } else {
      toast.error('ANSWER_INCORRECT: Adjust Parameters', {
        icon: '❌',
        style: { background: '#450a0a', color: '#f87171', border: '1px solid #dc2626' }
      });
    }

    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);

      if (quizRef.current) {
        quizRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Calculate final score including current question
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0);
      const percentage = Math.round((finalScore / totalQuestions) * 100);

      setQuizCompleted(true);
      if (onComplete) {
        onComplete(percentage); // Pass percentage score (0-100) instead of raw score
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
      case 'scenario': return <Brain className="text-purple-400" size={18} />;
      case 'calculation': return <Sparkles className="text-yellow-400" size={18} />;
      case 'truefalse': return <AlertCircle className="text-cyan-400" size={18} />;
      default: return <Terminal className="text-cyan-400" size={18} />;
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 60;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0b101b] border border-cyan-500/30 rounded-xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />

        <div className="text-center relative z-10">
          <div className="mb-6 inline-flex p-4 rounded-full bg-cyan-950/30 border border-cyan-500/50">
            <Trophy className={passed ? "text-yellow-400" : "text-gray-400"} size={48} />
          </div>

          <h3 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            SIMULATION_COMPLETE
          </h3>

          <div className="text-4xl font-bold text-white mb-2 font-mono">
            {score}/{totalQuestions} <span className="text-lg text-gray-500">CORRECT</span>
          </div>

          <div className={`text-sm font-mono mb-8 ${passed ? 'text-green-400' : 'text-red-400'}`}>
            ACCURACY: {percentage}% // {passed ? 'PASSED' : 'FAILED'}
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800 text-left">
            <h4 className="font-mono text-cyan-500 text-sm mb-4 flex items-center gap-2">
              <Activity size={16} />
              PERFORMANCE_LOG
            </h4>
            <div className="space-y-3">
              {quiz.map((q, idx) => {
                const userAnswer = userAnswers.find(a => a.questionIndex === idx);
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded bg-black/20 border border-gray-800">
                    <div className={`mt-0.5 ${userAnswer?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {userAnswer?.isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono mb-1">QUERY_{idx + 1}</div>
                      <div className="text-sm text-gray-300">{q.question}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30 transition-all font-mono text-sm"
            >
              <RotateCcw size={18} />
              REBOOT_SIMULATION
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={quizRef} className="bg-gray-900/30 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-950/30 rounded border border-cyan-500/20">
            <Brain className="text-cyan-400" size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wider">TRAINING_MODULE</h3>
            <div className="text-xs text-cyan-500/60 font-mono">Sequence {currentQuestion + 1}/{totalQuestions}</div>
          </div>
        </div>
        <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          {getQuestionTypeIcon(question.type)}
          <span className="text-xs font-mono text-cyan-500 uppercase tracking-wider">
            {question.type || 'Standard_Query'}
          </span>
        </div>
        <h4 className="text-xl text-gray-100 font-medium leading-relaxed">
          {question.question}
        </h4>
        {question.context && (
          <div className="mt-4 p-4 bg-purple-900/10 border-l-2 border-purple-500 text-sm text-gray-300 italic">
            {question.context}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correct;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;

          let borderClass = 'border-gray-700 hover:border-cyan-500/50';
          let bgClass = 'bg-gray-900/50';
          let textClass = 'text-gray-300';

          if (showCorrect) {
            borderClass = 'border-green-500';
            bgClass = 'bg-green-900/20';
            textClass = 'text-green-400';
          } else if (showIncorrect) {
            borderClass = 'border-red-500';
            bgClass = 'bg-red-900/20';
            textClass = 'text-red-400';
          } else if (isSelected) {
            borderClass = 'border-cyan-500';
            bgClass = 'bg-cyan-950/30';
            textClass = 'text-cyan-300';
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group relative overflow-hidden ${borderClass} ${bgClass}`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border ${isSelected || showCorrect || showIncorrect ? 'border-transparent bg-white/10' : 'border-gray-600 text-gray-500'
                  }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`flex-1 ${textClass}`}>{option}</span>
                {(showCorrect || showIncorrect) && (
                  showCorrect ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <Info className="text-blue-400 mt-1" size={18} />
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">DATA_ANALYSIS</div>
                <p className="text-sm text-blue-100/80 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex justify-end pt-4 border-t border-gray-800">
        {!showResult ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-lg font-mono text-sm font-bold tracking-wider transition-all ${selectedAnswer === null
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-[0_0_20px_rgba(8,145,178,0.4)]'
              }`}
          >
            VERIFY_DATA
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-sm font-bold tracking-wider shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all"
          >
            {currentQuestion < totalQuestions - 1 ? 'NEXT_SEQUENCE' : 'COMPLETE_SIMULATION'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
});

LessonQuiz.displayName = 'LessonQuiz';

export default LessonQuiz;
