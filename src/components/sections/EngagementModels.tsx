'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/lib/contact';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/i18n/routing';
import type { PricingContent, EngagementModel } from '@/types/content';

import pricingEN from '@/content/en/pricing.json';
import pricingAL from '@/content/al/pricing.json';

interface EngagementModelsProps {
  locale: Locale;
}

const modelIconMap: Record<string, React.FC> = {
  compass: CompassIcon,
  rocket: RocketIcon,
  headset: HeadsetIcon,
};

export function EngagementModels({ locale }: EngagementModelsProps) {
  const content: PricingContent = locale === 'en' ? pricingEN : pricingAL;
  const [activeModel, setActiveModel] = useState(1); // 1-indexed, default to "Build & Ship" (highlighted)

  // Start on the highlighted model (index 1 = "Build & Ship")
  const highlightedIndex = content.models.findIndex((m) => m.highlighted);
  const defaultIndex = highlightedIndex >= 0 ? highlightedIndex : 0;

  return (
    <section id="pricing" className="section-container" aria-labelledby="pricing-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="pricing-heading"
          className="text-[26px] sm:text-[33px] font-bold tracking-[-1.32px] leading-[1.2] text-[var(--color-dark)]"
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

      {/* ─── MOBILE: Stepper with 1 > 2 > 3 navigation ─── */}
      <div className="lg:hidden max-w-[500px] mx-auto">
        <MobileModelStepper
          models={content.models}
          activeIndex={activeModel}
          onSelect={setActiveModel}
          defaultIndex={defaultIndex}
        />
      </div>

      {/* ─── DESKTOP: 3-column grid ─── */}
      <motion.div
        className="hidden lg:grid grid-cols-3 gap-6 max-w-[1100px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {content.models.map((model) => (
          <PricingCard key={model.id} model={model} />
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Mobile Model Stepper ─── */

interface MobileModelStepperProps {
  models: EngagementModel[];
  activeIndex: number;
  onSelect: (index: number) => void;
  defaultIndex: number;
}

function MobileModelStepper({ models, activeIndex, onSelect, defaultIndex }: MobileModelStepperProps) {
  // Initialize to highlighted model
  const [current, setCurrent] = useState(defaultIndex);

  const handleSelect = (index: number) => {
    setCurrent(index);
    onSelect(index);
  };

  const total = models.length;

  return (
    <div>
      {/* Step selector: numbered tabs with connector lines */}
      <div className="flex items-center justify-center gap-0 mb-6">
        {models.map((model, index) => {
          const isActive = current === index;
          const Icon = modelIconMap[model.icon] ?? CompassIcon;

          return (
            <div key={model.id} className="flex items-center">
              {/* Connector line before (except first) */}
              {index > 0 && (
                <div
                  className={cn(
                    'w-8 sm:w-12 h-[2px] transition-colors duration-300',
                    current >= index ? 'bg-[var(--color-accent)]' : 'bg-[rgba(0,0,0,0.1)]'
                  )}
                />
              )}

              {/* Step button */}
              <button
                onClick={() => handleSelect(index)}
                className={cn(
                  'relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 flex-shrink-0',
                  isActive
                    ? 'bg-[var(--color-dark)] text-white scale-110 shadow-lg'
                    : current > index
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-background)] text-[var(--color-muted)] border-2 border-[rgba(0,0,0,0.08)]'
                )}
                aria-label={`View ${model.name}`}
              >
                <span className="text-sm font-bold">{index + 1}</span>
                {/* Badge indicator for highlighted model */}
                {model.badge && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-white" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Active model card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={models[current].id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <PricingCard model={models[current]} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleSelect(current > 0 ? current - 1 : total - 1)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white card-shadow text-sm font-medium text-[var(--color-dark)] active:scale-[0.98] transition-transform"
          aria-label="Previous model"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Previous
        </button>
        <button
          onClick={() => handleSelect(current < total - 1 ? current + 1 : 0)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-accent)] text-sm font-medium text-white active:scale-[0.98] transition-transform"
          aria-label="Next model"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Pricing Card ─── */

function PricingCard({ model }: { model: EngagementModel }) {
  const Icon = modelIconMap[model.icon] ?? CompassIcon;
  const isDark = model.highlighted;

  return (
    <motion.article
      className={cn(
        'rounded-[var(--radius-card-lg)] p-2 card-shadow',
        isDark ? 'bg-[var(--color-dark)]' : 'bg-white'
      )}
      variants={fadeInUp}
      whileHover={{ scale: isDark ? 1.03 : 1.01, transition: { duration: 0.2 } }}
    >
      <div
        className={cn(
          'rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col h-full',
          isDark ? 'bg-[var(--color-dark)]' : 'bg-white'
        )}
      >
        {/* Badge */}
        {model.badge && (
          <span className="self-start text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-[var(--color-accent)] text-white mb-4">
            {model.badge}
          </span>
        )}

        {/* Icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
            isDark ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[var(--color-background)]'
          )}
          aria-hidden="true"
        >
          <Icon />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-[28px] font-bold mb-3',
            isDark ? 'text-white' : 'text-[var(--color-dark)]'
          )}
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {model.name}
        </h3>

        {/* Description Bar */}
        <div
          className={cn(
            'rounded-xl p-3 mb-6',
            isDark ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[var(--color-background)]'
          )}
        >
          <p
            className="text-[13px] font-normal"
            style={{ color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}
          >
            {model.description}
          </p>
        </div>

        {/* Feature List */}
        <ul className="flex-1 space-y-2 mb-6">
          {model.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke={isDark ? 'var(--color-accent)' : 'var(--color-success)'}
                  strokeWidth="1.5"
                />
                <polyline
                  points="5 8 7 10 11 6"
                  stroke={isDark ? 'var(--color-accent)' : 'var(--color-success)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-sm font-normal"
                style={{ color: isDark ? 'white' : 'rgb(0, 0, 0)' }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Pricing - hidden (prices removed during rebrand) */}
        {model.pricing && (
          <div className="mb-6">
            <span
              className={cn(
                'text-[29px] font-semibold',
                isDark ? 'text-white' : 'text-[var(--color-dark)]'
              )}
            >
              {model.pricing}
            </span>
            <span
              className="text-lg font-normal ml-2"
              style={{ color: isDark ? 'rgba(255, 255, 255, 0.54)' : 'rgba(0, 0, 0, 0.54)' }}
            >
              {model.pricingPeriod}
            </span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            variant={isDark ? 'secondary' : 'primary'}
            href={CONTACT.calendly}
          >
            {model.ctaPrimary}
          </Button>
          <Button
            variant="outline"
            href={CONTACT.whatsapp}
            className={isDark ? 'border-white text-white hover:bg-white hover:text-[var(--color-dark)]' : ''}
          >
            {model.ctaSecondary}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Inline SVG Icons ─── */

function CompassIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--color-accent)]">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--color-accent)]">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--color-accent)]">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}
