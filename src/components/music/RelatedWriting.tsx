import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../../types';

interface RelatedWritingProps {
  articles: Article[];
}

export const RelatedWriting: React.FC<RelatedWritingProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-10 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-4 h-4 text-stone-500 dark:text-stone-400 stroke-[1.5]" />
        <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Related Writing
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/writing/${article.slug}`}
            className="p-5 border border-[#E2DAC8] dark:border-[#2D2B26] rounded hover:border-stone-400 dark:hover:border-stone-600 transition-colors group block"
          >
            <div className="text-[11px] font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-1.5">
              <span>{article.category}</span>
              <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
              <span>{article.displayDate}</span>
            </div>

            <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors flex items-center justify-between gap-3">
              <span>{article.title}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </h4>

            {article.excerpt && (
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};
