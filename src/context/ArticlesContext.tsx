import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../types';
import { getVisibleArticles, getFeaturedArticle } from '../content/articles';
import { isSanityConfigured, fetchArticlesFromSanity, subscribeToArticlesFromSanity } from '../lib/sanity';

interface ArticlesContextType {
  articles: Article[];
  featuredArticle: Article;
  getArticleBySlug: (slug: string) => Article | undefined;
  isUsingSanity: boolean;
  isLoadingSanity: boolean;
  refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Selalu mulai dengan data lokal agar render awal instan tanpa kedip/loading screen
  const [articles, setArticles] = useState<Article[]>(() => getVisibleArticles());
  const [isUsingSanity, setIsUsingSanity] = useState<boolean>(false);
  const [isLoadingSanity, setIsLoadingSanity] = useState<boolean>(false);

  const loadArticles = async () => {
    if (!isSanityConfigured()) {
      setIsUsingSanity(false);
      return;
    }

    setIsLoadingSanity(true);
    try {
      const sanityArticles = await fetchArticlesFromSanity();
      if (sanityArticles && sanityArticles.length > 0) {
        setArticles(sanityArticles);
        setIsUsingSanity(true);
      } else {
        // Jika Sanity kosong atau error, tetap pakai data lokal
        setIsUsingSanity(false);
      }
    } catch {
      setIsUsingSanity(false);
    } finally {
      setIsLoadingSanity(false);
    }
  };

  useEffect(() => {
    loadArticles();

    // Aktifkan Real-Time Live Sync dari Sanity Studio
    const unsubscribe = subscribeToArticlesFromSanity((updatedArticles) => {
      if (updatedArticles && updatedArticles.length > 0) {
        setArticles(updatedArticles);
        setIsUsingSanity(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const featuredArticle =
    articles.find((a) => a.featured) || articles[0] || getFeaturedArticle();

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find((a) => a.slug === slug);
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        featuredArticle,
        getArticleBySlug,
        isUsingSanity,
        isLoadingSanity,
        refreshArticles: loadArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = (): ArticlesContextType => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};
