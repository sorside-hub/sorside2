import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { ABOUT_PORTRAIT_IMAGE } from '../content/articles';
import {
  AboutPageData,
  fetchAboutPageFromSanity,
  subscribeToAboutPageFromSanity,
  isSanityConfigured,
} from '../lib/sanity';
import { ArticleBodyRenderer } from '../components/ui/ArticleBodyRenderer';

const DEFAULT_ABOUT_DATA: AboutPageData = {
  kicker: 'manifesto & identitas · sorside',
  heading: 'tentang sorside.',
  statement: 'Sebuah ruang mandiri untuk merawat pemikiran, merekam suara-suara kota, dan mendokumentasikan apa yang tak sempat diucapkan.',
  portraitCaption: 'Dokumentasi Studio · Sorside',
  storyTitle: 'Bukan ruang bising yang menuntut algoritma.',
  storyLead: 'Sorside lahir dari keinginan sederhana: memiliki satu sudut tenang di internet di mana kata-kata dan bunyi tidak diukur oleh metrik viralitas atau keharusan untuk menyenangkan semua orang.',
  storyBody: `Nama **sorside** berakar dari dua hal: *Sor*, nama panggilan saya, dan *Side*, yang berarti sisi-sisi. Setiap manusia adalah gabungan dari banyak sisi—ada sisi yang kita tampilkan dengan rapi di hadapan publik, dan ada sisi yang hanya berani berbisik di larut malam ketika lampu jalan mulai menyala dan deru kota mereda.

Di era di mana kita terus-menerus didesak untuk memadatkan pemikiran menjadi potongan konten 15 detik, saya merasa kehilangan ruang untuk berpikir secara utuh. Sorside adalah tempat saya mengembalikan waktu: menulis esai yang membutuhkan jeda napas, merekam petikan gitar yang tidak dipoles autotune, dan mengamati kota dari jendela kamar tanpa tergesa-gesa.

### 02 · Pendekatan Berkarya

#### Merawat kejujuran di antara ragu.

Karya di sorside tidak berpretensi memberikan nasihat hidup atau panduan kesuksesan. Tulisan dan musik di sini lebih mirip catatan harian terbuka—tentang bagaimana kita belajar berdamai dengan ketidakpastian, tentang orang-orang yang diam-diam membentuk kita, dan tentang rasa sepi yang ternyata dialami oleh hampir semua orang yang berpapasan di trotoar.`,
  contactHeading: 'Pintu surat selalu terbuka.',
  contactDescription: 'Jika ada pemikiran yang bersinggungan, tanggapan atas esai, atau sekadar ingin bertukar salam di larut malam, silakan kirimkan surel langsung ke ruang kerja saya.',
  contactEmail: 'contact@sorside.com',
};

export const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData>(DEFAULT_ABOUT_DATA);

  useEffect(() => {
    if (!isSanityConfigured()) return;

    // Ambil data dari Sanity saat pertama kali dibuka
    fetchAboutPageFromSanity().then((data) => {
      if (data) {
        setAboutData(data);
      }
    });

    // Aktifkan live sync ketika diedit di Sanity Studio
    const unsubscribe = subscribeToAboutPageFromSanity((updatedData) => {
      if (updatedData) {
        setAboutData(updatedData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const portraitSrc = aboutData.portraitImageUrl || ABOUT_PORTRAIT_IMAGE;

  return (
    <div className="w-full px-6 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 bg-[#F4EFEA] dark:bg-[#161513] transition-colors">
      {/* 1. HEADER & PERNYATAAN SIKAP (FULL-WIDTH MASTHEAD) */}
      <div className="mb-12 sm:mb-16 pb-8 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        <div className="max-w-4xl">
          <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-stone-500 dark:text-stone-400 mb-2">
            {aboutData.kicker}
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            {aboutData.heading}
          </h1>
          {aboutData.statement && (
            <blockquote className="mt-4 text-base sm:text-xl lg:text-2xl font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl">
              &ldquo;{aboutData.statement}&rdquo;
            </blockquote>
          )}
        </div>
      </div>

      {/* 2. PROFIL SINEMATIK & NARASI LAHIRNYA SORSIDE (ASYMMETRICAL 2-COLUMN) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 sm:pb-24 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
        {/* Kolom Kiri: Potret Studio */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Potret Siluet Sor */}
          <div className="overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26] shadow-sm relative group">
            <img
              src={portraitSrc}
              alt="Potret siluet Sor memandang cakrawala kota"
              className="w-full h-80 sm:h-96 lg:h-[440px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            {aboutData.portraitCaption && (
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-stone-900/80 text-white text-[9px] font-mono uppercase tracking-wider">
                {aboutData.portraitCaption}
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Esai Manifesto Personal */}
        <div className="lg:col-span-7 font-sans text-sm sm:text-base leading-[1.9] text-stone-700 dark:text-stone-300 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-2">
              01 · Latar Belakang
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4 leading-snug">
              {aboutData.storyTitle}
            </h2>
            {aboutData.storyLead && (
              <p className="text-stone-800 dark:text-stone-200 text-base sm:text-lg font-serif italic leading-relaxed">
                {aboutData.storyLead}
              </p>
            )}
          </div>

          {/* Isi Esai Dinamis dengan dukungan Markdown & PortableText */}
          {aboutData.storyBody && (
            <div className="prose-custom pt-2">
              <ArticleBodyRenderer content={aboutData.storyBody} fontFamily={aboutData.fontFamily || 'sans'} />
            </div>
          )}
        </div>
      </section>

      {/* 3. RUANG KORESPONDENSI & SUREL (DIRECT LETTER DESK) */}
      <section className="pt-12 sm:pt-16">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-[#EFE9DF]/70 dark:bg-[#1A1916]/70 border border-[#E2DAC8] dark:border-[#2D2B26] text-center">
          <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-stone-500 mb-2">
            Meja Korespondensi
          </p>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
            {aboutData.contactHeading}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-xl mx-auto mb-8">
            {aboutData.contactDescription}
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${aboutData.contactEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity text-xs font-sans font-semibold tracking-wider uppercase"
            >
              <Mail className="w-4 h-4" />
              <span>kirim surel: {aboutData.contactEmail}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
