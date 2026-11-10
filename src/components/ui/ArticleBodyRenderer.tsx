import React, { useMemo } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { marked } from 'marked';

interface ArticleBodyRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string | any;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-[1.88] font-sans">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-12 mb-4 text-stone-900 dark:text-stone-100 tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 py-4 px-6 border-l-2 border-stone-900 dark:border-stone-100 italic font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 bg-[#EFE9DF]/40 dark:bg-[#1A1916]/40">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-stone-950 dark:text-stone-50">{children}</strong>
    ),
    em: ({ children }) => <em className="italic font-serif">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-xs bg-stone-200/70 dark:bg-stone-800/70 px-1.5 py-0.5 rounded-2xs text-stone-900 dark:text-stone-100">
        {children}
      </code>
    ),
    underline: ({ children }) => <u className="underline underline-offset-4">{children}</u>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-stone-800 dark:text-stone-200 font-sans text-base sm:text-lg leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-stone-800 dark:text-stone-200 font-sans text-base sm:text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },
};

export const ArticleBodyRenderer: React.FC<ArticleBodyRendererProps> = ({ content }) => {
  // Jika content berupa Array (PortableText dari Sanity Block Editor)
  const isPortableText = Array.isArray(content);

  // Jika content berupa String (Markdown)
  const parsedHtml = useMemo(() => {
    if (typeof content === 'string') {
      return marked.parse(content, { async: false }) as string;
    }
    return '';
  }, [content]);

  if (isPortableText) {
    return (
      <div className="prose-stone dark:prose-invert max-w-none">
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  return (
    <div
      className="prose prose-stone dark:prose-invert max-w-none text-base sm:text-lg leading-[1.88] font-sans text-stone-800 dark:text-stone-200
        [&>p]:mb-6
        [&>p]:text-stone-800 dark:[&>p]:text-stone-200
        [&>p:first-of-type]:text-lg sm:[&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed
        [&>h3]:text-2xl sm:[&>h3]:text-3xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:text-stone-900 dark:[&>h3]:text-stone-100 [&>h3]:tracking-tight
        [&>blockquote]:my-10 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:border-l-2 [&>blockquote]:border-stone-900 dark:[&>blockquote]:border-stone-100 [&>blockquote]:italic [&>blockquote]:font-serif [&>blockquote]:text-xl sm:[&>blockquote]:text-2xl [&>blockquote]:text-stone-900 dark:[&>blockquote]:text-stone-100 [&>blockquote]:bg-[#EFE9DF]/40 dark:[&>blockquote]:bg-[#1A1916]/40
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};
