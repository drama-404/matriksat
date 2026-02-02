'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { staggerChildren, fadeInUp } from '@/components/animations/variants';

// Animated Clock Icon - gentle tick animation
function ClockIcon() {
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
    >
      <circle cx="12" cy="12" r="10" />
      {/* Animated clock hand */}
      <motion.line
        x1="12"
        y1="12"
        x2="12"
        y2="7"
        style={{ transformOrigin: '12px 12px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.line
        x1="12"
        y1="12"
        x2="16"
        y2="14"
        style={{ transformOrigin: '12px 12px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
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
          'flex flex-col sm:flex-row items-center justify-center',
          'max-w-[1052px] mx-auto py-6',
          'gap-0'
        )}
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.bold}
            className="flex flex-col sm:flex-row items-center"
          >
            {/* Dashed Divider - centered between features */}
            {index > 0 && (
              <>
                {/* Desktop: vertical divider */}
                <div
                  className="hidden sm:flex items-center justify-center px-8"
                  aria-hidden="true"
                >
                  <div className="w-[2px] h-[60px] border-l-2 border-dashed border-[rgba(0,0,0,0.17)]" />
                </div>
                {/* Mobile: horizontal divider */}
                <div
                  className="sm:hidden flex items-center justify-center py-4"
                  aria-hidden="true"
                >
                  <div className="w-[60px] h-[2px] border-t-2 border-dashed border-[rgba(0,0,0,0.17)]" />
                </div>
              </>
            )}

            <motion.div
              className="flex flex-col items-center gap-3 px-6"
              variants={fadeInUp}
            >
              <div className="text-[var(--color-accent)]">
                <feature.Icon />
              </div>
              <div className="text-center">
                <p className="text-base font-medium text-[var(--color-dark)] leading-tight">
                  {feature.bold}
                </p>
                <p className="text-base font-normal text-[var(--color-dark)] leading-tight">
                  {feature.regular}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
