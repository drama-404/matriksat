'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/i18n/routing';
import type { BenefitsContent } from '@/types/content';

import benefitsEN from '@/content/en/benefits.json';
import benefitsAL from '@/content/al/benefits.json';

interface BenefitsGridProps {
  locale: Locale;
}

// Icon components mapped by key from content JSON
const iconMap: Record<string, React.FC> = {
  chart: ChartIcon,
  lightning: LightningIcon,
  dollar: DollarIcon,
  search: SearchIcon,
  screen: ScreenIcon,
  handshake: HandshakeIcon,
};

export function BenefitsGrid({ locale }: BenefitsGridProps) {
  const content: BenefitsContent = locale === 'en' ? benefitsEN : benefitsAL;
  const ctaLabel = locale === 'en' ? 'View Plans and Pricing' : 'Shiko Planet dhe Cmimet';
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
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[rgb(0,0,0)]"
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
        {content.items.map((benefit) => {
          const Icon = iconMap[benefit.icon] ?? ChartIcon;
          return (
            <motion.article
              key={benefit.id}
              className={cn(
                'bg-white rounded-[var(--radius-card)] p-8 card-shadow',
                'flex flex-col gap-4'
              )}
              variants={fadeInUp}
            >
              <div
                className="w-12 h-12 rounded-2xl bg-[rgb(245,245,245)] flex items-center justify-center"
                aria-hidden="true"
              >
                <Icon />
              </div>
              <h3
                className="text-xl font-semibold text-[rgb(0,0,0)]"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {benefit.title}
              </h3>
              <p
                className="text-sm font-normal leading-[21px]"
                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
              >
                {benefit.description}
              </p>
            </motion.article>
          );
        })}
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

/* ─── Inline SVG Icons ─── */

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
