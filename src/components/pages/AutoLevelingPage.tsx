import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import FeaturePageLayout from '../FeaturePageLayout';

export default function AutoLevelingPage() {
  return (
    <FeaturePageLayout
      featureKey="autoLeveling"
      seoKey="autoLeveling"
      icon={<ArrowsPointingOutIcon className="w-10 h-10" />}
    />
  );
}
