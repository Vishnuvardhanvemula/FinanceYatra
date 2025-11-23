import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  const [languages, setLanguages] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch supported languages from backend
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/languages`);
        setLanguages(response.data);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        // Fallback to default languages
        setLanguages({
          'en': { name: 'English', nativeName: 'English' },
          'hi': { name: 'Hindi', nativeName: 'हिंदी' },
          'te': { name: 'Telugu', nativeName: 'తెలుగు' },
          'ta': { name: 'Tamil', nativeName: 'தமிழ்' },
          'bn': { name: 'Bengali', nativeName: 'বাংলা' }
        });
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages[selectedLanguage] || { name: 'English', nativeName: 'English' };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select Language"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {currentLanguage.nativeName}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-[200px] max-h-[400px] overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Select Language
            </div>
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedLanguage === code 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default LanguageSelector;
