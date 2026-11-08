import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', end: true },
    { name: 'Writing & Essays', href: '/writing', end: false },
    { name: 'Music Archive', href: '/music', end: false },
    { name: 'About Sor', href: '/about', end: false },
  ];

  return (
    <header className="w-full bg-[#F4EFEA] dark:bg-[#161513] transition-colors border-b border-[#E2DAC8] dark:border-[#2D2B26] sticky top-0 z-40">
      {/* 1. Sleek Centered Masthead (Compact) */}
      <div className="w-full px-6 lg:px-12 xl:px-16 py-3 sm:py-4 flex flex-col items-center justify-center text-center">
        <Link
          to="/"
          className="group inline-block"
        >
          <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:opacity-90 transition-opacity">
            sorside<span className="text-stone-500 font-normal">.</span>
          </span>
          <span className="block text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 mt-0.5">
            Words · Sounds · Observations
          </span>
        </Link>
      </div>

      {/* 2. Tab Navigation Bar: Search (Left), Centered Tabs (Middle), Theme (Right) */}
      <div className="w-full border-t border-[#E2DAC8] dark:border-[#2D2B26] bg-[#F4EFEA]/80 dark:bg-[#161513]/80 backdrop-blur-xs">
        <div className="w-full px-6 lg:px-12 xl:px-16 h-11 flex items-center justify-between relative">
          {/* Left: Search Trigger */}
          <div className="flex items-center z-10">
            <button
              onClick={onOpenSearch}
              type="button"
              className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer text-xs font-sans"
              title="Search archive (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
              <span className="hidden sm:inline text-stone-600 dark:text-stone-400">Search</span>
              <kbd className="hidden md:inline-block px-1 py-0.2 bg-stone-200/80 dark:bg-stone-800 text-[9px] font-mono rounded text-stone-500">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Center: Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-8 text-xs uppercase tracking-[0.16em] font-sans text-stone-600 dark:text-stone-400 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.name}>
                {idx > 0 && (
                  <span className="text-stone-300 dark:text-stone-700 select-none">/</span>
                )}
                <NavLink
                  to={link.href}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-2 py-1 transition-colors hover:text-stone-950 dark:hover:text-stone-100 ${
                      isActive
                        ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
                        : 'font-medium'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 z-10">
            <ThemeToggle />

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-1.5 text-stone-700 dark:text-stone-300 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2DAC8] dark:border-[#2D2B26] bg-[#F4EFEA] dark:bg-[#161513] px-6 py-5 transition-all">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-serif py-1.5 transition-colors ${
                    isActive
                      ? 'text-stone-950 dark:text-stone-50 font-bold'
                      : 'text-stone-700 dark:text-stone-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 mt-3 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex items-center justify-between text-[11px] text-stone-500">
            <span>Ruang karya mandiri Sor.</span>
            <span className="font-serif italic">&ldquo;A collection of sides.&rdquo;</span>
          </div>
        </div>
      )}
    </header>
  );
};
