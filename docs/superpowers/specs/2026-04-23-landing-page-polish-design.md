# Landing Page Content Polish — Design Spec

## Goal

Polish the Dimensions landing page with richer content derived from studying the iOS app and patent application. Add new structural sections, improve existing copy, and ensure all content text is loaded as localized strings via i18next.

## Home Page Structure (Top to Bottom)

| # | Section | Component | Change |
|---|---------|-----------|--------|
| 1 | Hero | `Hero.tsx` | Edit copy |
| 2 | The Problem | `ProblemSection.tsx` | **New** |
| 3 | How It Works | `HowItWorksSection.tsx` | **New** |
| 4 | Feature Grid | `FeatureGrid.tsx` | Edit copy |
| 5 | What Makes It Different | `DifferentiatorsSection.tsx` | **New** |
| 6 | More Features | `MoreFeatures.tsx` | Edit: expand 4→6 items, enrich copy |
| 7 | Free Section | `FreeSection.tsx` | Edit copy |
| 8 | Final CTA | Existing | Keep |

## Section Details

### 1. Hero (edit `Hero.tsx`)

- **Tagline:** Keep "One Take. Every Dimension."
- **Intro (new copy):** "Stop recording twice. Dimensions is the free iOS camera that captures portrait and landscape video simultaneously — perfectly framed for TikTok, YouTube, and Instagram from a single take."
- Shorter than current intro, leads with action, names platforms immediately.

### 2. The Problem (new `ProblemSection.tsx`)

Three-column layout, each describing a creator frustration. Section header: "The Multi-Platform Dilemma".

| Column | Icon | Title | Description |
|--------|------|-------|-------------|
| 1 | Clock icon | "Record Everything Twice" | "You nail the perfect take for YouTube, then set up again for TikTok. Different framing, different energy — and double the work for every single video." |
| 2 | Scissors icon | "Crop and Hope" | "Or you record once and crop in post. Half your frame disappears, text gets cut off, and your carefully composed shot falls apart." |
| 3 | Repeat/arrows icon | "Waste Hours Every Week" | "Multiply this across every video you publish. Hours lost to duplicate shoots, re-edits, and reformatting — just to stay multi-platform." |

Followed by resolution line: "Dimensions fixes this." with subtle downward indicator.

**Styling:** Dark card backgrounds (`glass` or `bg-dark-card/50`), icons in `text-white/40`, descriptions in `text-white/60`. Responsive: stack to single column on mobile.

### 3. How It Works (new `HowItWorksSection.tsx`)

Three-step horizontal flow with numbered circles and connecting lines. Section header: "How It Works".

| Step | Title | Description |
|------|-------|-------------|
| 1 | "Frame Your Shot" | "The cross-shaped viewfinder shows your portrait and landscape crops live. Compose both frames before you hit record." |
| 2 | "Record Once" | "Slide to record. Face following keeps you centered, auto-leveling keeps the horizon straight. Just focus on your content." |
| 3 | "Get Both Videos" | "Both portrait and landscape versions export to your Photos automatically. Upload to any platform instantly." |

**Styling:** Numbered circles with `bg-gradient-primary`, connecting horizontal line (`bg-white/10`). Responsive: vertical flow on mobile. Step titles in `text-white font-bold`, descriptions in `text-white/60`.

### 4. Feature Grid (edit `FeatureGrid.tsx`)

Same 4-card structure. Updated copy via locale keys:

| Feature | New Subtitle | New Description |
|---------|--------------|-----------------|
| Dual Recording | "Shoot once, post everywhere" | "Record a single video and instantly get both 9:16 portrait and 16:9 landscape — ready for TikTok, YouTube, and Instagram without re-shooting or cropping." |
| Live Preview | "See both frames before you record" | "The cross-shaped viewfinder overlays your portrait and landscape crops in real time. What you see is exactly what you get — no guessing, no surprises in post." |
| Auto Leveling | "Steady horizon, no gimbal required" | "Your iPhone's gyroscope keeps the horizon perfectly level frame by frame — while you walk, vlog, or film handheld. Professional stability without extra gear." |
| Face Following | "Move freely, stay perfectly framed" | "Three-axis face tracking follows you horizontally, vertically, and adjusts zoom — with intelligent pose-aware framing that adds natural headroom where you look." |

### 5. What Makes It Different (new `DifferentiatorsSection.tsx`)

Section header: "Built Different" with subtitle "Features you won't find in any other camera app."

Two-column layout (icon + title + description per row), 4 items:

| # | Title | Description |
|---|-------|-------------|
| 1 | "Cross-Shaped Viewfinder" | "A unique overlay shows both your portrait and landscape crops simultaneously — not a toggle, not a split screen. You see exactly how both videos will look in a single glance." |
| 2 | "Pose-Aware Framing" | "Goes beyond center-lock tracking. Dimensions reads your head direction and adds cinematic breathing room where you're looking — the kind of composed framing that usually requires a camera operator." |
| 3 | "Per-Frame Leveling" | "Not just stabilization — true per-frame horizon correction using your device's gyroscope. Each frame is individually straightened, so your video stays level even through quick movements." |
| 4 | "Quality-First Processing" | "Records raw, unfiltered video to preserve full dynamic range. Your chosen camera look is applied during export in a single pass — no stacked filters degrading your footage." |

**Styling:** Two-column grid on desktop (`sm:grid-cols-2`), single column on mobile. Each item: icon in a rounded square with `bg-[#5A4898]/20 text-[#5A4898]`, text to the right. Use `glass` or `bg-dark-card/50` backgrounds.

