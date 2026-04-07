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
    en: 'Denada | Full-Stack Developer & AI Engineer — Tirana',
    al: 'Denada | Zhvilluese Full-Stack & Inxhiniere AI — Tiranë',
  };

  const descriptions = {
    en: 'I build AI-powered web applications, chatbots, and custom tools. Based in Tirana, Albania. From idea to production in weeks.',
    al: 'Ndërtoj aplikacione web me AI, chatbot, dhe mjete të personalizuara. Me bazë në Tiranë, Shqipëri. Nga ideja në prodhim brenda javësh.',
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
