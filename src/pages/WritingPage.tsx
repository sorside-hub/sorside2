import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { ARTICLES } from '../content/articles';
import { ArticleCard } from '../components/ui/ArticleCard';

const CATEGORIES = ['All', 'Reflection', 'Opinion', 'Essay'];

export const WritingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read category directly from URL query param, matching case-insensitively
  const urlCategoryParam = searchParams.get('category');
  const selectedCategory = useMemo(() => {
    if (!urlCategoryParam) return 'All';
    const found = CATEGORIES.find(
      (c) => c.toLowerCase() === urlCategoryParam.toLowerCase()
    );
    return found || 'All';
  }, [urlCategoryParam]);

  const searchQuery = searchParams.get('q') || '';

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category.toLowerCase());
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      nextParams.set('q', value);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  };

  const clearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    setSearchParams(nextParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <p className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-2">
          Archive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Writing
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl font-sans leading-relaxed">
          Ruang untuk mengurai pikiran, menuangkan keresahan, dan merangkai pengalaman menjadi tulisan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                type="button"
                className={`px-3 py-1.5 text-xs font-sans font-medium rounded transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search archive..."
            className="w-full pl-9 pr-8 py-1.5 bg-transparent border border-stone-300 dark:border-stone-700/80 rounded text-xs font-sans placeholder:text-stone-400 focus:outline-none focus:border-stone-600 dark:focus:border-stone-400 text-stone-900 dark:text-stone-100"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <div className="divide-y divide-[#E2DAC8]/60 dark:divide-[#2D2B26]/60">
          {filteredArticles.map((article) => (
            <div key={article.slug} className="py-8 sm:py-10 first:pt-0 last:pb-0">
              <ArticleCard article={article} showImage={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-base font-serif italic text-stone-600 dark:text-stone-400">
            Tidak ada tulisan yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-4 px-4 py-2 text-xs font-sans font-medium text-stone-800 dark:text-stone-200 underline hover:no-underline"
          >
            Reset filter pencarian
          </button>
        </div>
      )}
    </div>
  );
};
