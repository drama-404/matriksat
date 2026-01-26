import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    en: 'MATRIKS - AI & Full-Stack Development Agency',
    al: 'MATRIKS - Agjenci për Zhvillim AI & Full-Stack',
  };

  const descriptions = {
    en: 'AI that actually works. Custom chatbots, automation, and full-stack development for businesses in Albania and Europe.',
    al: 'AI që funksionon vërtet. Chatbot të personalizuar, automatizim dhe zhvillim full-stack për biznese në Shqipëri dhe Europë.',
  };

  return {
    title: titles[locale as Locale] || titles.en,
    description: descriptions[locale as Locale] || descriptions.en,
    alternates: {
      languages: {
        en: '/en',
        sq: '/al',
      },
    },
    openGraph: {
      title: titles[locale as Locale] || titles.en,
      description: descriptions[locale as Locale] || descriptions.en,
      locale: locale === 'al' ? 'sq_AL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
