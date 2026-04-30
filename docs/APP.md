# App Page Architecture

This document describes the standard page architecture used by Sudobility web apps (sudojo_app, shapeshyft_app, etc.). All apps should follow this pattern for consistent layout behavior.

## Overview

The architecture has four layers:

```
ScreenContainer (route-level, provides PageConfigProvider)
  AppPageLayout (topbar, breadcrumbs, content area, footer)
    Page Component (uses useSetPageConfig for layout overrides)
      Section / MasterDetailLayout (content width and structure)
```

## ScreenContainer

ScreenContainer wraps **all routes at the route level** via a layout route. It must NOT be used per-page.

### Placement

```tsx
// App.tsx
function ScreenContainerLayout() {
  return (
    <ScreenContainer>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </ScreenContainer>
  );
}

// In route definitions:
<Route path="/:lang" element={<LanguageValidator ... />}>
  <Route element={<ScreenContainerLayout />}>
    <Route index element={<HomePage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="docs" element={<DocsPage />} />
    {/* all other routes */}
  </Route>
</Route>
```

### What it provides

- `PageConfigProvider` context (enables `useSetPageConfig` in child pages)
- TopBar, breadcrumbs, and footer (determined automatically via hooks)
- Default page config passed to `AppPageLayout`:

```tsx
page={{
  maxWidth: 'full',
  contentPadding: 'none',
  contentClassName: 'w-full min-w-0',
  ...pageConfigOverrides   // from useSetPageConfig
}}
```

### Why route-level matters

`useSetPageConfig` calls `useContext(PageConfigContext)`. If ScreenContainer (which contains PageConfigProvider) is per-page, the hook is called **above** the provider and does nothing. At the route level, all page components render **inside** the provider.

## AppPageLayout

The core layout component from `@sudobility/building_blocks`. Renders the topbar, breadcrumbs, main content area, and footer.

### Page Config (AppPageProps)

| Prop               | Type                                                                | Default     | Description                        |
| ------------------ | ------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `maxWidth`         | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '4xl' \| '7xl' \| 'full'` | `'7xl'`     | Max width of content area          |
| `contentPadding`   | `'none' \| 'sm' \| 'md' \| 'lg'`                                    | `'md'`      | Padding around content             |
| `scrollable`       | `boolean`                                                           | `true`      | Whether content scrolls internally |
| `contentClassName` | `string`                                                            | —           | Additional classes on content div  |
| `mainClassName`    | `string`                                                            | —           | Additional classes on main element |
| `background`       | `'default' \| 'white' \| 'gradient'`                                | `'default'` | Background variant                 |

### Content padding values

| Value    | Classes             |
| -------- | ------------------- |
| `'none'` | (none)              |
| `'sm'`   | `px-4 sm:px-6 py-6` |
| `'md'`   | `px-4 py-8`         |
| `'lg'`   | `px-4 py-12`        |

### Sticky vs natural layout

The layout mode is determined by footer type:

- **Compact footer or no footer** -> sticky layout: `h-screen overflow-hidden` on root, content scrolls internally
- **Full footer** -> natural layout: `min-h-screen` on root, page scrolls naturally

### Content div classes by mode

**Scrollable (default)** — content scrolls, footer stays pinned:

```
mx-auto max-w-[X] [padding] flex-1 min-h-0 overflow-auto [contentClassName]
```

**Non-scrollable** (`scrollable: false`) — content fills container as flex column, panels handle own scroll:

```
mx-auto max-w-[X] [padding] flex-1 min-h-0 overflow-hidden flex flex-col [contentClassName]
```

**Natural scroll** (full footer) — no scroll constraints:

```
mx-auto max-w-[X] [padding] [contentClassName]
```

## useSetPageConfig

Hook for pages to override layout config. Uses `useLayoutEffect` to set config before paint.

```tsx
import { useSetPageConfig } from '@/hooks/usePageConfig';

function MyPage() {
  // Override page layout for this page
  useSetPageConfig({
    scrollable: false,
    contentPadding: 'sm',
    maxWidth: '7xl',
  });

  return <MasterDetailLayout ... />;
}
```

Config is automatically reset when the page unmounts.

## Section

The primary building block for content pages. Provides consistent max-width constraint, centering, and horizontal padding.

### Usage

```tsx
import { Section } from '@sudobility/components';
// or from local: import { Section } from '@/components/layout/Section';

<Section spacing="xl">
  <h1>Page Title</h1>
  <p>Content constrained to max-w-7xl with responsive padding</p>
