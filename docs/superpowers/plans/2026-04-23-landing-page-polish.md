# Landing Page Content Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the Dimensions landing page with 3 new sections (Problem, How It Works, Differentiators), enriched existing sections, and improved copy — all fully localized.

**Architecture:** All user-facing text lives in `public/locales/en/landing.json` and is accessed via `t('key')` from `useTranslation()`. New components follow existing patterns: function components with default exports, Tailwind utility classes, dark theme tokens. Other 15 locales are auto-generated via `bun run localize`.

**Tech Stack:** React 19, TypeScript, i18next, Tailwind CSS, @heroicons/react

---

## File Map

| File                                        | Action | Responsibility                      |
| ------------------------------------------- | ------ | ----------------------------------- |
| `public/locales/en/landing.json`            | Modify | Add new keys + update existing copy |
| `src/components/ProblemSection.tsx`         | Create | 3-column creator pain points        |
| `src/components/HowItWorksSection.tsx`      | Create | 3-step flow visualization           |
| `src/components/DifferentiatorsSection.tsx` | Create | 4 patented differentiators          |
| `src/components/MoreFeatures.tsx`           | Modify | Expand 4→6 items, enrich copy       |
| `src/components/pages/HomePage.tsx`         | Modify | Wire new sections into page         |

---

### Task 1: Update English locale with all new and revised content

**Files:**

- Modify: `public/locales/en/landing.json`

This task adds all new keys and updates existing copy. Every subsequent task depends on these keys existing.

- [ ] **Step 1: Update `public/locales/en/landing.json`**

Replace the entire file with this content:

