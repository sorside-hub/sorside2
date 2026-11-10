import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, Disc3 } from 'lucide-react';
import { getArticlePlainText } from '../../content/articles';
import { useArticles } from '../../context/ArticlesContext';
import { RELEASES, TRACKS } from '../../content/music';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { articles } = useArticles();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // 1. Filter Tulisan
  const filteredArticles = q
    ? articles.filter((article) => {
        const plainText = getArticlePlainText(article.content);
        return (
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q) ||
          plainText.toLowerCase().includes(q)
        );
      })
    : [];

  // 2. Filter Rilisan Musik
  const filteredReleases = q
    ? RELEASES.filter((release) => {
        return (
          release.title.toLowerCase().includes(q) ||
          release.releaseType.toLowerCase().includes(q) ||
          (release.description && release.description.toLowerCase().includes(q))
        );
      })
    : [];

  // 3. Filter Trek Lagu
  const filteredTracks = q
    ? TRACKS.filter((track) => {
        return (
          track.title.toLowerCase().includes(q) ||
          (track.description && track.description.toLowerCase().includes(q))
        );
      })
    : [];

  const hasResults =
    filteredArticles.length > 0 ||
    filteredReleases.length > 0 ||
    filteredTracks.length > 0;

  const handleSelectArticle = (slug: string) => {
    onClose();
    navigate(`/writing/${slug}`);
  };

  const handleSelectRelease = (slug: string) => {
    onClose();
    navigate(`/music/releases/${slug}`);
  };

  const handleSelectTrack = (slug: string) => {
    onClose();
    navigate(`/music/tracks/${slug}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#F8F5F0] dark:bg-[#1E1C19] border border-[#E2DAC8] dark:border-[#2D2B26] rounded-xl shadow-2xl overflow-hidden transition-all text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E2DAC8] dark:border-[#2D2B26]">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            placeholder="Cari tulisan, rilisan musik, atau trek lagu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 mr-2 cursor-pointer"
              aria-label="Hapus kata kunci"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-mono text-stone-500 bg-stone-200/60 dark:bg-stone-800 dark:text-stone-400 rounded border border-stone-300 dark:border-stone-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-5">
          {q === '' ? (
            <div className="py-10 text-center text-stone-500 dark:text-stone-400 text-xs font-sans">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-stone-400 dark:text-stone-600 stroke-[1.5]" />
              Ketik kata kunci untuk mencari tulisan esai atau karya musik di arsip sorside.
            </div>
          ) : hasResults ? (
            <div className="space-y-4">
              {/* Grup Tulisan */}
              {filteredArticles.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>Tulisan ({filteredArticles.length})</span>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {filteredArticles.map((article) => (
                      <li key={article.slug}>
                        <button
                          onClick={() => handleSelectArticle(article.slug)}
                          className="w-full text-left p-3 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors group flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div>
                            <div className="text-[10px] font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-0.5">
                              {article.category} · {article.displayDate}
                            </div>
                            <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 mt-0.5 font-sans">
                              {article.excerpt}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-2" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Grup Rilisan Musik */}
              {filteredReleases.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>Rilisan Musik ({filteredReleases.length})</span>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {filteredReleases.map((release) => (
                      <li key={release.id}>
                        <button
                          onClick={() => handleSelectRelease(release.slug)}
                          className="w-full text-left p-3 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors group flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 aspect-square shrink-0 overflow-hidden bg-stone-200 dark:bg-stone-800 border border-[#E2DAC8] dark:border-[#2D2B26]">
                              {release.coverArtUrl ? (
                                <img
                                  src={release.coverArtUrl}
                                  alt={release.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Disc3 className="w-4 h-4 text-stone-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-[10px] font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400">
                                {release.releaseType.toUpperCase()} · {release.displayYear}
                              </div>
                              <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                                {release.title}
                              </h4>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Grup Trek Lagu */}
              {filteredTracks.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>Trek Lagu ({filteredTracks.length})</span>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {filteredTracks.map((track) => (
                      <li key={track.id}>
                        <button
                          onClick={() => handleSelectTrack(track.slug)}
                          className="w-full text-left p-2.5 px-3 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors group flex items-baseline justify-between gap-2 cursor-pointer"
                        >
                          <div className="flex items-baseline gap-2 truncate">
                            <span className="text-[10px] font-mono text-stone-400">0{track.trackNumber}.</span>
                            <span className="text-xs font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 truncate">
                              {track.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 shrink-0">
                            {track.duration}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center text-stone-500 dark:text-stone-400 text-xs font-sans">
              Tidak ada tulisan atau musik yang cocok dengan &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
