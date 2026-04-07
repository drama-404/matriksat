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

// Deterministic positions for tech tags (optimized for smaller card)
const tagPositions = [
  { top: '6%', left: '5%' },
  { top: '4%', left: '50%' },
  { top: '18%', right: '5%' },
  { top: '32%', left: '3%' },
  { top: '38%', right: '8%' },
  { top: '52%', left: '6%' },
  { top: '55%', right: '4%' },
  { top: '70%', left: '8%' },
  { top: '72%', right: '6%' },
  { top: '85%', left: '15%' },
  { top: '88%', right: '15%' },
  { top: '28%', left: '35%' },
  { top: '65%', left: '30%' },
  { top: '45%', left: '20%' },
  { top: '80%', right: '30%' },
];

// Card hover animation config
const cardHover = {
  y: -12,
  scale: 1.02,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
};

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
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[var(--color-dark)]"
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

      {/* Equal-sized Cards Grid: 1 col mobile, 3 cols desktop */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1: Projects Delivered */}
        <motion.div
          className={cn(
            'bg-white rounded-[var(--radius-card)] p-5 card-shadow',
            'flex flex-col cursor-pointer'
          )}
          variants={fadeInUp}
          whileHover={cardHover}
        >
          {/* Image Collage Area */}
          <div className="bg-[var(--color-background)] rounded-[18px] h-[200px] flex items-center justify-center relative overflow-hidden">
            {/* Placeholder project thumbnails at slight angles */}
            <div className="absolute w-[90px] h-[65px] bg-white rounded-[10px] card-shadow -rotate-3 top-6 left-4" />
            <div className="absolute w-[90px] h-[65px] bg-white rounded-[10px] card-shadow rotate-2 top-10 left-16" />
            <div className="absolute w-[90px] h-[65px] bg-white rounded-[10px] card-shadow -rotate-1 bottom-6 right-4" />
            <div className="absolute w-[70px] h-[50px] bg-[var(--color-accent)] opacity-15 rounded-[10px] rotate-3 bottom-10 left-10" />
          </div>

          <p
            className="mt-4 text-2xl font-bold text-[var(--color-dark)]"
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
            'bg-white rounded-[var(--radius-card)] p-5 card-shadow',
            'flex flex-col relative overflow-hidden cursor-pointer'
          )}
          variants={fadeInUp}
          whileHover={cardHover}
        >
          {/* Giant Background Number */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[180px] sm:text-[200px] font-bold select-none pointer-events-none"
            style={{
              color: 'rgba(0, 0, 0, 0.04)',
              fontFamily: 'var(--font-euclid), var(--font-inter), sans-serif',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {content.cards[1].backgroundNumber}
          </span>

          {/* Floating Tech Tags */}
          <div className="relative h-[200px]">
            {shared.techCloud.slice(0, 12).map((tag, index) => (
              <span
                key={tag}
                className={cn(
                  'absolute text-[10px] font-medium text-[var(--color-dark)]',
                  'bg-[var(--color-background)] border border-[rgba(0,0,0,0.08)]',
                  'rounded-xl px-2.5 py-1 whitespace-nowrap',
                  'float-animation'
                )}
                style={{
                  ...tagPositions[index],
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="mt-4 text-2xl font-bold text-[var(--color-dark)] relative z-10"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[1].metric}
          </p>
          <p className="text-sm font-normal relative z-10" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            {content.cards[1].subtitle}
          </p>
        </motion.div>

        {/* Card 3: Impact */}
        <motion.div
          className={cn(
            'bg-white rounded-[var(--radius-card)] p-5 card-shadow',
            'flex flex-col cursor-pointer'
          )}
          variants={fadeInUp}
          whileHover={cardHover}
        >
          <p
            className="text-sm font-semibold text-[var(--color-dark)] mb-2"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[2].header}
          </p>

          {/* Bar Chart Area - takes same space as other cards' content areas */}
          <div className="bg-[var(--color-background)] rounded-[18px] h-[200px] flex items-end justify-center p-4 gap-1.5">
            {[35, 55, 42, 68, 50, 78, 62, 85, 72, 92, 80, 95].map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 rounded-t-[3px]"
                style={{
                  height: `${height}%`,
                  backgroundColor: index >= 9 ? 'var(--color-accent)' : 'rgba(196, 108, 78, 0.2)',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>

          <p
            className="mt-4 text-2xl font-bold text-[var(--color-dark)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.cards[2].metric}
          </p>
          <p className="text-sm font-normal" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            {content.cards[2].subtitle}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
