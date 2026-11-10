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
      // Query untuk mengambil rilis dan trek dari Sanity
      // Jika skema Sanity belum dipublish dokumennya, query mengembalikan array kosong
      const musicQuery = `{
        "releases": *[_type == "release" && status != "draft"] | order(releaseDate desc) {
          _id,
          id,
          title,
          "slug": slug.current,
          releaseType,
          releaseDate,
          displayYear,
          status,
          description,
          coverArt,
          coverArtAlt,
          trackIds,
          credits,
          behindTheRelease,
          streamingLinks,
          featured,
          "audioUrl": audioFile.asset->url
        },
        "tracks": *[_type == "track" && status != "draft"] | order(trackNumber asc) {
          _id,
          id,
          title,
          "slug": slug.current,
          releaseId,
          trackNumber,
          duration,
          status,
          description,
          coverArt,
          coverArtAlt,
          "audioUrl": audioFile.asset->url,
          lyrics,
          behindTheSong,
          credits,
          relatedWritingIds,
          streamingLinks
        }
      }`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await sanityClient.fetch(musicQuery);

      if (data?.releases && data.releases.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedReleases: Release[] = data.releases.map((r: any) => ({
          id: r.id || r._id,
          title: r.title || 'Tanpa Judul',
          slug: r.slug || '',
          releaseType: r.releaseType || 'single',
          releaseDate: r.releaseDate || new Date().toISOString().split('T')[0],
          displayYear: r.displayYear || '2026',
          status: r.status || 'released',
          description: r.description || '',
          coverArtUrl: r.coverArt ? urlForImage(r.coverArt) : undefined,
          coverArtAlt: r.coverArtAlt,
          trackIds: r.trackIds || [],
          credits: r.credits || [],
          behindTheRelease: r.behindTheRelease || '',
          streamingLinks: r.streamingLinks || [],
          featured: Boolean(r.featured),
          audioUrl: r.audioUrl,
        }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedTracks: Track[] = (data.tracks || []).map((t: any) => ({
          id: t.id || t._id,
          title: t.title || 'Tanpa Judul',
          slug: t.slug || '',
          releaseId: t.releaseId || '',
          trackNumber: t.trackNumber || 1,
          duration: t.duration || '03:00',
          status: t.status || 'released',
          description: t.description || '',
          coverArtUrl: t.coverArt ? urlForImage(t.coverArt) : undefined,
          coverArtAlt: t.coverArtAlt,
          audioUrl: t.audioUrl,
          lyrics: t.lyrics || '',
          behindTheSong: t.behindTheSong || '',
          credits: t.credits || [],
          relatedWritingIds: t.relatedWritingIds || [],
          streamingLinks: t.streamingLinks || [],
        }));

        setReleases(mappedReleases);
        if (mappedTracks.length > 0) {
          setTracks(mappedTracks);
        }
        setIsUsingSanityMusic(true);
      } else {
        // Fallback ke data lokal
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
          .listen(`*[_type in ["release", "track"]]`)
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
