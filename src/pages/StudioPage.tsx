import React from 'react';
import { Studio } from 'sanity';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import sanityConfig from '../sanity.config';

export const StudioPage: React.FC = () => {
  return (
    <div className="w-full h-screen h-[100dvh] max-h-[100dvh] fixed inset-0 z-[9999] bg-[#161513] flex flex-col overflow-hidden">
      {/* Top Bar Akses Cepat Kembali ke Web (Sangat penting di mobile) */}
      <header className="h-11 sm:h-12 bg-[#1C1B18] border-b border-[#2D2B26] px-3 sm:px-5 flex items-center justify-between text-xs font-sans text-stone-300 shrink-0 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-stone-200 hover:text-white font-medium transition-colors py-1 px-2 rounded hover:bg-stone-800"
        >
          <ArrowLeft className="w-4 h-4 text-stone-400" />
          <span>Kembali ke sorside</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/music"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200"
          >
            <span>Katalog Musik</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-stone-800 text-stone-400 border border-stone-700 rounded">
            CMS Studio
          </span>
        </div>
      </header>

      {/* Sanity Studio Container */}
      <div className="flex-1 w-full relative overflow-hidden">
        <Studio config={sanityConfig} />
      </div>
    </div>
  );
};