```json
{
  "seo": {
    "title": "Dimensions — Record Portrait & Landscape Video Simultaneously | Free iOS Camera",
    "description": "Dimensions is a free iOS camera app that records both portrait (9:16) and landscape (16:9) video from a single take. Post to TikTok, Instagram, and YouTube without recording twice.",
    "keywords": "dual orientation camera, portrait landscape video, record both orientations, TikTok YouTube camera, free video app, influencer camera app, dual recording iOS, content creator camera"
  },
  "tagline": "One Take. Every Dimension.",
  "appIntro": "Stop recording twice. Dimensions is the free iOS camera that captures portrait and landscape video simultaneously — perfectly framed for TikTok, YouTube, and Instagram from a single take.",
  "downloadCta": "Download Free on the App Store",
  "learnMore": "Learn More",

  "problem": {
    "title": "The Multi-Platform Dilemma",
    "recordTwice": {
      "title": "Record Everything Twice",
      "description": "You nail the perfect take for YouTube, then set up again for TikTok. Different framing, different energy — and double the work for every single video."
    },
    "cropAndHope": {
      "title": "Crop and Hope",
      "description": "Or you record once and crop in post. Half your frame disappears, text gets cut off, and your carefully composed shot falls apart."
    },
    "wasteHours": {
      "title": "Waste Hours Every Week",
      "description": "Multiply this across every video you publish. Hours lost to duplicate shoots, re-edits, and reformatting — just to stay multi-platform."
    },
    "resolution": "Dimensions fixes this."
  },

  "howItWorks": {
    "title": "How It Works",
    "frameShot": {
      "title": "Frame Your Shot",
      "description": "The cross-shaped viewfinder shows your portrait and landscape crops live. Compose both frames before you hit record."
    },
    "recordOnce": {
      "title": "Record Once",
      "description": "Slide to record. Face following keeps you centered, auto-leveling keeps the horizon straight. Just focus on your content."
    },
    "getBothVideos": {
      "title": "Get Both Videos",
      "description": "Both portrait and landscape versions export to your Photos automatically. Upload to any platform instantly."
    }
  },

  "features": {
    "title": "Why Influencers Choose Dimensions",
    "dualRecording": {
      "title": "Dual Orientation Recording",
      "subtitle": "Shoot once, post everywhere",
      "description": "Record a single video and instantly get both 9:16 portrait and 16:9 landscape — ready for TikTok, YouTube, and Instagram without re-shooting or cropping.",
      "heroTitle": "Record Once. Post Everywhere.",
      "heroSubtitle": "One take gives you portrait and landscape — ready for every platform.",
      "problem": "Every content creator knows the pain. You nail the perfect take for YouTube, then realize you need a vertical version for TikTok and Reels. So you set up again, re-do your lighting, try to match the energy — and it never feels the same. Or worse, you crop the landscape video into portrait and lose half the frame. Multiply this across every video you publish, and you are burning hours every week just to stay multi-platform.",
      "solution": "Dimensions eliminates the double-take problem entirely. It captures your video in a square format and simultaneously crops it into both 9:16 portrait and 16:9 landscape orientations in real time. When you stop recording, both versions are already done — perfectly framed, perfectly synced, and ready to upload. One take is all you need.",
      "howItWorks": "Dimensions uses your iPhone's camera sensor to capture a square frame that fully contains both a 9:16 portrait crop and a 16:9 landscape crop. As you record, the app renders both orientations simultaneously using hardware-accelerated video processing. The result is two separate, high-quality video files exported to your Photos library the moment you finish recording.",
      "benefits": [
        "Save hours every week by eliminating duplicate recording sessions",
        "Get perfectly framed portrait and landscape videos from every single take",
        "Post to TikTok, Instagram Reels, YouTube, and Stories from one shoot",
        "Never lose a spontaneous moment because you were recording in the wrong orientation"
      ],
      "useCases": {
        "title": "Perfect For",
        "youtube": "Export polished 16:9 landscape videos directly to YouTube. Full widescreen framing with no letterboxing or awkward crops.",
        "tiktok": "Get scroll-stopping 9:16 vertical video for TikTok and Instagram Reels — from the same take you shot for YouTube.",
        "instagram": "Cover every Instagram format: Reels, Stories, and feed posts. One recording session, every aspect ratio handled."
      }
    },
    "livePreview": {
      "title": "Live Preview",
      "subtitle": "See both frames before you record",
      "description": "The cross-shaped viewfinder overlays your portrait and landscape crops in real time. What you see is exactly what you get — no guessing, no surprises in post.",
      "heroTitle": "Frame Both. Miss Nothing.",
      "heroSubtitle": "The cross-shaped viewfinder shows both crops live — compose with confidence.",
      "problem": "When you record in one orientation, you have no idea how the other crop will turn out. Will your subject get cut off in portrait? Will important details fall outside the landscape frame? You only find out in post — and by then, the moment is gone. Guessing and hoping is not a workflow.",
      "solution": "Dimensions shows you exactly what both your portrait and landscape videos will look like while you are still filming. The unique cross-shaped preview displays both crops overlaid in real time, so you can adjust your framing, position your subject, and compose the shot with complete confidence before you press record.",
      "howItWorks": "The live viewfinder renders a cross-shaped overlay that simultaneously displays the 9:16 portrait and 16:9 landscape crop regions on top of the full square capture area. As you move the camera, pinch to zoom, or reposition, both crop previews update instantly. What you see on screen is exactly what will be exported.",
      "benefits": [
        "Frame both orientations with total confidence before and during recording",
        "Pinch-to-zoom to fine-tune your composition in real time",
        "Eliminate post-production surprises from unexpected cropping",
        "Compose once — no trial and error, no reshoots"
      ]
    },
    "autoLeveling": {
      "title": "Auto Leveling",
      "subtitle": "Steady horizon, no gimbal required",
      "description": "Your iPhone's gyroscope keeps the horizon perfectly level frame by frame — while you walk, vlog, or film handheld. Professional stability without extra gear.",
      "heroTitle": "Walk. Run. Stay Level.",
      "heroSubtitle": "Per-frame gyroscope correction keeps every frame straight — no gimbal required.",
      "problem": "Tilted horizons make even great content look amateur. Handheld footage almost always drifts off-level, especially when you are walking, talking, or filming on the move. Gimbals help, but they are expensive, bulky, and one more thing to charge and carry. Software stabilization in post can fix tilt but often introduces warping or crops your frame even further.",
      "solution": "Dimensions uses your iPhone's built-in gyroscope to detect tilt and automatically correct it in real time. Your video stays perfectly level no matter how you hold your phone — walking down the street, climbing stairs, or filming from an awkward angle. It works instantly with zero setup and zero extra gear.",
      "howItWorks": "The app continuously reads your device's gyroscope sensor to measure rotational tilt. It applies a real-time counter-rotation to the video frame, keeping the horizon locked and level throughout your entire recording. This correction happens at the hardware level before export, so both your portrait and landscape videos come out perfectly straight.",
      "benefits": [
        "Perfectly level video without carrying a gimbal",
        "Works in real time — no fixing crooked footage in post",
        "Film confidently while walking, moving, or vlogging on the go",
        "Professional-looking results straight from your iPhone"
      ]
    },
    "faceFollowing": {
      "title": "Face Following",
      "subtitle": "Move freely, stay perfectly framed",
      "description": "Three-axis face tracking follows you horizontally, vertically, and adjusts zoom — with intelligent pose-aware framing that adds natural headroom where you look.",
      "heroTitle": "Move Freely. Stay Framed.",
      "heroSubtitle": "Three-axis tracking with pose-aware framing keeps you centered no matter how you move.",
      "problem": "Set your phone down to record a talking-head video and you are locked into one position. Lean to grab something, step to the side, or move closer to the camera and you drift out of frame — especially in the tighter portrait crop. You end up re-recording or spending time manually keyframing in your editor. For creators who film solo, staying in frame is a constant battle.",
      "solution": "Dimensions tracks your face in real time across three axes — horizontal, vertical, and zoom — and smoothly adjusts the crop to keep you perfectly centered in both portrait and landscape outputs. Move freely, gesture naturally, and let the app handle your framing. It even adds extra headroom in the direction you turn, so your video looks intentionally composed rather than robotically tracked.",
      "howItWorks": "The app uses real-time face detection to locate your face in every frame. It tracks three axes simultaneously: X (horizontal) keeps you centered as you move side to side, Y (vertical) follows you as you stand, sit, or change height, and Z (zoom) adjusts the crop tighter or wider based on your distance from the camera. All adjustments are applied smoothly to avoid jarring motion.",
      "axes": {
        "title": "Three Axes of Control",
        "x": "Horizontal tracking follows you left and right, keeping your face centered as you move side to side or shift your position during a take.",
        "y": "Vertical tracking adjusts as you stand up, sit down, or change height — your face stays anchored in the frame without manual repositioning.",
        "z": "Zoom tracking moves the crop tighter when you step back and wider when you step forward, maintaining consistent framing at any distance."
      },
      "intelligent": "Dimensions goes beyond simple center-lock tracking. Its intelligent following system reads your head pose and adds compositional headroom in the direction you are looking. Turn to the left and the frame shifts to give you natural breathing room on the left side. This creates the kind of purposeful, balanced framing that usually requires a camera operator — automatically, in real time, on both orientations.",
      "benefits": [
        "Stay perfectly framed without a camera operator or tripod adjustments",
        "Move freely during solo recordings — walk, gesture, lean without losing frame",
        "Intelligent pose-aware framing adds natural headroom in the direction you look",
        "Smooth tracking on all three axes keeps video looking professional, not robotic"
      ]
    }
  },

  "differentiators": {
    "title": "Built Different",
    "subtitle": "Features you won't find in any other camera app.",
    "crossViewfinder": {
      "title": "Cross-Shaped Viewfinder",
      "description": "A unique overlay shows both your portrait and landscape crops simultaneously — not a toggle, not a split screen. You see exactly how both videos will look in a single glance."
    },
    "poseAware": {
      "title": "Pose-Aware Framing",
      "description": "Goes beyond center-lock tracking. Dimensions reads your head direction and adds cinematic breathing room where you're looking — the kind of composed framing that usually requires a camera operator."
    },
    "perFrameLeveling": {
      "title": "Per-Frame Leveling",
      "description": "Not just stabilization — true per-frame horizon correction using your device's gyroscope. Each frame is individually straightened, so your video stays level even through quick movements."
    },
    "qualityFirst": {
      "title": "Quality-First Processing",
      "description": "Records raw, unfiltered video to preserve full dynamic range. Your chosen camera look is applied during export in a single pass — no stacked filters degrading your footage."
    }
  },

  "moreFeatures": {
    "title": "And So Much More",
    "cameraLooks": {
      "title": "16 Camera Looks",
      "description": "From Film Grain to Teal & Orange, Bleach Bypass to Noir — pick your cinematic style and see it live before you record."
    },
    "dualExport": {
      "title": "Instant Dual Export",
      "description": "Both portrait and landscape videos save to your Photos the moment you stop recording. No rendering queue, no waiting."
    },
    "exposure": {
      "title": "Precision Exposure Dial",
      "description": "Fine-tune brightness with a rotary exposure dial. Intuitive, precise, and always within reach."
    },
    "recording": {
      "title": "Slide to Record",
      "description": "Drag the slider to start recording, tap for instant photos — even mid-video. One control for everything."
    },
    "tapToFocus": {
      "title": "Tap to Focus",
      "description": "Tap anywhere to set focus and exposure. A visual indicator confirms the lock so you know exactly where the camera is looking."
    },
    "cameraFlip": {
      "title": "Front & Back Camera",
      "description": "Switch between front and back cameras with a smooth flip animation. Face following works on both."
    }
  },

  "free": {
    "title": "Completely Free",
    "description": "Every feature. Every camera look. Every export. Free. A small watermark appears on exports, removable with a single one-time purchase — no subscriptions, no feature gates.",
    "watermarkNote": "Tiny watermark on free exports",
    "removeWatermark": "One-time purchase to remove"
  },

  "featurePage": {
    "backToHome": "Back to Home",
    "screenshotPlaceholder": "Screenshot coming soon",
    "videoPlaceholder": "Demo video coming soon",
    "otherFeatures": "Explore More Features"
  },

  "seoPages": {
    "dualRecording": {
      "title": "Dual Orientation Recording - Dimensions Camera",
      "description": "Record once, get both portrait (9:16) and landscape (16:9) videos. Perfect for posting to TikTok and YouTube from a single take.",
      "keywords": "dual orientation recording, portrait landscape video, record both orientations, TikTok YouTube camera"
    },
    "livePreview": {
      "title": "Live Preview Both Orientations - Dimensions Camera",
      "description": "See exactly what your portrait and landscape crops look like in real-time. Never miss the perfect frame.",
      "keywords": "live camera preview, dual preview, portrait landscape preview, video framing"
    },
    "autoLeveling": {
      "title": "Auto Leveling Video Stabilization - Dimensions Camera",
      "description": "Keep your video perfectly level while walking or moving. Built-in gyroscope stabilization, no gimbal needed.",
      "keywords": "auto level video, video stabilization, gyroscope camera, no gimbal stabilization"
    },
    "faceFollowing": {
      "title": "Face Following Camera - Dimensions Camera",
      "description": "Intelligent face tracking keeps you perfectly framed in both portrait and landscape. X, Y, and Z axis following.",
      "keywords": "face tracking camera, face following video, auto frame face, influencer camera"
    }
  },

  "footer": {
    "features": "Features",
    "contact": "Contact",
    "copyright": "All rights reserved."
  }
}
```

