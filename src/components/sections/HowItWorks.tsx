'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { useInView } from '@/hooks/useInView';
import type { Locale } from '@/i18n/routing';
import type { HowItWorksContent } from '@/types/content';

import howItWorksEN from '@/content/en/howItWorks.json';
import howItWorksAL from '@/content/al/howItWorks.json';

// Dynamically import Remotion Player (no SSR)
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  { ssr: false }
);

// Dynamically import HowItWorksShowcase composition
const HowItWorksShowcaseComposition = dynamic(
  () => import('@/components/remotion/HowItWorksShowcase').then((mod) => mod.HowItWorksShowcase),
  { ssr: false }
);

interface HowItWorksProps {
  locale: Locale;
}

// Animation duration constants (must match HowItWorksShowcase.tsx)
const STEP_DURATION_FRAMES = 300;
const FPS = 30;
const STEP_DURATION_MS = (STEP_DURATION_FRAMES / FPS) * 1000;
const TOTAL_DURATION_FRAMES = 900;

export function HowItWorks({ locale }: HowItWorksProps) {
  const content: HowItWorksContent = locale === 'en' ? howItWorksEN : howItWorksAL;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      className="section-container relative"
      aria-labelledby="how-it-works-heading"
    >
      {/* Dashed border frame (matching Kree8 style) */}
      <div
        className="absolute inset-4 border border-dashed pointer-events-none rounded-[var(--radius-card)]"
        style={{ borderColor: 'rgba(0, 0, 0, 0.12)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="how-it-works-heading"
          className="text-[36px] md:text-[42px] font-bold tracking-[-1.32px] leading-[1.1] text-[rgb(0,0,0)]"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.heading.split('Projects')[0]}
          <br className="hidden sm:block" />
          <span className="text-[rgb(52,145,255)]">Projects</span> Done
        </h2>
        <p
          className="mt-4 text-base md:text-lg font-normal max-w-[600px] mx-auto"
          style={{ color: 'rgba(0, 0, 0, 0.53)' }}
        >
          {content.subheading}
        </p>
      </motion.div>

      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-[1100px] mx-auto relative z-10">
        {/* Left Column: Animated Showcase with Remotion Player */}
        <motion.div
          className="lg:w-[42%] flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ShowcasePlayer onStepChange={setActiveStep} />
        </motion.div>

        {/* Right Column: Step Cards */}
        <motion.div
          className="lg:w-[58%] flex flex-col gap-5"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {content.steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={activeStep === index + 1}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ShowcasePlayer - Remotion Player wrapper for HowItWorksShowcase
 * Tracks current frame to sync step highlighting
 */
interface ShowcasePlayerProps {
  onStepChange: (step: number) => void;
}

function ShowcasePlayer({ onStepChange }: ShowcasePlayerProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerRef, setPlayerRef] = useState<any>(null);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Track frame changes to sync step highlighting
  useEffect(() => {
    if (!playerRef || !inView) return;

    const intervalId = setInterval(() => {
      try {
        const frame = playerRef.getCurrentFrame();
        if (typeof frame === 'number') {
          const currentStep = frame < 300 ? 1 : frame < 600 ? 2 : 3;
          onStepChange(currentStep);
        }
      } catch {
        // Player might not be ready
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [playerRef, inView, onStepChange]);

  // Control play/pause based on visibility
  useEffect(() => {
    if (!playerRef) return;

    try {
      if (inView) {
        playerRef.play();
      } else {
        playerRef.pause();
      }
    } catch {
      // Player might not be ready
    }
  }, [playerRef, inView]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-[var(--radius-card-lg)] overflow-visible',
        'w-full max-w-[400px]'
      )}
      style={{ aspectRatio: '360/500' }}
      aria-label="Animated demonstration of our 3-step process"
    >
      {/* Remotion Player */}
      {isLoaded && HowItWorksShowcaseComposition && (
        <div className="absolute inset-0">
          <Player
            ref={(ref) => setPlayerRef(ref)}
            component={HowItWorksShowcaseComposition}
            durationInFrames={TOTAL_DURATION_FRAMES}
            fps={FPS}
            compositionWidth={400}
            compositionHeight={520}
            controls={false}
            autoPlay={inView}
            loop
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Static Fallback (shown while loading) */}
      {!isLoaded && <StaticShowcaseFallback />}
    </div>
  );
}

/**
 * StepCard - Individual step card with active state styling
 */
interface StepCardProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  isActive: boolean;
  index: number;
}

function StepCard({ step, isActive, index }: StepCardProps) {
  // Step-specific icons
  const icons = [
    // Step 1: Calendar
    <svg key="cal" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>,
    // Step 2: Code/Build
    <svg key="code" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>,
    // Step 3: Rocket/Launch
    <svg key="rocket" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>,
  ];

  return (
    <motion.article
      className={cn(
        'relative rounded-[var(--radius-card)] p-6 md:p-8 transition-all duration-300',
        'flex flex-row gap-5 items-start',
        isActive
          ? 'bg-[rgb(22,22,22)] text-white shadow-xl'
          : 'bg-white card-shadow'
      )}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Step Number/Icon Badge */}
      <div
        className={cn(
          'flex-shrink-0 w-14 h-14 rounded-2xl',
          'flex items-center justify-center transition-all duration-300',
          isActive
            ? 'bg-[rgb(52,145,255)] text-white'
            : 'bg-[rgb(245,245,245)] border-2 border-[rgba(0,0,0,0.08)] text-[rgb(52,145,255)]'
        )}
      >
        {isActive ? (
          icons[index]
        ) : (
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {step.number}
          </span>
        )}
      </div>

      <div className="flex-1">
        {/* Step Label */}
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-wider',
            isActive ? 'text-[rgb(52,145,255)]' : 'text-[rgba(0,0,0,0.4)]'
          )}
        >
          Step {step.number}
        </span>

        {/* Title */}
        <h3
          className={cn(
            'text-xl md:text-2xl font-bold mt-1',
            isActive ? 'text-white' : 'text-[rgb(0,0,0)]'
          )}
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'mt-2 text-sm md:text-base font-normal leading-relaxed',
            isActive ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.53)]'
          )}
        >
          {step.description}
        </p>

        {/* Progress indicator when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-[rgb(52,145,255)] animate-pulse" />
              <span className="text-xs font-medium text-[rgba(255,255,255,0.5)]">
                Currently showing
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active indicator line */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[rgb(52,145,255)] rounded-r-full"
          layoutId="activeIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.article>
  );
}

/**
 * Static fallback shown while Remotion player loads
 */
function StaticShowcaseFallback() {
  return (
    <div
      className={cn(
        'bg-[rgb(30,30,30)] rounded-[var(--radius-card-lg)] overflow-hidden',
        'p-6 h-full flex flex-col items-center justify-center'
      )}
    >
      {/* Loading spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 2L19 12L12 13L9 20L5 2Z"
              fill="white"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>
        {/* Animated ring */}
        <div
          className="absolute inset-0 border-2 border-[rgb(52,145,255)] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>

      <p className="text-white text-lg font-semibold text-center">
        Loading demo...
      </p>
      <p className="text-[rgba(255,255,255,0.5)] text-sm mt-2 text-center">
        See how simple it is
      </p>

      {/* Placeholder step indicators */}
      <div className="flex gap-3 mt-8">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              num === 1
                ? 'bg-[rgb(52,145,255)] text-white'
                : 'bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)]'
            )}
          >
            <span className="text-sm font-bold">{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
