import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  VideoCameraIcon,
  ViewfinderCircleIcon,
  ArrowsPointingOutIcon,
  FaceSmileIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import SEOHead from './SEOHead';
import { buildHowToSchema } from './buildHowToSchema';
import DownloadCTA from './DownloadCTA';
import PhoneMockup from './PhoneMockup';
import { GradientBackground } from './graphics/GradientBlob';

interface FeaturePageLayoutProps {
  featureKey: string;
  seoKey: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const allFeatures = [
  {
    key: 'dualRecording',
    path: 'dual-recording',
    icon: VideoCameraIcon,
    titleKey: 'features.dualRecording.title',
  },
  {
    key: 'livePreview',
    path: 'live-preview',
    icon: ViewfinderCircleIcon,
    titleKey: 'features.livePreview.title',
  },
  {
    key: 'autoLeveling',
    path: 'auto-leveling',
    icon: ArrowsPointingOutIcon,
    titleKey: 'features.autoLeveling.title',
  },
  {
    key: 'faceFollowing',
    path: 'face-following',
    icon: FaceSmileIcon,
    titleKey: 'features.faceFollowing.title',
  },
];

export default function FeaturePageLayout({
  featureKey,
  seoKey,
  icon,
  children,
}: FeaturePageLayoutProps) {
  const { t } = useTranslation();
  const { t: tHowTo } = useTranslation('howto');
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  const benefits = t(`features.${featureKey}.benefits`, { returnObjects: true }) as string[];
  const otherFeatures = allFeatures.filter(f => f.key !== featureKey);

  const seoTitle = t(`seoPages.${seoKey}.title`);
  const seoDescription = t(`seoPages.${seoKey}.description`);
  const seoKeywords = t(`seoPages.${seoKey}.keywords`, { returnObjects: true }) as string[];

  const howToSchema = buildHowToSchema(
    tHowTo(`${seoKey}.name`),
    tHowTo(`${seoKey}.description`),
    tHowTo(`${seoKey}.steps`, { returnObjects: true }) as { name: string; text: string }[]
  );

  return (
    <article>
      {/* SEO */}
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={howToSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <GradientBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#5A4898]/20 text-[#5A4898] mb-6 mx-auto lg:mx-0">
                {icon}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">{t(`features.${featureKey}.heroTitle`)}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0">
                {t(`features.${featureKey}.heroSubtitle`)}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup variant="screenshot" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            {t('featurePage.problem')}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed text-center">
            {t(`features.${featureKey}.problem`)}
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <PhoneMockup variant="video" />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{t('featurePage.solution')}</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {t(`features.${featureKey}.solution`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{t('featurePage.howItWorks')}</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {t(`features.${featureKey}.howItWorks`)}
          </p>
        </div>
      </section>

      {/* Feature-specific children */}
      {children}

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{t('featurePage.benefits')}</h2>
          <ul className="space-y-4">
            {Array.isArray(benefits) &&
              benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-accent-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-lg">{benefit}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Explore More Features */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            {t('featurePage.otherFeatures')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherFeatures.map(feature => (
              <Link
                key={feature.key}
                to={`/${currentLang}/${feature.path}`}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#5A4898]/20 text-[#5A4898] mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold group-hover:text-primary-purple transition-colors">
                  {t(feature.titleKey)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 text-center">
        <DownloadCTA size="lg" />
      </section>

      {/* Back to home */}
      <div className="pb-12 text-center">
        <Link
          to={`/${currentLang}`}
          className="text-white/50 hover:text-white/80 transition-colors text-sm"
        >
          &larr; {t('featurePage.backToHome')}
        </Link>
      </div>
    </article>
  );
}
