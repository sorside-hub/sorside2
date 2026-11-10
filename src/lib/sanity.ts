import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Article } from '../types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || 'kv8my3fg';
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION?.trim() || '2024-03-01';

/**
 * Cek apakah kredensial Sanity sudah diisi oleh pengguna
 */
export const isSanityConfigured = (): boolean => {
  return Boolean(
    projectId &&
    projectId.length > 3 &&
    projectId !== 'MY_SANITY_PROJECT_ID' &&
    !projectId.includes(' ')
  );
};

/**
 * Sanity client instance (hanya dibuat jika projectId terisi)
 */
export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

// Helper image URL builder untuk aset media Sanity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any): string => {
  if (!builder || !source) return '';
  try {
    return builder.image(source).auto('format').fit('max').url();
  } catch {
    return '';
  }
};

/**
 * Tipe dokumen mentah dari Sanity GROQ query
 */
export interface SanityArticleDoc {
  _id: string;
  title: string;
  slug: { current: string } | string;
  category: string;
  date: string;
  excerpt: string;
  readTime?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  coverAlt?: string;
  content: string;
  status?: 'published' | 'draft';
  featured?: boolean;
  relatedTrackSlug?: string;
}

/**
 * Konversi dokumen Sanity ke format Article standar sorside
 */
export const mapSanityDocToArticle = (doc: SanityArticleDoc): Article => {
  const slug =
    typeof doc.slug === 'object' && doc.slug?.current
      ? doc.slug.current
      : (doc.slug as string) || '';

  const coverImageUrl = doc.coverImage ? urlForImage(doc.coverImage) : undefined;

  return {
    slug,
    title: doc.title || 'Tanpa Judul',
    category: (doc.category || 'REFLECTION').toUpperCase(),
    date: doc.date || new Date().toISOString().split('T')[0],
    excerpt: doc.excerpt || '',
    readTime: doc.readTime,
    coverImage: coverImageUrl,
    coverAlt: doc.coverAlt,
    content: doc.content || '',
    status: doc.status || 'published',
    featured: Boolean(doc.featured),
    relatedTrackSlug: doc.relatedTrackSlug,
  };
};

/**
 * Ambil daftar artikel dari Sanity.
 * Mengembalikan null jika Sanity belum dikonfigurasi atau tidak ada data,
 * sehingga web otomatis memakai fallback data lokal tanpa error.
 */
export const fetchArticlesFromSanity = async (): Promise<Article[] | null> => {
  if (!sanityClient) return null;

  try {
    const query = `*[_type == "article" && status != "draft"] | order(date desc) {
      _id,
      title,
      slug,
      category,
      date,
      excerpt,
      readTime,
      coverImage,
      coverAlt,
      content,
      status,
      featured,
      relatedTrackSlug
    }`;

    const docs: SanityArticleDoc[] = await sanityClient.fetch(query);
    if (!docs || docs.length === 0) return null;

    return docs.map(mapSanityDocToArticle);
  } catch (err) {
    console.warn('[Sanity CMS] Gagal mengambil artikel dari Sanity, otomatis beralih ke data lokal:', err);
    return null;
  }
};

/**
 * Langganan perubahan data Sanity secara Real-time (Live Updates).
 * Mengaktifkan sinkronisasi instan tanpa perlu refresh halaman.
 */
export const subscribeToArticlesFromSanity = (
  onArticlesUpdate: (articles: Article[]) => void
) => {
  if (!sanityClient) return () => {};

  const query = `*[_type == "article"]`;

  try {
    const subscription = sanityClient.listen(query).subscribe(async () => {
      const updatedArticles = await fetchArticlesFromSanity();
      if (updatedArticles && updatedArticles.length > 0) {
        onArticlesUpdate(updatedArticles);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  } catch (err) {
    console.warn('[Sanity Live Sync] Gagal mengaktifkan live subscription:', err);
    return () => {};
  }
};