- [ ] **Step 2: Verify JSON is valid**

Run: `cd /Users/johnhuang/projects/dimensions_web && node -e "JSON.parse(require('fs').readFileSync('public/locales/en/landing.json','utf8')); console.log('Valid JSON')"`

Expected: `Valid JSON`

- [ ] **Step 3: Commit**

```bash
git add public/locales/en/landing.json
git commit -m "content: update English locale with new sections and enriched copy

Add problem, howItWorks, differentiators sections. Expand moreFeatures
from 4 to 6. Update hero intro, feature subtitles/descriptions, and
free section copy."
```

---

### Task 2: Create ProblemSection component

**Files:**

- Create: `src/components/ProblemSection.tsx`

- [ ] **Step 1: Create `src/components/ProblemSection.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import { ClockIcon, ScissorsIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const problems = [
  {
    icon: ClockIcon,
    titleKey: 'problem.recordTwice.title',
    descriptionKey: 'problem.recordTwice.description',
  },
  {
    icon: ScissorsIcon,
    titleKey: 'problem.cropAndHope.title',
    descriptionKey: 'problem.cropAndHope.description',
  },
  {
    icon: ArrowPathIcon,
    titleKey: 'problem.wasteHours.title',
    descriptionKey: 'problem.wasteHours.description',
  },
];

export default function ProblemSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('problem.title')}</h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full" />
        </div>

        {/* 3-column grid */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {problems.map(item => (
            <div key={item.titleKey} className="glass rounded-2xl p-8 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 text-white/40 mx-auto mb-5">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{t(item.titleKey)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t(item.descriptionKey)}</p>
            </div>
          ))}
        </div>

        {/* Resolution */}
        <p className="text-center text-xl font-semibold gradient-text">{t('problem.resolution')}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProblemSection.tsx
git commit -m "feat: add ProblemSection component

Three-column layout showing creator pain points (record twice, crop and
hope, waste hours) with a resolution line."
```

