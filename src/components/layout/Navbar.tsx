'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from './LanguageToggle';
import { navbarVariants } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';

interface NavbarProps {
  locale: Locale;
}

const navLinks = [
  { href: '#services', key: 'services' },
  { href: '#ai-lab', key: 'aiLab' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#contact', key: 'contact' },
] as const;

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const scrollDirection = useScrollDirection();

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'h-[83px]',
        'bg-[var(--color-navbar-bg)] backdrop-blur-[5px]',
        'navbar-shadow'
      )}
      variants={navbarVariants}
      initial="visible"
      animate={scrollDirection === 'down' ? 'hidden' : 'visible'}
    >
      <nav
        className="flex items-center justify-between h-full mx-auto px-8"
        style={{ maxWidth: 1094 }}
      >
        {/* Logo with subtle underline accent */}
        <Link
          href={`/${locale}`}
          className="flex items-center group"
          aria-label="denada Home"
        >
          <span className="relative">
            <span
              className="text-lg font-semibold tracking-tight text-[var(--color-dark)]"
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

        {/* Navigation Links - Hidden on mobile */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={cn(
                  'text-base font-medium',
                  'text-[var(--color-muted)]',
                  'hover:text-[var(--color-dark)]',
                  'transition-colors duration-200',
                  'tracking-[-0.48px]'
                )}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side - CTA + Language Toggle */}
        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale} className="hidden sm:flex" />
          <Button
            href="#contact"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            {t('getStarted')}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--color-dark)]"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
