'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/i18n/routing';
import type { BenefitsContent, BenefitItem } from '@/types/content';

import benefitsEN from '@/content/en/benefits.json';
import benefitsAL from '@/content/al/benefits.json';

interface BenefitsGridProps {
  locale: Locale;
}

export function BenefitsGrid({ locale }: BenefitsGridProps) {
  const content: BenefitsContent = locale === 'en' ? benefitsEN : benefitsAL;
  const ctaLabel = locale === 'en' ? 'View Plans and Pricing' : 'Shiko Planet dhe Çmimet';
  const ctaSub = locale === 'en' ? "Let's Go" : 'Nisemi';

  return (
    <section className="section-container" aria-labelledby="benefits-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="benefits-heading"
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[var(--color-dark)]"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.heading}
        </h2>
        <p
          className="mt-3 text-base font-normal max-w-[700px] mx-auto"
          style={{ color: 'rgba(0, 0, 0, 0.6)' }}
        >
          {content.subheading}
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {content.items.map((benefit) => (
          <FlipCard key={benefit.id} benefit={benefit} />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex justify-center mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Button href="#pricing" variant="primary" subText={ctaSub}>
          {ctaLabel}
        </Button>
      </motion.div>
    </section>
  );
}

// FlipCard component with 3D flip effect
function FlipCard({ benefit }: { benefit: BenefitItem }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[benefit.icon] ?? ChartIcon;

  return (
    <motion.div
      className="relative h-[220px] perspective-1000"
      style={{ perspective: '1000px' }}
      variants={fadeInUp}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="article"
      aria-label={benefit.title}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front Face */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-white rounded-[var(--radius-card)] p-6 card-shadow',
            'flex flex-col items-center justify-center text-center gap-4'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="w-16 h-16 rounded-2xl bg-[var(--color-background)] flex items-center justify-center"
            aria-hidden="true"
          >
            <Icon />
          </div>
          <h3
            className="text-xl font-semibold text-[var(--color-dark)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {benefit.title}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            {benefit.frontText}
          </p>
        </div>

        {/* Back Face */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-[var(--color-dark)] rounded-[var(--radius-card)] p-6',
            'flex flex-col justify-center'
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3
            className="text-lg font-semibold text-white mb-3"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {benefit.title}
          </h3>
          <p className="text-sm font-normal leading-relaxed text-white/80">
            {benefit.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Icon Components with Framer Animations ─── */

const iconMap: Record<string, React.FC> = {
  chart: ChartIcon,
  lightning: LightningIcon,
  dollar: DollarIcon,
  checklist: ChecklistIcon,
  compass: CompassIcon,
  calendar: CalendarIcon,
};

// Chart Icon - bars animate up
function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.line
        x1="18" y1="20" x2="18" y2="10"
        initial={{ y2: 20 }}
        animate={{ y2: [20, 10, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.line
        x1="12" y1="20" x2="12" y2="4"
        initial={{ y2: 20 }}
        animate={{ y2: [20, 4, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.line
        x1="6" y1="20" x2="6" y2="14"
        initial={{ y2: 20 }}
        animate={{ y2: [20, 14, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    </svg>
  );
}

// Lightning Icon - pulse glow
function LightningIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-[var(--color-accent)]"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </motion.svg>
  );
}

// Dollar Icon - subtle bounce
function DollarIcon() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-[var(--color-accent)]"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </motion.svg>
  );
}

// Checklist Icon - checkmarks appear one by one
function ChecklistIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <motion.path
        d="M9 12l2 2 4-4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="9" y1="17" x2="15" y2="17" strokeOpacity="0.4" />
      <line x1="9" y1="7" x2="15" y2="7" strokeOpacity="0.4" />
    </svg>
  );
}

// Compass Icon - needle rotates
function CompassIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <motion.polygon
        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        fill="currentColor"
        fillOpacity="0.2"
        style={{ transformOrigin: '12px 12px' }}
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// Calendar Icon - date number blinks
function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <motion.text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="7"
        fill="currentColor"
        fontWeight="600"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        15
      </motion.text>
    </svg>
  );
}
