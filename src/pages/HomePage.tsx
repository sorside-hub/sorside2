import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc3 } from 'lucide-react';
import { ARTICLES, ABOUT_PORTRAIT_IMAGE } from '../content/articles';
import { getVisibleReleases, TRACKS, getTracksForRelease } from '../content/music';
import { AudioPlayer } from '../components/music/AudioPlayer';

export const HomePage: React.FC = () => {
  const featuredArticle = ARTICLES[0]; // Writing Pilihan: "Tentang hal-hal yang terus kita tunda"
  const latestArticles = ARTICLES.slice(1, 4); // Writing Terbaru: "Menjadi Minato", "Kita, dan Kota Ini", "Catatan dari Ruang Tengah"
  const releases = getVisibleReleases();
  
  // Latest Release (EP "Sudut dan Bayangan")
  const latestRelease = releases.find((r) => r.slug === 'sudut-dan-bayangan') || releases[0];
  const latestReleaseTracks = getTracksForRelease(latestRelease);

  // Featured Music / Acoustic Spotlight ("Langkah yang Tertinggal")
  const featuredTrack = TRACKS[0];
  const featuredRelease = releases.find((r) => r.id === featuredTrack.releaseId) || releases[0];

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-14">
      {/* =========================================================================
          PAIR 1: WRITING PILIHAN (MURNI TIPOGRAFI LITERER 68%) + RILIS MUSIK (32%)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-20">
        {/* Kolom Kiri (68% / 8 cols): TULISAN PILIHAN (Pure Broadsheet Literary Feature) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Kicker & Meta */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-stone-600 dark:text-stone-400">
              Tulisan · Sorotan
            </span>
            <span className="text-stone-400 dark:text-stone-600 text-xs">/</span>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              Esai Pilihan · 12 Menit Baca
            </span>
          </div>

          {/* Lead Headline */}
          <Link
            to={`/writing/${featuredArticle.slug}`}
            className="group block mb-4"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors leading-[1.08] max-w-4xl text-balance">
              {featuredArticle.title}
            </h1>
          </Link>

          {/* Standfirst / Dek */}
          <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed mb-6 max-w-3xl">
            &ldquo;{featuredArticle.excerpt}&rdquo;
          </p>

          {/* Byline Strip */}
          <div className="flex items-center gap-3 text-xs font-sans text-stone-600 dark:text-stone-400 mb-8 pb-4 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
            <span>{featuredArticle.displayDate}</span>
            <span>·</span>
            <span>Refleksi & Esai</span>
            <span>·</span>
            <span className="text-stone-500 font-mono">Arsip #01</span>
          </div>

          {/* Pure Literary Broadsheet Body (NO IMAGE: Teks Murni Berbobot) */}
          <div className="bg-[#EFE9DF]/40 dark:bg-[#1A1916]/40 p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] mb-6 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Kolom Pembuka Esai (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-sans leading-[1.85]">
                  <span className="text-4xl sm:text-5xl font-serif font-bold float-left mr-3 mt-1 leading-none text-stone-900 dark:text-stone-100">A</span>
                  da jarak yang aneh antara mengetahui apa yang harus dilakukan dan benar-benar melangkah untuk melakukannya. Sebagian besar dari kita tidak terhenti karena ketidaktahuan, melainkan karena di balik setiap tindakan ada kemungkinan gagal atau tuntutan untuk menghadapi realitas yang belum tentu ramah.
                </p>
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans leading-[1.85]">
                  Di sela hari-hari yang tampak sibuk, kita terus menumpuk draf setengah jadi, rekaman suara mentah, dan rencana-rencana yang kita klaim hanya butuh &ldquo;sedikit waktu senggang lagi&rdquo; sebelum akhirnya benar-benar dimulai...
                </p>
              </div>

              {/* Kolom Kutipan Kunci / Pull-Quote (5 cols) */}
              <div className="md:col-span-5 md:pl-6 md:border-l border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col justify-between h-full pt-4 md:pt-0">
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                  &ldquo;Menunda sering kali bukan soal kemalasan, melainkan ketakutan diam-diam bahwa apa yang kita hasilkan tidak akan seindah apa yang ada di kepala.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-[#E2DAC8]/60 dark:border-[#2D2B26]/60">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                    — Catatan Sor, Sudut Meja Kerja
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <Link
              to={`/writing/${featuredArticle.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-wider text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors border-b-2 border-stone-900 dark:border-stone-100 pb-0.5"
            >
              baca esai lengkap <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/writing"
              className="text-xs font-sans text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              arsip semua tulisan →
            </Link>
          </div>
        </div>

        {/* Kolom Kanan (32% / 4 cols): RILIS MUSIK TERBARU (Kompak) */}
        <div className="lg:col-span-4 lg:pl-10 xl:pl-14 lg:border-l border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col space-y-8 pt-8 lg:pt-0 border-t lg:border-t-0">
          <div className="bg-[#EFE9DF]/80 dark:bg-[#1C1B18]/80 p-5 sm:p-6 border border-[#E2DAC8] dark:border-[#2D2B26] rounded-sm shadow-2xs max-w-md w-full">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
                <Disc3 className="w-4 h-4 text-stone-600 dark:text-stone-400 animate-spin-slow" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase">
                  Musik · Terbaru
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                {latestRelease.releaseType}
              </span>
            </div>

            {/* Album Cover & Identity */}
            <div className="flex flex-col gap-4 mb-4">
              <Link
                to={`/music/releases/${latestRelease.slug}`}
                className="block overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] aspect-square w-full relative group"
              >
                {latestRelease.coverArtUrl && (
                  <img
                    src={latestRelease.coverArtUrl}
                    alt={latestRelease.coverArtAlt || latestRelease.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="lazy"
                  />
                )}
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
                  {latestRelease.displayYear}
                </span>
              </Link>

              <div>
                <Link to={`/music/releases/${latestRelease.slug}`}>
                  <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors leading-snug">
                    {latestRelease.title}
                  </h3>
                </Link>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mt-1.5 leading-relaxed">
                  {latestRelease.description}
                </p>
              </div>
            </div>

            {/* Repertoire Tracklist Preview */}
            <div className="pt-3 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 mb-4">
              <p className="text-[10px] font-sans uppercase tracking-widest text-stone-500 mb-2">
                Daftar Trek ({latestReleaseTracks.length})
              </p>
              <div className="space-y-1.5 text-xs font-sans">
                {latestReleaseTracks.map((trk, i) => (
                  <Link
                    key={trk.id}
                    to={`/music/tracks/${trk.slug}`}
                    className="flex items-baseline justify-between py-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors group"
                  >
                    <span className="flex items-baseline gap-2 truncate">
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">0{i + 1}.</span>
                      <span className="truncate group-hover:underline">{trk.title}</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 shrink-0 ml-3">{trk.duration}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex items-center justify-between text-xs">
              <Link
                to={`/music/releases/${latestRelease.slug}`}
                className="text-stone-900 dark:text-stone-100 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Buka Rilisan EP <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/music"
                className="text-stone-500 dark:text-stone-400 hover:text-stone-700 text-[11px]"
              >
                Katalog Musik
              </Link>
            </div>
          </div>

          {/* Quick Studio Note */}
          <div className="p-4 bg-stone-100/60 dark:bg-stone-900/40 border border-[#E2DAC8]/60 dark:border-[#2D2B26]/60 max-w-md w-full">
            <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
              &ldquo;Musik di sorside bukan tentang kesempurnaan teknis, melainkan tentang menangkap tarikan napas dan kejujuran bunyi di larut malam.&rdquo;
            </p>
            <p className="text-[10px] font-sans uppercase tracking-widest text-stone-500 mt-2">
              — Sor, Catatan Studio
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          JEDA NAPAS: 1 KALIMAT KONTEMPLATIF
          Full-bleed horizontal band dengan kutipan di tengah
         ========================================================================= */}
      <section className="-mx-6 lg:-mx-12 xl:-mx-16 px-6 lg:px-12 xl:px-16 border-t border-b border-[#E2DAC8] dark:border-[#2D2B26] py-12 sm:py-16 my-16 sm:my-24 bg-[#EFE9DF]/40 dark:bg-[#181714]/40 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 dark:text-stone-400 mb-3">
            Goresan Pemikiran
          </p>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-stone-800 dark:text-stone-100 leading-snug sm:leading-relaxed">
            &ldquo;Di antara sudut-sudut kota yang bising, selalu ada sisi sunyi yang menunggu untuk didengar.&rdquo;
          </blockquote>
          <p className="text-xs font-sans text-stone-500 dark:text-stone-400 mt-4">
            Dari catatan lagu <span className="font-serif italic text-stone-700 dark:text-stone-300">Langkah yang Tertinggal</span>
          </p>
        </div>
      </section>

      {/* =========================================================================
          PAIR 2: WRITING TERBARU (KIRI 32%) + MUSIK PILIHAN (KANAN 68%)
          Struktur diagonal yang seimbang: 
          Kiri = Tulisan (Pilihan 68% di atas, Terbaru 32% di bawah)
          Kanan = Bunyi/Musik (Rilisan 32% di atas, Pilihan 68% di bawah)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-24">
        {/* Kolom Kiri (32% / 4 cols): WRITING TERBARU (Kompak & Rapi) */}
        <div className="lg:col-span-4 lg:pr-10 xl:pr-14 lg:border-r border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4 mb-5 pb-2.5 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-800 dark:text-stone-200">
                Tulisan · Terbaru
              </span>
              <Link
                to="/writing"
                className="text-xs font-serif italic text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              >
                Semua Tulisan →
              </Link>
            </div>

            {/* List 3 Tulisan Terbaru */}
            <div className="divide-y divide-[#E2DAC8]/70 dark:divide-[#2D2B26]/70">
              {latestArticles.map((article, idx) => (
                <article key={article.slug} className="py-5 first:pt-0 last:pb-0 group">
                  <div className="flex items-baseline gap-2 text-[10px] font-mono text-stone-500 mb-1.5">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">0{idx + 1}.</span>
                    <span className="uppercase tracking-wider">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link to={`/writing/${article.slug}`}>
                    <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                      {article.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/writing/${article.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-stone-900 dark:text-stone-200 group-hover:text-stone-600 dark:group-hover:text-stone-400 mt-2 transition-colors"
                  >
                    baca <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              ))}
            </div>

            {/* Koleksi Tulisan Link Box */}
            <div className="mt-8 p-4 bg-[#EFE9DF]/60 dark:bg-[#1A1916]/60 border border-[#E2DAC8] dark:border-[#2D2B26]">
              <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed mb-2">
                &ldquo;Ruang untuk mengurai pikiran, menuangkan keresahan, dan merangkai pengalaman menjadi tulisan.&rdquo;
              </p>
              <Link
                to="/writing"
                className="text-xs font-sans font-semibold text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1.5"
              >
                katalog tulisan <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (68% / 8 cols): MUSIK PILIHAN (The Acoustic Spotlight Hero) */}
        <div className="lg:col-span-8 flex flex-col pt-8 lg:pt-0 border-t lg:border-t-0 border-[#E2DAC8] dark:border-[#2D2B26]">
          {/* Kicker & Meta */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-stone-600 dark:text-stone-400">
              Musik · Sorotan
            </span>
          </div>

          {/* Headline Song Title */}
          <Link
            to={`/music/tracks/${featuredTrack.slug}`}
            className="group block mb-3"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors leading-[1.12]">
              {featuredTrack.title}
            </h2>
          </Link>

          <p className="text-base sm:text-lg font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed mb-6 max-w-2xl">
            &ldquo;Petikan gitar nilon mentah dan vokal lirih tentang momen ketika kita tahu harus melangkah, namun tetap diam di ambang pintu.&rdquo;
          </p>

          {/* Spotlight Music Box: Vinyl Artwork + Interactive Player */}
          <div className="bg-[#EFE9DF]/80 dark:bg-[#1C1B18]/80 p-6 sm:p-8 border border-[#E2DAC8] dark:border-[#2D2B26] mb-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-6">
              {/* Square Vinyl Sleeve Cover */}
              <div className="w-36 sm:w-44 aspect-square shrink-0 overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative">
                {featuredRelease.coverArtUrl && (
                  <img
                    src={featuredRelease.coverArtUrl}
                    alt={featuredTrack.title}
                    className="w-full h-full object-cover grayscale-[10%]"
                    loading="lazy"
                  />
                )}
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
                  Solo Demo
                </span>
              </div>

              {/* Player & Details */}
              <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1">
                    Sor · Studio Rekam Sisi Selatan · 2026
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Dengarkan Rekaman Mentah
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mt-1">
                    Direkam larut malam dalam satu ruangan tanpa metronom atau autotune.
                  </p>
                </div>

                {/* Embedded HTML5 Audio Player */}
                <div className="mt-4">
                  {featuredTrack.audioUrl && (
                    <AudioPlayer
                      src={featuredTrack.audioUrl}
                      title={featuredTrack.title}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Behind the song & Lyric snippet */}
            <div className="pt-6 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Catatan di Balik Lagu
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic">
                  &ldquo;Melodi gitar ini muncul pertama kali di nada dasar D mayor terbuka (open D), memberikan ruang dengar yang lega dan sedikit murung.&rdquo;
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  sepenggal lirik
                </p>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                  Kopi sudah mendingin di sudut meja,<br />
                  buku-buku terbuka menatap tanpa kata...
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 flex items-center justify-between text-xs">
              <Link
                to={`/music/tracks/${featuredTrack.slug}`}
                className="text-stone-900 dark:text-stone-100 font-semibold inline-flex items-center gap-1.5 hover:underline"
              >
                lihat lengkap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/music"
                className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs"
              >
                jelajahi katalog musik →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STUDIO DESK & ABOUT SORSIDE (Kotak Intim)
         ========================================================================= */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="max-w-4xl mx-auto bg-[#F0EAE0]/60 dark:bg-[#1A1916]/60 p-6 sm:p-10 border border-[#E2DAC8] dark:border-[#2D2B26]">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            {/* Portrait & Manifesto */}
            <div className="w-28 h-36 sm:w-36 sm:h-48 shrink-0 overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-xs">
              <img
                src={ABOUT_PORTRAIT_IMAGE}
                alt="Portrait silhouette of author Sor looking over city"
                className="w-full h-full object-cover grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-1.5">
                tentang sorside
              </p>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Sorside & Ruang Kreasi Sor.
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed mb-4">
                Sorside bukan ruang bising yang menuntut algoritma. Ini adalah arsip personal dan publikasi kreatif tempat saya mencatat pengamatan kota, mengurai keraguan manusiawi, dan merekam petikan nada akustik yang lahir di sela-sela malam.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-stone-900 dark:text-stone-200 hover:text-stone-600 dark:hover:text-stone-400 transition-colors underline underline-offset-4"
              >
                baca lengkap <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
