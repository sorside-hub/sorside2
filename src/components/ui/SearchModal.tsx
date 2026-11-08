import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { ARTICLES } from '../../content/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or custom event
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? ARTICLES.filter((article) => {
        const q = query.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q) ||
          article.content.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/writing/${slug}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#F8F5F0] dark:bg-[#1E1C19] border border-stone-300 dark:border-stone-700/80 rounded-xl shadow-2xl overflow-hidden transition-all text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            placeholder="Search writings, topics, reflections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-mono text-stone-400 bg-stone-200/60 dark:bg-stone-800 dark:text-stone-500 rounded border border-stone-300 dark:border-stone-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-stone-200/60 dark:divide-stone-800/60">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-stone-500 dark:text-stone-400 text-sm">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-stone-400 dark:text-stone-600 stroke-[1.5]" />
              Type words to search across all writings.
            </div>
          ) : filteredArticles.length > 0 ? (
            <ul className="space-y-1">
              {filteredArticles.map((article) => (
                <li key={article.slug}>
                  <button
                    onClick={() => handleSelect(article.slug)}
                    className="w-full text-left p-3 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors group flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="text-[11px] font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1">
                        {article.category} · {article.displayDate}
                      </div>
                      <h4 className="text-base font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 mt-0.5 font-sans">
                        {article.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-2" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-stone-500 dark:text-stone-400 text-sm">
              No writings found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