---

### Task 3: Create HowItWorksSection component

**Files:**

- Create: `src/components/HowItWorksSection.tsx`

- [ ] **Step 1: Create `src/components/HowItWorksSection.tsx`**

```tsx
import { useTranslation } from 'react-i18next';

const steps = [
  {
    number: 1,
    titleKey: 'howItWorks.frameShot.title',
    descriptionKey: 'howItWorks.frameShot.description',
  },
  {
    number: 2,
    titleKey: 'howItWorks.recordOnce.title',
    descriptionKey: 'howItWorks.recordOnce.description',
  },
  {
    number: 3,
    titleKey: 'howItWorks.getBothVideos.title',
    descriptionKey: 'howItWorks.getBothVideos.description',
  },
];

export default function HowItWorksSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('howItWorks.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        {/* Steps */}
        <div className="relative grid sm:grid-cols-3 gap-10">
          {/* Connecting line (desktop only) */}
          <div className="hidden sm:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-white/10" />

          {steps.map(step => (
            <div key={step.number} className="text-center relative">
              {/* Numbered circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white text-xl font-bold">{step.number}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{t(step.titleKey)}</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                {t(step.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HowItWorksSection.tsx
git commit -m "feat: add HowItWorksSection component

Three-step horizontal flow (Frame, Record, Export) with numbered circles
and connecting line."
```

