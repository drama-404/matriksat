'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { typewriterConfig } from '@/components/animations/variants';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[currentWordIndex];

  const typeChar = useCallback(() => {
    if (isDeleting) {
      if (displayedText.length > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayedText.length < currentWord.length) {
        setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
      }
    }
  }, [currentWord, displayedText, isDeleting, words.length]);

  useEffect(() => {
    const { charDelay, wordDisplayDuration, deleteDelay } = typewriterConfig;

    if (!isDeleting && displayedText === currentWord) {
      // Word complete, wait then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, wordDisplayDuration);
      return () => clearTimeout(timeout);
    }

    const delay = isDeleting ? deleteDelay : charDelay;
    const timeout = setTimeout(typeChar, delay);
    return () => clearTimeout(timeout);
  }, [displayedText, currentWord, isDeleting, typeChar]);

  // Calculate selection box width based on full word
  const boxWidth = currentWord.length;

  return (
    <span className={cn('relative inline-block', className)}>
      {/* Selection Box that scales with word */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{
          scaleX: displayedText.length / boxWidth,
          opacity: displayedText.length > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.05, ease: 'linear' }}
        style={{ transformOrigin: 'left' }}
      >
        <span className="absolute inset-0">
          {/* Blue border */}
          <span
            className="absolute -top-[2px] -bottom-[2px] -left-[3px] -right-[3px] border-[2px] border-[rgb(52,145,255)]"
            style={{ borderRadius: 0 }}
          />

          {/* Corner handles */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
            (corner) => (
              <span
                key={corner}
                className={cn(
                  'absolute w-[6px] h-[6px] bg-[rgb(52,145,255)] pulse-animation',
                  corner === 'top-left' && '-top-[5px] -left-[6px]',
                  corner === 'top-right' && '-top-[5px] -right-[6px]',
                  corner === 'bottom-left' && '-bottom-[5px] -left-[6px]',
                  corner === 'bottom-right' && '-bottom-[5px] -right-[6px]'
                )}
                style={{
                  boxShadow: '0 0 6px rgba(52, 145, 255, 0.4)',
                }}
              />
            )
          )}
        </span>
      </motion.span>

      {/* Text */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          className="relative z-10 text-[rgb(52,145,255)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
