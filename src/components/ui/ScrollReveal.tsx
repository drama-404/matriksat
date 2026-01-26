'use client';

import { motion } from 'framer-motion';
import * as variants from '@/components/animations/variants';

type VariantKey = 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: VariantKey;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