### 6. More Features (edit `MoreFeatures.tsx`)

Expand from 4 to 6 items in a 2-column grid (3 rows). Updated/new items:

| # | Title | Description | Icon | Status |
|---|-------|-------------|------|--------|
| 1 | "16 Camera Looks" | "From Film Grain to Teal & Orange, Bleach Bypass to Noir — pick your cinematic style and see it live before you record." | SparklesIcon | Enriched |
| 2 | "Instant Dual Export" | "Both portrait and landscape videos save to your Photos the moment you stop recording. No rendering queue, no waiting." | DocumentDuplicateIcon | Enriched |
| 3 | "Precision Exposure Dial" | "Fine-tune brightness with a rotary exposure dial. Intuitive, precise, and always within reach." | SunIcon | Enriched |
| 4 | "Slide to Record" | "Drag the slider to start recording, tap for instant photos — even mid-video. One control for everything." | PlayCircleIcon | Enriched |
| 5 | "Tap to Focus" | "Tap anywhere to set focus and exposure. A visual indicator confirms the lock so you know exactly where the camera is looking." | CursorArrowRaysIcon | **New** |
| 6 | "Front & Back Camera" | "Switch between front and back cameras with a smooth flip animation. Face following works on both." | ArrowPathIcon | **New** |

### 7. Free Section (edit `FreeSection.tsx`)

- **Title:** "Completely Free"
- **Description:** "Every feature. Every camera look. Every export. Free. A small watermark appears on exports, removable with a single one-time purchase — no subscriptions, no feature gates."
- **Badges:** Keep existing two badges, update copy to match.

### Feature Pages (copy-only edits)

No structural changes. Tighten copy on all 4 feature pages:
- Sharper problem/solution language
- More specific technical details (e.g., "15 fps face detection", "exponential moving average smoothing")
- Feature pages already use `FeaturePageLayout` and pull all text from locale — only locale JSON changes needed.

Updated feature page copy in locale:

**Dual Recording:**
- heroTitle: "Record Once. Post Everywhere."
- heroSubtitle: "One take gives you portrait and landscape — ready for every platform."
- problem/solution/howItWorks: tighten existing copy, no major rewrites needed

**Live Preview:**
- heroTitle: "Frame Both. Miss Nothing."
- heroSubtitle: "The cross-shaped viewfinder shows both crops live — compose with confidence."

**Auto Leveling:**
- heroTitle: "Walk. Run. Stay Level."
- heroSubtitle: "Per-frame gyroscope correction keeps every frame straight — no gimbal required."

**Face Following:**
- heroTitle: "Move Freely. Stay Framed."
- heroSubtitle: "Three-axis tracking with pose-aware framing keeps you centered no matter how you move."

## Localization Strategy

### New locale keys (added to `landing.json`)

```
problem.title
problem.subtitle
problem.recordTwice.title
problem.recordTwice.description
problem.cropAndHope.title
problem.cropAndHope.description
problem.wasteHours.title
problem.wasteHours.description
problem.resolution

howItWorks.title
howItWorks.subtitle
howItWorks.frameShot.title
howItWorks.frameShot.description
howItWorks.recordOnce.title
howItWorks.recordOnce.description
howItWorks.getBothVideos.title
howItWorks.getBothVideos.description

differentiators.title
differentiators.subtitle
differentiators.crossViewfinder.title
differentiators.crossViewfinder.description
differentiators.poseAware.title
differentiators.poseAware.description
differentiators.perFrameLeveling.title
differentiators.perFrameLeveling.description
differentiators.qualityFirst.title
differentiators.qualityFirst.description

moreFeatures.tapToFocus.title
moreFeatures.tapToFocus.description
moreFeatures.cameraFlip.title
moreFeatures.cameraFlip.description
```

### Updated locale keys

All existing keys under `features.*`, `moreFeatures.*`, `free.*`, and feature page hero titles/subtitles get updated copy as described above.

### Multi-language process

1. Update `public/locales/en/landing.json` with all new and modified keys
2. Copy the same keys (with English values as placeholders) to all 15 other locale files
3. Run `bun run localized` to verify no missing keys
4. User runs `bun run localize` separately to machine-translate

## Files Changed

| File | Action |
|------|--------|
| `public/locales/en/landing.json` | Edit: add new keys, update existing copy |
| `public/locales/{14 other langs}/landing.json` | Edit: add new keys with English placeholder values |
| `src/components/Hero.tsx` | Edit: update intro text key usage (no structural change) |
| `src/components/ProblemSection.tsx` | **Create** |
| `src/components/HowItWorksSection.tsx` | **Create** |
| `src/components/DifferentiatorsSection.tsx` | **Create** |
| `src/components/MoreFeatures.tsx` | Edit: add 2 items, update key references |
| `src/components/FreeSection.tsx` | Edit: update key references |
| `src/components/pages/HomePage.tsx` | Edit: add new sections to page layout |

## Design Constraints

- All user-facing text via `t('key')` from `useTranslation()` — no hardcoded strings
- Follow existing component patterns: function components, default exports, Tailwind utilities
- Use existing design tokens: `glass`, `bg-dark-card`, `text-white/60`, `bg-gradient-primary`, `bg-[#5A4898]/20`
- Responsive: all new sections must work on mobile (stack columns) and desktop
- Dark mode only (Theme.DARK is forced)
- Icons from `@heroicons/react/24/outline` (already a dependency)
