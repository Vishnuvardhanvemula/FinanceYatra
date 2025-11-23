import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex justify-center gap-3">
          <Link to="/" className="px-5 py-3 rounded-lg shadow" style={{ background: 'var(--fy-gradient-start, #14b8a6)', color: 'var(--fy-theme-text, #fff)' }}>Go Home</Link>
          <Link to="/modules" className="px-5 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">Browse Modules</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
