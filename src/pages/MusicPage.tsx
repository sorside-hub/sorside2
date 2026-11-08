import React from 'react';
import { getReleasesByType, getVisibleReleases } from '../content/music';
import { ReleaseCard } from '../components/music/ReleaseCard';

export const MusicPage: React.FC = () => {
  const visibleReleases = getVisibleReleases();
  const singles = getReleasesByType('single');
  const eps = getReleasesByType('ep');
  const albums = getReleasesByType('album');

  const hasReleases = visibleReleases.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <p className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-2">
          Sound & Expression
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Music
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl font-sans leading-relaxed">
          A collection of sounds, thoughts, and things left unsaid.
        </p>
      </div>

      {hasReleases ? (
        <div className="space-y-16 sm:space-y-20">
          {/* Singles Section */}
          {singles.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 sm:mb-8 pb-3 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Singles
                </h2>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  ({singles.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {singles.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
                ))}
              </div>
            </section>
          )}

          {/* EPs Section */}
          {eps.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 sm:mb-8 pb-3 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  EPs
                </h2>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  ({eps.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {eps.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
                ))}
              </div>
            </section>
          )}

          {/* Albums Section */}
          {albums.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 sm:mb-8 pb-3 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Albums
                </h2>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  ({albums.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {albums.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-base font-serif italic text-stone-600 dark:text-stone-400">
            No releases yet. The collection will grow here.
          </p>
        </div>
      )}
    </div>
  );
};
