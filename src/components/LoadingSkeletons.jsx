/**
 * Loading Skeleton Components
 * Reusable loading placeholders for better UX
 */

import React from 'react';

// Quiz loading skeleton
export const QuizSkeleton = () => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 animate-pulse">
    {/* Progress bar skeleton */}
    <div className="mb-6">
      <div className="h-2 bg-gray-700 rounded-full w-full"></div>
      <div className="flex justify-between mt-2">
        <div className="h-3 bg-gray-700 rounded w-24"></div>
        <div className="h-3 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
    
    {/* Question skeleton */}
    <div className="mb-8">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
    
    {/* Answer options skeleton */}
    <div className="space-y-3 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-gray-700 rounded-lg"></div>
      ))}
    </div>
    
    {/* Button skeleton */}
    <div className="flex justify-center">
      <div className="h-10 bg-gray-700 rounded w-32"></div>
    </div>
  </div>
);

// Modal loading skeleton
export const ModalSkeleton = () => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
      <div className="h-10 bg-gray-700 rounded w-32 mx-auto"></div>
    </div>
  </div>
);

// Module content skeleton
export const ModuleContentSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-2 bg-gray-700 rounded w-full mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content skeleton */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Lesson list skeleton
export const LessonListSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="h-14 bg-gray-700 rounded-lg"></div>
    ))}
  </div>
);

export default {
  QuizSkeleton,
  ModalSkeleton,
  ModuleContentSkeleton,
  LessonListSkeleton,
};
