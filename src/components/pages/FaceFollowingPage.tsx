import { useTranslation } from 'react-i18next';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import FeaturePageLayout from '../FeaturePageLayout';

export default function FaceFollowingPage() {
  const { t } = useTranslation();

  return (
    <FeaturePageLayout
      featureKey="faceFollowing"
      seoKey="faceFollowing"
      icon={<FaceSmileIcon className="w-10 h-10" />}
    >
      {/* Three Axes Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            {t('features.faceFollowing.axes.title')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#5A4898]/20 mx-auto mb-4">
                <span className="text-2xl font-bold text-[#5A4898]">X</span>
              </div>
              <p className="text-white/70 text-sm">{t('features.faceFollowing.axes.x')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-cyan/20 mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-cyan">Y</span>
              </div>
              <p className="text-white/70 text-sm">{t('features.faceFollowing.axes.y')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-pink/20 mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-pink">Z</span>
              </div>
              <p className="text-white/70 text-sm">{t('features.faceFollowing.axes.z')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Following Section */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {t('features.faceFollowing.title')}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {t('features.faceFollowing.intelligent')}
          </p>
        </div>
      </section>
    </FeaturePageLayout>
  );
}
