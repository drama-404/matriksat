'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { TextMorph } from '@/components/ui/TextMorph';
import { PixelTerminal } from '@/components/ui/PixelTerminal';
import { heroSequence } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';

import heroEN from '@/content/en/hero.json';
import heroAL from '@/content/al/hero.json';
import type { HeroContent } from '@/types/content';

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const content: HeroContent = locale === 'en' ? heroEN : heroAL;

  return (
    <section
      className={cn(
        'relative min-h-[100svh] lg:min-h-[735px] flex flex-col items-center justify-center',
        'pt-[83px] overflow-hidden' // Offset for fixed navbar
      )}
    >
      {/* Data Flow Background Pattern with Vignette Mask */}
      <div
        className="absolute inset-0 data-flow-pattern pointer-events-none"
        style={{
          WebkitMaskImage:
            'radial-gradient(65% 55% at 50% 46%, black 50%, transparent 100%)',
          maskImage:
            'radial-gradient(65% 55% at 50% 46%, black 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* 50/50 Split Content Container */}
      <div className="section-container flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 z-10 w-full">
        {/* Left Column: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            className="flex items-center gap-2 mb-6"
            variants={heroSequence.badge}
            initial="hidden"
            animate="visible"
          >
            {/* Pulsing Status Dot (warm green) */}
            <span className="relative flex items-center justify-center">
              <span
                className="absolute w-2 h-2 rounded-full bg-[var(--color-status-outer)] status-pulse"
                aria-hidden="true"
              />
              <span className="w-1 h-1 rounded-full bg-[var(--color-status-inner)]" />
            </span>
            <span
              className={cn(
                'text-sm font-medium text-[var(--color-dark)]',
                'tracking-[-0.42px]'
              )}
            >
              {content.statusBadge}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className={cn('max-w-[600px]', 'text-[var(--color-dark)]')}
            style={{
              fontFamily: 'var(--font-phudu)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: 'var(--font-hero-letter-spacing)',
            }}
            variants={heroSequence.heading}
            initial="hidden"
            animate="visible"
          >
            {content.mainHeading}
            <br />
            <TextMorph words={content.rotatingWords} interval={3500} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={cn(
              'mt-5 text-lg text-[var(--color-dark)]',
              'leading-relaxed tracking-[-0.4px]',
              'max-w-[480px]'
            )}
            variants={heroSequence.subtitle}
            initial="hidden"
            animate="visible"
          >
            {content.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-8 w-full sm:w-auto"
            variants={heroSequence.cta}
            initial="hidden"
            animate="visible"
          >
            <Button href="#how-it-works" variant="primary" subText="Let's Go" className="w-full sm:w-auto">
              {content.ctaPrimary}
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Pixel Terminal */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end w-full max-w-[460px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <PixelTerminal className="w-full" />
        </motion.div>
      </div>

    </section>
  );
}
