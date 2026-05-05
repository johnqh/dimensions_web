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
