import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { WritingPage } from './pages/WritingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { MusicPage } from './pages/MusicPage';
import { ReleaseDetailPage } from './pages/ReleaseDetailPage';
import { TrackDetailPage } from './pages/TrackDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudioPage } from './pages/StudioPage';
import { ArticlesProvider } from './context/ArticlesContext';

export default function App() {
  return (
    <ThemeProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/studio/*" element={<StudioPage />} />
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/writing/:slug" element={<ArticleDetailPage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/music/releases/:slug" element={<ReleaseDetailPage />} />
              <Route path="/music/tracks/:slug" element={<TrackDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ArticlesProvider>
    </ThemeProvider>
  );
}
