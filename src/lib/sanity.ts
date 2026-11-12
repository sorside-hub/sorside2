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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string | any;
  status?: 'published' | 'draft';
  featured?: boolean;
  relatedTrackSlug?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
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
    fontFamily: doc.fontFamily || 'serif',
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
      relatedTrackSlug,
      fontFamily
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

/**
 * Tipe data dokumen Halaman Tentang (About Page) dari Sanity
 */
export interface SanityAboutPageDoc {
  kicker?: string;
  heading?: string;
  statement?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  portraitImage?: any;
  portraitCaption?: string;
  storyTitle?: string;
  storyLead?: string;
  storyBody?: string;
  contactHeading?: string;
  contactDescription?: string;
  contactEmail?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
}

export interface AboutPageData {
  kicker: string;
  heading: string;
  statement: string;
  portraitImageUrl?: string;
  portraitCaption: string;
  storyTitle: string;
  storyLead: string;
  storyBody: string;
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
}

export const mapSanityDocToAboutPageData = (doc: SanityAboutPageDoc): AboutPageData => {
  const portraitImageUrl = doc.portraitImage ? urlForImage(doc.portraitImage) : undefined;

  return {
    kicker: doc.kicker || 'manifesto & identitas · sorside',
    heading: doc.heading || 'tentang sorside.',
    statement: doc.statement || 'Sebuah ruang mandiri untuk merawat pemikiran, merekam suara-suara kota, dan mendokumentasikan apa yang tak sempat diucapkan.',
    portraitImageUrl,
    portraitCaption: doc.portraitCaption || 'Dokumentasi Studio · Sorside',
    storyTitle: doc.storyTitle || 'Bukan ruang bising yang menuntut algoritma.',
    storyLead: doc.storyLead || 'Sorside lahir dari keinginan sederhana: memiliki satu sudut tenang di internet di mana kata-kata dan bunyi tidak diukur oleh metrik viralitas atau keharusan untuk menyenangkan semua orang.',
    storyBody: doc.storyBody || '',
    contactHeading: doc.contactHeading || 'Pintu surat selalu terbuka.',
    contactDescription: doc.contactDescription || 'Jika ada pemikiran yang bersinggungan, tanggapan atas esai, atau sekadar ingin bertukar salam di larut malam, silakan kirimkan surel langsung ke ruang kerja saya.',
    contactEmail: doc.contactEmail || 'contact@sorside.com',
    fontFamily: doc.fontFamily || 'sans',
  };
};

/**
 * Ambil data Halaman Tentang dari Sanity
 */
export const fetchAboutPageFromSanity = async (): Promise<AboutPageData | null> => {
  if (!sanityClient) return null;

  try {
    const query = `*[_type == "aboutPage"][0] {
      kicker,
      heading,
      statement,
      portraitImage,
      portraitCaption,
      storyTitle,
      storyLead,
      storyBody,
      contactHeading,
      contactDescription,
      contactEmail,
      fontFamily
    }`;

    const doc: SanityAboutPageDoc = await sanityClient.fetch(query);
    if (!doc) return null;

    return mapSanityDocToAboutPageData(doc);
  } catch (err) {
    console.warn('[Sanity CMS] Gagal mengambil data About Page dari Sanity:', err);
    return null;
  }
};

/**
 * Langganan perubahan data Halaman Tentang secara Real-time
 */
export const subscribeToAboutPageFromSanity = (
  onAboutUpdate: (aboutData: AboutPageData) => void
) => {
  if (!sanityClient) return () => {};

  const query = `*[_type == "aboutPage"]`;

  try {
    const subscription = sanityClient.listen(query).subscribe(async () => {
      const updatedData = await fetchAboutPageFromSanity();
      if (updatedData) {
        onAboutUpdate(updatedData);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  } catch (err) {
    console.warn('[Sanity Live Sync] Gagal mengaktifkan live subscription About Page:', err);
    return () => {};
  }
};


