'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/lib/contact';
import { TerminalLabel } from '@/components/ui/TerminalLabel';
import type { Locale } from '@/i18n/routing';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[var(--color-dark)] text-white">
      {/* Main Footer Content */}
      <div className="section-container py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-6 group">
              <span className="relative">
                <span
                  className="text-lg font-semibold tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-euclid)' }}
                >
                  denada
                </span>
                {/* Terracotta underline accent */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-[2px] w-0',
                    'bg-[var(--color-accent)]',
                    'group-hover:w-full transition-all duration-300 ease-out'
                  )}
                />
              </span>
            </Link>
            <p className="text-white/70 max-w-sm mb-6">
              {t('description')}
            </p>
            <TerminalLabel className="text-white/40">
              {locale === 'en' ? 'building...' : 'duke ndërtuar...'}
            </TerminalLabel>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {[
                { href: '#services', labelKey: 'linkServices' as const },
                { href: '#how-it-works', labelKey: 'linkProcess' as const },
                { href: '#contact', labelKey: 'linkContact' as const },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors inline-block py-1"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">
              {t('contactHeading')}
            </h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{t('location')}</li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {t('copyright')}
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="/privacy"
              className="text-white/50 hover:text-white transition-colors"
            >
              {t('privacy')}
            </a>
            <a
              href="/terms"
              className="text-white/50 hover:text-white transition-colors"
            >
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
