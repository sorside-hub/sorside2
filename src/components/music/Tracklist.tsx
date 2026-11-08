import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Track } from '../../types/music';

interface TracklistProps {
  tracks: Track[];
}

export const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return null;

  return (
    <div className="w-full">
      <div className="pb-3 mb-2 border-b border-[#E2DAC8] dark:border-[#2D2B26] flex items-center justify-between text-xs font-sans tracking-widest uppercase text-stone-500 dark:text-stone-400">
        <span>Tracklist</span>
        <span>Duration</span>
      </div>

      <ol className="divide-y divide-[#E2DAC8]/60 dark:divide-[#2D2B26]/60 list-none m-0 p-0">
        {tracks.map((track) => (
          <li key={track.id}>
            <Link
              to={`/music/tracks/${track.slug}`}
              className="py-3.5 px-2 -mx-2 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors flex items-baseline justify-between group"
            >
              <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                <span className="font-mono text-xs text-stone-400 dark:text-stone-500 w-6 shrink-0 group-hover:hidden">
                  {track.trackNumber.toString().padStart(2, '0')}
                </span>
                <span className="w-6 shrink-0 hidden group-hover:flex items-center justify-start self-center text-stone-900 dark:text-stone-100">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </span>

                <div className="truncate">
                  <span className="font-serif font-medium text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {track.title}
                  </span>
                </div>
              </div>

              {track.duration && (
                <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400 shrink-0 ml-4">
                  {track.duration}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
