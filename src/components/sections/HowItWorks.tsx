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

// Animation duration constants - now 4 steps
const STEP_DURATION_FRAMES = 300;
const FPS = 30;
const NUM_STEPS = 4;
const TOTAL_DURATION_FRAMES = STEP_DURATION_FRAMES * NUM_STEPS; // 1200 frames

export function HowItWorks({ locale }: HowItWorksProps) {
  const content: HowItWorksContent = locale === 'en' ? howItWorksEN : howItWorksAL;
  const [activeStep, setActiveStep] = useState(1);
  const [seekToStep, setSeekToStep] = useState<number | null>(null);

  // Handler for clicking on step cards - seek to that step's frame
  const handleStepClick = useCallback((stepNumber: number) => {
    setSeekToStep(stepNumber);
  }, []);

  return (
    <section
      id="how-it-works"
      className="section-container relative"
      aria-labelledby="how-it-works-heading"
    >
      {/* Dashed border frame */}
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
          className="text-[28px] sm:text-[36px] md:text-[42px] font-bold tracking-[-1.32px] leading-[1.1] text-[var(--color-dark)]"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.heading}

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
          <ShowcasePlayer
            onStepChange={setActiveStep}
            seekToStep={seekToStep}
            onSeekComplete={() => setSeekToStep(null)}
          />
        </motion.div>

        {/* Right Column: Step Cards */}
        <motion.div
          className="lg:w-[58%] flex flex-col gap-4"
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
              onClick={() => handleStepClick(index + 1)}
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
 * Restarts from beginning when entering viewport
 * Supports seeking to specific steps on click
 */
interface ShowcasePlayerProps {
  onStepChange: (step: number) => void;
  seekToStep: number | null;
  onSeekComplete: () => void;
}

function ShowcasePlayer({ onStepChange, seekToStep, onSeekComplete }: ShowcasePlayerProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerRef, setPlayerRef] = useState<any>(null);
  const [wasInView, setWasInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // RESTART from beginning when entering viewport
  useEffect(() => {
    if (!playerRef) return;

    try {
      if (inView && !wasInView) {
        // Just entered viewport - seek to beginning and play
        playerRef.seekTo(0);
        playerRef.play();
      } else if (!inView && wasInView) {
        // Just left viewport - pause
        playerRef.pause();
      }
      setWasInView(inView);
    } catch {
      // Player might not be ready
    }
  }, [playerRef, inView, wasInView]);

  // Handle seek to specific step when user clicks a step card
  useEffect(() => {
    if (!playerRef || seekToStep === null) return;

    try {
      const targetFrame = (seekToStep - 1) * STEP_DURATION_FRAMES;
      playerRef.seekTo(targetFrame);
      playerRef.play();
      onSeekComplete();
    } catch {
      // Player might not be ready
    }
  }, [playerRef, seekToStep, onSeekComplete]);

  // Track frame changes to sync step highlighting (now 4 steps)
  useEffect(() => {
    if (!playerRef || !inView) return;

    const intervalId = setInterval(() => {
      try {
        const frame = playerRef.getCurrentFrame();
        if (typeof frame === 'number') {
          // 4 steps: 0-299 = 1, 300-599 = 2, 600-899 = 3, 900-1199 = 4
          const currentStep = Math.min(Math.floor(frame / STEP_DURATION_FRAMES) + 1, NUM_STEPS);
          onStepChange(currentStep);
        }
      } catch {
        // Player might not be ready
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [playerRef, inView, onStepChange]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-[var(--radius-card-lg)] overflow-hidden',
        'w-full max-w-[320px] sm:max-w-[400px]'
      )}
      style={{ aspectRatio: '360/520' }}
      aria-label="Animated demonstration of my 4-step process"
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
 * Clickable to jump to that step in the demo
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
  onClick: () => void;
}

function StepCard({ step, isActive, index, onClick }: StepCardProps) {
  // Step-specific icons for all 4 steps
  const icons = [
    // Step 1: Search/Understand
    <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>,
    // Step 2: Map/Plan
    <svg key="map" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>,
    // Step 3: Code/Build
    <svg key="code" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>,
    // Step 4: Growth/Scale
    <svg key="growth" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>,
  ];

  return (
    <motion.article
      className={cn(
        'relative rounded-[var(--radius-card)] p-5 md:p-6 transition-all duration-300',
        'flex flex-row gap-4 items-start cursor-pointer',
        isActive
          ? 'bg-[var(--color-dark)] text-white shadow-xl'
          : 'bg-white card-shadow hover:shadow-lg'
      )}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Jump to step ${step.number}: ${step.title}`}
    >
      {/* Step Number/Icon Badge */}
      <div
        className={cn(
          'flex-shrink-0 w-12 h-12 rounded-xl',
          'flex items-center justify-center transition-all duration-300',
          isActive
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-background)] border-2 border-[rgba(0,0,0,0.08)] text-[var(--color-accent)]'
        )}
      >
        {isActive ? (
          icons[index]
        ) : (
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {step.number}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {/* Step Label */}
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-wider',
            isActive ? 'text-[var(--color-accent)]' : 'text-[rgba(0,0,0,0.4)]'
          )}
        >
          Step {step.number}
        </span>

        {/* Title */}
        <h3
          className={cn(
            'text-lg md:text-xl font-bold mt-0.5',
            isActive ? 'text-white' : 'text-[var(--color-dark)]'
          )}
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'mt-1 text-sm font-normal leading-relaxed',
            isActive ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.53)]'
          )}
        >
          {step.description}
        </p>
      </div>

      {/* Active indicator line */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[var(--color-accent)] rounded-r-full"
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
        'bg-[var(--color-dark)] rounded-[var(--radius-card-lg)] overflow-hidden',
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
          className="absolute inset-0 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>

      <p className="text-white text-lg font-semibold text-center">
        Loading demo...
      </p>
      <p className="text-[rgba(255,255,255,0.5)] text-sm mt-2 text-center">
        See how I work
      </p>

      {/* Placeholder step indicators - now 4 */}
      <div className="flex gap-2 mt-8">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center',
              num === 1
                ? 'bg-[var(--color-accent)] text-white'
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
