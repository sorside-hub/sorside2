import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Release, Track } from '../types/music';
import {
  RELEASES,
  TRACKS,
  getVisibleReleases as getLocalVisibleReleases,
  getReleaseBySlug as getLocalReleaseBySlug,
  getReleaseById as getLocalReleaseById,
  getTrackBySlug as getLocalTrackBySlug,
  getTracksForRelease as getLocalTracksForRelease,
} from '../content/music';
import { isSanityConfigured, sanityClient, urlForImage } from '../lib/sanity';

interface MusicContextType {
  releases: Release[];
  tracks: Track[];
  visibleReleases: Release[];
  featuredRelease: Release;
  featuredTrack: Track;
  getReleaseBySlug: (slug: string) => Release | undefined;
  getReleaseById: (id: string) => Release | undefined;
  getTrackBySlug: (slug: string) => Track | undefined;
  getTracksForRelease: (release: Release) => Track[];
  isUsingSanityMusic: boolean;
  isLoadingSanityMusic: boolean;
  refreshMusic: () => Promise<void>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selalu inisialisasi awal dengan data lokal agar render pertama instan tanpa layar kosong
  const [releases, setReleases] = useState<Release[]>(() => RELEASES);
  const [tracks, setTracks] = useState<Track[]>(() => TRACKS);
  const [isUsingSanityMusic, setIsUsingSanityMusic] = useState<boolean>(false);
  const [isLoadingSanityMusic, setIsLoadingSanityMusic] = useState<boolean>(false);

