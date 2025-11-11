/**
 * Onboarding Page
 * Initial setup after user registration
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const handleStart = () => {
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="h-2 bg-indigo-600 dark:bg-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24 text-indigo-600 dark:text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                Welcome, {user.name}!
              </h1>
              <p className="text-xl font-semibold text-indigo-600 dark:text-teal-400 mb-4">
                From Saving to Success — Your FinYatra Begins
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                Discover, understand, and master money with interactive learning
              </p>
              <button
                onClick={() => setStep(2)}
                className="bg-indigo-600 dark:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-teal-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-6">🎯</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  How It Works
                </h2>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-teal-900/30 text-indigo-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Ask Questions</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Type or speak your financial questions in any of 11 supported languages
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-teal-900/30 text-indigo-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">AI Analyzes Your Level</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our AI automatically detects your proficiency (beginner/intermediate/expert)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-teal-900/30 text-indigo-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Personalized Learning</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get answers tailored to your level, track progress, and earn achievements
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full bg-indigo-600 dark:bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-teal-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="mb-6 flex justify-center">
                  <svg className="w-24 h-24 text-indigo-600 dark:text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  You're All Set!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your proficiency level will be automatically detected after you ask a few questions.
                  No quiz needed!
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-teal-900/20 border border-indigo-200 dark:border-teal-800 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-indigo-900 dark:text-teal-300 mb-3">
                  ✨ Features You'll Love:
                </h3>
                <ul className="space-y-2 text-indigo-800 dark:text-teal-400">
                  <li>• 🎤 Voice input in 11 languages</li>
                  <li>• 🔊 Natural voice responses</li>
                  <li>• 📊 Progress tracking & achievements</li>
                  <li>• 🧠 AI-powered proficiency detection</li>
                  <li>• 🌍 Multilingual support (EN, HI, BN, TE, MR, TA, GU, KN, ML, PA, UR)</li>
                </ul>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-indigo-600 dark:bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-teal-700 transition-colors text-lg flex items-center justify-center gap-2 group"
              >
                <span>Start Learning</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Skip Link */}
        {step < 3 && (
          <div className="text-center mt-6">
            <button
              onClick={handleStart}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              Skip onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
