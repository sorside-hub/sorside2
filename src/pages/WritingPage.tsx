import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { calculateReadTime } from '../content/articles';
import { useArticles } from '../context/ArticlesContext';
import { Article } from '../types';

const CATEGORIES = [
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

// Ambil cuplikan pembuka esai yang kaya dan substansial dari konten
const getArticleRichPreview = (article: Article): string => {
  const paragraphs = article.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !p.startsWith('>'));

  if (paragraphs.length === 0) return article.excerpt;

  let combined = paragraphs[0];
  let i = 1;
  while (combined.length < 180 && i < paragraphs.length) {
    combined += ' ' + paragraphs[i];
    i++;
  }
  return combined;
};

// Cuplikan cerdas saat pencarian aktif: jika kata kunci ada di isi naskah, potong konteks di sekitarnya
const getArticleSearchSnippet = (article: Article, query: string): { text: string; isSnippet: boolean } => {
  if (!query.trim()) {
    return { text: getArticleRichPreview(article), isSnippet: false };
  }

  const q = query.toLowerCase().trim();

  // Jika kata kunci ada di judul atau excerpt pembuka, tampilkan pembuka esai normal
  if (article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q)) {
    return { text: getArticleRichPreview(article), isSnippet: false };
  }

  // Jika kata kunci ditemukan lebih dalam di isi tulisan (content body)
  const cleanContent = article.content
    .replace(/[#*`_>]/g, ' ')
    .replace(/\s+/g, ' ');

  const matchIndex = cleanContent.toLowerCase().indexOf(q);
  if (matchIndex !== -1) {
    const start = Math.max(0, matchIndex - 60);
    const end = Math.min(cleanContent.length, matchIndex + q.length + 120);
    const prefix = start > 0 ? '... ' : '';
    const suffix = end < cleanContent.length ? ' ...' : '';
    return {
      text: `${prefix}${cleanContent.slice(start, end).trim()}${suffix}`,
      isSnippet: true,
    };
  }

  return { text: getArticleRichPreview(article), isSnippet: false };
};

// Helper sorotan teks lembut untuk kata kunci pencarian
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-200/80 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 font-semibold px-0.5 rounded-2xs"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
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
  const isSearching = searchQuery.trim().length > 0;
  const { articles: visibleArticles } = useArticles();

  const filteredArticles = useMemo(() => {
    return visibleArticles.filter((article) => {
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
  }, [visibleArticles, selectedCategoryId, searchQuery]);

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

      {/* Baris Filter Kategori & Pencarian (Seragam & Presisi dengan Halaman Musik) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 mb-10 sm:mb-14 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        {/* Category Filter Underline Tabs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-sans">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            const count =
              cat.id === 'all'
                ? visibleArticles.length
                : visibleArticles.filter((a) => a.category.toLowerCase() === cat.id).length;

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

        {/* Live Search Input (Ukuran & Style Serasi dengan Halaman Musik) */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="cari judul tulisan, esai, topik..."
            className="w-full pl-8 pr-8 py-1.5 bg-stone-100/60 dark:bg-stone-900/40 border border-[#E2DAC8] dark:border-[#2D2B26] rounded-none text-xs font-sans placeholder:text-stone-400 focus:outline-none focus:border-stone-700 dark:focus:border-stone-300 text-stone-900 dark:text-stone-100 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              aria-label="Hapus pencarian tulisan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Header Indikator Status Pencarian (Jika Pencarian Aktif) */}
      {isSearching && (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500">
              Pencarian Arsip Tulisan
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Hasil Pencarian untuk &ldquo;{searchQuery}&rdquo; ({filteredArticles.length} tulisan)
            </h2>
          </div>

          <button
            onClick={resetAllFilters}
            type="button"
            className="text-xs font-sans text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline cursor-pointer"
          >
            Reset Filter & Pencarian
          </button>
        </div>
      )}

      {/* Daftar Tulisan: Kiri Judul, Kanan Preview Isi Panjang (Jarak Antar Judul Lega) */}
      {filteredArticles.length > 0 ? (
        <div>
          <div className="divide-y divide-[#E2DAC8]/80 dark:divide-[#2D2B26]/80">
            {filteredArticles.map((article, index) => {
              const indexNumber = String(index + 1).padStart(2, '0');
              const categoryLabel = getCategoryLabel(article.category);
              const dateLabel = formatIndonesianDate(article.date, article.displayDate || article.date);
              const readTimeLabel = article.readTime?.replace(/min read/i, 'menit baca') || calculateReadTime(article.content);
              const { text: previewText, isSnippet } = getArticleSearchSnippet(article, searchQuery);

              return (
                <article
                  key={article.slug}
                  className="group py-10 sm:py-14 transition-colors hover:bg-stone-100/40 dark:hover:bg-stone-900/25 px-3 sm:px-6 -mx-3 sm:-mx-6"
                >
                  <Link
                    to={`/writing/${article.slug}`}
                    className="block"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
                      {/* SISI KIRI (lg:col-span-5): Judul & Meta Informasi */}
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                          <span className="font-semibold text-stone-400 dark:text-stone-500">{indexNumber}.</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">{categoryLabel}</span>
                          <span>·</span>
                          <span>{dateLabel}</span>
                          {readTimeLabel && (
                            <>
                              <span>·</span>
                              <span>{readTimeLabel}</span>
                            </>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-[1.22] tracking-tight">
                          {highlightText(article.title, searchQuery)}
                        </h2>
                      </div>

                      {/* SISI KANAN (lg:col-span-7): Preview Isi Panjang & Dalam + Tautan Aksi */}
                      <div className="lg:col-span-7 flex flex-col justify-between pt-0.5">
                        {isSnippet && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 block">
                            Cuplikan dari isi tulisan:
                          </span>
                        )}

                        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-sans leading-[1.88] line-clamp-4 sm:line-clamp-5">
                          {highlightText(previewText, searchQuery)}
                        </p>

                        <div className="mt-5 pt-3.5 border-t border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
                            baca lengkap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            {readTimeLabel || article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Info Status Arsip */}
          <div className="mt-12 pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-stone-500 dark:text-stone-400">
            <span>
              {isSearching
                ? `Menemukan ${filteredArticles.length} tulisan yang relevan`
                : `Menampilkan ${filteredArticles.length} tulisan dari arsip sorside`}
            </span>
            <span className="font-serif italic text-stone-600 dark:text-stone-400">
              &ldquo;Setiap tulisan adalah dokumentasi ruang & waktu.&rdquo;
            </span>
          </div>
        </div>
      ) : (
        /* Empty State Serasi dengan Halaman Musik */
        <div className="py-16 text-center border border-dashed border-[#E2DAC8] dark:border-[#2D2B26] p-8 max-w-xl mx-auto bg-[#EFE9DF]/20 dark:bg-[#1A1916]/20 my-8">
          <p className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200">
            Tidak ada tulisan yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Coba gunakan kata kunci topik lain (misal: <em>kota</em>, <em>refleksi</em>, <em>menunda</em>, <em>waktu</em>) atau pilih tab kategori di atas.
          </p>
          <button
            onClick={resetAllFilters}
            type="button"
            className="mt-6 px-4 py-2 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-sans font-semibold tracking-wider uppercase transition-opacity hover:opacity-85 cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
