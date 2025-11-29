import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group">
            <button
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white flex items-center gap-2"
                aria-label="Change Language"
            >
                <Globe size={20} />
                <span className="text-sm font-medium uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-800 transition-colors ${i18n.language.startsWith('en') ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                >
                    English
                </button>
                <button
                    onClick={() => changeLanguage('hi')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-800 transition-colors ${i18n.language.startsWith('hi') ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                >
                    हिंदी (Hindi)
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
