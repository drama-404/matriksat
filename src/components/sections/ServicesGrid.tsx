'use client';

import { useState, useEffect, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { useInView } from '@/hooks/useInView';
import { ServiceCategoryModal } from '@/components/ui/ServiceCategoryModal';
import type { Locale } from '@/i18n/routing';
import type { ServiceCategoriesContent, ServiceCategory } from '@/types/content';

import categoriesEN from '@/content/en/service-categories.json';
import categoriesAL from '@/content/al/service-categories.json';

// Dynamically import Remotion Player (no SSR)
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  { ssr: false }
);

// Dynamically import compositions
import { compositionMap } from '@/components/remotion/compositions';

interface ServicesGridProps {
  locale: Locale;
}

export function ServicesGrid({ locale }: ServicesGridProps) {
  const content: ServiceCategoriesContent = locale === 'en' ? categoriesEN : categoriesAL;
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Delay clearing the category for exit animation
    setTimeout(() => setSelectedCategory(null), 300);
  };

  return (
    <>
      <section id="services" className="section-container" aria-labelledby="services-heading">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2
            id="services-heading"
            className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[var(--color-dark)]"
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

        {/* 2x2 Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {content.categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </motion.div>
      </section>

      {/* Category Modal */}
      <ServiceCategoryModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}

/* ─── Category Card with Remotion Player ─── */

interface CategoryCardProps {
  category: ServiceCategory;
  onClick: () => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Get the composition component
  const CompositionComponent = compositionMap[category.remotionId] as ComponentType | undefined;

  // Delay showing video to allow fade transition
  useEffect(() => {
    if (inView && CompositionComponent) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
        setShowVideo(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
  }, [inView, CompositionComponent]);

  return (
    <motion.article
      ref={ref}
      className={cn(
        'relative bg-white rounded-[var(--radius-card-lg)] overflow-hidden card-shadow',
        'h-[360px] p-6 flex flex-col justify-between',
        'group cursor-pointer'
      )}
      variants={fadeInUp}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${category.title} demos`}
    >
      {/* Title - top left with gradient backdrop for readability */}
      <div className="relative z-10">
        {/* Gradient backdrop to ensure text readability over video */}
        <div
          className="absolute -inset-4 -top-6 rounded-xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div className="relative">
          <h3
            className="text-2xl font-bold text-[var(--color-dark)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {category.title}
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-accent)' }}
          >
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Video / Static Visual Container - positioned below title area */}
      <div className="absolute inset-x-0 top-[85px] bottom-[60px] flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Remotion Player */}
        {hasLoaded && CompositionComponent && (
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              showVideo && inView ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Player
              component={CompositionComponent}
              durationInFrames={180}
              fps={30}
              compositionWidth={640}
              compositionHeight={400}
              controls={false}
              autoPlay={showVideo && inView}
              loop
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Static icon collage (shown when video is not playing) */}
        <div
          className={cn(
            'relative w-[200px] h-[160px] transition-opacity duration-300',
            showVideo && inView ? 'opacity-0' : 'opacity-100'
          )}
        >
          {/* Category-specific icon */}
          <CategoryStaticVisual categoryId={category.id} />
        </div>
      </div>

      {/* Bottom section - project count + view prompt */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-[var(--color-background)]"
            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
          >
            {category.projects.length} demos
          </span>
        </div>

        {/* View arrow */}
        <motion.div
          className="w-10 h-10 rounded-full bg-[var(--color-dark)] flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.15 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* ─── Category Static Visuals ─── */

function CategoryStaticVisual({ categoryId }: { categoryId: string }) {
  const visuals: Record<string, React.ReactNode> = {
    'ai-automation': (
      <>
        {/* Main AI icon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[var(--color-background)] flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          style={{ transform: 'translate(-50%, -50%) rotate(-3deg)' }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
            <circle cx="8" cy="14" r="1" />
            <circle cx="16" cy="14" r="1" />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-2 right-4 w-12 h-12 rounded-xl bg-[var(--color-background)] opacity-40 group-hover:opacity-70 transition-opacity" style={{ transform: 'rotate(5deg)' }} />
        <div className="absolute bottom-4 left-2 w-14 h-10 rounded-lg bg-[var(--color-background)] opacity-30 group-hover:opacity-60 transition-opacity" style={{ transform: 'rotate(-2deg)' }} />
      </>
    ),
    'custom-apps': (
      <>
        {/* Main laptop/code icon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[var(--color-background)] flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          style={{ transform: 'translate(-50%, -50%) rotate(2deg)' }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="M7 8l3 3-3 3M12 14h4" />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[var(--color-background)] opacity-40 group-hover:opacity-70 transition-opacity" style={{ transform: 'rotate(-3deg)' }} />
        <div className="absolute bottom-2 right-6 w-12 h-8 rounded-lg bg-[var(--color-background)] opacity-30 group-hover:opacity-60 transition-opacity" style={{ transform: 'rotate(4deg)' }} />
      </>
    ),
    'data-analytics': (
      <>
        {/* Main chart icon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[var(--color-background)] flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          style={{ transform: 'translate(-50%, -50%) rotate(-2deg)' }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-8 w-14 h-10 rounded-xl bg-[var(--color-background)] opacity-40 group-hover:opacity-70 transition-opacity" style={{ transform: 'rotate(6deg)' }} />
        <div className="absolute bottom-6 left-0 w-10 h-10 rounded-lg bg-[var(--color-background)] opacity-30 group-hover:opacity-60 transition-opacity" style={{ transform: 'rotate(-4deg)' }} />
      </>
    ),
    'product-design': (
      <>
        {/* Main design icon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[var(--color-background)] flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          style={{ transform: 'translate(-50%, -50%) rotate(3deg)' }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 w-12 h-8 rounded-xl bg-[var(--color-background)] opacity-40 group-hover:opacity-70 transition-opacity" style={{ transform: 'rotate(-5deg)' }} />
        <div className="absolute bottom-0 right-4 w-10 h-12 rounded-lg bg-[var(--color-background)] opacity-30 group-hover:opacity-60 transition-opacity" style={{ transform: 'rotate(2deg)' }} />
      </>
    ),
  };

  return visuals[categoryId] || null;
}
