# Sudobility Landing Page

Multi-language (16 locales) marketing landing page. React 19 + TypeScript + Vite + Tailwind CSS.
Deployed to Cloudflare Pages.

## Commands

- `bun install` -- install dependencies
- `bun run dev` -- start dev server (port 4000)
- `bun run build` -- type-check + production build (`tsc -b && vite build`)
- `bun run lint` -- ESLint
- `bun run preview` -- preview production build
- `bun run localize` -- auto-translate all 16 locales from English source (requires `../0xmail` sibling repo)
- `bun run localized` -- verify all locale files have every key from `en/landing.json`

## Architecture

Single-page app with URL-based language routing (`/:lang`). No auth, no backend API.

### Entry flow

`main.tsx` -> `App.tsx` -> `SudobilityApp` (from `@sudobility/building_blocks`) -> Routes

### Key files

- `src/App.tsx` -- routes, layout shell, language switching
- `src/i18n.ts` -- i18next config, `supportedLanguages` array (canonical list of 16 locales)
- `src/components/Hero.tsx` -- hero banner with animated gradient blobs
- `src/components/ProductsSection.tsx` -- products grid (4 products)
- `src/components/ProductCard.tsx` -- reusable product card
- `src/components/ContactSection.tsx` -- contact CTA with email link
- `src/components/SEOHead.tsx` -- per-route SEO via `@sudobility/seo_lib` (`usePageSEO` hook)
- `src/components/buildHowToSchema.ts` -- builds HowTo JSON-LD structured data from i18n
- `src/config/seo.ts` -- SEO config constants and non-production host detection
- `src/config/initialize.ts` -- DI service initialization (Firebase, network, storage)
- `src/config/analytics.ts` -- analytics singleton via Firebase
- `vite.config.ts` -- Vite aliases for stubs, React dedup, service worker plugin

### Layout pattern

Uses `@sudobility/building_blocks` layout components:

- `SudobilityApp` -- app wrapper (provides i18n, router, Helmet)
- `AppTopBar` -- sticky header with logo and language picker
- `AppBreadcrumbs` -- breadcrumb bar with share button
- `AppFooterForHomePage` -- footer with link sections
- `LayoutProvider` + `ThemeProvider` from `@sudobility/components`

## Stubs System (CRITICAL)

The `@sudobility/building_blocks` package has optional peer dependencies this project does NOT install.
Vite aliases in `vite.config.ts` redirect these imports to stub files with no-op implementations.

**DO NOT remove or modify stubs without understanding the alias chain. The build WILL break.**

| Import path                           | Stub file                              |
| ------------------------------------- | -------------------------------------- |
| `firebase/auth`                       | `src/stubs/firebase-auth.ts`           |
| `@sudobility/di_web`                  | `src/stubs/di_web.ts`                  |
| `@sudobility/auth_lib`                | `src/stubs/auth_lib.ts`                |
| `@sudobility/subscription-components` | `src/stubs/subscription-components.ts` |
| `@sudobility/devops-components`       | `src/stubs/devops-components.ts`       |
| `@sudobility/subscription_lib`        | `src/stubs/subscription_lib.ts`        |

**Note:** The real `@sudobility/di_web/vite` plugin (`serviceWorkerPlugin`) is imported in `vite.config.ts` at Node level and is NOT affected by the alias.

### Stub rules

- If `building_blocks` adds new imports from a stubbed package, add the missing export to the stub
- If you see "export not found" errors from these packages, update the stub
- Never import these packages directly in app code -- they are stubs only

## Internationalization (i18n)

16 supported locales: `en, zh, zh-hant, ja, ko, es, fr, de, it, pt, ru, ar, sv, th, uk, vi`

### How it works

- Two namespaces: `landing` (default) and `howto` (files at `public/locales/{lang}/{ns}.json`)
- i18next-http-backend loads JSON at runtime from `/locales/{{lng}}/landing.json`
- URL path determines language: `/ja` -> Japanese
- `src/i18n.ts` `supportedLanguages` array is the canonical list

### Rules for modifying translations

1. Edit `public/locales/en/landing.json` first (English is the source of truth)
2. Update ALL 15 other locale files with the same keys
3. Run `bun run localized` to verify no keys are missing
4. Translation keys are nested objects (e.g., `svgr.features.conversion`)
5. Use `t('key')` from `useTranslation()` -- never hardcode user-facing strings

### Adding a new language

1. Add language code to `supportedLanguages` array in `src/i18n.ts`
2. Add display name to `languageNames` in `src/i18n.ts`
3. Add to `LANGUAGE_INFO` in `src/App.tsx`
4. Add to `expectedLanguages` in `scripts/localization_verify.cjs`
5. Create `public/locales/{code}/landing.json` with all keys translated
6. Add translated `howto.json` to `public/locales/{code}/`

## @sudobility Packages

| Package                       | Used for                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@sudobility/building_blocks` | App shell: `SudobilityApp`, `AppTopBar`, `AppBreadcrumbs`, `AppFooterForHomePage`                                        |
| `@sudobility/components`      | `ThemeProvider`, `LayoutProvider`, `Theme`, `FontSize`, web vitals                                                       |
| `@sudobility/design`          | Design tokens (scanned by Tailwind for class names, not imported directly)                                               |
| `@sudobility/di`              | DI singletons: `initializeNetworkService`, `initializeStorageService`, `initializeFirebaseService`, `getFirebaseService` |
| `@sudobility/seo_lib`         | SEO utilities: `usePageSEO` hook for meta tags, canonical, hreflang, JSON-LD structured data                             |
| `@sudobility/types`           | Shared TypeScript types (used by other packages)                                                                         |

Packages that are **stubbed out** (NOT actually installed): `di_web`, `auth_lib`, `subscription-components`, `devops-components`, `subscription_lib`

### Theming

Dark mode is forced (`Theme.DARK` in `App.tsx`). Use these Tailwind tokens:

- Theme-aware: `bg-theme-bg-primary`, `text-theme-text-secondary`, etc.
- Custom landing colors: `primary-purple`, `primary-blue`, `accent-cyan`, `accent-pink`, `dark-bg`, `dark-card`
- Gradients: `bg-gradient-primary` (purple->blue), `bg-gradient-accent` (cyan->pink)
- Custom CSS: `.gradient-text`, `.glass` (defined in `src/index.css`)

## Conventions

- **Package manager**: bun (not npm/yarn)
- **Components**: function components with default exports
- **Styling**: Tailwind utility classes. No CSS modules.
- **TypeScript**: strict mode enabled
- **Path alias**: `@/*` maps to `src/*`
- **RTL**: Arabic (`ar`) has RTL CSS support in `src/index.css`
- **SEO**: uses `@sudobility/seo_lib` via `SEOHead` component; SEO titles/descriptions in i18n (`seo.*`, `seoPages.*`), HowTo schemas in `howto` namespace
- **No tests**: no test framework configured
- **No .env committed**: Firebase config via `.env.local` (`VITE_FIREBASE_*` vars)

## Deployment

- **Platform**: Cloudflare Pages
- **Config**: `wrangler.toml` (output dir: `dist/`)
- **Build command**: `bun run build`
- **Environment variables**: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID`
