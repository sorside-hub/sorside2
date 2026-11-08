import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getReleaseBySlug, getTracksForRelease } from '../content/music';
import { Tracklist } from '../components/music/Tracklist';
import { CreditsList } from '../components/music/CreditsList';

export const ReleaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const release = slug ? getReleaseBySlug(slug) : undefined;

  if (!release) {
    return <Navigate to="/music" replace />;
  }

  const tracks = getTracksForRelease(release);

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Return to Music */}
      <div className="mb-8">
        <Link
          to="/music"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-wide uppercase text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Music
        </Link>
      </div>

      {/* Release Header: Artwork & Meta Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-14">
        {/* Artwork */}
        <div className="md:col-span-5">
          <div className="w-full aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-sm border border-[#E2DAC8] dark:border-[#2D2B26]">
            {release.coverArtUrl ? (
              <img
                src={release.coverArtUrl}
                alt={release.coverArtAlt || release.title}
                className="w-full h-full object-cover grayscale-[10%]"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-serif italic text-stone-400">
                sorside music
              </div>
            )}
          </div>
        </div>

        {/* Release Meta */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-4">
          <div className="text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
            <span>{release.releaseType}</span>
            <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
            <span>{release.displayYear}</span>
            {release.status === 'upcoming' && (
              <>
                <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
                <span className="text-stone-700 dark:text-stone-300">Upcoming Release</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight">
            {release.title}
          </h1>

          {release.description && (
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
              {release.description}
            </p>
          )}

          {/* Streaming Links */}
          {release.streamingLinks && release.streamingLinks.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-sans uppercase tracking-widest text-stone-500 dark:text-stone-400 block mb-2">
                Listen On
              </span>
              <div className="flex flex-wrap gap-2">
                {release.streamingLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <span>{link.platform}</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tracklist Section */}
      <section className="my-12">
        <Tracklist tracks={tracks} />
      </section>

      {/* Behind the Release */}
      {release.behindTheRelease && (
        <section className="my-12 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
            Behind the Release
          </h3>
          <div className="prose prose-stone dark:prose-invert max-w-none text-base font-sans leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-line">
            {release.behindTheRelease}
          </div>
        </section>
      )}

      {/* Release Credits */}
      {release.credits && release.credits.length > 0 && (
        <section className="my-12 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
          <CreditsList title="Release Credits" credits={release.credits} />
        </section>
      )}
    </div>
  );
};