---

### Task 4: Create DifferentiatorsSection component

**Files:**

- Create: `src/components/DifferentiatorsSection.tsx`

- [ ] **Step 1: Create `src/components/DifferentiatorsSection.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import {
  ViewfinderCircleIcon,
  UserIcon,
  ArrowsPointingOutIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const differentiators = [
  {
    icon: ViewfinderCircleIcon,
    titleKey: 'differentiators.crossViewfinder.title',
    descriptionKey: 'differentiators.crossViewfinder.description',
  },
  {
    icon: UserIcon,
    titleKey: 'differentiators.poseAware.title',
    descriptionKey: 'differentiators.poseAware.description',
  },
  {
    icon: ArrowsPointingOutIcon,
    titleKey: 'differentiators.perFrameLeveling.title',
    descriptionKey: 'differentiators.perFrameLeveling.description',
  },
  {
    icon: SparklesIcon,
    titleKey: 'differentiators.qualityFirst.title',
    descriptionKey: 'differentiators.qualityFirst.description',
  },
];

export default function DifferentiatorsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('differentiators.title')}
          </h2>
          <p className="text-white/50 text-lg">{t('differentiators.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-column grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {differentiators.map(item => (
            <div
              key={item.titleKey}
              className="flex gap-5 p-6 rounded-xl bg-dark-card/50 border border-dark-border/30"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[#5A4898]/20 text-[#5A4898]">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(item.titleKey)}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t(item.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DifferentiatorsSection.tsx
git commit -m "feat: add DifferentiatorsSection component

2x2 grid highlighting patented differentiators: cross viewfinder,
pose-aware framing, per-frame leveling, quality-first processing."
```