</Section>;
```

### Props

| Prop                 | Type                                                               | Default     | Description                                          |
| -------------------- | ------------------------------------------------------------------ | ----------- | ---------------------------------------------------- |
| `maxWidth`           | `'sm' \| 'md' \| ... \| '7xl' \| 'full'`                           | `'7xl'`     | Inner container max width                            |
| `spacing`            | `'none' \| 'xs' \| 'sm' \| ... \| '5xl'`                           | `'3xl'`     | Vertical padding (py-\*)                             |
| `background`         | `'none' \| 'default' \| 'surface' \| 'muted' \| 'gradient' \| ...` | `'none'`    | Background style                                     |
| `variant`            | `'default' \| 'hero' \| 'feature' \| 'cta' \| ...`                 | `'default'` | Section variant                                      |
| `fullWidth`          | `boolean`                                                          | `false`     | Skip inner container (children render at full width) |
| `as`                 | HTML element                                                       | `'section'` | HTML element to render                               |
| `containerClassName` | `string`                                                           | —           | Additional classes on inner container                |

### How it works

The outer element extends full viewport width (for backgrounds). The inner container is constrained:

```
<section class="[spacing] [background]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
</section>
```

### When to use Section

- Content pages (pricing, about, privacy, terms, etc.)
- Any page that needs standard width constraint without custom layout
- NOT for MasterDetailLayout pages (use `useSetPageConfig` instead)

## MasterDetailLayout

Responsive master-detail layout from `@sudobility/components`. Side-by-side on desktop, toggle views on mobile.

### Usage

```tsx
import { MasterDetailLayout } from '@sudobility/components';

function TechniquesPage() {
  useSetPageConfig({ scrollable: false, contentPadding: 'sm', maxWidth: '7xl' });

  return (
    <MasterDetailLayout
      masterTitle="Techniques"
      masterContent={<NavigationList />}
      detailContent={<DetailView />}
      detailTitle="Selected Item"
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      masterWidth={320}
      stickyMaster
      stickyTopOffset={80}
    />
  );
}
```

### Key props

| Prop                 | Type                        | Default        | Description                        |
| -------------------- | --------------------------- | -------------- | ---------------------------------- |
| `masterContent`      | `ReactNode`                 | required       | Left panel content                 |
| `detailContent`      | `ReactNode`                 | required       | Right panel content                |
| `masterTitle`        | `string`                    | —              | Title above master panel           |
| `detailTitle`        | `string`                    | —              | Title in detail panel              |
| `masterWidth`        | `number`                    | `320`          | Master panel width (px) on desktop |
| `mobileView`         | `'navigation' \| 'content'` | `'navigation'` | Mobile view state                  |
| `onBackToNavigation` | `() => void`                | —              | Mobile back button handler         |
| `stickyMaster`       | `boolean`                   | `true`         | Sticky master panel on desktop     |
| `stickyTopOffset`    | `number`                    | `96`           | Top offset for sticky (px)         |
| `enableAnimations`   | `boolean`                   | `true`         | Smooth content transitions         |

### Page config for MasterDetailLayout pages

MasterDetailLayout pages **must** set page config to disable scrolling and constrain width:

```tsx
useSetPageConfig({ scrollable: false, contentPadding: 'sm', maxWidth: '7xl' });
```

- `scrollable: false` makes the content area `flex flex-col` so MasterDetailLayout fills the height
- `contentPadding: 'sm'` adds responsive horizontal padding
- `maxWidth: '7xl'` constrains the layout to the standard page width

### Desktop layout

```
[Master Panel (fixed width)]  [gap]  [Detail Panel (flex-1)]
```

- Master: fixed width aside with optional sticky positioning
- Detail: fills remaining space, has its own scroll
- Both panels: white background, rounded corners, border

### Mobile layout

- Navigation view: shows master panel full width
- Content view: shows detail panel with back button
- Controlled by `mobileView` prop and `onBackToNavigation` callback

## Page Patterns

### Content page (pricing, about, etc.)

Uses Section for width constraint. No special page config needed.

```tsx
function PricingPage() {
  return (
    <Section spacing="xl">
      <PricingContent />
    </Section>
  );
}
```

### Master-detail page (settings, techniques, admin, etc.)

Uses `useSetPageConfig` for layout control. No Section wrapper.

```tsx
function SettingsPage() {
  useSetPageConfig({ scrollable: false, contentPadding: 'sm', maxWidth: '7xl' });

  return (
    <GlobalSettingsPage
      theme={theme}
      onThemeChange={setTheme}
      ...
    />
  );
}
```

### Master-detail page with SEO components

SEO/meta components render to `<head>` and don't affect layout. They can be siblings of the layout component.

```tsx
function DocsPage() {
  useSetPageConfig({ scrollable: false, contentPadding: 'sm', maxWidth: '7xl' });

  return (
    <>
      <SEO title="Docs" />
      <div className="w-full min-w-0 overflow-x-hidden flex-1 flex flex-col min-h-0">
        <MasterDetailLayout
          masterContent={sidebar}
          detailContent={content}
          ...
        />
      </div>
    </>
  );
}
```

### Home page

Uses full footer (natural scroll) and Section for content blocks.

```tsx
function HomePage() {
  return (
    <>
      <Section spacing="5xl" variant="hero">
        <HeroContent />
      </Section>
      <Section spacing="3xl">
        <Features />
      </Section>
    </>
  );
}
```

The footer variant is determined automatically by ScreenContainer based on the route (home page gets full footer, all other pages get compact footer).
