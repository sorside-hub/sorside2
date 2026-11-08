import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  getTrackBySlug,
  getReleaseById,
  getRelatedArticlesForTrack,
} from '../content/music';
import { AudioPlayer } from '../components/music/AudioPlayer';
import { LyricsSection } from '../components/music/LyricsSection';
import { CreditsList } from '../components/music/CreditsList';
import { RelatedWriting } from '../components/music/RelatedWriting';

export const TrackDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const track = slug ? getTrackBySlug(slug) : undefined;
  const parentRelease = track ? getReleaseById(track.releaseId) : undefined;

  if (!track || !parentRelease) {
    return <Navigate to="/music" replace />;
  }

  const artworkUrl = track.coverArtUrl || parentRelease.coverArtUrl;
  const artworkAlt = track.coverArtAlt || parentRelease.coverArtAlt || track.title;
  const relatedArticles = getRelatedArticlesForTrack(track);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Return to Parent Release */}
      <div className="mb-8">
        <Link
          to={`/music/releases/${parentRelease.slug}`}
          className="inline-flex items-center gap-2 text-xs font-sans tracking-wide uppercase text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {parentRelease.title}
        </Link>
      </div>

      {/* Track Header */}
      <header className="mb-8">
        <div className="text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-2">
          <span>{parentRelease.title}</span>
          <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
          <span>Track {track.trackNumber.toString().padStart(2, '0')}</span>
          {track.duration && (
            <>
              <span className="mx-2 text-stone-400 dark:text-stone-600">·</span>
              <span className="font-mono tabular-nums">{track.duration}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight">
          {track.title}
        </h1>

        {track.description && (
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
            {track.description}
          </p>
        )}
      </header>

      {/* Track Artwork & Audio Player */}
      <div className="my-8 space-y-6">
        {artworkUrl && (
          <div className="w-full sm:w-72 aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-sm border border-[#E2DAC8] dark:border-[#2D2B26]">
            <img
              src={artworkUrl}
              alt={artworkAlt}
              className="w-full h-full object-cover grayscale-[10%]"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Minimalist Audio Player */}
        {track.audioUrl && (
          <AudioPlayer src={track.audioUrl} title={track.title} />
        )}
      </div>

      {/* Streaming Links */}
      {track.streamingLinks && track.streamingLinks.length > 0 && (
        <div className="my-6 pb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <span className="text-xs font-sans uppercase tracking-widest text-stone-500 dark:text-stone-400 block mb-2">
            Listen on Platforms
          </span>
          <div className="flex flex-wrap gap-2">
            {track.streamingLinks.map((link, idx) => (
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

      {/* Lyrics */}
      <LyricsSection lyrics={track.lyrics} />

      {/* Behind the Song */}
      {track.behindTheSong && (
        <section className="my-10 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
            Behind the Song
          </h3>
          <div className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg leading-[1.8] font-sans text-stone-700 dark:text-stone-300 whitespace-pre-line">
            {track.behindTheSong}
          </div>
        </section>
      )}

      {/* Track Credits */}
      {track.credits && track.credits.length > 0 && (
        <section className="my-10 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
          <CreditsList title="Track Credits" credits={track.credits} />
        </section>
      )}

      {/* Related Writing */}
      <RelatedWriting articles={relatedArticles} />
    </div>
  );
};
