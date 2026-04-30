import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import FeaturePageLayout from '../FeaturePageLayout';

export default function LivePreviewPage() {
  return (
    <FeaturePageLayout
      featureKey="livePreview"
      seoKey="livePreview"
      icon={<ViewfinderCircleIcon className="w-10 h-10" />}
    />
  );
}
