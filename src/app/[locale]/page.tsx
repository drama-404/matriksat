import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturesStrip } from '@/components/sections/FeaturesStrip';
// Hidden - will reactivate when real client testimonials exist
// import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
// Hidden for now - will revisit later
// import { BrandMarquee } from '@/components/sections/BrandMarquee';
// import { QuoteSection } from '@/components/sections/QuoteSection';
import { AchievementBento } from '@/components/sections/AchievementBento';
import { BenefitsGrid } from '@/components/sections/BenefitsGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
// Hidden for now - projects integrated into ServicesGrid categories
// import { Portfolio } from '@/components/sections/Portfolio';
// import { WorldClock } from '@/components/sections/WorldClock';
import { EngagementModels } from '@/components/sections/EngagementModels';
// import { MobileShowcase } from '@/components/sections/MobileShowcase';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import type { Locale } from '@/i18n/routing';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale as Locale} />
      <main className="section-dividers">
        <Hero locale={locale as Locale} />
        <FeaturesStrip />
        <AchievementBento locale={locale as Locale} />
        <BenefitsGrid locale={locale as Locale} />
        <HowItWorks locale={locale as Locale} />
        <ServicesGrid locale={locale as Locale} />
        <EngagementModels locale={locale as Locale} />
        <FAQ locale={locale as Locale} />
        <FinalCTA locale={locale as Locale} />
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}
