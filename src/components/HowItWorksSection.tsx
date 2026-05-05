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