  const loadSanityMusic = async () => {
    if (!isSanityConfigured() || !sanityClient) {
      setIsUsingSanityMusic(false);
      return;
    }

    setIsLoadingSanityMusic(true);
    try {
      // Query untuk mengambil dokumen Single dan EP/Album dari Sanity
      const musicQuery = `{
        "singles": *[_type == "single" && status != "draft"] | order(releaseDate desc) {
          _id,
          title,
          "slug": slug.current,
          releaseDate,
          displayYear,
          status,
          description,
          coverArt,
          coverArtAlt,
          "audioUrl": audioFile.asset->url,
          duration,
          lyrics,
          behindTheSong,
          spotifyUrl,
          youtubeUrl,
          appleMusicUrl,
          bandcampUrl,
          credits,
          featured
        },
        "albums": *[_type == "album" && status != "draft"] | order(releaseDate desc) {
          _id,
          title,
          "slug": slug.current,
          releaseType,
          releaseDate,
          displayYear,
          status,
          description,
          coverArt,
          coverArtAlt,
          behindTheRelease,
          spotifyUrl,
          youtubeUrl,
          appleMusicUrl,
          credits,
          featured,
          tracks[] {
            trackNumber,
            title,
            slug,
            duration,
            "audioUrl": audioFile.asset->url,
            lyrics,
            description,
            behindTheSong,
            spotifyUrl,
            youtubeUrl,
            credits
          }
        }
      }`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await sanityClient.fetch(musicQuery);

      const hasSingles = data?.singles && data.singles.length > 0;
      const hasAlbums = data?.albums && data.albums.length > 0;

      if (hasSingles || hasAlbums) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const buildStreamingLinks = (item: any) => {
          const links: { platform: string; url: string }[] = [];
          if (item?.spotifyUrl) links.push({ platform: 'Spotify', url: item.spotifyUrl });
          if (item?.youtubeUrl) links.push({ platform: 'YouTube', url: item.youtubeUrl });
          if (item?.appleMusicUrl) links.push({ platform: 'Apple Music', url: item.appleMusicUrl });
          if (item?.bandcampUrl) links.push({ platform: 'Bandcamp', url: item.bandcampUrl });
          return links;
        };

        const mappedReleases: Release[] = [];
        const mappedTracks: Track[] = [];

        // 1. Petakan Single (1 Dokumen Single = 1 Rilis + 1 Trek Lagu Langsung)
        if (hasSingles) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.singles.forEach((s: any) => {
            const singleSlug = s.slug || '';
            const singleLinks = buildStreamingLinks(s);
            const singleTrackId = `single-${s._id}`;

            mappedReleases.push({
              id: s._id,
              title: s.title || 'Tanpa Judul',
              slug: singleSlug,
              releaseType: 'single',
              releaseDate: s.releaseDate || new Date().toISOString().split('T')[0],
              displayYear: s.displayYear || new Date().getFullYear().toString(),
              status: s.status || 'released',
              description: s.description || '',
              coverArtUrl: s.coverArt ? urlForImage(s.coverArt) : undefined,
              coverArtAlt: s.coverArtAlt,
              audioUrl: s.audioUrl,
              behindTheRelease: s.behindTheSong || '',
              credits: s.credits || [],
              streamingLinks: singleLinks,
              featured: Boolean(s.featured),
              trackIds: [singleTrackId],
            });

            mappedTracks.push({
              id: singleTrackId,
              title: s.title || 'Tanpa Judul',
              slug: singleSlug,
              releaseId: s._id,
              trackNumber: 1,
              duration: s.duration || '03:30',
              status: s.status || 'released',
              description: s.description || '',
              coverArtUrl: s.coverArt ? urlForImage(s.coverArt) : undefined,
              coverArtAlt: s.coverArtAlt,
              audioUrl: s.audioUrl,
              lyrics: s.lyrics || '',
              behindTheSong: s.behindTheSong || '',
              credits: s.credits || [],
              relatedWritingIds: [],
              streamingLinks: singleLinks,
            });
          });
        }

        // 2. Petakan EP & Album (Audio & Lirik HANYA ada di masing-masing tracklist)
        if (hasAlbums) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.albums.forEach((alb: any) => {
            const albumSlug = alb.slug || '';
            const albumLinks = buildStreamingLinks(alb);
            const albumTrackIds: string[] = [];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (alb.tracks || []).forEach((t: any, idx: number) => {
              const trackNumber = t.trackNumber || idx + 1;
              const trackId = `${alb._id}-track-${trackNumber}`;
              const trackSlug = t.slug || t.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `track-${trackNumber}`;
              const trackLinks = buildStreamingLinks(t);

              albumTrackIds.push(trackId);
              mappedTracks.push({
                id: trackId,
                title: t.title || `Trek ${trackNumber}`,
                slug: trackSlug,
                releaseId: alb._id,
                trackNumber,
                duration: t.duration || '03:30',
                status: 'released',
                description: t.description || '',
                coverArtUrl: alb.coverArt ? urlForImage(alb.coverArt) : undefined,
                coverArtAlt: alb.coverArtAlt,
                audioUrl: t.audioUrl, // Audio KHUSUS ada di trek
                lyrics: t.lyrics || '',
                behindTheSong: t.behindTheSong || '',
                credits: (t.credits && t.credits.length > 0) ? t.credits : (alb.credits || []),
                relatedWritingIds: [],
                streamingLinks: trackLinks.length > 0 ? trackLinks : albumLinks,
              });
            });

            mappedReleases.push({
              id: alb._id,
              title: alb.title || 'Tanpa Judul',
              slug: albumSlug,
              releaseType: (alb.releaseType === 'album' ? 'album' : 'ep') as 'ep' | 'album',
              releaseDate: alb.releaseDate || new Date().toISOString().split('T')[0],
              displayYear: alb.displayYear || new Date().getFullYear().toString(),
              status: alb.status || 'released',
              description: alb.description || '',
              coverArtUrl: alb.coverArt ? urlForImage(alb.coverArt) : undefined,
              coverArtAlt: alb.coverArtAlt,
              audioUrl: undefined, // Album HANYA koleksi, tidak punya audio master tunggal
              behindTheRelease: alb.behindTheRelease || '',
              credits: alb.credits || [],
              streamingLinks: albumLinks,
              featured: Boolean(alb.featured),
              trackIds: albumTrackIds,
            });
          });
        }

