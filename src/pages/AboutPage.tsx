import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { ABOUT_PORTRAIT_IMAGE } from '../content/articles';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-2">
          Identity & Archive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100">
          About sorside.
        </h1>
        <p className="mt-3 text-lg font-serif italic text-stone-600 dark:text-stone-400">
          &ldquo;Every side has a story.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Portrait & Details */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          <div className="overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-sm">
            <img
              src={ABOUT_PORTRAIT_IMAGE}
              alt="Portrait silhouette of author looking out over city"
              className="w-full h-80 object-cover grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-4 border border-[#E2DAC8] dark:border-[#2D2B26] text-xs font-sans text-stone-600 dark:text-stone-400 space-y-2">
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Creative Identity:</span> sorside
            </div>
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Discipline:</span> Writing, Music
            </div>
            <div>
              <span className="font-semibold text-stone-900 dark:text-stone-200">Established:</span> 2026
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="md:col-span-7 font-sans text-base sm:text-lg leading-[1.8] text-stone-700 dark:text-stone-300 space-y-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Sebuah ruang independen untuk merawat pemikiran.
            </h2>
            <p>
              Sorside adalah ruang untuk menyimpan dan membagikan sisi-sisi dari Sor melalui tulisan, pengamatan personal, dan eksplorasi musik.
            </p>
          </div>

          <p>
            Nama sorside berasal dari Sor, sebuah panggilan, dan Side, yang berarti sisi. Sebuah identitas yang mewakili berbagai hal yang membentuk satu individu. Tidak terpaku pada satu minat, satu bentuk ekspresi, atau satu cara berkarya.
          </p>

          <p>
            Situs ini menjadi rumah digital bagi berbagai gagasan dan karya yang lahir dari pengalaman, pengamatan, serta kegelisahan sehari-hari. Sebuah tempat untuk menyimpan sesuatu yang mungkin terlalu sayang untuk dibiarkan berlalu begitu saja.
          </p>

          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 pt-4">
            Eksplorasi yang Berjalan
          </h3>

          <ul className="space-y-4 text-sm sm:text-base">
            <li className="flex items-start gap-2.5">
              <span className="text-stone-400 dark:text-stone-500 font-mono text-sm pt-0.5">01.</span>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 font-serif text-base block mb-0.5">Writing</strong>
                <p className="text-stone-600 dark:text-stone-400">
                  Ruang untuk mengurai pikiran, menuangkan keresahan, dan merangkai pengalaman menjadi tulisan.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-stone-400 dark:text-stone-500 font-mono text-sm pt-0.5">02.</span>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 font-serif text-base block mb-0.5">Music</strong>
                <p className="text-stone-600 dark:text-stone-400">
                  Ruang untuk mengekspresikan berbagai hal melalui musik.
                </p>
              </div>
            </li>
          </ul>

          <div className="pt-6 border-t border-[#E2DAC8] dark:border-[#2D2B26] flex flex-wrap items-center gap-6">
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-sm font-sans font-medium text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >
              Explore Writing Archive <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:contact@sorside.com"
              className="inline-flex items-center gap-2 text-sm font-sans text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Mail className="w-4 h-4" /> Say hello
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
