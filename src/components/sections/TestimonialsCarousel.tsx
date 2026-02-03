'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/i18n/routing';
import type { Testimonial } from '@/types/content';

import testimonialsEN from '@/content/en/testimonials.json';
import testimonialsAL from '@/content/al/testimonials.json';

interface TestimonialsCarouselProps {
  locale: Locale;
}

// Get wrapped index for infinite loop
function getWrappedIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

// Calculate relative position from center (-2, -1, 0, 1, 2)
function getRelativePosition(cardIndex: number, activeIndex: number, totalCards: number): number {
  let diff = cardIndex - activeIndex;

  // Handle wrapping for infinite loop
  if (diff > totalCards / 2) diff -= totalCards;
  if (diff < -totalCards / 2) diff += totalCards;

  return diff;
}

// Position configurations for 5-card coverflow effect
const positionConfigs: Record<number, { x: number; scale: number; opacity: number; zIndex: number; rotateY: number }> = {
  [-2]: { x: -380, scale: 0.6, opacity: 0.3, zIndex: 1, rotateY: 35 },
  [-1]: { x: -200, scale: 0.78, opacity: 0.55, zIndex: 5, rotateY: 18 },
  [0]: { x: 0, scale: 1, opacity: 1, zIndex: 10, rotateY: 0 },
  [1]: { x: 200, scale: 0.78, opacity: 0.55, zIndex: 5, rotateY: -18 },
  [2]: { x: 380, scale: 0.6, opacity: 0.3, zIndex: 1, rotateY: -35 },
};

export function TestimonialsCarousel({ locale }: TestimonialsCarouselProps) {
  const testimonials: Testimonial[] = locale === 'en' ? testimonialsEN : testimonialsAL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => getWrappedIndex(prev + 1, testimonials.length));
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => getWrappedIndex(prev - 1, testimonials.length));
  }, [testimonials.length]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  return (
    <section className="py-[var(--spacing-section)] overflow-hidden" aria-label="Client testimonials">
      <ScrollReveal>
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Container */}
          <div className="relative h-[520px] flex items-center justify-center">
            {/* Navigation Button - Previous */}
            <button
              onClick={goPrev}
              className={cn(
                'absolute left-4 md:left-8 lg:left-16 z-20',
                'w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm',
                'flex items-center justify-center',
                'shadow-lg hover:bg-white hover:scale-110',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
              )}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Cards Container */}
            <div className="relative w-full max-w-[1200px] mx-auto px-4 h-full">
              {testimonials.map((testimonial, index) => {
                const relativePos = getRelativePosition(index, activeIndex, testimonials.length);

                // Only render cards within visible range (-2 to 2)
                if (Math.abs(relativePos) > 2) return null;

                const config = positionConfigs[relativePos] || positionConfigs[0];
                const isCenter = relativePos === 0;

                return (
                  <CarouselCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    config={config}
                    isCenter={isCenter}
                    onClick={() => !isCenter && goToIndex(index)}
                  />
                );
              })}
            </div>

            {/* Navigation Button - Next */}
            <button
              onClick={goNext}
              className={cn(
                'absolute right-4 md:right-8 lg:right-16 z-20',
                'w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm',
                'flex items-center justify-center',
                'shadow-lg hover:bg-white hover:scale-110',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
              )}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-3 mt-8" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToIndex(index)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
                  index === activeIndex
                    ? 'w-8 h-2 bg-[var(--color-accent)]'
                    : 'w-2 h-2 bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.3)]'
                )}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

interface CarouselCardProps {
  testimonial: Testimonial;
  config: { x: number; scale: number; opacity: number; zIndex: number; rotateY: number };
  isCenter: boolean;
  onClick: () => void;
}

function CarouselCard({ testimonial, config, isCenter, onClick }: CarouselCardProps) {
  return (
    <motion.article
      className={cn(
        'absolute top-1/2 left-1/2',
        'w-[340px] sm:w-[380px] md:w-[420px]',
        'bg-white rounded-[28px]',
        isCenter ? 'cursor-default' : 'cursor-pointer'
      )}
      style={{
        boxShadow: isCenter
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.1)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
      }}
      animate={{
        x: `calc(-50% + ${config.x}px)`,
        y: '-50%',
        scale: config.scale,
        opacity: config.opacity,
        rotateY: config.rotateY,
        zIndex: config.zIndex,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      onClick={onClick}
      role="listitem"
      tabIndex={isCenter ? 0 : -1}
    >
      <div className="p-5">
        {/* Project Screenshot Placeholder */}
        <div
          className="w-full h-[200px] sm:h-[240px] rounded-[20px] bg-gradient-to-br from-[var(--color-background)] to-[rgba(196,108,78,0.08)] overflow-hidden mb-4"
          aria-hidden="true"
        >
          <div className="w-full h-full flex items-center justify-center text-[rgba(0,0,0,0.15)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>

        {/* Quote */}
        <p
          className="text-sm sm:text-base font-normal italic leading-relaxed mb-4"
          style={{ color: 'rgba(0, 0, 0, 0.7)' }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Reply Bubble */}
        <div className="flex justify-end mb-4">
          <div className="bg-[var(--color-dark)] rounded-[16px] px-4 py-2.5 max-w-[75%]">
            <p className="text-sm font-normal text-white">
              {testimonial.reply}
            </p>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pt-2 border-t border-[rgba(0,0,0,0.06)]">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[rgba(196,108,78,0.7)] flex items-center justify-center text-white font-semibold text-sm"
            aria-hidden="true"
          >
            {testimonial.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-dark)]">
              {testimonial.author}
            </p>
            <p className="text-xs font-normal" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
