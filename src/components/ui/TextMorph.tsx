'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextMorphProps {
  words: string[];
  interval?: number;
  className?: string;
}

const morphVariants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function TextMorph({
  words,
  interval = 3000,
  className,
}: TextMorphProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // Start pulsing animation before switching words
      setIsPulsing(true);

      // After pulsing completes (3 pulses at ~150ms each = ~450ms), switch word
      setTimeout(() => {
        setIsPulsing(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={cn('relative inline-block', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-block text-[var(--color-accent)]"
          variants={morphVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.span
            className="inline-block"
            animate={
              isPulsing
                ? {
                    scale: [1, 1.08, 1, 1.08, 1, 1.08, 1],
                    textShadow: [
                      '0 0 0px transparent',
                      '0 0 8px var(--color-accent)',
                      '0 0 0px transparent',
                      '0 0 8px var(--color-accent)',
                      '0 0 0px transparent',
                      '0 0 8px var(--color-accent)',
                      '0 0 0px transparent',
                    ],
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 0.45,
              ease: 'easeInOut',
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
