import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Disc3, Music2, BookOpen } from 'lucide-react';
import { getRelatedArticlesForTrack } from '../content/music';
import { useMusic } from '../context/MusicContext';
import { AudioPlayer } from '../components/music/AudioPlayer';

const translateCreditRole = (role: string): string => {
  const map: Record<string, string> = {
    'written & performed by': 'Ditulis & Dinyanyikan oleh',
    'written & composed by': 'Ditulis & Diciptakan oleh',
    'acoustic guitar & vocals': 'Gitar Akustik & Vokal',
    'vocals & guitar': 'Vokal & Gitar',
    'vocals & acoustic guitar': 'Vokal & Gitar Akustik',
    'piano & rhodes': 'Piano Akustik & Rhodes',
    'acoustic guitar': 'Gitar Akustik',
    'fingerstyle guitar': 'Gitar Fingerstyle',
    'produced by': 'Diproduseri oleh',
    'produced & arranged by': 'Produksi & Aransemen',
    'mixed & mastered by': 'Tata Suara & Mastering',
    'mastering': 'Mastering Audio',
    'instruments': 'Instrumen Musik',
    'recorded at': 'Lokasi Perekaman',
    'artwork by': 'Desain Sampul & Visual',
    'field recording (rain)': 'Rekaman Suara Hujan',
    'music & concept': 'Konsep & Musik',
    'acoustic guitar, ambient synth': 'Gitar Akustik & Ambient Synth',
    'guitar & arrangement': 'Gitar & Aransemen',
    'recording': 'Perekaman',
    'location': 'Lokasi Studio',
  };
  return map[role.toLowerCase().trim()] || role;
};

