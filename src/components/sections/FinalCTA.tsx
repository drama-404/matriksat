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
        className="relative max-w-[1082px] mx-auto rounded-[var(--radius-card-lg)] bg-[var(--color-dark)] px-4 sm:px-8 py-12 sm:py-16 md:py-24 overflow-hidden"
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
            className="text-[26px] sm:text-[32px] md:text-[44px] font-bold text-white leading-[1.1] max-w-[700px] mb-8"
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
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 bg-white text-[var(--color-dark)] rounded-[72px] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)]"
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
              className="inline-block rounded-2xl px-3 py-1.5 text-[11px] font-normal mb-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {content.ctaSub}
            </span>
          )}
          {!content.ctaSub && <div className="mb-8" />}

          {/* Contact options */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 w-full max-w-[500px]">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto flex-1 rounded-full px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto flex-1 rounded-full px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <EmailIcon />
              Email
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full sm:w-auto flex-1 rounded-full px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>

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

      {/* Tunnel Container - hidden on very small screens, tracks hidden on mobile */}
      <div className="relative flex items-center justify-center overflow-hidden h-[70px]">
        {/* Left Track - Undone Tasks entering from left (hidden on mobile) */}
        <div
          className="hidden sm:block flex-1 overflow-hidden relative"
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

        {/* Right Track - Done Tasks exiting to right (hidden on mobile) */}
        <div
          className="hidden sm:block flex-1 overflow-hidden relative"
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
      className="relative px-4 sm:px-6 py-4 rounded-lg flex items-center justify-center w-[200px] sm:w-[240px] h-[60px] sm:h-[70px]"
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

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