        // Urutkan rilis berdasarkan tanggal terbaru
        mappedReleases.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );

        setReleases(mappedReleases);
        if (mappedTracks.length > 0) {
          setTracks(mappedTracks);
        }
        setIsUsingSanityMusic(true);
      } else {
        // Fallback ke data lokal jika belum ada dokumen single atau album di Sanity
        setIsUsingSanityMusic(false);
      }
    } catch {
      setIsUsingSanityMusic(false);
    } finally {
      setIsLoadingSanityMusic(false);
    }
  };

  useEffect(() => {
    loadSanityMusic();

    // Live Sync untuk musik jika ada perubahan di Sanity Studio
    if (isSanityConfigured() && sanityClient) {
      try {
        const sub = sanityClient
          .listen(`*[_type in ["single", "album"]]`)
          .subscribe(() => {
            loadSanityMusic();
          });
        return () => sub.unsubscribe();
      } catch {
        // Abaikan error subscription
      }
    }
  }, []);

  const visibleReleases = useMemo(() => {
    return releases.filter((r) => r.status === 'released' || r.status === 'upcoming');
  }, [releases]);

  const featuredRelease = useMemo(() => {
    return (
      visibleReleases.find((r) => r.featured) ||
      visibleReleases[0] ||
      getLocalVisibleReleases()[0]
    );
  }, [visibleReleases]);

  const featuredTrack = useMemo(() => {
    return tracks[0] || TRACKS[0];
  }, [tracks]);

  const getReleaseBySlug = (slug: string): Release | undefined => {
    return releases.find((r) => r.slug === slug) || getLocalReleaseBySlug(slug);
  };

  const getReleaseById = (id: string): Release | undefined => {
    return releases.find((r) => r.id === id || r.slug === id) || getLocalReleaseById(id);
  };

  const getTrackBySlug = (slug: string): Track | undefined => {
    return tracks.find((t) => t.slug === slug) || getLocalTrackBySlug(slug);
  };

  const getTracksForRelease = (release: Release): Track[] => {
    // 1. Cek trek berdasarkan releaseId atau slug
    const matched = tracks.filter((t) => t.releaseId === release.id || t.releaseId === release.slug);
    if (matched.length > 0) return matched;

    // 2. Cek trackIds jika diisi
    if (release.trackIds && release.trackIds.length > 0) {
      const found = release.trackIds
        .map((id) => tracks.find((t) => t.id === id || t.slug === id))
        .filter((t): t is Track => Boolean(t));
      if (found.length > 0) return found;
    }

    // 3. Jika format Single, buat track otomatis dari rilis single tersebut
    if (release.releaseType === 'single') {
      const localSingle = getLocalTracksForRelease(release);
      if (localSingle.length > 0) {
        return [
          {
            ...localSingle[0],
            audioUrl: release.audioUrl || localSingle[0].audioUrl,
            coverArtUrl: release.coverArtUrl || localSingle[0].coverArtUrl,
          },
        ];
      }
      return [
        {
          id: `single-${release.slug}`,
          title: release.title,
          slug: release.slug,
          releaseId: release.id,
          trackNumber: 1,
          duration: '03:30',
          status: 'released',
          description: release.description,
          coverArtUrl: release.coverArtUrl,
          coverArtAlt: release.coverArtAlt,
          audioUrl: release.audioUrl,
          lyrics: '',
          behindTheSong: release.behindTheRelease,
          credits: release.credits,
          streamingLinks: release.streamingLinks,
        },
      ];
    }

    return getLocalTracksForRelease(release);
  };

  return (
    <MusicContext.Provider
      value={{
        releases,
        tracks,
        visibleReleases,
        featuredRelease,
        featuredTrack,
        getReleaseBySlug,
        getReleaseById,
        getTrackBySlug,
        getTracksForRelease,
        isUsingSanityMusic,
        isLoadingSanityMusic,
        refreshMusic: loadSanityMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
