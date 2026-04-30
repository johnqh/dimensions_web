# Dimensions Camera App — Marketing Website Design Spec

**Date:** 2026-04-23
**Domain:** dimensions.cam
**Stack:** React 19 + Vite + TypeScript + Tailwind CSS + i18next (16 languages)
**Template:** Cloned from ~/projects/sudobility with same design system, components, building blocks
**SEO:** @sudobility/seo_lib
**Analytics:** Firebase (same config as sudobility, to be updated later)
**Deployment:** Cloudflare Pages

## Purpose

Marketing website for Dimensions, a free iOS camera app that records video in both portrait and landscape orientations simultaneously. Target audience: social media influencers who post to both YouTube (landscape) and TikTok/Instagram Reels (portrait).

## Branding

- **Company:** Sudobility
- **App name:** Dimensions
- **Domain:** dimensions.cam
- **Logo:** logo_web.svg (colorful camera aperture)
- **Primary accent:** #5A4898 (purple from the app's control panel)
- **Theme:** Dark default (camera UI aesthetic)
- **Twitter:** @sudobility
- **App Store:** Placeholder URL

## Pages & Routes

All routes prefixed with `/:lang` for 16 languages.

### 1. Home Page (`/:lang`)

Sections:
1. **Hero** — "One Take. Every Dimension." tagline, app pitch, App Store CTA, phone mockup placeholder
2. **Feature Cards** — 4 cards linking to detail pages (Dual Recording, Live Preview, Auto Leveling, Face Following)
3. **More Features** — Camera Looks (16 filters), Dual Export, Exposure Control, Slide-to-Record
4. **Free Section** — Free with tiny watermark, optional in-app purchase to remove
5. **Download CTA** — Final App Store push with phone mockup

SEO keywords: dual orientation camera, record portrait landscape simultaneously, social media video app, influencer camera app

### 2. Dual Recording (`/:lang/dual-recording`)

Core benefit: Record once, get both 9:16 portrait AND 16:9 landscape videos automatically.

Sections:
1. Hero with feature tagline + screenshot placeholder
2. The Problem — Influencers record twice or crop badly
3. How It Works — Square sensor capture, intelligent dual crop
4. Use Cases — YouTube + TikTok, Instagram Reels + Stories
5. Screenshot/video placeholders
6. CTA

SEO keywords: record portrait and landscape at once, dual orientation video, one take two formats

### 3. Live Preview (`/:lang/live-preview`)

Core benefit: See exactly what both crops look like in real-time with a large, clear preview.

Sections:
1. Hero
2. The Problem — Tiny previews, guessing what the crop looks like
3. Cross-shaped Preview — How the UI shows both orientations
4. Pinch-to-zoom preview
5. Screenshot placeholders
6. CTA

SEO keywords: live preview both orientations, camera preview portrait landscape

### 4. Auto Leveling (`/:lang/auto-leveling`)

Core benefit: Video stays perfectly level even when walking or moving, no gimbal needed.

Sections:
1. Hero
2. The Problem — Shaky handheld footage
3. How It Works — Gyroscope-based real-time leveling
4. Before/After comparison placeholder
5. CTA

SEO keywords: auto level video, stabilize video without gimbal, self-balancing camera

### 5. Face Following (`/:lang/face-following`)

Core benefit: Camera intelligently tracks faces to keep subjects perfectly framed in both crops.

Sections:
1. Hero
2. The Problem — Subject drifts out of frame in one orientation
3. Three Axes — X (horizontal), Y (vertical), Z (zoom) tracking
4. Intelligent Following — Pose-aware framing (looks where subject faces)
5. Screenshot placeholders
6. CTA

SEO keywords: face tracking camera app, auto frame face video, influencer face following

## Additional Features (Home Page)

- **16 Camera Looks** — Standard, Rich Contrast, Vibrant, Warm, Cool, Mono, Noir, Tonal, Fade, Chrome, Instant, Process, Film Grain, Bleach Bypass, Teal & Orange, Muted
- **Dual Export** — Both orientations saved to Photos automatically
- **Precision Exposure** — Rotary dial for fine-grained exposure control
- **Slide-to-Record** — Intuitive slide gesture to start/stop recording, tap for photo

## Shared Components

- **FeaturePageLayout** — Reusable template for the 4 feature pages (hero, sections, CTA)
- **PhoneMockup** — Placeholder component for screenshot/video display
- **FeatureCard** — Card linking to feature detail page (used on home)
- **DownloadCTA** — App Store button component
- **FeatureGrid** — Grid of additional feature items

## SEO Implementation

- `SEO` component from seo_lib on every page with unique title/description/keywords/canonical
- Schema.org `SoftwareApplication` JSON-LD (free, iOS, camera category)
- Open Graph + Twitter cards per page (twitter:site @sudobility)
- Sitemap: 5 pages x 16 languages = 80 URLs with hreflang alternates
- robots.txt with AI crawler support
- Semantic HTML components from seo_lib (Main, Article, Section, H1-H4)
- AIMeta tags for content type and summary

## Internationalization

16 languages matching sudobility: en, zh, zh-hant, ja, ko, es, fr, de, it, pt, ru, ar, sv, th, uk, vi

Translation files: `public/locales/{lang}/landing.json`
English as source of truth; other languages use same localize script as sudobility.

## File Structure

```
dimensions_web/
├── public/
│   ├── locales/{lang}/landing.json  (16 languages)
│   ├── logo.svg                      (from dimensions app)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og-image.png                  (placeholder)
├── src/
│   ├── App.tsx                       (routes)
│   ├── main.tsx
│   ├── i18n.ts
│   ├── index.css                     (Tailwind + theme)
│   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DualRecordingPage.tsx
│   │   │   ├── LivePreviewPage.tsx
│   │   │   ├── AutoLevelingPage.tsx
│   │   │   └── FaceFollowingPage.tsx
│   │   ├── Hero.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── FeaturePageLayout.tsx
│   │   ├── PhoneMockup.tsx
│   │   ├── DownloadCTA.tsx
│   │   ├── FreeSection.tsx
│   │   └── SEO.tsx
│   ├── config/
│   │   ├── constants.ts
│   │   └── initialize.ts
│   ├── context/
│   │   └── PageConfigProvider.tsx
│   ├── hooks/
│   │   └── usePageConfig.ts
│   ├── stubs/                        (same as sudobility)
│   └── utils/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── .env
```
