'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

export function TestimonialsCarousel({ locale }: TestimonialsCarouselProps) {
  const testimonials: Testimonial[] = locale === 'en' ? testimonialsEN : testimonialsAL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 419 + 24; // card width + gap
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, testimonials.length, scrollToIndex]);

  const goPrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(prevIndex);
  }, [activeIndex, testimonials.length, scrollToIndex]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  // Sync active index with manual scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 419 + 24;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, testimonials.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [testimonials.length]);

  return (
    <section className="py-[var(--spacing-section)] overflow-hidden" aria-label="Client testimonials">
      <ScrollReveal>
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Track */}
          <div
            ref={scrollRef}
            className={cn(
              'flex gap-6 overflow-x-auto snap-x snap-mandatory',
              'scrollbar-hide px-[var(--spacing-section-x)]',
              'md:px-[calc((100vw-1100px)/2+var(--spacing-section-x))]'
            )}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="list"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full bg-white flex items-center justify-center',
              'card-shadow hover:scale-110 transition-transform',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(52,145,255)]',
              'hidden md:flex'
            )}
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full bg-white flex items-center justify-center',
              'card-shadow hover:scale-110 transition-transform',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(52,145,255)]',
              'hidden md:flex'
            )}
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'rounded-full transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(52,145,255)]',
                index === activeIndex
                  ? 'w-2 h-2 bg-[rgb(52,145,255)]'
                  : 'w-1.5 h-1.5 bg-[rgba(0,0,0,0.2)]'
              )}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className={cn(
        'flex-shrink-0 w-[419px] snap-center',
        'flex flex-col gap-4 p-6',
        'bg-white rounded-[26px] card-shadow'
      )}
      role="listitem"
    >
      {/* Project Screenshot Placeholder */}
      <div
        className="w-full h-[293px] rounded-[26px] bg-[rgb(245,245,245)] overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full h-full flex items-center justify-center text-[rgba(0,0,0,0.2)]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-base font-normal italic leading-6"
        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Reply Bubble */}
      <div className="flex justify-end">
        <div className="bg-[rgb(22,22,22)] rounded-[18px] px-4 py-3 max-w-[70%]">
          <p className="text-sm font-normal text-white">
            {testimonial.reply}
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        <div
          className="w-[42px] h-[42px] rounded-full bg-[rgb(52,145,255)] flex items-center justify-center text-white font-semibold text-sm"
          aria-hidden="true"
        >
          {testimonial.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgb(0,0,0)]">
            {testimonial.author}
          </p>
          <p className="text-xs font-normal" style={{ color: 'rgba(0, 0, 0, 0.53)' }}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </article>
  );
}
