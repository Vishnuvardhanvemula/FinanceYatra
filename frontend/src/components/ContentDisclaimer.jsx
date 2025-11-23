/**
 * Content Disclaimer Component
 * Displays important disclaimer about educational content accuracy
 */

import React, { useState } from 'react';
import { AlertTriangle, X, ExternalLink, Info } from 'lucide-react';

const ContentDisclaimer = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-white" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white">Content Accuracy Notice</h2>
                <p className="text-yellow-100 text-sm mt-1">Important information about our educational content</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Message */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Info className="text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  For Educational Purposes Only
                </p>
                <p className="text-yellow-800 dark:text-yellow-400 text-sm">
                  The content in this application is generated for <strong>learning purposes</strong> and 
                  may not reflect current rates, fees, or regulations as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}.
                </p>
              </div>
            </div>
          </div>

          {/* What to Verify */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              ⚠️ Always Verify:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong>Interest Rates:</strong> Check with your bank for current FD, RD, and savings rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong>Fees & Charges:</strong> Minimum balance, ATM fees, and service charges vary by bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong>Tax Limits:</strong> Section 80C limits and TDS thresholds may change annually</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong>Regulations:</strong> Banking rules and insurance limits may have been updated</span>
              </li>
            </ul>
          </div>

          {/* Official Sources */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              🔗 Official Sources:
            </h3>
            <div className="space-y-2">
              <a
                href="https://www.rbi.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Reserve Bank of India (RBI)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Banking regulations & guidelines</div>
                </div>
                <ExternalLink className="text-gray-400 group-hover:text-teal-500" size={20} />
              </a>

              <a
                href="https://www.dicgc.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">DICGC</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Deposit insurance information</div>
                </div>
                <ExternalLink className="text-gray-400 group-hover:text-teal-500" size={20} />
              </a>

              <a
                href="https://www.incometax.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Income Tax Department</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tax slabs, limits & ITR filing</div>
                </div>
                <ExternalLink className="text-gray-400 group-hover:text-teal-500" size={20} />
              </a>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-teal-900 dark:text-teal-300 mb-2">
              💡 Best Practice:
            </h3>
            <p className="text-teal-800 dark:text-teal-400 text-sm">
              Use this app to <strong>learn concepts and terminology</strong>, then verify specific 
              rates, limits, and regulations with official sources before making any financial decisions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                I Understand
              </button>
            )}
            <a
              href="/CONTENT_ACCURACY_DISCLAIMER.md"
              target="_blank"
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-center"
            >
              Read Full Disclaimer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisclaimer;
