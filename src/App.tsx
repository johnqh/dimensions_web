import { Suspense, useMemo } from 'react';
import { Routes, Route, Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONSTANTS } from './config/constants';
import {
  SudobilityApp,
  AppTopBar,
  AppBreadcrumbs,
  AppFooterForHomePage,
} from '@sudobility/building_blocks';
import { LayoutProvider, ThemeProvider, Theme, FontSize } from '@sudobility/components';
import { initializeNetworkService } from '@sudobility/di';
import { supportedLanguages, languageNames, type SupportedLanguage } from './i18n';
import i18n from './i18n';
import HomePage from './components/pages/HomePage';
import DualRecordingPage from './components/pages/DualRecordingPage';
import LivePreviewPage from './components/pages/LivePreviewPage';
import AutoLevelingPage from './components/pages/AutoLevelingPage';
import FaceFollowingPage from './components/pages/FaceFollowingPage';
import { PageConfigProvider } from './context/PageConfigProvider';

// Initialize network service before app renders
initializeNetworkService();

// Language display names and flags for AppTopBar
const LANGUAGE_INFO: Record<string, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  zh: { name: '简体中文', flag: '🇨🇳' },
  'zh-hant': { name: '繁體中文', flag: '🇹🇼' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇧🇷' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  sv: { name: 'Svenska', flag: '🇸🇪' },
  th: { name: 'ไทย', flag: '🇹🇭' },
  uk: { name: 'Українська', flag: '🇺🇦' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
};

// Route-to-breadcrumb label mapping
const ROUTE_LABELS: Record<string, string> = {
  'dual-recording': 'features.dualRecording.title',
  'live-preview': 'features.livePreview.title',
  'auto-leveling': 'features.autoLeveling.title',
  'face-following': 'features.faceFollowing.title',
};

// Link wrapper for building_blocks components
const LinkWrapper = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link to={href} className={className}>
    {children}
  </Link>
);

// Dark theme provider
const DarkThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    themeStorageKey="dimensions-theme"
    fontSizeStorageKey="dimensions-font-size"
    defaultTheme={Theme.DARK}
    defaultFontSize={FontSize.MEDIUM}
  >
    {children}
  </ThemeProvider>
);

// Loading fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-theme-bg-primary flex items-center justify-center">
      <div className="animate-pulse text-theme-text-tertiary">Loading...</div>
    </div>
  );
}

/**
 * Route-level layout providing PageConfigProvider and the page shell
 * (topbar, breadcrumbs, content area, footer).
 */
function ScreenContainerLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n: i18nInstance, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang as SupportedLanguage)) {
      if (i18nInstance.language !== lang) {
        i18nInstance.changeLanguage(lang);
      }
    } else if (lang) {
      navigate('/en', { replace: true });
    }
  }, [lang, i18nInstance, navigate]);

  const currentLang = (lang || i18nInstance.language || 'en') as SupportedLanguage;

  const languages = useMemo(
    () =>
      supportedLanguages.map(code => ({
        code,
        name: LANGUAGE_INFO[code]?.name || languageNames[code] || code,
        flag: LANGUAGE_INFO[code]?.flag || '🌐',
      })),
    []
  );

  const handleLanguageChange = (newLang: string) => {
    if (supportedLanguages.includes(newLang as SupportedLanguage)) {
      i18nInstance.changeLanguage(newLang);
      // Preserve the current sub-path when switching languages
      const pathParts = location.pathname.split('/').filter(Boolean);
      const subPath = pathParts.length > 1 ? `/${pathParts.slice(1).join('/')}` : '';
      navigate(`/${newLang}${subPath}`);
    }
  };

  // Build breadcrumb items based on current route
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: t('breadcrumb.home'), href: `/${currentLang}`, current: false }];
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      const subPath = pathParts[1];
      const labelKey = ROUTE_LABELS[subPath];
      if (labelKey) {
        items[0].current = false;
        items.push({ label: t(labelKey), href: location.pathname, current: true });
      } else {
        items[0].current = true;
      }
    } else {
      items[0].current = true;
    }
    return items;
  }, [currentLang, location.pathname, t]);

  const footerLinkSections = [
    {
      title: t('footer.features'),
      links: [
        { label: t('features.dualRecording.title'), href: `/${currentLang}/dual-recording` },
        { label: t('features.livePreview.title'), href: `/${currentLang}/live-preview` },
        { label: t('features.autoLeveling.title'), href: `/${currentLang}/auto-leveling` },
        { label: t('features.faceFollowing.title'), href: `/${currentLang}/face-following` },
      ],
    },
    {
      title: t('footer.contact'),
      links: [{ label: CONSTANTS.SUPPORT_EMAIL, href: `mailto:${CONSTANTS.SUPPORT_EMAIL}` }],
    },
  ];

  return (
    <PageConfigProvider>
      <LayoutProvider mode="standard">
        <div className="min-h-screen flex flex-col bg-theme-bg-primary">
          {/* Sticky header: topbar + breadcrumbs */}
          <div className="sticky top-0 z-40">
            <AppTopBar
              logo={{
                src: '/logo.svg',
                appName: CONSTANTS.APP_NAME,
                onClick: () => navigate(`/${currentLang}`),
              }}
              menuItems={[]}
              languages={languages}
              currentLanguage={currentLang}
              onLanguageChange={handleLanguageChange}
              LinkComponent={LinkWrapper}
            />
            <AppBreadcrumbs
              items={breadcrumbItems}
              shareConfig={{
                title: `${CONSTANTS.APP_NAME} - ${t('tagline')}`,
                description: t('appIntro'),
                hashtags: [
                  'Dimensions',
                  'DualRecording',
                  'Camera',
                  'Influencer',
                  'TikTok',
                  'YouTube',
                ],
              }}
            />
          </div>

          {/* Main content */}
          <main id="main-content" className="flex-1 bg-dark-bg">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </main>

          {/* Footer */}
          <AppFooterForHomePage
            logo={{ appName: CONSTANTS.APP_NAME }}
            linkSections={footerLinkSections}
            copyrightYear={String(new Date().getFullYear())}
            companyName={CONSTANTS.COMPANY_NAME}
            description={t('appIntro')}
            isNetworkOnline={true}
            LinkComponent={LinkWrapper}
          />
        </div>
      </LayoutProvider>
    </PageConfigProvider>
  );
}

function AppRoutes() {
  const { i18n: i18nInstance } = useTranslation();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/:lang" element={<ScreenContainerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dual-recording" element={<DualRecordingPage />} />
          <Route path="live-preview" element={<LivePreviewPage />} />
          <Route path="auto-leveling" element={<AutoLevelingPage />} />
          <Route path="face-following" element={<FaceFollowingPage />} />
        </Route>
        <Route path="/" element={<Navigate to={`/${i18nInstance.language || 'en'}`} replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <SudobilityApp i18n={i18n} storageKeyPrefix="dimensions" ThemeProvider={DarkThemeProvider}>
      <AppRoutes />
    </SudobilityApp>
  );
}

export default App;
