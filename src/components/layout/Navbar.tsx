'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { SelectionBox } from '@/components/ui/SelectionBox';
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
        'bg-[rgba(245,245,245,0.91)] backdrop-blur-[5px]',
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
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center"
          aria-label="MATRIKS Home"
        >
          <SelectionBox>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-euclid)' }}
            >
              MATRIKS
            </span>
          </SelectionBox>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={cn(
                  'text-base font-medium',
                  'text-[rgba(0,0,0,0.53)]',
                  'hover:text-[rgb(0,0,0)]',
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
            href="#pricing"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            {t('plansAndPricing')}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
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
