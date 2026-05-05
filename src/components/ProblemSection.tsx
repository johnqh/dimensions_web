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
        <div className="mt-6 flex justify-center">
          <svg
            className="w-5 h-5 text-white/30 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
