import React, { useMemo } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { marked } from 'marked';
import { FontFamilyOption } from '../../types';
import { urlForImage } from '../../lib/sanity';

interface ArticleBodyRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string | any;
  fontFamily?: FontFamilyOption;
}

export const ArticleBodyRenderer: React.FC<ArticleBodyRendererProps> = ({
  content,
  fontFamily = 'serif',
}) => {
  // Tentukan kelas font dasar
  const baseFontClass =
    fontFamily === 'sans'
      ? 'font-sans'
      : fontFamily === 'mono'
      ? 'font-mono'
      : 'font-serif';

  const headingFontClass =
    fontFamily === 'sans'
      ? 'font-sans font-bold tracking-tight'
      : fontFamily === 'mono'
      ? 'font-mono font-bold'
      : 'font-serif font-bold tracking-tight';

  // Komponen PortableText dengan dukungan font kustom dan pewarisan italic
  const portableTextComponents: PortableTextComponents = useMemo(
    () => ({
      block: {
        normal: ({ children }) => (
          <p className={`mb-6 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-[1.88] ${baseFontClass}`}>
            {children}
          </p>
        ),
        h2: ({ children }) => (
          <h2 className={`text-3xl sm:text-4xl mt-14 mb-5 text-stone-900 dark:text-stone-100 ${headingFontClass}`}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className={`text-2xl sm:text-3xl mt-12 mb-4 text-stone-900 dark:text-stone-100 ${headingFontClass}`}>
            {children}
          </h3>
        ),
        blockquote: ({ children }) => (
          <blockquote className={`my-10 py-4 px-6 border-l-2 border-stone-900 dark:border-stone-100 italic text-xl sm:text-2xl text-stone-900 dark:text-stone-100 bg-[#EFE9DF]/40 dark:bg-[#1A1916]/40 ${baseFontClass}`}>
            {children}
          </blockquote>
        ),
      },
      marks: {
        strong: ({ children }) => (
          <strong className="font-bold text-stone-950 dark:text-stone-50">{children}</strong>
        ),
        // Mewarisi font induk sehingga jika font dasar Sans, italic-nya otomatis Plus Jakarta Sans Italic!
        em: ({ children }) => <em className="italic">{children}</em>,
        // Mark Kustom Pilihan Font dari Toolbar Sanity CMS
        fontSans: ({ children }) => (
          <span className="font-sans">{children}</span>
        ),
        fontSerif: ({ children }) => (
          <span className="font-serif">{children}</span>
        ),
        fontMono: ({ children }) => (
          <span className="font-mono">{children}</span>
        ),
        code: ({ children }) => (
          <code className="font-mono text-xs bg-stone-200/70 dark:bg-stone-800/70 px-1.5 py-0.5 rounded-2xs text-stone-900 dark:text-stone-100">
            {children}
          </code>
        ),
        underline: ({ children }) => (
          <u className="underline underline-offset-4">{children}</u>
        ),
        'strike-through': ({ children }) => (
          <s className="line-through text-stone-400">{children}</s>
        ),
        link: ({ value, children }) => (
          <a
            href={value?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900 dark:hover:decoration-stone-100 text-stone-900 dark:text-stone-100 transition-colors"
          >
            {children}
          </a>
        ),
      },
      types: {
        image: ({ value }) => {
          const imageUrl = urlForImage(value);
          if (!imageUrl) return null;
          return (
            <figure className="my-10">
              <div className="overflow-hidden border border-[#E2DAC8] dark:border-[#2D2B26] bg-stone-200 dark:bg-stone-800">
                <img
                  src={imageUrl}
                  alt={value?.alt || value?.caption || 'Ilustrasi artikel sorside'}
                  className="w-full object-cover grayscale-[10%]"
                  loading="lazy"
                />
              </div>
              {value?.caption && (
                <figcaption className="mt-2 text-right text-xs text-stone-500 italic">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },
      },
      list: {
        bullet: ({ children }) => (
          <ul className={`list-disc pl-6 mb-6 space-y-2 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed ${baseFontClass}`}>
            {children}
          </ul>
        ),
        number: ({ children }) => (
          <ol className={`list-decimal pl-6 mb-6 space-y-2 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed ${baseFontClass}`}>
            {children}
          </ol>
        ),
      },
    }),
    [baseFontClass, headingFontClass]
  );

  // Jika content berupa Array (PortableText dari Sanity Block Editor)
  const isPortableText = Array.isArray(content);

  // Jika content berupa String (Markdown / HTML)
  const parsedHtml = useMemo(() => {
    if (typeof content === 'string') {
      return marked.parse(content, { async: false }) as string;
    }
    return '';
  }, [content]);

  if (isPortableText) {
    return (
      <div className={`prose-custom max-w-none ${baseFontClass}`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  return (
    <div
      className={`prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg leading-[1.88] ${baseFontClass} text-stone-800 dark:text-stone-200
        [&>p]:mb-6
        [&>p]:text-stone-800 dark:[&>p]:text-stone-200
        [&>p:first-of-type]:text-lg sm:[&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed
        [&>h2]:text-3xl sm:[&>h2]:text-4xl [&>h2]:font-bold [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:text-stone-900 dark:[&>h2]:text-stone-100 ${headingFontClass}
        [&>h3]:text-2xl sm:[&>h3]:text-3xl [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:text-stone-900 dark:[&>h3]:text-stone-100 ${headingFontClass}
        [&>blockquote]:my-10 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:border-l-2 [&>blockquote]:border-stone-900 dark:[&>blockquote]:border-stone-100 [&>blockquote]:italic [&>blockquote]:text-xl sm:[&>blockquote]:text-2xl [&>blockquote]:text-stone-900 dark:[&>blockquote]:text-stone-100 [&>blockquote]:bg-[#EFE9DF]/40 dark:[&>blockquote]:bg-[#1A1916]/40
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6`}
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};

