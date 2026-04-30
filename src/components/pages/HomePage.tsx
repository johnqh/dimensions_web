import { useTranslation } from 'react-i18next';
import SEOHead from '../SEOHead';
import { buildHowToSchema } from '../buildHowToSchema';
import Hero from '../Hero';
import ProblemSection from '../ProblemSection';
import HowItWorksSection from '../HowItWorksSection';
import FeatureGrid from '../FeatureGrid';
import DifferentiatorsSection from '../DifferentiatorsSection';
import MoreFeatures from '../MoreFeatures';
import FreeSection from '../FreeSection';
import DownloadCTA from '../DownloadCTA';

export default function HomePage() {
  const { t } = useTranslation();
  const { t: tHowTo } = useTranslation('howto');

  const seoTitle = t('seo.title');
  const seoDescription = t('seo.description');
  const seoKeywords = t('seo.keywords', { returnObjects: true }) as string[];

  const howToSchema = buildHowToSchema(
    tHowTo('home.name'),
    tHowTo('home.description'),
    tHowTo('home.steps', { returnObjects: true }) as { name: string; text: string }[]
  );

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        structuredData={howToSchema}
      />
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <FeatureGrid />
      <DifferentiatorsSection />
      <MoreFeatures />
      <FreeSection />
      <section className="py-20 text-center">
        <DownloadCTA size="lg" />
      </section>
    </>
  );
}
