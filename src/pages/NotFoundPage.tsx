import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-24 sm:py-32 text-center">
      <p className="text-xs font-mono tracking-widest text-stone-400 dark:text-stone-500 mb-3">
        404
      </p>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
        Page Not Found
      </h1>

      <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-sans leading-relaxed mb-8 max-w-md mx-auto">
        Halaman yang Anda tuju tidak ditemukan atau mungkin telah dipindahkan.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-sans font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#E2DAC8] dark:border-[#2D2B26] text-stone-800 dark:text-stone-200 text-xs font-sans font-medium hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
        >
          Explore Writing
        </Link>
      </div>
    </div>
  );
};
