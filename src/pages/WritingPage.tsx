import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../content/articles';

interface CategoryConfig {
  id: string;
  label: string;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'all', label: 'semua' },
  { id: 'reflection', label: 'refleksi' },
  { id: 'essay', label: 'esai' },
  { id: 'opinion', label: 'opini' },
];

const formatIndonesianDate = (dateStr: string, fallback: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return fallback;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return fallback;
  }
};

const getCategoryLabel = (category: string): string => {
  const normalized = category.toLowerCase().trim();
  switch (normalized) {
    case 'reflection':
      return 'Refleksi';
    case 'essay':
      return 'Esai';
    case 'opinion':
      return 'Opini';
    default:
      return category;
  }
};

export const WritingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read category directly from URL query param, matching case-insensitively
  const urlCategoryParam = searchParams.get('category')?.toLowerCase();
  const selectedCategoryId = useMemo(() => {
    if (!urlCategoryParam) return 'all';
    const found = CATEGORIES.find((c) => c.id === urlCategoryParam);
    return found ? found.id : 'all';
  }, [urlCategoryParam]);

  const searchQuery = searchParams.get('q') || '';

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategoryId === 'all' ||
        article.category.toLowerCase() === selectedCategoryId;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  const handleCategoryChange = (catId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
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
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
      {/* Header Halaman */}
      <div className="mb-10 sm:mb-14 pb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="max-w-3xl">
          <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-500 dark:text-stone-400 mb-2">
            arsip kata · sorside
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            katalog tulisan<span className="text-stone-400 dark:text-stone-600 font-normal">.</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
            Ruang untuk mengurai pikiran, menuangkan keresahan, dan merangkai pengamatan kota menjadi tulisan yang jujur. Murni teks, tanpa distorsi visual.
          </p>
        </div>
      </div>

      {/* Baris Filter Kategori & Pencarian (Indonesian Minimalist) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 mb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        {/* Category Filter Underline Tabs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-sans">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            const count =
              cat.id === 'all'
                ? ARTICLES.length
                : ARTICLES.filter((a) => a.category.toLowerCase() === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                type="button"
                className={`pb-1 uppercase tracking-wider text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium'
                }`}
              >
                {cat.label} <span className="text-[10px] font-mono opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="cari tulisan..."
            className="w-full pl-8 pr-8 py-1.5 bg-stone-100/60 dark:bg-stone-900/40 border border-[#E2DAC8] dark:border-[#2D2B26] rounded-none text-xs font-sans placeholder:text-stone-400 focus:outline-none focus:border-stone-700 dark:focus:border-stone-300 text-stone-900 dark:text-stone-100 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Daftar Tulisan Pure Text (Broadsheet Catalogue Layout) */}
      {filteredArticles.length > 0 ? (
        <div>
          <div className="divide-y divide-[#E2DAC8]/70 dark:divide-[#2D2B26]/70">
            {filteredArticles.map((article, index) => {
              const indexNumber = String(index + 1).padStart(2, '0');
              const categoryLabel = getCategoryLabel(article.category);
              const dateLabel = formatIndonesianDate(article.date, article.displayDate);
              const readTimeLabel = article.readTime?.replace(/min read/i, 'menit baca') || '';

              return (
                <article
                  key={article.slug}
                  className="group py-7 sm:py-9 transition-colors hover:bg-stone-100/50 dark:hover:bg-stone-900/30 px-3 sm:px-5 -mx-3 sm:-mx-5"
                >
                  <Link
                    to={`/writing/${article.slug}`}
                    className="block"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-start">
                      {/* Nomor Urut Katalog Monospace */}
                      <div className="hidden lg:block lg:col-span-1 pt-1">
                        <span className="font-mono text-xs text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                          {indexNumber}.
                        </span>
                      </div>

                      {/* Judul & Meta Informasi */}
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                          <span className="lg:hidden font-semibold text-stone-400">{indexNumber}.</span>
                          <span className="font-semibold text-stone-700 dark:text-stone-300">{categoryLabel}</span>
                          <span>·</span>
                          <span>{dateLabel}</span>
                          {readTimeLabel && (
                            <>
                              <span>·</span>
                              <span>{readTimeLabel}</span>
                            </>
                          )}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                          {article.title}
                        </h2>
                      </div>

                      {/* Cuplikan Esai (Excerpt) */}
                      <div className="lg:col-span-5 pt-0.5">
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Tautan Aksi */}
                      <div className="lg:col-span-1 flex lg:justify-end items-center pt-1">
                        <span className="inline-flex items-center gap-1 text-xs font-sans font-medium text-stone-900 dark:text-stone-200 group-hover:translate-x-1 transition-transform">
                          baca <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Info Status Arsip */}
          <div className="mt-10 pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-stone-500 dark:text-stone-400">
            <span>Menampilkan {filteredArticles.length} tulisan dari arsip sorside</span>
            <span className="font-serif italic text-stone-600 dark:text-stone-400">
              &ldquo;Setiap tulisan adalah dokumentasi ruang & waktu.&rdquo;
            </span>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-base font-serif italic text-stone-600 dark:text-stone-400">
            Tidak ada tulisan yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-4 px-4 py-2 text-xs font-sans font-medium text-stone-800 dark:text-stone-200 underline hover:no-underline cursor-pointer"
          >
            reset filter pencarian
          </button>
        </div>
      )}
    </div>
  );
};
