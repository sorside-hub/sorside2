---
title: "Implement the Music Section for sorside."
date: 2026-11-07T22:05:43.799Z
---

## 1\. Task Overview

Implement the complete Music section for the existing sorside website.

This is an implementation task, not a redesign of the entire website.

The Music section should function as an independent music archive and editorial space where visitors can explore releases, individual tracks, lyrics, credits, and the stories behind the music.

The Music section must feel like a natural extension of the existing sorside identity.

**Important: Before making any changes, inspect the existing project structure, routing, components, styles, design tokens, and project documentation. Understand the current implementation before proposing or modifying anything.**

Use the existing project as the source of truth for visual consistency and technical conventions.

## 2\. Scope and Constraints

Only work on the Music section and the components directly required by it.

Do not:

- Redesign the entire website.
- Change the existing Home, Writing, or About pages.
- Change the global navigation structure.
- Remove or rename existing routes unnecessarily.
- Introduce a new design system.
- Replace existing components that already work.
- Add a CMS or integrate Sanity at this stage.
- Add authentication or user accounts.
- Introduce unnecessary dependencies.
- Publish fictional music releases or placeholder songs as real content.

Preserve the existing:

- Warm editorial visual identity.
- Minimalist design direction.
- Typography system.
- Color palette and CSS variables.
- Global navigation and footer.
- Responsive design conventions.

The current navigation should remain:

Home / Writing / Music / About

## 3\. Music Information Architecture

The music data model must distinguish between Releases and Tracks.

### A. Release

A Release represents a published or upcoming music release.

Supported release types:

- Single
- EP
- Album

Release data structure:

- id: unique identifier
- title: release title
- slug: URL identifier
- releaseType: single | ep | album
- releaseDate: release date
- status: draft | upcoming | released
- description: short release description
- coverArtUrl: optional image URL
- coverArtAlt: image alternative text
- trackIds: references to tracks, maintaining their intended order
- credits: structured list of contributors and roles
- behindTheRelease: optional rich-text content
- streamingLinks: optional list of external platform links
- featured: boolean
- createdAt: optional metadata
- updatedAt: optional metadata

A Single should normally contain one track. An EP and Album may contain multiple tracks.

Do not duplicate track information inside a release object. Use references to independent Track records.

### B. Track

A Track represents an individual song.

Track data structure:

- id: unique identifier
- title: track title
- slug: URL identifier
- duration: optional track duration
- releaseId: reference to its parent release
- trackNumber: position within its release
- status: draft | upcoming | released
- description: optional short description
- coverArtUrl: optional track-specific artwork
- coverArtAlt: image alternative text
- audioUrl: optional audio URL
- lyrics: full lyrics, preserving line breaks and stanza structure
- credits: structured list of contributors and roles
- behindTheSong: optional rich-text content
- relatedWritingIds: optional references to existing Writing articles
- streamingLinks: optional list of external platform links
- createdAt: optional metadata
- updatedAt: optional metadata

If a track does not have its own artwork, use its parent release artwork.

If a track does not have lyrics, hide the lyrics section rather than displaying an empty placeholder.

If a track does not have a Behind the Song section, hide that section.

### C. Credits

Credits must use structured data, not one long text field.

Each credit entry contains:

- name
- role

Examples of roles:

- Written by
- Vocals
- Produced by
- Guitar
- Bass
- Drums
- Recorded by
- Mixed by
- Mastered by
- Artwork by
- Photography by

Release Credits and Track Credits must be independent.

Avoid displaying duplicate or empty credit entries.

### D. Writing Relationships

Tracks and Writing articles must support optional many-to-many relationships.

One track can reference multiple Writing articles.

One Writing article can be referenced by multiple tracks.

Reuse the existing Writing article data and routing. Do not create duplicate article records or a separate Writing system.

On a Track Detail page, display related articles in a section titled "Related Writing".

Each related article should link to its existing article detail page.

Hide this section when no related articles exist.

## 4\. Routing

Implement three levels of Music navigation.

Use the existing routing conventions where possible.

Suggested route structure:

- `/music` — Music Archive
- `/music/releases/:slug` — Release Detail
- `/music/tracks/:slug` — Track Detail

Avoid route conflicts with existing pages.

Each release and track must have a unique, stable slug.

Use the existing navigation and page layout conventions.

Include appropriate back-navigation:

- Release Detail → Music
- Track Detail → parent Release
- Related Writing → existing Article Detail

Use meaningful page titles and document metadata where supported by the current project.

## 5\. Page One: Music Archive

Route: `/music`

### Content Structure

The page should contain:

1. Eyebrow: "Sound & Expression"
2. Main heading: "Music"
3. A short editorial introduction.
4. Single releases.
5. EP releases.
6. Album releases.

