import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
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
        {/* More sections will be added here */}
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}
