import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, BookOpen, Music, Disc3, Compass } from 'lucide-react';
import { ABOUT_PORTRAIT_IMAGE } from '../content/articles';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 bg-[#F4EFEA] dark:bg-[#161513] transition-colors">
      {/* 1. HEADER & PERNYATAAN SIKAP (FULL-WIDTH MASTHEAD) */}
      <div className="mb-12 sm:mb-16 pb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="max-w-4xl">
          <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-500 dark:text-stone-400 mb-2">
            manifesto & identitas · sorside
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            tentang sorside<span className="text-stone-400 dark:text-stone-600 font-normal">.</span>
          </h1>
          <blockquote className="mt-4 text-base sm:text-xl lg:text-2xl font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl">
            &ldquo;Sebuah ruang mandiri untuk merawat pemikiran, merekam suara-suara kota, dan mendokumentasikan apa yang tak sempat diucapkan.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* 2. PROFIL SINEMATIK & NARASI LAHIRNYA SORSIDE (ASYMMETRICAL 2-COLUMN) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 sm:pb-24 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        {/* Kolom Kiri: Potret & Kartu Data Studio */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Potret Siluet Sor */}
          <div className="overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group">
            <img
              src={ABOUT_PORTRAIT_IMAGE}
              alt="Potret siluet Sor memandang cakrawala kota"
              className="w-full h-80 sm:h-96 lg:h-[440px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
              Dokumentasi Studio · Sorside
            </div>
          </div>

          {/* Kartu Arsip Redaksi */}
          <div className="p-5 bg-[#EFE9DF]/60 dark:bg-[#1A1916]/60 border border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans text-stone-600 dark:text-stone-400 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Nama Imprint</span>
              <span className="font-serif italic text-stone-800 dark:text-stone-300">sorside.</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Inisiator & Pengkarya</span>
              <span>Sor</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Disiplin / Medium</span>
              <span>Esai, Tulisan Reflektif, Musik Akustik</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Lokasi Rekam</span>
              <span>Kamar Sisi Selatan</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-200">Berdiri Sejak</span>
              <span className="font-mono">2026</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Esai Manifesto Personal */}
        <div className="lg:col-span-7 font-sans text-sm sm:text-base leading-[1.9] text-stone-700 dark:text-stone-300 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-2">
              01 · Latar Belakang
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4 leading-snug">
              Bukan ruang bising yang menuntut algoritma.
            </h2>
            <p className="text-stone-800 dark:text-stone-200 text-base sm:text-lg font-serif italic leading-relaxed">
              Sorside lahir dari keinginan sederhana: memiliki satu sudut tenang di internet di mana kata-kata dan bunyi tidak diukur oleh metrik viralitas atau keharusan untuk menyenangkan semua orang.
            </p>
          </div>

          <p>
            Nama <span className="font-serif font-bold text-stone-900 dark:text-stone-100">sorside</span> berakar dari dua hal: <span className="italic">Sor</span>, nama panggilan saya, dan <span className="italic">Side</span>, yang berarti sisi-sisi. Setiap manusia adalah gabungan dari banyak sisi—ada sisi yang kita tampilkan dengan rapi di hadapan publik, dan ada sisi yang hanya berani berbisik di larut malam ketika lampu jalan mulai menyala dan deru kota mereda.
          </p>

          <p>
            Di era di mana kita terus-menerus didesak untuk memadatkan pemikiran menjadi potongan konten 15 detik, saya merasa kehilangan ruang untuk berpikir secara utuh. Sorside adalah tempat saya mengembalikan waktu: menulis esai yang membutuhkan jeda napas, merekam petikan gitar yang tidak dipoles autotune, dan mengamati kota dari jendela kamar tanpa tergesa-gesa.
          </p>

          <div className="pt-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-2">
              02 · Pendekatan Berkarya
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
              Merawat kejujuran di antara ragu.
            </h3>
            <p>
              Karya di sorside tidak berpretensi memberikan nasihat hidup atau panduan kesuksesan. Tulisan dan musik di sini lebih mirip catatan harian terbuka—tentang bagaimana kita belajar berdamai dengan ketidakpastian, tentang orang-orang yang diam-diam membentuk kita, dan tentang rasa sepi yang ternyata dialami oleh hampir semua orang yang berpapasan di trotoar.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DUA SAYAP KARYA: TULISAN VS MUSIK (TWO BROAD COLUMNS) */}
      <section className="pb-16 sm:pb-24 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-stone-500">
              Dua Bentuk Ekspresi
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Kata & Bunyi di Sorside
            </h2>
          </div>
          <span className="text-xs font-serif italic text-stone-500 hidden sm:block">
            Dua medium yang saling melengkapi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Kolom 1: Tulisan */}
          <div className="p-6 sm:p-8 bg-[#EFE9DF]/50 dark:bg-[#1A1916]/50 border border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  01 · Katalog Tulisan
                </span>
                <BookOpen className="w-4 h-4 text-stone-500" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
                Esai, Refleksi, dan Pengamatan Ruang.
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed mb-6">
                Ruang untuk menuangkan keresahan manusiawi, mengurai keraguan yang sering ditutupi, dan mencatat fragmen kecil interaksi sosial di kota. Murni teks tanpa tuntutan sensor atau tren visual.
              </p>
            </div>

            <Link
              to="/writing"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 pt-4"
            >
              jelajahi katalog tulisan <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Kolom 2: Musik */}
          <div className="p-6 sm:p-8 bg-[#EFE9DF]/50 dark:bg-[#1A1916]/50 border border-[#E2DAC8] dark:border-[#2D2B26] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#E2DAC8]/70 dark:border-[#2D2B26]/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  02 · Katalog Musik
                </span>
                <Music className="w-4 h-4 text-stone-500" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
                Akustik Mandiri, Gitar Nilon, dan Suara Kota.
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed mb-6">
                Nomor-nomor lagu yang direkam langsung larut malam di kamar tidur dengan mikrofon tunggal. Mempertahankan gesekan senar pada fret, tarikan napas, dan suara hujan apa adanya.
              </p>
            </div>

            <Link
              to="/music"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors border-t border-[#E2DAC8]/70 dark:border-[#2D2B26]/70 pt-4"
            >
              jelajahi katalog musik <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. RUANG KORESPONDENSI & SUREL (DIRECT LETTER DESK) */}
      <section className="pt-8">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-[#EFE9DF]/70 dark:bg-[#1A1916]/70 border border-[#E2DAC8] dark:border-[#2D2B26] text-center">
          <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 mb-2">
            Meja Korespondensi
          </p>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
            Pintu surat selalu terbuka.
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-xl mx-auto mb-8">
            Jika ada pemikiran yang bersinggungan, tanggapan atas esai, atau sekadar ingin bertukar salam di larut malam, silakan kirimkan surel langsung ke ruang kerja saya.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@sorside.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity text-xs font-sans font-semibold tracking-wider uppercase"
            >
              <Mail className="w-4 h-4" />
              <span>kirim surel: contact@sorside.com</span>
            </a>
          </div>

          <p className="text-[11px] font-serif italic text-stone-500 dark:text-stone-400 mt-6">
            &ldquo;Every side has a story.&rdquo; — Sor, sorside imprint
          </p>
        </div>
      </section>
    </div>
  );
};
