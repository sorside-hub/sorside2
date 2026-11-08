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
    { name: 'beranda', href: '/', end: true },
    { name: 'tulisan', href: '/writing', end: false },
    { name: 'musik', href: '/music', end: false },
    { name: 'tentang', href: '/about', end: false },
  ];

  return (
    <header className="w-full bg-[#F4EFEA]/90 dark:bg-[#161513]/90 backdrop-blur-md transition-colors border-b border-[#E2DAC8] dark:border-[#2D2B26] sticky top-0 z-40">
      {/* SINGLE SLEEK HORIZONTAL BAR (TIDAK MAKAN RUANG VERTIKAL) */}
      <div className="w-full px-6 lg:px-12 xl:px-16 h-14 sm:h-16 flex items-center justify-between relative">
        {/* Pojok Kiri: Logo sorside. */}
        <div className="flex items-center z-10">
          <Link
            to="/"
            className="group flex items-center"
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:opacity-80 transition-opacity">
              sorside<span className="text-stone-500 font-normal">.</span>
            </span>
          </Link>
        </div>

        {/* Tengah: Tab Navigasi (Desktop) */}
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

        {/* Pojok Kanan: Tombol Cari (di kiri tema) + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          {/* Tombol Cari */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer text-xs font-sans"
            title="Cari arsip (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span className="hidden sm:inline text-stone-600 dark:text-stone-400">cari</span>
            <kbd className="hidden md:inline-block px-1 py-0.2 bg-stone-200/80 dark:bg-stone-800 text-[9px] font-mono rounded text-stone-500">
              ⌘K
            </kbd>
          </button>

          {/* Pemisah Halus */}
          <span className="hidden sm:inline text-stone-300 dark:text-stone-700 select-none">|</span>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="md:hidden p-1.5 text-stone-700 dark:text-stone-300 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
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
