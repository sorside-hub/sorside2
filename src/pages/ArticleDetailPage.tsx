import React, { useMemo } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { marked } from 'marked';
import { ARTICLES } from '../content/articles';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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

  // Render markdown safely
  const parsedHtml = useMemo(() => {
    return marked.parse(article.content, { async: false }) as string;
  }, [article.content]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/writing');
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Return to Writing */}
      <div className="mb-8">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-sans tracking-wide uppercase text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Writing
        </button>
      </div>

      {/* Article Header */}
      <header className={article.coverImage ? 'mb-8 sm:mb-10' : 'mb-8 sm:mb-10'}>
        <div className="text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-3">
          <span>{article.category}</span>
          <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
          <span>{article.displayDate}</span>
          <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight sm:leading-[1.15] text-balance">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans leading-relaxed italic">
            {article.excerpt}
          </p>
        )}
      </header>

      {/* Featured Cover Image if available */}
      {article.coverImage && (
        <div className="mb-8 sm:mb-10 overflow-hidden bg-stone-200 dark:bg-stone-800">
          <img
            src={article.coverImage}
            alt={article.coverAlt || article.title}
            className="w-full max-h-[440px] object-cover grayscale-[10%]"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Article Markdown Body */}
      <div className="border-t border-[#E2DAC8] dark:border-[#2D2B26] pt-8 sm:pt-10">
        <div
          className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg leading-[1.8] font-sans text-stone-800 dark:text-stone-200
            [&>p]:mb-6
            [&>p>img]:w-full [&>p>img]:my-8 [&>p>img]:object-cover [&>p>img]:grayscale-[10%]
            [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-stone-900 dark:[&>h3]:text-stone-100
            [&>blockquote]:my-8 [&>blockquote]:py-3 [&>blockquote]:px-6 [&>blockquote]:border-l-2 [&>blockquote]:border-stone-400 dark:[&>blockquote]:border-stone-600 [&>blockquote]:italic [&>blockquote]:font-serif [&>blockquote]:text-lg sm:[&>blockquote]:text-xl [&>blockquote]:text-stone-700 dark:[&>blockquote]:text-stone-300
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      </div>

      {/* Post-article Sign-off */}
      <div className="mt-14 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <span>sorside archive</span>
        <span className="font-serif italic text-stone-600 dark:text-stone-300">
          Every side has a story.
        </span>
      </div>

      {/* Pagination: Prev / Next Articles */}
      <nav
        aria-label="Article navigation"
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26]"
      >
        {prevArticle ? (
          <Link
            to={`/writing/${prevArticle.slug}`}
            className="group p-4 border border-[#E2DAC8] dark:border-[#2D2B26] rounded hover:border-stone-400 dark:hover:border-stone-600 transition-colors flex flex-col justify-between"
          >
            <span className="text-[11px] font-sans tracking-widest uppercase text-stone-400 dark:text-stone-500 flex items-center gap-1.5 mb-2">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Previous
            </span>
            <span className="font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors line-clamp-2">
              {prevArticle.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <Link
            to={`/writing/${nextArticle.slug}`}
            className="group p-4 border border-[#E2DAC8] dark:border-[#2D2B26] rounded hover:border-stone-400 dark:hover:border-stone-600 transition-colors flex flex-col justify-between text-right"
          >
            <span className="text-[11px] font-sans tracking-widest uppercase text-stone-400 dark:text-stone-500 flex items-center justify-end gap-1.5 mb-2">
              Next
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors line-clamp-2">
              {nextArticle.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
