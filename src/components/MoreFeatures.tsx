import { useTranslation } from 'react-i18next';
import {
  SparklesIcon,
  DocumentDuplicateIcon,
  SunIcon,
  PlayCircleIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

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

export default function MoreFeatures() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('moreFeatures.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        {/* 2-column grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {moreFeatureItems.map(item => (
            <div
              key={item.titleKey}
              className="flex gap-4 p-6 rounded-xl bg-dark-card/50 border border-dark-border/30"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[#5A4898]/20 text-[#5A4898]">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t(item.titleKey)}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t(item.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
