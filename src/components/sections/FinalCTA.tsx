'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fadeInUp } from '@/components/animations/variants';
import { CONTACT } from '@/lib/contact';
import type { Locale } from '@/i18n/routing';
import type { FinalCtaContent } from '@/types/content';

import ctaEN from '@/content/en/finalCta.json';
import ctaAL from '@/content/al/finalCta.json';

interface FinalCTAProps {
  locale: Locale;
}

export function FinalCTA({ locale }: FinalCTAProps) {
  const content: FinalCtaContent = locale === 'en' ? ctaEN : ctaAL;

  return (
    <section id="contact" className="section-container" aria-labelledby="final-cta-heading">
      <motion.div
        className="relative max-w-[1082px] mx-auto rounded-[var(--radius-card-lg)] bg-[var(--color-dark)] px-8 py-16 sm:py-24 overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 grid-pattern pointer-events-none"
          style={{ opacity: 0.03 }}
          aria-hidden="true"
        />

        {/* Radial Gradient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(25% 46% at 39% 88%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
            opacity: 0.04,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Heading */}
          <h2
            id="final-cta-heading"
            className="text-[32px] sm:text-[44px] font-bold text-white leading-[1] max-w-[700px] mb-8"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {content.heading}
          </h2>

          {/* CTA Button with Glow */}
          <div className="relative mb-4">
            {/* Glow behind button */}
            <div
              className="absolute inset-0 blur-xl pointer-events-none"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, white 0%, transparent 100%)',
                opacity: 0.15,
                transform: 'scale(1.5)',
              }}
              aria-hidden="true"
            />
            <motion.a
              href={CONTACT.calendly}
              className="relative inline-flex items-center gap-2 bg-white text-[var(--color-dark)] rounded-[72px] px-8 py-5 text-base font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)]"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <SparkleIcon />
              {content.ctaButton}
            </motion.a>
          </div>

          {/* Sub-text badge */}
          {content.ctaSub && (
            <span
              className="inline-block rounded-2xl px-3 py-1.5 text-[11px] font-normal mb-12"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {content.ctaSub}
            </span>
          )}
          {!content.ctaSub && <div className="mb-12" />}

          {/* Task Processing Tunnel */}
          <ProcessingTunnel content={content} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Processing Tunnel Component ─── */

interface ProcessingTunnelProps {
  content: FinalCtaContent;
}

function ProcessingTunnel({ content }: ProcessingTunnelProps) {
  // Use same tasks for both tracks - they enter undone, exit done
  const tasks = content.tickerTop;

  // Offset the right track by half the tasks so different pills show on each side
  const tasksOffset = [...tasks.slice(3), ...tasks.slice(0, 3)];

  return (
    <div className="w-full max-w-[1000px]">
      {/* Trust Text Header */}
      {content.trustText && (
        <p className="text-sm font-medium text-white text-center mb-5">
          {content.trustText}
        </p>
      )}

      {/* Tunnel Container */}
      <div className="relative flex items-center justify-center overflow-hidden h-[70px]">
        {/* Left Track - Undone Tasks entering from left */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
          }}
        >
          <div className="tunnel-track-flow flex gap-4 whitespace-nowrap items-center h-full">
            {[...tasks, ...tasks, ...tasks].map((task, i) => (
              <TaskPill key={`undone-${i}`} label={task} done={false} />
            ))}
          </div>
        </div>

        {/* Center Processing Box */}
        <div className="relative flex-shrink-0 z-10">
          <ProcessingBox text={content.buildingText} />
        </div>

        {/* Right Track - Done Tasks exiting to right (offset so different pills visible) */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
          }}
        >
          <div className="tunnel-track-flow flex gap-4 whitespace-nowrap items-center h-full">
            {[...tasksOffset, ...tasksOffset, ...tasksOffset].map((task, i) => (
              <TaskPill key={`done-${i}`} label={task} done={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Task Pill Component ─── */

interface TaskPillProps {
  label: string;
  done: boolean;
}

function TaskPill({ label, done }: TaskPillProps) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-[20px] px-4 py-2.5 text-[13px] font-medium text-white flex-shrink-0"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      {done ? (
        <CheckIcon />
      ) : (
        <span
          className="w-4 h-4 rounded-full border-2 flex-shrink-0"
          style={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}

/* ─── Processing Box with Typewriter Effect ─── */

interface ProcessingBoxProps {
  text: string;
}

function ProcessingBox({ text }: ProcessingBoxProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (!isDeleting) {
        if (charIndex <= text.length) {
          setDisplayText(text.slice(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(typeNextChar, 80);
        } else {
          // Pause at full text before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeNextChar();
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(text.slice(0, charIndex));
          timeoutId = setTimeout(typeNextChar, 40);
        } else {
          // Pause before retyping
          isDeleting = false;
          timeoutId = setTimeout(typeNextChar, 500);
        }
      }
    };

    typeNextChar();

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <div
      className="relative px-6 py-4 rounded-lg flex items-center justify-center w-[240px] h-[70px]"
      style={{ backgroundColor: 'rgb(28, 26, 24)' }}
    >
      {/* Left bracket - taller and more visible */}
      <span
        className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-start"
        style={{ color: 'rgba(255, 255, 255, 0.35)' }}
        aria-hidden="true"
      >
        <span className="w-2 h-[2px] bg-current" />
        <span className="w-[2px] h-10 bg-current -mt-[1px]" />
        <span className="w-2 h-[2px] bg-current -mt-[1px]" />
      </span>

      {/* Text with cursor - terminal style */}
      <span
        className="text-white text-[16px] font-medium whitespace-nowrap"
        style={{ fontFamily: 'var(--font-mono), monospace' }}
      >
        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>&gt; </span>
        {displayText}
        <span
          className="inline-block w-[2px] h-[1.1em] bg-white ml-0.5 align-middle"
          style={{ opacity: showCursor ? 1 : 0 }}
          aria-hidden="true"
        />
      </span>

      {/* Right bracket - taller and more visible */}
      <span
        className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end"
        style={{ color: 'rgba(255, 255, 255, 0.35)' }}
        aria-hidden="true"
      >
        <span className="w-2 h-[2px] bg-current" />
        <span className="w-[2px] h-10 bg-current -mt-[1px]" />
        <span className="w-2 h-[2px] bg-current -mt-[1px]" />
      </span>
    </div>
  );
}

/* ─── Icons ─── */

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
      style={{ color: 'rgb(138, 154, 124)' }}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M5 8L7 10L11 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
