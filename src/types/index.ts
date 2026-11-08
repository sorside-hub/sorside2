export type ThemeMode = 'light' | 'dark' | 'system';

export interface Article {
  slug: string;
  title: string;
  category: 'REFLECTION' | 'OPINION' | 'ESSAY' | string;
  date: string;
  displayDate: string;
  excerpt: string;
  readTime: string;
  coverImage?: string;
  coverAlt?: string;
  content: string;
}
