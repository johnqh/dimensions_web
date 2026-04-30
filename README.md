# Sudobility Landing Page

Multi-language (16 locales) marketing landing page for Sudobility. Built with React 19, TypeScript, Vite, and Tailwind CSS. Deployed to Cloudflare Pages.

## Setup

```bash
bun install
```

Requires a `.env.local` file with Firebase configuration:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## Usage

```bash
bun run dev          # Start dev server (port 4000)
bun run build        # Type-check + production build
bun run preview      # Preview production build
```

## Development

```bash
bun run lint         # ESLint
bun run localize     # Auto-translate all 16 locales from English source
bun run localized    # Verify all locale files have every key from en/landing.json
```

### Internationalization

16 supported locales: `en, zh, zh-hant, ja, ko, es, fr, de, it, pt, ru, ar, sv, th, uk, vi`

- English (`public/locales/en/landing.json`) is the source of truth
- Edit English first, then run `bun run localize` to translate
- Run `bun run localized` to verify no keys are missing

### Stubs System

The `@sudobility/building_blocks` package has optional peer dependencies this project does NOT install. Vite aliases in `vite.config.ts` redirect these imports to stub files. Do not remove or modify stubs without understanding the alias chain.

## Deployment

- **Platform**: Cloudflare Pages
- **Config**: `wrangler.toml` (output dir: `dist/`)
- **Build command**: `bun run build`

## License

Private
