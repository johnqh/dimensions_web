# Sudobility Landing Page - Implementation Plan

## Project Overview

Single-page company landing page for Sudobility with localization support (16 languages).

**Tagline:** "Solve the puzzle of life"
**Contact:** info@sudobility.com
**Product:** signic.email (Web3 email platform)

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS
- **i18n:** i18next (same setup as mail_box)
- **Dependencies:** @sudobility/components, @sudobility/types (if needed)

---

## Project Structure

```
/Users/johnhuang/sudobility/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── locales/
│       ├── en/
│       │   └── landing.json
│       ├── zh/
│       ├── zh-hant/
│       ├── ja/
│       ├── ko/
│       ├── es/
│       ├── fr/
│       ├── de/
│       ├── it/
│       ├── pt/
│       ├── ru/
│       ├── ar/
│       ├── sv/
│       ├── th/
│       ├── uk/
│       └── vi/
│           └── landing.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── i18n.ts
    ├── index.css
    ├── components/
    │   ├── Hero.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductsSection.tsx
    │   ├── ContactSection.tsx
    │   ├── Footer.tsx
    │   └── graphics/
    │       └── GradientBlob.tsx
    └── assets/
        └── (generated SVG graphics)
```

---

## Page Layout

### 1. Topbar (from @sudobility/components)

- Left: "Sudobility" text/logo
- Right: Language picker only (no login/wallet)
- Sticky positioning

### 2. Hero Section

- Large tagline: "Solve the puzzle of life"
- Gradient abstract background graphics (SVG-based)
- Brief company intro text
- Animated gradient blobs for visual interest

### 3. Products Section

- Section title: "Our Products"
- Product card for signic.email:
  - Name: signic.email
  - Description: Web3 email platform with wallet authentication
  - Key features (3-4 bullet points):
    - Wallet-based authentication (no passwords)
    - ENS/SNS domain support
    - Multi-chain: Ethereum + Solana
    - Smart contract integration
  - Link to https://signic.email

### 4. Contact Section

- Simple centered text
- Email: info@sudobility.com
- Optional: subtle gradient accent

### 5. Footer

- Copyright notice: "© 2024 Sudobility. All rights reserved."
- Simple, minimal design

---

## Graphics Strategy (Gradient Abstract Style)

Generate SVG-based graphics:

1. **Gradient Blobs** - Animated floating abstract shapes
2. **Gradient Mesh Background** - Colorful gradient overlays
3. **Accent Lines** - Subtle geometric line patterns

Color palette (Web3/crypto inspired):

- Primary: Purple (#8B5CF6) to Blue (#3B82F6) gradient
- Accent: Cyan (#06B6D4) to Pink (#EC4899)
- Background: Dark (#0F172A) with gradient overlays
- Text: White/Gray for contrast

---

## Localization Setup

Same i18n configuration as mail_box:

- i18next + react-i18next
- i18next-http-backend for loading JSON files
- i18next-browser-languagedetector
- URL path-based language detection (e.g., `/zh/`, `/ja/`)
- Fallback chain: specific → general → English

**Translation namespace:** `landing.json` with keys:

- `tagline`
- `companyIntro`
- `productsTitle`
- `signicEmail.name`
- `signicEmail.description`
- `signicEmail.features.*`
- `contact.title`
- `contact.email`
- `footer.copyright`

---

## Implementation Steps

### Phase 1: Project Setup

1. Initialize Vite + React + TypeScript project
2. Configure Tailwind CSS
3. Add dependencies (@sudobility/components, i18next packages)
4. Set up i18n configuration (copy pattern from mail_box)

### Phase 2: Core Components

5. Create App.tsx with routing for language paths
6. Implement Topbar integration with language picker
7. Create Hero component with gradient graphics
8. Create ProductCard and ProductsSection
9. Create ContactSection
10. Create Footer

### Phase 3: Graphics

11. Generate gradient blob SVG components
12. Add subtle CSS animations for visual interest
13. Implement responsive gradient backgrounds

### Phase 4: Localization

14. Create English translation file (landing.json)
15. Generate translations for all 16 languages
16. Test language switching

### Phase 5: Polish

17. Responsive design adjustments
18. Dark mode support (if Topbar supports it)
19. SEO meta tags
20. Final testing across languages

---

## Files to Create

| File                                       | Purpose                      |
| ------------------------------------------ | ---------------------------- |
| `package.json`                             | Dependencies and scripts     |
| `vite.config.ts`                           | Vite build configuration     |
| `tsconfig.json`                            | TypeScript configuration     |
| `tailwind.config.js`                       | Tailwind theme/colors        |
| `postcss.config.js`                        | PostCSS for Tailwind         |
| `index.html`                               | HTML entry point             |
| `src/main.tsx`                             | React entry point            |
| `src/App.tsx`                              | Main app with routing        |
| `src/i18n.ts`                              | i18next configuration        |
| `src/index.css`                            | Global styles + Tailwind     |
| `src/components/Hero.tsx`                  | Hero section                 |
| `src/components/ProductCard.tsx`           | Product display card         |
| `src/components/ProductsSection.tsx`       | Products container           |
| `src/components/ContactSection.tsx`        | Contact info                 |
| `src/components/Footer.tsx`                | Footer with copyright        |
| `src/components/graphics/GradientBlob.tsx` | Animated gradient shapes     |
| `public/locales/*/landing.json`            | Translation files (16 langs) |

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "i18next": "^25.0.0",
    "react-i18next": "^16.0.0",
    "i18next-http-backend": "^3.0.0",
    "i18next-browser-languagedetector": "^8.0.0",
    "@sudobility/components": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```
