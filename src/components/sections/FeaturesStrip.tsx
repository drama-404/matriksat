'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { staggerChildren, fadeInUp } from '@/components/animations/variants';

function ClockIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PortalIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function UnlimitedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
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
          'flex flex-col sm:flex-row items-center justify-between',
          'max-w-[1052px] mx-auto py-6'
        )}
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <div key={feature.bold} className="flex sm:flex-row items-center gap-0 w-full sm:w-auto">
            {/* Dashed Divider (between items, not before first) */}
            {index > 0 && (
              <div
                className="hidden sm:block w-[2px] h-[60px] border-l-2 border-dashed border-[rgba(0,0,0,0.17)] mx-auto"
                aria-hidden="true"
              />
            )}
            {index > 0 && (
              <div
                className="sm:hidden w-[60px] h-[2px] border-t-2 border-dashed border-[rgba(0,0,0,0.17)] my-4"
                aria-hidden="true"
              />
            )}

            <motion.div
              className="flex flex-col items-center gap-3 px-8 sm:px-12"
              variants={fadeInUp}
            >
              <feature.Icon />
              <div className="text-center">
                <p className="text-base font-medium text-[rgb(0,0,0)] leading-tight">
                  {feature.bold}
                </p>
                <p className="text-base font-normal text-[rgb(0,0,0)] leading-tight">
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
