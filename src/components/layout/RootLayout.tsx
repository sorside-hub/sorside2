import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SearchModal } from '../ui/SearchModal';

export const RootLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFEA] dark:bg-[#161513] text-stone-900 dark:text-stone-100 transition-colors">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ openSearch: () => setIsSearchOpen(true) }} />
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
