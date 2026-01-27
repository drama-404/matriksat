import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturesStrip } from '@/components/sections/FeaturesStrip';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { BrandMarquee } from '@/components/sections/BrandMarquee';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { AchievementBento } from '@/components/sections/AchievementBento';
import { BenefitsGrid } from '@/components/sections/BenefitsGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
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
      <main>
        <Hero locale={locale as Locale} />
        <FeaturesStrip />
        <TestimonialsCarousel locale={locale as Locale} />
        <BrandMarquee />
        <QuoteSection locale={locale as Locale} />
        <AchievementBento locale={locale as Locale} />
        <BenefitsGrid locale={locale as Locale} />
        <HowItWorks locale={locale as Locale} />
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}
