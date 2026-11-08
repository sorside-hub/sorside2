import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { marked } from 'marked';
import { ARTICLES } from '../content/articles';

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

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Always scroll to top when opening an article or navigating prev/next
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const currentIndex = useMemo(() => {
    return ARTICLES.findIndex((a) => a.slug === slug);
  }, [slug]);

  if (currentIndex === -1) {
    return <Navigate to="/writing" replace />;
  }

  const article = ARTICLES[currentIndex];
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const categoryLabel = getCategoryLabel(article.category);
  const dateLabel = formatIndonesianDate(article.date, article.displayDate);
  const readTimeLabel = article.readTime?.replace(/min read/i, 'menit baca') || '';

  // Render markdown safely
  const parsedHtml = useMemo(() => {
    return marked.parse(article.content, { async: false }) as string;
  }, [article.content]);

  return (
    <article className="w-full bg-[#F4EFEA] dark:bg-[#161513] transition-colors pb-16 sm:pb-24">
      {/* 1. FULL-WIDTH TOP BREADCRUMB STRIP */}
      <div className="w-full border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#F4EFEA]/80 dark:bg-[#161513]/80 backdrop-blur-xs">
        <div className="w-full px-6 lg:px-12 xl:px-16 h-12 flex items-center justify-between text-xs font-sans">
          <Link
            to="/writing"
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>kembali ke katalog tulisan</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300">{categoryLabel}</span>
            <span>·</span>
            <span>Arsip {String(currentIndex + 1).padStart(2, '0')} / {String(ARTICLES.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER (Centred Reading Measure) */}
      <header className="max-w-3xl mx-auto px-6 sm:px-8 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 sm:mb-4">
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

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.12] tracking-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-stone-700 dark:text-stone-300 font-serif italic leading-relaxed">
            &ldquo;{article.excerpt}&rdquo;
          </p>
        )}
      </header>

      {/* 3. COVER IMAGE (FULL-WIDTH / EDGE-TO-EDGE jika ada) */}
      {article.coverImage ? (
        <div className="w-full my-6 sm:my-10 border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <div className="w-full h-[320px] sm:h-[440px] lg:h-[540px] xl:h-[600px] relative">
            <img
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              className="w-full h-full object-cover grayscale-[12%]"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          {article.coverAlt && (
            <div className="w-full px-6 lg:px-12 xl:px-16 py-2.5 bg-[#EFE9DF]/80 dark:bg-[#181714]/80 border-t border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 flex items-center justify-between text-[11px] font-sans text-stone-500 dark:text-stone-400">
              <span className="italic">{article.coverAlt}</span>
              <span className="font-mono text-[10px] uppercase">Dokumentasi Visual</span>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="w-full border-t border-[#E2DAC8] dark:border-[#2D2B26] my-6 sm:my-8" />
        </div>
      )}

      {/* 4. ISI TULISAN PANJANG (Comfortable Reading Column) */}
      <div className="max-w-2xl sm:max-w-3xl mx-auto px-6 sm:px-8 py-4 sm:py-6">
        <div
          className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg leading-[1.88] font-sans text-stone-800 dark:text-stone-200
            [&>p]:mb-6
            [&>p]:text-stone-800 dark:[&>p]:text-stone-200
            [&>p:first-of-type]:text-lg sm:[&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed
            [&>h3]:text-2xl sm:[&>h3]:text-3xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:text-stone-900 dark:[&>h3]:text-stone-100 [&>h3]:tracking-tight
            [&>blockquote]:my-10 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:border-l-2 [&>blockquote]:border-stone-900 dark:[&>blockquote]:border-stone-100 [&>blockquote]:italic [&>blockquote]:font-serif [&>blockquote]:text-xl sm:[&>blockquote]:text-2xl [&>blockquote]:text-stone-900 dark:[&>blockquote]:text-stone-100 [&>blockquote]:bg-[#EFE9DF]/40 dark:[&>blockquote]:bg-[#1A1916]/40
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      </div>

      {/* 5. FULL-WIDTH AUTHOR COLOPHON & IMPRINT NOTE */}
      <div className="w-full border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/50 dark:bg-[#181714]/50 py-10 sm:py-14 my-14 sm:my-20">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
                kolofon tulisan · sorside
              </p>
              <h4 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Ditulis dari sudut ruang mandiri.
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans max-w-lg leading-relaxed">
                Tulisan ini dirangkai tanpa tuntutan algoritma atau viralitas. Arsip ini bebas dibaca dan direfleksikan kembali dalam ritme tenang.
              </p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8 md:border-l border-[#E2DAC8] dark:border-[#2D2B26] shrink-0">
              <span className="font-serif italic text-sm text-stone-700 dark:text-stone-300 block">
                &ldquo;Every side has a story.&rdquo;
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-stone-500 mt-1 block">
                — Sor, Catatan Studio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FULL-WIDTH SPLIT PREV / NEXT NAVIGATION */}
      <nav
        aria-label="Navigasi tulisan"
        className="w-full px-6 lg:px-12 xl:px-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-4">
          {prevArticle ? (
            <Link
              to={`/writing/${prevArticle.slug}`}
              className="group p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex flex-col justify-between"
            >
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-3 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                tulisan sebelumnya
              </span>
              <h5 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                {prevArticle.title}
              </h5>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 font-sans line-clamp-2">
                {prevArticle.excerpt}
              </p>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 sm:p-8 flex items-center justify-center text-xs text-stone-400 font-sans italic">
              Awal dari arsip tulisan
            </div>
          )}

          {nextArticle ? (
            <Link
              to={`/writing/${nextArticle.slug}`}
              className="group p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex flex-col justify-between text-left md:text-right"
            >
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-3 md:self-end group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                tulisan berikutnya
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <h5 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                {nextArticle.title}
              </h5>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 font-sans line-clamp-2">
                {nextArticle.excerpt}
              </p>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 sm:p-8 flex items-center justify-center text-xs text-stone-400 font-sans italic text-right">
              Akhir dari arsip tulisan
            </div>
          )}
        </div>
      </nav>
    </article>
  );
};
