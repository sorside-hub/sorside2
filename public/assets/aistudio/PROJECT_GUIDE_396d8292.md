---
title: "PROJECT_GUIDE"
date: 2026-11-07T17:19:30.504Z
---

# SORSIDE WEBSITE

## PROJECT GUIDE

You are working on the official personal website of **sorside**.

This document is the primary project specification. Treat it as the source of truth for all development decisions. Follow it throughout the project and refer to it before implementing any new feature.

---

## 1\. PROJECT OVERVIEW

sorside is a personal creative identity and independent digital publication.

The name represents different sides of one person. It is not limited to music. It can represent writing, music, visual work, personal thoughts, observations, and other creative expressions.

The website should function as a personal digital home and an independent archive of creative works.

This is NOT a social media platform, a blogging platform with community features, or a generic portfolio template.

### Main objectives

- Publish and archive personal writings.
- Establish a consistent visual identity for sorside.
- Provide a comfortable reading experience.
- Prepare the architecture for future expansion, especially music.
- Keep the initial implementation lightweight and maintainable.

### Target audience

Readers who intentionally visit the website to explore writings and creative works.

### Content language

Website navigation and interface: English.

Written content: Primarily Indonesian.

---

## 2\. MVP SCOPE

Implement only the following pages:

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Introduction and featured writings |
| `/writing` | Writing | Writing archive |
| `/writing/:slug` | Article | Individual article |
| `/music` | Music | Coming Soon page |
| `/about` | About | Introduction to sorside |
| `*` | Not Found | Custom 404 page |

All pages must have independent URLs and full-page navigation.

Do not use modal-based navigation or popup pages as substitutes for actual routes.

### Explicitly excluded from MVP

- User authentication.
- User registration.
- Admin dashboard.
- Public comments.
- Likes and reactions.
- Followers.
- Social feeds.
- Notifications.
- Database integration.
- Payment systems.
- Music streaming or player.
- User-generated content.

Do not introduce these features unless explicitly requested.

---

## 3\. TECHNOLOGY STACK

Use:

- Vite
- React
- JavaScript
- React Router
- CSS with CSS custom properties
- Markdown for article content

Prefer lightweight dependencies.

Do not introduce TypeScript, a backend, Supabase, or a CMS unless explicitly approved.

Use semantic HTML and accessible React components.

---

## 4\. ARCHITECTURE AND CODE ORGANIZATION

The project must use a modular, maintainable architecture.

Do not place the entire application inside `App.jsx`.

Suggested structure:

```text
src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── providers/
│       └── ThemeProvider.jsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageContainer.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── ThemeToggle.jsx
│       ├── ArticleCard.jsx
│       └── SectionHeading.jsx
│
├── pages/
│   ├── Home/
│   ├── Writing/
│   ├── Article/
│   ├── Music/
│   ├── About/
│   └── NotFound/
│
├── content/
│   └── articles/
│
├── data/
│   ├── navigation.js
│   └── site.js
│
├── hooks/
├── utils/
├── styles/
│   ├── variables.css
│   ├── themes.css
│   ├── global.css
│   └── typography.css
│
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

This is a recommended structure, not a requirement to create empty files or unnecessary abstractions.

Adapt it when there is a clear technical reason, while preserving its architectural principles.

### Architecture rules

 1. Each page must have its own page component.
 2. Shared elements must be reusable components.
 3. Keep business logic separate from presentation when appropriate.
 4. Keep article content separate from React components.
 5. Avoid duplicated code.
 6. Avoid excessively large components.
 7. Use descriptive and consistent naming.
 8. Avoid unnecessary abstractions.
 9. Keep dependencies minimal.
10. Keep the project easy to understand and maintain.

---

## 5\. ROUTING AND NAVIGATION

Use React Router.

Requirements:

- Every page has its own URL.
- Browser Back and Forward must work correctly.
- Direct URL access must work.
- Refreshing an article URL must not cause a routing failure.
- Internal navigation should use React Router navigation.
- External links should use normal anchors.
- Provide a custom 404 page.
- Configure production hosting fallback to `index.html` for SPA routes.

Do not simulate routing by conditionally replacing content inside one page.

---

## 6\. DESIGN DIRECTION

### Overall identity

Warm, editorial, minimal, clean, and timeless.

The visual direction should feel like an independent editorial publication rather than a generic technology startup website.

### Visual characteristics

- Warm off-white backgrounds.
- Charcoal typography.
- Refined serif display typography.
- Highly readable body typography.
- Generous whitespace.
- Clear typographic hierarchy.
- Thin and subtle separators.
- Restrained use of accent colors.
- Minimal decorative elements.
- Thoughtful image placement.

Avoid:

- Excessive gradients.
- Glassmorphism.
- Neon colors.
- Excessive rounded cards.
- Generic dashboard aesthetics.
- Unnecessary animations.
- Overly decorative layouts.
- Excessive shadows.
- Busy backgrounds.

The website must feel intentional, not empty or unfinished.

Clean design must still have personality through typography, layout, spacing, and composition.

---

## 7\. DESIGN SYSTEM AND THEME ARCHITECTURE

This is a mandatory architectural requirement.

Implement a centralized design token system using CSS custom properties.

Never hardcode theme-dependent colors directly inside individual components or page stylesheets.

Use semantic tokens such as:

```css
--color-background
--color-surface
--color-text
--color-text-muted
--color-border
--color-accent
--color-accent-hover

--font-display
--font-body

--content-width
--reading-width

--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl

