'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { staggerChildren, fadeInUp } from '@/components/animations/variants';

// Animated Clock Icon - gentle tick animation with proper rotation
function ClockIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="clock-icon"
    >
      <circle cx="12" cy="12" r="10" />
      {/* Hour hand - slower rotation */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="8"
        className="clock-hour-hand"
      />
      {/* Minute hand - faster rotation */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="6"
        className="clock-minute-hand"
      />
      <style>{`
        .clock-hour-hand {
          transform-origin: 12px 12px;
          animation: clock-rotate 60s linear infinite;
        }
        .clock-minute-hand {
          transform-origin: 12px 12px;
          animation: clock-rotate 5s linear infinite;
        }
        @keyframes clock-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

// Animated Portal/Monitor Icon - subtle glow pulse
function PortalIcon() {
  return (
    <motion.svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{
        filter: ['drop-shadow(0 0 0px var(--color-accent))', 'drop-shadow(0 0 4px var(--color-accent))', 'drop-shadow(0 0 0px var(--color-accent))']
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      {/* Screen content - animated cursor blink */}
      <motion.line
        x1="6"
        y1="8"
        x2="10"
        y2="8"
        strokeWidth="2"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </motion.svg>
  );
}

// Animated Infinity Icon - flowing motion along path
function UnlimitedIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Static infinity path */}
      <path
        d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"
        strokeOpacity="0.3"
      />
      {/* Animated flowing line */}
      <motion.path
        d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"
        strokeDasharray="60"
        animate={{ strokeDashoffset: [60, -60] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

const featureIcons = [ClockIcon, PortalIcon, UnlimitedIcon] as const;

interface FeaturesStripProps {
  className?: string;
}

export function FeaturesStrip({ className }: FeaturesStripProps) {
  const t = useTranslations('features');

  const features = [
    { bold: t('delivery'), regular: t('deliveryDesc'), Icon: featureIcons[0] },
    { bold: t('portal'), regular: t('portalDesc'), Icon: featureIcons[1] },
    { bold: t('unlimited'), regular: t('unlimitedDesc'), Icon: featureIcons[2] },
  ];

  return (
    <section className={cn('section-container', className)} aria-label="Key features">
      <motion.div
        className={cn(
          'flex flex-row items-center',
          'max-w-[1052px] mx-auto py-4 sm:py-6'
        )}
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <Fragment key={feature.bold}>
            {/* Dashed vertical divider between items */}
            {index > 0 && (
              <div
                className="flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <div className="w-[2px] h-10 sm:h-[60px] border-l-2 border-dashed border-[rgba(0,0,0,0.17)]" />
              </div>
            )}

            <motion.div
              className="flex flex-1 flex-col items-center gap-1.5 sm:gap-3"
              variants={fadeInUp}
            >
              <div className="text-[var(--color-accent)] flex-shrink-0">
                <feature.Icon />
              </div>
              <div className="text-center">
                <p className="text-[11px] sm:text-base font-medium text-[var(--color-dark)] leading-tight">
                  {feature.bold}
                </p>
                <p className="text-[10px] sm:text-base font-normal text-[var(--color-muted)] leading-tight">
                  {feature.regular}
                </p>
              </div>
            </motion.div>
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}
