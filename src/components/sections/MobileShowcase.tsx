'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';
import type { MobileShowcaseContent } from '@/types/content';

import showcaseEN from '@/content/en/mobileShowcase.json';
import showcaseAL from '@/content/al/mobileShowcase.json';

interface MobileShowcaseProps {
  locale: Locale;
}

// Decorative screen content colors per mockup
// Decorative screen accent colors - warm palette with terracotta
const screenAccents = [
  'var(--color-accent)',          // booking - terracotta
  'var(--color-success)',         // dashboard - sage
  'rgb(168, 112, 100)',           // chat - muted rose
  'rgb(196, 158, 78)',            // ecommerce - warm gold
];

export function MobileShowcase({ locale }: MobileShowcaseProps) {
  const content: MobileShowcaseContent = locale === 'en' ? showcaseEN : showcaseAL;

  return (
    <section className="section-container overflow-hidden" aria-labelledby="mobile-heading">
      {/* Heading */}
      <motion.h2
        id="mobile-heading"
        className="text-[24px] font-bold text-center mb-12 text-[var(--color-dark)]"
        style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {content.heading}
      </motion.h2>

      {/* Phone Mockups */}
      <motion.div
        className="flex justify-center items-center gap-6 flex-wrap"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content.mockups.map((mockup, index) => (
          <motion.div
            key={mockup.id}
            className="relative"
            variants={fadeInUp}
            style={{ transform: `rotate(${mockup.rotation}deg)` }}
          >
            {/* Phone Frame */}
            <div className="w-[160px] h-[300px] sm:w-[180px] sm:h-[340px] rounded-[28px] bg-[var(--color-dark)] p-[6px] card-shadow">
              {/* Screen */}
              <div className="w-full h-full rounded-[22px] bg-white overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[var(--color-dark)] rounded-b-xl z-10" />

                {/* Decorative screen content */}
                <div className="pt-8 px-3 space-y-2">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-8 h-1.5 rounded-full bg-[rgb(230,230,230)]" />
                    <div className="w-12 h-1.5 rounded-full bg-[rgb(230,230,230)]" />
                  </div>

                  {/* Title bar */}
                  <div
                    className="h-5 rounded-md w-3/4"
                    style={{ backgroundColor: screenAccents[index], opacity: 0.15 }}
                  />

                  {/* Content blocks */}
                  <div className="space-y-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-md"
                        style={{
                          height: i === 0 ? '40px' : '20px',
                          backgroundColor: i === 0 ? screenAccents[index] : 'rgb(245,245,245)',
                          opacity: i === 0 ? 0.2 : 1,
                          width: i === 3 ? '60%' : '100%',
                        }}
                      />
                    ))}
                  </div>

                  {/* Action button */}
                  <div
                    className="h-8 rounded-full mt-3 flex items-center justify-center"
                    style={{ backgroundColor: screenAccents[index], opacity: 0.25 }}
                  >
                    <div className="w-12 h-1.5 rounded-full bg-white opacity-60" />
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around pt-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-md"
                        style={{
                          backgroundColor: i === 0 ? screenAccents[index] : 'rgb(230,230,230)',
                          opacity: i === 0 ? 0.3 : 0.5,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Label */}
            <p
              className="text-center mt-3 text-xs font-medium"
              style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            >
              {mockup.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
