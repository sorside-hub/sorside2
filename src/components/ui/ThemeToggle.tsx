import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { mode, cycleTheme } = useTheme();

  const getIcon = () => {
    switch (mode) {
      case 'light':
        return <Sun className="w-4 h-4 text-stone-700 dark:text-stone-300 transition-transform duration-200 hover:rotate-45" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-stone-700 dark:text-stone-300 transition-transform duration-200 hover:-rotate-12" />;
      case 'system':
      default:
        return <Monitor className="w-4 h-4 text-stone-700 dark:text-stone-300 transition-transform duration-200" />;
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'light':
        return 'Theme: Light (click for dark)';
      case 'dark':
        return 'Theme: Dark (click for system)';
      case 'system':
        return 'Theme: System (click for light)';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      aria-label={getLabel()}
      title={getLabel()}
      className={`p-2 rounded-md hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-600 ${className}`}
    >
      {getIcon()}
    </button>
  );
};
