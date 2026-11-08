import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#161513] text-[#F3EFE6] border-t border-[#2B2A27] py-10 sm:py-12 transition-colors">
      {/* Baris Utama: Brand, Navigasi Ringkas, Sosial Media */}
      <div className="w-full px-6 lg:px-12 xl:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#262522]">
        {/* Kiri: Brand & Deskripsi Ringkas */}
        <div className="space-y-1">
          <Link
            to="/"
            className="text-2xl font-serif font-bold tracking-tight text-[#F3EFE6] hover:text-stone-300 transition-colors inline-block"
          >
            sorside<span className="text-stone-500 font-normal">.</span>
          </Link>
          <p className="text-xs text-stone-400 font-sans">
            Ruang karya mandiri Sor — catatan pemikiran dan musik akustik.
          </p>
        </div>

        {/* Tengah: Navigasi Cepat Sederhana */}
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs uppercase tracking-[0.16em] font-sans text-stone-400">
          <Link to="/" className="hover:text-stone-100 transition-colors">
            beranda
          </Link>
          <span className="text-stone-600 select-none">/</span>
          <Link to="/writing" className="hover:text-stone-100 transition-colors">
            tulisan
          </Link>
          <span className="text-stone-600 select-none">/</span>
          <Link to="/music" className="hover:text-stone-100 transition-colors">
            musik
          </Link>
          <span className="text-stone-600 select-none">/</span>
          <Link to="/about" className="hover:text-stone-100 transition-colors">
            tentang
          </Link>
        </nav>

        {/* Kanan: Tautan Sosial & Surel */}
        <div className="flex items-center gap-4 text-stone-400">
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
            aria-label="Surel"
            className="hover:text-white transition-colors"
            title="Surel"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Baris Bawah: Hak Cipta & Kutipan */}
      <div className="w-full px-6 lg:px-12 xl:px-16 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-sans text-stone-500">
        <p>© 2026 sorside. Semua karya dilindungi hak cipta oleh Sor.</p>
        <p className="font-serif italic text-stone-400">&ldquo;Every side has a story.&rdquo;</p>
      </div>
    </footer>
  );
};
