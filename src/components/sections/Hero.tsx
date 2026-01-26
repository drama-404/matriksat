'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { AnimatedText } from '@/components/ui/AnimatedText';
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
        'relative min-h-[735px] flex flex-col items-center justify-center',
        'pt-[83px]' // Offset for fixed navbar
      )}
    >
      {/* Graph-Paper Grid Background with Vignette Mask */}
      <div
        className="absolute inset-0 grid-pattern pointer-events-none"
        style={{
          WebkitMaskImage:
            'radial-gradient(65% 55% at 50% 46%, black 50%, transparent 100%)',
          maskImage:
            'radial-gradient(65% 55% at 50% 46%, black 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="section-container flex flex-col items-center text-center z-10">
        {/* Status Badge */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          variants={heroSequence.badge}
          initial="hidden"
          animate="visible"
        >
          {/* Pulsing Green Dot */}
          <span className="relative flex items-center justify-center">
            <span
              className="absolute w-2 h-2 rounded-full bg-[rgb(65,193,107)] status-pulse"
              aria-hidden="true"
            />
            <span className="w-1 h-1 rounded-full bg-[rgb(75,191,113)]" />
          </span>
          <span
            className={cn(
              'text-sm font-medium text-[rgb(0,0,0)]',
              'tracking-[-0.42px]'
            )}
          >
            {content.statusBadge}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className={cn(
            'max-w-[900px]',
            'text-[rgb(0,0,0)]'
          )}
          style={{
            fontFamily: 'var(--font-phudu)',
            fontSize: 'var(--font-hero)',
            fontWeight: 800,
            lineHeight: 'var(--font-hero-line-height)',
            letterSpacing: 'var(--font-hero-letter-spacing)',
          }}
          variants={heroSequence.heading}
          initial="hidden"
          animate="visible"
        >
          {content.mainHeading}
          <br />
          <AnimatedText words={content.rotatingWords} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={cn(
            'mt-6 text-xl text-[rgb(0,0,0)]',
            'leading-[26px] tracking-[-0.6px]',
            'max-w-[600px]'
          )}
          variants={heroSequence.subtitle}
          initial="hidden"
          animate="visible"
        >
          {content.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          variants={heroSequence.cta}
          initial="hidden"
          animate="visible"
        >
          <Button href="#pricing" variant="primary" subText="Let's Go">
            {content.ctaPrimary}
          </Button>
          <Button href="#portfolio" variant="outline">
            {content.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Dashed Line Divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] border-dashed-custom border-t-2"
        aria-hidden="true"
      />
    </section>
  );
}
