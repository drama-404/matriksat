'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OdometerTextProps {
  words: string[];
  interval?: number;
  rollDuration?: number;
  className?: string;
}

// Characters used during the "rolling" phase
const ROLL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * OdometerText - Slot machine / odometer style text animation
 *
 * Animation sequence:
 * 1. Letters randomly roll through characters for ~1.5s
 * 2. All letters snap into their final positions at once
 * 3. Word pulsates/scales up briefly to emphasize
 * 4. Pause, then transition to next word
 */
export function OdometerText({
  words,
  interval = 4000,
  rollDuration = 1500,
  className,
}: OdometerTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'rolling' | 'locked' | 'pulse'>('locked');

  const currentWord = words[currentIndex];

  // Cycle through words
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('rolling');

      // After roll duration, lock in the letters
      setTimeout(() => {
        setPhase('locked');

        // Brief pulse effect
        setTimeout(() => {
          setPhase('pulse');

          // Move to next word after pulse
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
            setPhase('locked');
          }, 300);
        }, 100);
      }, rollDuration);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, rollDuration]);

  // Calculate max length for consistent width
  const maxLength = useMemo(
    () => Math.max(...words.map((w) => w.length)),
    [words]
  );

  return (
    <span
      className={cn('relative inline-flex', className)}
      style={{ minWidth: `${maxLength * 0.65}em` }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-flex text-[var(--color-accent)]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: phase === 'pulse' ? 1.05 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.15, ease: 'easeOut' },
          }}
        >
          {currentWord.split('').map((char, index) => (
            <OdometerLetter
              key={`${currentIndex}-${index}`}
              targetChar={char}
              phase={phase}
              index={index}
            />
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface OdometerLetterProps {
  targetChar: string;
  phase: 'rolling' | 'locked' | 'pulse';
  index: number;
}

function OdometerLetter({ targetChar, phase, index }: OdometerLetterProps) {
  const [displayChar, setDisplayChar] = useState(targetChar);
  const rollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === 'rolling') {
      // Start rolling through random characters
      // Slight delay per letter for cascading effect start
      const startDelay = index * 30;

      const startRolling = () => {
        rollIntervalRef.current = setInterval(() => {
          // Pick a random character
          const randomChar =
            targetChar === ' '
              ? ' '
              : ROLL_CHARS[Math.floor(Math.random() * ROLL_CHARS.length)];
          setDisplayChar(randomChar);
        }, 50); // Roll speed - change character every 50ms
      };

      const delayTimer = setTimeout(startRolling, startDelay);

      return () => {
        clearTimeout(delayTimer);
        if (rollIntervalRef.current) {
          clearInterval(rollIntervalRef.current);
        }
      };
    } else {
      // Stop rolling and show final character
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
        rollIntervalRef.current = null;
      }
      setDisplayChar(targetChar);
    }
  }, [phase, targetChar, index]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
      }
    };
  }, []);

  const isSpace = targetChar === ' ';

  return (
    <motion.span
      className={cn(
        'inline-block',
        isSpace ? 'w-[0.3em]' : 'min-w-[0.6em]'
      )}
      style={{
        fontVariantNumeric: 'tabular-nums',
        textAlign: 'center',
      }}
      animate={{
        y: phase === 'rolling' ? [0, -2, 0, 2, 0] : 0,
      }}
      transition={{
        y: {
          duration: 0.1,
          repeat: phase === 'rolling' ? Infinity : 0,
          repeatType: 'loop',
        },
      }}
    >
      {displayChar}
    </motion.span>
  );
}
