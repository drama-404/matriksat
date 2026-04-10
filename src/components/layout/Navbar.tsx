'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/lib/contact';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from './LanguageToggle';
import { navbarVariants } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';

interface NavbarProps {
  locale: Locale;
}

const navLinks = [
  { href: '#how-it-works', key: 'howItWorks' },
  { href: '#services', key: 'services' },
  { href: '#faqs', key: 'faqs' },
  { href: '#contact', key: 'contact' },
] as const;

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const scrollDirection = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'h-[83px]',
          'bg-[var(--color-navbar-bg)] backdrop-blur-[5px]',
          'navbar-shadow'
        )}
        variants={navbarVariants}
        initial="visible"
        animate={scrollDirection === 'down' && !isMobileMenuOpen ? 'hidden' : 'visible'}
      >
        <nav
          className="flex items-center justify-between h-full mx-auto px-4 sm:px-8"
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
              href={CONTACT.calendly}
              variant="primary"
              className="hidden sm:inline-flex"
            >
              {t('bookCall')}
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[var(--color-dark)] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8 pt-[83px]">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className={cn(
                    'text-2xl font-semibold',
                    'text-[var(--color-dark)]',
                    'tracking-[-0.48px]'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={closeMobileMenu}
                >
                  {t(link.key)}
                </motion.a>
              ))}

              {/* Language toggle in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <LanguageToggle locale={locale} />
              </motion.div>

              {/* CTA in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Button
                  href={CONTACT.calendly}
                  variant="primary"
                  className="w-[280px]"
                >
                  {t('bookCall')}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
