import { useTranslation } from 'react-i18next';
import DownloadCTA from './DownloadCTA';

export default function FreeSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative gradient line */}
        <div className="w-32 h-1 bg-gradient-accent mx-auto mb-12 rounded-full" />

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t('free.title')}</h2>

        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{t('free.description')}</p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-dark-card border border-dark-border/50 text-white/70 text-sm">
            {t('free.watermarkNote')}
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#5A4898]/20 border border-[#5A4898]/30 text-[#5A4898] text-sm font-medium">
            {t('free.removeWatermark')}
          </span>
        </div>

        <DownloadCTA size="lg" />
      </div>
    </section>
  );
}
