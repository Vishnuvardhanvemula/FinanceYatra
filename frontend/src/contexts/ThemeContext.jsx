import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import api from '../services/api';

const THEME_STORAGE_KEY = 'fy_selected_theme';

const ThemeContext = createContext({
  theme: 'default',
  setTheme: (_theme, _opts) => { },
  isDarkMode: false,
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children, defaultTheme = 'default' }) => {
  const [theme, setThemeState] = useState(defaultTheme);
  const [darkMode, setDarkMode] = useState(false);
  const prevThemeRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) setThemeState(saved);
      else setThemeState(defaultTheme);
    } catch (e) {
      setThemeState(defaultTheme);
    }
  }, [defaultTheme]);

  // dark mode persistence for legacy toggle usage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fy_dark_mode');
      setDarkMode(saved === 'true');
    } catch (e) { }
  }, []);

  useEffect(() => {
    // Apply theme as a class on the root element so the whole page can be themed
    const root = document?.documentElement;
    if (!root) return;
    const prev = prevThemeRef.current;
    if (prev) root.classList.remove(`theme-${prev}`);
    root.classList.add(`theme-${theme}`);
    prevThemeRef.current = theme;
  }, [theme]);

  // apply/remove dark class for Tailwind dark mode or legacy dark toggle
  useEffect(() => {
    const root = document?.documentElement;
    if (!root) return;
    if (darkMode) {
      root.classList.add('dark');
      // set sane dark-mode CSS variables
      root.style.setProperty('--fy-bg', '#081226');
      root.style.setProperty('--fy-surface', '#0b1220');
      root.style.setProperty('--fy-text', '#e6eef6');
      root.style.setProperty('--fy-muted', '#9aa6b2');
      root.style.setProperty('--fy-toast-bg', '#111827');
      root.style.setProperty('--fy-ring', 'rgba(255,255,255,0.06)');
    } else {
      root.classList.remove('dark');
      // set light-mode CSS variables
      root.style.setProperty('--fy-bg', '#ffffff');
      root.style.setProperty('--fy-surface', '#ffffff');
      root.style.setProperty('--fy-text', '#0f172a');
      root.style.setProperty('--fy-muted', '#6b7280');
      root.style.setProperty('--fy-toast-bg', '#f8fafc');
      root.style.setProperty('--fy-ring', 'rgba(15,23,42,0.04)');
    }
  }, [darkMode]);

  const persistToServer = async (userId, newTheme) => {
    if (!userId) return false;
    try {
      const res = await api.patch('/auth/preferences', { theme: newTheme });
      return res.status === 200;
    } catch (err) {
      console.warn('Theme persist failed', err);
      return false;
    }
  };

  const setTheme = async (newTheme, options = {}) => {
    setThemeState(newTheme);
    // Apply CSS variables for the selected theme so the whole page can use them
    try {
      const themeMap = {
        default: {
          // financeYatra brand teal palette
          start: '#14b8a6', // teal-500
          mid: '#0d9488', // teal-600
          end: '#0f766e', // teal-700
          accent: '#0f766e', // teal-700 for accents
          text: '#ffffff' // white text for dark gradients
        },
        bronze: {
          start: '#b45309', // orange-700
          mid: '#d97706', // amber-500
          end: '#f59e0b', // yellow-600
          accent: '#f97316',
          text: '#ffffff'
        },
        silver: {
          start: '#4b5563',
          mid: '#94a3b8',
          end: '#64748b',
          accent: '#6b7280',
          text: '#ffffff'
        },
        gold: {
          start: '#f59e0b',
          mid: '#f97316',
          end: '#f97316',
          accent: '#f59e0b',
          text: '#ffffff'
        },
        platinum: {
          start: '#7c3aed',
          mid: '#c026d3',
          end: '#ec4899',
          accent: '#a78bfa',
          text: '#ffffff'
        },
        master: {
          start: '#312e81',
          mid: '#4338ca',
          end: '#7c3aed',
          accent: '#6366f1',
          text: '#ffffff'
        }
      };
      const chosen = themeMap[newTheme] || themeMap.default;
      const root = document?.documentElement;
      if (root) {
        root.style.setProperty('--fy-gradient-start', chosen.start);
        root.style.setProperty('--fy-gradient-mid', chosen.mid);
        root.style.setProperty('--fy-gradient-end', chosen.end);
        root.style.setProperty('--fy-accent', chosen.accent);
        root.style.setProperty('--fy-theme-text', chosen.text);
      }
    } catch (e) {
      // ignore
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      // ignore
    }

    // try persist to server when a userId is provided
    const userId = options.userId || options.user?.id;
    if (userId) {
      const ok = await persistToServer(userId, newTheme);
      if (!ok) {
        // nothing to do; localStorage already holds it
      }
    }
  };

  const toggleTheme = () => {
    setDarkMode((s) => {
      const next = !s;
      try { localStorage.setItem('fy_dark_mode', String(next)); } catch (e) { }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode: darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
