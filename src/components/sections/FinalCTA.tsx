'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';
import type { FinalCtaContent } from '@/types/content';

import ctaEN from '@/content/en/finalCta.json';
import ctaAL from '@/content/al/finalCta.json';

interface FinalCTAProps {
  locale: Locale;
}

export function FinalCTA({ locale }: FinalCTAProps) {
  const content: FinalCtaContent = locale === 'en' ? ctaEN : ctaAL;

  return (
    <section className="section-container" aria-labelledby="final-cta-heading">
      <motion.div
        className="relative max-w-[1082px] mx-auto rounded-[var(--radius-card-lg)] bg-[var(--color-dark)] px-8 py-16 sm:py-24 overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 grid-pattern pointer-events-none"
          style={{ opacity: 0.03 }}
          aria-hidden="true"
        />

        {/* Radial Gradient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(25% 46% at 39% 88%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
            opacity: 0.04,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Heading */}
          <h2
            id="final-cta-heading"
            className="text-[32px] sm:text-[44px] font-bold text-white leading-[1] max-w-[700px] mb-8"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.heading}
          </h2>

          {/* CTA Button with Glow */}
          <div className="relative mb-4">
            {/* Glow behind button */}
            <div
              className="absolute inset-0 blur-xl pointer-events-none"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, white 0%, transparent 100%)',
                opacity: 0.15,
                transform: 'scale(1.5)',
              }}
              aria-hidden="true"
            />
            <motion.a
              href="#pricing"
              className="relative inline-flex items-center gap-2 bg-white text-[var(--color-dark)] rounded-[72px] px-8 py-5 text-base font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)]"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <SparkleIcon />
              {content.ctaButton}
            </motion.a>
          </div>

          {/* Sub-text badge */}
          <span
            className="inline-block rounded-2xl px-3 py-1.5 text-[11px] font-normal mb-16"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {content.ctaSub}
          </span>

          {/* Trust Section */}
          <div
            className="w-full max-w-[800px] rounded-[var(--radius-sm)] p-6 sm:p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            {/* Trust Text */}
            <p className="text-sm font-medium text-white text-center mb-6">
              {content.trustText}
            </p>

            {/* Tickers Container */}
            <div className="relative overflow-hidden space-y-3">
              {/* Top Ticker - Scrolls Left */}
              <div className="overflow-hidden">
                <div className="ticker-left-animation flex gap-3 whitespace-nowrap">
                  {/* Duplicate for seamless loop */}
                  {[...content.tickerTop, ...content.tickerTop].map((chip, i) => (
                    <span
                      key={`top-${i}`}
                      className="inline-block rounded-[20px] px-4 py-2 text-[13px] font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center "building..." text */}
              <p
                className="text-center text-base font-normal text-white"
                style={{ fontFamily: 'var(--font-chelsea-market), var(--font-cursive), cursive' }}
              >
                {content.buildingText}
                <span className="animate-pulse ml-0.5" aria-hidden="true">|</span>
              </p>

              {/* Bottom Ticker - Scrolls Right */}
              <div className="overflow-hidden">
                <div className="ticker-right-animation flex gap-3 whitespace-nowrap">
                  {/* Duplicate for seamless loop */}
                  {[...content.tickerBottom, ...content.tickerBottom].map((chip, i) => (
                    <span
                      key={`bottom-${i}`}
                      className="inline-block rounded-[20px] px-4 py-2 text-[13px] font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Icon ─── */

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );
}