const renderStanzaBlock = (stanza: string, idx: number) => {
  const lines = stanza.trim().split('\n');
  const firstLine = lines[0]?.trim();
  const hasHeaderTag = Boolean(firstLine?.startsWith('[') && firstLine?.endsWith(']'));
  
  const headerText = hasHeaderTag ? firstLine.slice(1, -1) : null;
  const bodyLines = hasHeaderTag ? lines.slice(1).join('\n') : stanza;

  return (
    <div key={idx} className="space-y-1.5">
      {headerText ? (
        <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-stone-600 dark:text-stone-400 block mb-2 border-b border-[#E2DAC8]/50 dark:border-[#2D2B26]/50 pb-1 w-fit">
          {headerText}
        </span>
      ) : (
        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-stone-500 block mb-1">
          Bait 0{idx + 1}
        </span>
      )}
      <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800 dark:text-stone-100 leading-[1.85] whitespace-pre-line m-0">
        {bodyLines}
      </p>
    </div>
  );
};

export const TrackDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTrackBySlug, getReleaseById, getTracksForRelease } = useMusic();

  // Selalu scroll ke paling atas saat membuka trek baru
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const track = slug ? getTrackBySlug(slug) : undefined;
  const parentRelease = track ? getReleaseById(track.releaseId) : undefined;

  if (!track || !parentRelease) {
    return <Navigate to="/music" replace />;
  }

  // Jika trek berasal dari single, arahkan langsung ke halaman rilis single (karena single = 1 lagu itu sendiri)
  if (parentRelease.releaseType === 'single') {
    return <Navigate to={`/music/releases/${parentRelease.slug}`} replace />;
  }

  const artworkUrl = track.coverArtUrl || parentRelease.coverArtUrl;
  const artworkAlt = track.coverArtAlt || parentRelease.coverArtAlt || track.title;
  const relatedArticles = getRelatedArticlesForTrack(track);

  // Ambil seluruh trek dalam EP/Album induk untuk navigasi antar-trek
  const parentTracks = getTracksForRelease(parentRelease);
  const currentTrackIndex = parentTracks.findIndex((t) => t.id === track.id);
  const prevTrack = currentTrackIndex > 0 ? parentTracks[currentTrackIndex - 1] : null;
  const nextTrack = currentTrackIndex < parentTracks.length - 1 ? parentTracks[currentTrackIndex + 1] : null;

  // Split lirik menjadi bait-bait
  const stanzas = useMemo(() => {
    if (!track.lyrics) return [];
    return track.lyrics.trim().split(/\n\s*\n/);
  }, [track.lyrics]);

  return (
    <article className="w-full bg-[#F4EFEA] dark:bg-[#161513] transition-colors pb-16 sm:pb-24">
      {/* 1. STRIP NAVIGASI ATAS (FULL-WIDTH) */}
      <div className="w-full border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#F4EFEA]/80 dark:bg-[#161513]/80 backdrop-blur-xs">
        <div className="w-full px-6 lg:px-12 xl:px-16 h-12 flex items-center justify-between text-xs font-sans">
          <Link
            to={`/music/releases/${parentRelease.slug}`}
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>kembali ke rilis {parentRelease.title}</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Trek {track.trackNumber.toString().padStart(2, '0')} dari {parentTracks.length.toString().padStart(2, '0')}
            </span>
            <span>·</span>
            <span>{parentRelease.title} ({parentRelease.displayYear})</span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER TREK: GRID LEBAR */}
      <header className="w-full border-b border-[#E2DAC8] dark:border-[#2D2B26] py-10 sm:py-14 lg:py-16">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-start">
            {/* Kolom Kiri (lg:col-span-5): Sampul Rilis Induk & Streaming Links */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="w-full max-w-md aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group">
                {artworkUrl ? (
                  <img
                    src={artworkUrl}
                    alt={artworkAlt}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-serif italic text-stone-400">
                    sorside music
                  </div>
                )}

              </div>

              {/* Streaming Links */}
              {track.streamingLinks && track.streamingLinks.length > 0 && (
                <div className="w-full max-w-md mt-6 pt-5 border-t border-[#E2DAC8]/80 dark:border-[#2D2B26]/80">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 block mb-2.5">
                    Dengarkan Lagu Ini di Platform
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {track.streamingLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans font-medium text-stone-800 dark:text-stone-200 bg-[#EFE9DF]/50 dark:bg-[#1A1916]/50 hover:bg-stone-200/80 dark:hover:bg-stone-800/80 transition-colors"
                      >
                        <span>{link.platform}</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan (lg:col-span-7): Detail Trek & Audio Player */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 sm:mb-4">
                  <Disc3 className="w-3.5 h-3.5 animate-spin-slow text-stone-600 dark:text-stone-400" />
                  <Link
                    to={`/music/releases/${parentRelease.slug}`}
                    className="font-semibold text-stone-800 dark:text-stone-200 hover:underline"
                  >
                    {parentRelease.title}
                  </Link>
                  <span>·</span>
                  <span>Trek 0{track.trackNumber}</span>
                  {track.duration && (
                    <>
                      <span>·</span>
                      <span>{track.duration}</span>
                    </>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.12] tracking-tight">
                  {track.title}
                </h1>

                {track.description && (
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg text-stone-700 dark:text-stone-300 font-serif italic leading-relaxed max-w-2xl">
                    &ldquo;{track.description}&rdquo;
                  </p>
                )}

                {/* Info Album Induk Cepat */}
                <div className="mt-6 pt-5 pb-2 border-t border-[#E2DAC8]/80 dark:border-[#2D2B26]/80 flex flex-wrap gap-8 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Rilisan Induk</span>
                    <Link
                      to={`/music/releases/${parentRelease.slug}`}
                      className="font-semibold text-stone-900 dark:text-stone-100 hover:underline"
                    >
                      {parentRelease.title} ({parentRelease.releaseType.toUpperCase()})
                    </Link>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Urutan Trek</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Trek {track.trackNumber} dari {parentTracks.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Durasi</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 font-mono">
                      {track.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pemutar Audio Langsung untuk Lagu Ini */}
              <div className="mt-8 pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
                <AudioPlayer src={track.audioUrl} title={track.title} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. LIRIK LAGU (PITA LEBAR FULL-WIDTH BLEED BAND: SERIF EDITORIAL 2 KOLOM DI DESKTOP) */}
      {stanzas.length > 0 ? (
        <section className="w-full border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#181714]/30 py-12 sm:py-16 my-10">
          <div className="w-full px-6 lg:px-12 xl:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E2DAC8]/80 dark:border-[#2D2B26]/80">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Naskah Lirik
                  </h2>
                </div>
                <span className="text-xs font-mono text-stone-500 hidden sm:block">
                  {stanzas.length} Bait · {parentRelease.title}
                </span>
              </div>

              {/* Grid 3 Kolom Lirik Bersebelahan di Desktop */}
              {(() => {
                const perCol = Math.ceil(stanzas.length / 3);
                const col1 = stanzas.slice(0, perCol);
                const col2 = stanzas.slice(perCol, perCol * 2);
                const col3 = stanzas.slice(perCol * 2);

                return (
                  <div className={`grid grid-cols-1 ${stanzas.length > 4 ? 'md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12' : 'max-w-2xl'} items-start`}>
                    {/* Kolom Pertama */}
                    <div className="space-y-8">
                      {col1.map((stanza, idx) => renderStanzaBlock(stanza, idx))}
                    </div>

                    {/* Kolom Kedua */}
                    {col2.length > 0 && (
                      <div className="space-y-8 md:border-l md:border-[#E2DAC8]/70 md:dark:border-[#2D2B26]/70 md:pl-8 lg:pl-10">
                        {col2.map((stanza, idx) => renderStanzaBlock(stanza, col1.length + idx))}
                      </div>
                    )}

                    {/* Kolom Ketiga */}
                    {col3.length > 0 && (
                      <div className="space-y-8 lg:border-l lg:border-[#E2DAC8]/70 lg:dark:border-[#2D2B26]/70 lg:pl-10">
                        {col3.map((stanza, idx) => renderStanzaBlock(stanza, col1.length + col2.length + idx))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
          <div className="p-8 bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 border border-[#E2DAC8] dark:border-[#2D2B26] text-center">
            <p className="text-sm sm:text-base font-serif italic text-stone-700 dark:text-stone-300">
              Nomor ini merupakan komposisi instrumental tanpa vokal. Fokus pada petikan nada, gema ruangan, dan tekstur akustik.
            </p>
          </div>
        </section>
      )}

      {/* 4. CATATAN DI BALIK LAGU (FULL-WIDTH BLEED BAND — PITA LEBAR PENUH LAYAR) */}
      {track.behindTheSong && (
        <section className="w-full border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/50 dark:bg-[#181714]/50 py-12 sm:py-16 my-8">
          <div className="w-full px-6 lg:px-12 xl:px-16">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400">
                  catatan studio · proses kreatif
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
                Di Balik Lagu &ldquo;{track.title}&rdquo;
              </h2>

              <div className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg font-sans leading-[1.88] text-stone-800 dark:text-stone-200 whitespace-pre-line">
                {track.behindTheSong}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-stone-500 dark:text-stone-400">
                <span className="font-serif italic text-stone-700 dark:text-stone-300">
                  &ldquo;Lagu ini lahir dari momen hening yang tak terencana.&rdquo;
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  — Sor, Catatan Studio
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. KREDIT PERSONEL & TULISAN TERKAIT (KOLOM TERFOKUS: max-w-3xl) */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14 space-y-12">
        {/* Kredit Trek */}
        {track.credits && track.credits.length > 0 && (
          <section>
            <div className="pb-3 mb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
                Dokumentasi Personel
              </p>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Kredit Trek Ini
              </h2>
            </div>

            <dl className="divide-y divide-[#E2DAC8]/60 dark:divide-[#2D2B26]/60 text-xs sm:text-sm font-sans bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 border border-[#E2DAC8] dark:border-[#2D2B26] p-5 sm:p-6">
              {track.credits.map((credit, idx) => (
                <div
                  key={idx}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                >
                  <dt className="text-stone-500 dark:text-stone-400 font-normal">
                    {translateCreditRole(credit.role)}
                  </dt>
                  <dd className="font-serif font-medium text-stone-900 dark:text-stone-100 text-left sm:text-right m-0">
                    {credit.name}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Tulisan Terkait (Korelasi Sonik dengan Esai Tulisan Sor) */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
              <BookOpen className="w-4 h-4 text-stone-500 dark:text-stone-400 stroke-[1.5]" />
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
                Esai Tulisan Terkait
              </p>
            </div>

            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/writing/${article.slug}`}
                  className="p-5 sm:p-6 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/40 dark:bg-[#1A1916]/40 hover:bg-[#EFE9DF]/80 dark:hover:bg-[#1A1916]/80 transition-colors block group"
                >
                  <div className="text-[10px] font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-1">
                    {article.category} · {article.displayDate}
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors flex items-center justify-between gap-3">
                    <span>{article.title}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </h3>
                  {article.excerpt && (
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 6. NAVIGASI PREV / NEXT ANTAR-TREK DALAM EP/ALBUM (FULL-WIDTH PITA DI BAWAH) */}
      <nav
        aria-label="Navigasi antar trek"
        className="w-full px-6 lg:px-12 xl:px-16 mt-8 sm:mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-2">
          {prevTrack ? (
            <Link
              to={`/music/tracks/${prevTrack.slug}`}
              className="group p-6 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex flex-col justify-between"
            >
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-2 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                trek sebelumnya
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug truncate">
                0{prevTrack.trackNumber}. {prevTrack.title}
              </h4>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Durasi {prevTrack.duration}
              </p>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 flex items-center justify-center text-xs text-stone-400 font-sans italic">
              Awal dari daftar lagu di rilis ini
            </div>
          )}

          {nextTrack ? (
            <Link
              to={`/music/tracks/${nextTrack.slug}`}
              className="group p-6 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex flex-col justify-between text-left md:text-right"
            >
              <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-2 md:self-end group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                trek berikutnya
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug truncate">
                0{nextTrack.trackNumber}. {nextTrack.title}
              </h4>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Durasi {nextTrack.duration}
              </p>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 flex items-center justify-center text-xs text-stone-400 font-sans italic text-right">
              Akhir dari daftar lagu di rilis ini
            </div>
          )}
        </div>
      </nav>
    </article>
  );
};
