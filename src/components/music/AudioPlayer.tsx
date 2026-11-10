import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src?: string;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const hasAudio = Boolean(src && src.trim().length > 0 && !hasError);

  useEffect(() => {
    setHasError(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const audio = audioRef.current;
    if (!audio || !src) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setIsPlaying(false);
      setHasError(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time <= 0) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 sm:p-5 border border-[#E2DAC8] dark:border-[#2D2B26] bg-[#EFE9DF]/60 dark:bg-[#1A1916]/60 text-stone-900 dark:text-stone-100 transition-colors">
      {src && <audio ref={audioRef} src={src} preload="metadata" />}

      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          {hasAudio ? 'Pemutar Audio · Pratinjau Trek' : 'Arsip Studio · Pratinjau Audio'}
        </span>
        <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400">
          {hasAudio ? `${formatTime(currentTime)} / ${formatTime(duration)}` : 'Segera Hadir'}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={!hasAudio}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          className={`w-10 h-10 flex items-center justify-center transition-all shrink-0 cursor-pointer ${
            hasAudio
              ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-2xs'
              : 'bg-stone-300 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-60'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Scrubber slider / Track bar */}
        <div className="flex-1">
          {hasAudio ? (
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Audio progress scrubber"
              className="w-full h-1.5 bg-[#E2DAC8] dark:bg-[#2D2B26] appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
            />
          ) : (
            <div className="w-full py-1 text-xs font-sans text-stone-500 dark:text-stone-400 italic truncate">
              File audio master dapat diunggah lewat Sanity Studio
            </div>
          )}
        </div>

        {/* Volume Mute Toggle */}
        {hasAudio && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

