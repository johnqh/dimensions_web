import { useTranslation } from 'react-i18next';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

interface PhoneMockupProps {
  label?: string;
  className?: string;
  variant?: 'screenshot' | 'video';
}

export default function PhoneMockup({
  label,
  className = '',
  variant = 'screenshot',
}: PhoneMockupProps) {
  const { t } = useTranslation();

  const placeholderText =
    label ||
    (variant === 'video'
      ? t('featurePage.videoPlaceholder')
      : t('featurePage.screenshotPlaceholder'));

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ aspectRatio: '9 / 19.5', maxWidth: '280px' }}
    >
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-gray-700 to-gray-800 p-[3px]">
        <div className="w-full h-full rounded-[2.3rem] bg-dark-bg overflow-hidden flex flex-col items-center justify-center">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-full" />

          {/* Content area */}
          <div className="flex flex-col items-center justify-center gap-3 text-white/30 px-6">
            {variant === 'video' ? (
              <PlayCircleIcon className="w-16 h-16" />
            ) : (
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            )}
            <span className="text-sm text-center">{placeholderText}</span>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
