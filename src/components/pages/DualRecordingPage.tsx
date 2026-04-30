import { useTranslation } from 'react-i18next';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import FeaturePageLayout from '../FeaturePageLayout';

export default function DualRecordingPage() {
  const { t } = useTranslation();

  return (
    <FeaturePageLayout featureKey="dualRecording" seoKey="dualRecording" icon={<VideoCameraIcon className="w-10 h-10" />}>
      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            {t('features.dualRecording.useCases.title')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#9654;&#65039;</div>
              <h3 className="text-white font-semibold mb-2">YouTube</h3>
              <p className="text-white/60 text-sm">{t('features.dualRecording.useCases.youtube')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#9834;</div>
              <h3 className="text-white font-semibold mb-2">TikTok</h3>
              <p className="text-white/60 text-sm">{t('features.dualRecording.useCases.tiktok')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">&#128247;</div>
              <h3 className="text-white font-semibold mb-2">Instagram</h3>
              <p className="text-white/60 text-sm">{t('features.dualRecording.useCases.instagram')}</p>
            </div>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
}
