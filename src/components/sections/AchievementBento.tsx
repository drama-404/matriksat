'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';
import type { AchievementsContent, SharedContent } from '@/types/content';

import achievementsEN from '@/content/en/achievements.json';
import achievementsAL from '@/content/al/achievements.json';
import sharedContent from '@/content/shared.json';

interface AchievementBentoProps {
  locale: Locale;
}

// Deterministic positions for tech tags to avoid hydration mismatch
const tagPositions = [
  { top: '8%', left: '5%' },
  { top: '5%', left: '55%' },
  { top: '15%', right: '8%' },
  { top: '30%', left: '2%' },
  { top: '35%', right: '3%' },
  { top: '50%', left: '8%' },
  { top: '48%', right: '10%' },
  { top: '62%', left: '3%' },
  { top: '65%', right: '5%' },
  { top: '75%', left: '10%' },
  { top: '78%', right: '8%' },
  { top: '25%', left: '30%' },
  { top: '70%', left: '35%' },
  { top: '42%', left: '25%' },
  { top: '55%', right: '25%' },
];

export function AchievementBento({ locale }: AchievementBentoProps) {
  const content = (locale === 'en' ? achievementsEN : achievementsAL) as AchievementsContent;
  const shared = sharedContent as SharedContent;

  return (
    <section id="our-achievement" className="section-container" aria-labelledby="achievement-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="achievement-heading"
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[rgb(0,0,0)]"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.heading}
        </h2>
        <p
          className="mt-3 text-base font-normal max-w-[600px] mx-auto"
          style={{ color: 'rgba(0, 0, 0, 0.6)' }}
        >
          {content.subheading}
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1: Projects Delivered */}
        <motion.div
          className={cn(
            'bg-white rounded-[var(--radius-card)] p-6 card-shadow',
            'flex flex-col'
          )}
          variants={fadeInUp}
        >
          {/* Image Collage Area */}
          <div className="bg-[rgb(245,245,245)] rounded-[22px] h-[262px] flex items-center justify-center relative overflow-hidden">
            {/* Placeholder project thumbnails at slight angles */}
            <div className="absolute w-[120px] h-[90px] bg-white rounded-[13px] card-shadow -rotate-3 top-8 left-8" />
            <div className="absolute w-[120px] h-[90px] bg-white rounded-[13px] card-shadow rotate-2 top-12 left-24" />
            <div className="absolute w-[120px] h-[90px] bg-white rounded-[13px] card-shadow -rotate-1 bottom-8 right-8" />
            <div className="absolute w-[100px] h-[75px] bg-[rgb(52,145,255)] opacity-10 rounded-[13px] rotate-3 bottom-12 left-16" />
          </div>

          <p
            className="mt-4 text-2xl font-bold text-[rgb(0,0,0)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[0].metric}
          </p>
          <p className="text-sm font-normal" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            {content.cards[0].subtitle}
          </p>
        </motion.div>

        {/* Card 2: Tech Cloud + Experience */}
        <motion.div
          className={cn(
            'bg-white rounded-[var(--radius-card)] p-6 card-shadow',
            'flex flex-col relative overflow-hidden'
          )}
          variants={fadeInUp}
        >
          {/* Giant Background Number */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[280px] sm:text-[340px] font-bold select-none pointer-events-none"
            style={{
              color: 'rgba(0, 0, 0, 0.06)',
              fontFamily: 'var(--font-euclid), var(--font-inter), sans-serif',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {content.cards[1].backgroundNumber}
          </span>

          {/* Floating Tech Tags */}
          <div className="relative h-[262px]">
            {shared.techCloud.map((tag, index) => (
              <span
                key={tag}
                className={cn(
                  'absolute text-[11px] font-medium text-[rgb(0,0,0)]',
                  'bg-[rgb(245,245,245)] border border-[rgba(0,0,0,0.1)]',
                  'rounded-2xl px-3 py-1.5 whitespace-nowrap',
                  'float-animation'
                )}
                style={{
                  ...tagPositions[index],
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="mt-4 text-2xl font-bold text-[rgb(0,0,0)] relative z-10"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[1].metric}
          </p>
          <p className="text-sm font-normal relative z-10" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            {content.cards[1].subtitle}
          </p>
        </motion.div>

        {/* Card 3: Impact (Full Width) */}
        <motion.div
          className={cn(
            'md:col-span-2',
            'bg-white rounded-[var(--radius-card)] p-6 card-shadow',
            'flex flex-col'
          )}
          variants={fadeInUp}
        >
          <p
            className="text-lg font-bold text-[rgb(0,0,0)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[2].header}
          </p>

          <p
            className="mt-4 text-[32px] font-bold text-[rgb(0,0,0)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[2].metric}
          </p>
          <p className="text-sm font-normal" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            {content.cards[2].subtitle}
          </p>

          {/* Simple SVG Bar Chart Placeholder */}
          <div className="mt-6 flex items-end gap-2 h-[80px]" aria-hidden="true">
            {[35, 55, 42, 68, 50, 78, 62, 85, 72, 92, 80, 95].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-[4px] transition-all"
                style={{
                  height: `${height}%`,
                  backgroundColor: index >= 9 ? 'rgb(52, 145, 255)' : 'rgba(52, 145, 255, 0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
