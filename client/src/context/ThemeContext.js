import React, { createContext, useContext, useEffect } from 'react';
import { colorPalettes } from '@shared/constants/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const checkDarkMode = () => {
    return (
      localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  };

  const toggleDarkMode = () => {
    const isDark = checkDarkMode();
    document.documentElement.setAttribute(
      'data-color-scheme',
      isDark ? 'dark' : 'light'
    );
    localStorage.setItem('darkMode', !isDark);
  };

  useEffect(() => {
    const isDark = checkDarkMode();
    document.documentElement.setAttribute(
      'data-color-scheme',
      isDark ? 'dark' : 'light'
    );
  }, []);

  const switchTheme = (themeId) => {
    const theme = colorPalettes[themeId];
    if (theme) {
      document.documentElement.style.setProperty('--color-primary', theme.primary);
      document.documentElement.style.setProperty('--color-secondary', theme.secondary);
      document.documentElement.style.setProperty('--color-accent', theme.accent);
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 