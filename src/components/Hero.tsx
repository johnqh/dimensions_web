import { useTranslation } from 'react-i18next';
import { GradientBackground } from './graphics/GradientBlob';
import DownloadCTA from './DownloadCTA';
import PhoneMockup from './PhoneMockup';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">{t('tagline')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-10">
              {t('appIntro')}
            </p>

            <DownloadCTA size="lg" />
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup variant="screenshot" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg
          className="w-6 h-6 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
