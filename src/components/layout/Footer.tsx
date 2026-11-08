import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Mail, Disc3, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#181816] dark:bg-[#100F0E] text-[#F3EFE6] pt-14 pb-12 border-t border-[#2B2A27] transition-colors">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        {/* Top Colophon Grid: 4 Balanced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#2B2A27]">
          {/* Column 1: Imprint & Manifesto (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                to="/"
                className="text-3xl font-serif font-bold tracking-tight text-[#F3EFE6] hover:text-stone-300 transition-colors inline-block"
              >
                sorside<span className="text-stone-500 font-normal">.</span>
              </Link>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9E9A91] font-sans mt-1.5">
                Independent Creative Imprint
              </p>
              <p className="text-xs sm:text-sm text-[#BDB7AB] font-sans leading-relaxed mt-4 max-w-sm">
                Ruang arsip personal dan publikasi kreatif independen karya Sor—mengumpulkan tulisan yang jujur, pengamatan sudut-sudut kota, dan rekaman musik akustik yang intim.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#262522]">
              <p className="text-[11px] font-serif italic text-stone-400">
                &ldquo;Di antara sudut kota yang bising, selalu ada sisi sunyi yang menunggu didengar.&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: Words & Catalog (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C877D] font-semibold mb-4">
              Words
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D5CEC2]">
              <li>
                <Link to="/writing?category=reflection" className="hover:text-white transition-colors">
                  Reflections
                </Link>
              </li>
              <li>
                <Link to="/writing?category=essay" className="hover:text-white transition-colors">
                  Essays
                </Link>
              </li>
              <li>
                <Link to="/writing?category=opinion" className="hover:text-white transition-colors">
                  Opinions
                </Link>
              </li>
              <li>
                <Link to="/writing" className="hover:text-white transition-colors inline-flex items-center gap-1 text-stone-400 hover:text-stone-200">
                  All Archive <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sounds & Records (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C877D] font-semibold mb-4">
              Sounds
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D5CEC2]">
              <li>
                <Link to="/music/releases/sudut-dan-bayangan" className="hover:text-white transition-colors">
                  EP: Sudut & Bayangan
                </Link>
              </li>
              <li>
                <Link to="/music/releases/langkah-yang-tertinggal" className="hover:text-white transition-colors">
                  Single: Langkah yang Tertinggal
                </Link>
              </li>
              <li>
                <Link to="/music/tracks/dialog-tengah-malam" className="hover:text-white transition-colors">
                  Dialog Tengah Malam
                </Link>
              </li>
              <li>
                <Link to="/music" className="hover:text-white transition-colors inline-flex items-center gap-1 text-stone-400 hover:text-stone-200">
                  Music Archive <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Colophon & Technical Note (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C877D] font-semibold mb-4">
              Colophon
            </h4>
            <div className="space-y-3 text-xs text-[#BDB7AB] leading-relaxed font-sans">
              <p>
                Diterbitkan secara mandiri. Didesain dengan kanvas editorial lebar yang mengutamakan ritme tenang dan kenyamanan membaca.
              </p>
              <p className="text-[11px] text-stone-400">
                Typography: <span className="font-serif italic text-stone-300">Playfair Display</span> & <span className="text-stone-300">Plus Jakarta Sans</span>.
              </p>
              <div className="pt-2 flex items-center gap-4 text-[#D5CEC2]">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contact@sorside.com"
                  aria-label="Email"
                  className="hover:text-white transition-colors"
                  title="Direct Letter / Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#9E9A91] font-sans">
          <p>© 2026 sorside archive. All rights reserved by Sor.</p>
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-[#C0B9AD]">Every side has a story.</span>
            <span>·</span>
            <Link to="/about" className="hover:text-stone-300 underline underline-offset-2">
              About the Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
