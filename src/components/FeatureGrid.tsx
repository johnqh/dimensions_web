import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  VideoCameraIcon,
  ViewfinderCircleIcon,
  ArrowsPointingOutIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import FeatureCard from './FeatureCard';

export default function FeatureGrid() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || 'en';

  const features = [
    {
      icon: <VideoCameraIcon className="w-8 h-8" />,
      titleKey: 'features.dualRecording.title',
      subtitleKey: 'features.dualRecording.subtitle',
      descriptionKey: 'features.dualRecording.description',
      to: `/${currentLang}/dual-recording`,
    },
    {
      icon: <ViewfinderCircleIcon className="w-8 h-8" />,
      titleKey: 'features.livePreview.title',
      subtitleKey: 'features.livePreview.subtitle',
      descriptionKey: 'features.livePreview.description',
      to: `/${currentLang}/live-preview`,
    },
    {
      icon: <ArrowsPointingOutIcon className="w-8 h-8" />,
      titleKey: 'features.autoLeveling.title',
      subtitleKey: 'features.autoLeveling.subtitle',
      descriptionKey: 'features.autoLeveling.description',
      to: `/${currentLang}/auto-leveling`,
    },
    {
      icon: <FaceSmileIcon className="w-8 h-8" />,
      titleKey: 'features.faceFollowing.title',
      subtitleKey: 'features.faceFollowing.subtitle',
      descriptionKey: 'features.faceFollowing.description',
      to: `/${currentLang}/face-following`,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('features.title')}</h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(feature => (
            <FeatureCard key={feature.titleKey} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
