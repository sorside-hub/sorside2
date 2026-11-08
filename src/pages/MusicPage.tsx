import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Disc3, ArrowRight, ExternalLink } from 'lucide-react';
import { RELEASES, TRACKS, getTracksForRelease } from '../content/music';
import { AudioPlayer } from '../components/music/AudioPlayer';

type ReleaseTab = 'all' | 'single' | 'ep' | 'album';

export const MusicPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReleaseTab>('all');

  // 1. RILISAN TERBARU (Hero atas: Rilisan dengan tanggal terbaru)
  const latestRelease = useMemo(() => {
    return (
      [...RELEASES].sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )[0] || RELEASES[0]
    );
  }, []);

  const latestReleaseTrack = useMemo(() => {
    return TRACKS.find((t) => t.releaseId === latestRelease.id) || TRACKS[0];
  }, [latestRelease]);

  // 2. RILISAN PILIHAN / PALING TOP (EP "Sudut dan Bayangan" & Album "Gema Ruang Sunyi")
  const featuredReleases = useMemo(() => {
    return RELEASES.filter((r) => r.slug === 'sudut-dan-bayangan' || r.slug === 'gema-ruang-sunyi');
  }, []);

  // 3. DAFTAR RILISAN BERDASARKAN FILTER TAB
  const filteredReleases = useMemo(() => {
    if (activeTab === 'all') return RELEASES;
    return RELEASES.filter((r) => r.releaseType === activeTab);
  }, [activeTab]);

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 bg-[#F4EFEA] dark:bg-[#161513] transition-colors">
      {/* 1. HEADER ARSIP BUNYI */}
      <div className="mb-10 sm:mb-14 pb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="max-w-3xl">
          <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-500 dark:text-stone-400 mb-2">
            arsip bunyi · sorside
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            katalog musik<span className="text-stone-400 dark:text-stone-600 font-normal">.</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
            Kumpulan single, EP, dan album akustik yang direkam secara mandiri. Tanpa autotune, menangkap tarikan napas dan kejujuran bunyi apa adanya.
          </p>
        </div>
      </div>

      {/* 2. FILTER TAB FORMAT RILISAN (100% BAHASA INDONESIA) */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 pb-6 mb-12 sm:mb-16 border-b border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans">
        <button
          onClick={() => setActiveTab('all')}
          type="button"
          className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium'
          }`}
        >
          semua rilisan <span className="text-[10px] font-mono opacity-60">({RELEASES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('single')}
          type="button"
          className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'single'
              ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium'
          }`}
        >
          single <span className="text-[10px] font-mono opacity-60">({RELEASES.filter((r) => r.releaseType === 'single').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ep')}
          type="button"
          className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'ep'
              ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium'
          }`}
        >
          ep <span className="text-[10px] font-mono opacity-60">({RELEASES.filter((r) => r.releaseType === 'ep').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('album')}
          type="button"
          className={`pb-1 uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'album'
              ? 'text-stone-950 dark:text-stone-50 font-bold border-b-2 border-stone-900 dark:border-stone-100'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium'
          }`}
        >
          album <span className="text-[10px] font-mono opacity-60">({RELEASES.filter((r) => r.releaseType === 'album').length})</span>
        </button>
      </div>

      {/* 3. HERO ATAS: RILISAN TERBARU (LATEST RELEASE HERO) */}
      <section className="mb-16 sm:mb-24">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <Disc3 className="w-4 h-4 text-stone-600 dark:text-stone-400 animate-spin-slow" />
          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400">
            Rilisan Terbaru · {latestRelease.displayYear}
          </span>
        </div>

        <div className="bg-[#EFE9DF]/80 dark:bg-[#1A1916]/80 p-6 sm:p-10 border border-[#E2DAC8] dark:border-[#2D2B26]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Cover Sleeve Vinyl Kiri */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <Link
                to={`/music/releases/${latestRelease.slug}`}
                className="block w-full max-w-sm aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group"
              >
                {latestRelease.coverArtUrl && (
                  <img
                    src={latestRelease.coverArtUrl}
                    alt={latestRelease.coverArtAlt || latestRelease.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="eager"
                  />
                )}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-stone-900/85 text-white text-[9px] font-mono uppercase tracking-wider">
                    {latestRelease.displayYear}
                  </span>
                  <span className="px-1.5 py-0.5 bg-stone-900/85 text-white text-[9px] font-mono uppercase tracking-wider">
                    {latestRelease.releaseType.toUpperCase()}
                  </span>
                </div>
              </Link>

              {/* Platform Streaming Badges */}
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-sans">
                {latestRelease.streamingLinks?.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-stone-200/70 dark:bg-stone-800/70 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{link.platform}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Rincian Rilisan Kanan */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1.5">
                  Rilisan {latestRelease.releaseType.toUpperCase()} · Studio Kamar Sisi Selatan
                </div>
                <Link to={`/music/releases/${latestRelease.slug}`}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 hover:text-stone-600 dark:hover:text-stone-300 transition-colors tracking-tight leading-tight">
                    {latestRelease.title}
                  </h2>
                </Link>

                <p className="mt-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans leading-relaxed max-w-2xl">
                  {latestRelease.description}
                </p>
              </div>

              {/* Pemutar Audio Langsung untuk Lagu Terbaru Ini */}
              {latestReleaseTrack?.audioUrl && (
                <div className="mt-8 pt-6 border-t border-[#E2DAC8]/80 dark:border-[#2D2B26]/80">
                  <p className="text-[10px] font-sans uppercase tracking-widest text-stone-500 mb-3">
                    Dengarkan Rekaman Audio
                  </p>
                  <AudioPlayer
                    src={latestReleaseTrack.audioUrl}
                    title={latestReleaseTrack.title}
                  />
                </div>
              )}

              {/* Aksi Buka Rilisan */}
              <div className="mt-8 pt-4 flex items-center justify-between">
                <Link
                  to={`/music/releases/${latestRelease.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-wide text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors border-b-2 border-stone-900 dark:border-stone-100 pb-0.5"
                >
                  buka catatan & lirik {latestRelease.releaseType} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-stone-500">SOR-{latestRelease.releaseType.toUpperCase()}-01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BAGIAN TENGAH: RAK SELURUH RILISAN (THE VINYL SHELVES - 3 COLS BROADSHEET) */}
      <section className="mb-16 sm:mb-24">
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500">
              Katalog Lengkap
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Semua Rilisan ({filteredReleases.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredReleases.map((release) => {
            const tracks = getTracksForRelease(release);
            return (
              <article
                key={release.id}
                className="group p-5 sm:p-6 bg-[#EFE9DF]/40 dark:bg-[#1A1916]/40 border border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col justify-between"
              >
                <div>
                  {/* Square Cover */}
                  <Link
                    to={`/music/releases/${release.slug}`}
                    className="w-full aspect-square block overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] relative mb-4"
                  >
                    {release.coverArtUrl ? (
                      <img
                        src={release.coverArtUrl}
                        alt={release.coverArtAlt || release.title}
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-serif italic text-stone-400">
                        sorside music
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
                        {release.releaseType}
                      </span>
                      <span className="px-1.5 py-0.5 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
                        {release.displayYear}
                      </span>
                    </div>
                  </Link>

                  {/* Info Rilisan */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                      <span>{tracks.length} Lagu</span>
                    </div>

                    <Link to={`/music/releases/${release.slug}`}>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                        {release.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 font-sans leading-relaxed line-clamp-2">
                      {release.description}
                    </p>

                    {/* Mini Tracklist di dalam Rilisan */}
                    <div className="mt-3 pt-2.5 border-t border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 space-y-1">
                      {tracks.slice(0, 3).map((trk, i) => (
                        <div key={trk.id} className="text-[11px] font-sans text-stone-600 dark:text-stone-400 flex items-center justify-between">
                          <span className="truncate">0{i + 1}. {trk.title}</span>
                          <span className="font-mono text-[10px] text-stone-400 ml-2">{trk.duration}</span>
                        </div>
                      ))}
                      {tracks.length > 3 && (
                        <div className="text-[10px] font-mono text-stone-400 pt-0.5">
                          + {tracks.length - 3} lagu lainnya
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 mt-4 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex items-center justify-between text-xs">
                  <Link
                    to={`/music/releases/${release.slug}`}
                    className="font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1"
                  >
                    buka rilisan <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    {release.releaseType}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. BAGIAN BAWAH: RILISAN PILIHAN / TERPOPULER (FEATURED SHOWCASE SET) */}
      <section className="mb-8">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500">
              Koleksi Unggulan
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Rilisan Pilihan Studio ({featuredReleases.length})
            </h2>
          </div>
          <span className="text-xs font-serif italic text-stone-500 hidden sm:block">
            Paling banyak didengar di arsip sorside
          </span>
        </div>

        <div className="space-y-8">
          {featuredReleases.map((featRel) => {
            const tracks = getTracksForRelease(featRel);
            return (
              <div
                key={featRel.id}
                className="bg-[#EFE9DF]/60 dark:bg-[#1A1916]/60 p-6 sm:p-10 border border-[#E2DAC8] dark:border-[#2D2B26]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Cover Kiri */}
                  <div className="lg:col-span-4">
                    <Link
                      to={`/music/releases/${featRel.slug}`}
                      className="block aspect-square max-w-xs mx-auto lg:mx-0 overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group"
                    >
                      {featRel.coverArtUrl && (
                        <img
                          src={featRel.coverArtUrl}
                          alt={featRel.title}
                          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-stone-900/85 text-white text-[9px] font-mono uppercase tracking-wider">
                        {featRel.releaseType.toUpperCase()} Pilihan
                      </span>
                    </Link>
                  </div>

                  {/* Info Rilisan & Daftar Lagu */}
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                        {featRel.releaseType.toUpperCase()} · {featRel.displayYear} · {tracks.length} Lagu
                      </span>
                      <Link to={`/music/releases/${featRel.slug}`}>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors mt-1">
                          {featRel.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed mt-2 max-w-xl">
                        {featRel.description}
                      </p>
                    </div>

                    {/* Daftar Lagu di dalam Rilisan Pilihan */}
                    <div className="pt-3 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 space-y-2">
                      <p className="text-[10px] font-sans uppercase tracking-widest text-stone-500">
                        Daftar Lagu dalam Rilisan Ini
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {tracks.map((track, i) => (
                          <Link
                            key={track.id}
                            to={`/music/tracks/${track.slug}`}
                            className="p-3 bg-stone-100/70 dark:bg-stone-900/60 border border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 hover:border-stone-500 dark:hover:border-stone-400 transition-colors block"
                          >
                            <div className="text-[10px] font-mono text-stone-400 mb-1">0{i + 1}. ({track.duration})</div>
                            <div className="text-xs font-serif font-semibold text-stone-900 dark:text-stone-100 truncate">
                              {track.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/music/releases/${featRel.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-stone-900 dark:text-stone-100 hover:underline"
                      >
                        buka rincian lengkap {featRel.releaseType} ini <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
