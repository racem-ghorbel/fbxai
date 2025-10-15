import React from 'react';
import { CubeIcon, MoonIcon, SunIcon } from './icons/Icons';

interface HeaderProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <CubeIcon className="w-10 h-10 text-blue-600"/>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">مولّد صور إلى FBX</h1>
                <p className="text-gray-500 dark:text-gray-400">حوّل صورك إلى نماذج ثلاثية الأبعاد بسهولة</p>
            </div>
        </div>
        <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
        >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;