--radius-sm
--radius-md
```

The exact token system may be expanded when needed.

### Theme modes

Implement three modes:

1. Light
2. Dark
3. System

Light and dark themes must use the same semantic tokens with different values.

### Light theme direction

- Warm off-white background.
- Charcoal primary text.
- Warm gray secondary text.
- Muted earth-tone accent.
- Subtle warm borders.

### Dark theme direction

- Warm charcoal background, not pure black.
- Slightly lighter dark surfaces.
- Soft off-white primary text.
- Muted warm gray secondary text.
- Restrained warm accent colors.

Avoid pure black and pure white as the primary background and text combination.

### Theme behavior

- System mode follows the operating system preference.
- User-selected preference persists using localStorage.
- Theme should be applied before the main interface renders to prevent a flash of the wrong theme.
- Theme switching must work on every route.
- Theme selection must be accessible and keyboard-friendly.
- Update the browser color scheme appropriately.

All components must automatically adapt to the active theme.

---

## 8\. PAGE DESIGN SPECIFICATIONS

### HOME

The homepage introduces sorside.

It should contain:

- Brand wordmark.
- Main navigation.
- A concise hero section.
- A short introduction.
- Latest or featured writings.
- A link to the full Writing archive.
- A small About section.
- Music Coming Soon entry.
- Footer.

The homepage must follow the approved visual reference provided by the project owner.

Do not invent an entirely different visual direction.

### WRITING

The Writing page is an editorial archive.

Preferred layout: Editorial List with Personality.

Characteristics:

- Vertical article listing.
- Large, expressive article titles.
- Category and publication date.
- Short article excerpts.
- Generous spacing.
- Thin separators.
- Minimal visual decoration.
- No mandatory thumbnail or cover image for each article.

It must not look like a plain spreadsheet, document directory, or generic book list.

Include:

- Category filtering.
- Search.
- Clear empty states.
- Pagination or a suitable lightweight alternative when the archive grows.

Keep the interface visually restrained.

### ARTICLE

The article page is one of the most important pages.

Prioritize reading comfort.

Requirements:

- Comfortable reading width.
- Clear title hierarchy.
- Category and publication date.
- Optional excerpt.
- Readable body typography.
- Comfortable paragraph spacing.
- Appropriate heading styles.
- Support for Markdown elements.
- Previous and next article navigation.
- Return to Writing archive.
- Responsive layout.

Avoid unnecessary sidebars, popups, floating elements, or distracting decorations.

### MUSIC

A minimal Coming Soon page.

Do not create fake releases, albums, tracks, or streaming interfaces.

### ABOUT

A personal introduction to sorside.

Keep the design editorial and minimal.

Do not invent personal biography details. Use clearly identified placeholder content where the project owner has not supplied the actual copy.

### NOT FOUND

A custom 404 page consistent with the website identity.

Provide an obvious way to return home or to Writing.

---

## 9\. ARTICLE CONTENT MANAGEMENT

Article content must be independent from the page components.

Use Markdown files stored locally in the project.

Each article should support metadata:

- title
- slug
- category
- date
- excerpt
- optional cover image
- content

Use frontmatter or another clear metadata format.

Article slugs must generate stable URLs.

Reading time may be calculated automatically.

Do not fabricate real personal articles.

If demonstration content is necessary, clearly mark it as sample content and keep it easy to replace.

Do not require an image for every article.

---

## 10\. RESPONSIVE DESIGN

Use a mobile-first approach.

Support:

- Mobile phones.
- Tablets.
- Desktop screens.

Ensure:

- Navigation remains usable on mobile.
- Article text remains readable.
- No horizontal overflow.
- Typography scales appropriately.
- Spacing adapts to screen size.
- Buttons and interactive elements have appropriate touch targets.

Do not simply shrink the desktop layout.

---

## 11\. ACCESSIBILITY AND PERFORMANCE

Implement:

- Semantic HTML.
- Accessible navigation.
- Keyboard-friendly controls.
- Visible focus states.
- Sufficient text contrast.
- Descriptive image alt text.
- Appropriate document titles.
- Lazy loading for non-critical images.
- Optimized assets.
- Reduced-motion support.

Avoid unnecessary animation and excessive dependencies.

---

## 12\. SEO AND SHARING

Prepare basic SEO for each page:

- Unique document title.
- Meta description.
- Canonical URL support.
- Open Graph metadata.
- Appropriate page semantics.

Article pages should have metadata derived from their article content.

Do not invent a real domain. Use a configurable placeholder until the owner provides the final domain.

---

## 13\. DEVELOPMENT RULES

These rules apply to every implementation stage.

 1. Read this project guide before making changes.
 2. Inspect the existing project before modifying it.
 3. Preserve existing working functionality.
 4. Do not rewrite unrelated files.
 5. Do not change the approved visual identity without approval.
 6. Do not hardcode theme colors in components.
 7. Do not duplicate existing shared components.
 8. Do not add dependencies without a clear reason.
 9. Do not create unnecessary features.
10. Do not replace real project content with invented content.
11. Keep code readable and maintainable.
12. Fix errors before considering a stage complete.

When implementing a new stage, integrate it into the existing architecture rather than rebuilding the application.

If a requested change would require a significant architectural decision, explain the trade-offs before proceeding.

---

## 14\. IMPLEMENTATION WORKFLOW

Development will happen incrementally.

The project owner will provide separate implementation instructions for each stage.

For every stage:

1. Inspect relevant existing files.
2. Explain the implementation approach briefly.
3. Implement only the requested scope.
4. Run available build and validation checks.
5. Fix any errors introduced by the changes.
6. Summarize files created or modified.
7. Report remaining issues honestly.

Do not assume a stage is complete merely because code has been generated.

---

## 15\. FINAL PRODUCT PRINCIPLE

The website should feel like a personal place worth returning to.

It should be visually calm, structurally organized, comfortable to read, and flexible enough to grow with sorside.

Prioritize clarity, identity, content, and maintainability over feature quantity.

**Build a solid foundation, not an unnecessarily complicated system.**
