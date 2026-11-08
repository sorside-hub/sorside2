export type ReleaseType = 'single' | 'ep' | 'album';
export type ReleaseStatus = 'draft' | 'upcoming' | 'released';

export interface Credit {
  role: string;
  name: string;
}

export interface StreamingLink {
  platform: 'Spotify' | 'Apple Music' | 'YouTube Music' | 'Bandcamp' | 'SoundCloud' | string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  slug: string;
  releaseType: ReleaseType;
  releaseDate: string; // ISO date e.g. "2026-11-01"
  displayYear: string; // e.g. "2026"
  status: ReleaseStatus;
  description: string;
  coverArtUrl?: string;
  coverArtAlt?: string;
  trackIds: string[]; // references in order
  credits: Credit[];
  behindTheRelease?: string;
  streamingLinks?: StreamingLink[];
  featured?: boolean;
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  releaseId: string;
  trackNumber: number;
  duration?: string; // e.g. "03:42"
  status: ReleaseStatus;
  description?: string;
  coverArtUrl?: string; // inherits from release if not set
  coverArtAlt?: string;
  audioUrl?: string;
  lyrics?: string; // stanzas separated by double newlines
  behindTheSong?: string;
  credits: Credit[];
  relatedWritingIds?: string[]; // slugs of related articles
  streamingLinks?: StreamingLink[];
}
