'use client';

import { useState, useEffect, useRef, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { useInView } from '@/hooks/useInView';
import type { Locale } from '@/i18n/routing';
import type { ServicesContent, Service } from '@/types/content';

import servicesEN from '@/content/en/services.json';
import servicesAL from '@/content/al/services.json';

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

const serviceIconMap: Record<string, React.FC<{ className?: string }>> = {
  chat: ChatIcon,
  document: DocumentIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  emoji: EmojiIcon,
  star: StarIcon,
  phone: PhoneIcon,
  connector: ConnectorIcon,
  shield: ShieldIcon,
};

export function ServicesGrid({ locale }: ServicesGridProps) {
  const content: ServicesContent = locale === 'en' ? servicesEN : servicesAL;

  return (
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
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[rgb(0,0,0)]"
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

      {/* 3x3 Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {content.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>

      {/* Footer Text */}
      <motion.p
        className="text-center mt-12"
        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {content.footerText}{' '}
        <span className="text-[22px] font-semibold">{content.footerHighlight}</span>
      </motion.p>
    </section>
  );
}

/* ─── Service Card with Remotion Player ─── */

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIconMap[service.icon] ?? ChatIcon;
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Get the composition component
  const CompositionComponent = compositionMap[service.remotionId] as ComponentType | undefined;

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
        'relative bg-white rounded-[var(--radius-card)] overflow-hidden card-shadow',
        'h-[280px] p-6 flex flex-col justify-between',
        'group cursor-default'
      )}
      variants={fadeInUp}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Title - absolute positioned top-left */}
      <h3
        className="relative z-10 text-xl font-bold text-[rgb(0,0,0)]"
        style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
      >
        {service.title}
      </h3>

      {/* Video / Static Icon Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
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
              compositionHeight={360}
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
            'relative w-[180px] h-[140px] transition-opacity duration-300',
            showVideo && inView ? 'opacity-0' : 'opacity-100'
          )}
        >
          {/* Main icon - centered */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[rgb(245,245,245)] flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}
          >
            <Icon className="w-8 h-8" />
          </div>
          {/* Secondary decorative elements */}
          <div
            className="absolute top-2 right-4 w-10 h-10 rounded-xl bg-[rgb(245,245,245)] opacity-40 group-hover:opacity-70 transition-opacity duration-300"
            style={{ transform: 'rotate(3deg)' }}
          />
          <div
            className="absolute bottom-4 left-2 w-12 h-8 rounded-lg bg-[rgb(245,245,245)] opacity-30 group-hover:opacity-60 transition-opacity duration-300"
            style={{ transform: 'rotate(-2deg)' }}
          />
        </div>
      </div>

      {/* Feature tags at bottom */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {service.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[rgb(245,245,245)]"
            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─── Inline SVG Icons ─── */

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function EmojiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function ConnectorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="rgb(52,145,255)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
