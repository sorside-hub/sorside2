---
title: "RESPONSIVE DESIGN REQUIREMENT: MOBILE & DESKTOP"
date: 2026-11-07T17:21:09.536Z
---

Before implementing the website, create and consider two distinct visual layouts:

1. Desktop Design
2. Mobile Design

These are not two versions of the same layout with different screen widths. They must be intentionally designed for their respective devices while maintaining one consistent visual identity.

## 1\. Desktop Design

Design the desktop experience for wider screens.

- Use the editorial layout with generous whitespace.
- Allow more horizontal composition where appropriate.
- The homepage may use multiple columns, side-by-side sections, or supporting content areas.
- Navigation should be displayed horizontally.
- Typography can be larger and more expressive.
- Maintain comfortable reading widths rather than stretching text across the entire screen.
- Use the available space intentionally. Avoid making the page feel empty or unnecessarily stretched.

## 2\. Mobile Design

Design the mobile experience as its own composition, not a compressed desktop layout.

- Prioritize a natural, comfortable vertical reading flow.
- Reorganize desktop sections when necessary instead of simply stacking every element in the same order.
- Use a compact mobile header with an appropriate navigation pattern, such as a menu button.
- Reconsider the placement of the wordmark, navigation, search, and theme controls.
- Remove or relocate secondary elements that would make the mobile layout crowded.
- Convert multi-column sections into thoughtfully arranged mobile sections.
- Adjust typography, spacing, margins, and image proportions specifically for smaller screens.
- Article pages must provide an especially comfortable reading experience on mobile.
- Interactive elements must have comfortable touch targets.
- Avoid horizontal scrolling and clipped content.

## 3\. Responsive Behavior

Use responsive breakpoints to adapt between layouts, but do not rely on breakpoints alone to solve the design.

You may change:

- Element order and positioning.
- Navigation structure.
- Column composition.
- Typography scale.
- Spacing and proportions.
- Image dimensions and cropping.
- Visibility and placement of secondary elements.

Keep the visual identity consistent across devices:

- Warm color palette.
- Editorial visual language.
- Minimal identity.
- Typography and design tokens.
- Light, Dark, and System themes.

## 4\. Implementation Requirements

- Build reusable components that can support different desktop and mobile compositions.
- Avoid excessive duplicated components or duplicated content.
- Use CSS Grid, Flexbox, and responsive styles appropriately.
- Do not use fixed desktop widths that cause overflow on mobile.
- Do not simply scale down desktop typography and spacing.
- Ensure every page is intentionally considered for both mobile and desktop.

## 5\. Design Validation

Do not consider responsive design complete until you have inspected the actual layouts at both desktop and mobile sizes.

At minimum, test:

- Mobile: 375px and 390px viewport widths.
- Tablet: 768px viewport width.
- Desktop: 1440px viewport width.

Check the following pages:

- Home
- Writing archive
- Article detail
- Music
- About
- 404

Fix layout issues and improve the composition where necessary.

## Final Design Principle

The desktop and mobile experiences should feel like two carefully designed interpretations of the same publication, not one layout being forced into two different screen sizes.

Prioritize design quality and usability on both platforms equally.
