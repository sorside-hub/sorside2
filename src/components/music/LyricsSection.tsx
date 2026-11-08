import React from 'react';

interface LyricsSectionProps {
  lyrics?: string;
}

export const LyricsSection: React.FC<LyricsSectionProps> = ({ lyrics }) => {
  if (!lyrics || !lyrics.trim()) return null;

  // Split into stanzas by double line breaks
  const stanzas = lyrics.trim().split(/\n\s*\n/);

  return (
    <section className="my-10 pt-8 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
      <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
        Lyrics
      </h3>

      <div className="space-y-6 max-w-prose text-base sm:text-lg font-serif leading-[1.85] text-stone-800 dark:text-stone-200">
        {stanzas.map((stanza, idx) => (
          <p key={idx} className="whitespace-pre-line m-0">
            {stanza}
          </p>
        ))}
      </div>
    </section>
  );
};
