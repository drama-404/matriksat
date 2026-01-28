'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, fadeInLeft, fadeInRight, staggerChildren } from '@/components/animations/variants';
import { useInView } from '@/hooks/useInView';
import type { Locale } from '@/i18n/routing';
import type { HowItWorksContent } from '@/types/content';

import howItWorksEN from '@/content/en/howItWorks.json';
import howItWorksAL from '@/content/al/howItWorks.json';

// Dynamically import Remotion Player (no SSR)
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  { ssr: false }
);

// Dynamically import ChatbotMockup composition
const ChatbotMockupComposition = dynamic(
  () => import('@/components/remotion/ChatbotMockup').then((mod) => mod.ChatbotMockup),
  { ssr: false }
);

interface HowItWorksProps {
  locale: Locale;
}

export function HowItWorks({ locale }: HowItWorksProps) {
  const content: HowItWorksContent = locale === 'en' ? howItWorksEN : howItWorksAL;

  return (
    <section className="section-container" aria-labelledby="how-it-works-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          id="how-it-works-heading"
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[rgb(0,0,0)]"
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

      {/* 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-[1100px] mx-auto">
        {/* Left Column: Chatbot Mockup with Remotion Player */}
        <motion.div
          className="lg:w-[40%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ChatbotPlayer />
        </motion.div>

        {/* Right Column: Step Cards */}
        <motion.div
          className="lg:w-[60%] flex flex-col gap-6"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {content.steps.map((step) => (
            <motion.article
              key={step.id}
              className={cn(
                'bg-white rounded-[var(--radius-card)] p-8 card-shadow',
                'flex flex-row gap-4 items-start'
              )}
              variants={fadeInRight}
            >
              {/* Step Number Badge */}
              <div
                className={cn(
                  'flex-shrink-0 w-12 h-12 rounded-full',
                  'bg-[rgb(245,245,245)] border-2 border-[rgba(0,0,0,0.1)]',
                  'flex items-center justify-center'
                )}
              >
                <span
                  className="text-2xl font-bold text-[rgb(0,0,0)]"
                  style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
                >
                  {step.number}
                </span>
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-[rgb(0,0,0)]"
                  style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-1 text-sm font-normal leading-[21px]"
                  style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                >
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ChatbotPlayer - Remotion Player wrapper for ChatbotMockup
 * Shows static fallback until composition is loaded
 */
function ChatbotPlayer() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay loading to ensure smooth transition
    if (inView) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-[var(--radius-card)] overflow-hidden',
        'max-w-[400px] mx-auto lg:mx-0'
      )}
      style={{ aspectRatio: '360/460' }}
      aria-label="Chatbot demo preview"
    >
      {/* Remotion Player */}
      {isLoaded && ChatbotMockupComposition && (
        <div className="absolute inset-0">
          <Player
            component={ChatbotMockupComposition}
            durationInFrames={240}
            fps={30}
            compositionWidth={400}
            compositionHeight={500}
            controls={false}
            autoPlay={inView}
            loop
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Static Fallback (shown while loading) */}
      {!isLoaded && <StaticChatbotFallback />}
    </div>
  );
}

/**
 * Static fallback shown while Remotion player loads
 */
function StaticChatbotFallback() {
  const messages = [
    { sender: 'user', text: 'Keni dhoma të lira?' },
    { sender: 'ai', text: 'Po! 2 dhoma standard disponueshme për datat tuaja. 🏨' },
    { sender: 'user', text: 'Sa kushton për 3 net?' },
    { sender: 'ai', text: '€210 totali (€70/natë). Doni ta rezervoj?' },
  ];

  return (
    <div
      className={cn(
        'bg-[rgb(30,30,30)] rounded-[var(--radius-card)] overflow-hidden',
        'p-4 h-full'
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center gap-3 pb-3 border-b border-[rgba(255,255,255,0.1)]">
        <div className="w-8 h-8 rounded-full bg-[rgb(52,145,255)] flex items-center justify-center">
          <span className="text-xs font-bold text-white">M</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">MATRIKS Bot</p>
          <p className="text-xs text-[rgba(255,255,255,0.5)]">Online</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-[rgb(34,197,94)]" aria-hidden="true" />
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-3 py-4 min-h-[280px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              'max-w-[80%] rounded-[18px] px-4 py-2.5',
              msg.sender === 'user'
                ? 'self-end bg-[rgb(52,145,255)] text-white'
                : 'self-start bg-[rgb(50,50,50)] text-[rgba(255,255,255,0.9)]'
            )}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 pt-3 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex-1 bg-[rgb(50,50,50)] rounded-full px-4 py-2">
          <p className="text-xs text-[rgba(255,255,255,0.3)]">Type a message...</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[rgb(52,145,255)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
