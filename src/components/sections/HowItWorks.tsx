'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { useInView } from '@/hooks/useInView';
import type { Locale } from '@/i18n/routing';
import type { HowItWorksContent } from '@/types/content';
import type { PlayerRef } from '@remotion/player';

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

// Auto-advance interval for mobile stepper (ms)
const MOBILE_STEP_INTERVAL = 5000;

export function HowItWorks({ locale }: HowItWorksProps) {
  const content: HowItWorksContent = locale === 'en' ? howItWorksEN : howItWorksAL;
  const [activeStep, setActiveStep] = useState(1);
  const [seekToStep, setSeekToStep] = useState<number | null>(null);

  // Handler for clicking on step cards - seek to that step's frame
  const handleStepClick = useCallback((stepNumber: number) => {
    setSeekToStep(stepNumber);
    setActiveStep(stepNumber);
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
        className="text-center mb-8 sm:mb-12 relative z-10"
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

      {/* ─── MOBILE LAYOUT: Vertical stepper with auto-advance ─── */}
      <div className="lg:hidden relative z-10 max-w-[500px] mx-auto">
        <MobileStepper
          steps={content.steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* ─── DESKTOP LAYOUT: 2-column with Remotion player ─── */}
      <div className="hidden lg:flex flex-row gap-12 max-w-[1100px] mx-auto relative z-10">
        {/* Left Column: Animated Showcase with Remotion Player */}
        <motion.div
          className="w-[42%] flex justify-start"
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
          className="w-[58%] flex flex-col gap-4"
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

/* ═══════════════════════════════════════════════════════════════
   Mobile Stepper - Remotion demo + progress bar + auto-advance
   ═══════════════════════════════════════════════════════════════ */

interface MobileStepperProps {
  steps: HowItWorksContent['steps'];
  activeStep: number;
  onStepClick: (stepNumber: number) => void;
}

function MobileStepper({ steps, activeStep, onStepClick }: MobileStepperProps) {
  const [autoAdvance, setAutoAdvance] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const mobilePlayerRef = useRef<PlayerRef>(null);
  const { ref: containerRef, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const [playerReady, setPlayerReady] = useState(false);

  // Step-specific icons
  const icons = [
    <svg key="search" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    <svg key="map" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
    <svg key="code" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    <svg key="growth" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
  ];

  // Seek the Remotion player to the active step's frame range
  useEffect(() => {
    const player = mobilePlayerRef.current;
    if (!player || !playerReady) return;

    try {
      const targetFrame = (activeStep - 1) * STEP_DURATION_FRAMES;
      player.seekTo(targetFrame);
      if (inView) player.play();
    } catch {
      // Player might not be ready
    }
  }, [activeStep, playerReady, inView]);

  // Pause/play based on viewport visibility
  useEffect(() => {
    const player = mobilePlayerRef.current;
    if (!player || !playerReady) return;
    try {
      if (inView) player.play();
      else player.pause();
    } catch {
      // Player might not be ready
    }
  }, [inView, playerReady]);

  // Auto-advance through steps with progress tracking
  // Uses Remotion's step duration to stay in sync with the demo
  useEffect(() => {
    if (!autoAdvance) return;

    setProgress(0);

    const progressInterval = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += progressInterval;
      setProgress(Math.min(elapsed / MOBILE_STEP_INTERVAL, 1));
    }, progressInterval);

    timerRef.current = setTimeout(() => {
      onStepClick(activeStep >= NUM_STEPS ? 1 : activeStep + 1);
    }, MOBILE_STEP_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeStep, autoAdvance, onStepClick]);

  const handleManualStepClick = (stepNumber: number) => {
    setAutoAdvance(false);
    onStepClick(stepNumber);
    setTimeout(() => setAutoAdvance(true), MOBILE_STEP_INTERVAL * 2);
  };

  return (
    <div ref={containerRef}>
      {/* Remotion demo player */}
      <div
        className="relative rounded-[var(--radius-card)] overflow-hidden mb-4 bg-[var(--color-dark)]"
        style={{ aspectRatio: '400/520' }}
      >
        {inView && HowItWorksShowcaseComposition && (
          <Player
            ref={(ref) => {
              (mobilePlayerRef as React.MutableRefObject<PlayerRef | null>).current = ref;
              if (ref) setPlayerReady(true);
            }}
            component={HowItWorksShowcaseComposition}
            durationInFrames={TOTAL_DURATION_FRAMES}
            fps={FPS}
            compositionWidth={400}
            compositionHeight={520}
            controls={false}
            autoPlay={false}
            loop
            style={{ width: '100%', height: '100%' }}
          />
        )}

        {/* Fallback while player loads */}
        {(!inView || !playerReady) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-14 h-14">
              <div
                className="absolute inset-0 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"
                style={{ animationDuration: '1s' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Step indicator pills */}
      <div className="flex gap-2 mb-4">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = activeStep === stepNum;
          const isPast = activeStep > stepNum;

          return (
            <button
              key={step.id}
              onClick={() => handleManualStepClick(stepNum)}
              className={cn(
                'relative flex-1 h-[6px] rounded-full overflow-hidden transition-colors duration-300',
                isActive
                  ? 'bg-[rgba(0,0,0,0.08)]'
                  : isPast
                    ? 'bg-[var(--color-accent)]'
                    : 'bg-[rgba(0,0,0,0.08)]'
              )}
              aria-label={`Go to step ${stepNum}: ${step.title}`}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--color-accent)] rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active step content */}
      <AnimatePresence mode="wait">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          if (activeStep !== stepNum) return null;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Step card */}
              <div className="bg-[var(--color-dark)] rounded-[var(--radius-card)] p-5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-white flex-shrink-0">
                    {icons[index]}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                      Step {step.number} of {NUM_STEPS}
                    </span>
                    <h3
                      className="text-lg font-bold text-white leading-tight"
                      style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm font-normal leading-relaxed text-[rgba(255,255,255,0.7)] ml-[52px]">
                  {step.description}
                </p>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[var(--color-accent)] rounded-r-full" />
              </div>

              {/* Step navigation buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleManualStepClick(stepNum > 1 ? stepNum - 1 : NUM_STEPS)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white card-shadow text-sm font-medium text-[var(--color-dark)] active:scale-[0.98] transition-transform"
                  aria-label="Previous step"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  Previous
                </button>
                <button
                  onClick={() => handleManualStepClick(stepNum < NUM_STEPS ? stepNum + 1 : 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-accent)] text-sm font-medium text-white active:scale-[0.98] transition-transform"
                  aria-label="Next step"
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Desktop: ShowcasePlayer - Remotion Player wrapper
   ═══════════════════════════════════════════════════════════════ */

interface ShowcasePlayerProps {
  onStepChange: (step: number) => void;
  seekToStep: number | null;
  onSeekComplete: () => void;
}

function ShowcasePlayer({ onStepChange, seekToStep, onSeekComplete }: ShowcasePlayerProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const [wasInView, setWasInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // RESTART from beginning when entering viewport
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (inView && !wasInView) {
        player.seekTo(0);
        player.play();
      } else if (!inView && wasInView) {
        player.pause();
      }
      setWasInView(inView);
    } catch {
      // Player might not be ready
    }
  }, [inView, wasInView]);

  // Handle seek to specific step when user clicks a step card
  useEffect(() => {
    const player = playerRef.current;
    if (!player || seekToStep === null) return;

    try {
      const targetFrame = (seekToStep - 1) * STEP_DURATION_FRAMES;
      player.seekTo(targetFrame);
      player.play();
      onSeekComplete();
    } catch {
      // Player might not be ready
    }
  }, [seekToStep, onSeekComplete]);

  // Track frame changes to sync step highlighting
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !inView) return;

    const intervalId = setInterval(() => {
      try {
        const frame = player.getCurrentFrame();
        if (typeof frame === 'number') {
          const currentStep = Math.min(Math.floor(frame / STEP_DURATION_FRAMES) + 1, NUM_STEPS);
          onStepChange(currentStep);
        }
      } catch {
        // Player might not be ready
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [inView, onStepChange]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-[var(--radius-card-lg)] overflow-hidden',
        'w-full max-w-[400px]'
      )}
      style={{ aspectRatio: '360/520' }}
      aria-label="Animated demonstration of my 4-step process"
    >
      {/* Remotion Player */}
      {isLoaded && HowItWorksShowcaseComposition && (
        <div className="absolute inset-0">
          <Player
            ref={playerRef}
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

/* ═══════════════════════════════════════════════════════════════
   Desktop: StepCard
   ═══════════════════════════════════════════════════════════════ */

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
  const icons = [
    <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    <svg key="map" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
    <svg key="code" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    <svg key="growth" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
  ];

  return (
    <motion.article
      className={cn(
        'relative rounded-[var(--radius-card)] p-6 transition-all duration-300',
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
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-wider',
            isActive ? 'text-[var(--color-accent)]' : 'text-[rgba(0,0,0,0.4)]'
          )}
        >
          Step {step.number}
        </span>
        <h3
          className={cn(
            'text-xl font-bold mt-0.5',
            isActive ? 'text-white' : 'text-[var(--color-dark)]'
          )}
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {step.title}
        </h3>
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

/* ═══════════════════════════════════════════════════════════════
   Static fallback shown while Remotion player loads
   ═══════════════════════════════════════════════════════════════ */

function StaticShowcaseFallback() {
  return (
    <div
      className={cn(
        'bg-[var(--color-dark)] rounded-[var(--radius-card-lg)] overflow-hidden',
        'p-6 h-full flex flex-col items-center justify-center'
      )}
    >
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
        <div
          className="absolute inset-0 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>
      <p className="text-white text-lg font-semibold text-center">Loading demo...</p>
      <p className="text-[rgba(255,255,255,0.5)] text-sm mt-2 text-center">See how I work</p>
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