Suggested introduction:

"A collection of sounds, thoughts, and things left unsaid."

Use this as initial copy, but keep the content structure flexible.

### Release Presentation

Display releases in an editorial layout.

Each release item should include:

- Cover artwork.
- Release title.
- Release type.
- Release year.

The entire release item should be navigable to its Release Detail page.

The presentation should feel curated and editorial, not like a commercial streaming platform.

Avoid:

- Heavy card backgrounds.
- Excessive rounded containers.
- Large decorative gradients.
- Unnecessary icons.
- Excessive metadata.

Use generous spacing, restrained separators, and strong typography.

### Release Grouping

Group releases into:

- Singles
- EPs
- Albums

Only display a group when it contains visible releases.

If there are no releases, show a thoughtful empty state.

Suggested empty-state copy:

"No releases yet. The collection will grow here."

Do not display fictional release titles, fake cover artwork, or fabricated release dates.

### Upcoming Releases

Upcoming releases may be displayed only when explicitly marked as visible to the public.

Distinguish upcoming releases from already released music.

Do not expose draft releases.

## 6\. Page Two: Release Detail

Route: `/music/releases/:slug`

### Content Structure

Display the following information when available:

 1. Back link to Music.
 2. Release artwork.
 3. Release title.
 4. Release type.
 5. Release date.
 6. Release description.
 7. Tracklist.
 8. Release Credits.
 9. Behind the Release.
10. Streaming links.

### Artwork

Artwork should be visually prominent but not overwhelm the editorial layout.

Preserve its original aspect ratio, preferably square.

Do not force artwork into a crop that cuts off important visual details.

If artwork is unavailable, use a restrained fallback that matches the existing design system. Never invent an album cover.

### Tracklist

Display tracks in their defined order.

Each track item should show:

- Track number.
- Track title.
- Duration, if available.

Each track title must link to its Track Detail page.

The tracklist must work for both single-track releases and multi-track releases.

### Behind the Release

This section is optional.

Use the heading "Behind the Release".

Render rich-text content with proper paragraph spacing and heading hierarchy.

Hide the section when no content exists.

### Release Credits

Present contributors and their roles in a readable, restrained layout.

Do not use oversized cards or decorative profile elements.

### Streaming Links

Display only available external links.

Use clear platform labels.

Open external platforms safely in a new browsing context where appropriate.

## 7\. Page Three: Track Detail

Route: `/music/tracks/:slug`

This page should provide a more intimate editorial experience.

### Content Structure

Display:

 1. Back link to parent release.
 2. Track artwork.
 3. Track title.
 4. Parent release title and release type.
 5. Track number and duration, when available.
 6. Track description.
 7. Audio playback, only if an audio URL exists.
 8. Lyrics.
 9. Behind the Song.
10. Track Credits.
11. Related Writing.
12. Streaming links.

### Track Artwork

Use track-specific artwork when available.

Otherwise inherit the parent release artwork.

### Lyrics

Lyrics are an important feature and must be fully supported.

Requirements:

- Preserve original line breaks.
- Preserve stanza spacing.
- Do not automatically merge lines into paragraphs.
- Use readable typography.
- Maintain a comfortable reading width.
- Avoid excessive visual decoration.

If lyrics are unavailable, hide the section.

### Behind the Song

This section is optional.

Use the heading "Behind the Song".

It should support rich-text content with:

- Paragraphs.
- Headings.
- Bold and italic text.
- Links.
- Optional inline images if the existing architecture supports them.

The content should feel like an editorial note rather than a promotional biography.

### Track Credits

Display structured contributor names and roles.

Only display this section when credits exist.

### Related Writing

Display articles connected to the track.

Each item should include:

- Article title.
- Category, if available.
- Publication date, if available.
- Optional excerpt.

Use the existing Writing visual language and existing article routes.

Hide this section when no related articles exist.

## 8\. Visual Design: Desktop

Desktop should use the existing sorside design system.

General direction:

- Warm off-white background.
- Charcoal typography.
- Editorial serif or existing display typography for major headings.
- Existing body typography for descriptions and metadata.
- Restrained borders and separators.
- Generous whitespace.
- Comfortable reading width.

### Music Archive Desktop

Use an editorial release layout.

Prioritize artwork and typography without turning the page into a dense grid of commercial music cards.

Use a balanced layout that makes the release categories easy to scan.

### Release Detail Desktop

Use a two-column composition where appropriate:

- Artwork on one side.
- Release information on the other.

Tracklist and editorial sections should follow beneath with a comfortable content width.

Do not force every section into columns.

### Track Detail Desktop

Use a constrained reading layout.

