import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  to: string;
}

export default function FeatureCard({
  icon,
  titleKey,
  subtitleKey,
  descriptionKey,
  to,
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group flex flex-col">
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#5A4898]/20 text-[#5A4898] mb-5">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white group-hover:text-primary-purple transition-colors mb-1">
        {t(titleKey)}
      </h3>

      {/* Subtitle */}
      <p className="text-accent-cyan text-sm font-medium mb-3">{t(subtitleKey)}</p>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{t(descriptionKey)}</p>

      {/* Learn More link */}
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-[#5A4898] hover:text-[#7C6BC4] font-medium text-sm transition-colors"
      >
        {t('learnMore')} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
