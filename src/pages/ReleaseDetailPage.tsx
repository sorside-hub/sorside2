import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Disc3, Play } from 'lucide-react';
import { RELEASES, getTracksForRelease } from '../content/music';
import { Track } from '../types/music';
import { AudioPlayer } from '../components/music/AudioPlayer';

const formatIndonesianDate = (dateStr: string, fallbackYear: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return fallbackYear;
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return fallbackYear;
  }
};

const translateCreditRole = (role: string): string => {
  const map: Record<string, string> = {
    'written & performed by': 'Ditulis & Dinyanyikan oleh',
    'written & composed by': 'Ditulis & Diciptakan oleh',
    'acoustic guitar & vocals': 'Gitar Akustik & Vokal',
    'vocals & guitar': 'Vokal & Gitar',
    'vocals & acoustic guitar': 'Vokal & Gitar Akustik',
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

const calculateTotalDuration = (tracks: Track[]): string => {
  let totalSeconds = 0;
  tracks.forEach((t) => {
    if (!t.duration) return;
    const parts = t.duration.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      totalSeconds += parts[0] * 60 + parts[1];
    }
  });
  if (totalSeconds === 0) return '';
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins} menit ${secs > 0 ? `${secs} detik` : ''}`;
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

export const ReleaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Selalu scroll ke paling atas saat membuka rilis baru
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const currentIndex = useMemo(() => {
    return RELEASES.findIndex((r) => r.slug === slug);
  }, [slug]);

  if (currentIndex === -1) {
    return <Navigate to="/music" replace />;
  }

  const release = RELEASES[currentIndex];
  const tracks = getTracksForRelease(release);
  const isSingle = release.releaseType === 'single';
  const leadTrack = tracks[0];

  const prevRelease = currentIndex > 0 ? RELEASES[currentIndex - 1] : null;
  const nextRelease = currentIndex < RELEASES.length - 1 ? RELEASES[currentIndex + 1] : null;

  const dateLabel = formatIndonesianDate(release.releaseDate, release.displayYear);
  const totalDurationLabel = calculateTotalDuration(tracks);

  // Split lirik menjadi bait-bait untuk Single
  const singleStanzas = useMemo(() => {
    if (!isSingle || !leadTrack?.lyrics) return [];
    return leadTrack.lyrics.trim().split(/\n\s*\n/);
  }, [isSingle, leadTrack]);

  return (
    <article className="w-full bg-[#F4EFEA] dark:bg-[#161513] transition-colors pb-16 sm:pb-24">
      {/* 1. STRIP NAVIGASI ATAS (FULL-WIDTH) */}
      <div className="w-full border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#F4EFEA]/80 dark:bg-[#161513]/80 backdrop-blur-xs">
        <div className="w-full px-6 lg:px-12 xl:px-16 h-12 flex items-center justify-between text-xs font-sans">
          <Link
            to="/music"
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>kembali ke katalog musik</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Rilisan {release.releaseType.toUpperCase()}
            </span>
            <span>·</span>
            <span>Tahun {release.displayYear}</span>
            <span>·</span>
            <span>
              Arsip {String(currentIndex + 1).padStart(2, '0')} / {String(RELEASES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER RILISAN: GRID LEBAR */}
      <header className="w-full border-b border-[#E2DAC8] dark:border-[#2D2B26] py-10 sm:py-14 lg:py-16">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Kolom Kiri (lg:col-span-5): Cover Vinyl 1:1 & Platform Streaming */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="w-full max-w-md aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group">
                {release.coverArtUrl ? (
                  <img
                    src={release.coverArtUrl}
                    alt={release.coverArtAlt || release.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-serif italic text-stone-400">
                    sorside music
                  </div>
                )}

                {/* Badge Format & Tahun di Pojok Sampul */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-stone-900/85 text-white text-[10px] font-mono uppercase tracking-wider">
                    {release.releaseType.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 bg-stone-900/85 text-white text-[10px] font-mono uppercase tracking-wider">
                    {release.displayYear}
                  </span>
                </div>
              </div>

              {/* Streaming Platform Badges */}
              {release.streamingLinks && release.streamingLinks.length > 0 && (
                <div className="w-full max-w-md mt-6 pt-5 border-t border-[#E2DAC8]/80 dark:border-[#2D2B26]/80">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 block mb-2.5">
                    Dengarkan di Layanan Musik
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {release.streamingLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans font-medium text-stone-800 dark:text-stone-200 bg-[#EFE9DF]/50 dark:bg-[#1A1916]/50 hover:bg-stone-200/80 dark:hover:bg-stone-800/80 transition-colors"
                      >
                        <span>{link.platform}</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan (lg:col-span-7): Identitas, Judul, Deskripsi & Pemutar Trek */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 sm:mb-4">
                  <Disc3 className="w-3.5 h-3.5 animate-spin-slow text-stone-600 dark:text-stone-400" />
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Rilisan {release.releaseType.toUpperCase()}
                  </span>
                  <span>·</span>
                  <span>{dateLabel}</span>
                  {totalDurationLabel && (
                    <>
                      <span>·</span>
                      <span>{totalDurationLabel}</span>
                    </>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.12] tracking-tight">
                  {release.title}
                </h1>

                {release.description && (
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg text-stone-700 dark:text-stone-300 font-serif italic leading-relaxed max-w-2xl">
                    &ldquo;{release.description}&rdquo;
                  </p>
                )}

                {/* Spesifikasi Arsip Ringkas (Bersih tanpa teks teknis gak guna) */}
                <div className="mt-6 pt-5 pb-2 border-t border-[#E2DAC8]/80 dark:border-[#2D2B26]/80 flex flex-wrap gap-8 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Katalog ID</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      SOR-{release.releaseType.toUpperCase()}-{String(currentIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">
                      {isSingle ? 'Durasi Lagu' : 'Jumlah Lagu'}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {isSingle ? leadTrack?.duration || totalDurationLabel : `${tracks.length} Lagu`}
                    </span>
                  </div>
                  {!isSingle && totalDurationLabel && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-500 block">Total Durasi</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{totalDurationLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pemutar Audio Langsung */}
              {leadTrack?.audioUrl && (
                <div className="mt-8 pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      {isSingle ? 'Putar Lagu Ini' : `Lagu Pembuka · 01. ${leadTrack.title}`}
                    </p>
                    {!isSingle && (
                      <Link
                        to={`/music/tracks/${leadTrack.slug}`}
                        className="text-[11px] font-sans text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline"
                      >
                        buka lirik lagu ini →
                      </Link>
                    )}
                  </div>
                  <AudioPlayer src={leadTrack.audioUrl} title={leadTrack.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. SECTION SPESIFIK BERDASARKAN FORMAT:
             JIKA SINGLE: TAMPILKAN LIRIK LAGU LANGSUNG (KARENA SINGLE CUMA 1 LAGU)
             JIKA EP/ALBUM: TAMPILKAN DAFTAR LAGU (BUKAN REPERTOAR!) */}
      {isSingle ? (
        /* ================= TAMPILAN SINGLE: LIRIK LAGU LANGSUNG ================= */
        leadTrack?.lyrics ? (
          <section className="w-full border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#181714]/30 py-12 sm:py-16 my-10">
            <div className="w-full px-6 lg:px-12 xl:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E2DAC8]/80 dark:border-[#2D2B26]/80">
                  <div>
                    <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 block mb-1">
                      Naskah Lirik Resmi
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Lirik Lagu — {release.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-stone-500 hidden sm:block">
                    {singleStanzas.length} Bait · Single
                  </span>
                </div>

                {/* Grid 3 Kolom Lirik Bersebelahan di Desktop */}
                {(() => {
                  const perCol = Math.ceil(singleStanzas.length / 3);
                  const col1 = singleStanzas.slice(0, perCol);
                  const col2 = singleStanzas.slice(perCol, perCol * 2);
                  const col3 = singleStanzas.slice(perCol * 2);

                  return (
                    <div className={`grid grid-cols-1 ${singleStanzas.length > 4 ? 'md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12' : 'max-w-2xl'} items-start`}>
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
        ) : null
      ) : (
        /* ================= TAMPILAN EP / ALBUM: DAFTAR LAGU ================= */
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
            <div>
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
                Daftar Isi Rilisan
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Daftar Lagu ({tracks.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">Durasi</span>
          </div>

          <ol className="divide-y divide-[#E2DAC8]/70 dark:divide-[#2D2B26]/70 list-none m-0 p-0">
            {tracks.map((track) => (
              <li key={track.id}>
                <Link
                  to={`/music/tracks/${track.slug}`}
                  className="py-4 px-3 -mx-3 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors flex items-baseline justify-between group"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4 min-w-0 pr-4">
                    <span className="font-mono text-xs text-stone-400 dark:text-stone-500 w-6 shrink-0 group-hover:hidden">
                      {track.trackNumber.toString().padStart(2, '0')}.
                    </span>
                    <span className="w-6 shrink-0 hidden group-hover:flex items-center justify-start self-center text-stone-900 dark:text-stone-100">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors truncate">
                        {track.title}
                      </h3>
                      {track.description && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-sans line-clamp-1 mt-0.5">
                          {track.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-4 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-sans text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      buka lirik <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-400">
                      {track.duration}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 4. CATATAN DI BALIK RILISAN (PITA LEBAR FULL-WIDTH BLEED BAND) */}
      {release.behindTheRelease && (
        <section className="w-full border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/50 dark:bg-[#181714]/50 py-12 sm:py-16 my-8">
          <div className="w-full px-6 lg:px-12 xl:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400">
                  catatan studio · proses kreatif
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
                Di Balik Lahirnya Rilisan Ini.
              </h2>

              <div className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg font-sans leading-[1.88] text-stone-800 dark:text-stone-200 whitespace-pre-line space-y-4">
                {release.behindTheRelease}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans text-stone-500 dark:text-stone-400">
                <span className="font-serif italic text-stone-700 dark:text-stone-300">
                  &ldquo;Setiap nada yang dipetik membawa sisa sunyi di luar jendela.&rdquo;
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  — Sor, Sudut Kamar Rekam
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. LEMBAR KREDIT & PRODUKSI (KOLOM TERFOKUS: max-w-4xl) */}
      {release.credits && release.credits.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
          <div className="pb-3 mb-6 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
              Dokumentasi Produksi
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Kredit & Personel Rekaman
            </h2>
          </div>

          <dl className="divide-y divide-[#E2DAC8]/60 dark:divide-[#2D2B26]/60 text-xs sm:text-sm font-sans bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 border border-[#E2DAC8] dark:border-[#2D2B26] p-5 sm:p-6">
            {release.credits.map((credit, idx) => (
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

      {/* 6. NAVIGASI PREV / NEXT RILISAN (FULL-WIDTH PITA DI BAWAH) */}
      <nav
        aria-label="Navigasi rilisan musik"
        className="w-full px-6 lg:px-12 xl:px-16 mt-8 sm:mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-2">
          {prevRelease ? (
            <Link
              to={`/music/releases/${prevRelease.slug}`}
              className="group p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex items-start gap-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26]">
                {prevRelease.coverArtUrl && (
                  <img
                    src={prevRelease.coverArtUrl}
                    alt={prevRelease.title}
                    className="w-full h-full object-cover grayscale-[10%]"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-1 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  rilisan sebelumnya
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug truncate">
                  {prevRelease.title}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono uppercase mt-1">
                  {prevRelease.releaseType} · {prevRelease.displayYear}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 sm:p-8 flex items-center justify-center text-xs text-stone-400 font-sans italic">
              Awal dari katalog diskografi
            </div>
          )}

          {nextRelease ? (
            <Link
              to={`/music/releases/${nextRelease.slug}`}
              className="group p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/30 dark:bg-[#1A1916]/30 hover:bg-[#EFE9DF]/70 dark:hover:bg-[#1A1916]/70 transition-all flex items-start justify-between gap-4 text-left md:text-right"
            >
              <div className="flex-1 min-w-0 order-2 md:order-1">
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 inline-flex items-center gap-1.5 mb-1 md:self-end group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                  rilisan berikutnya
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug truncate">
                  {nextRelease.title}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono uppercase mt-1">
                  {nextRelease.releaseType} · {nextRelease.displayYear}
                </p>
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 aspect-square overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] order-1 md:order-2">
                {nextRelease.coverArtUrl && (
                  <img
                    src={nextRelease.coverArtUrl}
                    alt={nextRelease.title}
                    className="w-full h-full object-cover grayscale-[10%]"
                  />
                )}
              </div>
            </Link>
          ) : (
            <div className="hidden md:block border border-dashed border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 p-6 sm:p-8 flex items-center justify-center text-xs text-stone-400 font-sans italic text-right">
              Akhir dari katalog diskografi
            </div>
          )}
        </div>
      </nav>
    </article>
  );
};