The artwork and track information should establish the page identity.

Lyrics and Behind the Song should have sufficient width and vertical spacing.

Credits and Related Writing should remain visually secondary.

## 9\. Visual Design: Mobile

Mobile must be deliberately designed, not merely a compressed desktop layout.

Follow the existing mobile design references and conventions.

Requirements:

- Single-column composition.
- Artwork should scale naturally to the viewport.
- No horizontal overflow.
- Readable heading sizes.
- Comfortable side padding.
- Touch-friendly navigation and track links.
- Metadata should wrap gracefully.
- Tracklist must remain easy to scan.
- Lyrics must preserve stanza spacing.
- Related Writing should use compact editorial items.
- Avoid unnecessarily tall empty sections.

The mobile layout may rearrange the order of visual elements when this improves readability.

Do not introduce a different color system or typography system for mobile.

## 10\. Empty, Missing, and Error States

Implement appropriate states for:

- No published releases.
- No releases in a particular category.
- No lyrics.
- No credits.
- No related Writing articles.
- Missing artwork.
- Missing audio URL.
- Invalid release slug.
- Invalid track slug.
- Missing parent release.

Optional content must never produce empty headings, broken images, or blank visual containers.

For invalid routes, use the existing 404 handling if available.

## 11\. Data and Code Architecture

Do not scatter music data throughout page components.

Create a centralized, structured music data layer that separates:

- Release records.
- Track records.
- Contributor credits.
- Writing relationships.

For the current implementation, use the project's existing data conventions.

If a centralized local data module is needed, create one with clearly separated records and reusable query/helper functions.

Do not put fabricated public content into the production data source.

If visual testing requires sample data, isolate it as development-only preview data and ensure it cannot appear in production.

Keep data retrieval separate from presentation components.

Suggested component responsibilities:

- MusicArchivePage
- ReleaseSection
- ReleaseItem
- ReleaseDetailPage
- Tracklist
- TrackDetailPage
- LyricsSection
- BehindTheSongSection
- CreditsSection
- RelatedWritingSection
- StreamingLinks

Adapt component names and file organization to the existing project. Do not create unnecessary abstractions.

### Future CMS Compatibility

The architecture must be ready for a future Sanity integration.

Important:

- Keep data structures independent of UI components.
- Use stable IDs and slugs.
- Model references explicitly.
- Keep rich-text rendering adaptable to Sanity Portable Text.
- Keep image and audio sources as URL fields.
- Avoid coupling page components directly to the current local data storage.

Do not implement Sanity now.

## 12\. Accessibility and Performance

- Use semantic HTML.
- Provide meaningful image alt text.
- Ensure keyboard-accessible links.
- Maintain sufficient text contrast.
- Avoid layout shifts when artwork loads.
- Use appropriate image sizing.
- Do not autoplay audio.
- Do not add a complex audio player.
- Only provide a simple native audio control if an audio URL exists and the current implementation supports it cleanly.

## 13\. Acceptance Criteria

The implementation is complete only when:

 1. The Music navigation item opens the Music Archive.
 2. The Coming Soon state is removed.
 3. The archive supports Singles, EPs, and Albums.
 4. Release Detail pages work.
 5. Track Detail pages work.
 6. Tracklists navigate to individual tracks.
 7. Lyrics preserve line breaks and stanza spacing.
 8. Behind the Song and Behind the Release are independently supported.
 9. Release Credits and Track Credits are independently supported.
10. Tracks can reference existing Writing articles.
11. Optional content is hidden when unavailable.
12. Draft content is never exposed publicly.
13. Upcoming releases are displayed only when explicitly configured for public visibility.
14. Empty states are visually intentional.
15. Desktop and mobile layouts are both implemented and tested.
16. Existing Home, Writing, About, navigation, and global design remain intact.
17. The data architecture is ready for future Sanity integration.
18. No fabricated music content appears in production.

## 14\. Execution Instructions

Start by inspecting the existing project and all relevant documentation.

Then:

1. Summarize the existing architecture and identify the files that need modification.
2. Explain the proposed Music data model and component structure.
3. Explain the desktop and mobile layout plan.
4. Identify any potential conflicts with existing routes or components.
5. Present an implementation plan.

Do not implement anything until the plan has been reviewed and approved.

After approval, implement the Music section incrementally.

After implementation:

- Run the available build or validation commands.
- Check for broken routes.
- Check desktop and mobile layouts.
- Verify that existing pages remain unchanged.
- Report which files were created or modified.
- Report any unfinished functionality honestly.

**Final design principle: Music should feel like an editorial archive of an artist's work, not a miniature streaming service. Its purpose is to present the music, preserve its stories, and connect each work to the thoughts and writing behind it.**