---

### Task 5: Update MoreFeatures to 6 items

**Files:**

- Modify: `src/components/MoreFeatures.tsx`

- [ ] **Step 1: Edit `src/components/MoreFeatures.tsx`**

Replace the imports to add two new icons:

```tsx
import { useTranslation } from 'react-i18next';
import {
  SparklesIcon,
  DocumentDuplicateIcon,
  SunIcon,
  PlayCircleIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
```

Replace the `moreFeatureItems` array with:

```tsx
const moreFeatureItems = [
  {
    icon: SparklesIcon,
    titleKey: 'moreFeatures.cameraLooks.title',
    descriptionKey: 'moreFeatures.cameraLooks.description',
  },
  {
    icon: DocumentDuplicateIcon,
    titleKey: 'moreFeatures.dualExport.title',
    descriptionKey: 'moreFeatures.dualExport.description',
  },
  {
    icon: SunIcon,
    titleKey: 'moreFeatures.exposure.title',
    descriptionKey: 'moreFeatures.exposure.description',
  },
  {
    icon: PlayCircleIcon,
    titleKey: 'moreFeatures.recording.title',
    descriptionKey: 'moreFeatures.recording.description',
  },
  {
    icon: CursorArrowRaysIcon,
    titleKey: 'moreFeatures.tapToFocus.title',
    descriptionKey: 'moreFeatures.tapToFocus.description',
  },
  {
    icon: ArrowPathIcon,
    titleKey: 'moreFeatures.cameraFlip.title',
    descriptionKey: 'moreFeatures.cameraFlip.description',
  },
];
```

No other changes needed — the grid already uses `sm:grid-cols-2` which will produce 3 rows of 2.

- [ ] **Step 2: Commit**

```bash
git add src/components/MoreFeatures.tsx
git commit -m "feat: expand MoreFeatures from 4 to 6 items

Add Tap to Focus and Front & Back Camera. Enriched descriptions
handled via updated locale keys."
```

---

### Task 6: Wire new sections into HomePage

**Files:**

- Modify: `src/components/pages/HomePage.tsx`

- [ ] **Step 1: Edit `src/components/pages/HomePage.tsx`**

Replace the entire file with:

```tsx
import SEO from '../SEO';
import Hero from '../Hero';
import ProblemSection from '../ProblemSection';
import HowItWorksSection from '../HowItWorksSection';
import FeatureGrid from '../FeatureGrid';
import DifferentiatorsSection from '../DifferentiatorsSection';
import MoreFeatures from '../MoreFeatures';
import FreeSection from '../FreeSection';
import DownloadCTA from '../DownloadCTA';

export default function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <FeatureGrid />
      <DifferentiatorsSection />
      <MoreFeatures />
      <FreeSection />
      <section className="py-20 text-center">
        <DownloadCTA size="lg" />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `cd /Users/johnhuang/projects/dimensions_web && bun run build`

Expected: Build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/HomePage.tsx
git commit -m "feat: wire new sections into HomePage

Page flow: Hero → Problem → How It Works → Features → Differentiators →
More Features → Free → CTA"
```

---

### Task 7: Visual verification

- [ ] **Step 1: Start dev server and verify**

Run: `cd /Users/johnhuang/projects/dimensions_web && bun run dev`

Open `http://localhost:4000/en` in browser. Verify:

- Hero shows updated intro copy
- Problem section renders 3 columns with icons
- How It Works shows 3 numbered steps with connecting line
- Feature Grid shows updated subtitles/descriptions
- Differentiators section shows 2x2 grid
- More Features shows 6 items (3 rows of 2)
- Free section shows "Completely Free" title
- All text renders (no missing translation keys)

- [ ] **Step 2: Check responsive layout**

Resize browser to mobile width (~375px). Verify:

- Problem section stacks to single column
- How It Works steps stack vertically
- Differentiators stack to single column
- All sections remain readable

- [ ] **Step 3: Run lint**

Run: `cd /Users/johnhuang/projects/dimensions_web && bun run lint`

Expected: No errors.
