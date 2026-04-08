'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/lib/contact';
import { fadeIn } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';
import type { QuoteContent } from '@/types/content';

import quoteEN from '@/content/en/quote.json';
import quoteAL from '@/content/al/quote.json';

interface QuoteSectionProps {
  locale: Locale;
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.1,
      ease: easeOut,
    },
  }),
};

export function QuoteSection({ locale }: QuoteSectionProps) {
  const content: QuoteContent = locale === 'en' ? quoteEN : quoteAL;
  const words = content.text.split(' ');

  return (
    <section className="section-container" aria-label="Quote">
      <div className="flex flex-col items-center py-8 max-w-[600px] mx-auto">
        {/* Avatar */}
        <motion.div
          className={cn(
            'w-14 h-14 rounded-full mb-4 overflow-hidden',
            'bg-[var(--color-background)] flex items-center justify-center'
          )}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </motion.div>

        {/* Quote Text - Word by Word */}
        <motion.blockquote
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p
            className="text-lg font-normal leading-[26px] tracking-[-0.54px]"
            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                custom={index}
                variants={wordAnimation}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.blockquote>

        {/* Attribution */}
        <motion.p
          className="mt-2 text-base font-normal text-center"
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          - {content.attribution}
        </motion.p>

        {/* CTA Badge */}
        <motion.a
          href={CONTACT.calendly}
          className={cn(
            'mt-6 inline-block',
            'bg-[var(--color-dark)] text-white text-xs font-normal',
            'rounded-[25px] px-3 py-2.5',
            'hover:scale-105 transition-transform',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
          )}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {content.ctaBadge}
        </motion.a>
      </div>
    </section>
  );
}
