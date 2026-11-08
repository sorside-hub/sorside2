import React from 'react';
import { Link } from 'react-router-dom';
import { Release } from '../../types/music';

interface ReleaseCardProps {
  release: Release;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
  return (
    <article className="group">
      <Link to={`/music/releases/${release.slug}`} className="block">
        {/* Square Artwork */}
        <div className="w-full aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-xs mb-3.5 sm:mb-4 border border-[#E2DAC8]/60 dark:border-[#2D2B26]/60">
          {release.coverArtUrl ? (
            <img
              src={release.coverArtUrl}
              alt={release.coverArtAlt || release.title}
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-serif italic text-stone-400">
              sorside music
            </div>
          )}
        </div>

        {/* Metadata & Title */}
        <div className="space-y-1">
          <div className="text-[11px] font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400">
            <span>{release.releaseType}</span>
            <span className="mx-1.5 text-stone-400 dark:text-stone-600">·</span>
            <span>{release.displayYear}</span>
            {release.status === 'upcoming' && (
              <>
                <span className="mx-1.5 text-stone-400 dark:text-stone-600">·</span>
                <span className="text-stone-600 dark:text-stone-300">Upcoming</span>
              </>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
            {release.title}
          </h3>

          {release.description && (
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans line-clamp-2 leading-relaxed pt-0.5">
              {release.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};
