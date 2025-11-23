/**
 * Detailed Lesson Content for All Modules
 * Contains comprehensive educational content for each lesson
 * 
 * Structure: Each module is imported from separate files for better organization
 */

// Import module content from separate files
import { module1Content } from './modules/module-1-banking.js';
import { module2Content } from './modules/module-2-digital-payments.js';
import { module4Content } from './modules/module-4-budgeting.js';
import { module5Content } from './modules/module-5-insurance.js';
// Additional module imports will be added as they are created

/**
 * Main lesson content object
 * Maps module IDs to their respective content imported from module files
 */
export const lessonContent = {
  // Module 1: Banking Basics (5 lessons, 26 quizzes)
  'module-1': module1Content,
  
  // Module 2: Digital Payments (4 lessons, 21 quizzes)
  'module-2': module2Content,
  
  // Module 4: Saving & Budgeting (5 lessons, 30 quizzes)
  'module-4': module4Content,
  
  // Module 5: Insurance Essentials (6 lessons, 36 quizzes)
  'module-5': module5Content,
  
  // Modules 3, 6-15 will be imported here as they are completed
  // 'module-3': module3Content,
  // 'module-6': module6Content,
  // ... and so on
};

/**
 * Get lesson content by module ID and lesson index
 * @param {string} moduleId - The module identifier (e.g., 'module-1')
 * @param {number} lessonIndex - The index of the lesson within the module (0-based)
 * @returns {Object|null} - Lesson content object or null if not found
 */
export const getLessonContent = (moduleId, lessonIndex) => {
  const module = lessonContent[moduleId];
  if (!module || !module.lessons) return null;
  
  return module.lessons[lessonIndex] || null;
};

/**
 * Get all lessons for a module
 * @param {string} moduleId - The module identifier (e.g., 'module-1')
 * @returns {Array} - Array of lesson objects
 */
export const getModuleLessons = (moduleId) => {
  const module = lessonContent[moduleId];
  return module ? module.lessons : [];
};

/**
 * Check if lesson content exists for a module
 * @param {string} moduleId - The module identifier (e.g., 'module-1')
 * @returns {boolean} - True if module has content, false otherwise
 */
export const hasLessonContent = (moduleId) => {
  return lessonContent.hasOwnProperty(moduleId);
};
