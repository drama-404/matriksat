'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import type { Locale } from '@/i18n/routing';
import type { FAQContent, FAQItem } from '@/types/content';

import faqEN from '@/content/en/faq.json';
import faqAL from '@/content/al/faq.json';

interface FAQProps {
  locale: Locale;
}

export function FAQ({ locale }: FAQProps) {
  const content: FAQContent = locale === 'en' ? faqEN : faqAL;
  const [openId, setOpenId] = useState<string>(content.items[0]?.id ?? '');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faqs" className="section-container" aria-labelledby="faq-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="faq-heading"
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[var(--color-dark)]"
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

      {/* FAQ Items - Chat Style */}
      <motion.div
        className="max-w-[900px] mx-auto flex flex-col gap-8"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {content.items.map((faqItem) => (
          <FAQChatPair
            key={faqItem.id}
            faqItem={faqItem}
            isOpen={openId === faqItem.id}
            onToggle={() => toggleItem(faqItem.id)}
          />
        ))}
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        className="flex flex-col items-center gap-4 mt-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p
          className="text-[19.1px] font-semibold"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.footerText}
        </p>
        <a
          href="mailto:matriks.dev@gmail.com"
          className={cn(
            'inline-flex items-center gap-2',
            'bg-[var(--color-dark)] text-white rounded-[58px] px-6 py-4',
            'text-sm font-medium',
            'hover:opacity-90 transition-opacity',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2'
          )}
        >
          <PaperPlaneIcon />
          {content.footerCta}
        </a>
      </motion.div>
    </section>
  );
}

/* ─── FAQ Chat Pair (Question + Answer) ─── */

interface FAQChatPairProps {
  faqItem: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQChatPair({ faqItem, isOpen, onToggle }: FAQChatPairProps) {
  return (
    <motion.div className="flex flex-col gap-3" variants={fadeInUp}>
      {/* Question Bubble - Right Aligned */}
      <button
        onClick={onToggle}
        className={cn(
          'self-end max-w-[70%]',
          'bg-[var(--color-background)] rounded-3xl px-5 py-4',
          'flex items-center gap-3',
          'text-left cursor-pointer',
          'hover:bg-[var(--color-accent-subtle)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
        )}
        aria-expanded={isOpen}
        aria-controls={`answer-${faqItem.id}`}
      >
        {/* Expand/collapse icon */}
        <motion.span
          className="flex-shrink-0 w-5 h-5 rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgb(0,0,0)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="5" y1="2" x2="5" y2="8" />
            <line x1="2" y1="5" x2="8" y2="5" />
          </svg>
        </motion.span>
        <span className="text-[15px] font-medium text-[var(--color-dark)]">{faqItem.question}</span>
      </button>

      {/* Answer Section - Left Aligned */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`answer-${faqItem.id}`}
            className="flex gap-3 items-start self-start max-w-[70%]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold"
                aria-hidden="true"
              >
                M
              </div>
              <span
                className="text-[10px] font-medium whitespace-nowrap"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                {faqItem.avatarLabel}
              </span>
            </div>

            {/* Answer Bubble */}
            <div className="bg-white rounded-3xl px-5 py-4 card-shadow">
              <p
                className="text-sm font-normal leading-[21px]"
                style={{ color: 'rgba(0, 0, 0, 0.8)' }}
              >
                {faqItem.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Icon ─── */

function PaperPlaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
